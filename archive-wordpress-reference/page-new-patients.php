<?php
/**
 * Template Name: New Patients
 *
 * ACF Field Groups used:
 *  - NP: Hero
 *  - NP: What To Bring
 *  - NP: Forms
 *  - NP: Visit Steps
 *  - NP: Payment
 *  - NP: Services
 *  - NP: Testimonials
 *  - NP: Locations
 *  - NP: SEO Content (rendered via the_content() for Rank Math)
 */
get_header();

/* ── Location / contact details ──────────────────────────────────────── */
$ft_phone    = get_field('ft_phone')    ?: '(859) 442-4420';
$ind_phone   = get_field('ind_phone')   ?: '(859) 356-2242';
$ft_address  = get_field('ft_address')  ?: '2000 Memorial Parkway, Fort Thomas, KY 41075';
$ind_address = get_field('ind_address') ?: '4147 Madison Pike, Independence, KY 41051';

/* ── Form URLs ────────────────────────────────────────────────────────── */
$form_1_digital_url = get_field('form_1_digital_url') ?: home_url('/new-patient-registration-form/');
$form_2_digital_url = get_field('form_2_digital_url') ?: home_url('/surgical-information-packet/');
$form_1_paper_url   = get_field('form_1_paper_url')   ?: 'https://nkyvet.com/storage/app/media/newpatientregistration%20v120626.2.pdf';
$form_2_paper_url   = get_field('form_2_paper_url')   ?: 'https://nkyvet.com/storage/app/media/surgical-forms.pdf';
$request_appointment_url = get_field('request_appointment_url') ?: home_url('/request-appointment/');
$contact_form_shortcode  = get_field('contact_form_shortcode');

/* ── Map query strings ───────────────────────────────────────────────── */
$ft_map_query  = rawurlencode($ft_address);
$ind_map_query = rawurlencode($ind_address);

/* ── Service icon library ────────────────────────────────────────────── */
$service_icon_map = [
  'wellness'   => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'dental'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 8C6.6 8 5 9.8 5 12.5 5 16 6.8 20.5 7.7 23c.4 1.2 1.1 1.6 1.6.3.4-1.4.7-3 2.7-3s2.3 1.6 2.7 3c.5 1.3 1.2.9 1.6-.3C17.2 20.5 19 16 19 12.5 19 9.8 17.4 8 15.5 8c-1.4 0-2.3.7-3.5.7S9.9 8 8.5 8z"/></svg>',
  'surgery'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l13-13"/><path d="M16 8l2-2 2 2-2 2-2-2z" fill="currentColor"/><line x1="5" y1="5" x2="5" y2="10"/><line x1="2.5" y1="7.5" x2="7.5" y2="7.5"/></svg>',
  'behavioral' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M9 14.5C6 15.5 4 18 4 21h16c0-3-2-5.5-5-6.5"/><circle cx="9" cy="8" r="1" fill="currentColor"/><circle cx="15" cy="8" r="1" fill="currentColor"/><path d="M10 10.5s.5 1 2 1 2-1 2-1"/></svg>',
  'urgent'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9.5 17H2.5z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17.5" r=".8" fill="currentColor"/></svg>',
  'feline'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="7"/><polygon points="7.5,10 5.5,4 10,9" stroke-linejoin="round"/><polygon points="16.5,10 18.5,4 14,9" stroke-linejoin="round"/><circle cx="9.5" cy="14" r=".8" fill="currentColor"/><circle cx="14.5" cy="14" r=".8" fill="currentColor"/><path d="M10.5 16.5s.5.8 1.5.8 1.5-.8 1.5-.8"/></svg>',
  'diagnostic' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
  'default'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
];

