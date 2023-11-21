import { useEffect, useState } from "react";

export default function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const themeChangeHandler = (e: MediaQueryListEvent) =>
        setTheme(e.matches ? "dark" : "light");

      setTheme(mediaQuery.matches ? "dark" : "light");

      mediaQuery.addEventListener("change", themeChangeHandler);

      return () =>
        mediaQuery.removeEventListener("change", themeChangeHandler);
    }
  }, []);

  return theme;
}
