import assert from "node:assert/strict";
import test from "node:test";
import { brands } from "../data/brands.js";
import { campaigns } from "../data/campaigns.js";
import { products } from "../data/products.js";
import { formatPrice, getPriceWithVat } from "./formatPrice.js";
import { productWhatsAppUrl } from "./whatsapp.js";
import {
  applyPercentDiscount,
  formatDiscountLabel,
  getActiveCampaigns,
  getCampaignRefreshDelay,
  getEffectiveDisplayPrice,
  getNextCampaignBoundary,
  getProductPriceQuote,
  isCampaignActive,
  MAX_TIMEOUT_MS,
  resolveCampaign,
  resolveSharedCampaign,
} from "./campaignPricing.js";

const halloween = campaigns.find((campaign) => campaign.id === "halloween-2026");
const END = Date.parse("2026-11-01T00:00:00+01:00");
const DURING = Date.parse("2026-10-29T15:00:00+01:00");

function campaign(overrides) {
  return {
    id: "test",
    name: "Test",
    enabled: true,
    discountPercent: 20,
    priority: 1,
    scope: { type: "all" },
    copy: halloween.copy,
    ...overrides,
  };
}

test("Halloween está configurada al 20 % hasta el instante exclusivo indicado", () => {
  assert.ok(halloween);
  assert.equal(halloween.enabled, true);
  assert.equal(halloween.discountPercent, 20);
  assert.equal(halloween.endsAt, "2026-11-01T00:00:00+01:00");
  assert.equal(halloween.scope.type, "all");
  assert.equal(Date.parse(halloween.endsAt), Date.parse("2026-10-31T23:00:00.000Z"));
  assert.equal(formatDiscountLabel(20), "−20 %");
});

test("el fin es exclusivo y la vigencia respeta enabled y fechas opcionales", () => {
  assert.equal(isCampaignActive(halloween, END - 1), true);
  assert.equal(isCampaignActive(halloween, END), false);
  assert.equal(isCampaignActive(halloween, DURING), true);
  assert.equal(isCampaignActive({ ...halloween, enabled: false }, DURING), false);
  assert.equal(
    isCampaignActive(campaign({ startsAt: "2026-12-01T00:00:00+01:00" }), DURING),
    false,
  );
  assert.equal(
    isCampaignActive(
      campaign({
        startsAt: "2026-10-01T00:00:00+01:00",
        endsAt: "2026-10-20T00:00:00+01:00",
      }),
      DURING,
    ),
    false,
  );
  assert.equal(isCampaignActive(campaign({ startsAt: undefined, endsAt: undefined }), DURING), true);
  assert.equal(isCampaignActive(campaign({ endsAt: "fecha-mala" }), DURING), false);
});

test("redondea el 20 % en céntimos", () => {
  assert.equal(applyPercentDiscount(10, 20), 8);
  assert.equal(applyPercentDiscount(19.9, 20), 15.92);
  assert.equal(applyPercentDiscount(12.35, 20), 9.88);
  assert.equal(applyPercentDiscount(8.2, 20), 6.56);
  assert.equal(applyPercentDiscount(7.5, 20), 6);
  assert.equal(applyPercentDiscount(10.03, 20), 8.02);
  assert.equal(applyPercentDiscount(20, 20), 16);
});

test("no inventa precio y no etiqueta un descuento numérico si no hay importe", () => {
  const quote = getProductPriceQuote(
    { id: "sin-precio", price: null, currency: "EUR", unit: "1 unidad", variants: [] },
    halloween,
  );
  assert.equal(quote.hasPrice, false);
  assert.equal(quote.hasDiscount, false);
  assert.equal(quote.final, null);
  assert.equal(quote.discountPercent, 0);
  assert.equal(formatPrice(quote.final, quote.currency), "Consultar precio");
});

