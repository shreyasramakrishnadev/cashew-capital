import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";

export default function AdvisorPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <div>
            <span className="text-sm font-semibold">Cashew Advisor</span>
            <p className="text-xs text-muted">AI Lending Assistant</p>
          </div>
        </Link>
        <Link
          href="/"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </header>

      <div className="flex-1 overflow-hidden bg-background">
        <ChatInterface />
      </div>
    </div>
  );
}
