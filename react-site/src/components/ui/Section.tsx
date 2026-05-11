import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  eyebrow,
  title,
  intro,
  tone = "cream",
  id
}: {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "cream" | "white" | "warm" | "red";
  id?: string;
}) {
  return (
    <section id={id} className={`section section-${tone}`}>
      <Container>
        {(eyebrow || title || intro) && (
          <div className="section-heading">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
