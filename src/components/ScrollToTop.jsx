import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function scrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch {
    window.scrollTo(0, 0);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      scrollToTop();
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return null;
}
