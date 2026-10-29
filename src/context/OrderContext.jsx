import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { products } from "../data/products.js";
import {
  addOrderLine,
  prepareOrderLine,
  removeOrderLine,
  setOrderLineQuantity,
} from "../utils/orderList.js";
import { parseStoredOrder, readRawOrder, writeRawOrder } from "../utils/orderStorage.js";
import { findVariantIdentity } from "../utils/variantIdentity.js";
import { OrderContext } from "./orderState.js";

function loadInitialOrder() {
  if (typeof window === "undefined") {
    return { lines: [], notices: [], memoryOnly: true };
  }
  const read = readRawOrder(window.localStorage);
  if (!read.ok) return { lines: [], notices: [], memoryOnly: true };
  const parsed = parseStoredOrder(read.raw, products);
  return { lines: parsed.lines, notices: parsed.notices, memoryOnly: false };
}

function orderReducer(state, action) {
  switch (action.type) {
    case "lines":
      return { ...state, lines: action.lines };
    case "notices":
      return { ...state, notices: action.notices };
    case "memory":
      return { ...state, memoryOnly: true };
    default:
      return state;
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, undefined, loadInitialOrder);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const linesRef = useRef(state.lines);

  useEffect(() => {
    linesRef.current = state.lines;
  });

  useEffect(() => {
    if (state.memoryOnly) return;
    const saved = writeRawOrder(window.localStorage, state.lines);
    if (!saved) dispatch({ type: "memory" });
  }, [state.lines, state.memoryOnly]);

  const openPanel = useCallback(() => {
    setToast(null);
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addProduct = useCallback((product, options = {}) => {
    const prepared = prepareOrderLine(
      product,
      options.variantId ?? null,
      options.quantity ?? 1,
      findVariantIdentity,
    );
    if (!prepared.ok) return prepared;

    const result = addOrderLine(linesRef.current, prepared.line);
    if (!result.ok) return result;

    dispatch({ type: "lines", lines: result.lines });
    if (options.feedback !== "inline") {
      setToast({ id: Date.now(), capped: Boolean(result.capped) });
    }
    return result;
  }, []);

  const setLineQuantity = useCallback((key, quantity) => {
    const result = setOrderLineQuantity(linesRef.current, key, quantity);
    if (result.ok) dispatch({ type: "lines", lines: result.lines });
    return result;
  }, []);

  const removeLine = useCallback((key) => {
    dispatch({ type: "lines", lines: removeOrderLine(linesRef.current, key) });
  }, []);

  const clearLines = useCallback(() => {
    dispatch({ type: "lines", lines: [] });
  }, []);

  const dismissNotices = useCallback(() => {
    dispatch({ type: "notices", notices: [] });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const totalUnits = state.lines.reduce((sum, line) => sum + line.quantity, 0);

  const value = useMemo(
    () => ({
      lines: state.lines,
      notices: state.notices,
      totalUnits,
      isOpen,
      openPanel,
      closePanel,
      addProduct,
      setLineQuantity,
      removeLine,
      clearLines,
      dismissNotices,
      toast,
      dismissToast,
    }),
    [
      state.lines,
      state.notices,
      totalUnits,
      isOpen,
      openPanel,
      closePanel,
      addProduct,
      setLineQuantity,
      removeLine,
      clearLines,
      dismissNotices,
      toast,
      dismissToast,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
