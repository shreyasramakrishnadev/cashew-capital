const products = [
  {
    title: "Personal Loans",
    description:
      "Borrow $1,000–$50,000 for any purpose — home improvements, medical expenses, or major purchases. Fixed rates, no hidden fees.",
    rate: "From 6.99% APR",
    icon: "💰",
  },
  {
    title: "Debt Consolidation",
    description:
      "Combine high-interest credit card balances into one manageable monthly payment. Save on interest and simplify your finances.",
    rate: "From 5.99% APR",
    icon: "📊",
  },
  {
    title: "Credit Building",
    description:
      "Build or rebuild your credit with a structured loan designed to report positive payment history to all three bureaus.",
    rate: "From 8.99% APR",
    icon: "📈",
  },
];

export default function ProductCards() {
  return (
    <section id="products" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Lending Products
          </h2>
          <p className="mt-4 text-lg text-muted">
            Flexible financing options tailored to your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                {product.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{product.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {product.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-primary">
                {product.rate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
