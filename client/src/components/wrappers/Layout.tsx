import useLifxState from "@/hooks/useLifxState";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { setActiveLightIndices } = useLifxState();
  return (
    <div
      className="min-h-screen w-screen flex-row flex justify-center items-center"
      onClick={() => setActiveLightIndices(null)}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
