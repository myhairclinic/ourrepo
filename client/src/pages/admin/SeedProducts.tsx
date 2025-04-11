import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/use-admin";
import { API_ROUTES } from "@/lib/constants";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Upload } from "lucide-react";

export default function SeedProducts() {
  const { user } = useAdmin();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing products count
  const { data: productsCount = 0 } = useQuery<number>({
    queryKey: ["admin", "productsCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.PRODUCTS}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: true, // Always enabled, not just for admin users
  });

  // Mutation for seeding Vithair products
  const seedVithairMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/seed/vithair-products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu');
        }
        
        const result = await response.json();
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Vithair ürünleri başarıyla yüklendi",
        variant: "default",
      });
      // Invalidate related queries to refresh products data
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: ["admin", "productsCount"] });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Ürünler yüklenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleSeedVithairProducts = () => {
    seedVithairMutation.mutate();
  };

  const inAdminLayout = window.location.pathname.startsWith("/admin");
  const regularContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Ürün Yükleme</CardTitle>
          <CardDescription>
            Bu sayfada Vithair ürünlerini sisteme yükleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Vithair Ürünleri</CardTitle>
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardDescription>
                    Vithair şampuan, bakım ve saç ürünleri
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4 items-center">
                    <div className="text-center">
                      <p className="text-md font-medium">Mevcut Ürün Sayısı: <span className="font-bold">{productsCount}</span></p>
                      {productsCount > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Ürünler zaten yüklenmiş görünüyor.
                        </p>
                      )}
                    </div>
                    <Button 
                      onClick={handleSeedVithairProducts} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Ürünler Yükleniyor...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Ürünleri Yükle
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center">
                <h3 className="text-lg font-medium mb-4">Ürünler Hakkında Bilgi</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Vithair ürünleri, saç bakımı için özel olarak formüle edilmiş ürünlerdir.</li>
                  <li>Ürünler arasında şampuanlar, saç maskeleri, saç büyüme serum ve yağları bulunmaktadır.</li>
                  <li>Tüm ürünler Türkçe, İngilizce, Rusça ve Gürcüce dillerinde açıklamalara sahiptir.</li>
                  <li>Bu özellik ile tüm ürünleri tek bir tıklama ile sisteme yükleyebilirsiniz.</li>
                  <li>Ürünleri tekrar yüklemek önceki ürünleri silip yeniden ekleyecektir.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Admin layout için wrapping
  if (inAdminLayout) {
    return <AdminLayout title="Ürün Yönetimi">{regularContent}</AdminLayout>;
  }

  // Genel erişim için standalone view
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Vithair Ürünleri Yükleme Sayfası</h1>
      {regularContent}
    </div>
  );
}