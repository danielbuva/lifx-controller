import type { LightsResult } from "@/lib/types";
import { url } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useLightsData() {
  return useQuery({
    queryKey: ["lightData"],
    queryFn: () =>
      fetch(url, {}).then((res) => res.json() as LightsResult),
  });
}
