import ExpandedLight from "@/components/ExpandedLight";
import Presets from "@/components/Presets";
import { LightContext } from "@/hooks/useActiveLight";
import type { Light } from "@server/types";
import { useState } from "react";

import Groups from "./Groups";

export default function LightGroups() {
  const [activeLight, setActiveLight] = useState<Light | null>(null);

  return (
    <div
      className="min-h-screen w-screen flex-row flex justify-center items-center"
      onClick={() => setActiveLight(null)}
    >
      <div className="flex flex-col gap-4">
        <LightContext.Provider value={{ activeLight, setActiveLight }}>
          <Groups />
          <ExpandedLight />
        </LightContext.Provider>
        <Presets />
      </div>
    </div>
  );
}
