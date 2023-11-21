import { useState } from "react";

import type { Light } from "../../lib/types";

import { LightContext } from "../../hooks/useActiveLight";
import { useLightsData } from "../../hooks/get";

import ExpandedLight from "../ExpandedLight";
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
