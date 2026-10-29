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

function scrollToAnchor(hash) {
  let id = hash.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    return false;
  }
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;
  const header = document.querySelector("header");
  const offset = header?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" });
  return true;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      if (!(hash && scrollToAnchor(hash))) scrollToTop();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
