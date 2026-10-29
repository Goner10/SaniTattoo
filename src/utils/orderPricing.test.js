import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/products.js";
import { getActiveCampaigns } from "./campaignPricing.js";
import { resolveOrderSummary } from "./orderPricing.js";

const campaign = {
  id: "promo",
  name: "Promo",
  enabled: true,
  discountPercent: 20,
  priority: 10,
  scope: { type: "all" },
  endsAt: "2026-11-01T00:00:00+01:00",
};

function product(overrides) {
  return {
    id: "item",
    name: "Producto",
    active: true,
    price: 10,
    currency: "EUR",
    unit: "1",
    image: "img.png",
    alt: "Producto",
    ...overrides,
  };
}

test("neto sin IVA, con IVA incluido y descuento aplicado una sola vez", () => {
  const net = product({ id: "net", price: 10 });
  const gross = product({
    id: "gross",
    price: 9.99,
    priceIncludesVat: true,
    vatRate: 0.21,
  });
  const summary = resolveOrderSummary(
    [
      { productId: "net", variantId: null, quantity: 2 },
      { productId: "gross", variantId: null, quantity: 1 },
    ],
    [net, gross],
    [campaign],
  );

  const netLine = summary.lines[0];
  const grossLine = summary.lines[1];
  assert.equal(netLine.unitNetCents, 800);
  assert.equal(netLine.subtotalNetCents, 1600);
  assert.equal(grossLine.unitNetCents, 660);
  assert.equal(grossLine.subtotalNetCents, 660);
  assert.equal(summary.knownTotalCents, 2260);
  assert.equal(
    summary.knownTotalCents,
    summary.lines.reduce((sum, line) => sum + line.subtotalNetCents, 0),
  );
});

test("las variantes usan su precio y no el del producto", () => {
  const item = product({
    id: "gel",
    name: "Gel stencil",
    price: 12,
    variants: [
      { label: "100ml", price: 12 },
      { label: "220ml", price: 18 },
    ],
  });
  const summary = resolveOrderSummary(
    [
      { productId: "gel", variantId: "100ml", quantity: 1 },
      { productId: "gel", variantId: "220ml", quantity: 2 },
    ],
    [item],
    [campaign],
  );
  assert.equal(summary.lines[0].unitNetCents, 960);
  assert.equal(summary.lines[0].subtotalNetCents, 960);
  assert.equal(summary.lines[1].unitNetCents, 1440);
  assert.equal(summary.lines[1].subtotalNetCents, 2880);
  assert.equal(summary.knownTotalCents, 3840);
});

test("un producto sin precio no cuenta como gratuito", () => {
  const priced = product({ id: "priced", price: 5 });
  const pending = product({ id: "pending", price: null, variants: [] });
  const summary = resolveOrderSummary(
    [
      { productId: "priced", variantId: null, quantity: 1 },
      { productId: "pending", variantId: null, quantity: 2 },
    ],
    [priced, pending],
    [],
  );
  assert.equal(summary.lines[1].unitNetCents, null);
  assert.equal(summary.lines[1].subtotalNetCents, null);
  assert.equal(summary.unpricedCount, 1);
  assert.equal(summary.knownTotalCents, 500);
});

test("al caducar la campaña el importe vuelve al precio de catálogo", () => {
  const item = product({ id: "net", price: 8 });
  const line = [{ productId: "net", variantId: null, quantity: 1 }];
  const during = Date.parse("2026-10-30T12:00:00+01:00");
  const after = Date.parse("2026-11-01T00:00:00+01:00");
  const active = resolveOrderSummary(line, [item], getActiveCampaigns([campaign], during));
  const expired = resolveOrderSummary(line, [item], getActiveCampaigns([campaign], after));
  assert.equal(active.lines[0].unitNetCents, 640);
  assert.equal(expired.lines[0].unitNetCents, 800);
  assert.notEqual(active.fingerprint, expired.fingerprint);
});

test("las camisetas extraen el IVA incluido de su precio guardado", () => {
  const shirt = products.find((item) => item.id === "camiseta-sanitattoo-blanca");
  const summary = resolveOrderSummary(
    [{ productId: shirt.id, variantId: "l", quantity: 2 }],
    products,
    [],
  );
  assert.equal(summary.lines[0].variantLabel, "L");
  assert.equal(summary.lines[0].unitNetCents, 1653);
  assert.equal(summary.lines[0].subtotalNetCents, 3306);
  assert.equal(summary.knownTotalCents, 3306);
});

test("el subtotal coincide con el unitario mostrado por la cantidad", () => {
  const item = product({ id: "odd", price: 19.9 });
  const summary = resolveOrderSummary(
    [{ productId: "odd", variantId: null, quantity: 3 }],
    [item],
    [campaign],
  );
  const line = summary.lines[0];
  assert.equal(line.subtotalNetCents, line.unitNetCents * line.quantity);
  assert.equal(summary.knownTotalCents, line.subtotalNetCents);
});
