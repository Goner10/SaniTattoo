import assert from "node:assert/strict";
import test from "node:test";
import { WHATSAPP_PHONE_DIGITS } from "./whatsapp.js";
import {
  WHATSAPP_ORDER_URL_MAX_LENGTH,
  buildOrderMessage,
  prepareOrderShare,
} from "./orderMessage.js";

function summary(lines, extra = {}) {
  const unpricedCount = lines.filter((line) => line.unitNetCents == null).length;
  const knownTotalCents = lines.reduce((sum, line) => sum + (line.subtotalNetCents ?? 0), 0);
  return {
    lines,
    unpricedCount,
    knownTotalCents: unpricedCount === lines.length ? null : knownTotalCents,
    currency: "EUR",
    fingerprint: "test",
    ...extra,
  };
}

function line(overrides) {
  return {
    key: "a",
    productId: "a",
    variantId: null,
    name: "Producto",
    variantLabel: null,
    image: "",
    alt: "",
    currency: "EUR",
    quantity: 1,
    unitNetCents: 640,
    subtotalNetCents: 640,
    ...overrides,
  };
}

test("el mensaje conjunto lista neto, subtotal y total sin IVA", () => {
  const text = buildOrderMessage(
    summary([
      line({
        name: "Green Soap Aloe Tattoo",
        variantLabel: "220 ml",
        quantity: 1,
        unitNetCents: 640,
        subtotalNetCents: 640,
      }),
      line({
        name: "Gel stencil",
        variantLabel: "100 ml",
        quantity: 2,
        unitNetCents: 960,
        subtotalNetCents: 1920,
      }),
    ]),
  );

  assert.match(text, /Hola, me gustaría solicitar este pedido:/);
  assert.match(text, /\*Precios sin IVA\*/);
  assert.match(text, /• 1 × Green Soap Aloe Tattoo — 220 ml\n {2}.+\/ud\. · Subtotal: /);
  assert.match(text, /• 2 × Gel stencil — 100 ml/);
  assert.match(text, /\*Total sin IVA: /);
  assert.match(text, /¿Podéis confirmarme disponibilidad, importe final y envío\?/);
  assert.doesNotMatch(text, /\[precio|\[total|\[subtotal/);
  assert.equal(text.includes("  "), true);
});

test("una línea sin precio no se presenta como gratuita", () => {
  const text = buildOrderMessage(
    summary([
      line({ quantity: 1, unitNetCents: 500, subtotalNetCents: 500 }),
      line({
        name: "Sin tarifa",
        quantity: 1,
        unitNetCents: null,
        subtotalNetCents: null,
      }),
    ]),
  );
  assert.match(text, /Sin tarifa\n {2}Consultar precio/);
  assert.match(text, /\*Subtotal conocido sin IVA: /);
  assert.match(text, /Líneas pendientes de valorar: 1/);
  assert.doesNotMatch(text, /0,00 €/);
});

test("el enlace conserva acentos y saltos, y el texto largo no se recorta", () => {
  assert.ok(WHATSAPP_ORDER_URL_MAX_LENGTH <= 2000);

  const share = prepareOrderShare(summary([line({ name: "Camiseta" })]));
  assert.equal(share.mode, "link");
  const decoded = decodeURIComponent(share.url.split("text=")[1]);
  assert.match(decoded, /¿Podéis/);
  assert.ok(decoded.includes("\n"));
  assert.match(share.url, new RegExp(`wa\\.me/${WHATSAPP_PHONE_DIGITS}`));

  const longLines = Array.from({ length: 40 }, (_, index) =>
    line({
      name: `Producto muy largo número ${index} con descripción repetida`.repeat(4),
      variantLabel: "Formato extenso",
      quantity: index + 1,
    }),
  );
  const longShare = prepareOrderShare(summary(longLines));
  assert.equal(longShare.mode, "copy");
  assert.equal(longShare.url.includes("text="), false);
  for (const item of longLines) {
    assert.ok(longShare.text.includes(item.name));
  }
});
