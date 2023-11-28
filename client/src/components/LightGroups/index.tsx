import ExpandedLight from "@/components/ExpandedLight";
import PresetsCard from "@/components/PresetsCard";
import { LightContext } from "@/hooks/useActiveLight";
import { presets as presetData } from "@/lib/elysia";
import type { Preset } from "@server/types";
import { type Light } from "@server/types";
import { useState } from "react";

import Groups from "./Groups";

export default function LightGroups() {
  const [activeLight, setActiveLight] = useState<Light | null>(null);
  const [presets, setPresets] = useState<Preset[] | null>(presetData);

  return (
    <div
      className="min-h-screen w-screen flex-row flex justify-center items-center"
      onClick={() => setActiveLight(null)}
    >
      <div className="flex flex-col gap-4">
        <LightContext.Provider
          value={{
            activeLight,
            setActiveLight,
            presets,
            setPresets,
          }}
        >
          <Groups />
          <ExpandedLight />
          <PresetsCard />
        </LightContext.Provider>
      </div>
    </div>
  );
}
