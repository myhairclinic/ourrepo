import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { ADMIN_PATHS } from "@/lib/constants";

export default function AdminDashboard() {
  const { user } = useAdmin();
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    if (!user) {
      setLocation(ADMIN_PATHS.LOGIN);
    }
  }, [user, setLocation]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
          <p className="text-neutral-600">Welcome back, {user.username}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Services"
            description="Manage hair transplant and other services"
            icon="fa-user-md"
            link={ADMIN_PATHS.SERVICES}
          />
          
          <DashboardCard 
            title="Blog"
            description="Create and edit blog posts"
            icon="fa-newspaper"
            link={ADMIN_PATHS.BLOG}
          />
          
          <DashboardCard 
            title="Gallery"
            description="Manage before/after images and videos"
            icon="fa-images"
            link={ADMIN_PATHS.GALLERY}
          />
          
          <DashboardCard 
            title="Appointments"
            description="View and manage appointment requests"
            icon="fa-calendar-alt"
            link={ADMIN_PATHS.APPOINTMENTS}
          />
          
          <DashboardCard 
            title="Products"
            description="Manage hair care products"
            icon="fa-shopping-bag"
            link={ADMIN_PATHS.PRODUCTS}
          />
          
          <DashboardCard 
            title="Packages"
            description="Manage international packages"
            icon="fa-box-open"
            link={ADMIN_PATHS.PACKAGES}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, icon, link }: { title: string, description: string, icon: string, link: string }) {
  return (
    <Link href={link}>
      <a className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-neutral-600">{description}</p>
      </a>
    </Link>
  );
}