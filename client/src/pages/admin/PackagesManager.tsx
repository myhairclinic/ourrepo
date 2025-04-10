import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Package, insertPackageSchema } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash2, Pencil, Plus, ImagePlus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

const formSchema = insertPackageSchema.extend({
  imageFile: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PackagesManager() {
  const { toast } = useToast();
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      price: 0,
      order: 0,
      isActive: true,
    },
  });

  const createPackageMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();
      
      // Add all text fields to formData
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "imageFile" && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      // Add image file if present
      if (values.imageFile && values.imageFile.length > 0) {
        formData.append("image", values.imageFile[0]);
      }
      
      const response = await apiRequest("POST", "/api/packages", formData, true);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Paket oluşturuldu",
        description: "Paket başarıyla oluşturuldu.",
      });
      form.reset();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Paket oluşturulurken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updatePackageMutation = useMutation({
    mutationFn: async (values: FormValues & { id: number }) => {
      const { id, ...data } = values;
      const formData = new FormData();
      
      // Add all text fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "imageFile" && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      // Add image file if present
      if (values.imageFile && values.imageFile.length > 0) {
        formData.append("image", values.imageFile[0]);
      }
      
      const response = await apiRequest("PATCH", `/api/packages/${id}`, formData, true);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Paket güncellendi",
        description: "Paket başarıyla güncellendi.",
      });
      setEditingPackage(null);
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Paket güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deletePackageMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Paket silindi",
        description: "Paket başarıyla silindi.",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Paket silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    if (editingPackage) {
      updatePackageMutation.mutate({ ...values, id: editingPackage.id });
    } else {
      createPackageMutation.mutate(values);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    form.reset({
      titleTR: pkg.titleTR,
      titleEN: pkg.titleEN,
      titleRU: pkg.titleRU,
      titleKA: pkg.titleKA,
      descriptionTR: pkg.descriptionTR,
      descriptionEN: pkg.descriptionEN,
      descriptionRU: pkg.descriptionRU,
      descriptionKA: pkg.descriptionKA,
      contentTR: pkg.contentTR,
      contentEN: pkg.contentEN,
      contentRU: pkg.contentRU,
      contentKA: pkg.contentKA,
      imageUrl: pkg.imageUrl,
      price: pkg.price,
      order: pkg.order,
      isActive: pkg.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bu paketi silmek istediğinize emin misiniz?")) {
      deletePackageMutation.mutate(id);
    }
  };

  const handleAdd = () => {
    setEditingPackage(null);
    form.reset({
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      price: 0,
      order: 0,
      isActive: true,
    });
    setIsAddDialogOpen(true);
  };

  const PackageForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="tr">
          <TabsList className="mb-4">
            <TabsTrigger value="tr">Türkçe</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ru">Русский</TabsTrigger>
            <TabsTrigger value="ka">ქართული</TabsTrigger>
            <TabsTrigger value="common">Ortak Alanlar</TabsTrigger>
          </TabsList>

          {/* Türkçe İçerik */}
          <TabsContent value="tr" className="space-y-4">
            <FormField
              control={form.control}
              name="titleTR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlık (TR)</FormLabel>
                  <FormControl>
                    <Input placeholder="Paket başlığı..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="descriptionTR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama (TR)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Kısa açıklama..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contentTR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İçerik (TR)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="HTML içerik..." rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* İngilizce İçerik */}
          <TabsContent value="en" className="space-y-4">
            <FormField
              control={form.control}
              name="titleEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (EN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Package title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="descriptionEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (EN)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short description..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contentEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (EN)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="HTML content..." rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Rusça İçerik */}
          <TabsContent value="ru" className="space-y-4">
            <FormField
              control={form.control}
              name="titleRU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок (RU)</FormLabel>
                  <FormControl>
                    <Input placeholder="Заголовок пакета..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="descriptionRU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание (RU)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Краткое описание..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contentRU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Содержание (RU)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="HTML содержание..." rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Gürcüce İçerik */}
          <TabsContent value="ka" className="space-y-4">
            <FormField
              control={form.control}
              name="titleKA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>სათაური (KA)</FormLabel>
                  <FormControl>
                    <Input placeholder="პაკეტის სათაური..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="descriptionKA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>აღწერა (KA)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="მოკლე აღწერა..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contentKA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>შინაარსი (KA)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="HTML შინაარსი..." rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Ortak Alanlar */}
          <TabsContent value="common" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fiyat (EUR)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sıralama</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resim URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Yeni Resim Yükle</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Aktif</FormLabel>
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
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
            }}
          >
            <X className="mr-2 h-4 w-4" /> İptal
          </Button>
          <Button type="submit" disabled={createPackageMutation.isPending || updatePackageMutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {createPackageMutation.isPending || updatePackageMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <AdminLayout title="Paket Yönetimi">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paketler</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" /> Yeni Paket Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Yeni Paket Ekle</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[70vh] pr-4">
              <PackageForm />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Paketler yükleniyor...</p>
        </div>
      ) : packages && packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${pkg.imageUrl})` }}
              />
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{pkg.titleTR}</span>
                  <span className="text-base font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                    €{pkg.price}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">{pkg.descriptionTR}</p>
                <div className="mt-2 flex items-center text-xs">
                  <span className={`px-2 py-1 rounded ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pkg.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                  <span className="ml-2 text-gray-500">
                    Sıra: {pkg.order}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog open={isEditDialogOpen && editingPackage?.id === pkg.id} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>Paketi Düzenle</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] pr-4">
                      <PackageForm />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(pkg.id)}
                  disabled={deletePackageMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">Henüz hiç paket eklenmemiş.</p>
          <Button className="mt-4" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" /> İlk Paketi Ekle
          </Button>
        </div>
      )}
    </AdminLayout>
  );
}