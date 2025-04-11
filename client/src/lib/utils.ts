import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single string
 * @param inputs class values to combine
 * @returns merged class values
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Add the language prefix to a URL
 * @param url The URL to prefix
 * @returns The URL with the language prefix
 */
export function addPrefix(url: string, language: string): string {
  // If the URL already has a language prefix, return as is
  if (url.startsWith('/tr/') || url.startsWith('/en/') || 
      url.startsWith('/ru/') || url.startsWith('/ka/')) {
    return url;
  }
  
  // Remove leading slash if present
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  
  // Add language prefix
  return `/${language.toLowerCase()}/${cleanUrl}`;
}

/**
 * Remove the language prefix from a URL
 * @param url The URL with a language prefix
 * @returns The URL without the language prefix
 */
export function removePrefix(url: string): string {
  // If the URL has a language prefix, remove it
  if (url.match(/^\/(tr|en|ru|ka)\//)) {
    return url.replace(/^\/(tr|en|ru|ka)\//, '/');
  }
  
  return url;
}

/**
 * Format a date string using the specified locale
 * @param date The date to format
 * @param locale The locale to use for formatting
 * @returns The formatted date string
 */
export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  }).format(dateObj);
}