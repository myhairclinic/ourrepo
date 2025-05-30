import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Package,
  BadgeCheck,
  ShoppingBag,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  RotateCcw,
  Loader2,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
  Tag,
  ArrowRight,
  Download,
  RefreshCcw,
  Image as ImageIcon,
  Settings,
  Save,
  BookOpen,
  DollarSign,
  PercentCircle,
  XCircle as XIcon
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Ürün form şeması
const productSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(2, { message: "Slug en az 2 karakter olmalıdır" }),
  nameTR: z.string().min(2, { message: "Ürün adı en az 2 karakter olmalıdır" }),
  nameEN: z.string().min(2, { message: "İngilizce ürün adı en az 2 karakter olmalıdır" }),
  nameRU: z.string().min(2, { message: "Rusça ürün adı en az 2 karakter olmalıdır" }),
  nameKA: z.string().min(2, { message: "Gürcüce ürün adı en az 2 karakter olmalıdır" }),
  descriptionTR: z.string().min(2, { message: "Ürün açıklaması en az 2 karakter olmalıdır" }),
  descriptionEN: z.string().min(2, { message: "İngilizce ürün açıklaması en az 2 karakter olmalıdır" }),
  descriptionRU: z.string().min(2, { message: "Rusça ürün açıklaması en az 2 karakter olmalıdır" }),
  descriptionKA: z.string().min(2, { message: "Gürcüce ürün açıklaması en az 2 karakter olmalıdır" }),
  usageTR: z.string().min(2, { message: "Kullanım bilgisi en az 2 karakter olmalıdır" }),
  usageEN: z.string().min(2, { message: "İngilizce kullanım bilgisi en az 2 karakter olmalıdır" }),
  usageRU: z.string().min(2, { message: "Rusça kullanım bilgisi en az 2 karakter olmalıdır" }),
  usageKA: z.string().min(2, { message: "Gürcüce kullanım bilgisi en az 2 karakter olmalıdır" }),
  ingredientsTR: z.string().min(2, { message: "İçerik bilgisi en az 2 karakter olmalıdır" }),
  ingredientsEN: z.string().min(2, { message: "İngilizce içerik bilgisi en az 2 karakter olmalıdır" }),
  ingredientsRU: z.string().min(2, { message: "Rusça içerik bilgisi en az 2 karakter olmalıdır" }),
  ingredientsKA: z.string().min(2, { message: "Gürcüce içerik bilgisi en az 2 karakter olmalıdır" }),
  imageUrl: z.string().min(2, { message: "Görsel URL'si gereklidir" }),
  price: z
    .union([
      z.string().transform(val => Number(val) || 0),
      z.number()
    ])
    .transform(val => Number(val) || 0),
  isNew: z.boolean().default(false),
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  order: z
    .union([
      z.string().transform(val => Number(val) || 0),
      z.number()
    ])
    .transform(val => Number(val) || 0),
  isActive: z.boolean().default(true),
});

// Form tipi
type ProductFormValues = z.infer<typeof productSchema>;

