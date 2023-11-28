import ExpandedLight from "@/components/ExpandedLight";
import PresetsCard from "@/components/PresetsCard";
import LifxStateProvider from "@/components/wrappers/LifxStateProvider";
import PresetsProvider from "@/components/wrappers/PresetsProvider";

import Groups from "./Groups";

export default function LifxRemote() {
  return (
    <LifxStateProvider>
      <Groups />
      <PresetsProvider>
        <ExpandedLight />
        <PresetsCard />
      </PresetsProvider>
    </LifxStateProvider>
  );
}
