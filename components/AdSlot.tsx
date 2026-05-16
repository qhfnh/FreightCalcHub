import { siteConfig } from "@/lib/site";

interface AdSlotProps {
  slot: string;
  label: string;
  className?: string;
}

export function AdSlot({ slot, label, className = "" }: AdSlotProps) {
  if (!siteConfig.adsenseClientId) {
    return null;
  }

  return (
    <div className={className} aria-label={label}>
      <ins
        className="adsbygoogle block min-h-24"
        data-ad-client={siteConfig.adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
