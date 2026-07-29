import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-[#40916c] text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            AI-Powered Consumer Lending
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Smarter loans,{" "}
            <span className="text-accent-light">powered by AI</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 md:text-xl">
            Cashew Capital pairs competitive rates with Cashew Advisor — an AI
            assistant that handles pre-qualification, repayment planning, and
            credit counseling. Fully automated, no human in the loop.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/advisor"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-primary hover:bg-accent-light transition-colors"
            >
              Get Pre-Qualified
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
