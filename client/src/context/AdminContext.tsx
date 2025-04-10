import { createContext, ReactNode, useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

// Admin kullanıcı tipi
type AdminUser = {
  id: number;
  username: string;
  role: string;
};

// Admin context için tip
type AdminContextType = {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Admin context oluşturma
export const AdminContext = createContext<AdminContextType | null>(null);

// Admin Provider bileşeni
export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Admin kullanıcı bilgilerini kontrol et
    const checkUser = async () => {
      try {
        const response = await apiRequest("GET", "/api/admin/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Giriş fonksiyonu
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/admin/login", { username, password });
      
      if (!response.ok) {
        throw new Error("Giriş yapılamadı");
      }
      
      const userData = await response.json();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await apiRequest("POST", "/api/admin/logout");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}