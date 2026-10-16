import Image from "next/image";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

export function FinalInvitation({ actions }: { actions: ReactNode }) {
  return (
    <Section tone="dark" className="home-final-invitation">
      <div className="home-final-layout">
        <div className="home-final-copy">
          <p className="eyebrow">Here when you need us</p>
          <h2>Let&rsquo;s take good care of them, <em>together.</em></h2>
          <p>Whether you&rsquo;re new to VMC or have been visiting for years, we&rsquo;re here to help your pet feel their best.</p>
          <div className="hero-actions">{actions}</div>
        </div>
        <div className="home-final-image">
          <Image src="/images/family-pets-couch.jpg" alt="Couple at home with their dog and cat" fill sizes="(max-width: 760px) 100vw, 42vw" />
        </div>
      </div>
    </Section>
  );
}
