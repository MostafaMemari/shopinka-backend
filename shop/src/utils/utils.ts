import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTimeFromText(text: string): string | null {
  const match = text.match(/(\d{2}:\d{2})/);
  return match ? match[1] : null;
}
