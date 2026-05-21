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

const MIN_LOOP_COPIES = 8;
const MAX_LOOP_COPIES = 24;
/** px por frame (~60fps); un poco más rápido que 0.45, sin exceso. */
const AUTOPLAY_DELTA = 0.58;
const GAP_PX = 16;
const FALLBACK_CARD_W = 296;

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
  const virtualXRef = useRef(0);
  const useTransformRef = useRef(false);
  const pauseRef = useRef(false);
  const dragRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const nudgeLockRef = useRef(false);
  /** Evita que mouseenter sintético (iOS) deje el autoplay pausado tras un toque. */
  const suppressHoverPauseRef = useRef(false);

  const [loopCopies, setLoopCopies] = useState(MIN_LOOP_COPIES);
  const [cardWidthPx, setCardWidthPx] = useState(null);

  const productCount = products.length;

  const productIdsKey = useMemo(
    () => products.map((p) => p.id).join("|"),
    [products],
  );

  const loopProducts = useMemo(
    () => Array.from({ length: loopCopies }, () => products).flat(),
    [products, loopCopies],
  );

  const estimatedSlotW = cardWidthPx ?? FALLBACK_CARD_W;

  const estimatedSegmentW = useMemo(() => {
    if (productCount === 0) return 0;
    return productCount * estimatedSlotW + (productCount - 1) * GAP_PX;
  }, [productCount, estimatedSlotW]);

  const innerMinWidthPx = estimatedSegmentW * loopCopies;

  useEffect(() => {
    loopCopiesRef.current = loopCopies;
  }, [loopCopies]);

  useEffect(() => {
    loopCopiesRef.current = MIN_LOOP_COPIES;
    virtualXRef.current = 0;
    useTransformRef.current = false;
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

  const clearTransform = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = "";
    useTransformRef.current = false;
  }, []);

  const measureSegment = useCallback(() => {
    const inner = innerRef.current;
    const n = productCount;
    if (!inner || n <= 0) {
      segmentWRef.current = 0;
      return 0;
    }

    const first = inner.children[0];
    const last = inner.children[n - 1];
    if (first instanceof HTMLElement && last instanceof HTMLElement) {
      const seg =
        last.offsetLeft + last.offsetWidth - first.offsetLeft + GAP_PX;
      if (seg > 0) {
        segmentWRef.current = seg;
        return seg;
      }
    }

    const copies = loopCopiesRef.current;
    const w = copies > 0 ? inner.scrollWidth / copies : 0;
    segmentWRef.current = w > 0 ? w : estimatedSegmentW;
    return segmentWRef.current;
  }, [productCount, estimatedSegmentW]);

  const getRequiredCopies = useCallback(
    (clientWidth, segmentW) => {
      if (!clientWidth || !segmentW || productCount === 0) return MIN_LOOP_COPIES;
      const targetScroll = clientWidth * 2.5;
      const needed = Math.ceil(targetScroll / segmentW);
      return Math.min(
        MAX_LOOP_COPIES,
        Math.max(MIN_LOOP_COPIES, needed),
      );
    },
    [productCount],
  );

  const centerScroll = useCallback(() => {
    const el = scrollerRef.current;
    const seg = segmentWRef.current;
    if (!el || seg <= 0) return;
    clearTransform();
    const maxL = getMaxScroll(el);
    if (maxL <= 0) return;
    const copies = loopCopiesRef.current;
    const mid = Math.floor(copies / 2);
    el.scrollLeft = Math.min(mid * seg, maxL);
    virtualXRef.current = 0;
  }, [getMaxScroll, clearTransform]);

  const normalizeScroll = useCallback(() => {
    const el = scrollerRef.current;
    const seg = segmentWRef.current;
    if (!el || seg <= 0 || nudgeLockRef.current) return;

    if (useTransformRef.current) {
      if (virtualXRef.current >= seg) virtualXRef.current -= seg;
      if (virtualXRef.current < 0) virtualXRef.current += seg;
      const inner = innerRef.current;
      if (inner) {
        inner.style.transform = `translate3d(-${virtualXRef.current}px,0,0)`;
      }
      return;
    }

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
      const raw = (cw - 3 * GAP_PX) / 4;
      setCardWidthPx(Math.min(272, Math.max(208, Math.floor(raw))));
    } else {
      setCardWidthPx(null);
    }
  }, []);

  const ensureOverflow = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || productCount === 0) return false;

    const seg = measureSegment() || estimatedSegmentW;
    if (seg <= 0) return false;

    const maxL = getMaxScroll(el);
    const required = getRequiredCopies(el.clientWidth, seg);

    if (maxL < 8 && loopCopiesRef.current < required) {
      loopCopiesRef.current = required;
      setLoopCopies(required);
      return true;
    }

    if (maxL < 8 && loopCopiesRef.current < MAX_LOOP_COPIES) {
      const next = Math.min(MAX_LOOP_COPIES, loopCopiesRef.current + 4);
      loopCopiesRef.current = next;
      setLoopCopies(next);
      return true;
    }

    return maxL >= 8;
  }, [
    productCount,
    measureSegment,
    estimatedSegmentW,
    getMaxScroll,
    getRequiredCopies,
  ]);

  const enableTransformAutoplay = useCallback(() => {
    const inner = innerRef.current;
    const seg = segmentWRef.current || estimatedSegmentW;
    if (!inner || seg <= 0) return;
    useTransformRef.current = true;
    const el = scrollerRef.current;
    if (el) el.scrollLeft = 0;
    virtualXRef.current = seg * Math.floor(loopCopiesRef.current / 2);
    inner.style.transform = `translate3d(-${virtualXRef.current}px,0,0)`;
  }, [estimatedSegmentW]);

  const advanceAutoplay = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxL = getMaxScroll(el);

    if (maxL >= 1 && !useTransformRef.current) {
      el.scrollLeft += AUTOPLAY_DELTA;
      normalizeScroll();
      return;
    }

    if (maxL >= 1 && useTransformRef.current) {
      clearTransform();
      centerScroll();
      el.scrollLeft += AUTOPLAY_DELTA;
      normalizeScroll();
      return;
    }

    const seg = segmentWRef.current || estimatedSegmentW;
    if (seg <= 0) return;

    if (!useTransformRef.current) {
      enableTransformAutoplay();
    }
    virtualXRef.current += AUTOPLAY_DELTA;
    normalizeScroll();
  }, [
    getMaxScroll,
    normalizeScroll,
    clearTransform,
    centerScroll,
    enableTransformAutoplay,
    estimatedSegmentW,
  ]);

  const syncLayout = useCallback(() => {
    updateCardWidth();
    const grew = ensureOverflow();
    if (!grew) {
      measureSegment();
      const el = scrollerRef.current;
      const maxL = el ? getMaxScroll(el) : 0;
      if (maxL >= 8) {
        clearTransform();
        centerScroll();
        normalizeScroll();
      } else if (loopCopiesRef.current >= MAX_LOOP_COPIES) {
        measureSegment();
        enableTransformAutoplay();
      }
    }
  }, [
    updateCardWidth,
    ensureOverflow,
    measureSegment,
    getMaxScroll,
    clearTransform,
    centerScroll,
    normalizeScroll,
    enableTransformAutoplay,
  ]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    syncLayout();
    requestAnimationFrame(() => {
      measureSegment();
      ensureOverflow();
      requestAnimationFrame(() => {
        measureSegment();
        const el = scrollerRef.current;
        if (el && getMaxScroll(el) >= 8) {
          clearTransform();
          centerScroll();
        } else if (loopCopiesRef.current >= MAX_LOOP_COPIES) {
          measureSegment();
          enableTransformAutoplay();
        }
        normalizeScroll();
      });
    });
  }, [
    syncLayout,
    measureSegment,
    ensureOverflow,
    centerScroll,
    normalizeScroll,
    clearTransform,
    enableTransformAutoplay,
    getMaxScroll,
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
        const maxL = getMaxScroll(scroller);
        if (maxL >= 8) {
          clearTransform();
          normalizeScroll();
        }
      });
    });
    ro.observe(inner);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, [
    updateCardWidth,
    measureSegment,
    ensureOverflow,
    normalizeScroll,
    clearTransform,
    getMaxScroll,
    reduceMotion,
    productIdsKey,
    loopCopies,
  ]);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let cancelled = false;
    let frame = 0;

    const tick = () => {
      if (cancelled) return;
      if (!pauseRef.current) {
        advanceAutoplay();
        frame += 1;
        if (frame % 90 === 0) ensureOverflow();
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
    advanceAutoplay,
    ensureOverflow,
    loopCopies,
  ]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const resumeIfIdle = () => {
      if (document.visibilityState !== "visible" || dragRef.current?.active) return;
      clearResumeTimer();
      pauseRef.current = false;
    };
    document.addEventListener("visibilitychange", resumeIfIdle);
    window.addEventListener("pageshow", resumeIfIdle);
    return () => {
      document.removeEventListener("visibilitychange", resumeIfIdle);
      window.removeEventListener("pageshow", resumeIfIdle);
    };
  }, [reduceMotion, clearResumeTimer]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    pauseRef.current = false;
    const id = window.setTimeout(() => {
      if (!dragRef.current?.active) pauseRef.current = false;
    }, 80);
    return () => window.clearTimeout(id);
  }, [reduceMotion, productIdsKey]);

  const finishTouchInteraction = useCallback(() => {
    normalizeScroll();
    scheduleResume();
    window.setTimeout(() => {
      suppressHoverPauseRef.current = false;
    }, 450);
  }, [normalizeScroll, scheduleResume]);

  const onTouchStart = useCallback(() => {
    suppressHoverPauseRef.current = true;
    pause();
  }, [pause]);

  const cardSlotStyle = cardWidthPx ? { width: cardWidthPx } : undefined;

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.pointerType === "touch") {
      return;
    }
    const target = e.target;
    if (target instanceof Element && target.closest("a, button")) return;

    const el = scrollerRef.current;
    if (!el) return;

    pause();
    if (useTransformRef.current) {
      clearTransform();
      el.scrollLeft = virtualXRef.current;
      virtualXRef.current = 0;
    }
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

  const onPointerUp = (e) => {
    endPointerDrag(e);
    if (e.pointerType === "touch") {
      finishTouchInteraction();
    }
  };

  const onScroll = () => {
    if (!useTransformRef.current) normalizeScroll();
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
          <div key={product.id} className={CARD_SLOT_CLASS}>
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
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={finishTouchInteraction}
        onTouchCancel={finishTouchInteraction}
        onWheel={onWheel}
        onMouseEnter={() => {
          if (suppressHoverPauseRef.current) return;
          pause();
        }}
        onMouseLeave={() => {
          if (suppressHoverPauseRef.current) return;
          if (!dragRef.current?.active) scheduleResume();
        }}
      >
        <div
          ref={innerRef}
          className="flex w-max min-w-max gap-4 md:gap-5 xl:gap-4"
          style={
            innerMinWidthPx > 0 ? { minWidth: innerMinWidthPx } : undefined
          }
        >
          {loopProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
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
