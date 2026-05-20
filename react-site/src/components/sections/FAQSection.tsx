import type { FAQ } from "@/data/faqs";
import { Section } from "@/components/ui/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection({ faqs, title = "Common questions about veterinary care in Northern Kentucky." }: { faqs: FAQ[]; title?: string }) {
  return (
    <Section tone="cream" eyebrow="Frequently Asked Questions" title={title}>
      <Accordion className="faq-list" type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem value={`faq-${index}`} key={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
