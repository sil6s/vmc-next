import type { FAQ } from "@/data/faqs";
import { Section } from "@/components/ui/Section";

export function FAQSection({ faqs, title = "Common questions about veterinary care in Northern Kentucky." }: { faqs: FAQ[]; title?: string }) {
  return (
    <Section tone="cream" eyebrow="Frequently Asked Questions" title={title}>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
