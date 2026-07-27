"use client";

import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
          <p className="eyebrow">Patient Portal</p>
          <h1>You&rsquo;re about to leave our site</h1>
          <p>
            This link takes you to our technology partner, Otto, to access the patient portal — appointment
            history, records, and account tools.
          </p>

          <Alert className="portal-gateway-alert" tone="default">
            <ShieldCheck aria-hidden="true" size={18} />
            <div>
              <AlertTitle>Veterinary Medical Centers is still independently owned</AlertTitle>
              <AlertDescription>
                Otto is a third-party technology partner, not a corporate owner. VMC remains independently owned
                and operated right here in Northern Kentucky.
              </AlertDescription>
            </div>
          </Alert>

          <p className="portal-gateway-help">
            Having trouble with the portal? <Link href="/contact/">Contact us directly</Link> and our team will
            help.
          </p>

          <div className="portal-gateway-actions">
            <ShadButton asChild variant="secondary">
              <Link href="/">Cancel</Link>
            </ShadButton>
            <ShadButton asChild variant="primary">
              <a href={portalUrl} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                Continue to Otto
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            </ShadButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
