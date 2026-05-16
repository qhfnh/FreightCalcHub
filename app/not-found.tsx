import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-4 text-steel">
        The page you requested is not available. Start with the calculator
        library or browse the planning guides.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          href="/"
        >
          Home
        </Link>
        <Link
          className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink"
          href="/guides"
        >
          Guides
        </Link>
      </div>
    </main>
  );
}
