import { createContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ADMIN_PATHS } from "@/lib/constants";

interface AdminContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  error: Error | null;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<Error | null>(null);
  
  const { 
    data: user = null,
    isLoading,
    error: fetchError,
  } = useQuery<User | null>({
    queryKey: ["/api/user"],
    retry: false,
  });
  
  useEffect(() => {
    if (fetchError) {
      setError(fetchError as Error);
    }
  }, [fetchError]);
  
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/login", credentials);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }
      return await response.json();
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["/api/user"], data);
      setError(null);
      setLocation(ADMIN_PATHS.DASHBOARD);
    },
    onError: (error: Error) => {
      setError(error);
    },
  });
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      setLocation(ADMIN_PATHS.LOGIN);
    },
    onError: (error: Error) => {
      setError(error);
    },
  });
  
  const login = async (username: string, password: string) => {
    return loginMutation.mutateAsync({ username, password });
  };
  
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };
  
  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}