import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/use-admin";
import AdminLayout from "@/components/admin/AdminLayout";
import { API_ROUTES } from "@/lib/constants";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileEdit, 
  MoreHorizontal, 
  Plus, 
  Trash2, 
  Eye, 
  ImagePlus,
  Check,
  X,
  Search,
  Filter,
  SortAsc,
  ChevronDown,
  HelpCircle,
  Clock,
  Calendar,
  RefreshCw,
  Upload
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Blog post types
interface BlogPost {
  id: number;
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  imageUrl: string;
  isFeatured: boolean;
  categoryTR: string;
  categoryEN: string;
  categoryRU: string;
  categoryKA: string;
  authorTR: string;
  authorEN: string;
  authorRU: string;
  authorKA: string;
  metaTitleTR: string;
  metaTitleEN: string;
  metaTitleRU: string;
  metaTitleKA: string;
  metaDescriptionTR: string;
  metaDescriptionEN: string;
  metaDescriptionRU: string;
  metaDescriptionKA: string;
  publishDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateBlogPostDto {
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  imageUrl: string;
  isFeatured: boolean;
  categoryTR: string;
  categoryEN: string;
  categoryRU: string;
  categoryKA: string;
  authorTR: string;
  authorEN: string;
  authorRU: string;
  authorKA: string;
  metaTitleTR: string;
  metaTitleEN: string;
  metaTitleRU: string;
  metaTitleKA: string;
  metaDescriptionTR: string;
  metaDescriptionEN: string;
  metaDescriptionRU: string;
  metaDescriptionKA: string;
  isPublished: boolean;
}

export default function BlogPosts() {
  const { user } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<"TR" | "EN" | "RU" | "KA">("TR");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [categories, setCategories] = useState<string[]>([]);
  const [completeness, setCompleteness] = useState<Record<number, number>>({});

  // Form state for new blog post
  const [newPost, setNewPost] = useState<CreateBlogPostDto>({
    slug: "",
    titleTR: "",
    titleEN: "",
    titleRU: "",
    titleKA: "",
    contentTR: "",
    contentEN: "",
    contentRU: "",
    contentKA: "",
    imageUrl: "",
    isFeatured: false,
    categoryTR: "",
    categoryEN: "",
    categoryRU: "",
    categoryKA: "",
    authorTR: "",
    authorEN: "",
    authorRU: "",
    authorKA: "",
    metaTitleTR: "",
    metaTitleEN: "",
    metaTitleRU: "",
    metaTitleKA: "",
    metaDescriptionTR: "",
    metaDescriptionEN: "",
    metaDescriptionRU: "",
    metaDescriptionKA: "",
    isPublished: false,
  });

  // Fetch blog posts
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: [API_ROUTES.BLOG],
    queryFn: async () => {
      const response = await fetch(API_ROUTES.BLOG);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
    enabled: !!user,
  });

  // Extract categories and calculate completeness
  useEffect(() => {
    if (blogPosts.length > 0) {
      // Extract unique categories
      const uniqueCategories = new Set<string>();
      blogPosts.forEach(post => {
        if (post.categoryTR) uniqueCategories.add(post.categoryTR);
      });
      setCategories(Array.from(uniqueCategories));
      
      // Use the calculation function we created
      const newCompleteness = calculateCompleteness(blogPosts);
      setCompleteness(newCompleteness);
    }
  }, [blogPosts]);

