import { queryClient, url } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useLightState() {
  return useMutation({
    mutationFn: async ({ id, color }: { id: string; color: string }) => {
      // console.log({ color });
      const response = await fetch(`${url}/id:${id}/state`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ color }),
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
