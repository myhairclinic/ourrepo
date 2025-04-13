import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Edit,
  FileWarning,
  Globe,
  Info,
  Lightbulb,
  Link,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash,
  X,
  Activity,
  AlertCircle,
  Check,
  ActivitySquare,
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Dil seçenekleri
const languages = [
  { id: "TR", name: "Türkçe" },
  { id: "EN", name: "İngilizce" },
  { id: "RU", name: "Rusça" },
  { id: "KA", name: "Gürcüce" },
];

interface SeoManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const SeoManagement: React.FC<SeoManagementProps> = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pages");
  const [activeLanguage, setActiveLanguage] = useState("TR");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);

  // SEO ayarlarını getir
  const {
    data: pageSeoSettings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/seo/pages"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/seo/pages");
      return await res.json();
    },
  });

  // Tüm sayfaları getir
  const {
    data: allPages,
    isLoading: isAllPagesLoading,
  } = useQuery({
    queryKey: ["/api/seo/all-pages"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/seo/all-pages");
      return await res.json();
    },
  });

  // Sitemap oluştur
  const sitemapMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/seo/generate-sitemap");
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Sitemap oluşturuldu",
        description: "XML sitemap başarıyla oluşturuldu ve kaydedildi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sitemap oluşturulamadı",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // SEO analiz verilerini getir
  const {
    data: seoAnalysisData,
    isLoading: isAnalysisLoading,
  } = useQuery({
    queryKey: ["/api/seo/analysis"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/seo/analysis");
      return await res.json();
    },
  });

  // SEO analizi yap
  const seoAnalysisMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/seo/run-analysis");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/analysis"] });
      toast({
        title: "SEO Analizi Tamamlandı",
        description: "Site SEO analizi başarıyla gerçekleştirildi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "SEO Analizi Yapılamadı",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Sayfa SEO ayarlarını güncelle
  const updatePageSeoSettings = useMutation({
    mutationFn: async (updatedPage: any) => {
      const res = await apiRequest("PUT", `/api/seo/pages/${updatedPage.id}`, updatedPage);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      setIsDetailModalOpen(false);
      toast({
        title: "Sayfa SEO ayarları güncellendi",
        description: "Sayfa meta etiketleri ve SEO ayarları başarıyla güncellendi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Güncelleme başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Yeni sayfa SEO ayarları ekle
  const addPageSeoSettings = useMutation({
    mutationFn: async (newPage: any) => {
      const res = await apiRequest("POST", "/api/seo/pages", newPage);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      setIsAddPageModalOpen(false);
      toast({
        title: "Sayfa SEO ayarları eklendi",
        description: "Yeni sayfa meta etiketleri ve SEO ayarları başarıyla eklendi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ekleme başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Sayfa SEO ayarlarını sil
  const deletePageSeoSettings = useMutation({
    mutationFn: async (pageId: number) => {
      const res = await apiRequest("DELETE", `/api/seo/pages/${pageId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      toast({
        title: "Sayfa SEO ayarları silindi",
        description: "Sayfa meta etiketleri ve SEO ayarları başarıyla silindi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Silme başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Detay modalını aç
  const openDetailModal = (page: any) => {
    setSelectedPage(page);
    setIsDetailModalOpen(true);
  };

  // Sayfa ekle modalını aç
  const openAddPageModal = () => {
    setIsAddPageModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Yönetimi</h2>
          <p className="text-muted-foreground">
            Meta etiketlerini yönetin, sitemap oluşturun ve SEO analizleri yapın.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => sitemapMutation.mutate()}
            disabled={sitemapMutation.isPending}
          >
            {sitemapMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                <FileWarning className="mr-2 h-4 w-4" />
                Sitemap Oluştur
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pages" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages">Sayfalar</TabsTrigger>
          <TabsTrigger value="schema">Schema.org</TabsTrigger>
          <TabsTrigger value="analysis">SEO Analizi</TabsTrigger>
        </TabsList>
        
        {/* Sayfalar İçeriği */}
        <TabsContent value="pages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Sayfa SEO Ayarları</h3>
            <Button onClick={openAddPageModal} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Yeni Sayfa Ekle
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-medium">Hata Oluştu</h3>
              <p className="text-gray-500">Sayfa SEO ayarlarını getirirken bir hata oluştu.</p>
            </div>
          ) : pageSeoSettings && pageSeoSettings.length > 0 ? (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Sayfa</TableHead>
                    <TableHead>Meta Başlık</TableHead>
                    <TableHead>İndeksleme</TableHead>
                    <TableHead>Takip</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageSeoSettings.map((page: any) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1.5 text-gray-500" />
                          <span>{page.pageTR}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {page.metaTitleTR}
                        </div>
                      </TableCell>
                      <TableCell>
                        {page.indexPage ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="h-3 w-3 mr-1" />
                            Evet
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <X className="h-3 w-3 mr-1" />
                            Hayır
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {page.followLinks ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="h-3 w-3 mr-1" />
                            Evet
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <X className="h-3 w-3 mr-1" />
                            Hayır
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetailModal(page)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Düzenle</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm("Bu sayfanın SEO ayarlarını silmek istediğinize emin misiniz?")) {
                                deletePageSeoSettings.mutate(page.id);
                              }
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Sil</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <FileWarning className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium">Sayfa SEO Ayarı Bulunamadı</h3>
              <p className="text-gray-500 mb-4">
                Henüz hiçbir sayfa için SEO ayarı eklenmemiş.
              </p>
              <Button onClick={openAddPageModal} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Sayfa Ekle
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Schema.org İçeriği */}
        <TabsContent value="schema" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Schema.org Özellikleri</CardTitle>
                <CardDescription>
                  Sayfa yapılandırılmış veri özellikleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  Bu özellik yakında kullanıma açılacaktır.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* SEO Analizi İçeriği */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Sayfa Performans Analizi</CardTitle>
                <CardDescription>
                  Sitenizin tüm sayfaları için SEO performans skorları
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData && seoAnalysisData.pages && seoAnalysisData.pages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium text-sm text-gray-500">Sayfa</th>
                          <th className="text-center py-3 font-medium text-sm text-gray-500">SEO Skoru</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-500">Durum</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seoAnalysisData.pages.map((page: any, index: number) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="py-3 text-sm">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-1.5 text-gray-500" />
                                <span className="font-medium">{page.url}</span>
                              </div>
                            </td>
                            <td className="py-3 text-sm text-center">
                              <div className="flex items-center justify-center">
                                <div className="w-12 h-12 relative rounded-full flex items-center justify-center">
                                  {/* Score circle background */}
                                  <svg viewBox="0 0 36 36" className="w-12 h-12 absolute">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="#eee"
                                      strokeWidth="3"
                                      strokeDasharray="100, 100"
                                    />
                                  </svg>
                                  {/* Score circle fill */}
                                  <svg viewBox="0 0 36 36" className="w-12 h-12 absolute rotate-90">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke={page.score >= 80 ? "#22c55e" : page.score >= 50 ? "#eab308" : "#ef4444"}
                                      strokeWidth="3"
                                      strokeDasharray={`${page.score}, 100`}
                                    />
                                  </svg>
                                  <span className="text-sm font-semibold">{page.score}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 text-sm">
                              {page.score >= 80 ? (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="mr-1 h-3 w-3" />
                                  İyi
                                </div>
                              ) : page.score >= 50 ? (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  Geliştirilmeli
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <X className="mr-1 h-3 w-3" />
                                  Kritik
                                </div>
                              )}
                            </td>
                            <td className="py-3 text-sm">
                              <Button
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const matchingPage = pageSeoSettings.find((page_setting) => page_setting.canonicalUrl === page.url || page_setting.page === page.url);
                                  if (matchingPage) {
                                    openDetailModal(matchingPage);
                                  } else {
                                    toast({
                                      title: "Sayfa bulunamadı",
                                      description: "Bu sayfa için SEO ayarları henüz tanımlanmamış.",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                className="h-8"
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Düzenle
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileWarning className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>SEO analiz verileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      Analiz yapmak için önce sitemap oluşturun ve/veya sayfaları ekleyin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Genel SEO Metrikleri</CardTitle>
                <CardDescription>
                  Site geneli SEO performans değerlendirmesi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData ? (
                  <div className="space-y-6">
                    <div>
                      <div className="mb-1.5 flex justify-between">
                        <h4 className="text-sm font-medium">Ortalama SEO Skoru</h4>
                        <span className="text-sm font-medium">{seoAnalysisData.averageScore || 0}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            (seoAnalysisData.averageScore || 0) >= 80 
                              ? "bg-green-500" 
                              : (seoAnalysisData.averageScore || 0) >= 50 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }`}
                          style={{ width: `${seoAnalysisData.averageScore || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {seoAnalysisData.indexablePages || 0}
                        </div>
                        <div className="text-sm text-gray-500">İndekslenebilir Sayfa</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {seoAnalysisData.totalPages || 0}
                        </div>
                        <div className="text-sm text-gray-500">Toplam Sayfa</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Kritik SEO Sorunları</h4>
                      {seoAnalysisData.criticalIssues && seoAnalysisData.criticalIssues.length > 0 ? (
                        <ul className="space-y-2">
                          {seoAnalysisData.criticalIssues.map((issue: string, index: number) => (
                            <li key={index} className="flex items-start text-sm">
                              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                                <X className="h-3 w-3 text-red-600" />
                              </div>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-gray-500 py-2">
                          Kritik SEO sorunu bulunamadı.
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => seoAnalysisMutation.mutate()}
                        disabled={seoAnalysisMutation.isPending}
                      >
                        {seoAnalysisMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analiz Ediliyor...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Analizi Yenile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ActivitySquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Analiz verileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      SEO analizi yapmak için aşağıdaki butona tıklayın.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => seoAnalysisMutation.mutate()}
                      disabled={seoAnalysisMutation.isPending}
                    >
                      {seoAnalysisMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analiz Ediliyor...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          SEO Analizi Yap
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>SEO İyileştirme Önerileri</CardTitle>
                <CardDescription>
                  Sitenizin arama motoru optimizasyonunu artırmak için tavsiyeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : seoAnalysisData && seoAnalysisData.suggestions && seoAnalysisData.suggestions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seoAnalysisData.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className={`
                            flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3
                            ${suggestion.severity === 'high' 
                              ? 'bg-red-100 text-red-600' 
                              : suggestion.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {suggestion.severity === 'high' ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : suggestion.severity === 'medium' ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Info className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">{suggestion.title}</h4>
                            <p className="text-xs text-gray-500">{suggestion.description}</p>
                            {suggestion.actions && (
                              <div className="mt-2 text-xs font-medium text-blue-600">
                                Önerilen aksiyon: {suggestion.actions}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>İyileştirme önerileri bulunamadı.</p>
                    <p className="mt-2 text-sm">
                      SEO analizi yaparak iyileştirme önerilerini görüntüleyin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Sayfa SEO Detay Modalı */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sayfa SEO Ayarları Düzenle</DialogTitle>
            <DialogDescription>
              {selectedPage && `${selectedPage.pageTR} sayfası için SEO ayarlarını düzenleyin.`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPage && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2 mb-4">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeLanguage === lang.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pageTitle">
                    Sayfa Adı ({languages.find(l => l.id === activeLanguage)?.name})
                  </Label>
                  <Input
                    id="pageTitle"
                    defaultValue={selectedPage[`page${activeLanguage}`]}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="metaTitle">
                    Meta Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="metaTitle"
                      defaultValue={selectedPage[`metaTitle${activeLanguage}`]}
                      className="pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                      {(selectedPage[`metaTitle${activeLanguage}`] || "").length}/60
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    İdeal meta başlık uzunluğu: 50-60 karakter
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="metaDescription">
                    Meta Açıklama ({languages.find(l => l.id === activeLanguage)?.name})
                  </Label>
                  <div className="mt-1 relative">
                    <Textarea
                      id="metaDescription"
                      rows={3}
                      defaultValue={selectedPage[`metaDescription${activeLanguage}`]}
                    />
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {(selectedPage[`metaDescription${activeLanguage}`] || "").length}/160
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    İdeal meta açıklama uzunluğu: 150-160 karakter
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="metaKeywords">
                    Meta Anahtar Kelimeler ({languages.find(l => l.id === activeLanguage)?.name})
                  </Label>
                  <Textarea
                    id="metaKeywords"
                    rows={2}
                    defaultValue={selectedPage[`metaKeywords${activeLanguage}`]}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Anahtar kelimeleri virgülle ayırarak girin
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    defaultValue={selectedPage.canonicalUrl}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="indexPage">Arama Motoru İndeksleme</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="indexPage"
                      defaultChecked={selectedPage.indexPage}
                    />
                    <Label htmlFor="indexPage" className="font-normal">
                      Bu sayfanın arama motorları tarafından indexlenmesine izin ver
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="followLinks">Link Takibi</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="followLinks"
                      defaultChecked={selectedPage.followLinks}
                    />
                    <Label htmlFor="followLinks" className="font-normal">
                      Arama motorlarının bu sayfadaki linkleri takip etmesine izin ver
                    </Label>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h4 className="text-sm font-medium mb-3">Açık Grafik (Open Graph) Etiketleri</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ogTitle">
                        OG Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                      </Label>
                      <Input
                        id="ogTitle"
                        defaultValue={selectedPage[`ogTitle${activeLanguage}`]}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ogDescription">
                        OG Açıklama ({languages.find(l => l.id === activeLanguage)?.name})
                      </Label>
                      <Textarea
                        id="ogDescription"
                        rows={2}
                        defaultValue={selectedPage[`ogDescription${activeLanguage}`]}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ogImage">OG Resim URL</Label>
                      <Input
                        id="ogImage"
                        defaultValue={selectedPage.ogImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="mt-6 bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">SEO Değerlendirmesi</CardTitle>
                  <CardDescription>
                    Meta etiketleri ve SEO ayarlarının analizi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <span className="text-sm font-medium">SEO Skoru: </span>
                    <span className={`font-bold ${
                      getSeoScore(selectedPage) >= 80 
                        ? "text-green-600" 
                        : getSeoScore(selectedPage) >= 50 
                          ? "text-yellow-600" 
                          : "text-red-600"
                    }`}>
                      {getSeoScore(selectedPage)}/100
                    </span>
                  </div>
                  
                  {getSeoSuggestions(selectedPage).length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">Öneriler:</span>
                      <ul className="mt-1 text-sm space-y-1.5">
                        {getSeoSuggestions(selectedPage).map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-1.5 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              İptal
            </Button>
            <Button
              disabled={updatePageSeoSettings.isPending}
              onClick={() => {
                // Burada form verilerini toplayıp API'ye gönderme işlemi yapılacak
                updatePageSeoSettings.mutate({
                  ...selectedPage,
                  // Form verileri burada güncellenecek
                });
              }}
            >
              {updatePageSeoSettings.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Yeni Sayfa Ekleme Modalı */}
      <Dialog open={isAddPageModalOpen} onOpenChange={setIsAddPageModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Yeni Sayfa SEO Ayarları Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir sayfa için SEO meta etiketleri ve yapılandırma ayarları ekleyin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLanguage(lang.id)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeLanguage === lang.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <Label htmlFor="selectPage">Sayfa Seçin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sayfa seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {isAllPagesLoading ? (
                        <div className="p-2 text-center">
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                          <span className="text-xs">Yükleniyor...</span>
                        </div>
                      ) : allPages && allPages.length > 0 ? (
                        allPages.map((page: any) => (
                          <SelectItem key={page.url} value={page.url}>
                            {page.title}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-gray-500">
                          Sayfa bulunamadı
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pageTitle">
                    Sayfa Adı ({languages.find(l => l.id === activeLanguage)?.name})
                  </Label>
                  <Input
                    id="pageTitle"
                    placeholder={`Sayfa başlığı (${activeLanguage})`}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="metaTitle">
                  Meta Başlık ({languages.find(l => l.id === activeLanguage)?.name})
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="metaTitle"
                    placeholder={`Meta başlık (${activeLanguage})`}
                    className="pr-16"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
                    0/60
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  İdeal meta başlık uzunluğu: 50-60 karakter
                </p>
              </div>
              
              <div>
                <Label htmlFor="metaDescription">
                  Meta Açıklama ({languages.find(l => l.id === activeLanguage)?.name})
                </Label>
                <div className="mt-1 relative">
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    placeholder={`Meta açıklama (${activeLanguage})`}
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                    0/160
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  İdeal meta açıklama uzunluğu: 150-160 karakter
                </p>
              </div>
              
              <div>
                <Label htmlFor="metaKeywords">
                  Meta Anahtar Kelimeler ({languages.find(l => l.id === activeLanguage)?.name})
                </Label>
                <Textarea
                  id="metaKeywords"
                  rows={2}
                  placeholder={`Meta anahtar kelimeler (${activeLanguage})`}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Anahtar kelimeleri virgülle ayırarak girin
                </p>
              </div>
              
              <div>
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  placeholder="https://domainadi.com/sayfa-yolu"
                />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="indexPage">Arama Motoru İndeksleme</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="indexPage"
                    defaultChecked={true}
                  />
                  <Label htmlFor="indexPage" className="font-normal">
                    Bu sayfanın arama motorları tarafından indexlenmesine izin ver
                  </Label>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="followLinks">Link Takibi</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="followLinks"
                    defaultChecked={true}
                  />
                  <Label htmlFor="followLinks" className="font-normal">
                    Arama motorlarının bu sayfadaki linkleri takip etmesine izin ver
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPageModalOpen(false)}>
              İptal
            </Button>
            <Button
              disabled={addPageSeoSettings.isPending}
              onClick={() => {
                // Burada form verilerini toplayıp API'ye gönderme işlemi yapılacak
                addPageSeoSettings.mutate({
                  // Form verileri burada alınacak
                });
              }}
            >
              {addPageSeoSettings.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ekleniyor...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Ekle
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// SEO skoru hesaplama fonksiyonu
function getSeoScore(page: any): number {
  if (!page) return 0;
  
  let score = 0;
  const maxScore = 100;
  
  // Meta başlıkları kontrol et
  if (page.metaTitleTR && page.metaTitleTR.length > 10) score += 10;
  if (page.metaTitleEN && page.metaTitleEN.length > 10) score += 10;
  if (page.metaTitleRU && page.metaTitleRU.length > 10) score += 5;
  if (page.metaTitleKA && page.metaTitleKA.length > 10) score += 5;
  
  // Meta açıklamaları kontrol et
  if (page.metaDescriptionTR && page.metaDescriptionTR.length > 50) score += 10;
  if (page.metaDescriptionEN && page.metaDescriptionEN.length > 50) score += 10;
  if (page.metaDescriptionRU && page.metaDescriptionRU.length > 50) score += 5;
  if (page.metaDescriptionKA && page.metaDescriptionKA.length > 50) score += 5;
  
  // Meta anahtar kelimeleri kontrol et
  if (page.metaKeywordsTR && page.metaKeywordsTR.length > 10) score += 5;
  if (page.metaKeywordsEN && page.metaKeywordsEN.length > 10) score += 5;
  if (page.metaKeywordsRU && page.metaKeywordsRU.length > 10) score += 2.5;
  if (page.metaKeywordsKA && page.metaKeywordsKA.length > 10) score += 2.5;
  
  // Canonical URL kontrol et
  if (page.canonicalUrl && page.canonicalUrl.length > 5) score += 10;
  
  // Indexleme ve link takibi kontrolü
  if (page.indexPage) score += 7.5;
  if (page.followLinks) score += 7.5;
  
  return score;
}

// SEO önerileri oluşturma fonksiyonu
function getSeoSuggestions(page: any): string[] {
  if (!page) return [];
  
  const suggestions: string[] = [];
  
  // Meta başlıkları kontrol et
  if (!page.metaTitleTR || page.metaTitleTR.length < 10)
    suggestions.push("Türkçe meta başlığı ekleyin veya uzatın (en az 10 karakter).");
  if (!page.metaTitleEN || page.metaTitleEN.length < 10)
    suggestions.push("İngilizce meta başlığı ekleyin veya uzatın (en az 10 karakter).");
  
  // Meta açıklamaları kontrol et
  if (!page.metaDescriptionTR || page.metaDescriptionTR.length < 50)
    suggestions.push("Türkçe meta açıklamasını ekleyin veya uzatın (en az 50 karakter).");
  if (!page.metaDescriptionEN || page.metaDescriptionEN.length < 50)
    suggestions.push("İngilizce meta açıklamasını ekleyin veya uzatın (en az 50 karakter).");
  
  // Canonical URL kontrol et
  if (!page.canonicalUrl || page.canonicalUrl.length < 5)
    suggestions.push("Canonical URL ekleyin.");
  
  // Indexleme ve link takibi kontrolü
  if (!page.indexPage)
    suggestions.push("Sayfa indexlemeyi aktifleştirin (arama motorları için görünürlük).");
  if (!page.followLinks)
    suggestions.push("Link takibini aktifleştirin (arama motorları için).");
  
  return suggestions;
}

export default SeoManagement;