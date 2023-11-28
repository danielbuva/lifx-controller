import LightGroups from "./components/LightGroups";
import LifxStateProvider from "./components/wrappers/LifxStateProvider";

export default function App() {
  return (
    <LifxStateProvider>
      <LightGroups />
    </LifxStateProvider>
  );
}
