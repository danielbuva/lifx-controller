import { useQuery } from "@tanstack/react-query";
import { url } from "../lib/utils";
import type { LightsResult } from "../lib/types";

export function useLightsData() {
  return useQuery({
    queryKey: ["lightData"],
    queryFn: () =>
      fetch(url, {}).then((res) => res.json() as LightsResult),
  });
}
