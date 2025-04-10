import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
// import { useLanguage } from "@/hooks/use-language";
import { useEffect } from "react";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";

// Pages
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import GalleryPage from "./pages/GalleryPage";
import PackagesPage from "./pages/PackagesPage";
import ProductsPage from "./pages/ProductsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import NotFound from "./pages/not-found";

// Admin Pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ServicesManager from "@/pages/admin/ServicesManager";
import BlogManager from "@/pages/admin/BlogManager";
import GalleryManager from "@/pages/admin/GalleryManager";
import AppointmentsManager from "@/pages/admin/AppointmentsManager";

// Admin route protection
import { useAdmin } from "./hooks/use-admin";

function ProtectedAdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAdmin();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/admin/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard">
        <ProtectedAdminRoute component={AdminDashboard} />
      </Route>
      <Route path="/admin/services">
        <ProtectedAdminRoute component={ServicesManager} />
      </Route>
      <Route path="/admin/blog">
        <ProtectedAdminRoute component={BlogManager} />
      </Route>
      <Route path="/admin/gallery">
        <ProtectedAdminRoute component={GalleryManager} />
      </Route>
      <Route path="/admin/appointments">
        <ProtectedAdminRoute component={AppointmentsManager} />
      </Route>
      
      {/* Public routes with language prefix */}
      <Route path="/:lang" component={HomePage} />
      <Route path="/:lang/services/:slug" component={ServicePage} />
      <Route path="/:lang/gallery" component={GalleryPage} />
      <Route path="/:lang/packages" component={PackagesPage} />
      <Route path="/:lang/products" component={ProductsPage} />
      <Route path="/:lang/blog" component={BlogPage} />
      <Route path="/:lang/blog/:slug" component={BlogPostPage} />
      <Route path="/:lang/about" component={AboutPage} />
      <Route path="/:lang/contact" component={ContactPage} />
      <Route path="/:lang/appointment" component={AppointmentPage} />
      
      {/* Redirect to language prefix */}
      <Route path="/">
        <HomePage />
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [pathname] = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Router />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      <Toaster />
    </>
  );
}

export default App;
