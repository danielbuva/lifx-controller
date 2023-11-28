import type { Preset } from "@server/types";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export const PresetsContext = createContext<{
  presets: Preset[];
  setPresets: Dispatch<SetStateAction<Preset[]>>;
} | null>(null);

export default function usePresets() {
  const context = useContext(PresetsContext);
  if (!context) {
    throw new Error(
      "usePresets hook must be rendered as a child of Presets provider component"
    );
  }
  return context;
}
