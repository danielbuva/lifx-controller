import ExpandedLight from "@/components/ExpandedLight";
import { useLightsData } from "@/hooks/get";
import { LightContext } from "@/hooks/useActiveLight";
import type { Light } from "@/lib/types";
import { useState } from "react";

import Groups from "./Groups";

export default function LightGroups() {
  const [activeLight, setActiveLight] = useState<Light | null>(null);
  const { data } = useLightsData();

  if (!data) return null;

  return (
    <div
      className="min-h-screen w-screen flex-row flex justify-center items-center"
      onClick={() => setActiveLight(null)}
    >
      <LightContext.Provider value={{ activeLight, setActiveLight }}>
        <Groups iniitalItems={data} />
        <ExpandedLight />
      </LightContext.Provider>
    </div>
  );
}
