import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let csrfToken: string | null = null;

export const getCSRFToken = (): string | null => csrfToken;

export const setCSRFToken = (token: string) => {
  csrfToken = token;
};
