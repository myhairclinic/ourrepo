import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

interface AdminUser {
  id: number;
  username: string;
  role: string;
}

interface AdminContextType {
  user: AdminUser | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Fetch current admin user (if authenticated)
  const { data, isLoading } = useQuery<AdminUser | null>({
    queryKey: ["/api/user"],
    // This will be automatically handled by the query client
    // to return null when unauthorized
  });
  
  const user = data || null;
  
  useEffect(() => {
    // Check if user is admin when data changes
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  
  return (
    <AdminContext.Provider value={{ user, isAdmin, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};