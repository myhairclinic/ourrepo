import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect } from "react";

export default function SeedProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const handleSeedProducts = async () => {
    setIsLoading(true);
    setStatus('idle');
    setResult(null);

    try {
      const response = await apiRequest('POST', '/api/seed/vithair-products');
      const data = await response.json();
      
      setResult(data);
      setStatus('success');
    } catch (error) {
      console.error('Error seeding products:', error);
      setResult(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Vithair Ürünlerini Ekle">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Vithair Ürünleri Ekleme Aracı</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vithair Ürünlerini Ekle</CardTitle>
            <CardDescription>
              Bu işlem vithair.com.tr sitesindeki ürünleri örnek olarak sisteme ekleyecektir. 
              Mevcut ürünler silinir ve yenileri eklenir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ekleme işlemi şu ürünleri içerir:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-1">
              <li>Vie Saç Dökülmesine Karşı Şampuan</li>
              <li>Vie Saç Hacim Şampuanı</li>
              <li>Vie Keratin Saç Maskesi</li>
              <li>Vie Saç Büyüme Serumu</li>
              <li>Vie Sakal Büyüme Yağı</li>
              <li>Vie Saç Derisi Terapi Losyonu</li>
              <li>Vie Argan Saç Yağı</li>
              <li>Vie Saç Onarıcı Saç Kremi</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSeedProducts} 
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  İşleniyor...
                </>
              ) : (
                'Ürünleri Ekle'
              )}
            </Button>
          </CardFooter>
        </Card>

        {status === 'success' && (
          <Alert className="bg-green-50 border-green-500">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">İşlem başarılı!</AlertTitle>
            <AlertDescription className="text-green-700">
              {result.message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert className="bg-red-50 border-red-500">
            <XCircle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800">Hata oluştu!</AlertTitle>
            <AlertDescription className="text-red-700">
              Ürünler eklenirken bir hata meydana geldi. Lütfen tekrar deneyin veya sistem yöneticisine başvurun.
            </AlertDescription>
          </Alert>
        )}

        {result && status === 'success' && result.products && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Eklenen Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.products.map((product: any) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{product.nameTR}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.descriptionTR}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Ürün ID: {product.id}</p>
                    <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}