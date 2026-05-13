import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./ProductCard.jsx";

const MAX_SEGMENTS = 30;

/**
 * Carrusel horizontal con bucle visual (copias solo en el componente).
 * Autoplay vía scrollLeft + arrastre (pointer) y swipe (overflow-x).
 * @param {{ products: import("../data/products.js").products }} props
 */
export default function FeaturedCarousel({ products }) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const setWidthRef = useRef(0);
  const pauseRef = useRef(false);
  const dragRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [segmentCount, setSegmentCount] = useState(2);

  const productIdsKey = useMemo(
    () => products.map((p) => p.id).join("|"),
    [products],
  );

  const loop = useMemo(
    () => Array.from({ length: segmentCount }, () => products).flat(),
    [products, segmentCount],
  );

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      pauseRef.current = false;
      resumeTimerRef.current = null;
    }, 900);
  }, [clearResumeTimer]);

  const pause = useCallback(() => {
    clearResumeTimer();
    pauseRef.current = true;
  }, [clearResumeTimer]);

  const measure = useCallback(() => {
    const inner = innerRef.current;
    if (!inner || segmentCount < 1) return;
    const w = inner.scrollWidth / segmentCount;
    setWidthRef.current = w > 0 ? w : 0;
  }, [segmentCount]);

  const tryGrowTrack = useCallback(() => {
    if (reduceMotion) return;
    const scroller = scrollerRef.current;
    const inner = innerRef.current;
    if (!scroller || !inner || products.length === 0) return;
    const innerW = inner.scrollWidth;
    const viewW = scroller.clientWidth;
    if (innerW <= 0 || viewW <= 0) return;

    if (innerW <= viewW + 48) {
      setSegmentCount((n) => {
        const segW = innerW / Math.max(1, n);
        const target = Math.ceil((viewW + 120) / Math.max(1, segW)) + 1;
        return Math.min(MAX_SEGMENTS, Math.max(n + 1, target));
      });
    }
  }, [products.length, reduceMotion]);

  useLayoutEffect(() => {
    measure();
  }, [measure, loop.length]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const scroller = scrollerRef.current;
    const inner = innerRef.current;
    if (!scroller || !inner || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      measure();
      tryGrowTrack();
    });
    ro.observe(inner);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [measure, tryGrowTrack, reduceMotion, segmentCount, productIdsKey]);

  const normalizeScroll = useCallback(() => {
    const el = scrollerRef.current;
    const w = setWidthRef.current;
    if (!el || w <= 0) return;
    let guard = 0;
    while (el.scrollLeft >= w - 0.5 && guard < 12) {
      el.scrollLeft -= w;
      guard += 1;
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const el = scrollerRef.current;
      const w = setWidthRef.current;
      if (el && w > 0 && !pauseRef.current) {
        el.scrollLeft += 0.45;
        if (el.scrollLeft >= w - 0.5) {
          el.scrollLeft -= w;
        }
      }
      if (!cancelled) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, productIdsKey, segmentCount]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.target;
    if (target instanceof Element && target.closest("a, button")) return;

    const el = scrollerRef.current;
    if (!el) return;

    pause();
    el.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      originX: e.clientX,
      originScroll: el.scrollLeft,
    };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    const el = scrollerRef.current;
    if (!d?.active || e.pointerId !== d.pointerId || !el) return;

    el.scrollLeft = d.originScroll - (e.clientX - d.originX);
    normalizeScroll();
  };

  const endPointerDrag = (e) => {
    const d = dragRef.current;
    const el = scrollerRef.current;
    if (!d?.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    dragRef.current = null;
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* ya liberado */
    }
    normalizeScroll();
    scheduleResume();
  };

  const onTouchStart = () => {
    pause();
  };

  const onTouchEnd = () => {
    normalizeScroll();
    scheduleResume();
  };

  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    pause();
    scheduleResume();
  };

  if (!products.length) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-white px-4 py-10 text-center text-sm text-brand-muted">
        No hay productos destacados por ahora.
      </p>
    );
  }

  if (reduceMotion) {
    return (
      <div
        className="featured-marquee-scroll featured-scroller -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-6 sm:px-6"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Productos destacados"
        tabIndex={0}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[min(88vw,20rem)] shrink-0 snap-center sm:w-[17.5rem]"
          >
            <ProductCard product={product} cardMotion="carousel" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="featured-marquee-root relative -mx-4 w-full min-w-0 max-w-[100vw] overflow-x-hidden sm:-mx-6"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Productos destacados. Puedes arrastrar o deslizar. El movimiento se pausa al interactuar o al pasar el cursor."
      onMouseEnter={pause}
      onMouseLeave={() => {
        if (!dragRef.current?.active) scheduleResume();
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-bg to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-bg to-transparent sm:w-14"
        aria-hidden
      />

      <div
        ref={scrollerRef}
        className="featured-scroller cursor-grab select-none overflow-x-auto overscroll-x-contain px-4 active:cursor-grabbing sm:px-6"
        style={{ touchAction: "pan-x" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div ref={innerRef} className="flex w-max gap-4 md:gap-6">
          {loop.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="w-[min(88vw,20rem)] shrink-0 sm:w-[17.5rem] lg:w-[18.5rem]"
            >
              <ProductCard product={product} cardMotion="carousel" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
