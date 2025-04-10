import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { API_ROUTES } from "@/lib/constants";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InsertFAQ } from "../../../../shared/schema";
import { Loader2, Plus, Trash2, PencilLine } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const faqFormSchema = z.object({
  questionTR: z.string().min(3, "Soru en az 3 karakter olmalıdır"),
  questionEN: z.string().min(3, "Soru en az 3 karakter olmalıdır"),
  questionRU: z.string().min(3, "Soru en az 3 karakter olmalıdır"),
  questionKA: z.string().min(3, "Soru en az 3 karakter olmalıdır"),
  answerTR: z.string().min(3, "Cevap en az 3 karakter olmalıdır"),
  answerEN: z.string().min(3, "Cevap en az 3 karakter olmalıdır"),
  answerRU: z.string().min(3, "Cevap en az 3 karakter olmalıdır"),
  answerKA: z.string().min(3, "Cevap en az 3 karakter olmalıdır"),
  serviceId: z.string().optional().nullable(),
  order: z.coerce.number().min(0, "Sıra 0 veya daha büyük olmalıdır").default(0),
  isActive: z.boolean().default(true),
});

type FaqFormData = z.infer<typeof faqFormSchema>;

export default function FaqsManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  const { data: faqs, isLoading: isLoadingFaqs } = useQuery({
    queryKey: [API_ROUTES.FAQS],
    queryFn: async () => {
      const res = await fetch(API_ROUTES.FAQS);
      if (!res.ok) throw new Error("FAQs could not be loaded");
      return res.json();
    },
  });

  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: [API_ROUTES.SERVICES],
    queryFn: async () => {
      const res = await fetch(API_ROUTES.SERVICES);
      if (!res.ok) throw new Error("Services could not be loaded");
      return res.json();
    },
  });

  const form = useForm<FaqFormData>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      questionTR: "",
      questionEN: "",
      questionRU: "",
      questionKA: "",
      answerTR: "",
      answerEN: "",
      answerRU: "",
      answerKA: "",
      serviceId: null,
      order: 0,
      isActive: true,
    },
  });

  const createFaqMutation = useMutation({
    mutationFn: async (data: FaqFormData) => {
      // Convert serviceId string to number or null
      const updatedData = {
        ...data,
        serviceId: data.serviceId ? parseInt(data.serviceId) : null,
      };
      const res = await apiRequest("POST", API_ROUTES.FAQS, updatedData);
      if (!res.ok) throw new Error("FAQ could not be created");
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "SSS başarıyla eklendi.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.FAQS] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `SSS eklenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateFaqMutation = useMutation({
    mutationFn: async (data: FaqFormData & { id: number }) => {
      const { id, ...updateData } = data;
      // Convert serviceId string to number or null
      const updatedData = {
        ...updateData,
        serviceId: updateData.serviceId ? parseInt(updateData.serviceId) : null,
      };
      const res = await apiRequest("PUT", `${API_ROUTES.FAQS}/${id}`, updatedData);
      if (!res.ok) throw new Error("FAQ could not be updated");
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "SSS başarıyla güncellendi.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.FAQS] });
      setIsDialogOpen(false);
      setEditingFaq(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `SSS güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `${API_ROUTES.FAQS}/${id}`);
      if (!res.ok) throw new Error("FAQ could not be deleted");
      return id;
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "SSS başarıyla silindi.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.FAQS] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `SSS silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FaqFormData) {
    if (dialogMode === "add") {
      createFaqMutation.mutate(data);
    } else if (dialogMode === "edit" && editingFaq) {
      updateFaqMutation.mutate({ ...data, id: editingFaq.id });
    }
  }

  const openAddDialog = () => {
    form.reset({
      questionTR: "",
      questionEN: "",
      questionRU: "",
      questionKA: "",
      answerTR: "",
      answerEN: "",
      answerRU: "",
      answerKA: "",
      serviceId: null,
      order: 0,
      isActive: true,
    });
    setDialogMode("add");
    setEditingFaq(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (faq: any) => {
    setEditingFaq(faq);
    setDialogMode("edit");
    form.reset({
      questionTR: faq.questionTR,
      questionEN: faq.questionEN,
      questionRU: faq.questionRU,
      questionKA: faq.questionKA,
      answerTR: faq.answerTR,
      answerEN: faq.answerEN,
      answerRU: faq.answerRU,
      answerKA: faq.answerKA,
      serviceId: faq.serviceId ? faq.serviceId.toString() : null,
      order: faq.order,
      isActive: faq.isActive,
    });
    setIsDialogOpen(true);
  };

  const filteredFaqs = currentTab 
    ? faqs?.filter((faq: any) => 
        currentTab === "general" 
          ? !faq.serviceId 
          : faq.serviceId?.toString() === currentTab
      )
    : faqs;

  // If tabs aren't available yet (services not loaded), show all FAQs
  const faqsToDisplay = currentTab ? filteredFaqs : faqs;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sıkça Sorulan Sorular Yönetimi</h1>
          <p className="text-muted-foreground">
            Klinik hakkında sıkça sorulan soruları yönetin
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> SSS Ekle
        </Button>
      </div>

      {isLoadingFaqs || isLoadingServices ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Tabs 
            defaultValue="all" 
            className="mb-6"
            onValueChange={(value) => setCurrentTab(value === "all" ? null : value)}
          >
            <TabsList>
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="general">Genel</TabsTrigger>
              {services?.map((service: any) => (
                <TabsTrigger key={service.id} value={service.id.toString()}>
                  {service.titleTR}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {faqsToDisplay?.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">Henüz soru eklenmemiş</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={openAddDialog}
                  >
                    <Plus className="mr-2 h-4 w-4" /> SSS Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {faqsToDisplay?.map((faq: any) => (
                <Card key={faq.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-xl">{faq.questionTR}</CardTitle>
                        {faq.serviceId && services && (
                          <CardDescription>
                            Servis: {services.find((s: any) => s.id === faq.serviceId)?.titleTR}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => openEditDialog(faq)}
                        >
                          <PencilLine className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>SSS'yi silmek istediğinizden emin misiniz?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu işlem geri alınamaz. Bu SSS kalıcı olarak silinecektir.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteFaqMutation.mutate(faq.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
                      <p>{faq.answerTR}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between text-sm text-muted-foreground">
                    <div>Sıra: {faq.order}</div>
                    <div>Durum: {faq.isActive ? "Aktif" : "Pasif"}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Yeni SSS Ekle" : "SSS Düzenle"}
            </DialogTitle>
            <DialogDescription>
              Web sitesinde görüntülenecek sıkça sorulan soruları ekleyin veya düzenleyin.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servis (İsteğe bağlı)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Genel SSS (servis yok)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Genel SSS (servis yok)</SelectItem>
                          {services?.map((service: any) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.titleTR}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sıra</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Tabs defaultValue="tr" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="tr">Türkçe</TabsTrigger>
                  <TabsTrigger value="en">İngilizce</TabsTrigger>
                  <TabsTrigger value="ru">Rusça</TabsTrigger>
                  <TabsTrigger value="ka">Gürcüce</TabsTrigger>
                </TabsList>

                <TabsContent value="tr" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="questionTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soru (Türkçe)</FormLabel>
                        <FormControl>
                          <Input placeholder="Soru girin..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answerTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cevap (Türkçe)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Cevap girin..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="questionEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soru (İngilizce)</FormLabel>
                        <FormControl>
                          <Input placeholder="Soru girin..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answerEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cevap (İngilizce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Cevap girin..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="ru" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="questionRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soru (Rusça)</FormLabel>
                        <FormControl>
                          <Input placeholder="Soru girin..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answerRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cevap (Rusça)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Cevap girin..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="ka" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="questionKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soru (Gürcüce)</FormLabel>
                        <FormControl>
                          <Input placeholder="Soru girin..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answerKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cevap (Gürcüce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Cevap girin..." 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Aktif</FormLabel>
                      <FormDescription>
                        Bu SSS web sitesinde görüntülensin mi?
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

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" disabled={createFaqMutation.isPending || updateFaqMutation.isPending}>
                  {createFaqMutation.isPending || updateFaqMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {dialogMode === "add" ? "Ekleniyor..." : "Güncelleniyor..."}
                    </>
                  ) : (
                    <>{dialogMode === "add" ? "Ekle" : "Güncelle"}</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}