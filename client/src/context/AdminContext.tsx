import { createContext, ReactNode, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface AdminContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const { toast } = useToast();
  
  // Fetch current admin user if logged in
  const { data: user, error, isLoading } = useQuery<User | null, Error>({
    queryKey: ["/api/admin/user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/admin/user");
        if (res.status === 401) return null;
        if (!res.ok) throw new Error("Failed to fetch admin user");
        return await res.json();
      } catch (err) {
        console.error("Error fetching admin user:", err);
        return null;
      }
    },
    retry: false,
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/admin/login", credentials);
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Login failed");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/admin/user"], data);
      toast({
        title: "Login successful",
        description: "Welcome to admin panel",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/logout");
      if (!res.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/user"], null);
      toast({
        title: "Logout successful",
        description: "You have been logged out",
      });
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Login function
  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };
  
  // Logout function
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };
  
  return (
    <AdminContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};