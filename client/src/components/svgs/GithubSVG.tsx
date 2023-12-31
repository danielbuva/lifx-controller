import type { SVGProps } from "react";
export default function GithubSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <path
        style={{ fill: "rgb(var(--foreground-rgb))" }}
        // fill="#000"
        fillRule="evenodd"
        d="M16 2.667C8.633 2.667 2.666 8.633 2.666 16c0 5.9 3.817 10.883 9.117 12.65.667.117.917-.283.917-.633 0-.317-.017-1.367-.017-2.484-3.35.617-4.216-.816-4.483-1.566-.15-.384-.8-1.567-1.367-1.884-.466-.25-1.133-.866-.017-.883 1.05-.017 1.8.967 2.05 1.367 1.2 2.016 3.117 1.45 3.884 1.1.117-.867.466-1.45.85-1.784-2.967-.333-6.067-1.483-6.067-6.583 0-1.45.517-2.65 1.367-3.583-.133-.334-.6-1.7.133-3.534 0 0 1.117-.35 3.667 1.367 1.067-.3 2.2-.45 3.333-.45s2.267.15 3.333.45c2.55-1.733 3.667-1.367 3.667-1.367.733 1.834.267 3.2.133 3.534.85.933 1.367 2.116 1.367 3.583 0 5.117-3.117 6.25-6.083 6.583.483.417.9 1.217.9 2.467 0 1.783-.017 3.217-.017 3.667 0 .35.25.766.917.633A13.354 13.354 0 0 0 29.333 16c0-7.367-5.966-13.333-13.333-13.333Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
