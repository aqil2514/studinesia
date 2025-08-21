import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";
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

export function formatToLocalTime(isoString: string): string {
  const date = format(new Date(isoString), "EEEE, d MMMM yyyy HH:mm:ss", {
    locale: id,
  });

  return date;
}

export function combineDateTime(date: Date, time: string): Date {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, seconds || 0);
  return combined;
}
