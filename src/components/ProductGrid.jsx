import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onOpenDetail }) {
  if (!products.length) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-white px-4 py-10 text-center text-sm text-brand-muted">
        No hay productos que coincidan con los filtros.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
