import Link from "next/link";

interface CardLinkProps {
  href: string;
  title: string;
  description: string;
  label?: string;
}

export function CardLink({ href, title, description, label }: CardLinkProps) {
  return (
    <Link
      className="block rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-mint hover:shadow-soft"
      href={href}
    >
      {label ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mint">
          {label}
        </p>
      ) : null}
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
    </Link>
  );
}
