import { QueryClient } from "@tanstack/react-query";

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const queryClient = new QueryClient();
export const url = "http://localhost:3000/lights";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
