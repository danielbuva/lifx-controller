import ExpandedLight from "@/components/ExpandedLight";
import { useLightsData } from "@/hooks/get";
import { LightContext } from "@/hooks/useActiveLight";
import type { Light } from "@/lib/types";
import { useState } from "react";

import Groups from "./Groups";

export default function LightGroups() {
  const [activelight, setActiveLight] = useState<Light | null>(null);
  const { data } = useLightsData();

  if (!data) return null;

  return (
    <LightContext.Provider value={{ activelight, setActiveLight }}>
      <Groups iniitalItems={data} />
      <ExpandedLight />
    </LightContext.Provider>
  );
}