/* ── Services fallback data ──────────────────────────────────────────── */
$services_fallback = [
  [
    'icon_key' => 'wellness',
    'title'    => 'Wellness & Preventive Care',
    'desc'     => 'Annual exams, vaccines, parasite prevention, and life stage guidance for every dog and cat.',
    'url'      => '/service-item/pet-wellness-exams-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
  [
    'icon_key' => 'dental',
    'title'    => 'Dental Care & COHAT',
    'desc'     => 'Oral exams, cleanings, and comprehensive dental treatment to protect long-term health.',
    'url'      => '/service-item/veterinary-dental-care-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
  [
    'icon_key' => 'surgery',
    'title'    => 'Soft Tissue Surgery',
    'desc'     => 'Common and advanced surgical procedures with close anesthesia monitoring and attentive recovery care.',
    'url'      => '/service-item/pet-soft-tissue-surgery-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
  [
    'icon_key' => 'behavioral',
    'title'    => 'Behavior Consultations',
    'desc'     => 'Anxiety, aggression, and environmental concerns addressed with a clear, practical treatment plan.',
    'url'      => '/service-item/pet-behavior-consultations-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
  [
    'icon_key' => 'urgent',
    'title'    => 'Urgent Care',
    'desc'     => 'Prompt attention for non-life-threatening concerns — call us first and we will guide you.',
    'url'      => '/service-item/urgent-veterinary-care-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
  [
    'icon_key' => 'feline',
    'title'    => 'Feline-Friendly Visits',
    'desc'     => 'Quieter, lower-stress appointments designed for cats, including dedicated feline appointment hours.',
    'url'      => '/service-item/cat-friendly-veterinarian-northern-kentucky/',
    'cta'      => 'Learn More',
  ],
];

/* ── Testimonials fallback data ──────────────────────────────────────── */
$testimonials_fallback = [
  [
    'quote'    => 'The team made our first visit genuinely easy. They answered every question, walked us through the exam as it happened, and we left feeling like we actually knew what was going on.',
    'author'   => 'Jessica M.',
    'location' => 'Fort Thomas',
    'stars'    => 5,
  ],
  [
    'quote'    => 'I was nervous about switching vets mid-year, but they had our records sorted before we even sat down. The vet spent real time with us. That meant a lot.',
    'author'   => 'Daniel R.',
    'location' => 'Independence',
    'stars'    => 5,
  ],
  [
    'quote'    => 'Our cat usually hates vet visits but she was visibly calmer here. The exam room was quiet, the staff moved slowly and gently, and she did great.',
    'author'   => 'Mara T.',
    'location' => 'Fort Thomas',
    'stars'    => 5,
  ],
];
?>

<style>
/* ─── Page wrap ──────────────────────────────────────────────────────── */
.np-page-wrap {
  background: var(--cream);
}

/* ─── Shell: NO max-width, just horizontal padding ───────────────────── */
.np-shell {
  width: 100%;
  padding-left: var(--pad);
  padding-right: var(--pad);
}

/* ─── Section base ───────────────────────────────────────────────────── */
.np-sec {
  padding: 88px 0;
}
.np-sec--white  { background: var(--white); }
.np-sec--cream  { background: var(--cream); }
.np-sec--warm   { background: var(--warm);  }
.np-sec--dark   { background: var(--dark);  }

/* ─── Hero ───────────────────────────────────────────────────────────── */
.hero {
  padding: 0;
}

.hero{display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
.hero-copy{
  display:flex;flex-direction:column;justify-content:center;
  padding:80px 56px 80px 68px;
  position:relative;z-index:2;
}



.hero .hero-img {
  width: 100%;
  min-width: 0;
  min-height: 720px;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  border-radius: 0;
}

.hero .hero-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
}

/* optional: keep text from getting too wide */
.hero .hero-body {
  max-width: 620px;
}

/* tablet */
@media (max-width: 1100px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 620px;
  }

  .hero .hero-copy {
    padding: 64px 40px 64px 0;
  }

  .hero .hero-img {
    min-height: 620px;
  }
}

/* mobile */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero .hero-copy {
    padding: 48px 0 24px;
  }

  .hero .hero-img {
    min-height: 360px;
  }
}
/* ─── Grids ──────────────────────────────────────────────────────────── */
.np-form-grid,
.np-contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.np-pay-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 20px;
}
.np-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 40px;
}
.np-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 40px;
}

/* ─── Cards ──────────────────────────────────────────────────────────── */
.np-card,
.np-loc-card,
.np-pay-summary,
.np-service-card,
.np-testimonial-card {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
}
.np-card {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.np-card-kicker {
  display: block;
  margin-bottom: 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--gold);
}
.np-card h3,
.np-pay-card h3,
.np-loc-card h3,
.np-faq-heading h3 {
  font-family: 'Playfair Display', serif;
  color: var(--dark);
}
.np-card h3 {
  font-size: 28px;
  line-height: 1.08;
  margin-bottom: 12px;
}
.np-card p,
.np-loc-card p,
.np-faq-heading p,
.np-pay-summary p,
.np-pay-list li,
.np-section-copy {
  color: var(--mid);
}
.np-card p,
.np-loc-card p,
.np-faq-heading p {
  font-size: 14px;
  line-height: 1.8;
}
.np-card-meta {
  margin: 20px 0 0;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.np-card-meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.np-card-meta-row span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--gold);
}
.np-card-meta-row strong {
  font-size: 13px;
  color: var(--dark);
  text-align: right;
}
.np-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}
.np-card-actions .btn-red,
.np-card-actions .btn-ghost-solid {
  justify-content: center;
}

/* ─── Ghost solid button ─────────────────────────────────────────────── */
.btn-ghost-solid {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 3px;
  border: 1px solid rgba(169,27,27,0.24);
  background: transparent;
  color: var(--red);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  transition: background .2s, border-color .2s, transform .15s, box-shadow .2s;
}
.btn-ghost-solid:hover {
  background: var(--rglow);
  border-color: var(--red);
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(169,27,27,0.12);
}

/* ─── Section copy ───────────────────────────────────────────────────── */
.np-section-copy {
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--mid);
}

/* ─── Visit steps layout ─────────────────────────────────────────────── */
.np-visit-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ─── Service cards ──────────────────────────────────────────────────── */
.np-service-card {
  display: flex;
  flex-direction: column;
  padding: 28px 28px 24px;
  transition: transform .2s, box-shadow .2s;
  text-decoration: none;
}
.np-service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 64px rgba(0,0,0,.10);
}
.np-service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(169,27,27,.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  flex-shrink: 0;
}
.np-service-icon svg {
  width: 22px;
  height: 22px;
  color: var(--red);
  stroke: var(--red);
}
.np-service-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  line-height: 1.15;
  color: var(--dark);
  margin-bottom: 10px;
}
.np-service-card p {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--mid);
  flex: 1;
  margin-bottom: 18px;
}
.np-service-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--red);
  margin-top: auto;
}
.np-service-cta svg {
  width: 13px;
  height: 13px;
  transition: transform .18s;
}
.np-service-card:hover .np-service-cta svg {
  transform: translateX(3px);
}

/* ─── View all services link ─────────────────────────────────────────── */
.np-services-footer {
  margin-top: 32px;
  text-align: center;
}

