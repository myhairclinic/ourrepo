import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Search, MoreHorizontal, Edit, Trash2, Check, X, Calendar, Upload, RefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

// Form şeması
const blogFormSchema = z.object({
  slug: z.string().min(3, { message: "Slug en az 3 karakter olmalıdır." }),
  titleTR: z.string().min(3, { message: "Başlık en az 3 karakter olmalıdır." }),
  titleEN: z.string().min(3, { message: "İngilizce başlık en az 3 karakter olmalıdır." }),
  titleRU: z.string().min(3, { message: "Rusça başlık en az 3 karakter olmalıdır." }),
  titleKA: z.string().min(3, { message: "Gürcüce başlık en az 3 karakter olmalıdır." }),
  summaryTR: z.string().min(10, { message: "Özet en az 10 karakter olmalıdır." }),
  summaryEN: z.string().min(10, { message: "İngilizce özet en az 10 karakter olmalıdır." }),
  summaryRU: z.string().min(10, { message: "Rusça özet en az 10 karakter olmalıdır." }),
  summaryKA: z.string().min(10, { message: "Gürcüce özet en az 10 karakter olmalıdır." }),
  contentTR: z.string().min(20, { message: "İçerik en az 20 karakter olmalıdır." }),
  contentEN: z.string().min(20, { message: "İngilizce içerik en az 20 karakter olmalıdır." }),
  contentRU: z.string().min(20, { message: "Rusça içerik en az 20 karakter olmalıdır." }),
  contentKA: z.string().min(20, { message: "Gürcüce içerik en az 20 karakter olmalıdır." }),
  imageUrl: z.string().min(1, { message: "Görsel URL'si gereklidir." }),
  category: z.string().min(1, { message: "Kategori seçmelisiniz." }),
  tags: z.string().optional(),
  author: z.string().optional(),
  authorTitle: z.string().optional(),
  readingTime: z.number().min(1).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional()
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

export default function BlogManagement() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  
  // Blog verilerini çek
  const { data: blogs, isLoading, refetch: refetchBlogs } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('Blog verileri çekilemedi');
      }
      return res.json();
    }
  });
  
  // Form tanımlaması
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      slug: "",
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      summaryTR: "",
      summaryEN: "",
      summaryRU: "",
      summaryKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      category: "",
      tags: "",
      author: "MyHair Clinic",
      authorTitle: "",
      readingTime: 5,
      isFeatured: false,
      isPublished: true
    }
  });
  
  // Blog oluşturma/güncelleme mutation'u
  const createUpdateBlogMutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      const url = selectedBlogId 
        ? `/api/blog/${selectedBlogId}` 
        : '/api/blog';
      
      const method = selectedBlogId ? 'PUT' : 'POST';
      
      // İlk olarak resim yükleme işlemi
      let finalImageUrl = data.imageUrl;
      if (selectedImageFile) {
        const formData = new FormData();
        formData.append('file', selectedImageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Görsel yükleme işlemi başarısız');
        }
        
        const uploadData = await uploadResponse.json();
        finalImageUrl = uploadData.fileUrl;
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          imageUrl: finalImageUrl
        })
      });
      
      if (!response.ok) {
        throw new Error('Blog işlemi başarısız');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      form.reset();
      refetchBlogs();
      queryClient.invalidateQueries({queryKey: ['/api/blog']});
      toast({
        title: selectedBlogId ? "Blog yazısı güncellendi" : "Blog yazısı oluşturuldu",
        description: selectedBlogId 
          ? "Blog yazısı başarıyla güncellendi." 
          : "Yeni blog yazısı başarıyla oluşturuldu.",
        variant: "default"
      });
      resetImageState();
    },
    onError: (error) => {
      console.error(selectedBlogId ? 'Blog güncelleme hatası:' : 'Blog oluşturma hatası:', error);
      toast({
        title: "Hata",
        description: selectedBlogId 
          ? "Blog yazısı güncellenirken bir hata oluştu." 
          : "Blog yazısı oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    }
  });
  
  // Blog silme mutation'u
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Blog silme işlemi başarısız');
      }
      
      return id;
    },
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      refetchBlogs();
      queryClient.invalidateQueries({queryKey: ['/api/blog']});
      toast({
        title: "Blog yazısı silindi",
        description: "Blog yazısı başarıyla silindi.",
        variant: "default"
      });
    },
    onError: (error) => {
      console.error('Blog silme hatası:', error);
      toast({
        title: "Hata",
        description: "Blog yazısı silinirken bir hata oluştu.",
        variant: "destructive"
      });
    }
  });
  
  // Resim durumunu sıfırlama
  const resetImageState = () => {
    setSelectedImageFile(null);
    setPreviewImageUrl("");
  };
  
  // Yeni blog oluşturma fonksiyonu
  const handleNewBlog = () => {
    form.reset({
      slug: "",
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      summaryTR: "",
      summaryEN: "",
      summaryRU: "",
      summaryKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      category: "",
      tags: "",
      author: "MyHair Clinic",
      authorTitle: "",
      readingTime: 5,
      isFeatured: false,
      isPublished: true
    });
    setSelectedBlogId(null);
    resetImageState();
    setIsDialogOpen(true);
  };
  
  // Blog düzenleme fonksiyonu
  const handleEditBlog = (blog: any) => {
    form.reset({
      slug: blog.slug,
      titleTR: blog.titleTR,
      titleEN: blog.titleEN,
      titleRU: blog.titleRU,
      titleKA: blog.titleKA,
      summaryTR: blog.summaryTR,
      summaryEN: blog.summaryEN,
      summaryRU: blog.summaryRU,
      summaryKA: blog.summaryKA,
      contentTR: blog.contentTR,
      contentEN: blog.contentEN,
      contentRU: blog.contentRU,
      contentKA: blog.contentKA,
      imageUrl: blog.imageUrl,
      category: blog.category || "",
      tags: blog.tags || "",
      author: blog.author || "MyHair Clinic",
      authorTitle: blog.authorTitle || "",
      readingTime: blog.readingTime || 5,
      isFeatured: blog.isFeatured || false,
      isPublished: blog.isPublished || true
    });
    setSelectedBlogId(blog.id);
    setPreviewImageUrl(blog.imageUrl);
    setIsDialogOpen(true);
  };
  
  // Blog silme fonksiyonu
  const handleDeleteBlog = (id: number) => {
    setSelectedBlogId(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Durum değiştirme fonksiyonu (featured/published)
  const handleToggleStatus = async (id: number, field: 'isFeatured' | 'isPublished') => {
    try {
      const url = `/api/blog/${id}/${field === 'isFeatured' ? 'feature' : 'publish'}`;
      
      const response = await fetch(url, {
        method: 'PATCH'
      });
      
      if (!response.ok) {
        throw new Error(`${field} durumu değiştirilemedi`);
      }
      
      refetchBlogs();
      queryClient.invalidateQueries({queryKey: ['/api/blog']});
      
      toast({
        title: "Durum değiştirildi",
        description: field === 'isFeatured' 
          ? "Öne çıkarma durumu değiştirildi." 
          : "Yayınlanma durumu değiştirildi.",
        variant: "default"
      });
    } catch (error) {
      console.error('Durum değiştirme hatası:', error);
      toast({
        title: "Hata",
        description: "Durum değiştirilirken bir hata oluştu.",
        variant: "destructive"
      });
    }
  };
  
  // Form gönderme fonksiyonu
  const onSubmit = (data: BlogFormValues) => {
    createUpdateBlogMutation.mutate(data);
  };
  
  // Resim seçme fonksiyonu
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      
      // Ön izleme URL'si oluştur
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // PrimeHealth görsellerini hızlıca seçmek için
  const handleSelectPrimeHealthImage = (index: number) => {
    const imageUrl = `/images/blog/primehealth${index}.png`;
    setPreviewImageUrl(imageUrl);
    form.setValue("imageUrl", imageUrl);
  };
  
  // Filtreleme fonksiyonu
  const filteredBlogs = blogs ? blogs.filter((blog: any) => {
    const matchesSearch = !searchTerm || 
      blog.titleTR.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.titleEN.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || blog.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }) : [];
  
  // Kategori listesi
  const categories = blogs ? Array.from(new Set(blogs.map((blog: any) => blog.category).filter(Boolean))) : [];
  
  // Formata edilmiş tarih
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
        <Button 
          onClick={handleNewBlog}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Yeni Blog Yazısı
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Blog yazısı ara..." 
              className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tüm Kategoriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Kategoriler</SelectItem>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Görsel</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Yükleniyor...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Blog yazısı bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog: any) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.titleTR} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Görsel yüklenemezse varsayılan görsel göster
                            const target = e.target as HTMLImageElement;
                            console.log('Blog yönetimi - Görsel yüklenemedi:', target.src);
                            target.src = '/images/blog/default-blog.jpg';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{blog.titleTR}</div>
                      <div className="text-xs text-gray-500">{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {blog.category || "Kategori Yok"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(blog.id, 'isPublished')}
                          className={`px-2 py-1 text-xs rounded-full flex items-center ${
                            blog.isPublished 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.isPublished ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Yayında
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3 mr-1" />
                              Taslak
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleToggleStatus(blog.id, 'isFeatured')}
                          className={`px-2 py-1 text-xs rounded-full flex items-center ${
                            blog.isFeatured 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.isFeatured ? "Öne Çıkan" : "Normal"}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditBlog(blog)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteBlog(blog.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {blogs && blogs.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500">
            Toplam {filteredBlogs.length} blog yazısı
          </div>
        )}
      </div>
      
      {/* Blog Oluşturma/Düzenleme Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedBlogId ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="ornek-blog-yazisi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Saç Ekimi">Saç Ekimi</SelectItem>
                          <SelectItem value="Saç Sağlığı">Saç Sağlığı</SelectItem>
                          <SelectItem value="Kadın Saç Ekimi">Kadın Saç Ekimi</SelectItem>
                          <SelectItem value="Bakım">Bakım</SelectItem>
                          <SelectItem value="Tıbbi Turizm">Tıbbi Turizm</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Türkçe form alanları */}
              <div className="bg-blue-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium text-blue-700">Türkçe İçerik</h3>
                
                <FormField
                  control={form.control}
                  name="titleTR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık (TR)</FormLabel>
                      <FormControl>
                        <Input placeholder="Türkçe başlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="summaryTR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Özet (TR)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Türkçe özet" 
                          rows={3} 
                          {...field} 
                        />
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
                        <Textarea 
                          placeholder="Türkçe içerik (HTML desteklenir)" 
                          rows={8} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* İngilizce form alanları */}
              <div className="bg-red-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium text-red-700">İngilizce İçerik</h3>
                
                <FormField
                  control={form.control}
                  name="titleEN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık (EN)</FormLabel>
                      <FormControl>
                        <Input placeholder="İngilizce başlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="summaryEN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Özet (EN)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="İngilizce özet" 
                          rows={3} 
                          {...field} 
                        />
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
                      <FormLabel>İçerik (EN)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="İngilizce içerik (HTML desteklenir)" 
                          rows={8} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Rusça form alanları */}
              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium text-gray-700">Rusça İçerik</h3>
                
                <FormField
                  control={form.control}
                  name="titleRU"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık (RU)</FormLabel>
                      <FormControl>
                        <Input placeholder="Rusça başlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="summaryRU"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Özet (RU)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Rusça özet" 
                          rows={3} 
                          {...field} 
                        />
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
                      <FormLabel>İçerik (RU)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Rusça içerik (HTML desteklenir)" 
                          rows={8} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Gürcüce form alanları */}
              <div className="bg-green-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium text-green-700">Gürcüce İçerik</h3>
                
                <FormField
                  control={form.control}
                  name="titleKA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık (KA)</FormLabel>
                      <FormControl>
                        <Input placeholder="Gürcüce başlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="summaryKA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Özet (KA)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Gürcüce özet" 
                          rows={3} 
                          {...field} 
                        />
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
                      <FormLabel>İçerik (KA)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Gürcüce içerik (HTML desteklenir)" 
                          rows={8} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Görsel yükleme bölümü */}
              <div className="bg-purple-50 p-4 rounded-md space-y-4">
                <h3 className="font-medium text-purple-700">Görsel ve Metaveriler</h3>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Görsel URL'si</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input 
                                placeholder="/images/blog/sample.jpg" 
                                {...field} 
                                value={field.value}
                              />
                              <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageSelect}
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                onClick={() => document.getElementById('imageUpload')?.click()}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* PrimeHealth görsellerini hızlı seçme butonları */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className="text-sm font-medium text-gray-700 w-full">PrimeHealth Görselleri:</p>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectPrimeHealthImage(index)}
                        >
                          PrimeHealth {index}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yazar</FormLabel>
                            <FormControl>
                              <Input placeholder="Yazar adı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="authorTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yazar Unvanı</FormLabel>
                            <FormControl>
                              <Input placeholder="Yazar unvanı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Etiketler (virgülle ayırın)</FormLabel>
                            <FormControl>
                              <Input placeholder="etiket1,etiket2,etiket3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="readingTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Okuma Süresi (dakika)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="60"
                                placeholder="5"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">Öne Çıkan</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isPublished"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">Yayınla</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    {previewImageUrl && (
                      <div className="border rounded-md overflow-hidden">
                        <div className="p-2 bg-gray-50 border-b text-sm font-medium">Görsel Önizleme</div>
                        <div className="p-4">
                          <img 
                            src={previewImageUrl} 
                            alt="Preview" 
                            className="w-full h-auto rounded-md object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  type="submit" 
                  disabled={createUpdateBlogMutation.isPending || isUploading}
                >
                  {createUpdateBlogMutation.isPending || isUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    'Kaydet'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Blog Silme Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blog Yazısını Sil</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedBlogId && deleteBlogMutation.mutate(selectedBlogId)}
              disabled={deleteBlogMutation.isPending}
            >
              {deleteBlogMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Siliniyor...
                </>
              ) : (
                'Sil'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}