import type { Dispatch, SetStateAction } from "react";

export default function ColorOrWhite({
  setIsColor,
}: {
  setIsColor: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="w-44 h-9 flex justify-between">
      <button
        className="flex items-center"
        onClick={() => setIsColor(true)}
      >
        color
      </button>
      <button
        className="flex items-center"
        onClick={() => setIsColor(false)}
      >
        white
      </button>
    </div>
  );
}