/* ─── Testimonial cards ──────────────────────────────────────────────── */
.np-testimonial-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
}
.np-stars {
  display: flex;
  gap: 3px;
  margin-bottom: 18px;
}
.np-stars svg {
  width: 14px;
  height: 14px;
  fill: var(--gold);
  stroke: none;
}
.np-testimonial-quote {
  font-size: 15px;
  line-height: 1.8;
  color: var(--dark);
  flex: 1;
  font-style: italic;
}
.np-testimonial-quote::before {
  content: '\201C';
  color: var(--red);
  font-size: 22px;
  line-height: 1;
  display: block;
  margin-bottom: 8px;
  font-style: normal;
  font-family: 'Playfair Display', serif;
}
.np-testimonial-meta {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,0,0,0.07);
}
.np-testimonial-author {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--dark);
}
.np-testimonial-location {
  display: block;
  font-size: 11px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 2px;
}

/* ─── Payment ────────────────────────────────────────────────────────── */
.np-pay-intro { margin-top: 34px; }
.np-pay-summary {
  padding: 28px;
}
.np-pay-summary h3 {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  line-height: 1.08;
  color: var(--dark);
  margin-bottom: 10px;
}
.np-pay-summary p {
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
}
.np-pay-card h3 {
  font-size: 28px;
  line-height: 1.1;
  margin-bottom: 12px;
}
.np-pay-list {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.np-pay-list li {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  font-size: 14px;
  line-height: 1.75;
  color: var(--mid);
}
.np-pay-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.np-pay-list strong { color: var(--dark); }
.np-pay-link {
  display: inline-block;
  margin-top: 10px;
  font-weight: 700;
  color: var(--red);
}

/* ─── Locations ──────────────────────────────────────────────────────── */
.np-loc-card {
  padding: 0;
  overflow: hidden;
}
.np-loc-body { padding: 28px; }
.np-loc-card h3 {
  font-size: 26px;
  margin-bottom: 10px;
}
.np-loc-card a {
  display: inline-flex;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--red);
}
.np-map {
  width: 100%;
  height: 280px;
  border: 0;
  display: block;
  background: var(--warm);
}

/* ─── Booking options ───────────────────────────────────────────────── */
.np-booking-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 34px;
}
.np-booking-card {
  background: var(--white);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.np-booking-card h3 {
  margin: 0;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.1;
  font-family: 'Playfair Display', Georgia, serif;
  color: var(--dark);
}
.np-booking-card p {
  margin: 0;
  color: var(--mid);
  line-height: 1.8;
}
.np-booking-actions {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.np-booking-note {
  margin-top: 22px;
  padding: 18px 20px;
  border-left: 3px solid var(--red);
  background: var(--warm);
  color: var(--mid);
  line-height: 1.8;
}
.np-contact-form-wrap {
  margin-top: 24px;
  background: var(--white);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
  padding: 28px;
}
.np-seo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 34px;
}
.np-seo-card {
  background: var(--white);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
  padding: 28px;
}
.np-seo-card h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(22px, 2.2vw, 30px);
  line-height: 1.12;
  color: var(--dark);
  margin: 0 0 12px;
}
.np-seo-card p {
  margin: 0 0 12px;
  line-height: 1.9;
  color: var(--mid);
}
.np-seo-list {
  margin: 12px 0 0;
  padding-left: 18px;
}
.np-seo-list li {
  margin: 0 0 8px;
  line-height: 1.7;
  color: var(--mid);
}
.np-seo-list li strong {
  color: var(--dark);
}

/* ─── SEO hidden ─────────────────────────────────────────────────────── */
#np-seo-content {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}

