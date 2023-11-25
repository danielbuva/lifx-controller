import ExpandedLight from "@/components/ExpandedLight";
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
      <LightContext.Provider value={{ activeLight, setActiveLight }}>
        <Groups />
        <ExpandedLight />
      </LightContext.Provider>
    </div>
  );
}
