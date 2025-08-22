import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToLocalTime(isoString: string): string {
  const date = format(new Date(isoString), "EEEE, d MMMM yyyy HH:mm:ss", {
    locale: id,
  });

  return date;
}
