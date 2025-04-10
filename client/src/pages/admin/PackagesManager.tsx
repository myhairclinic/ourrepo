import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Package, InsertPackage } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Edit, Trash2, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { useTranslation } from "@/hooks/use-translation";

// Form validation schema
const formSchema = z.object({
  titleTR: z.string().min(1, "Bu alan zorunludur"),
  titleEN: z.string().min(1, "Bu alan zorunludur"),
  titleRU: z.string().min(1, "Bu alan zorunludur"),
  titleKA: z.string().min(1, "Bu alan zorunludur"),
  descriptionTR: z.string().min(1, "Bu alan zorunludur"),
  descriptionEN: z.string().min(1, "Bu alan zorunludur"),
  descriptionRU: z.string().min(1, "Bu alan zorunludur"),
  descriptionKA: z.string().min(1, "Bu alan zorunludur"),
  contentTR: z.string().min(1, "Bu alan zorunludur"),
  contentEN: z.string().min(1, "Bu alan zorunludur"),
  contentRU: z.string().min(1, "Bu alan zorunludur"),
  contentKA: z.string().min(1, "Bu alan zorunludur"),
  price: z.coerce.number().min(0, "Fiyat negatif olamaz"),
  order: z.coerce.number().int().min(0),
  isActive: z.boolean().default(true),
  imageUrl: z.string().min(1, "Bu alan zorunludur"),
  imageFile: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PackagesManager() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: packages, isLoading: isLoadingPackages } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
    staleTime: 60 * 1000, // 1 minute
  });

  // Form control
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
      price: 0,
      order: 0,
      isActive: true,
      imageUrl: "",
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      let imageUrl = values.imageUrl;
      
      if (values.imageFile && values.imageFile.length > 0) {
        const formData = new FormData();
        formData.append("file", values.imageFile[0]);
        
        const uploadRes = await apiRequest("POST", "/api/upload", formData);
        if (!uploadRes.ok) throw new Error("Resim yüklenemedi");
        
        const { url } = await uploadRes.json();
        imageUrl = url;
      }
      
      const packageData: InsertPackage = {
        ...values,
        imageUrl,
        price: values.price
      };
      
      delete (packageData as any).imageFile;
      
      const res = await apiRequest("POST", "/api/packages", packageData);
      if (!res.ok) throw new Error("Paket eklenemedi");
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      form.reset();
      setPreviewUrl(null);
      toast({
        title: "Başarılı",
        description: "Paket başarıyla eklendi",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!editingPackage) return;
      
      let imageUrl = values.imageUrl;
      
      if (values.imageFile && values.imageFile.length > 0) {
        const formData = new FormData();
        formData.append("file", values.imageFile[0]);
        
        const uploadRes = await apiRequest("POST", "/api/upload", formData);
        if (!uploadRes.ok) throw new Error("Resim yüklenemedi");
        
        const { url } = await uploadRes.json();
        imageUrl = url;
      }
      
      const packageData: Partial<InsertPackage> = {
        ...values,
        imageUrl,
        price: values.price
      };
      
      delete (packageData as any).imageFile;
      
      const res = await apiRequest("PUT", `/api/packages/${editingPackage.id}`, packageData);
      if (!res.ok) throw new Error("Paket güncellenemedi");
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      form.reset();
      setEditingPackage(null);
      setPreviewUrl(null);
      toast({
        title: "Başarılı",
        description: "Paket başarıyla güncellendi",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/packages/${id}`);
      if (!res.ok) throw new Error("Paket silinemedi");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Başarılı",
        description: "Paket başarıyla silindi",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    if (editingPackage) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setPreviewUrl(pkg.imageUrl);
    form.reset({
      ...pkg,
      price: pkg.price || 0,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bu paketi silmek istediğinize emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setPreviewUrl(null);
    form.reset();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title="Paket Yönetimi">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="md:col-span-5 lg:col-span-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            {editingPackage ? "Paketi Düzenle" : "Yeni Paket Ekle"}
          </h2>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Turkish Fields */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">Türkçe Bilgiler</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Başlık (TR)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...form.register("titleTR")}
                />
                {form.formState.errors.titleTR && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.titleTR.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Açıklama (TR)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  {...form.register("descriptionTR")}
                />
                {form.formState.errors.descriptionTR && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.descriptionTR.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">İçerik (TR)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  {...form.register("contentTR")}
                />
                {form.formState.errors.contentTR && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.contentTR.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* English Fields */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">İngilizce Bilgiler</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Başlık (EN)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...form.register("titleEN")}
                />
                {form.formState.errors.titleEN && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.titleEN.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Açıklama (EN)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  {...form.register("descriptionEN")}
                />
                {form.formState.errors.descriptionEN && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.descriptionEN.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">İçerik (EN)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  {...form.register("contentEN")}
                />
                {form.formState.errors.contentEN && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.contentEN.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Russian Fields */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">Rusça Bilgiler</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Başlık (RU)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...form.register("titleRU")}
                />
                {form.formState.errors.titleRU && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.titleRU.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Açıklama (RU)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  {...form.register("descriptionRU")}
                />
                {form.formState.errors.descriptionRU && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.descriptionRU.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">İçerik (RU)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  {...form.register("contentRU")}
                />
                {form.formState.errors.contentRU && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.contentRU.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Georgian Fields */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">Gürcüce Bilgiler</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Başlık (KA)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...form.register("titleKA")}
                />
                {form.formState.errors.titleKA && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.titleKA.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Açıklama (KA)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  {...form.register("descriptionKA")}
                />
                {form.formState.errors.descriptionKA && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.descriptionKA.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">İçerik (KA)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  {...form.register("contentKA")}
                />
                {form.formState.errors.contentKA && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.contentKA.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Other Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fiyat (€)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  min="0"
                  {...form.register("price")}
                />
                {form.formState.errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sıralama</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  min="0"
                  {...form.register("order")}
                />
                {form.formState.errors.order && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.order.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="mr-2"
                  {...form.register("isActive")}
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Aktif
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Resim URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  {...form.register("imageUrl")}
                />
                {form.formState.errors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.imageUrl.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Veya Resim Yükle</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded"
                  onChange={handleFileChange}
                />
              </div>
              
              {previewUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Önizleme</p>
                  <img
                    src={previewUrl}
                    alt="Önizleme"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 flex items-center"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingPackage ? "Güncelle" : "Ekle"}
              </button>
              
              {editingPackage && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Packages List */}
        <div className="md:col-span-7 lg:col-span-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Paketler</h2>
          
          {isLoadingPackages ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !packages || packages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Henüz hiç paket bulunmuyor.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resim
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Başlık
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sıra
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {pkg.imageUrl ? (
                          <img
                            src={pkg.imageUrl}
                            alt={pkg.titleTR}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <FileImage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pkg.titleTR}</div>
                        <div className="text-xs text-gray-500">{pkg.titleEN}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">€{pkg.price || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pkg.order}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          pkg.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {pkg.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}