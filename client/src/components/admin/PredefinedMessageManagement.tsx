import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MessageSquare, Edit, Trash, Check, Search, Languages } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Çoklu dil desteği için dil seçenekleri
const languageOptions = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "ka", label: "ქართული" }
];

export default function PredefinedMessageManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<string>("");
  
  // Yeni mesaj için form değerleri
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("tr");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Hazır mesajları getir
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['/api/telegram/predefined-messages'],
    queryFn: async () => {
      const res = await fetch('/api/telegram/predefined-messages');
      if (!res.ok) throw new Error('Hazır mesajlar alınamadı');
      return await res.json();
    }
  });

  // Mesaj kaydetme mutasyonu
  const saveMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const res = await fetch('/api/telegram/predefined-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Mesaj kaydedilemedi');
      }
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Mesaj şablonu kaydedildi",
        variant: "default",
      });
      resetForm();
      setDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/telegram/predefined-messages'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Mesaj silme mutasyonu
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/telegram/predefined-messages/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Mesaj silinemedi');
      }
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Mesaj şablonu silindi",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/telegram/predefined-messages'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Düzenleme modunda mesaj form alanlarını doldur
  useEffect(() => {
    if (editingMessage) {
      setTitle(editingMessage.title || "");
      setText(editingMessage.text || "");
      setLanguage(editingMessage.language || "tr");
      setTags(editingMessage.tags || []);
    }
  }, [editingMessage]);

  // Formu sıfırla
  const resetForm = () => {
    setTitle("");
    setText("");
    setLanguage("tr");
    setTagInput("");
    setTags([]);
    setEditingMessage(null);
  };

  // Yeni mesaj şablonu ekle/düzenle dialog'unu aç
  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  // Düzenleme dialog'unu aç
  const openEditDialog = (message: any) => {
    setEditingMessage(message);
    setDialogOpen(true);
  };

  // Etiket ekle
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Etiket kaldır
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Mesaj şablonu kaydet (ekleme veya güncelleme)
  const saveMessage = () => {
    if (!title.trim() || !text.trim()) {
      toast({
        title: "Hata",
        description: "Başlık ve mesaj içeriği gereklidir",
        variant: "destructive",
      });
      return;
    }

    const messageData = {
      id: editingMessage?.id,
      title: title.trim(),
      text: text.trim(),
      language,
      tags
    };

    saveMutation.mutate(messageData);
  };

  // Mesaj şablonunu sil
  const deleteMessage = (id: number) => {
    if (confirm("Bu mesaj şablonunu silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  // Dile göre filtre
  const filteredMessages = messages.filter((message: any) => {
    const matchesSearch = 
      message.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = filterLanguage ? message.language === filterLanguage : true;
    
    return matchesSearch && matchesLanguage;
  });

  // Dile göre etiket renkleri
  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case "tr": return "bg-red-100 text-red-800";
      case "en": return "bg-blue-100 text-blue-800";
      case "ru": return "bg-green-100 text-green-800";
      case "ka": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Dile göre isim
  const getLanguageName = (code: string) => {
    return languageOptions.find(opt => opt.value === code)?.label || code;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Telegram Hazır Mesaj Şablonları</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Şablon
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Şablonlarda ara..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filterLanguage} onValueChange={setFilterLanguage}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <SelectValue placeholder="Tüm Diller" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tüm Diller</SelectItem>
            {languageOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Yükleniyor...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {searchTerm || filterLanguage ? "Arama kriterlerine uygun mesaj şablonu bulunamadı." : "Henüz mesaj şablonu eklenmemiş."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMessages.map((message: any) => (
            <Card key={message.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{message.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(message)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMessage(message.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Badge className={`${getLanguageColor(message.language)}`}>
                  {getLanguageName(message.language)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-sm whitespace-pre-wrap max-h-32 overflow-y-auto">
                  {message.text}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {message.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMessage ? "Mesaj Şablonunu Düzenle" : "Yeni Mesaj Şablonu"}
            </DialogTitle>
            <DialogDescription>
              Telegram üzerinden hızlı yanıt vermek için bir mesaj şablonu oluşturun.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Başlık</Label>
              <Input 
                id="title" 
                placeholder="Şablon başlığı" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="text">Mesaj</Label>
              <Textarea 
                id="text" 
                placeholder="Mesaj içeriği"
                className="min-h-[120px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="language">Dil</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Etiketler</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Yeni etiket (eklemek için Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">Ekle</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={saveMessage} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Kaydediliyor..." : (
                <><Check className="mr-2 h-4 w-4" /> Kaydet</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}