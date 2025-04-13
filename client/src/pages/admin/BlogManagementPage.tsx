import { useAdmin } from "@/hooks/use-admin";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import BlogManagement from "@/components/admin/BlogManagement";

export default function BlogManagementPage() {
  const { user, isLoading } = useAdmin();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600">Blog yazılarınızı buradan yönetin</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <BlogManagement />
        </div>
      </div>
    </div>
  );
}