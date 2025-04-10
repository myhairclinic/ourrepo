import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { ADMIN_PATHS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  CalendarDays, 
  LayoutDashboard, 
  ListChecks, 
  LogOut, 
  MessageSquare, 
  Package, 
  ShoppingBag,
  FileEdit
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { logout } = useAdmin();
  const [location] = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      href: ADMIN_PATHS.DASHBOARD,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Services",
      href: ADMIN_PATHS.SERVICES,
      icon: <ListChecks className="h-5 w-5" />,
    },
    {
      name: "Packages",
      href: ADMIN_PATHS.PACKAGES,
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: ADMIN_PATHS.PRODUCTS,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Blog",
      href: ADMIN_PATHS.BLOG,
      icon: <FileEdit className="h-5 w-5" />,
    },
    {
      name: "Gallery",
      href: ADMIN_PATHS.GALLERY,
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Appointments",
      href: ADMIN_PATHS.APPOINTMENTS,
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      name: "Messages",
      href: ADMIN_PATHS.MESSAGES,
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <h1 className="text-xl font-bold text-primary">MyHair Admin</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        location === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}