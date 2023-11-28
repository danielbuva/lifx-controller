import type { Light } from "@server/types";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export const ActiveLightContext = createContext<{
  activeLight: Light | null;
  setActiveLight: Dispatch<SetStateAction<Light | null>>;
} | null>(null);

export default function useActiveLight() {
  const context = useContext(ActiveLightContext);
  if (!context) {
    throw new Error(
      "Light.* component must rendered as a child of LightList component"
    );
  }
  return context;
}
