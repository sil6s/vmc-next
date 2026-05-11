import Image from "next/image";
import { Button } from "@/components/ui/Button";

type HeroProps = {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  body: string;
  image?: string;
  imageAlt?: string;
  badgeTitle?: string;
  badgeSub?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function Hero({ eyebrow, title, emphasis, body, image, imageAlt = "", badgeTitle, badgeSub, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>
          {title}
          {emphasis && <em>{emphasis}</em>}
        </h1>
        <p>{body}</p>
        <div className="hero-actions">
          {primaryCta && <Button href={primaryCta.href}>{primaryCta.label}</Button>}
          {secondaryCta && <Button href={secondaryCta.href} variant="ghost">{secondaryCta.label}</Button>}
        </div>
        <div className="hero-stats" aria-label="Practice highlights">
          <span><strong>4.8</strong> avg. rating</span>
          <span><strong>150+</strong> reviews</span>
          <span><strong>2</strong> NKY locations</span>
        </div>
      </div>
      {image && (
        <div className="hero-media">
          <Image src={image} alt={imageAlt} width={920} height={720} priority sizes="(max-width: 900px) 100vw, 50vw" />
          {(badgeTitle || badgeSub) && (
            <div className="hero-badge">
              <span />
              <strong>{badgeTitle}</strong>
              {badgeSub && <small>{badgeSub}</small>}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