test("el Desde usa el mínimo de las variantes y la variante usa su propia base", () => {
  const product = {
    id: "formatos",
    brand: "aloetattoo",
    price: 10,
    currency: "EUR",
    unit: "unidad",
    variants: [
      { label: "500 ml", price: 8.2 },
      { label: "1000 ml", price: 14.9 },
    ],
  };
  const card = getProductPriceQuote(product, halloween);
  const small = getProductPriceQuote(product, halloween, { variant: product.variants[0] });
  const large = getProductPriceQuote(product, halloween, { variant: product.variants[1] });

  assert.equal(card.showFrom, true);
  assert.equal(card.base, 8.2);
  assert.equal(card.final, 6.56);
  assert.equal(small.showFrom, false);
  assert.equal(small.base, 8.2);
  assert.equal(small.final, card.final);
  assert.equal(large.base, 14.9);
  assert.equal(large.final, 11.92);
  assert.equal(getEffectiveDisplayPrice(product, halloween), card.final);
  assert.equal(product.price, 10);
  assert.equal(product.variants[0].price, 8.2);
});

test("el IVA se calcula sobre el precio ya descontado y respeta el PVP con IVA", () => {
  const net = getProductPriceQuote(
    { id: "neto", price: 10, currency: "EUR", unit: "ud" },
    halloween,
  );
  assert.equal(net.final, 8);
  assert.equal(net.baseWithVat, getPriceWithVat(10, { priceIncludesVat: false }));
  assert.equal(net.finalWithVat, getPriceWithVat(8, { priceIncludesVat: false }));
  assert.equal(net.baseWithVat, 12.1);
  assert.equal(net.finalWithVat, 9.68);

  const gross = getProductPriceQuote(
    { id: "bruto", price: 20, currency: "EUR", unit: "ud", priceIncludesVat: true },
    halloween,
  );
  assert.equal(gross.final, 16);
  assert.equal(gross.finalWithVat, 16);
  assert.equal(gross.priceIncludesVat, true);
});

test("el alcance global, por id y por marca no acumula descuentos", () => {
  const gel = { id: "gel-stencil-premium", brand: "aloetattoo", price: 12, currency: "EUR" };
  const proton = { id: "proton-photo-finish", brand: "proton", price: 10, currency: "EUR" };
  const global = campaign({ id: "global", discountPercent: 20, priority: 10, scope: { type: "all" } });
  const byBrand = campaign({
    id: "solo-proton",
    discountPercent: 10,
    priority: 30,
    scope: { type: "brands", brandIds: ["proton"] },
  });
  const byProduct = campaign({
    id: "solo-gel",
    discountPercent: 15,
    priority: 40,
    scope: { type: "products", productIds: ["gel-stencil-premium"] },
  });
  const active = [global, byBrand, byProduct];

  assert.equal(resolveCampaign(gel, active).id, "solo-gel");
  assert.equal(getProductPriceQuote(gel, resolveCampaign(gel, active)).final, 10.2);
  assert.equal(resolveCampaign(proton, active).id, "solo-proton");
  assert.equal(getProductPriceQuote(proton, resolveCampaign(proton, active)).final, 9);
  assert.equal(resolveCampaign({ id: "otro", brand: "hornet", price: 10 }, active).id, "global");
  assert.equal(
    resolveCampaign({ id: "otro", brand: "hornet", price: 10 }, [byBrand, byProduct]),
    null,
  );
  assert.equal(resolveCampaign(gel, [campaign({ scope: { type: "products", productIds: [] } })]), null);
  assert.equal(resolveCampaign(gel, [campaign({ scope: { type: "brands", brandIds: ["proton"] } })]), null);
});

test("si la prioridad empata, el id decide y offer no altera el precio", () => {
  const product = { id: "p", brand: "proton", price: 10, currency: "EUR", offer: true };
  const lowId = campaign({ id: "a-camp", discountPercent: 20, priority: 5 });
  const highId = campaign({ id: "b-camp", discountPercent: 50, priority: 5 });
  assert.equal(resolveCampaign(product, [highId, lowId]).id, "a-camp");
  assert.equal(getProductPriceQuote(product, resolveCampaign(product, [highId, lowId])).final, 8);

  const same = getProductPriceQuote({ ...product, offer: false }, lowId);
  assert.equal(getProductPriceQuote(product, lowId).final, same.final);
});

