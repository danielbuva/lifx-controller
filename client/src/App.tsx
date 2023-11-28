import LifxRemote from "./components/LifxRemote";
import LifxStateProvider from "./components/wrappers/LifxStateProvider";

export default function App() {
  return (
    <LifxStateProvider>
      <LifxRemote />
    </LifxStateProvider>
  );
}
