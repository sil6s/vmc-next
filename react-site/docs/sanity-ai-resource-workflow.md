# Sanity AI Resource Workflow

Use this workflow to create SEO-friendly Veterinary Medical Centers resource articles quickly while keeping the public website design unchanged.

The CMS has two public content modes:

- `standard`: Default mode. Use the normal Sanity rich text editor for most posts.
- `advanced`: Optional Markdown mode. Use only when pasting AI-generated Markdown quickly or drafting bulk/technical content.

Only one public body field should be used per article. Choose the mode first, then fill the matching body field.

## Fastest Import Path

For AI batch publishing, generate one `.md` file using the packet format and upload it in the dashboard:

1. Go to `/dashboard/resources/`.
2. Use **AI Packet Import**.
3. Upload the `.md` packet or paste the packet text.
4. Review the parsed preview.
5. Click **Create Sanity Article**.

The importer creates or updates the Sanity Resource Article, creates matching author/reviewer documents when needed, fills Advanced Markdown fields, stores the full packet in `aiPacketMarkdown`, and converts Markdown source/internal links into Sanity link arrays.

The importer requires `SANITY_API_WRITE_TOKEN` with write access.

## Sanity Fields

Use structured fields for search, previews, and sharing:

- `title`: Public article title.
- `slug`: Short lowercase URL slug.
- `excerpt`: 1-2 sentence summary for cards, hero copy, and meta fallback.
- `resourceType`: Blog article, education guide, clinic news, or FAQ resource.
- `category`: Main editorial category.
- `tags`: Short topic tags such as dog care, cat care, wellness, dental, puppy, kitten, senior, prevention.
- `readingTime`: Example: `5 min read`. Leave blank to let the site estimate it.
- `author`: Veterinary Medical Centers Team unless a specific author is needed.
- `reviewedBy`: Optional reviewer.
- `contentMode`: `standard` or `advanced`.
- `body`: Standard rich text article body. This is the default public body field.
- `bodyMarkdown`: Advanced Markdown article body. Use only when `contentMode` is `advanced`.
- `bodyMarkdownFile`: Optional `.md` file upload for Advanced Mode. If both this and `bodyMarkdown` are filled, `bodyMarkdown` takes priority.
- `faqMarkdown`: Advanced Markdown FAQ content. Standard mode should use the FAQ block inside `body`.
- `externalLinks`: Structured source links for Standard mode.
- `sourcesMarkdown`: Advanced Markdown source links and citation notes.
- `seoTitle`: Search result title, usually 50-60 characters.
- `seoDescription`: Search result description, usually 150-160 characters.
- `focusKeyword`: Main keyword for this article.
- `secondaryKeywords`: Supporting terms and related local phrases.
- `image`: Featured image with alt text and optional caption.
- `openGraphImage`: Optional social sharing image.
- `openGraphImage.alt`: Open Graph image alt text.
- `canonicalUrl`: Optional canonical URL if this post is republished from another source.
- `suggestedInternalLinksMarkdown`: Editor-only internal link recommendations.
- `suggestedCtaMarkdown`: Editor-only CTA recommendation.
- `aiPacketMarkdown`: Optional scratch space for the full AI packet before moving it into fields.

## Standard Mode

Use Standard Mode for most articles. Ask AI for content in easy-to-copy sections, then paste it into the Sanity rich text editor.

Standard Mode supports:

- H2 and H3 headings.
- Short paragraphs.
- Bulleted and numbered lists.
- Bold and italic text.
- Internal and external links.
- Image blocks.
- Callout blocks.
- FAQ section blocks.
- Simple CTA section blocks.
- Structured source links through `externalLinks`.

Recommended Standard Mode body structure:

```text
Intro paragraph

H2: Quick answer
Short answer paragraph

H2: Main educational section
Paragraphs and bullets

H2: When to contact Veterinary Medical Centers
Practical local guidance

FAQ section block

Simple CTA section block if useful
```

## Advanced Markdown Mode

Use Advanced Mode only when a Markdown paste workflow is faster.

Advanced Mode supports:

- Markdown H2 and H3 headings.
- Markdown links.
- Bulleted and numbered lists.
- Uploaded `.md` files.
- FAQ content in `faqMarkdown`.
- Sources in `sourcesMarkdown`.
- Full AI packets in `aiPacketMarkdown`.

If `bodyMarkdown` or an uploaded `.md` file includes a `## Quick answer` section, the public template promotes that text into the designed quick-answer card and removes the duplicate heading from the article body.

Markdown rules:

- Use `##` for article sections.
- Use `###` for supporting subsections and FAQ questions.
- Use short paragraphs.
- Use bullets where they improve scanning.
- Avoid tables unless there is no clearer format.
- Use Markdown links like `[wellness exams](/services/pet-wellness-exams-northern-kentucky/)`.

## Standard Mode Prompt

