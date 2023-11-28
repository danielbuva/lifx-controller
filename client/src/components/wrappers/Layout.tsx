import type { ReactNode } from "react";

export default function Layout({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="min-h-screen w-screen flex-row flex justify-center items-center"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
