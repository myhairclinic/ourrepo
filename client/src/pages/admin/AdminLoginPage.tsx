import { useState } from "react";
import { useAdmin } from "../../hooks/use-admin";
import { useLocation } from "wouter";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdmin();
  const [, setLocation] = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Lütfen kullanıcı adı ve şifre giriniz");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await login(username, password);
      setLocation("/admin/dashboard");
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">MyHair Clinic</h1>
          <p className="text-neutral-600 mt-2">Admin Panel</p>
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
          
          <div className="mb-6">
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
          
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setLocation("/admin/register")}
              disabled={isLoading}
            >
              Henüz hesabınız yok mu? Yeni hesap oluşturun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}