test("la selección compartida exige la misma campaña en todo el grupo", () => {
  const all = campaign({ id: "all", scope: { type: "all" } });
  const proton = campaign({
    id: "proton",
    priority: 20,
    scope: { type: "brands", brandIds: ["proton"] },
  });
  const productsInView = [
    { id: "a", brand: "proton", price: 10 },
    { id: "b", brand: "hornet", price: 10 },
  ];
  assert.equal(resolveSharedCampaign(productsInView, [all]).id, "all");
  assert.equal(resolveSharedCampaign(productsInView, [all, proton]), null);
  assert.equal(resolveSharedCampaign([{ id: "a", brand: "proton", price: 10 }], [proton]).id, "proton");
});

test("el temporizador apunta al siguiente límite y no incluye un fin ya alcanzado", () => {
  const ending = campaign({ id: "ending", endsAt: "2026-11-01T00:00:00+01:00" });
  const later = campaign({ id: "later", startsAt: "2026-12-01T00:00:00+01:00" });
  assert.equal(getNextCampaignBoundary([ending, later], DURING), END);
  assert.equal(getNextCampaignBoundary([ending], END), null);
  assert.equal(getNextCampaignBoundary([{ ...ending, enabled: false }], DURING), null);
  assert.equal(getCampaignRefreshDelay(DURING + MAX_TIMEOUT_MS + 5_000, DURING), MAX_TIMEOUT_MS);
});

test("los productos reales conservan la base y comparten tarjeta, ficha y variante", () => {
  const active = getActiveCampaigns(campaigns, DURING);
  const soap = products.find((product) => product.id === "green-soap-cleansing-foam");
  const gel = products.find((product) => product.id === "gel-stencil-premium");
  const shirt = products.find((product) => product.id === "camiseta-sanitattoo-blanca");
  const soapBase = soap.price;
  const gelVariantBases = gel.variants.map((variant) => variant.price);

  const soapQuote = getProductPriceQuote(soap, resolveCampaign(soap, active));
  assert.equal(soapQuote.base, 8);
  assert.equal(soapQuote.final, 6.4);
  assert.equal(soapQuote.discountPercent, 20);

  const gelCard = getProductPriceQuote(gel, resolveCampaign(gel, active));
  const gelDetail = getProductPriceQuote(gel, resolveCampaign(gel, active), {
    variant: gel.variants[0],
  });
  assert.equal(gelCard.base, 12);
  assert.equal(gelCard.final, 9.6);
  assert.equal(gelDetail.final, gelCard.final);
  assert.equal(
    getProductPriceQuote(gel, resolveCampaign(gel, active), { variant: gel.variants[1] }).final,
    14.4,
  );

  const shirtCard = getProductPriceQuote(shirt, resolveCampaign(shirt, active));
  const shirtSize = getProductPriceQuote(shirt, resolveCampaign(shirt, active), {
    variant: shirt.variants[0],
  });
  assert.equal(shirtCard.final, 16);
  assert.equal(shirtCard.priceIncludesVat, true);
  assert.equal(shirtSize.final, shirtCard.final);

  const expired = getActiveCampaigns(campaigns, END);
  assert.equal(expired.length, 0);
  assert.equal(getProductPriceQuote(soap, resolveCampaign(soap, expired)).final, soapBase);
  assert.equal(getProductPriceQuote(soap, resolveCampaign(soap, expired)).hasDiscount, false);
  assert.equal(soap.price, soapBase);
  assert.deepEqual(gel.variants.map((variant) => variant.price), gelVariantBases);

  const brandIds = new Set(brands.map((brand) => brand.id));
  for (const product of products) {
    assert.equal(brandIds.has(product.brand), true, product.id);
  }
});

test("WhatsApp conserva nombre y variante, sin precio ni campaña", () => {
  const plain = productWhatsAppUrl("Green Soap Cleaning Foam Aloe Tattoo");
  const sized = productWhatsAppUrl("Camiseta blanca SANITATTOOSUPPLY", {
    variantLabel: "M",
  });
  const plainText = decodeURIComponent(plain);
  const sizedText = decodeURIComponent(sized);

  assert.match(plainText, /Green Soap Cleaning Foam Aloe Tattoo/);
  assert.doesNotMatch(plainText, /Halloween|8,00|6,40/);
  assert.match(sizedText, /Camiseta blanca SANITATTOOSUPPLY \(M\)/);
  assert.doesNotMatch(sizedText, /Halloween|20,00|16,00/);
});
