import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-foreground text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-primary">
                C
              </div>
              <span className="text-base font-semibold text-white">
                Cashew Capital
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              AI-powered consumer lending. This is a demo application for
              sales engineering purposes — not a real financial product.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-medium text-white">Products</p>
              <ul className="mt-3 space-y-2">
                <li>Personal Loans</li>
                <li>Debt Consolidation</li>
                <li>Credit Building</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Company</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/advisor" className="hover:text-white transition-colors">
                    Cashew Advisor
                  </Link>
                </li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Cashew Capital. Demo application — not
          affiliated with any real financial institution.
        </div>
      </div>
    </footer>
  );
}
