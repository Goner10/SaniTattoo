import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