// Ürün yönetimi bileşeni
const ProductManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isVithairSyncDialogOpen, setIsVithairSyncDialogOpen] = useState(false);
  const [isClearProductsDialogOpen, setIsClearProductsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({
    key: "order",
    direction: "ascending",
  });

  // Define better empty defaults for all form fields
  const DEFAULT_PRODUCT = {
    nameTR: "",
    nameEN: "",
    nameRU: "",
    nameKA: "",
    descriptionTR: "",
    descriptionEN: "",
    descriptionRU: "",
    descriptionKA: "",
    usageTR: "",
    usageEN: "",
    usageRU: "",
    usageKA: "",
    ingredientsTR: "",
    ingredientsEN: "",
    ingredientsRU: "",
    ingredientsKA: "",
    imageUrl: "",
    price: 0,
    isNew: false,
    categoryId: "",
    categoryName: "",
    order: 0,
    isActive: true,
    slug: "",
  };

  // Ürünleri getir
  const {
    data: productsResponse = { success: false, data: [] },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["/api/products"],
    queryFn: async () => {
      try {
        console.log("Fetching products...");
        const res = await apiRequest("GET", "/api/products");
        const responseData = await res.json();
        console.log("Products fetched successfully:", responseData);
        return responseData;
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Ürünler yüklenemedi",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
        throw error;
      }
    },
  });
  
  // Extract the products array from the response
  const products = productsResponse?.data || [];

  // Form tanımlaması
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_PRODUCT,
    mode: "onChange",
  });

  // Ürün ekleme/güncelleme
  const productMutation = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      try {
        const isUpdate = !!data.id;
        const url = isUpdate ? `/api/products/${data.id}` : "/api/products";
        const method = isUpdate ? "PUT" : "POST";
        
        console.log(`${isUpdate ? "Updating" : "Creating"} product with data:`, JSON.stringify(data, null, 2));
        
        // Try to send the request
        const res = await apiRequest(method, url, data);
        
        // Log the full response
        const responseText = await res.clone().text();
        console.log(`Product ${isUpdate ? "update" : "creation"} raw response:`, responseText);
        
        try {
          // Try to parse the JSON
          if (responseText.trim() === '') {
            console.warn('Empty response received from server');
            return { success: true, data: null };
          }
          
          const jsonData = JSON.parse(responseText);
          console.log(`Product ${isUpdate ? "updated" : "created"} successfully. Parsed response:`, jsonData);
          
          // Return the product data from the response
          return jsonData.data || jsonData;
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError);
          console.error("Raw response text:", responseText);
          throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 200)}...`);
        }
      } catch (error) {
        console.error(`Error ${data.id ? "updating" : "creating"} product:`, error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Mutation succeeded with data:', data);
      toast({
        title: selectedProduct?.id ? "Ürün güncellendi" : "Ürün eklendi",
        description: selectedProduct?.id 
          ? "Ürün başarıyla güncellendi" 
          : "Yeni ürün başarıyla eklendi",
      });
      
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: any) => {
      console.error("Product mutation error:", error);
      if (error.cause) console.error("Cause:", error.cause);
      if (error.stack) console.error("Stack:", error.stack);
      
      toast({
        title: "Hata",
        description: `Ürün ${selectedProduct?.id ? "güncellenirken" : "eklenirken"} bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Ürün silme
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        console.log("Deleting product with ID:", id);
        const res = await apiRequest("DELETE", `/api/products/${id}`);
        
        // Check if there's a response body to parse
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const data = await res.json();
            console.log("Product deleted successfully:", data);
            return data;
          } catch (jsonError) {
            // If we can't parse the JSON but the request was successful, that's okay
            console.log("Delete successful but no valid JSON response");
            return { success: true };
          }
        } else {
          console.log("Delete successful with no JSON content");
          return { success: true };
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Ürün silindi",
        description: "Ürün başarıyla silindi",
      });
      
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Ürün silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
      console.error("Product deletion error details:", error);
    },
  });

  // Vithair ürünlerini senkronize et
  const syncVithairProductsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/sync-vithair-products");
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Vithair ürünleri senkronize edildi",
        description: data.message || "Ürünler başarıyla senkronize edildi",
      });
      
      setIsVithairSyncDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Vithair ürünleri senkronize edilirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Tüm ürünleri temizle
  const clearProductsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/clear-products");
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Ürünler temizlendi",
        description: data.message || "Tüm ürünler başarıyla silindi",
      });
      
      setIsClearProductsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: `Ürünler temizlenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Ürün güncelleme form açılışı
  const handleEditProduct = (product: any) => {
    console.log("Opening edit form for product:", product);
    setSelectedProduct(product);
    // Ensure all fields are properly defined
    const formData = {
      ...DEFAULT_PRODUCT,
      ...product,
      // Ensure numeric fields are numbers and not strings
      price: typeof product.price === 'number' ? product.price : 0,
      order: typeof product.order === 'number' ? product.order : 0,
    };
    console.log("Setting form values:", formData);
    form.reset(formData);
    setIsDialogOpen(true);
  };

  // Yeni ürün ekleme form açılışı
  const handleAddProduct = () => {
    console.log("Opening new product form");
    setSelectedProduct(null);
    // Reset form with default values
    form.reset(DEFAULT_PRODUCT);
    setIsDialogOpen(true);
  };

  // Ürün silme onayı
  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Add manual form submission handler
  const handleManualSubmit = async () => {
    console.log('Manual form submission triggered');
    
    // Get the raw form values
    const rawFormData = form.getValues();
    console.log('Raw form values:', rawFormData);
    
    try {
      // Use the schema to validate and transform the data
      const validationResult = productSchema.safeParse(rawFormData);
      
      if (validationResult.success) {
        // Data is valid, use the validated and transformed data
        const validData = validationResult.data;
        console.log('Validated form data:', validData);
        
        // Submit the valid data
        productMutation.mutate(validData);
      } else {
        // Data is invalid, handle the validation errors
        console.error('Validation failed:', validationResult.error.format());
        
        // Format errors for better display
        const errorFormatted = validationResult.error.format();
        console.log('Formatted validation errors:', errorFormatted);
        
        // Show a toast with validation error info
        toast({
          title: "Form doğrulama hatası",
          description: "Lütfen form alanlarını kontrol edin",
          variant: "destructive",
        });
        
        // Set the errors manually on the form
        Object.entries(errorFormatted).forEach(([field, error]) => {
          if (field !== '_errors') {
            // Type safety for error object
            const zodError = error as { _errors: string[] };
            if (zodError._errors && zodError._errors.length > 0) {
              form.setError(field as any, {
                type: 'manual',
                message: zodError._errors[0]
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error during manual validation:', error);
      toast({
        title: "Doğrulama hatası",
        description: error instanceof Error ? error.message : "Bilinmeyen hata",
        variant: "destructive",
      });
    }
  };

  // Sıralama fonksiyonu
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    
    setSortConfig({ key, direction });
  };

  // Ürünleri filtrele ve sırala
  const filteredProducts = React.useMemo(() => {
    // Ensure products is an array before spreading
    let tempProducts = Array.isArray(products) ? [...products] : [];
    
    // Arama filtreleme
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (product: any) =>
          product.nameTR?.toLowerCase().includes(searchTermLower) ||
          product.nameEN?.toLowerCase().includes(searchTermLower) ||
          product.descriptionTR?.toLowerCase().includes(searchTermLower) ||
          product.categoryName?.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Tab filtreleme
    if (activeTab === "active") {
      tempProducts = tempProducts.filter((product: any) => product.isActive);
    } else if (activeTab === "inactive") {
      tempProducts = tempProducts.filter((product: any) => !product.isActive);
    } else if (activeTab === "new") {
      tempProducts = tempProducts.filter((product: any) => product.isNew);
    }
    
    // Sıralama
    if (sortConfig.key) {
      tempProducts.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    
    return tempProducts;
  }, [products, searchTerm, activeTab, sortConfig]);

  // Slug oluşturma
  const generateSlug = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  // İsim değiştiğinde slug güncelleme
  useEffect(() => {
    const nameTR = form.watch("nameTR");
    if (nameTR && !selectedProduct) {
      const slug = generateSlug(nameTR);
      form.setValue("slug", slug);
    }
  }, [form.watch("nameTR"), selectedProduct, form]);

  // Add test function for direct API access
  const testDirectApiCall = async () => {
    try {
      console.log("Testing direct API call...");
      
      // Create a simple test product
      const testProduct = {
        slug: "test-product-" + Date.now(),
        nameTR: "Test Ürünü",
        nameEN: "Test Product",
        nameRU: "Тестовый продукт",
        nameKA: "სატესტო პროდუქტი",
        descriptionTR: "Test açıklaması",
        descriptionEN: "Test description",
        descriptionRU: "Тестовое описание",
        descriptionKA: "სატესტო აღწერა",
        usageTR: "Test kullanımı",
        usageEN: "Test usage",
        usageRU: "Тестовое использование",
        usageKA: "სატესტო გამოყენება",
        ingredientsTR: "Test içerikleri",
        ingredientsEN: "Test ingredients",
        ingredientsRU: "Тестовые ингредиенты",
        ingredientsKA: "სატესტო ინგრედიენტები",
        imageUrl: "https://placehold.co/200x200",
        price: 0,
        isNew: true,
        order: 0,
        isActive: true
      };
      
      console.log("Sending test product:", testProduct);
      
      // Make direct fetch call
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testProduct)
      });
      
      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      try {
        const data = JSON.parse(responseText);
        console.log("Parsed response:", data);
        
        toast({
          title: "Test başarılı",
          description: "API direkt çağrısı başarılı oldu",
        });
        
        // Refresh product list
        queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        toast({
          title: "JSON ayrıştırma hatası",
          description: "Yanıt JSON formatında değil",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing API:", error);
      toast({
        title: "API test hatası",
        description: error instanceof Error ? error.message : "Bilinmeyen hata",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight flex items-center">
          <Package className="mr-2 h-8 w-8" />
          Ürün Yönetimi
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleAddProduct} 
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Yeni Ürün Ekle
          </Button>

          <Button 
            onClick={testDirectApiCall} 
            variant="secondary"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            API Test Et
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                İşlemler
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                onClick={() => setIsVithairSyncDialogOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                Vithair Ürünlerini Senkronize Et
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setIsClearProductsDialogOpen(true)}
                className="flex items-center gap-2 cursor-pointer text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Tüm Ürünleri Temizle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Ürün Listesi</CardTitle>
          <CardDescription>
            Toplam {filteredProducts.length} ürün listelenmiştir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="active">Aktif</TabsTrigger>
                  <TabsTrigger value="inactive">Pasif</TabsTrigger>
                  <TabsTrigger value="new">Yeni</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Ürünler yükleniyor...</span>
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center py-8 text-destructive">
                <XCircle className="h-8 w-8 mr-2" />
                <span>Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</span>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => refetch()}>
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Tekrar Dene
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingBag className="h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-1">Hiç ürün bulunamadı</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-md">
                  {searchTerm 
                    ? `"${searchTerm}" için sonuç bulunamadı. Farklı bir arama yapmayı deneyin.` 
                    : "Henüz hiç ürün eklenmemiş. Yeni ürün ekleyerek başlayabilirsiniz."}
                </p>
                {searchTerm ? (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Aramayı Temizle
                  </Button>
                ) : (
                  <Button onClick={handleAddProduct}>
                    <Plus className="h-4 w-4 mr-1" />
                    Yeni Ürün Ekle
                  </Button>
                )}
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer w-[50px]"
                        onClick={() => requestSort("id")}
                      >
                        ID
                        {sortConfig.key === "id" && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === "descending" ? "transform rotate-180" : ""}`} />
                        )}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort("nameTR")}
                      >
                        Ürün Adı
                        {sortConfig.key === "nameTR" && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === "descending" ? "transform rotate-180" : ""}`} />
                        )}
                      </TableHead>
                      <TableHead>Görsel</TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort("categoryName")}
                      >
                        Kategori
                        {sortConfig.key === "categoryName" && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === "descending" ? "transform rotate-180" : ""}`} />
                        )}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort("order")}
                      >
                        Sıra
                        {sortConfig.key === "order" && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === "descending" ? "transform rotate-180" : ""}`} />
                        )}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort("isActive")}
                      >
                        Durum
                        {sortConfig.key === "isActive" && (
                          <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortConfig.direction === "descending" ? "transform rotate-180" : ""}`} />
                        )}
                      </TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product: any) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.nameTR}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {product.descriptionTR?.length > 60
                                ? `${product.descriptionTR.substring(0, 60)}...`
                                : product.descriptionTR}
                            </div>
                            {product.isNew && (
                              <Badge variant="secondary" className="mt-1">Yeni</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.nameTR}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-muted rounded border">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.categoryName ? (
                            <Badge variant="outline">{product.categoryName}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Kategori Yok</span>
                          )}
                        </TableCell>
                        <TableCell>{product.order || 0}</TableCell>
                        <TableCell>
                          {product.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Aktif
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                              <XIcon className="mr-1 h-3 w-3" />
                              Pasif
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditProduct(product)}
                              title="Düzenle"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteProduct(product)}
                              title="Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ürün ekleme/düzenleme modalı */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct?.id ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct?.id
                ? "Ürün bilgilerini güncelleyin."
                : "Yeni ürün bilgilerini girin."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form 
              onSubmit={(e) => {
                // Prevent form from submitting normally
                e.preventDefault();
                console.log('Form native submit prevented');
              }} 
              className="space-y-6"
            >
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
                  <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                  <TabsTrigger value="details">Detaylar</TabsTrigger>
                  <TabsTrigger value="ingredients">İçerikler</TabsTrigger>
                  <TabsTrigger value="usage">Kullanım</TabsTrigger>
                </TabsList>

                {/* Genel Bilgiler */}
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nameTR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ürün Adı (TR)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nameEN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ürün Adı (EN)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nameRU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ürün Adı (RU)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nameKA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ürün Adı (KA)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          URL'de görünecek ürün tanımlayıcısı. Boş bırakırsanız ürün adından otomatik oluşturulur.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Görsel URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori Adı</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Sıra Numarası</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Ürünün gösterim sırası (küçük değerler önce gösterilir)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fiyat</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Ürünün fiyatı (Not: İsteğiniz üzerine sitede gösterilmeyecektir)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                          <div className="space-y-1 leading-none">
                            <FormLabel>Aktif</FormLabel>
                            <FormDescription>
                              Ürün sitede görünür olacak mı?
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
                      control={form.control}
                      name="isNew"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                          <div className="space-y-1 leading-none">
                            <FormLabel>Yeni Ürün</FormLabel>
                            <FormDescription>
                              Ürün "Yeni" etiketi ile gösterilsin mi?
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
                </TabsContent>

                {/* Detaylar */}
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="descriptionTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ürün Açıklaması (TR)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
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
                        <FormLabel>Ürün Açıklaması (EN)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
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
                        <FormLabel>Ürün Açıklaması (RU)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
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
                        <FormLabel>Ürün Açıklaması (KA)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* İçerikler */}
                <TabsContent value="ingredients" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ingredientsTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerikler (TR)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ingredientsEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerikler (EN)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ingredientsRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerikler (RU)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ingredientsKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İçerikler (KA)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Kullanım */}
                <TabsContent value="usage" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="usageTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanım Bilgisi (TR)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usageEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanım Bilgisi (EN)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usageRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanım Bilgisi (RU)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usageKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanım Bilgisi (KA)</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  type="button" 
                  onClick={handleManualSubmit}
                  disabled={productMutation.isPending}
                  className="ml-2"
                >
                  {productMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {selectedProduct?.id ? "Güncelle" : "Ekle"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Ürün silme onay modalı */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ürün Silme Onayı</DialogTitle>
            <DialogDescription>
              "{selectedProduct?.nameTR}" isimli ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteProductMutation.mutate(selectedProduct?.id)}
              disabled={deleteProductMutation.isPending}
              className="ml-2"
            >
              {deleteProductMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vithair ürünleri senkronizasyon modalı */}
      <Dialog open={isVithairSyncDialogOpen} onOpenChange={setIsVithairSyncDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vithair Ürünlerini Senkronize Et</DialogTitle>
            <DialogDescription>
              Bu işlem, Vithair web sitesinden en güncel ürün bilgilerini alacak ve veritabanınızı güncelleyecektir. Mevcut ürünler silinecek ve yenileriyle değiştirilecektir. Devam etmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsVithairSyncDialogOpen(false)}
            >
              İptal
            </Button>
            <Button
              variant="default"
              onClick={() => syncVithairProductsMutation.mutate()}
              disabled={syncVithairProductsMutation.isPending}
              className="ml-2"
            >
              {syncVithairProductsMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Senkronize Ediliyor...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Senkronize Et
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tüm ürünleri temizleme onay modalı */}
      <Dialog open={isClearProductsDialogOpen} onOpenChange={setIsClearProductsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tüm Ürünleri Temizle</DialogTitle>
            <DialogDescription>
              Bu işlem, veritabanındaki tüm ürünleri kalıcı olarak silecektir. Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsClearProductsDialogOpen(false)}
            >
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={() => clearProductsMutation.mutate()}
              disabled={clearProductsMutation.isPending}
              className="ml-2"
            >
              {clearProductsMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Temizleniyor...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Tüm Ürünleri Temizle
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;