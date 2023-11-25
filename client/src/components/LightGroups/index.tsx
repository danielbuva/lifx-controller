import ExpandedLight from "@/components/ExpandedLight";
import { LightContext } from "@/hooks/useActiveLight";
import { client } from "@/lib/elysia";
import type { Light } from "@server/types";
import { useState } from "react";

import Groups from "./Groups";

const { data } = await client.lights.get();

export default function LightGroups() {
  const [activeLight, setActiveLight] = useState<Light | null>(null);

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
