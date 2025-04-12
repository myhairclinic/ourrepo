import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/hooks/use-language";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import AppointmentButton from "./components/layout/AppointmentButton";

// Pages
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import ServicesListPage from "./pages/ServicesListPage";
import GalleryPage from "./pages/GalleryPage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import AppointmentTracker from "./pages/AppointmentTracker";
import SocialMediaPage from "./pages/SocialMediaPage";
import AftercareGuidesPage from "./pages/AftercareGuidesPage";
import NotFound from "./pages/not-found";

// Admin Pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminRegisterPage from "@/pages/admin/AdminRegisterPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ServicesManager from "@/pages/admin/ServicesManager";
import BlogPosts from "@/pages/admin/BlogPosts";
import GalleryManager from "@/pages/admin/GalleryManager";
import AppointmentsManager from "@/pages/admin/AppointmentsManager";
import PackagesManager from "@/pages/admin/PackagesManager";
import ProductsManager from "@/pages/admin/ProductsManager";
import SeedProducts from "@/pages/admin/SeedProducts";
import ReviewsManager from "@/pages/admin/ReviewsManager";
import FaqsManager from "@/pages/admin/FaqsManager";
import AftercareGuidesManager from "@/pages/admin/AftercareGuidesManager";
import BrowserSeedPage from "@/pages/BrowserSeedPage";

// Admin route protection
import { useAdmin } from "./hooks/use-admin";
import { AdminProvider } from "./context/AdminContext";

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
  const { language, addPrefix } = useLanguage();
  const [, setLocation] = useLocation();
  
  // If route doesn't have language prefix, redirect to prefixed route
  useEffect(() => {
    const handleInitialRoute = () => {
      // Don't redirect admin routes or special tools
      if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/seed-blogs')) {
        return;
      }
      
      // Check if current path has a language prefix
      const hasLangPrefix = /^\/(tr|en|ru|ka)(\/|$)/.test(window.location.pathname);
      
      // If no language prefix, redirect to the default language
      if (!hasLangPrefix && window.location.pathname === '/') {
        setLocation(`/${language.toLowerCase()}`);
      } else if (!hasLangPrefix && window.location.pathname !== '/') {
        // For other paths without language prefix, add the prefix
        setLocation(`/${language.toLowerCase()}${window.location.pathname}`);
      }
    };
    
    handleInitialRoute();
  }, [language, setLocation]);
  
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/register" component={AdminRegisterPage} />
      <Route path="/admin/dashboard">
        <ProtectedAdminRoute component={AdminDashboard} />
      </Route>
      <Route path="/admin/services">
        <ProtectedAdminRoute component={ServicesManager} />
      </Route>
      <Route path="/admin/blog">
        <ProtectedAdminRoute component={BlogPosts} />
      </Route>
      <Route path="/admin/gallery">
        <ProtectedAdminRoute component={GalleryManager} />
      </Route>
      <Route path="/admin/appointments">
        <ProtectedAdminRoute component={AppointmentsManager} />
      </Route>
      <Route path="/admin/packages">
        <ProtectedAdminRoute component={PackagesManager} />
      </Route>
      <Route path="/admin/products">
        <ProtectedAdminRoute component={ProductsManager} />
      </Route>
      <Route path="/admin/seed-products">
        <ProtectedAdminRoute component={SeedProducts} />
      </Route>
      <Route path="/admin/reviews">
        <ProtectedAdminRoute component={ReviewsManager} />
      </Route>
      <Route path="/admin/faqs">
        <ProtectedAdminRoute component={FaqsManager} />
      </Route>
      <Route path="/admin/aftercare-guides">
        <ProtectedAdminRoute component={AftercareGuidesManager} />
      </Route>
      
      {/* Special tool routes */}
      <Route path="/seed-blogs" component={BrowserSeedPage} />
      <Route path="/seed-vithair-products" component={SeedProducts} />
      
      {/* Public routes with language prefix */}
      <Route path="/:lang" component={HomePage} />
      <Route path="/:lang/services" component={ServicesListPage} />
      <Route path="/:lang/services/:slug" component={ServicePage} />
      <Route path="/:lang/gallery" component={GalleryPage} />
      <Route path="/:lang/packages" component={PackagesPage} />
      <Route path="/:lang/packages/:slug" component={PackageDetailPage} />
      <Route path="/:lang/products" component={ProductsPage} />
      <Route path="/:lang/products/:productSlug" component={ProductPage} />
      <Route path="/:lang/blog" component={BlogPage} />
      <Route path="/:lang/blog/:slug" component={BlogPostPage} />
      <Route path="/:lang/about" component={AboutPage} />
      <Route path="/:lang/contact" component={ContactPage} />
      <Route path="/:lang/appointment" component={AppointmentPage} />
      <Route path="/:lang/appointment-tracker" component={AppointmentTracker} />
      <Route path="/:lang/social" component={SocialMediaPage} />
      <Route path="/:lang/social-media" component={SocialMediaPage} />
      <Route path="/:lang/aftercare-guides" component={AftercareGuidesPage} />
      
      {/* Root redirect to language prefix */}
      <Route path="/">
        {() => {
          // Redirect to appropriate language route
          setLocation(addPrefix('/'));
          return null;
        }}
      </Route>
      
      {/* Direct routes without language prefix - redirect to language prefixed version */}
      <Route path="/services">
        {() => { setLocation(addPrefix('/services')); return null; }}
      </Route>
      <Route path="/services/:slug">
        {({slug}) => { setLocation(addPrefix(`/services/${slug}`)); return null; }}
      </Route>
      <Route path="/gallery">
        {() => { setLocation(addPrefix('/gallery')); return null; }}
      </Route>
      <Route path="/packages">
        {() => { setLocation(addPrefix('/packages')); return null; }}
      </Route>
      <Route path="/packages/:slug">
        {({slug}) => { setLocation(addPrefix(`/packages/${slug}`)); return null; }}
      </Route>
      <Route path="/products">
        {() => { setLocation(addPrefix('/products')); return null; }}
      </Route>
      <Route path="/products/:productSlug">
        {({productSlug}) => { setLocation(addPrefix(`/products/${productSlug}`)); return null; }}
      </Route>
      <Route path="/blog">
        {() => { setLocation(addPrefix('/blog')); return null; }}
      </Route>
      <Route path="/blog/:slug">
        {({slug}) => { setLocation(addPrefix(`/blog/${slug}`)); return null; }}
      </Route>
      <Route path="/about">
        {() => { setLocation(addPrefix('/about')); return null; }}
      </Route>
      <Route path="/contact">
        {() => { setLocation(addPrefix('/contact')); return null; }}
      </Route>
      <Route path="/appointment">
        {() => { setLocation(addPrefix('/appointment')); return null; }}
      </Route>
      <Route path="/appointment-tracker">
        {() => { setLocation(addPrefix('/appointment-tracker')); return null; }}
      </Route>
      <Route path="/social-media">
        {() => { setLocation(addPrefix('/social-media')); return null; }}
      </Route>
      <Route path="/social">
        {() => { setLocation(addPrefix('/social')); return null; }}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [pathname] = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  
  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!isAdminRoute && <Header />}
      <Router />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && (
        <>
          <WhatsAppButton />
          <AppointmentButton />
        </>
      )}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AdminProvider>
  );
}

export default App;
