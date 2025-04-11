import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from '@/lib/queryClient';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BrowserSeedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleSeedBlogs() {
    try {
      setIsLoading(true);
      setResult(null);
      
      const response = await apiRequest('POST', '/api/seed/blog-direct');
      const data = await response.json();
      
      setResult(JSON.stringify(data, null, 2));
      
      toast({
        title: 'Başarılı',
        description: `${data.count} blog yazısı başarıyla eklendi.`,
      });
    } catch (error) {
      console.error('Blog seed hatası:', error);
      setResult(JSON.stringify({ error: (error as Error).message }, null, 2));
      
      toast({
        title: 'Hata',
        description: 'Blog yazıları eklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Blog Seed Aracı</CardTitle>
          <CardDescription>
            Veritabanına benzersiz blog yazıları eklemek için aşağıdaki butona tıklayın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSeedBlogs} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                İşlem yapılıyor...
              </>
            ) : (
              'Blog Yazılarını Ekle'
            )}
          </Button>
          
          {result && (
            <div className="mt-4 p-4 bg-muted rounded-md overflow-x-auto">
              <pre className="text-xs">{result}</pre>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Bu işlem, veritabanındaki mevcut tüm blog yazılarını silecek ve yerlerine benzersiz içerikli yeni blog yazıları ekleyecektir.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}