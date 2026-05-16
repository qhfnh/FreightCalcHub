import type { CalculatorFaq } from "@/lib/calculator-content";

export function FAQ({ items }: { items: CalculatorFaq[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item) => (
        <details className="group p-5" key={item.question}>
          <summary className="cursor-pointer list-none font-semibold text-ink">
            <span className="inline-flex w-full items-center justify-between gap-4">
              {item.question}
              <span className="text-mint group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-steel">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
