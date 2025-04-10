import { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminRegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurunuz");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await apiRequest("POST", "/api/register", {
        username,
        password,
        role: "admin"
      });
      
      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Yönetici hesabı oluşturuldu. Giriş yapabilirsiniz.",
          variant: "default",
        });
        setLocation("/admin/login");
      }
    } catch (err: any) {
      setError(err.message || "Kayıt işlemi başarısız oldu");
      toast({
        title: "Hata",
        description: err.message || "Kayıt işlemi başarısız oldu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">MyHair Clinic</h1>
          <p className="text-neutral-600 mt-2">İlk Yönetici Hesabı Oluşturma</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-neutral-700 mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Kullanıcı adınız"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-neutral-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Şifreniz"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-neutral-700 mb-2">
              Şifre (Tekrar)
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Şifrenizi tekrar girin"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Kaydediliyor..." : "Yönetici Hesabı Oluştur"}
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setLocation("/admin/login")}
              disabled={isLoading}
            >
              Zaten bir hesabınız var mı? Giriş yapın
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}