import { queryClient, url } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useToggle(prefix: "group" | "id") {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${url}/${prefix}:${id}/toggle`, {
        method: "POST",
        body: JSON.stringify({ duration: 0.5 }),
      });

      const responseBody = await response.json();

      if (!response.ok) throw responseBody;

      return responseBody;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["lightData"] });
    },
  }).mutate;
}
