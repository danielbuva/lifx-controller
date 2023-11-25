import { presets } from "@/lib/elysia";

import Preset from "./Preset";

export default function Presets() {
  if (!presets || presets.length === 0) return null;

  return (
    <div className="w-full shadow-theme rounded-md overflow-hidden bg-theme">
      <div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
        <h2 className="text-xl font-semibold text-white">presets</h2>
      </div>
      <div className="h-44 bg-theme w-full rounded-bl-md rounded-br-md p-2">
        {presets.map((preset) => (
          <Preset key={preset.id} {...preset} />
        ))}
      </div>
    </div>
  );
}
