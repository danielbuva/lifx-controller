import type { HSLBK } from "@/lib/types";
import type { Group } from "@server/types";
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
  }) => Promise<void>;
} | null>(null);

export default function useLifxState() {
  const context = useContext(LifxStateContext);
  if (!context) {
    throw new Error(
      "LifxState.* component must rendered as a child of Lifx provider component"
    );
  }
  return context;
}
