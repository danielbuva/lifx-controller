import { ActiveLightContext } from "@/hooks/useActiveLight";
import { type Light } from "@server/types";
import type { ReactNode } from "react";
import { useState } from "react";

import Layout from "./Layout";

export default function ActiveLightProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeLight, setActiveLight] = useState<Light | null>(null);

  return (
    <Layout onClick={() => setActiveLight(null)}>
      <ActiveLightContext.Provider
        value={{
          activeLight,
          setActiveLight,
        }}
      >
        {children}
      </ActiveLightContext.Provider>
    </Layout>
  );
}
