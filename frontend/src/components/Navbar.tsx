import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white text-lg font-bold">
            C
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Cashew Capital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#products" className="hover:text-primary transition-colors">
            Products
          </a>
        </nav>

        <Link
          href="/advisor"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light transition-colors"
        >
          Talk to Cashew Advisor
        </Link>
      </div>
    </header>
  );
}
