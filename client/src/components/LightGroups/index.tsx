import ExpandedLight from "@/components/ExpandedLight";
import PresetsCard from "@/components/PresetsCard";
import ActiveLightProvider from "@/components/wrappers/ActiveLightProvider";
import PresetsProvider from "@/components/wrappers/PresetsProvider";

import Groups from "./Groups";

export default function LightGroups() {
  return (
    <ActiveLightProvider>
      <Groups />
      <PresetsProvider>
        <ExpandedLight />
        <PresetsCard />
      </PresetsProvider>
    </ActiveLightProvider>
  );
}
