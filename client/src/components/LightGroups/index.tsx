import ExpandedLight from "@/components/ExpandedLight";
import PresetsCard from "@/components/PresetsCard";
import PresetsProvider from "@/components/wrappers/PresetsProvider";
import { LightContext } from "@/hooks/useActiveLight";
import { type Light } from "@server/types";
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
        <LightContext.Provider
          value={{
            activeLight,
            setActiveLight,
          }}
        >
          <Groups />
          <PresetsProvider>
            <ExpandedLight />
            <PresetsCard />
          </PresetsProvider>
        </LightContext.Provider>
      </div>
    </div>
  );
}
