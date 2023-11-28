import { PresetsContext } from "@/hooks/usePresets";
import { presets as presetData } from "@/lib/elysia";
import type { Preset } from "@server/types";
import { useState, type ReactNode } from "react";

export default function PresetsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [presets, setPresets] = useState<Preset[]>(presetData ?? []);

  return (
    <PresetsContext.Provider value={{ presets, setPresets }}>
      {children}
    </PresetsContext.Provider>
  );
}
