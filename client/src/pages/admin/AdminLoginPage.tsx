import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/use-admin";

// Login form schema
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, isLoading } = useAdmin();
  
  // Redirect if already logged in
  if (!isLoading && user) {
    setLocation("/admin/dashboard");
    return null;
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });
  
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await apiRequest("POST", "/api/login", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
        variant: "default",
      });
      setLocation("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="username">
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              className={`w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-1" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              className={`w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-neutral-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}