/* ─── Responsive ─────────────────────────────────────────────────────── */
@media(max-width:1100px) {
  .np-form-grid,
  .np-contact-grid,
  .np-pay-grid,
  .np-services-grid,
  .np-booking-grid {
    grid-template-columns: 1fr 1fr;
  }
  .np-seo-grid {
    grid-template-columns: 1fr;
  }
  .np-testimonials-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media(max-width:900px) {
  .np-sec { padding: 56px 0; }
  .np-shell { padding-left: 24px; padding-right: 24px; }
  .np-hero-copy { padding: 48px 0 32px;grid-template-columns: 1fr;
 }
  .np-card-actions { flex-direction: column; align-items: stretch; }
  .np-card-actions .btn-red,
  .np-card-actions .btn-ghost-solid { width: 100%; }
  .np-map { height: 240px; }
}
@media(max-width:680px) {
  .np-form-grid,
  .np-contact-grid,
  .np-pay-grid,
  .np-services-grid,
  .np-testimonials-grid,
  .np-booking-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="np-page-wrap">

<!-- ═══════════════════════════════════════════════════════════════════
     HERO
════════════════════════════════════════════════════════════════════ -->
<?php $hero_image = get_field('hero_image'); ?>

<section class="hero">
  <div class="hero-copy">

    <div class="eyebrow">
      <span class="eyebrow-dash"></span>
      <?php echo esc_html( get_field('hero_eyebrow') ?: 'New Patients · Fort Thomas & Independence' ); ?>
    </div>

    <h1 class="hero-h1">
      <?php
      $hero_title    = get_field('hero_title')    ?: 'Your first visit,';
      $hero_title_em = get_field('hero_title_em') ?: 'made simple.';
      echo esc_html($hero_title) . ' <em>' . esc_html($hero_title_em) . '</em>';
      ?>
    </h1>

    <p class="hero-body">
      <?php echo esc_html( get_field('hero_body') ?: 'We know a new vet visit can feel stressful. We\'ll take care of you and your pet from the start, with clear steps before your visit, a thoughtful appointment experience, and no surprises after.' ); ?>
    </p>

    <div class="hero-btns">
      <a href="#booking-options" class="btn-red">
        <?php echo esc_html( get_field('hero_btn_primary_label') ?: 'Book a New Patient Visit' ); ?>
      </a>
      <a href="#contact" class="btn-ghost">
        <?php echo esc_html( get_field('hero_btn_secondary_label') ?: 'Contact a Location' ); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>

    <div class="hero-stats">
      <div class="hstat">
        <span class="hstat-n"><?php echo esc_html( get_field('stat_1_value') ?: '30–45' ); ?></span>
        <span class="hstat-l"><?php echo esc_html( get_field('stat_1_label') ?: 'Minute first visit' ); ?></span>
      </div>
      <div class="hstat">
        <span class="hstat-n"><?php echo esc_html( get_field('stat_2_value') ?: 'Bring' ); ?></span>
        <span class="hstat-l"><?php echo esc_html( get_field('stat_2_label') ?: 'Records if you have them' ); ?></span>
      </div>
      <div class="hstat">
        <span class="hstat-n"><?php echo esc_html( get_field('stat_3_value') ?: '2' ); ?></span>
        <span class="hstat-l"><?php echo esc_html( get_field('stat_3_label') ?: 'Locations serving NKY' ); ?></span>
      </div>
    </div>

  </div>

  <div class="hero-img">
    <?php if ($hero_image): ?>
      <img src="<?php echo esc_url($hero_image); ?>" alt="">
    <?php endif; ?>
  </div>
</section>

  <!-- ═══════════════════════════════════════════════════════════════════
       WHAT TO BRING
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--" id="what-to-bring">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('bring_eyebrow') ?: 'Before You Arrive' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('bring_heading') ?: 'What to bring to your first vet visit' ); ?></h2>

      <div class="np-info-box" style="margin-top:28px">
        <div class="np-steps" style="margin-top:0">

          <div class="np-step" style="padding-top:0">
            <div class="np-step-num">01</div>
            <div class="np-step-body">
              <div class="np-step-h"><?php echo esc_html( get_field('bring_step_1_title') ?: 'Completed forms' ); ?></div>
              <div class="np-step-p"><?php echo esc_html( get_field('bring_step_1_body') ?: 'Bring your registration form, plus the surgery packet if your pet is scheduled for a procedure.' ); ?></div>
            </div>
          </div>

          <div class="np-step">
            <div class="np-step-num">02</div>
            <div class="np-step-body">
              <div class="np-step-h"><?php echo esc_html( get_field('bring_step_2_title') ?: 'Medical records' ); ?></div>
              <div class="np-step-p"><?php echo esc_html( get_field('bring_step_2_body') ?: 'Vaccines, medications, prior exam notes, and anything from previous care if you already have it.' ); ?></div>
            </div>
          </div>

          <div class="np-step" style="border-bottom:none;padding-bottom:0">
            <div class="np-step-num">03</div>
            <div class="np-step-body">
              <div class="np-step-h"><?php echo esc_html( get_field('bring_step_3_title') ?: 'Your questions' ); ?></div>
              <div class="np-step-p"><?php echo esc_html( get_field('bring_step_3_body') ?: 'Changes in appetite, energy, behavior, mobility, skin, dental health, or bathroom habits are all helpful to mention.' ); ?></div>
            </div>
          </div>

        </div>
      </div>

      <p class="np-hero-note" style="margin-top:24px">
        <?php echo esc_html( get_field('bring_note') ?: 'Dogs should arrive on a leash, and cats should come in a secure carrier. Arriving a few minutes early helps everything feel easier.' ); ?>
      </p>

    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       BOOKING OPTIONS
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--white" id="booking-options">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('booking_eyebrow') ?: 'Book Your Appointment' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('booking_heading') ?: 'Choose the easiest way to book your new patient appointment.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('booking_body') ?: 'Whether you want to book online, call our team, or send a message first, every path gets you to the same next step: a scheduled first visit and completed new patient paperwork.' ); ?>
      </p>

      <div class="np-booking-grid">
        <article class="np-booking-card">
          <h3><?php echo esc_html( get_field('booking_card_1_title') ?: 'Book online now' ); ?></h3>
          <p><?php echo esc_html( get_field('booking_card_1_body') ?: 'Use our online scheduling software if you prefer to pick your appointment time yourself.' ); ?></p>
          <div class="np-booking-actions">
            <a class="btn-red" href="<?php echo esc_url( $request_appointment_url ); ?>">
              <?php echo esc_html( get_field('booking_card_1_cta') ?: 'Request Appointment Online' ); ?>
            </a>
          </div>
        </article>

        <article class="np-booking-card">
          <h3><?php echo esc_html( get_field('booking_card_2_title') ?: 'Call the clinic' ); ?></h3>
          <p><?php echo esc_html( get_field('booking_card_2_body') ?: 'Want help choosing a time or location? Call Fort Thomas or Independence and we will schedule your first visit for you.' ); ?></p>
          <div class="np-booking-actions">
            <a class="btn-ghost-solid" href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ft_phone ) ); ?>">
              <?php echo esc_html( get_field('ft_cta_label') ?: 'Call Fort Thomas' ); ?>
            </a>
            <a class="btn-ghost-solid" href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ind_phone ) ); ?>">
              <?php echo esc_html( get_field('ind_cta_label') ?: 'Call Independence' ); ?>
            </a>
          </div>
        </article>

        <article class="np-booking-card">
          <h3><?php echo esc_html( get_field('booking_card_3_title') ?: 'Fill out a contact form' ); ?></h3>
          <p><?php echo esc_html( get_field('booking_card_3_body') ?: 'Not ready to pick a time yet? Send a quick message and our local team will help with scheduling, paperwork, and next steps.' ); ?></p>
          <div class="np-booking-actions">
            <a class="btn-ghost-solid" href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">
              <?php echo esc_html( get_field('booking_card_3_cta') ?: 'Open Contact Form' ); ?>
            </a>
          </div>
        </article>
      </div>

      <div class="np-booking-note">
        <?php echo esc_html( get_field('booking_note') ?: 'We prioritize convenience for patients and pet parents: book online, call either clinic, or send our contact form and we will guide you. Our team is here to make getting started feel easy.' ); ?>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       STEP 1 · PREPARE (Forms)
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--white" id="prepare">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('prepare_eyebrow') ?: 'Step 1 · Prepare' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('prepare_heading') ?: 'A little prep now makes your visit smoother later.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('prepare_body') ?: 'Fill out the paperwork before you arrive so your appointment can focus on your pet, not the front desk. Choose the digital option if you want the easiest path, or download a paper copy to print and bring with you.' ); ?>
      </p>

      <div class="np-form-grid" style="margin-top:34px">

        <!-- Form Card 1 -->
        <article class="np-card">
          <span class="np-card-kicker"><?php echo esc_html( get_field('form1_kicker') ?: 'Required · All first visits' ); ?></span>
          <h3><?php echo esc_html( get_field('form1_title') ?: 'New Patient Registration Form' ); ?></h3>
          <p><?php echo esc_html( get_field('form1_description') ?: 'Complete this before your first appointment so we have your contact details, your pet\'s information, and the basics we need to welcome you properly.' ); ?></p>

          <div class="np-card-meta">
            <div class="np-card-meta-row">
              <span>Needed for</span>
              <strong><?php echo esc_html( get_field('form1_meta_needed') ?: 'All new patient appointments' ); ?></strong>
            </div>
            <div class="np-card-meta-row">
              <span>Recommended</span>
              <strong><?php echo esc_html( get_field('form1_meta_recommended') ?: 'Use the digital form first' ); ?></strong>
            </div>
            <div class="np-card-meta-row">
              <span>Paper option</span>
              <strong><?php echo esc_html( get_field('form1_meta_paper') ?: 'Print and bring to check-in' ); ?></strong>
            </div>
          </div>

          <div class="np-card-actions">
            <a class="btn-red" href="<?php echo esc_url( $form_1_digital_url ); ?>">
              <?php echo esc_html( get_field('form1_btn_digital_label') ?: 'Access Digital Form' ); ?>
            </a>
            <a class="btn-ghost-solid" href="<?php echo esc_url( $form_1_paper_url ); ?>" target="_blank" rel="noopener">
              <?php echo esc_html( get_field('form1_btn_paper_label') ?: 'Download Paper Copy' ); ?>
            </a>
          </div>
        </article>

        <!-- Form Card 2 -->
        <article class="np-card">
          <span class="np-card-kicker"><?php echo esc_html( get_field('form2_kicker') ?: 'Required · Surgery patients only' ); ?></span>
          <h3><?php echo esc_html( get_field('form2_title') ?: 'Surgical Information Packet' ); ?></h3>
          <p><?php echo esc_html( get_field('form2_description') ?: 'If your pet is scheduled for surgery or a procedure, review the packet ahead of time and complete anything requested before your visit.' ); ?></p>

          <div class="np-card-meta">
            <div class="np-card-meta-row">
              <span>Needed for</span>
              <strong><?php echo esc_html( get_field('form2_meta_needed') ?: 'Surgery and procedure visits' ); ?></strong>
            </div>
            <div class="np-card-meta-row">
              <span>Recommended</span>
              <strong><?php echo esc_html( get_field('form2_meta_recommended') ?: 'Review digitally before your visit' ); ?></strong>
            </div>
            <div class="np-card-meta-row">
              <span>Paper option</span>
              <strong><?php echo esc_html( get_field('form2_meta_paper') ?: 'Download and print if needed' ); ?></strong>
            </div>
          </div>

          <div class="np-card-actions">
            <a class="btn-red" href="<?php echo esc_url( $form_2_digital_url ); ?>">
              <?php echo esc_html( get_field('form2_btn_digital_label') ?: 'Access Digital Form' ); ?>
            </a>
            <a class="btn-ghost-solid" href="<?php echo esc_url( $form_2_paper_url ); ?>" target="_blank" rel="noopener">
              <?php echo esc_html( get_field('form2_btn_paper_label') ?: 'Download Paper Copy' ); ?>
            </a>
          </div>
        </article>

      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       STEP 2 · VISIT
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--cream" id="visit">
    <div class="np-shell">
      <div class="np-inner">

        <div class="np-visit-stack">
          <div>
            <div class="sec-eye">
              <span class="sec-lbl"><?php echo esc_html( get_field('visit_eyebrow') ?: 'Step 2 · Visit' ); ?></span>
              <span class="sec-rule"></span>
            </div>
            <h2 class="sec-h2"><?php echo esc_html( get_field('visit_heading') ?: 'What your first appointment will feel like.' ); ?></h2>
            <p class="np-section-copy">
              <?php echo esc_html( get_field('visit_body') ?: 'Your first visit includes a full physical exam, time to talk through concerns, and clear recommendations for next steps. We want you to leave understanding what we saw, what it means, and what happens next.' ); ?>
            </p>
          </div>

          <div class="np-info-box">
            <h4><?php echo esc_html( get_field('visit_surgery_box_title') ?: 'If your pet is scheduled for surgery' ); ?></h4>
            <p class="np-step-p">
              <?php echo esc_html( get_field('visit_surgery_box_body') ?: 'Your veterinarian may recommend pre-anesthetic bloodwork or imaging depending on your pet\'s age and health. Before you leave, our team will review discharge instructions, medications if needed, what to watch for, and when to call.' ); ?>
            </p>
          </div>
        </div>

        <div class="np-steps">
          <?php
          $visit_steps = [
            [ 'num' => '01', 'title_field' => 'visit_step_1_title', 'body_field' => 'visit_step_1_body', 'default_title' => 'Check-in',       'default_body' => 'We confirm your paperwork, contact details, and any records you brought from previous providers.' ],
            [ 'num' => '02', 'title_field' => 'visit_step_2_title', 'body_field' => 'visit_step_2_body', 'default_title' => 'History review',  'default_body' => 'We talk through your pet\'s routine, symptoms, medications, prior care, and the questions most on your mind.' ],
            [ 'num' => '03', 'title_field' => 'visit_step_3_title', 'body_field' => 'visit_step_3_body', 'default_title' => 'Physical exam',   'default_body' => 'Your veterinarian performs a full exam and explains findings in clear language as you go.' ],
            [ 'num' => '04', 'title_field' => 'visit_step_4_title', 'body_field' => 'visit_step_4_body', 'default_title' => 'Recommendations', 'default_body' => 'We walk through care options, diagnostics, treatment plans, and any follow-up that makes sense.' ],
            [ 'num' => '05', 'title_field' => 'visit_step_5_title', 'body_field' => 'visit_step_5_body', 'default_title' => 'Checkout',        'default_body' => 'You leave with next steps, a clearer picture of your pet\'s health, and answers you can actually use.' ],
          ];
          foreach ( $visit_steps as $step ) : ?>
            <div class="np-step">
              <div class="np-step-num"><?php echo esc_html( $step['num'] ); ?></div>
              <div class="np-step-body">
                <div class="np-step-h"><?php echo esc_html( get_field( $step['title_field'] ) ?: $step['default_title'] ); ?></div>
                <div class="np-step-p"><?php echo esc_html( get_field( $step['body_field'] )  ?: $step['default_body'] ); ?></div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>

      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       SERVICES
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--white" id="services">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('services_eyebrow') ?: 'Our Services' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('services_heading') ?: 'Everything your pet needs under one roof.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('services_body') ?: 'From routine wellness to surgery and urgent care, our team provides the full range of veterinary services for dogs and cats across Northern Kentucky.' ); ?>
      </p>

      <?php
      /* ── Build services list from numbered ACF fields, falling back to hardcoded array ── */
      $acf_services = [];
      for ( $i = 1; $i <= 6; $i++ ) {
          $t = get_field( "service_{$i}_title" );
          if ( $t ) {
              $acf_services[] = [
                  'icon_key' => get_field( "service_{$i}_icon_key" ) ?: 'default',
                  'title'    => $t,
                  'desc'     => get_field( "service_{$i}_body" )     ?: '',
                  'url'      => get_field( "service_{$i}_url" )      ?: '#',
                  'cta'      => get_field( "service_{$i}_cta" )      ?: 'Learn More',
              ];
          }
      }
      $render_services = $acf_services ?: $services_fallback;
      ?>

      <div class="np-services-grid">
        <?php foreach ( $render_services as $svc ) :
          $icon_key = $svc['icon_key'] ?? 'default';
          $icon_svg = $service_icon_map[ $icon_key ] ?? $service_icon_map['default'];
        ?>
          <a class="np-service-card" href="<?php echo esc_url( $svc['url'] ?? '#' ); ?>">
            <div class="np-service-icon"><?php echo $icon_svg; ?></div>
            <h3><?php echo esc_html( $svc['title'] ?? '' ); ?></h3>
            <p><?php echo esc_html( $svc['desc'] ?? '' ); ?></p>
            <span class="np-service-cta">
              <?php echo esc_html( $svc['cta'] ?? 'Learn More' ); ?>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        <?php endforeach; ?>
      </div>

      <?php if ( get_field('services_all_url') || get_field('services_all_label') ) : ?>
        <div class="np-services-footer">
          <a href="<?php echo esc_url( get_field('services_all_url') ?: '/services/' ); ?>" class="btn-ghost-solid">
            <?php echo esc_html( get_field('services_all_label') ?: 'View All Services' ); ?>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      <?php else : ?>
        <div class="np-services-footer">
          <a href="/services/" class="btn-ghost-solid">
            View All Services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      <?php endif; ?>

    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       TESTIMONIALS
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--cream" id="testimonials">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('testimonials_eyebrow') ?: 'What Clients Say' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('testimonials_heading') ?: 'Heard from families just like yours.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('testimonials_body') ?: 'Real feedback from Northern Kentucky pet owners who brought their animals in for the first time.' ); ?>
      </p>

      <?php
      /* ── Build testimonials from numbered ACF fields, falling back to hardcoded array ── */
      $acf_testimonials = [];
      for ( $i = 1; $i <= 3; $i++ ) {
          $q = get_field( "testimonial_{$i}_quote" );
          if ( $q ) {
              $acf_testimonials[] = [
                  'quote'    => $q,
                  'author'   => get_field( "testimonial_{$i}_author" )   ?: '',
                  'location' => get_field( "testimonial_{$i}_location" ) ?: '',
                  'stars'    => 5,
              ];
          }
      }
      $render_testimonials = $acf_testimonials ?: $testimonials_fallback;
      ?>

      <div class="np-testimonials-grid">
        <?php foreach ( $render_testimonials as $t ) :
          $stars = intval( $t['stars'] ?? 5 );
        ?>
          <div class="np-testimonial-card">
            <div class="np-stars">
              <?php for ( $i = 0; $i < $stars; $i++ ) : ?>
                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <?php endfor; ?>
            </div>
            <p class="np-testimonial-quote"><?php echo esc_html( $t['quote'] ?? '' ); ?></p>
            <div class="np-testimonial-meta">
              <span class="np-testimonial-author"><?php echo esc_html( $t['author'] ?? '' ); ?></span>
              <?php if ( ! empty( $t['location'] ) ) : ?>
                <span class="np-testimonial-location"><?php echo esc_html( $t['location'] ); ?></span>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       STEP 3 · AFTER (Payment)
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--white" id="after">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('pay_eyebrow') ?: 'Step 3 · After' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('pay_heading') ?: 'Payment options before your visit.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('pay_body') ?: 'Payment is due at the time of service. We accept several payment methods, and we can help you understand financing or reimbursement options before you leave.' ); ?>
      </p>

      <div class="np-pay-intro">
        <div class="np-pay-summary">
          <h3><?php echo esc_html( get_field('pay_summary_title') ?: 'What to expect when it is time to pay' ); ?></h3>
          <p><?php echo esc_html( get_field('pay_summary_body') ?: 'Most visits are simple at checkout. Standard payment methods are accepted at the time of service, and additional support may be available for larger or unexpected expenses.' ); ?></p>
        </div>

        <div class="np-pay-grid" style="margin-top:22px">

          <!-- Accepted Payments -->
          <article class="np-card np-pay-card">
            <h3><?php echo esc_html( get_field('pay_card1_title') ?: 'Accepted payments' ); ?></h3>
            <p><?php echo esc_html( get_field('pay_card1_body') ?: 'We accept the standard payment methods most clients expect at checkout.' ); ?></p>

            <ul class="np-pay-list">
              <li><strong><?php echo esc_html( get_field('pay_method_1_label') ?: 'Cash and checks' ); ?></strong> <?php echo esc_html( get_field('pay_method_1_note') ?: 'are accepted.' ); ?></li>
              <li><strong><?php echo esc_html( get_field('pay_method_2_label') ?: 'Debit cards' ); ?></strong> <?php echo esc_html( get_field('pay_method_2_note') ?: 'are accepted.' ); ?></li>
              <li><strong><?php echo esc_html( get_field('pay_method_3_label') ?: 'Major credit cards' ); ?></strong> <?php echo esc_html( get_field('pay_method_3_note') ?: 'including Visa, Mastercard, Discover, and Amex are accepted.' ); ?></li>
            </ul>
          </article>

          <!-- Flexibility Card -->
          <article class="np-card np-pay-card">
            <h3><?php echo esc_html( get_field('pay_card2_title') ?: 'Need more flexibility?' ); ?></h3>
            <p><?php echo esc_html( get_field('pay_card2_body') ?: 'For larger balances or unexpected care, there may be options that help make payment more manageable.' ); ?></p>

            <ul class="np-pay-list">
              <li><strong><?php echo esc_html( get_field('pay_flex_1_label') ?: 'CareCredit' ); ?></strong> <?php echo esc_html( get_field('pay_flex_1_note') ?: 'can help break larger balances into monthly payments for diagnostics, treatment, or surgery-related costs.' ); ?></li>
              <li><strong><?php echo esc_html( get_field('pay_flex_2_label') ?: 'Pet insurance' ); ?></strong> <?php echo esc_html( get_field('pay_flex_2_note') ?: 'clients can request documentation for reimbursement, depending on their provider and plan.' ); ?></li>
            </ul>

            <a class="np-pay-link"
               href="<?php echo esc_url( get_field('pay_flex_link_url') ?: 'https://www.carecredit.com/' ); ?>"
               target="_blank" rel="noopener">
              <?php echo esc_html( get_field('pay_flex_link_label') ?: 'Learn about CareCredit' ); ?>
            </a>
          </article>

        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       CONTACT · Locations
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--warm" id="contact">
    <div class="np-shell">

      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('contact_eyebrow') ?: 'Contact' ); ?></span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2"><?php echo esc_html( get_field('contact_heading') ?: 'Choose the location that works best for you.' ); ?></h2>

      <p class="np-section-copy">
        <?php echo esc_html( get_field('contact_body') ?: 'Call either location with questions about your first visit, forms, records, or scheduling.' ); ?>
      </p>

      <div class="np-contact-grid" style="margin-top:34px">

        <!-- Fort Thomas -->
        <article class="np-loc-card">
          <iframe
            class="np-map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=<?php echo esc_attr( $ft_map_query ); ?>&output=embed">
          </iframe>
          <div class="np-loc-body">
            <h3><?php echo esc_html( get_field('ft_location_name') ?: 'Fort Thomas' ); ?></h3>
            <p>
              <?php echo esc_html( $ft_address ); ?><br>
              <?php echo esc_html( $ft_phone ); ?>
            </p>
            <a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ft_phone ) ); ?>">
              <?php echo esc_html( get_field('ft_cta_label') ?: 'Call Fort Thomas' ); ?>
            </a>
          </div>
        </article>

        <!-- Independence -->
        <article class="np-loc-card">
          <iframe
            class="np-map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=<?php echo esc_attr( $ind_map_query ); ?>&output=embed">
          </iframe>
          <div class="np-loc-body">
            <h3><?php echo esc_html( get_field('ind_location_name') ?: 'Independence' ); ?></h3>
            <p>
              <?php echo esc_html( $ind_address ); ?><br>
              <?php echo esc_html( $ind_phone ); ?>
            </p>
            <a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ind_phone ) ); ?>">
              <?php echo esc_html( get_field('ind_cta_label') ?: 'Call Independence' ); ?>
            </a>
          </div>
        </article>

      </div>

      <div class="np-contact-form-wrap">
        <h3><?php echo esc_html( get_field('contact_form_heading') ?: 'Prefer to send a message first?' ); ?></h3>
        <p class="np-section-copy" style="margin-top:8px">
          <?php echo esc_html( get_field('contact_form_body') ?: 'Fill out the contact form and our team will help you schedule a new patient appointment, answer paperwork questions, or guide you to the right booking option.' ); ?>
        </p>
        <?php if ( ! empty( $contact_form_shortcode ) ) : ?>
          <div class="np-contact-form-shortcode" style="margin-top:20px">
            <?php echo do_shortcode( $contact_form_shortcode ); ?>
          </div>
        <?php else : ?>
          <div class="np-booking-actions" style="margin-top:20px">
            <a class="btn-red" href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">
              <?php echo esc_html( get_field('contact_form_fallback_cta') ?: 'Open Contact Form' ); ?>
            </a>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       FINAL CONTACT CTA
  ════════════════════════════════════════════════════════════════════ -->
  <section class="np-sec np-sec--white" id="new-patient-help">
    <div class="np-shell">
      <div class="np-contact-form-wrap" style="margin-top:0">
        <div class="sec-eye">
          <span class="sec-lbl"><?php echo esc_html( get_field('final_cta_eyebrow') ?: 'Need Help Getting Started?' ); ?></span>
          <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2" style="margin-top:8px"><?php echo esc_html( get_field('final_cta_heading') ?: 'Book online, call, or fill out our contact form — we are here to help.' ); ?></h2>
        <p class="np-section-copy" style="margin-top:12px">
          <?php echo esc_html( get_field('final_cta_body') ?: 'Once your appointment is requested or scheduled, please complete the New Patient Registration Form before your visit unless you are already an existing patient. If anything feels unclear, call Fort Thomas or Independence, or use our contact form. We value ease, clear communication, and a warm welcome for every family.' ); ?>
        </p>

        <div class="np-booking-actions" style="margin-top:18px">
          <a class="btn-red" href="<?php echo esc_url( $request_appointment_url ); ?>">
            <?php echo esc_html( get_field('final_cta_form_btn') ?: 'Book Online' ); ?>
          </a>
          <a class="btn-ghost-solid" href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ft_phone ) ); ?>">
            <?php echo esc_html( get_field('ft_cta_label') ?: 'Call Fort Thomas' ); ?>
          </a>
          <a class="btn-ghost-solid" href="tel:<?php echo esc_attr( preg_replace( '/[^0-9\+]/', '', $ind_phone ) ); ?>">
            <?php echo esc_html( get_field('ind_cta_label') ?: 'Call Independence' ); ?>
          </a>
        </div>

        <div class="np-booking-actions" style="margin-top:10px">
          <a class="btn-ghost-solid" href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">
            Fill Out Contact Form
          </a>
        </div>

        <?php if ( ! empty( $contact_form_shortcode ) ) : ?>
          <div class="np-contact-form-shortcode" style="margin-top:20px">
            <?php echo do_shortcode( $contact_form_shortcode ); ?>
          </div>
        <?php else : ?>
          <div class="np-booking-actions" style="margin-top:20px">
            <a class="btn-red" href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">
              <?php echo esc_html( get_field('contact_form_fallback_cta') ?: 'Open Contact Form' ); ?>
            </a>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <section class="np-sec np-sec--cream" id="new-patient-convenience">
    <div class="np-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('conv_eyebrow') ?: 'Convenience First' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('conv_heading') ?: 'Designed to make veterinary care easier for busy Northern Kentucky families.' ); ?></h2>
      <div class="np-seo-grid">
        <article class="np-seo-card">
          <h3><?php echo esc_html( get_field('conv_card1_title') ?: 'Practical options that save time' ); ?></h3>
          <?php
          $c1 = get_field('conv_card1_body');
          if ( $c1 ) {
              echo wp_kses_post( $c1 );
          } else { ?>
            <p>We prioritize convenience for patients and pet owners with online booking, friendly phone support, and a contact form for quick questions. You can request visits digitally, call either location for real-time help, or message our team and we will guide you to the right next step.</p>
            <ul class="np-seo-list">
              <li><strong>Online pharmacy available:</strong> request refills and have medications delivered when eligible.</li>
              <li><strong>Drop-off appointments available:</strong> ask our team if a drop-off visit fits your schedule.</li>
              <li><strong>Two nearby locations:</strong> Fort Thomas and Independence appointments for dogs and cats.</li>
            </ul>
          <?php } ?>
        </article>
        <article class="np-seo-card">
          <h3><?php echo esc_html( get_field('conv_card2_title') ?: 'Local, independent, and relationship-focused' ); ?></h3>
          <?php
          $c2 = get_field('conv_card2_body');
          if ( $c2 ) {
              echo wp_kses_post( $c2 );
          } else { ?>
            <p>Veterinary Medical Center is locally owned and not corporate. Our doctors and support team live and work in the same communities we serve, and we focus on personalized care, transparent communication, and long-term relationships with each pet family.</p>
            <p>We frequently help new patients from Fort Thomas, Independence, Cold Spring, Highland Heights, Bellevue, Newport, Alexandria, Crestview Hills, and nearby Northern Kentucky neighborhoods. If you are comparing options for a local veterinarian, we are here to help.</p>
          <?php } ?>
        </article>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════
       RANK MATH SEO CONTENT AREA (visually hidden)
  ════════════════════════════════════════════════════════════════════ -->
  <div id="np-seo-content" aria-hidden="true">
    <?php
    if ( have_posts() ) :
      while ( have_posts() ) : the_post();
        the_content();
      endwhile;
    endif;
    ?>
  </div>

</div><!-- .np-page-wrap -->

<?php get_footer(); ?>
