import Presets from "./Presets";

export default function PresetsCard() {
  return (
    <div className="shadow-theme rounded-md overflow-hidden bg-theme">
      <div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
        <h2 className="text-xl font-semibold text-white">presets</h2>
      </div>
      <Presets className="max-w-[990px] overflow-scroll" />
    </div>
  );
}
