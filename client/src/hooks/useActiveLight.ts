import type { Light } from "@server/types";

import useLifxState from "./useLifxState";

export default function useActiveLight() {
  const { activeLightIndices, lifxState } = useLifxState();
  if (!activeLightIndices) return null;
  const activeLight: Light | null =
    lifxState[activeLightIndices.groupI]?.lights[
      activeLightIndices.lightI
    ] ?? null;

  return activeLight;
}
