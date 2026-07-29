const steps = [
  {
    number: "01",
    title: "Chat with Cashew Advisor",
    description:
      "Tell our AI assistant about your financial goals — loan amount, income, and credit situation. No forms, just a conversation.",
  },
  {
    number: "02",
    title: "Get Instantly Pre-Qualified",
    description:
      "Cashew Advisor analyzes your profile in seconds and returns a pre-qualification decision with estimated rates and terms.",
  },
  {
    number: "03",
    title: "Review Your Repayment Plan",
    description:
      "See a personalized repayment schedule with monthly payments, total interest, and payoff timeline before you commit.",
  },
  {
    number: "04",
    title: "Receive Your Funds",
    description:
      "Once approved, funds are deposited directly to your bank account — typically within one business day.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted">
            From conversation to cash in four simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="text-4xl font-bold text-accent/40">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
