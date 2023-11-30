import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

// strict mode off because initial app state comes from lifx.
// when dispatching power off/on the second initialization of state
// is different from the first so switch states visually can't toggle.

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
