import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, Edit, Search, Plus, RefreshCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminLayout from "@/components/admin/AdminLayout";
import { apiRequest } from "@/lib/queryClient";

// Ürün tipini tanımlayalım
interface Product {
  id: number;
  nameTR: string;
  nameEN: string;
  nameRU: string;
  nameKA: string;
  slug: string;
  descriptionTR: string;
  descriptionEN: string;
  descriptionRU: string;
  descriptionKA: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  isNew: boolean;
}

// Boş bir ürün şablonu
const emptyProduct: Partial<Product> = {
  nameTR: "",
  nameEN: "",
  nameRU: "",
  nameKA: "",
  slug: "",
  descriptionTR: "",
  descriptionEN: "",
  descriptionRU: "",
  descriptionKA: "",
  imageUrl: "",
  price: 0,
  isActive: true,
  isNew: false,
};

export default function ProductsManager() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);

  // Ürünleri getir
  const { data: products = [], isLoading: isLoadingProducts, refetch } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    retry: 1,
  });

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter((product) =>
    product.nameTR.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ürün ekleme ve güncelleme için mutation
  const saveProductMutation = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      if (isEditing && product.id) {
        // Ürün güncelleme
        const res = await apiRequest("PUT", `/api/products/${product.id}`, product);
        return await res.json();
      } else {
        // Yeni ürün ekleme
        const res = await apiRequest("POST", "/api/products", product);
        return await res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: isEditing ? "Ürün güncellendi" : "Ürün eklendi",
        description: isEditing 
          ? "Ürün başarıyla güncellendi" 
          : "Yeni ürün başarıyla eklendi",
      });
      closeDialog();
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Ürün kaydedilirken bir hata oluştu: " + (error as Error).message,
        variant: "destructive",
      });
    },
  });

  // Ürün silme için mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/products/${id}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Ürün silindi",
        description: "Ürün başarıyla silindi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Ürün silinirken bir hata oluştu: " + (error as Error).message,
        variant: "destructive",
      });
    },
  });

  // Vithair ürünlerini senkronize etme için mutation
  const syncVithairProductsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/sync-vithair-products");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Vithair ürünleri senkronize edildi",
        description: `${data.count} ürün başarıyla senkronize edildi`,
      });
      setIsSyncDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Ürünler senkronize edilirken bir hata oluştu: " + (error as Error).message,
        variant: "destructive",
      });
      setIsSyncDialogOpen(false);
    },
  });

  // Tüm ürünleri temizleme için mutation
  const clearProductsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/clear-products");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Ürünler temizlendi",
        description: "Tüm ürünler başarıyla silindi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Ürünler temizlenirken bir hata oluştu: " + (error as Error).message,
        variant: "destructive",
      });
    },
  });

  // Dialog açma fonksiyonu
  const openDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct(emptyProduct);
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  // Dialog kapatma fonksiyonu
  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct(emptyProduct);
    setIsEditing(false);
  };

  // Form değişikliklerini izleme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Ürün kaydetme
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    saveProductMutation.mutate(currentProduct);
  };

  // Ürün silme
  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      deleteProductMutation.mutate(id);
    }
  };

  // Vithair ürünlerini senkronize etme
  const handleSyncVithairProducts = () => {
    setIsSyncDialogOpen(true);
  };

  // Tüm ürünleri temizleme
  const handleClearProducts = () => {
    if (window.confirm("TÜM ürünleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")) {
      clearProductsMutation.mutate();
    }
  };

  // Ürün formunu gönder
  const startSyncProducts = () => {
    syncVithairProductsMutation.mutate();
  };

  return (
    <AdminLayout title="Ürün Yönetimi">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ürün Yönetimi</h1>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSyncVithairProducts}
              disabled={syncVithairProductsMutation.isPending}
            >
              {syncVithairProductsMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4 mr-2" />
              )}
              Vithair Ürünlerini Senkronize Et
            </Button>
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={handleClearProducts}
              disabled={clearProductsMutation.isPending}
            >
              {clearProductsMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Tüm Ürünleri Temizle
            </Button>
            <Button 
              size="sm" 
              onClick={() => openDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün Ekle
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ürünler ({filteredProducts.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ürün ara..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingProducts ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="overflow-auto max-h-[600px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-card">
                    <TableRow>
                      <TableHead>Resim</TableHead>
                      <TableHead>Ürün Adı</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="w-20 text-center">Aktif</TableHead>
                      <TableHead className="w-20 text-center">Yeni</TableHead>
                      <TableHead className="w-40 text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.nameTR}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                              No img
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{product.nameTR}</div>
                          <div className="text-sm text-muted-foreground">{product.nameEN}</div>
                        </TableCell>
                        <TableCell>{product.slug}</TableCell>
                        <TableCell className="text-center">
                          {product.isActive ? "✓" : "✗"}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.isNew ? "✓" : "✗"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDialog(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deleteProductMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? (
                  <p>Aranan kriterlere uygun ürün bulunamadı</p>
                ) : (
                  <p>Henüz ürün eklenmemiş</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ürün Ekleme/Düzenleme Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveProduct}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nameTR" className="text-sm font-medium">Türkçe Adı*</label>
                    <Input
                      id="nameTR"
                      name="nameTR"
                      value={currentProduct.nameTR}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="nameEN" className="text-sm font-medium">İngilizce Adı*</label>
                    <Input
                      id="nameEN"
                      name="nameEN"
                      value={currentProduct.nameEN}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nameRU" className="text-sm font-medium">Rusça Adı*</label>
                    <Input
                      id="nameRU"
                      name="nameRU"
                      value={currentProduct.nameRU}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="nameKA" className="text-sm font-medium">Gürcüce Adı*</label>
                    <Input
                      id="nameKA"
                      name="nameKA"
                      value={currentProduct.nameKA}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="slug" className="text-sm font-medium">Slug*</label>
                  <Input
                    id="slug"
                    name="slug"
                    value={currentProduct.slug}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    URL için kullanılacak benzersiz tanımlayıcı (örn: vithair-shampoo)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="text-sm font-medium">Resim URL*</label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={currentProduct.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Ürün resmi için URL (örn: https://www.example.com/image.jpg)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">Fiyat (Opsiyonel)</label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={currentProduct.isActive}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isActive" className="text-sm font-medium">
                      Aktif
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="isNew"
                      name="isNew"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={currentProduct.isNew}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isNew" className="text-sm font-medium">
                      Yeni Ürün
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="descriptionTR" className="text-sm font-medium">Türkçe Açıklama*</label>
                  <Input
                    id="descriptionTR"
                    name="descriptionTR"
                    value={currentProduct.descriptionTR}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="descriptionEN" className="text-sm font-medium">İngilizce Açıklama*</label>
                  <Input
                    id="descriptionEN"
                    name="descriptionEN"
                    value={currentProduct.descriptionEN}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="descriptionRU" className="text-sm font-medium">Rusça Açıklama*</label>
                  <Input
                    id="descriptionRU"
                    name="descriptionRU"
                    value={currentProduct.descriptionRU}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="descriptionKA" className="text-sm font-medium">Gürcüce Açıklama*</label>
                  <Input
                    id="descriptionKA"
                    name="descriptionKA"
                    value={currentProduct.descriptionKA}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={closeDialog}
                  type="button"
                >
                  İptal
                </Button>
                <Button 
                  type="submit"
                  disabled={saveProductMutation.isPending}
                >
                  {saveProductMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  {isEditing ? "Güncelle" : "Ekle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Vithair Senkronizasyon Dialog */}
        <Dialog open={isSyncDialogOpen} onOpenChange={setIsSyncDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Vithair Ürünlerini Senkronize Et</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Bu işlem, vithair.com.tr sitesinden ürünleri otomatik olarak çekecek ve veritabanına ekleyecektir. 
                Mevcut ürünler silinmeyecek, yalnızca yeni ürünler eklenecektir.
              </p>
              <p className="text-sm font-medium mb-2">Bu işlem:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Mevcut ürünleri korur</li>
                <li>Vithair web sitesinden ürünleri otomatik olarak çeker</li>
                <li>Sitede bulunan tüm ürünleri veritabanına ekler</li>
                <li>İnternet bağlantısı ve site erişilebilirliğine bağlıdır</li>
              </ul>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsSyncDialogOpen(false)}
                disabled={syncVithairProductsMutation.isPending}
              >
                İptal
              </Button>
              <Button 
                onClick={startSyncProducts}
                disabled={syncVithairProductsMutation.isPending}
              >
                {syncVithairProductsMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 mr-2" />
                )}
                Senkronizasyonu Başlat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}