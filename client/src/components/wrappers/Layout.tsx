import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-screen flex-row flex justify-center items-center">
      {children}
    </div>
  );
}
