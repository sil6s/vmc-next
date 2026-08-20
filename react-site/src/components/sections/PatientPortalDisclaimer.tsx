"use client";

import Link from "next/link";
import { ArrowRight, UserRoundCheck } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function PatientPortalDisclaimer({ portalUrl }: { portalUrl: string }) {
  const external = isExternalHref(portalUrl);

  return (
    <section className="portal-gateway">
      <Container>
        <div className="portal-gateway-card">
          <span className="portal-gateway-icon" aria-hidden="true">
            <UserRoundCheck size={28} />
          </span>
          <p className="eyebrow">Patient Portal</p>
          <h1>Continue to your patient portal</h1>
          <p>
            The VMC patient portal is powered by Otto. You can use it to access appointments, records, messages,
            and account tools for your pet&apos;s care.
          </p>

          <p className="portal-gateway-help">
            Having trouble with the portal? <Link href="/contact/">Contact us directly</Link> and our team will help.
          </p>

          <div className="portal-gateway-actions">
            <ShadButton asChild variant="primary">
              <a href={portalUrl} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                Open Patient Portal
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </ShadButton>
            <ShadButton asChild variant="secondary">
              <Link href="/">Back to VMC</Link>
            </ShadButton>
          </div>

          <p className="portal-gateway-note">
            VMC remains locally and independently owned. Otto provides our portal technology.
          </p>
        </div>
      </Container>
    </section>
  );
}
