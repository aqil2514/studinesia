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

export function isoToIndoTime(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function combineDateTime(date: Date, time: string): Date {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, seconds || 0);
  return combined;
}
