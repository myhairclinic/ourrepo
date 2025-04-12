import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";
import PredefinedMessageManagement from './PredefinedMessageManagement';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Loader2, 
  Settings, 
  User, 
  Calendar, 
  BellRing, 
  Clock, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  UserCog,
  MessageSquare,
  FileText,
  Send,
  Eye,
  Trash2,
  Plus,
  AlertTriangle
} from 'lucide-react';

// Türkçe dil desteğini açıkça belirtiyoruz
const daysOfWeek = {
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba',
  thursday: 'Perşembe',
  friday: 'Cuma',
  saturday: 'Cumartesi',
  sunday: 'Pazar'
};

// Bot ayarları için form şeması
const botSettingsSchema = z.object({
  isActive: z.boolean().default(true),
  autoResponder: z.boolean().default(true),
  welcomeMessage: z.string().optional(),
  offlineMessage: z.string().optional(),
  workingHours: z.record(z.object({
    start: z.string(),
    end: z.string(),
    isActive: z.boolean()
  })).optional(),
  languages: z.array(z.object({
    code: z.string(),
    isActive: z.boolean()
  })).optional(),
  operators: z.array(z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    telegramUsername: z.string()
  })).optional(),
  notifications: z.object({
    newMessage: z.boolean(),
    newContact: z.boolean(),
    appointmentReminder: z.boolean(),
    dailySummary: z.boolean()
  }).optional()
});

// Hazır mesaj şeması
const predefinedMessageSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Başlık gereklidir" }),
  text: z.string().min(1, { message: "Mesaj içeriği gereklidir" }),
  language: z.string().default("tr"),
  tags: z.array(z.string()).default([])
});

