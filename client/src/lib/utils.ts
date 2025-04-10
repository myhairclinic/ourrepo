import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date) {
  if (!dateString) return '';
  
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, 'dd.MM.yyyy HH:mm');
}
