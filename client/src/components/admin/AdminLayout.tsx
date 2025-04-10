import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { ADMIN_PATHS } from "@/lib/constants";
import { 
  LayoutDashboard, 
  Scissors, 
  FileText, 
  Images, 
  Calendar, 
  Package, 
  MessageSquare,
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

type NavItemProps = {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
};

function NavItem({ href, label, icon, active }: NavItemProps) {
  return (
    <Link href={href}>
      <a className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? "bg-primary text-white" 
          : "text-gray-700 hover:bg-gray-100"
      }`}>
        {icon}
        <span className="ml-3">{label}</span>
      </a>
    </Link>
  );
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const isActive = (path: string) => location === path;
  const getInitials = (username: string) => username.substring(0, 2).toUpperCase();

  const navigation = [
    { href: ADMIN_PATHS.DASHBOARD, label: "Ana Panel", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: ADMIN_PATHS.SERVICES, label: "Hizmetler", icon: <Scissors className="w-5 h-5" /> },
    { href: ADMIN_PATHS.BLOG, label: "Blog", icon: <FileText className="w-5 h-5" /> },
    { href: ADMIN_PATHS.GALLERY, label: "Galeri", icon: <Images className="w-5 h-5" /> },
    { href: ADMIN_PATHS.APPOINTMENTS, label: "Randevular", icon: <Calendar className="w-5 h-5" /> },
    { href: ADMIN_PATHS.PACKAGES, label: "Paketler", icon: <Package className="w-5 h-5" /> },
    { href: ADMIN_PATHS.MESSAGES, label: "Mesajlar", icon: <MessageSquare className="w-5 h-5" /> },
    { href: ADMIN_PATHS.SETTINGS, label: "Ayarlar", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="px-4 py-5 border-b">
            <Link href={ADMIN_PATHS.DASHBOARD}>
              <a className="flex items-center">
                <span className="text-xl font-bold text-primary">MyHair Clinic</span>
              </a>
            </Link>
          </div>
          <div className="px-4 py-6 flex-grow">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavItem 
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive(item.href)}
                />
              ))}
            </nav>
          </div>
          <div className="px-4 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <span className="ml-3 text-sm font-medium text-gray-700">{user.username}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href={ADMIN_PATHS.DASHBOARD}>
            <a className="text-xl font-bold text-primary">MyHair Admin</a>
          </Link>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0">
              <div className="flex flex-col h-full">
                <div className="px-4 py-5 border-b flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">MyHair Clinic</span>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="px-4 py-6 flex-grow overflow-y-auto">
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <NavItem 
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        active={isActive(item.href)}
                      />
                    ))}
                  </nav>
                </div>
                <div className="px-4 py-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                      </Avatar>
                      <span className="ml-3 text-sm font-medium text-gray-700">{user.username}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={logout}>
                      <LogOut className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {title && (
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <Link href={ADMIN_PATHS.DASHBOARD}>
                    <a className="hover:text-primary">Admin</a>
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>{title}</span>
                </div>
              </div>
            )}

            {/* Page Content */}
            <div className="md:mt-0 mt-12">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}