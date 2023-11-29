import GithubSVG from "@/components/svgs/GithubSVG";
import useLifxState from "@/hooks/useLifxState";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { setActiveLightIndices } = useLifxState();
  return (
    <div
      className="min-h-screen w-screen flex-col flex justify-start"
      onClick={() => setActiveLightIndices(null)}
    >
      <Header />
      <div className="flex flex-col gap-4 items-center">{children}</div>
    </div>
  );
}

function Header() {
  return (
    <div className="p-6 w-full mb-14 flex justify-between ">
      <p className="relative w-full text-xl">
        lifx remote
        <span className="text-sm absolute left-[100px] top-[-12px]">
          &nbsp;&nbsp;&nbsp;{"__A__"} <br />
          {`( ~ o'_'o)~---<>  ⁂` /**  pew pew pew */}
        </span>
      </p>
      <a
        href="https://github.com/danielbuva/lifx-controller"
        target="_blank"
      >
        <GithubSVG className="cursor-pointer" />
      </a>
    </div>
  );
}
