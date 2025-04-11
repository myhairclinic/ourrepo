import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/use-admin";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ROUTES } from "@/lib/constants";
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Star,
  Package,
  ShoppingBag,
  LayoutDashboard,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {
  const { user } = useAdmin();
  
  // Fetch Data for Dashboard
  const { data: servicesCount = 0, isLoading: isLoadingServices } = useQuery<number>({
    queryKey: ["admin", "servicesCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.SERVICES}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!user,
  });
  
  const { data: appointmentsCount = 0, isLoading: isLoadingAppointments } = useQuery<number>({
    queryKey: ["admin", "appointmentsCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.APPOINTMENTS}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!user,
  });
  
  const { data: blogPostsCount = 0, isLoading: isLoadingBlogPosts } = useQuery<number>({
    queryKey: ["admin", "blogPostsCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.BLOG}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!admin,
  });
  
  const { data: messagesCount = 0, isLoading: isLoadingMessages } = useQuery<number>({
    queryKey: ["admin", "messagesCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.MESSAGES}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!admin,
  });
  
  const { data: packagesCount = 0, isLoading: isLoadingPackages } = useQuery<number>({
    queryKey: ["admin", "packagesCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.PACKAGES}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!admin,
  });
  
  const { data: productsCount = 0, isLoading: isLoadingProducts } = useQuery<number>({
    queryKey: ["admin", "productsCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.PRODUCTS}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!admin,
  });
  
  const { data: reviewsCount = 0, isLoading: isLoadingReviews } = useQuery<number>({
    queryKey: ["admin", "reviewsCount"],
    queryFn: async () => {
      const response = await fetch(`${API_ROUTES.REVIEWS}/count`);
      if (!response.ok) return 0;
      const data = await response.json();
      return data.count;
    },
    enabled: !!admin,
  });

  // This would typically come from API, using mock data for now
  const popularServices = [
    { id: 1, name: "Saç Ekimi", percentage: 45 },
    { id: 2, name: "Sakal Ekimi", percentage: 25 },
    { id: 3, name: "Kaş Ekimi", percentage: 20 },
    { id: 4, name: "PRP Tedavisi", percentage: 10 }
  ];

  // Recent appointments - would normally come from API
  const recentActivity = [
    { id: 1, type: 'appointment', name: 'Mehmet Yılmaz', date: '1 saat önce', status: 'confirmed' },
    { id: 2, type: 'message', name: 'Ayşe Kaya', date: '3 saat önce', status: 'unread' },
    { id: 3, type: 'review', name: 'Ali Demir', date: '4 saat önce', status: 'new' },
    { id: 4, type: 'appointment', name: 'Zeynep Çelik', date: '1 gün önce', status: 'confirmed' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Hizmet</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">
                {isLoadingServices ? "..." : servicesCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Aktif hizmet sayısı
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium">Bekleyen Randevular</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">
                {isLoadingAppointments ? "..." : appointmentsCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Onay bekleyen randevu sayısı
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">
                {isLoadingBlogPosts ? "..." : blogPostsCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Yayınlanan blog yazıları
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium">Paketler</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">
                {isLoadingPackages ? "..." : packagesCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Aktif paket sayısı
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Genel Bakış</CardTitle>
              <CardDescription>
                Site yönetimi genel veriler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="services">
                <TabsList className="mb-4">
                  <TabsTrigger value="services">Popüler Hizmetler</TabsTrigger>
                  <TabsTrigger value="appointments">Son Aktiviteler</TabsTrigger>
                </TabsList>
                
                <TabsContent value="services" className="space-y-5">
                  {popularServices.map((service) => (
                    <div key={service.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{service.name}</span>
                        <span className="text-sm text-muted-foreground">{service.percentage}%</span>
                      </div>
                      <Progress value={service.percentage} className="h-2" />
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="appointments">
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4">
                        <div className={`rounded-full p-2 ${activity.type === 'appointment' ? 'bg-blue-100' : activity.type === 'message' ? 'bg-green-100' : 'bg-orange-100'}`}>
                          {activity.type === 'appointment' ? (
                            <Calendar className="h-4 w-4 text-blue-500" />
                          ) : activity.type === 'message' ? (
                            <MessageSquare className="h-4 w-4 text-green-500" />
                          ) : (
                            <Star className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.type === 'appointment' ? 'Randevu oluşturdu' : 
                             activity.type === 'message' ? 'Mesaj gönderdi' : 
                             'Değerlendirme yaptı'}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>İçerik Yönetimi</CardTitle>
              <CardDescription>
                İçerik durumu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Ürünler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{isLoadingProducts ? "..." : productsCount}</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Mesajlar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{isLoadingMessages ? "..." : messagesCount}</span>
                    <ArrowUpRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Değerlendirmeler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{isLoadingReviews ? "..." : reviewsCount}</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Ziyaretçiler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">2,540</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}