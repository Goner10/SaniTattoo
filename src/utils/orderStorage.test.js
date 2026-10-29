import assert from "node:assert/strict";
import test from "node:test";
import { ORDER_SCHEMA_VERSION, parseStoredOrder, serializeOrder } from "./orderStorage.js";

const catalog = [
  {
    id: "soap",
    name: "Jabón",
    active: true,
    price: 8,
    currency: "EUR",
    variants: [],
  },
  {
    id: "gel",
    name: "Gel stencil",
    active: true,
    price: 12,
    currency: "EUR",
    variants: [
      { label: "100ml", price: 12 },
      { label: "220ml", price: 18 },
    ],
  },
  {
    id: "retired",
    name: "Producto retirado",
    active: false,
    price: 5,
    currency: "EUR",
  },
];

function stored(lines, extra = {}) {
  return JSON.stringify({ version: ORDER_SCHEMA_VERSION, lines, ...extra });
}

test("recupera líneas válidas e ignora precios guardados", () => {
  const raw = stored([
    { productId: "soap", variantId: null, quantity: 2, price: 1, name: "Otro" },
    { productId: "gel", variantId: "220ml", quantity: 1, price: 0 },
  ]);
  const parsed = parseStoredOrder(raw, catalog);
  assert.deepEqual(parsed.lines, [
    { productId: "soap", variantId: null, quantity: 2 },
    { productId: "gel", variantId: "220ml", quantity: 1 },
  ]);
  assert.equal(JSON.parse(serializeOrder(parsed.lines)).lines[0].price, undefined);
});

test("avisa y descarta JSON dañado, inactivos, variantes retiradas y duplicados", () => {
  assert.match(parseStoredOrder("{", catalog).notices[0], /No se ha podido leer/);
  assert.deepEqual(parseStoredOrder("{", catalog).lines, []);

  const raw = stored([
    { productId: "missing", variantId: null, quantity: 1 },
    { productId: "retired", variantId: null, quantity: 1 },
    { productId: "gel", variantId: "xl", quantity: 1 },
    { productId: "soap", variantId: null, quantity: 2 },
    { productId: "soap", variantId: null, quantity: 2 },
    { productId: "soap", variantId: null, quantity: 0 },
  ]);
  const parsed = parseStoredOrder(raw, catalog);
  assert.deepEqual(parsed.lines, [{ productId: "soap", variantId: null, quantity: 4 }]);
  assert.ok(parsed.notices.some((notice) => notice.includes("catálogo")));
  assert.ok(parsed.notices.some((notice) => notice.includes("Producto retirado")));
  assert.ok(parsed.notices.some((notice) => notice.includes("Gel stencil")));
  assert.ok(parsed.notices.some((notice) => notice.includes("no se pudieron leer")));
});

test("un pedido vacío guardado no genera avisos", () => {
  assert.deepEqual(parseStoredOrder(null, catalog), { lines: [], notices: [] });
  assert.deepEqual(parseStoredOrder(stored([]), catalog).lines, []);
});
