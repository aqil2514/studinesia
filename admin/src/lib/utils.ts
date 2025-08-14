import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

export function calculateReadingTime(content: string, wpm = 225): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}
