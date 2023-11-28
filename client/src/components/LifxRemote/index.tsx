import ExpandedLight from "@/components/ExpandedLight";
import PresetsCard from "@/components/PresetsCard";
import Layout from "@/components/wrappers/Layout";
import PresetsProvider from "@/components/wrappers/PresetsProvider";

import Groups from "./Groups";

export default function LifxRemote() {
  return (
    <Layout>
      <Groups />
      <PresetsProvider>
        <ExpandedLight />
        <PresetsCard />
      </PresetsProvider>
    </Layout>
  );
}
