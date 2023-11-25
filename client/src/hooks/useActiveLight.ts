import type { Light } from "@server/types";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export const LightContext = createContext<{
  activeLight: Light | null;
  setActiveLight: Dispatch<SetStateAction<Light | null>>;
  newHs: {
    hs: {
      hue: number;
      saturation: number;
    };
    from: string;
  } | null;
  setNewHs: Dispatch<
    SetStateAction<{
      hs: {
        hue: number;
        saturation: number;
      };
      from: string;
    } | null>
  >;
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