// Telegram bot yönetim bileşeni
export default function TelegramBotManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("staff");
  const [isOperatorDialogOpen, setIsOperatorDialogOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<any>(null);
  
  // Operatör düzenleme penceresini açarken operatör durumunu ayarla
  useEffect(() => {
    if (editingOperator) {
      setOperatorStatus(editingOperator.isActive);
    } else {
      setOperatorStatus(true);
    }
  }, [editingOperator]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPredefinedMessages, setShowPredefinedMessages] = useState(false);
  const [selectedPredefinedMessage, setSelectedPredefinedMessage] = useState<any>(null);
  const [editingPredefinedMessage, setEditingPredefinedMessage] = useState<any>(null);
  const [isPredefinedMessageDialogOpen, setIsPredefinedMessageDialogOpen] = useState(false);
  const [operatorStatus, setOperatorStatus] = useState(true);
  const [testNotificationType, setTestNotificationType] = useState("new_appointment");
  const [testChatId, setTestChatId] = useState("");
  
  // Test bildirimi gönderme mutasyonu
  const sendTestNotificationMutation = useMutation({
    mutationFn: async ({type, chatId}: {type: string, chatId: string}) => {
      const res = await fetch("/api/telegram/test-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, chatId })
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Bildirim gönderilirken bir hata oluştu");
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Test bildirimi gönderildi",
        description: `${data.type === 'new_appointment' ? 'Yeni randevu' : 'Randevu hatırlatma'} test bildirimi başarıyla gönderildi.`
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bildirim gönderilemedi",
        description: error.message || "Bildirim gönderilirken bir hata oluştu. Kullanıcının botu başlatıp başlatmadığını kontrol edin.",
        variant: "destructive"
      });
    }
  });
  
  // Kişileri getir
  const { 
    data: contacts = [], 
    isLoading: contactsLoading,
    refetch: refetchContacts
  } = useQuery({
    queryKey: ['/api/telegram/contacts'],
    queryFn: async () => {
      const res = await fetch('/api/telegram/contacts');
      if (!res.ok) throw new Error('Kişiler alınamadı');
      return res.json();
    }
  });

  // Mesajları getir
  const { 
    data: messages = [], 
    isLoading: messagesLoading,
    refetch: refetchMessages
  } = useQuery({
    queryKey: ['/api/telegram/messages', selectedContact?.chatId],
    queryFn: async () => {
      if (!selectedContact?.chatId) return [];
      const res = await fetch(`/api/telegram/messages/${selectedContact.chatId}`);
      if (!res.ok) throw new Error('Mesajlar alınamadı');
      return res.json();
    },
    enabled: !!selectedContact?.chatId
  });

  // Hazır mesajları getir
  const {
    data: predefinedMessages = [],
    isLoading: predefinedMessagesLoading,
    refetch: refetchPredefinedMessages
  } = useQuery({
    queryKey: ['/api/telegram/predefined-messages'],
    queryFn: async () => {
      const res = await fetch('/api/telegram/predefined-messages');
      if (!res.ok) throw new Error('Hazır mesajlar alınamadı');
      return res.json();
    }
  });

  // Bot ayarlarını getir
  const {
    data: botSettings,
    isLoading: botSettingsLoading,
    refetch: refetchBotSettings
  } = useQuery({
    queryKey: ['/api/telegram/settings'],
    queryFn: async () => {
      const res = await fetch('/api/telegram/settings');
      if (!res.ok) throw new Error('Bot ayarları alınamadı');
      return res.json();
    }
  });

  // Mesaj gönderme mutasyonu
  const sendMessageMutation = useMutation({
    mutationFn: async ({ chatId, text }: { chatId: string, text: string }) => {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text })
      });
      if (!res.ok) throw new Error('Mesaj gönderilemedi');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mesaj gönderildi",
        description: "Mesaj başarıyla gönderildi.",
      });
      setMessageText("");
      refetchMessages();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Mesaj gönderilirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Kişi engelleme/engel kaldırma mutasyonu
  const toggleBlockMutation = useMutation({
    mutationFn: async ({ chatId, isBlocked }: { chatId: string, isBlocked: boolean }) => {
      const res = await fetch(`/api/telegram/contacts/${chatId}/block`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlocked })
      });
      if (!res.ok) throw new Error('Engelleme durumu güncellenemedi');
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: data.isBlocked ? "Kişi engellendi" : "Kişinin engeli kaldırıldı",
        description: `Kişinin durum güncellemesi başarılı.`,
      });
      refetchContacts();
      if (selectedContact) {
        setSelectedContact({ ...selectedContact, isBlocked: data.isBlocked });
      }
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Engelleme durumu güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Kişi notlarını güncelleme mutasyonu
  const updateNotesMutation = useMutation({
    mutationFn: async ({ chatId, notes }: { chatId: string, notes: string }) => {
      const res = await fetch(`/api/telegram/contacts/${chatId}/notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      if (!res.ok) throw new Error('Notlar güncellenemedi');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Notlar güncellendi",
        description: "Kişi notları başarıyla güncellendi.",
      });
      refetchContacts();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Notlar güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Kişi etiketlerini güncelleme mutasyonu
  const updateTagsMutation = useMutation({
    mutationFn: async ({ chatId, tags }: { chatId: string, tags: string[] }) => {
      const res = await fetch(`/api/telegram/contacts/${chatId}/tags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags })
      });
      if (!res.ok) throw new Error('Etiketler güncellenemedi');
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Etiketler güncellendi",
        description: "Kişi etiketleri başarıyla güncellendi.",
      });
      refetchContacts();
      if (selectedContact) {
        setSelectedContact({ ...selectedContact, tags: data.tags });
      }
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Etiketler güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Hazır mesaj ekleme/güncelleme mutasyonu
  const savePredefinedMessageMutation = useMutation({
    mutationFn: async (message: any) => {
      const res = await fetch('/api/telegram/predefined-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
      if (!res.ok) throw new Error('Hazır mesaj kaydedilemedi');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Hazır mesaj kaydedildi",
        description: "Hazır mesaj başarıyla kaydedildi.",
      });
      setIsPredefinedMessageDialogOpen(false);
      setEditingPredefinedMessage(null);
      refetchPredefinedMessages();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Hazır mesaj kaydedilirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Hazır mesaj silme mutasyonu
  const deletePredefinedMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/telegram/predefined-messages/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Hazır mesaj silinemedi');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Hazır mesaj silindi",
        description: "Hazır mesaj başarıyla silindi.",
      });
      refetchPredefinedMessages();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Hazır mesaj silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Bot ayarlarını güncelleme mutasyonu
  const updateBotSettingsMutation = useMutation({
    mutationFn: async (settings: any) => {
      const res = await fetch('/api/telegram/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Bot ayarları güncellenemedi');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Bot ayarları güncellendi",
        description: "Bot ayarları başarıyla güncellendi.",
      });
      refetchBotSettings();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Bot ayarları güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Bot durumunu değiştirme mutasyonu
  const toggleBotStatusMutation = useMutation({
    mutationFn: async (isActive: boolean) => {
      const res = await fetch('/api/telegram/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      if (!res.ok) throw new Error('Bot durumu değiştirilemedi');
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: data.isActive ? "Bot aktifleştirildi" : "Bot devre dışı bırakıldı",
        description: `Bot durumu başarıyla değiştirildi.`,
      });
      refetchBotSettings();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Bot durumu değiştirilirken bir hata oluştu: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Hazır mesaj form kontrolü
  const predefinedMessageForm = useForm<z.infer<typeof predefinedMessageSchema>>({
    resolver: zodResolver(predefinedMessageSchema),
    defaultValues: {
      title: "",
      text: "",
      language: "tr",
      tags: []
    }
  });

  // Bot ayarları form kontrolü
  const botSettingsForm = useForm({
    resolver: zodResolver(botSettingsSchema),
    defaultValues: {
      isActive: true,
      autoResponder: true,
      welcomeMessage: "",
      offlineMessage: "",
      workingHours: Object.fromEntries(
        Object.keys(daysOfWeek).map(day => [
          day, 
          { start: "09:00", end: "18:00", isActive: true }
        ])
      ),
      languages: [
        { code: "tr", isActive: true },
        { code: "en", isActive: true },
        { code: "ru", isActive: true },
        { code: "ka", isActive: true }
      ],
      operators: [],
      notifications: {
        newMessage: true,
        newContact: true,
        appointmentReminder: true,
        dailySummary: true
      }
    }
  });

  // Bot ayarları değiştiğinde formu güncelle
  useEffect(() => {
    if (botSettings) {
      botSettingsForm.reset(botSettings);
    }
  }, [botSettings, botSettingsForm]);

  // Hazır mesaj düzenleme modalını aç
  const openEditPredefinedMessageDialog = (message: any = null) => {
    if (message) {
      predefinedMessageForm.reset(message);
      setEditingPredefinedMessage(message);
    } else {
      predefinedMessageForm.reset({
        title: "",
        text: "",
        language: "tr",
        tags: []
      });
      setEditingPredefinedMessage(null);
    }
    setIsPredefinedMessageDialogOpen(true);
  };

  // Hazır mesaj seç
  const selectPredefinedMessage = (message: any) => {
    setSelectedPredefinedMessage(message);
    setMessageText(message.text);
    setShowPredefinedMessages(false);
  };

  // Hazır mesaj kaydet
  const onSubmitPredefinedMessage = (data: z.infer<typeof predefinedMessageSchema>) => {
    savePredefinedMessageMutation.mutate({
      ...data,
      id: editingPredefinedMessage?.id
    });
  };

  // Bot ayarlarını kaydet
  const onSubmitBotSettings = (data: any) => {
    updateBotSettingsMutation.mutate(data);
  };

  // Mesaj gönder
  const handleSendMessage = () => {
    if (!selectedContact?.chatId || !messageText.trim()) return;
    
    sendMessageMutation.mutate({
      chatId: selectedContact.chatId,
      text: messageText
    });
  };

  // Engelle/Engeli kaldır
  const handleToggleBlock = () => {
    if (!selectedContact?.chatId) return;
    
    toggleBlockMutation.mutate({
      chatId: selectedContact.chatId,
      isBlocked: !selectedContact.isBlocked
    });
  };

  // Notları kaydet
  const handleSaveNotes = (notes: string) => {
    if (!selectedContact?.chatId) return;
    
    updateNotesMutation.mutate({
      chatId: selectedContact.chatId,
      notes
    });
  };

  // Etiket ekle/kaldır
  const handleToggleTag = (tag: string) => {
    if (!selectedContact?.chatId) return;
    
    const currentTags = selectedContact.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t: string) => t !== tag)
      : [...currentTags, tag];
    
    updateTagsMutation.mutate({
      chatId: selectedContact.chatId,
      tags: newTags
    });
  };

  // Yaygın etiketlerin listesi
  const commonTags = [
    "VIP", "Potansiyel", "Randevu", "Acil", "Takip", "Şikayet", "Soru", "Türkiye", "Rusya", "Azerbaycan", "İran", "Kazakistan"
  ];

  // Etiket oluştur (ad ve renk)
  const getTagBadge = (tag: string) => {
    let variant: any = "default";
    
    if (tag === "VIP") variant = "default";
    else if (tag === "Potansiyel") variant = "outline";
    else if (tag === "Randevu") variant = "secondary";
    else if (tag === "Acil") variant = "destructive";
    else if (tag === "Takip") variant = "default";
    else if (tag === "Şikayet") variant = "destructive";
    else if (tag === "Soru") variant = "outline";
    else variant = "secondary";
    
    return (
      <Badge 
        key={tag} 
        variant={variant}
        className="mr-1 mb-1 cursor-pointer"
        onClick={() => handleToggleTag(tag)}
      >
        {tag}
      </Badge>
    );
  };

  // Filtrelenmiş kişileri elde et
  const filteredContacts = contacts.filter((contact: any) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.toLowerCase();
    
    return (
      contact.chatId?.toLowerCase().includes(searchLower) ||
      contact.username?.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower) ||
      (contact.tags && contact.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Telegram Bot Yönetimi</h2>
        <div className="flex items-center space-x-2">
          {botSettings && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span>Bot Durumu:</span>
                <Switch
                  checked={botSettings.isActive}
                  onCheckedChange={(checked) => toggleBotStatusMutation.mutate(checked)}
                />
                <span>{botSettings.isActive ? "Aktif" : "Devre Dışı"}</span>
              </div>
              {toggleBotStatusMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="staff">
            <UserCog className="h-4 w-4 mr-2" />
            Personel Yönetimi
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Randevu Bildirimleri
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Bot Ayarları
          </TabsTrigger>
          <TabsTrigger value="predefined-messages">
            <MessageSquare className="h-4 w-4 mr-2" />
            Hazır Mesajlar
          </TabsTrigger>
        </TabsList>

        {/* Personel Yönetimi Sekmesi */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personel Telegram Hesapları</CardTitle>
              <CardDescription>
                Bot bildirimleri almak için telegram hesaplarını yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Önemli Uyarı</AlertTitle>
                  <AlertDescription>
                    Operatörler Telegram'da botla etkileşime geçmeden bildirim alamazlar. Her operatörün Telegram'da @MyHairClinicBot botunu bulup <strong>/start</strong> komutu göndermesi gerekiyor.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Telegram Operatörleri</h3>
                  <Button size="sm" onClick={() => {
                    setEditingOperator(null);
                    setIsOperatorDialogOpen(true);
                  }}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Personel Ekle
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İsim</TableHead>
                      <TableHead>Telegram Kullanıcı Adı</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {botSettings?.operators && botSettings.operators.length > 0 ? (
                      botSettings.operators.map((operator: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{operator.name}</TableCell>
                          <TableCell>@{operator.telegramUsername}</TableCell>
                          <TableCell>
                            <Badge variant={operator.isActive ? "default" : "secondary"}>
                              {operator.isActive ? "Aktif" : "Pasif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setEditingOperator(operator);
                                  setIsOperatorDialogOpen(true);
                                }}
                              >
                                Düzenle
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => {
                                  // Operatörü sil
                                  const newOperators = botSettings.operators.filter((op: any) => op.id !== operator.id);
                                  const updatedSettings = { ...botSettings, operators: newOperators };
                                  updateBotSettingsMutation.mutate(updatedSettings);
                                }}
                              >
                                Kaldır
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <p className="text-muted-foreground">Henüz operatör eklenmemiş.</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                            onClick={() => {
                              setEditingOperator(null);
                              setIsOperatorDialogOpen(true);
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            İlk Operatörü Ekle
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Telegram Dağıtım Grupları</CardTitle>
              <CardDescription>
                Farklı bildirim türleri için telegram gruplarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Randevu Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">
                          Yeni randevu oluşturulduğunda bu gruba bildirim gönderilir
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="appointment-group">Grup ID veya Kullanıcı Adı</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="appointment-group" 
                          placeholder="örn: -1001234567890" 
                          className="flex-1 mr-2" 
                          defaultValue="-1001234567890"
                        />
                        <Button variant="outline">Test</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Hatırlatma Bildirimleri</h4>
                        <p className="text-sm text-muted-foreground">
                          Randevuya 1 saat kala hatırlatma bildirimleri gönderilir
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="reminder-group">Grup ID veya Kullanıcı Adı</Label>
                      <div className="flex mt-1">
                        <Input 
                          id="reminder-group" 
                          placeholder="örn: -1001234567890" 
                          className="flex-1 mr-2" 
                          defaultValue="-1001234567890"
                        />
                        <Button variant="outline">Test</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Günlük Özet Raporları</h4>
                      <p className="text-sm text-muted-foreground">
                        Her gün saat 20:00'de gönderilen günlük özet raporları
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="summary-group">Grup ID veya Kullanıcı Adı</Label>
                    <div className="flex mt-1">
                      <Input 
                        id="summary-group" 
                        placeholder="örn: -1001234567890" 
                        className="flex-1 mr-2" 
                        defaultValue="-1001234567890"
                      />
                      <Button variant="outline">Test</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Randevu Bildirimleri Sekmesi */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Randevu Bildirim Şablonları</CardTitle>
              <CardDescription>
                Telegram bot'unun göndereceği randevu bildirimleri için şablonları düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Yeni Randevu Bildirimi</h3>
                    </div>
                    <div className="mt-2">
                      <Textarea 
                        rows={8}
                        placeholder="Şablon metni..."
                        defaultValue={`🔔 *YENİ RANDEVU BİLDİRİMİ*\n\n📆 Tarih: {date}\n⏰ Saat: {time}\n\n👤 *Hasta Bilgileri*\nİsim: {name}\nTelefon: {phone}\nE-posta: {email}\n\n💇 Hizmet: {service}\n\n📝 Ek Bilgiler: {message}`}
                      />
                    </div>
                    <div className="bg-muted rounded-md p-3 text-sm">
                      <p className="font-medium mb-1">Kullanılabilir değişkenler:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div><code>{"{date}"}</code> - Randevu tarihi</div>
                        <div><code>{"{time}"}</code> - Randevu saati</div>
                        <div><code>{"{name}"}</code> - Hasta adı</div>
                        <div><code>{"{phone}"}</code> - Telefon numarası</div>
                        <div><code>{"{email}"}</code> - E-posta adresi</div>
                        <div><code>{"{service}"}</code> - Hizmet adı</div>
                        <div><code>{"{message}"}</code> - Ek mesaj</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <BellRing className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Randevu Hatırlatması (1 Saat Önce)</h3>
                    </div>
                    <div className="mt-2">
                      <Textarea 
                        rows={8}
                        placeholder="Şablon metni..."
                        defaultValue={`⏰ *RANDEVU HATIRLATMASI*\n\nAşağıdaki randevunuz 1 saat içinde başlayacaktır:\n\n📆 Tarih: {date}\n⏰ Saat: {time}\n\n👤 *Hasta Bilgileri*\nİsim: {name}\nTelefon: {phone}\n\n💇 Hizmet: {service}`}
                      />
                    </div>
                    <div className="bg-muted rounded-md p-3 text-sm">
                      <p className="font-medium mb-1">Kullanılabilir değişkenler:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div><code>{"{date}"}</code> - Randevu tarihi</div>
                        <div><code>{"{time}"}</code> - Randevu saati</div>
                        <div><code>{"{name}"}</code> - Hasta adı</div>
                        <div><code>{"{phone}"}</code> - Telefon numarası</div>
                        <div><code>{"{service}"}</code> - Hizmet adı</div>
                        <div><code>{"{remaining_minutes}"}</code> - Kalan dakika</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Şablonları Kaydet</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Test Bildirimi Gönder</CardTitle>
              <CardDescription>
                Şablonları test etmek için örnek bir bildirim gönderebilirsiniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 border-amber-500 text-amber-800 bg-amber-50 dark:bg-amber-900 dark:text-amber-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Önemli Hatırlatma</AlertTitle>
                <AlertDescription>
                  Test göndermeden önce, hedef kullanıcının mutlaka <strong>@MyHairClinicBot</strong> ile bir sohbet başlatmış olması gerekiyor. 
                  Bu işlem için kullanıcı Telegram'da botu bulup <strong>/start</strong> komutunu göndermelidir.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-notification-type">Bildirim Türü</Label>
                    <Select
                      value={testNotificationType}
                      onValueChange={setTestNotificationType}
                    >
                      <SelectTrigger id="test-notification-type">
                        <SelectValue placeholder="Bildirim türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new_appointment">Yeni Randevu Bildirimi</SelectItem>
                        <SelectItem value="appointment_reminder">Randevu Hatırlatması</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="test-chat-id">Hedef Chat ID veya Kullanıcı Adı</Label>
                    <Input 
                      id="test-chat-id" 
                      placeholder="@kullaniciadi veya 123456789" 
                      autoComplete="off"
                      value={testChatId}
                      onChange={(e) => setTestChatId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Kullanıcı adını girerken @ işaretini eklemeyi unutmayın (ör: @kullaniciadi).
                      Chat ID girmek için sadece sayısal değer girin.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-end flex-col space-y-2">
                  <p className="text-sm text-muted-foreground mb-2 text-right">
                    Test mesajı başarısız olursa, kullanıcının botu başlatıp başlatmadığını kontrol edin.
                  </p>
                  <Button 
                    className="w-full"
                    disabled={sendTestNotificationMutation.isPending || !testChatId}
                    onClick={() => {
                      if (!testChatId) {
                        toast({
                          title: "Eksik Bilgi",
                          description: "Lütfen bir hedef kullanıcı adı veya chat ID girin.",
                          variant: "destructive"
                        });
                        return;
                      }
                      
                      sendTestNotificationMutation.mutate({
                        type: testNotificationType,
                        chatId: testChatId
                      });
                    }}
                  >
                    {sendTestNotificationMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      "Test Bildirimi Gönder"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ayarlar Sekmesi */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bot Ayarları</CardTitle>
              <CardDescription>
                Telegram bot'unuzun genel ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent>
              {botSettingsLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Form {...botSettingsForm}>
                  <form onSubmit={botSettingsForm.handleSubmit(onSubmitBotSettings)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={botSettingsForm.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel>Bot Durumu</FormLabel>
                              <FormDescription>
                                Bot'un aktif olup olmadığını belirler
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={botSettingsForm.control}
                        name="notifications.appointmentReminder"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel>Randevu Hatırlatma</FormLabel>
                              <FormDescription>
                                Randevulara 1 saat kala hatırlatma gönder
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={botSettingsForm.control}
                        name="notifications.dailySummary"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel>Günlük Özet</FormLabel>
                              <FormDescription>
                                Günlük randevu özeti bildirimlerini al
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={botSettingsForm.control}
                        name="notifications.newContact"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel>Acil Durum Bildirimleri</FormLabel>
                              <FormDescription>
                                İptal edilen veya değiştirilen randevular için bildirim al
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Desteklenen Diller</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {["tr", "en", "ru", "ka"].map((lang, index) => {
                          const langMap: Record<string, string> = {
                            tr: "Türkçe",
                            en: "İngilizce",
                            ru: "Rusça",
                            ka: "Gürcüce"
                          };
                          return (
                            <FormField
                              key={lang}
                              control={botSettingsForm.control}
                              name={`languages.${index}.isActive`}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 p-4 border rounded-lg">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="m-0">{langMap[lang]}</FormLabel>
                                </FormItem>
                              )}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={updateBotSettingsMutation.isPending}
                    >
                      {updateBotSettingsMutation.isPending && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      Ayarları Kaydet
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hazır Mesajlar Sekmesi */}
        <TabsContent value="predefined-messages" className="space-y-4">
          <PredefinedMessageManagement />
        </TabsContent>
      </Tabs>
      
      {/* Operatör Ekleme/Düzenleme Dialog */}
      <Dialog open={isOperatorDialogOpen} onOpenChange={setIsOperatorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingOperator ? 'Operatör Düzenle' : 'Yeni Operatör Ekle'}</DialogTitle>
            <DialogDescription>
              Telegram bot bildirimleri alacak personel hesabı ekleyin.
            </DialogDescription>
          </DialogHeader>
          
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Önemli Bilgi</AlertTitle>
            <AlertDescription>
              Operatörlerin Telegram bildirimleri alabilmesi için önce Telegram uygulamasından botu bulup <strong>/start</strong> komutu göndermeleri gerekiyor. Aksi halde "chat not found" hatası oluşacak ve bildirimler iletilemeyecektir.
            </AlertDescription>
          </Alert>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                İsim
              </Label>
              <Input
                id="name"
                defaultValue={editingOperator?.name || ''}
                className="col-span-3"
                placeholder="Personel adı"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telegramUsername" className="text-right">
                Telegram Kullanıcı Adı
              </Label>
              <Input
                id="telegramUsername"
                defaultValue={editingOperator?.telegramUsername || ''}
                className="col-span-3"
                placeholder="kullaniciadi (@ işareti olmadan)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Durum
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch 
                  id="status" 
                  checked={operatorStatus}
                  onCheckedChange={setOperatorStatus}
                />
                <Label htmlFor="status">Aktif</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOperatorDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => {
              const name = (document.getElementById('name') as HTMLInputElement).value;
              const telegramUsername = (document.getElementById('telegramUsername') as HTMLInputElement).value;
              const isActive = operatorStatus;
              
              if (!name || !telegramUsername) {
                toast({
                  title: "Eksik Bilgi",
                  description: "Lütfen tüm alanları doldurun.",
                  variant: "destructive"
                });
                return;
              }
              
              const operator = {
                id: editingOperator?.id || Date.now(),
                name,
                telegramUsername,
                isActive
              };
              
              const currentOperators = botSettings?.operators || [];
              let newOperators;
              
              if (editingOperator) {
                // Mevcut operatörü güncelle
                newOperators = currentOperators.map((op: any) => 
                  op.id === editingOperator.id ? operator : op
                );
              } else {
                // Yeni operatör ekle
                newOperators = [...currentOperators, operator];
              }
              
              const updatedSettings = { ...botSettings, operators: newOperators };
              updateBotSettingsMutation.mutate(updatedSettings);
              setIsOperatorDialogOpen(false);
            }}>
              {editingOperator ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}