  // Filter and sort blog posts
  const filteredPosts = blogPosts
    .filter((post) => {
      // Apply search filter
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === "" || 
        post.titleTR.toLowerCase().includes(searchTermLower) ||
        post.titleEN.toLowerCase().includes(searchTermLower) ||
        post.categoryTR.toLowerCase().includes(searchTermLower) ||
        post.categoryEN.toLowerCase().includes(searchTermLower) ||
        post.slug.toLowerCase().includes(searchTermLower);
      
      // Apply category filter
      const matchesCategory = filterCategory === "all" || 
        post.categoryTR === filterCategory;
      
      // Apply status filter
      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "published" && post.isPublished) || 
        (filterStatus === "draft" && !post.isPublished);
      
      // Apply featured filter
      const matchesFeatured = filterFeatured === "all" || 
        (filterFeatured === "featured" && post.isFeatured);
      
      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return a.titleTR.localeCompare(b.titleTR);
        default:
          return 0;
      }
    });

  // Create new blog post
  const createMutation = useMutation({
    mutationFn: async (postData: CreateBlogPostDto) => {
      const response = await apiRequest("POST", API_ROUTES.BLOG, postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      toast({
        title: "Blog yazısı oluşturuldu",
        description: "Yeni blog yazısı başarıyla oluşturuldu.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Blog yazısı oluşturulamadı: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update blog post
  const updateMutation = useMutation({
    mutationFn: async (postData: BlogPost) => {
      const response = await apiRequest("PUT", `${API_ROUTES.BLOG}/${postData.id}`, postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      toast({
        title: "Blog yazısı güncellendi",
        description: "Blog yazısı başarıyla güncellendi.",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Blog yazısı güncellenemedi: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${API_ROUTES.BLOG}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      toast({
        title: "Blog yazısı silindi",
        description: "Blog yazısı başarıyla silindi.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Blog yazısı silinemedi: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Generate slug from Turkish title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove consecutive hyphens
      .trim();
  };

  // Calculate blog post completeness
  const calculateCompleteness = (posts: BlogPost[]) => {
    const completenessData: Record<number, number> = {};
    
    posts.forEach(post => {
      let fieldsToCheck = 0;
      let filledFields = 0;
      
      // Check Turkish fields (primary language)
      if (post.titleTR && post.titleTR.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.contentTR && post.contentTR.trim().length > 50) filledFields++;
      fieldsToCheck++;
      
      if (post.metaTitleTR && post.metaTitleTR.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.metaDescriptionTR && post.metaDescriptionTR.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      // Check English fields
      if (post.titleEN && post.titleEN.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.contentEN && post.contentEN.trim().length > 50) filledFields++;
      fieldsToCheck++;
      
      if (post.metaTitleEN && post.metaTitleEN.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.metaDescriptionEN && post.metaDescriptionEN.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      // Check Russian fields
      if (post.titleRU && post.titleRU.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.contentRU && post.contentRU.trim().length > 50) filledFields++;
      fieldsToCheck++;
      
      if (post.metaTitleRU && post.metaTitleRU.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.metaDescriptionRU && post.metaDescriptionRU.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      // Check Georgian fields
      if (post.titleKA && post.titleKA.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.contentKA && post.contentKA.trim().length > 50) filledFields++;
      fieldsToCheck++;
      
      if (post.metaTitleKA && post.metaTitleKA.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.metaDescriptionKA && post.metaDescriptionKA.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      // Check other important fields
      if (post.imageUrl && post.imageUrl.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.slug && post.slug.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.categoryTR && post.categoryTR.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      if (post.authorTR && post.authorTR.trim().length > 0) filledFields++;
      fieldsToCheck++;
      
      // Calculate percentage
      const percentage = Math.round((filledFields / fieldsToCheck) * 100);
      completenessData[post.id] = percentage;
    });
    
    return completenessData;
  };

  // Reset form
  const resetForm = () => {
    setNewPost({
      slug: "",
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      isFeatured: false,
      categoryTR: "",
      categoryEN: "",
      categoryRU: "",
      categoryKA: "",
      authorTR: "",
      authorEN: "",
      authorRU: "",
      authorKA: "",
      metaTitleTR: "",
      metaTitleEN: "",
      metaTitleRU: "",
      metaTitleKA: "",
      metaDescriptionTR: "",
      metaDescriptionEN: "",
      metaDescriptionRU: "",
      metaDescriptionKA: "",
      isPublished: false,
    });
  };

  // Handle form submission
  const handleCreatePost = () => {
    createMutation.mutate(newPost);
  };

  // Handle update post
  const handleUpdatePost = () => {
    if (selectedPost) {
      updateMutation.mutate(selectedPost);
    }
  };

  // Handle delete post
  const handleDeletePost = () => {
    if (selectedPost) {
      deleteMutation.mutate(selectedPost.id);
    }
  };

  // Open edit dialog and set the selected post
  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog and set the selected post
  const handleDeleteDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  // Update new post field
  const handleNewPostChange = (field: keyof CreateBlogPostDto, value: string | boolean) => {
    setNewPost((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug when Title TR changes
      if (field === "titleTR") {
        updated.slug = generateSlug(value as string);
      }
      
      return updated;
    });
  };

  // Update selected post field
  const handleSelectedPostChange = (field: keyof BlogPost, value: string | boolean) => {
    if (selectedPost) {
      setSelectedPost({ ...selectedPost, [field]: value });
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      await apiRequest("PATCH", `${API_ROUTES.BLOG}/${post.id}/feature`, {
        isFeatured: !post.isFeatured,
      });
      
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      
      toast({
        title: post.isFeatured ? "Öne çıkarma kaldırıldı" : "Öne çıkarıldı",
        description: `"${post.titleTR}" yazısı ${post.isFeatured ? "artık öne çıkarılmıyor" : "öne çıkarıldı"}.`,
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem gerçekleştirilemedi.",
        variant: "destructive",
      });
    }
  };

  // Toggle published status
  const handleTogglePublished = async (post: BlogPost) => {
    try {
      await apiRequest("PATCH", `${API_ROUTES.BLOG}/${post.id}/publish`, {
        isPublished: !post.isPublished,
      });
      
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.BLOG] });
      
      toast({
        title: post.isPublished ? "Yayından kaldırıldı" : "Yayınlandı",
        description: `"${post.titleTR}" yazısı ${post.isPublished ? "yayından kaldırıldı" : "yayınlandı"}.`,
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem gerçekleştirilemedi.",
        variant: "destructive",
      });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <AdminLayout title="Blog Yazıları">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex flex-1 gap-2 flex-col sm:flex-row">
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 max-w-md"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategoriye göre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kategoriler</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={value => setFilterStatus(value as any)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Duruma göre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="published">Yayında</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Featured Filter */}
              <Select value={filterFeatured} onValueChange={value => setFilterFeatured(value as any)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Öne çıkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="featured">Öne Çıkanlar</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Sort By */}
              <Select value={sortBy} onValueChange={value => setSortBy(value as any)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>En Yeniler</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>En Eskiler</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="title">
                    <div className="flex items-center">
                      <SortAsc className="mr-2 h-4 w-4" />
                      <span>Başlığa Göre</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Reset Filters Button */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                  setFilterStatus("all");
                  setFilterFeatured("all");
                  setSortBy("newest");
                }}
                size="icon"
                className="h-10 w-10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Blog Yazısı
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Yeni Blog Yazısı Ekle</DialogTitle>
                <DialogDescription>
                  Tüm alanları eksiksiz doldurun. Yazının yayınlanması için "Yayınla" seçeneğini işaretleyin.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="TR" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="TR" onClick={() => setActiveLanguage("TR")}>Türkçe</TabsTrigger>
                  <TabsTrigger value="EN" onClick={() => setActiveLanguage("EN")}>English</TabsTrigger>
                  <TabsTrigger value="RU" onClick={() => setActiveLanguage("RU")}>Русский</TabsTrigger>
                  <TabsTrigger value="KA" onClick={() => setActiveLanguage("KA")}>ქართული</TabsTrigger>
                </TabsList>
                
                {/* Turkish Content */}
                <TabsContent value="TR" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleTR">Başlık (TR)</Label>
                      <Input
                        id="titleTR"
                        value={newPost.titleTR}
                        onChange={(e) => handleNewPostChange("titleTR", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={newPost.slug}
                        onChange={(e) => handleNewPostChange("slug", e.target.value)}
                        placeholder="otomatik-olusturulur"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentTR">İçerik (TR)</Label>
                    <Textarea
                      id="contentTR"
                      value={newPost.contentTR}
                      onChange={(e) => handleNewPostChange("contentTR", e.target.value)}
                      rows={10}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryTR">Kategori (TR)</Label>
                      <Input
                        id="categoryTR"
                        value={newPost.categoryTR}
                        onChange={(e) => handleNewPostChange("categoryTR", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorTR">Yazar (TR)</Label>
                      <Input
                        id="authorTR"
                        value={newPost.authorTR}
                        onChange={(e) => handleNewPostChange("authorTR", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitleTR">Meta Başlık (TR)</Label>
                      <Input
                        id="metaTitleTR"
                        value={newPost.metaTitleTR}
                        onChange={(e) => handleNewPostChange("metaTitleTR", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescriptionTR">Meta Açıklama (TR)</Label>
                      <Textarea
                        id="metaDescriptionTR"
                        value={newPost.metaDescriptionTR}
                        onChange={(e) => handleNewPostChange("metaDescriptionTR", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* English Content */}
                <TabsContent value="EN" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleEN">Başlık (EN)</Label>
                      <Input
                        id="titleEN"
                        value={newPost.titleEN}
                        onChange={(e) => handleNewPostChange("titleEN", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentEN">İçerik (EN)</Label>
                    <Textarea
                      id="contentEN"
                      value={newPost.contentEN}
                      onChange={(e) => handleNewPostChange("contentEN", e.target.value)}
                      rows={10}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryEN">Kategori (EN)</Label>
                      <Input
                        id="categoryEN"
                        value={newPost.categoryEN}
                        onChange={(e) => handleNewPostChange("categoryEN", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorEN">Yazar (EN)</Label>
                      <Input
                        id="authorEN"
                        value={newPost.authorEN}
                        onChange={(e) => handleNewPostChange("authorEN", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitleEN">Meta Başlık (EN)</Label>
                      <Input
                        id="metaTitleEN"
                        value={newPost.metaTitleEN}
                        onChange={(e) => handleNewPostChange("metaTitleEN", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescriptionEN">Meta Açıklama (EN)</Label>
                      <Textarea
                        id="metaDescriptionEN"
                        value={newPost.metaDescriptionEN}
                        onChange={(e) => handleNewPostChange("metaDescriptionEN", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Russian Content */}
                <TabsContent value="RU" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleRU">Başlık (RU)</Label>
                      <Input
                        id="titleRU"
                        value={newPost.titleRU}
                        onChange={(e) => handleNewPostChange("titleRU", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentRU">İçerik (RU)</Label>
                    <Textarea
                      id="contentRU"
                      value={newPost.contentRU}
                      onChange={(e) => handleNewPostChange("contentRU", e.target.value)}
                      rows={10}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryRU">Kategori (RU)</Label>
                      <Input
                        id="categoryRU"
                        value={newPost.categoryRU}
                        onChange={(e) => handleNewPostChange("categoryRU", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorRU">Yazar (RU)</Label>
                      <Input
                        id="authorRU"
                        value={newPost.authorRU}
                        onChange={(e) => handleNewPostChange("authorRU", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitleRU">Meta Başlık (RU)</Label>
                      <Input
                        id="metaTitleRU"
                        value={newPost.metaTitleRU}
                        onChange={(e) => handleNewPostChange("metaTitleRU", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescriptionRU">Meta Açıklama (RU)</Label>
                      <Textarea
                        id="metaDescriptionRU"
                        value={newPost.metaDescriptionRU}
                        onChange={(e) => handleNewPostChange("metaDescriptionRU", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Georgian Content */}
                <TabsContent value="KA" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleKA">Başlık (KA)</Label>
                      <Input
                        id="titleKA"
                        value={newPost.titleKA}
                        onChange={(e) => handleNewPostChange("titleKA", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentKA">İçerik (KA)</Label>
                    <Textarea
                      id="contentKA"
                      value={newPost.contentKA}
                      onChange={(e) => handleNewPostChange("contentKA", e.target.value)}
                      rows={10}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryKA">Kategori (KA)</Label>
                      <Input
                        id="categoryKA"
                        value={newPost.categoryKA}
                        onChange={(e) => handleNewPostChange("categoryKA", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorKA">Yazar (KA)</Label>
                      <Input
                        id="authorKA"
                        value={newPost.authorKA}
                        onChange={(e) => handleNewPostChange("authorKA", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitleKA">Meta Başlık (KA)</Label>
                      <Input
                        id="metaTitleKA"
                        value={newPost.metaTitleKA}
                        onChange={(e) => handleNewPostChange("metaTitleKA", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescriptionKA">Meta Açıklama (KA)</Label>
                      <Textarea
                        id="metaDescriptionKA"
                        value={newPost.metaDescriptionKA}
                        onChange={(e) => handleNewPostChange("metaDescriptionKA", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Görsel URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={newPost.imageUrl}
                      onChange={(e) => handleNewPostChange("imageUrl", e.target.value)}
                      placeholder="/images/blog/ornek-gorsel.jpg"
                      className="flex-1"
                    />
                    <Button variant="outline" type="button">
                      <ImagePlus className="h-4 w-4 mr-1" />
                      Görsel Seç
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={newPost.isFeatured}
                      onCheckedChange={(checked) => handleNewPostChange("isFeatured", checked)}
                    />
                    <Label htmlFor="isFeatured">Öne Çıkar</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublished"
                      checked={newPost.isPublished}
                      onCheckedChange={(checked) => handleNewPostChange("isPublished", checked)}
                    />
                    <Label htmlFor="isPublished">Yayınla</Label>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  İptal
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={createMutation.isPending || !newPost.titleTR || !newPost.contentTR}
                >
                  {createMutation.isPending ? "Ekleniyor..." : "Ekle"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Blog Yazıları</CardTitle>
            <CardDescription>
              Toplam {blogPosts.length} yazı, {blogPosts.filter(p => p.isPublished).length} yayında,{" "}
              {blogPosts.filter(p => p.isFeatured).length} öne çıkarılmış
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              // Loading state
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
                {searchTerm || filterCategory !== "all" || filterStatus !== "all" || filterFeatured !== "all" ? (
                  <>
                    <div className="rounded-full p-3 bg-muted">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Aranan içerik bulunamadı</h3>
                      <p className="text-muted-foreground">
                        Filtreleri değiştirmeyi veya aramayı temizlemeyi deneyin.
                      </p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchTerm("");
                          setFilterCategory("all");
                          setFilterStatus("all");
                          setFilterFeatured("all");
                          setSortBy("newest");
                        }}
                      >
                        Tüm filtreleri temizle
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-full p-3 bg-muted">
                      <FileEdit className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Henüz blog yazısı yok</h3>
                      <p className="text-muted-foreground mb-4">
                        "Yeni Blog Yazısı" butonuna tıklayarak içerik eklemeye başlayabilirsiniz.
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Blog Yazısı
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // List of blog posts
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative">
                      {/* Blog post image */}
                      <div className="h-40 bg-muted relative overflow-hidden">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.titleTR} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <ImagePlus className="h-10 w-10 text-muted-foreground opacity-20" />
                          </div>
                        )}
                        
                        {/* Completeness indicator */}
                        <div className="absolute bottom-0 inset-x-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="w-full">
                                  <Progress 
                                    value={completeness[post.id] || 0} 
                                    className="h-1 rounded-none" 
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  %{completeness[post.id] || 0} içerik tamamlandı
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      
                      {/* Status badges */}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Badge variant={post.isPublished ? "default" : "outline"}>
                          {post.isPublished ? "Yayında" : "Taslak"}
                        </Badge>
                        {post.isFeatured && (
                          <Badge variant="secondary">Öne Çıkan</Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {post.categoryTR || "Kategorisiz"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <CardTitle className="text-lg mt-1 line-clamp-2">{post.titleTR}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.contentTR.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    
                    <CardFooter className="pt-0 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {post.slug}
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditPost(post)}
                        >
                          <FileEdit className="h-4 w-4" />
                          <span className="sr-only">Düzenle</span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleTogglePublished(post)}
                        >
                          {post.isPublished ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {post.isPublished ? "Yayından Kaldır" : "Yayınla"}
                          </span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleToggleFeatured(post)}
                        >
                          {post.isFeatured ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {post.isFeatured ? "Öne Çıkarmayı Kaldır" : "Öne Çıkar"}
                          </span>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Diğer İşlemler</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Önizle</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteDialog(post)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Sil</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
          {!isLoading && filteredPosts.length > 0 && (
            <CardFooter className="border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                {filteredPosts.length} yazı listeleniyor
                {searchTerm && ` (${blogPosts.length} yazı içinden)`}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Edit Blog Post Dialog */}
      {selectedPost && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Blog Yazısını Düzenle</DialogTitle>
              <DialogDescription>
                Blog yazısı bilgilerini düzenleyin ve kaydedin.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="TR" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="TR" onClick={() => setActiveLanguage("TR")}>Türkçe</TabsTrigger>
                <TabsTrigger value="EN" onClick={() => setActiveLanguage("EN")}>English</TabsTrigger>
                <TabsTrigger value="RU" onClick={() => setActiveLanguage("RU")}>Русский</TabsTrigger>
                <TabsTrigger value="KA" onClick={() => setActiveLanguage("KA")}>ქართული</TabsTrigger>
              </TabsList>
              
              {/* Turkish Content */}
              <TabsContent value="TR" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTitleTR">Başlık (TR)</Label>
                    <Input
                      id="editTitleTR"
                      value={selectedPost.titleTR}
                      onChange={(e) => handleSelectedPostChange("titleTR", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editSlug">Slug</Label>
                    <Input
                      id="editSlug"
                      value={selectedPost.slug}
                      onChange={(e) => handleSelectedPostChange("slug", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editContentTR">İçerik (TR)</Label>
                  <Textarea
                    id="editContentTR"
                    value={selectedPost.contentTR}
                    onChange={(e) => handleSelectedPostChange("contentTR", e.target.value)}
                    rows={10}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editCategoryTR">Kategori (TR)</Label>
                    <Input
                      id="editCategoryTR"
                      value={selectedPost.categoryTR}
                      onChange={(e) => handleSelectedPostChange("categoryTR", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editAuthorTR">Yazar (TR)</Label>
                    <Input
                      id="editAuthorTR"
                      value={selectedPost.authorTR}
                      onChange={(e) => handleSelectedPostChange("authorTR", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editMetaTitleTR">Meta Başlık (TR)</Label>
                    <Input
                      id="editMetaTitleTR"
                      value={selectedPost.metaTitleTR}
                      onChange={(e) => handleSelectedPostChange("metaTitleTR", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editMetaDescriptionTR">Meta Açıklama (TR)</Label>
                    <Textarea
                      id="editMetaDescriptionTR"
                      value={selectedPost.metaDescriptionTR}
                      onChange={(e) => handleSelectedPostChange("metaDescriptionTR", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* English Content */}
              <TabsContent value="EN" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTitleEN">Başlık (EN)</Label>
                    <Input
                      id="editTitleEN"
                      value={selectedPost.titleEN}
                      onChange={(e) => handleSelectedPostChange("titleEN", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editContentEN">İçerik (EN)</Label>
                  <Textarea
                    id="editContentEN"
                    value={selectedPost.contentEN}
                    onChange={(e) => handleSelectedPostChange("contentEN", e.target.value)}
                    rows={10}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editCategoryEN">Kategori (EN)</Label>
                    <Input
                      id="editCategoryEN"
                      value={selectedPost.categoryEN}
                      onChange={(e) => handleSelectedPostChange("categoryEN", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editAuthorEN">Yazar (EN)</Label>
                    <Input
                      id="editAuthorEN"
                      value={selectedPost.authorEN}
                      onChange={(e) => handleSelectedPostChange("authorEN", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editMetaTitleEN">Meta Başlık (EN)</Label>
                    <Input
                      id="editMetaTitleEN"
                      value={selectedPost.metaTitleEN}
                      onChange={(e) => handleSelectedPostChange("metaTitleEN", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editMetaDescriptionEN">Meta Açıklama (EN)</Label>
                    <Textarea
                      id="editMetaDescriptionEN"
                      value={selectedPost.metaDescriptionEN}
                      onChange={(e) => handleSelectedPostChange("metaDescriptionEN", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Russian Content */}
              <TabsContent value="RU" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTitleRU">Başlık (RU)</Label>
                    <Input
                      id="editTitleRU"
                      value={selectedPost.titleRU}
                      onChange={(e) => handleSelectedPostChange("titleRU", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editContentRU">İçerik (RU)</Label>
                  <Textarea
                    id="editContentRU"
                    value={selectedPost.contentRU}
                    onChange={(e) => handleSelectedPostChange("contentRU", e.target.value)}
                    rows={10}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editCategoryRU">Kategori (RU)</Label>
                    <Input
                      id="editCategoryRU"
                      value={selectedPost.categoryRU}
                      onChange={(e) => handleSelectedPostChange("categoryRU", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editAuthorRU">Yazar (RU)</Label>
                    <Input
                      id="editAuthorRU"
                      value={selectedPost.authorRU}
                      onChange={(e) => handleSelectedPostChange("authorRU", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editMetaTitleRU">Meta Başlık (RU)</Label>
                    <Input
                      id="editMetaTitleRU"
                      value={selectedPost.metaTitleRU}
                      onChange={(e) => handleSelectedPostChange("metaTitleRU", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editMetaDescriptionRU">Meta Açıklama (RU)</Label>
                    <Textarea
                      id="editMetaDescriptionRU"
                      value={selectedPost.metaDescriptionRU}
                      onChange={(e) => handleSelectedPostChange("metaDescriptionRU", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Georgian Content */}
              <TabsContent value="KA" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editTitleKA">Başlık (KA)</Label>
                    <Input
                      id="editTitleKA"
                      value={selectedPost.titleKA}
                      onChange={(e) => handleSelectedPostChange("titleKA", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editContentKA">İçerik (KA)</Label>
                  <Textarea
                    id="editContentKA"
                    value={selectedPost.contentKA}
                    onChange={(e) => handleSelectedPostChange("contentKA", e.target.value)}
                    rows={10}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editCategoryKA">Kategori (KA)</Label>
                    <Input
                      id="editCategoryKA"
                      value={selectedPost.categoryKA}
                      onChange={(e) => handleSelectedPostChange("categoryKA", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editAuthorKA">Yazar (KA)</Label>
                    <Input
                      id="editAuthorKA"
                      value={selectedPost.authorKA}
                      onChange={(e) => handleSelectedPostChange("authorKA", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editMetaTitleKA">Meta Başlık (KA)</Label>
                    <Input
                      id="editMetaTitleKA"
                      value={selectedPost.metaTitleKA}
                      onChange={(e) => handleSelectedPostChange("metaTitleKA", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editMetaDescriptionKA">Meta Açıklama (KA)</Label>
                    <Textarea
                      id="editMetaDescriptionKA"
                      value={selectedPost.metaDescriptionKA}
                      onChange={(e) => handleSelectedPostChange("metaDescriptionKA", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="editImageUrl">Görsel URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="editImageUrl"
                    value={selectedPost.imageUrl}
                    onChange={(e) => handleSelectedPostChange("imageUrl", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" type="button">
                    <ImagePlus className="h-4 w-4 mr-1" />
                    Görsel Seç
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="editIsFeatured"
                    checked={selectedPost.isFeatured}
                    onCheckedChange={(checked) => handleSelectedPostChange("isFeatured", checked)}
                  />
                  <Label htmlFor="editIsFeatured">Öne Çıkar</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="editIsPublished"
                    checked={selectedPost.isPublished}
                    onCheckedChange={(checked) => handleSelectedPostChange("isPublished", checked)}
                  />
                  <Label htmlFor="editIsPublished">Yayınla</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                İptal
              </Button>
              <Button 
                onClick={handleUpdatePost}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedPost && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Blog Yazısını Sil</DialogTitle>
              <DialogDescription>
                Bu işlem kalıcıdır ve geri alınamaz. Bu blog yazısını silmek istediğinize emin misiniz?
              </DialogDescription>
            </DialogHeader>
            
            <div className="border rounded-md p-4 mb-4">
              <h4 className="font-medium">{selectedPost.titleTR}</h4>
              <p className="text-sm text-muted-foreground mt-1">{selectedPost.slug}</p>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                İptal
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePost}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Siliniyor..." : "Sil"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}