import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";
import type { Light } from "../lib/types";

export const LightContext = createContext<{
  activelight: Light | null;
  setActiveLight: Dispatch<SetStateAction<Light | null>>;
} | null>(null);

export default function useActiveLight() {
  const context = useContext(LightContext);
  if (!context) {
    throw new Error(
      "Light.* component must rendered as a child of LightList component"
    );
  }
  return context;
}
