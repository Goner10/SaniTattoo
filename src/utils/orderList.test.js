import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/products.js";
import {
  addOrderLine,
  parseOrderQuantity,
  prepareOrderLine,
  removeOrderLine,
  setOrderLineQuantity,
} from "./orderList.js";
import {
  findVariantIdentity,
  getVariantActionLabel,
  listVariantIdentities,
} from "./variantIdentity.js";

const plain = {
  id: "soap",
  name: "Jabón",
  active: true,
  variants: [],
};

const sized = {
  id: "shirt",
  name: "Camiseta",
  active: true,
  variants: [
    { label: "S", price: 20 },
    { label: "L", price: 20 },
  ],
};

test("agrupa el mismo producto sin variante y separa variantes", () => {
  const first = prepareOrderLine(plain, null, 1, findVariantIdentity);
  assert.equal(first.ok, true);
  const second = prepareOrderLine(plain, null, 2, findVariantIdentity);
  const added = addOrderLine([first.line], second.line);
  assert.equal(added.lines.length, 1);
  assert.equal(added.lines[0].quantity, 3);

  const small = prepareOrderLine(sized, "s", 1, findVariantIdentity);
  const large = prepareOrderLine(sized, "l", 1, findVariantIdentity);
  const both = addOrderLine([small.line], large.line);
  assert.equal(both.lines.length, 2);
  assert.deepEqual(
    both.lines.map((line) => line.variantId),
    ["s", "l"],
  );
});

test("no inventa una variante obligatoria y valida cantidades", () => {
  assert.equal(prepareOrderLine(sized, null, 1, findVariantIdentity).reason, "variant");
  assert.equal(prepareOrderLine(sized, "no-existe", 1, findVariantIdentity).reason, "variant");
  assert.equal(prepareOrderLine(plain, null, 0, findVariantIdentity).reason, "quantity");
  assert.equal(prepareOrderLine(plain, null, 1.5, findVariantIdentity).reason, "quantity");
  assert.equal(prepareOrderLine(plain, null, 100, findVariantIdentity).reason, "quantity");
  assert.equal(parseOrderQuantity(""), null);
  assert.equal(parseOrderQuantity("2"), 2);

  const line = prepareOrderLine(plain, null, 1, findVariantIdentity).line;
  assert.equal(setOrderLineQuantity([line], "soap::", 4).lines[0].quantity, 4);
  assert.equal(setOrderLineQuantity([line], "soap::", 0).ok, false);
  assert.equal(removeOrderLine([line], "soap::").length, 0);
});

test("al sumar no pasa del máximo por línea", () => {
  const line = { productId: "soap", variantId: null, quantity: 90 };
  const extra = addOrderLine([line], { productId: "soap", variantId: null, quantity: 20 });
  assert.equal(extra.capped, true);
  assert.equal(extra.lines[0].quantity, 99);
});

test("las etiquetas eligen talla, formato u opción", () => {
  assert.equal(getVariantActionLabel([{ label: "M" }, { label: "XL" }]), "Elegir talla");
  assert.equal(getVariantActionLabel([{ label: "Talla S" }]), "Elegir talla");
  assert.equal(getVariantActionLabel([{ label: "100ml" }, { label: "220ml" }]), "Elegir formato");
  assert.equal(getVariantActionLabel([{ label: "30x300" }]), "Elegir formato");
  assert.equal(getVariantActionLabel([{ label: "Negro" }]), "Elegir opción");
});

test("cada variante del catálogo tiene un id estable y único dentro del producto", () => {
  for (const product of products) {
    const identities = listVariantIdentities(product);
    const ids = identities.map((variant) => variant.id);
    assert.equal(new Set(ids).size, ids.length, product.id);
    for (const variant of identities) {
      assert.equal(findVariantIdentity(product, variant.id)?.label, variant.label);
      assert.ok(!/^\d+$/.test(variant.id));
    }
  }
});