```text
Create a complete Sanity Standard Mode article packet for Veterinary Medical Centers, a locally owned veterinary practice serving Fort Thomas, Independence, and surrounding Northern Kentucky communities.

Article type: [Education guide / FAQ resource / Service-supporting article / Location-supporting article / Seasonal pet care article / New patient guide]
Focus keyword: [keyword]
Audience: Pet owners in Northern Kentucky
Primary goal: Educate pet owners and encourage appropriate scheduling, contact, or new patient next steps.

Output in this exact field order:
1. Title
2. Slug
3. Excerpt
4. SEO title
5. SEO description
6. Focus keyword
7. Secondary keywords
8. Tags
9. Reading time
10. Open Graph image alt text
11. Standard rich text body sections
12. FAQ block content
13. Structured source links
14. Suggested internal links
15. Suggested CTA

For the body sections:
- Do not output Markdown tables.
- Use clear section labels such as H2, H3, Paragraph, Bullet list, FAQ block, and CTA block so the content can be pasted into Sanity rich text.
- Keep paragraphs short.
- Include bullets where helpful.

SEO requirements:
- Use the focus keyword naturally in the SEO title, SEO description, article title or intro, first 100 words, at least one heading, body copy, and FAQ section.
- Include natural local language: Veterinary Medical Centers, Fort Thomas, Independence, Northern Kentucky, preventive veterinary care, and scheduling an appointment when relevant.
- Keep the SEO title under 60 characters when possible.
- Keep the SEO description around 150-160 characters.

Medical accuracy requirements:
- Use general, safe veterinary education.
- Do not diagnose a pet.
- Do not make unsupported promises.
- Do not overstate medical certainty.
- Include a clear disclaimer when symptoms or urgency are discussed.
- Use credible sources such as AVMA, AAHA, Cornell Feline Health Center, Merck Veterinary Manual, CAPC, CDC, FDA, PubMed, or PubMed Central when relevant.

Tone:
- Warm, local, helpful, practical, and trustworthy.
- Do not sound corporate or generic.
- Do not use scare tactics.
- Encourage readers to contact Veterinary Medical Centers for pet-specific guidance.
```

## Advanced Markdown Prompt

```text
Create a complete Sanity Advanced Markdown article packet for Veterinary Medical Centers.

Use the same SEO, medical accuracy, local language, and tone requirements as Standard Mode.

Output in this exact field order:
1. Title
2. Slug
3. Excerpt
4. SEO title
5. SEO description
6. Focus keyword
7. Secondary keywords
8. Tags
9. Reading time
10. Open Graph image alt text
11. Article body markdown
12. FAQ markdown
13. Source links markdown
14. Suggested internal links markdown
15. Suggested CTA markdown

Markdown requirements:
- Use H2 and H3 headings.
- Use short paragraphs.
- Use bullets where they improve scanning.
- Avoid tables.
- Include FAQ questions as H3 headings in FAQ markdown.
- Include sources as Markdown links.
```

## Article Templates

### Education Guide

```text
Suggested structure:
- Intro with focus keyword and local context
- Quick answer
- Why this topic matters
- What pet owners should watch for
- What your veterinary team may discuss
- When to schedule a visit
- How Veterinary Medical Centers can help
- FAQ
- Sources
```

### FAQ Resource

```text
Suggested structure:
- Intro with focus keyword and local context
- Quick answer
- Common questions
- When to contact Veterinary Medical Centers
- FAQ block
- Sources
```

### Service-Supporting Article

```text
Suggested structure:
- Intro connecting the topic to a service page
- Why this care matters
- Signs your pet may need help
- What happens during the visit
- Questions to ask before your appointment
- Schedule care in Fort Thomas or Independence
- Suggested internal links to the matching service, contact page, appointment page, and new patient page
```

### Location-Supporting Article

```text
Suggested structure:
- Intro using Fort Thomas, Independence, Northern Kentucky, and the focus keyword naturally
- Local pet care needs in Northern Kentucky
- When to schedule preventive veterinary care
- What to bring to your visit
- Choosing the right clinic location
- Contact Veterinary Medical Centers
```

### Seasonal Pet Care Article

```text
Suggested structure:
- Intro with season, local weather or regional concern, and focus keyword
- Quick seasonal checklist
- Common risks for dogs and cats
- Prevention steps to discuss with your veterinarian
- When to call sooner
- Schedule seasonal care in Northern Kentucky
- Sources from CAPC, AVMA, CDC, FDA, or other relevant authorities
```

### New Patient Guide

```text
Suggested structure:
- Intro for new clients in Fort Thomas and Independence
- What to expect at your first visit
- What to bring
- Questions we commonly discuss
- How to transfer records
- Get started with Veterinary Medical Centers
- Suggested CTA: Complete the new patient form or contact the team
```

## Editorial Review Checklist

- Standard Mode is used unless Markdown is genuinely faster.
- Only the selected body field is filled.
- The article is accurate, general, and does not diagnose.
- Emergency language tells readers to seek urgent care when needed.
- The focus keyword appears naturally, not repetitively.
- Local references feel natural.
- Internal links point to real site routes.
- Sources are credible and current.
- Standard Mode sources are in `externalLinks`.
- Advanced Mode sources are in `sourcesMarkdown`.
- Image alt text describes the image clearly.
- The article still reads like Veterinary Medical Centers, not a generic AI post.
