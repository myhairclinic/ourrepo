import { useContext } from "react";
import { AdminContext, AdminContextType } from "../context/AdminContext";

export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}