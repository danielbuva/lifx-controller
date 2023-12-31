import type { HSLBK } from "@/lib/types";
import type { Group } from "@server/types";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

export const LifxStateContext = createContext<{
  lifxState: Group[];
  toggleSwitch: (toggleArgs: {
    type: "group" | "light";
    lightId: string;
    groupId: string;
  }) => Promise<void>;
  setHslbk: (setHslbkArgs: {
    hslbk: HSLBK;
    groupId: string;
    lightId: string;
    isColor: boolean;
  }) => Promise<void>;
  activeLightIndices: { groupI: number; lightI: number } | null;
  setActiveLightIndices: Dispatch<
    SetStateAction<{ groupI: number; lightI: number } | null>
  >;
} | null>(null);

export default function useLifxState() {
  const context = useContext(LifxStateContext);
  if (!context) {
    throw new Error(
      "LifxState.* component must be rendered as a child of Lifx provider component"
    );
  }
  return context;
}
