import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { API_ROUTES } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Edit, 
  Trash, 
  Plus, 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Image,
  FileEdit
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { BlogPost } from "@shared/schema";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form validation schema for creating/editing blog posts
const blogFormSchema = z.object({
  slug: z.string().min(3, "Slug en az 3 karakter olmalıdır").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
  titleTR: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  titleEN: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  titleRU: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  titleKA: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  summaryTR: z.string().min(10, "Özet en az 10 karakter olmalıdır"),
  summaryEN: z.string().min(10, "Özet en az 10 karakter olmalıdır"),
  summaryRU: z.string().min(10, "Özet en az 10 karakter olmalıdır"),
  summaryKA: z.string().min(10, "Özet en az 10 karakter olmalıdır"),
  contentTR: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
  contentEN: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
  contentRU: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
  contentKA: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
  imageUrl: z.string().min(1, "Görsel URL'si gereklidir"),
  category: z.string().min(1, "Kategori seçimi zorunludur"),
  metaTitleTR: z.string().optional(),
  metaTitleEN: z.string().optional(),
  metaTitleRU: z.string().optional(),
  metaTitleKA: z.string().optional(),
  metaDescriptionTR: z.string().optional(),
  metaDescriptionEN: z.string().optional(),
  metaDescriptionRU: z.string().optional(),
  metaDescriptionKA: z.string().optional(),
  isPublished: z.boolean().default(true),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

export default function BlogManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  
  // Get all blog posts
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: [API_ROUTES.BLOG],
  });
  
  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.titleTR.toLowerCase().includes(searchLower) ||
      post.titleEN.toLowerCase().includes(searchLower) ||
      post.titleRU.toLowerCase().includes(searchLower) ||
      post.titleKA.toLowerCase().includes(searchLower) ||
      post.summaryTR.toLowerCase().includes(searchLower) ||
      post.summaryEN.toLowerCase().includes(searchLower) ||
      post.summaryRU.toLowerCase().includes(searchLower) ||
      post.summaryKA.toLowerCase().includes(searchLower) ||
      post.slug.toLowerCase().includes(searchLower)
    );
  });
  
  // Create form
  const createForm = useForm<BlogFormValues>({
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
      metaTitleTR: "",
      metaTitleEN: "",
      metaTitleRU: "",
      metaTitleKA: "",
      metaDescriptionTR: "",
      metaDescriptionEN: "",
      metaDescriptionRU: "",
      metaDescriptionKA: "",
      isPublished: true
    }
  });
  
  // Edit form
  const editForm = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema.partial()),
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
      metaTitleTR: "",
      metaTitleEN: "",
      metaTitleRU: "",
      metaTitleKA: "",
      metaDescriptionTR: "",
      metaDescriptionEN: "",
      metaDescriptionRU: "",
      metaDescriptionKA: "",
      isPublished: true
    }
  });
  
  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      const response = await apiRequest("POST", API_ROUTES.BLOG, data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Blog yazısı oluşturuldu",
        description: "Blog yazısı başarıyla oluşturuldu.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      setCreateDialogOpen(false);
      createForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Blog yazısı oluşturulurken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { id: number, data: Partial<BlogFormValues> }) => {
      const response = await apiRequest("PUT", `${API_ROUTES.BLOG}/${data.id}`, data.data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Blog yazısı güncellendi",
        description: "Blog yazısı başarıyla güncellendi.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      setEditDialogOpen(false);
      setEditingPost(null);
      editForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Blog yazısı güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${API_ROUTES.BLOG}/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Blog yazısı silindi",
        description: "Blog yazısı başarıyla silindi.",
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      setDeleteDialogOpen(false);
      setDeletingPostId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Blog yazısı silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission for creating a blog post
  function onCreateSubmit(values: BlogFormValues) {
    createMutation.mutate(values);
  }
  
  // Handle form submission for editing a blog post
  function onEditSubmit(values: BlogFormValues) {
    if (editingPost) {
      updateMutation.mutate({
        id: editingPost.id,
        data: values
      });
    }
  }
  
  // Handle deleting a blog post
  function handleDelete() {
    if (deletingPostId) {
      deleteMutation.mutate(deletingPostId);
    }
  }
  
  // Set up edit form when editing a post
  function handleEditClick(post: BlogPost) {
    setEditingPost(post);
    editForm.reset({
      slug: post.slug,
      titleTR: post.titleTR,
      titleEN: post.titleEN,
      titleRU: post.titleRU,
      titleKA: post.titleKA,
      summaryTR: post.summaryTR,
      summaryEN: post.summaryEN,
      summaryRU: post.summaryRU,
      summaryKA: post.summaryKA,
      contentTR: post.contentTR,
      contentEN: post.contentEN,
      contentRU: post.contentRU,
      contentKA: post.contentKA,
      imageUrl: post.imageUrl,
      category: post.category,
      metaTitleTR: post.metaTitleTR || "",
      metaTitleEN: post.metaTitleEN || "",
      metaTitleRU: post.metaTitleRU || "",
      metaTitleKA: post.metaTitleKA || "",
      metaDescriptionTR: post.metaDescriptionTR || "",
      metaDescriptionEN: post.metaDescriptionEN || "",
      metaDescriptionRU: post.metaDescriptionRU || "",
      metaDescriptionKA: post.metaDescriptionKA || "",
      isPublished: post.isPublished
    });
    setEditDialogOpen(true);
  }
  
  // Format date for display
  function formatDate(date: Date | string) {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }) + ' ' + dateObj.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Get category name for display
  function getCategoryName(categorySlug: string) {
    const categories: Record<string, string> = {
      'hair-transplant': 'Saç Ekimi',
      'eyebrow-transplant': 'Kaş Ekimi',
      'beard-transplant': 'Sakal Ekimi',
      'prp': 'PRP Tedavisi',
      'travel': 'Seyahat',
      'clinic': 'Klinik',
      'news': 'Haberler',
      'faq': 'SSS'
    };
    
    return categories[categorySlug] || categorySlug;
  }
  
  // Truncate text for display
  function truncateText(text: string, maxLength: number = 50) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  
  return (
    <AdminLayout title="Blog Yönetimi">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Blog yazısı ara..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={async () => {
              try {
                toast({
                  title: "İşlem başlatıldı",
                  description: "Blog yazıları ekleme işlemi başlatıldı, bu işlem biraz zaman alabilir...",
                });
                
                const response = await fetch('/api/seed/unique-blogs', { method: 'POST' });
                const data = await response.json();
                if (response.ok) {
                  queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
                  toast({
                    title: "Blog içerikleri eklendi",
                    description: `${data.count} adet blog içeriği başarıyla eklendi.`,
                  });
                } else {
                  toast({
                    title: "Hata",
                    description: data.message || "Blog içerikleri eklenirken bir hata oluştu.",
                    variant: "destructive",
                  });
                }
              } catch (error) {
                toast({
                  title: "Hata",
                  description: "Blog içerikleri eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
                  variant: "destructive",
                });
              }
            }}
          >
            Blog İçeriklerini Ekle
          </Button>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Blog Yazısı
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Blog Yazısı Ekle</DialogTitle>
              <DialogDescription>
                Aşağıdaki formu doldurarak yeni bir blog yazısı ekleyin. Tüm alanları doldurmanız gerekmektedir.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="content">İçerik</TabsTrigger>
                <TabsTrigger value="turkish">Türkçe</TabsTrigger>
                <TabsTrigger value="english">İngilizce</TabsTrigger>
                <TabsTrigger value="russian">Rusça</TabsTrigger>
                <TabsTrigger value="georgian">Gürcüce</TabsTrigger>
                <TabsTrigger value="meta">SEO</TabsTrigger>
              </TabsList>
              
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onCreateSubmit)}>
                  <TabsContent value="content" className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="ornek-blog-yazisi" {...field} />
                          </FormControl>
                          <FormDescription>
                            Bu, blog yazısının URL'sinde kullanılacak benzersiz bir kimlik olacaktır.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Bir kategori seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hair-transplant">Saç Ekimi</SelectItem>
                              <SelectItem value="eyebrow-transplant">Kaş Ekimi</SelectItem>
                              <SelectItem value="beard-transplant">Sakal Ekimi</SelectItem>
                              <SelectItem value="prp">PRP Tedavisi</SelectItem>
                              <SelectItem value="travel">Seyahat</SelectItem>
                              <SelectItem value="clinic">Klinik</SelectItem>
                              <SelectItem value="news">Haberler</SelectItem>
                              <SelectItem value="faq">SSS</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Görsel URL</FormLabel>
                          <FormControl>
                            <Input placeholder="/images/blog/ornek.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Blog yazısı için ana görsel URL'si.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Yayınla</FormLabel>
                            <FormDescription>
                              Bu blog yazısı hemen yayınlansın mı?
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
                  </TabsContent>
                  
                  <TabsContent value="turkish" className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="titleTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık (Türkçe)</FormLabel>
                          <FormControl>
                            <Input placeholder="Blog yazısı başlığı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="summaryTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Özet (Türkçe)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Blog yazısının kısa özeti" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="contentTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İçerik (Türkçe)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Blog yazısının tam içeriği" 
                              className="min-h-[300px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            HTML etiketleri kullanabilirsiniz. Örneğin: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="english" className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="titleEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık (İngilizce)</FormLabel>
                          <FormControl>
                            <Input placeholder="Blog post title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="summaryEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Özet (İngilizce)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief summary of the blog post" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="contentEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İçerik (İngilizce)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Full content of the blog post" 
                              className="min-h-[300px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            You can use HTML tags. For example: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="russian" className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="titleRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık (Rusça)</FormLabel>
                          <FormControl>
                            <Input placeholder="Заголовок блога" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="summaryRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Özet (Rusça)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Краткое содержание блога" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="contentRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İçerik (Rusça)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Полное содержание блога" 
                              className="min-h-[300px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Вы можете использовать HTML-теги. Например: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="georgian" className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="titleKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık (Gürcüce)</FormLabel>
                          <FormControl>
                            <Input placeholder="ბლოგის სათაური" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="summaryKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Özet (Gürcüce)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="ბლოგის მოკლე შინაარსი" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="contentKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İçerik (Gürcüce)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="ბლოგის სრული შინაარსი" 
                              className="min-h-[300px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            შეგიძლიათ გამოიყენოთ HTML ტეგები. მაგალითად: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="meta" className="space-y-4">
                    <h3 className="text-lg font-medium mb-4">SEO Meta Etiketleri (İsteğe Bağlı)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="metaTitleTR"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Başlık (Türkçe)</FormLabel>
                            <FormControl>
                              <Input placeholder="SEO başlığı" {...field} />
                            </FormControl>
                            <FormDescription>
                              Boş bırakılırsa normal başlık kullanılacaktır.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaDescriptionTR"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Açıklama (Türkçe)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="SEO açıklaması" {...field} />
                            </FormControl>
                            <FormDescription>
                              Boş bırakılırsa özet kullanılacaktır.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaTitleEN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Başlık (İngilizce)</FormLabel>
                            <FormControl>
                              <Input placeholder="SEO title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaDescriptionEN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Açıklama (İngilizce)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="SEO description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaTitleRU"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Başlık (Rusça)</FormLabel>
                            <FormControl>
                              <Input placeholder="SEO заголовок" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaDescriptionRU"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Açıklama (Rusça)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="SEO описание" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaTitleKA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Başlık (Gürcüce)</FormLabel>
                            <FormControl>
                              <Input placeholder="SEO სათაური" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="metaDescriptionKA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Açıklama (Gürcüce)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="SEO აღწერა" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit" className="ml-2" disabled={createMutation.isPending}>
                      {createMutation.isPending && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      )}
                      Kaydet
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Blog posts table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="hidden md:table-cell">Yayın Durumu</TableHead>
                <TableHead className="hidden md:table-cell">Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Henüz blog yazısı bulunmuyor
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts?.map((post: BlogPost) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.id}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <img src={post.imageUrl} alt={post.titleTR} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{truncateText(post.titleTR, 40)}</div>
                          <div className="text-xs text-muted-foreground">{post.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {getCategoryName(post.category)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Yayında</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-xs">Taslak</span>
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-xs text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          title="Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(post)}
                          title="Düzenle"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setDeletingPostId(post.id);
                            setDeleteDialogOpen(true);
                          }}
                          title="Sil"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Edit dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Yazısını Düzenle</DialogTitle>
            <DialogDescription>
              Blog yazısını düzenleyin. Yalnızca değiştirmek istediğiniz alanları güncellemeniz yeterlidir.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="content">İçerik</TabsTrigger>
              <TabsTrigger value="turkish">Türkçe</TabsTrigger>
              <TabsTrigger value="english">İngilizce</TabsTrigger>
              <TabsTrigger value="russian">Rusça</TabsTrigger>
              <TabsTrigger value="georgian">Gürcüce</TabsTrigger>
              <TabsTrigger value="meta">SEO</TabsTrigger>
            </TabsList>
            
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)}>
                <TabsContent value="content" className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Bu, blog yazısının URL'sinde kullanılacak benzersiz bir kimlik olacaktır.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Bir kategori seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hair-transplant">Saç Ekimi</SelectItem>
                            <SelectItem value="eyebrow-transplant">Kaş Ekimi</SelectItem>
                            <SelectItem value="beard-transplant">Sakal Ekimi</SelectItem>
                            <SelectItem value="prp">PRP Tedavisi</SelectItem>
                            <SelectItem value="travel">Seyahat</SelectItem>
                            <SelectItem value="clinic">Klinik</SelectItem>
                            <SelectItem value="news">Haberler</SelectItem>
                            <SelectItem value="faq">SSS</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Görsel URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Blog yazısı için ana görsel URL'si.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Yayınla</FormLabel>
                          <FormDescription>
                            Bu blog yazısı yayınlansın mı?
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
                </TabsContent>
                
                <TabsContent value="turkish" className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="titleTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başlık (Türkçe)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="summaryTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özet (Türkçe)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="contentTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerik (Türkçe)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[300px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          HTML etiketleri kullanabilirsiniz. Örneğin: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="english" className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="titleEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başlık (İngilizce)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="summaryEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özet (İngilizce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="contentEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerik (İngilizce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[300px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          You can use HTML tags. For example: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="russian" className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="titleRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başlık (Rusça)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="summaryRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özet (Rusça)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="contentRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerik (Rusça)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[300px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Вы можете использовать HTML-теги. Например: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="georgian" className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="titleKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başlık (Gürcüce)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="summaryKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Özet (Gürcüce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="contentKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerik (Gürcüce)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[300px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          შეგიძლიათ გამოიყენოთ HTML ტეგები. მაგალითად: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="meta" className="space-y-4">
                  <h3 className="text-lg font-medium mb-4">SEO Meta Etiketleri (İsteğe Bağlı)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="metaTitleTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Başlık (Türkçe)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Boş bırakılırsa normal başlık kullanılacaktır.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaDescriptionTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Açıklama (Türkçe)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormDescription>
                            Boş bırakılırsa özet kullanılacaktır.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaTitleEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Başlık (İngilizce)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaDescriptionEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Açıklama (İngilizce)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaTitleRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Başlık (Rusça)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaDescriptionRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Açıklama (Rusça)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaTitleKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Başlık (Gürcüce)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="metaDescriptionKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Açıklama (Gürcüce)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit" className="ml-2" disabled={updateMutation.isPending}>
                    {updateMutation.isPending && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    Güncelle
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Blog Yazısını Sil</DialogTitle>
            <DialogDescription>
              Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              ID: <span className="font-medium text-foreground">{deletingPostId}</span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}