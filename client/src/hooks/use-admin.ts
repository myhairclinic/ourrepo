import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

// Admin hook'u
export function useAdmin() {
  const context = useContext(AdminContext);
  
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  
  return context;
}