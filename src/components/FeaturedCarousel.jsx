import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ProductCard from "./ProductCard.jsx";

/** Repeticiones mínimas del listado solo en DOM (sin tocar products.js). */
const MIN_LOOP_COPIES = 8;
const MAX_LOOP_COPIES = 16;
/** Recorrido mínimo (px) para activar autoplay y bucle. */
const MIN_SCROLL_FOR_MOTION = 40;

const CARD_SLOT_CLASS =
  "shrink-0 w-[min(88vw,20rem)] sm:w-[17.5rem] lg:w-[18.5rem]";

/**
 * Carrusel horizontal con bucle infinito (copias duplicadas solo en UI).
 * Autoplay, arrastre con puntero y scroll nativo horizontal; sin dependencias extra.
 * @param {{
 *   products: import("../data/products.js").products
 *   onOpenDetail?: (p: import("../data/products.js").products[number]) => void
 * }} props
 */
export default function FeaturedCarousel({ products, onOpenDetail }) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const segmentWRef = useRef(0);
  const loopCopiesRef = useRef(MIN_LOOP_COPIES);
  const pauseRef = useRef(false);
  const dragRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const nudgeLockRef = useRef(false);

  const [loopCopies, setLoopCopies] = useState(MIN_LOOP_COPIES);
  const [cardWidthPx, setCardWidthPx] = useState(null);

  const productIdsKey = useMemo(
    () => products.map((p) => p.id).join("|"),
    [products],
  );

  const loopProducts = useMemo(
    () => Array.from({ length: loopCopies }, () => products).flat(),
    [products, loopCopies],
  );

  useEffect(() => {
    loopCopiesRef.current = loopCopies;
  }, [loopCopies]);

  useEffect(() => {
    loopCopiesRef.current = MIN_LOOP_COPIES;
    setLoopCopies(MIN_LOOP_COPIES);
  }, [productIdsKey]);

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

  const getMaxScroll = useCallback((el) => {
    if (!el) return 0;
    return Math.max(0, el.scrollWidth - el.clientWidth);
  }, []);

  const measureSegment = useCallback(() => {
    const inner = innerRef.current;
    const copies = loopCopiesRef.current;
    if (!inner || copies <= 0) {
      segmentWRef.current = 0;
      return 0;
    }
    const w = inner.scrollWidth / copies;
    segmentWRef.current = w > 0 ? w : 0;
    return segmentWRef.current;
  }, []);

  const centerScroll = useCallback(() => {
    const el = scrollerRef.current;
    const seg = segmentWRef.current;
    if (!el || seg <= 0) return;
    const maxL = getMaxScroll(el);
    if (maxL <= 0) return;
    const copies = loopCopiesRef.current;
    const mid = Math.floor(copies / 2);
    el.scrollLeft = Math.min(mid * seg, maxL);
  }, [getMaxScroll]);

  const normalizeScroll = useCallback(() => {
    const el = scrollerRef.current;
    const seg = segmentWRef.current;
    if (!el || seg <= 0 || nudgeLockRef.current) return;
    const maxL = getMaxScroll(el);
    if (maxL <= 0) return;
    const buf = Math.min(72, Math.max(12, maxL * 0.1), seg * 0.12);

    if (el.scrollLeft <= buf) {
      nudgeLockRef.current = true;
      el.scrollLeft = Math.min(maxL, el.scrollLeft + seg);
      nudgeLockRef.current = false;
      return;
    }
    if (el.scrollLeft >= maxL - buf) {
      nudgeLockRef.current = true;
      el.scrollLeft = Math.max(0, el.scrollLeft - seg);
      nudgeLockRef.current = false;
    }
  }, [getMaxScroll]);

  const updateCardWidth = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cw = scroller.clientWidth;
    if (cw >= 1280) {
      const gap = 16;
      const raw = (cw - 3 * gap) / 4;
      setCardWidthPx(Math.min(272, Math.max(208, Math.floor(raw))));
    } else {
      setCardWidthPx(null);
    }
  }, []);

  const ensureOverflow = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || products.length === 0) return;
    const maxL = getMaxScroll(el);
    if (maxL >= MIN_SCROLL_FOR_MOTION) return;
    if (loopCopiesRef.current >= MAX_LOOP_COPIES) return;
    const next = Math.min(MAX_LOOP_COPIES, loopCopiesRef.current + 2);
    loopCopiesRef.current = next;
    setLoopCopies(next);
  }, [getMaxScroll, products.length]);

  const syncLayout = useCallback(() => {
    updateCardWidth();
    measureSegment();
    ensureOverflow();
    centerScroll();
    normalizeScroll();
  }, [
    updateCardWidth,
    measureSegment,
    ensureOverflow,
    centerScroll,
    normalizeScroll,
  ]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    syncLayout();
    requestAnimationFrame(() => {
      syncLayout();
    });
  }, [
    syncLayout,
    productIdsKey,
    loopProducts.length,
    cardWidthPx,
    reduceMotion,
  ]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const inner = innerRef.current;
    const scroller = scrollerRef.current;
    if (!inner || !scroller || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      updateCardWidth();
      measureSegment();
      ensureOverflow();
      requestAnimationFrame(() => {
        measureSegment();
        centerScroll();
        normalizeScroll();
      });
    });
    ro.observe(inner);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [
    updateCardWidth,
    measureSegment,
    ensureOverflow,
    centerScroll,
    normalizeScroll,
    reduceMotion,
    productIdsKey,
    loopCopies,
  ]);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const el = scrollerRef.current;
      if (el && !pauseRef.current) {
        const maxL = getMaxScroll(el);
        if (maxL >= MIN_SCROLL_FOR_MOTION) {
          el.scrollLeft += 0.45;
          normalizeScroll();
        } else {
          ensureOverflow();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [
    reduceMotion,
    productIdsKey,
    normalizeScroll,
    getMaxScroll,
    ensureOverflow,
    loopCopies,
  ]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const cardSlotStyle = cardWidthPx ? { width: cardWidthPx } : undefined;

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    /** Táctil: scroll horizontal nativo + onScroll; evitar captura que compite con scroll vertical. */
    if (e.pointerType === "touch") {
      pause();
      return;
    }
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

  const onScroll = () => {
    normalizeScroll();
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
            className={CARD_SLOT_CLASS}
          >
            <ProductCard
              product={product}
              cardMotion="carousel"
              onOpenDetail={onOpenDetail}
              openOnCardClick={false}
              showWhatsAppButton={false}
            />
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div
          ref={innerRef}
          className="flex w-max gap-4 md:gap-5 xl:gap-4"
        >
          {loopProducts.map((product, index) => (
            <div
              key={`${product.id}-loop-${index}`}
              className={CARD_SLOT_CLASS}
              style={cardSlotStyle}
            >
              <ProductCard
                product={product}
                cardMotion="carousel"
                onOpenDetail={onOpenDetail}
                openOnCardClick={false}
                showWhatsAppButton={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
