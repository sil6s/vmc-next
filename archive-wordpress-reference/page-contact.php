<?php
/**
 * Template Name: Contact
 * Template Post Type: page
 */

get_header();

/* ── Contact info — ACF override, vmc_get fallback ─────────────── */
$ft_phone    = get_field('ft_phone')    ?: vmc_get('vmc_ft_phone',    '(859) 442-4420');
$ind_phone   = get_field('ind_phone')   ?: vmc_get('vmc_ind_phone',   '(859) 356-2242');
$ft_address  = get_field('ft_address')  ?: vmc_get('vmc_ft_address',  '2000 Memorial Parkway, Fort Thomas, KY 41075');
$ind_address = get_field('ind_address') ?: vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$ft_tel  = function_exists('vmc_phone_link') ? vmc_phone_link('ft')  : 'tel:+18594424420';
$ind_tel = function_exists('vmc_phone_link') ? vmc_phone_link('ind') : 'tel:+18593562242';

$contact_email          = get_field('contact_email')          ?: '';
$contact_form_shortcode = get_field('contact_form_shortcode') ?: '';

$ft_hours_weekday   = get_field('ft_hours_weekday')   ?: '7:30 am – 6:00 pm';
$ft_hours_saturday  = get_field('ft_hours_saturday')  ?: '8:00 am – 1:00 pm';
$ft_hours_sunday    = get_field('ft_hours_sunday')    ?: 'Closed';
$ind_hours_weekday  = get_field('ind_hours_weekday')  ?: '7:30 am – 6:00 pm';
$ind_hours_saturday = get_field('ind_hours_saturday') ?: '8:00 am – 1:00 pm';
$ind_hours_sunday   = get_field('ind_hours_sunday')   ?: 'Closed';

$ft_map_query  = rawurlencode( $ft_address );
$ind_map_query = rawurlencode( $ind_address );

/* ── Internal links ─────────────────────────────────────────────── */
$about_pg   = get_page_by_path('about');
$about_link = $about_pg ? get_permalink($about_pg) : home_url('/about/');

$np_pg   = get_page_by_path('first-vet-visit-northern-kentucky');
$np_link = $np_pg ? get_permalink($np_pg) : home_url('/first-vet-visit-northern-kentucky/');

/* ── LocalBusiness schema ───────────────────────────────────────── */
$schema = [
    '@context' => 'https://schema.org',
    '@type'    => 'VeterinaryService',
    'name'     => 'Veterinary Medical Center',
    'url'      => home_url('/'),
    'telephone' => preg_replace('/[^0-9+]/', '', $ft_phone),
    'priceRange' => '$$',
    'location'  => [
        [
            '@type'   => 'VeterinaryService',
            'name'    => 'Veterinary Medical Center – Fort Thomas',
            'address' => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '2000 Memorial Parkway',
                'addressLocality' => 'Fort Thomas',
                'addressRegion'   => 'KY',
                'postalCode'      => '41075',
                'addressCountry'  => 'US',
            ],
            'telephone' => preg_replace('/[^0-9+]/', '', $ft_phone),
            'openingHours' => ['Mo-Fr 07:30-18:00','Sa 08:00-13:00'],
        ],
        [
            '@type'   => 'VeterinaryService',
            'name'    => 'Veterinary Medical Center – Independence',
            'address' => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '4147 Madison Pike',
                'addressLocality' => 'Independence',
                'addressRegion'   => 'KY',
                'postalCode'      => '41051',
                'addressCountry'  => 'US',
            ],
            'telephone' => preg_replace('/[^0-9+]/', '', $ind_phone),
            'openingHours' => ['Mo-Fr 07:30-18:00','Sa 08:00-13:00'],
        ],
    ],
];

$faq_schema = [
    '@context'   => 'https://schema.org',
    '@type'      => 'FAQPage',
    'mainEntity' => [
        ['@type'=>'Question','name'=>'How do I contact Veterinary Medical Center in Fort Thomas?','acceptedAnswer'=>['@type'=>'Answer','text'=>'Call our Fort Thomas clinic at '.$ft_phone.' or use the contact form on this page. Our team reviews messages during business hours and follows up within one business day.']],
        ['@type'=>'Question','name'=>'How do I contact the VMC Independence location?','acceptedAnswer'=>['@type'=>'Answer','text'=>'Call our Independence location at '.$ind_phone.'. You can also reach both clinics through the contact form and specify which location you prefer.']],
        ['@type'=>'Question','name'=>'What are the clinic hours for Veterinary Medical Center?','acceptedAnswer'=>['@type'=>'Answer','text'=>'Both locations are open Monday through Friday '.$ft_hours_weekday.' and Saturday '.$ft_hours_saturday.'. Sunday hours vary — call ahead for current availability.']],
        ['@type'=>'Question','name'=>'Can I book an appointment online?','acceptedAnswer'=>['@type'=>'Answer','text'=>'Yes. Existing patients can book through our patient portal. New patients can start with our online booking request and complete registration before their visit.']],
        ['@type'=>'Question','name'=>'Is Veterinary Medical Center accepting new patients?','acceptedAnswer'=>['@type'=>'Answer','text'=>'Yes, both Fort Thomas and Independence locations welcome new patients. New families can start with our first visit guide or call either clinic to schedule.']],
        ['@type'=>'Question','name'=>'What is the best way to reach VMC for urgent concerns?','acceptedAnswer'=>['@type'=>'Answer','text'=>'For urgent pet health concerns, call the clinic directly rather than using the contact form. Same-day guidance is best handled by phone so our team can triage quickly.']],
    ],
];
?>

<script type="application/ld+json"><?php echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); ?></script>
<script type="application/ld+json"><?php echo wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); ?></script>

<style>
.contact-page{background:var(--cream)}

/* ── Hero ──────────────────────────────────────────────────── */
.contact-hero{background:var(--cream)}
.contact-hero .hero-h1{max-width:13ch;font-size:clamp(36px,4.5vw,62px)}
.contact-hero-side{display:flex;flex-direction:column;justify-content:center;padding:72px 52px 72px 24px;background:var(--warm)}
.contact-panel{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;box-shadow:0 20px 56px rgba(0,0,0,.06);padding:28px}
.contact-panel h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:26px;line-height:1.1;margin-bottom:16px}
.contact-panel-list{display:grid;gap:14px;margin-top:10px}
.contact-panel-item{display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:start;padding-bottom:14px;border-bottom:1px solid rgba(0,0,0,.08)}
.contact-panel-item:last-child{border-bottom:none;padding-bottom:0}
.contact-icon{width:40px;height:40px;border-radius:10px;background:var(--rglow);color:var(--red);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.contact-panel-item strong{display:block;margin-bottom:4px;font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--gold)}
.contact-panel-item span{display:block;font-size:14px;line-height:1.65;color:var(--mid)}
.contact-panel-item span a{color:var(--dark);font-weight:700;text-decoration:none;font-size:15px}
.contact-panel-item span a:hover{color:var(--red)}
.contact-panel-note{margin-top:16px;font-size:13px;line-height:1.7;color:var(--mid)}
.contact-panel-cta{margin-top:20px}
.contact-panel-cta .btn-red{width:100%;justify-content:center;display:flex}

/* ── Trust strip ───────────────────────────────────────────── */
.contact-trust-strip{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;padding:14px var(--pad);background:var(--dark)}
.contact-trust-chip{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:100px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);font-size:11.5px;font-weight:700;letter-spacing:.04em}
.contact-trust-chip svg{color:var(--gold)}

/* ── Shared band ───────────────────────────────────────────── */
.contact-band{padding:88px 0}
.contact-shell{width:min(1280px,calc(100% - var(--pad)*2));margin:0 auto}
.contact-copy{margin-top:14px;max-width:760px;font-size:15px;line-height:1.85;color:var(--mid)}

/* ── Form section ──────────────────────────────────────────── */
.contact-form-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:24px;margin-top:34px}
.contact-form-card,.contact-mini-card{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;box-shadow:0 20px 56px rgba(0,0,0,.06);padding:30px}
.contact-form-card h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:28px;line-height:1.08;margin-bottom:12px}
.contact-form-card p,.contact-mini-card p{font-size:14px;line-height:1.8;color:var(--mid)}
.contact-mini-stack{display:grid;gap:18px}
.contact-mini-card h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:22px;line-height:1.1;margin-bottom:10px}
.contact-mini-card .contact-icon{width:36px;height:36px;border-radius:8px;margin-bottom:12px}
.contact-fallback-form{margin-top:22px}
.contact-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.contact-field{display:flex;flex-direction:column;gap:8px}
.contact-field-full{grid-column:1 / -1}
.contact-field label{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.contact-field input,.contact-field textarea,.contact-field select{width:100%;border:1px solid rgba(0,0,0,.12);background:var(--cream);color:var(--dark);border-radius:6px;padding:14px;font:inherit}
.contact-field textarea{min-height:160px;resize:vertical}
.contact-form-actions{margin-top:18px}

/* ── Hours ─────────────────────────────────────────────────── */
.contact-hours-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:34px}
.contact-hours-card{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;padding:28px;box-shadow:0 20px 56px rgba(0,0,0,.06)}
.contact-hours-card h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:26px;margin-bottom:16px}
.contact-hours-list{display:grid;gap:10px}
.contact-hours-row{display:flex;justify-content:space-between;gap:20px;padding-bottom:10px;border-bottom:1px solid rgba(0,0,0,.08)}
.contact-hours-row:last-child{border-bottom:none;padding-bottom:0}
.contact-hours-row span{font-size:14px;line-height:1.6;color:var(--mid)}
.contact-hours-row strong{font-size:14px;line-height:1.6;color:var(--dark);text-align:right}
.contact-hours-note{margin-top:18px;font-size:13px;color:var(--mid);line-height:1.7;padding:12px 14px;background:var(--cream);border-radius:6px}

/* ── Locations ─────────────────────────────────────────────── */
.contact-location-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:34px}
.contact-loc-card{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;box-shadow:0 20px 56px rgba(0,0,0,.06);overflow:hidden}
.contact-map{width:100%;height:280px;border:0;display:block;background:var(--warm)}
.contact-loc-body{padding:28px}
.contact-loc-card h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:24px;margin-bottom:8px}
.contact-loc-card p{font-size:14px;line-height:1.75;color:var(--mid);margin-bottom:4px}
.contact-loc-phone{display:block;font-size:18px;font-weight:700;color:var(--dark);margin:10px 0 16px;text-decoration:none;letter-spacing:-.01em}
.contact-loc-phone:hover{color:var(--red)}
.contact-loc-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(0,0,0,.07)}
.contact-loc-actions .btn-red{font-size:13px;padding:10px 18px}
.contact-loc-dir{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--mid);text-decoration:none;padding:10px 0}
.contact-loc-dir:hover{color:var(--red)}
.contact-all-locs{margin-top:28px;text-align:center}
.contact-all-locs a{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--red);text-decoration:none}
.contact-all-locs a:hover{text-decoration:underline}
.contact-all-locs a svg{transition:transform .2s}
.contact-all-locs a:hover svg{transform:translateX(3px)}

/* ── Why VMC / SEO section ─────────────────────────────────── */
.contact-why-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:32px}
.contact-why-card{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;padding:26px;box-shadow:0 8px 28px rgba(0,0,0,.05)}
.contact-why-card .contact-icon{margin-bottom:14px}
.contact-why-card h3{font-family:'Playfair Display',serif;color:var(--dark);font-size:19px;margin-bottom:8px}
.contact-why-card p{font-size:13.5px;line-height:1.78;color:var(--mid);margin:0}

/* SEO body content (the_content) */
.contact-seo-content{margin-top:44px;font-size:15px;line-height:1.85;color:var(--mid)}
.contact-seo-content h2,.contact-seo-content h3,.contact-seo-content h4{font-family:'Playfair Display',serif;color:var(--dark)}
.contact-seo-content h2{font-size:clamp(1.4rem,2.4vw,1.9rem);margin:36px 0 12px}
.contact-seo-content h3{font-size:1.15rem;margin:24px 0 8px}
.contact-seo-content p{margin-bottom:18px}
.contact-seo-content a{color:var(--red);font-weight:700}
.contact-seo-content > *:first-child{margin-top:0}

/* ── FAQ ───────────────────────────────────────────────────── */
.contact-faq-grid{display:grid;gap:12px;margin-top:36px}
.contact-faq-item{background:var(--white);border:1px solid rgba(0,0,0,.07);border-radius:8px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.04)}
.contact-faq-q{width:100%;border:0;background:transparent;text-align:left;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;font:inherit;font-size:15px;font-weight:700;color:var(--dark);cursor:pointer}
.contact-faq-arrow{flex-shrink:0;transition:transform .22s ease;color:var(--red);font-size:18px}
.contact-faq-a{display:none;padding:0 22px 18px;font-size:14.5px;line-height:1.8;color:var(--mid)}
.contact-faq-item.open .contact-faq-a{display:block}
.contact-faq-item.open .contact-faq-arrow{transform:rotate(180deg)}

/* ── Final CTA ─────────────────────────────────────────────── */
.contact-cta-box{background:var(--dark);border-radius:8px;padding:52px 48px;position:relative;overflow:hidden}
.contact-cta-box::before{content:'';position:absolute;top:-60px;right:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(169,27,27,.18) 0%,transparent 70%);pointer-events:none}
.contact-cta-box h3{font-family:'Playfair Display',serif;color:#fff;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.1;margin-bottom:12px}
.contact-cta-box p{max-width:640px;font-size:15px;line-height:1.85;color:rgba(255,255,255,.65)}
.contact-cta-btns{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px;align-items:center;position:relative;z-index:1}
.contact-cta-ghost{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:rgba(255,255,255,.7);text-decoration:none;transition:color .2s}
.contact-cta-ghost:hover{color:#fff}
.contact-cta-ghost svg{transition:transform .2s}
.contact-cta-ghost:hover svg{transform:translateX(3px)}

/* ── Responsive ────────────────────────────────────────────── */
@media(max-width:1100px){
  .contact-form-grid,.contact-hours-grid,.contact-location-grid,.contact-why-grid{grid-template-columns:1fr}
}
@media(max-width:900px){
  .contact-hero-side{padding:28px 24px}
  .contact-band{padding:60px 24px}
  .contact-shell{width:100%}
  .contact-field-grid{grid-template-columns:1fr}
  .contact-map{height:220px}
  .contact-cta-btns{flex-direction:column;align-items:flex-start}
  .contact-cta-box{padding:36px 28px}
  .contact-trust-strip{justify-content:flex-start;padding:14px 24px}
}
</style>

<div class="contact-page">

  <?php /* ══════════════════ HERO ══════════════════ */ ?>
  <section class="hero contact-hero">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="eyebrow-dash"></span>
        <?php echo esc_html( get_field('hero_eyebrow') ?: 'Fort Thomas &amp; Independence' ); ?>
      </div>

      <h1 class="hero-h1">
        <?php echo esc_html( get_field('hero_title_line_1') ?: 'Contact Veterinary Medical Center' ); ?>
        <?php if ( get_field('hero_title_emphasis') ) : ?>
          <em><?php the_field('hero_title_emphasis'); ?></em>
        <?php endif; ?>
      </h1>

      <p class="hero-body">
        <?php echo esc_html( get_field('hero_body') ?: 'Two locally owned Northern Kentucky clinics — in Fort Thomas and Independence — ready to help with appointments, questions, and same-day guidance for your pet.' ); ?>
      </p>

      <div class="hero-btns">
        <a href="<?php echo esc_url($about_link); ?>" class="btn-red" onclick="openAptModal('contact-hero'); return false;">
          <?php echo esc_html( get_field('hero_button_1_text') ?: 'Book an Appointment' ); ?>
        </a>
        <a href="<?php echo esc_url($about_link); ?>" class="btn-ghost">
          <?php echo esc_html( get_field('hero_button_2_text') ?: 'View Our Locations' ); ?>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div class="hero-stats">
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('hero_stat_1_number') ?: '2' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('hero_stat_1_label') ?: 'NKY Locations' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('hero_stat_2_number') ?: '1 Day' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('hero_stat_2_label') ?: 'Form Reply Time' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('hero_stat_3_number') ?: '100%' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('hero_stat_3_label') ?: 'Locally Owned' ); ?></span>
        </div>
      </div>
    </div>

    <aside class="contact-hero-side">
      <div class="contact-panel">
        <h3><?php echo esc_html( get_field('quick_contact_heading') ?: 'Reach us directly' ); ?></h3>

        <div class="contact-panel-list">
          <div class="contact-panel-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.2a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <strong><?php echo esc_html( get_field('quick_contact_ft_label') ?: 'Fort Thomas' ); ?></strong>
              <span><a href="<?php echo esc_url($ft_tel); ?>"><?php echo esc_html($ft_phone); ?></a></span>
            </div>
          </div>

          <div class="contact-panel-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.2a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <strong><?php echo esc_html( get_field('quick_contact_ind_label') ?: 'Independence' ); ?></strong>
              <span><a href="<?php echo esc_url($ind_tel); ?>"><?php echo esc_html($ind_phone); ?></a></span>
            </div>
          </div>

          <?php if ( $contact_email ) : ?>
          <div class="contact-panel-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            </div>
            <div>
              <strong><?php echo esc_html( get_field('quick_contact_email_label') ?: 'Email' ); ?></strong>
              <span><a href="mailto:<?php echo antispambot(esc_attr($contact_email)); ?>"><?php echo esc_html(antispambot($contact_email)); ?></a></span>
            </div>
          </div>
          <?php endif; ?>

          <div class="contact-panel-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
            </div>
            <div>
              <strong><?php echo esc_html( get_field('quick_contact_hours_label') ?: 'Hours' ); ?></strong>
              <span><?php echo esc_html( get_field('quick_contact_hours_text') ?: 'Mon–Fri '.$ft_hours_weekday.' · Sat '.$ft_hours_saturday ); ?></span>
            </div>
          </div>
        </div>

        <p class="contact-panel-note"><?php echo esc_html( get_field('quick_contact_note') ?: 'For urgent concerns, please call directly — form replies take up to one business day.' ); ?></p>

        <div class="contact-panel-cta">
          <a href="#contact-form" class="btn-red" onclick="openAptModal('contact-panel'); return false;">Request an Appointment</a>
        </div>
      </div>
    </aside>
  </section>

  <?php /* ══════════════════ TRUST STRIP ══════════════════ */ ?>
  <div class="contact-trust-strip">
    <span class="contact-trust-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Independently owned &amp; operated
    </span>
    <span class="contact-trust-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      2 Northern Kentucky locations
    </span>
    <span class="contact-trust-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Same-day guidance by phone
    </span>
    <span class="contact-trust-chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Welcoming new patients now
    </span>
  </div>

  <?php /* ══════════════════ CONTACT FORM ══════════════════ */ ?>
  <section class="contact-band" id="contact-form" style="background:var(--white)">
    <div class="contact-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('form_section_eyebrow') ?: 'Send a Message' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('form_section_heading') ?: 'We reply within one business day.' ); ?></h2>
      <p class="contact-copy"><?php echo esc_html( get_field('form_section_intro') ?: 'Use the form below for general questions, appointment requests, or medication inquiries. For urgent concerns, call either clinic directly so we can help faster.' ); ?></p>

      <div class="contact-form-grid">
        <article class="contact-form-card">
          <h3><?php echo esc_html( get_field('form_card_heading') ?: 'Contact Fort Thomas or Independence' ); ?></h3>
          <p><?php echo esc_html( get_field('form_card_description') ?: 'Tell us your pet\'s name, what you need help with, and which location works best. We\'ll match you with the right team.' ); ?></p>

          <?php if ( $contact_form_shortcode ) : ?>
            <div style="margin-top:22px"><?php echo do_shortcode( $contact_form_shortcode ); ?></div>
          <?php else : ?>
            <form class="contact-fallback-form" method="post" action="#">
              <div class="contact-field-grid">
                <div class="contact-field">
                  <label for="contact-name"><?php echo esc_html( get_field('fallback_name_label') ?: 'Your Name' ); ?></label>
                  <input id="contact-name" name="contact_name" type="text" placeholder="<?php echo esc_attr( get_field('fallback_name_placeholder') ?: 'Jane Smith' ); ?>">
                </div>
                <div class="contact-field">
                  <label for="contact-email"><?php echo esc_html( get_field('fallback_email_label') ?: 'Email Address' ); ?></label>
                  <input id="contact-email" name="contact_email" type="email" placeholder="<?php echo esc_attr( get_field('fallback_email_placeholder') ?: 'jane@email.com' ); ?>">
                </div>
                <div class="contact-field">
                  <label for="contact-phone"><?php echo esc_html( get_field('fallback_phone_label') ?: 'Phone Number' ); ?></label>
                  <input id="contact-phone" name="contact_phone" type="tel" placeholder="<?php echo esc_attr( get_field('fallback_phone_placeholder') ?: '(859) 000-0000' ); ?>">
                </div>
                <div class="contact-field">
                  <label for="contact-location"><?php echo esc_html( get_field('fallback_location_label') ?: 'Preferred Location' ); ?></label>
                  <select id="contact-location" name="contact_location">
                    <option value=""><?php echo esc_html( get_field('fallback_location_option_default') ?: 'Choose a location…' ); ?></option>
                    <option value="fort-thomas"><?php echo esc_html( get_field('fallback_location_option_ft') ?: 'Fort Thomas' ); ?></option>
                    <option value="independence"><?php echo esc_html( get_field('fallback_location_option_ind') ?: 'Independence' ); ?></option>
                    <option value="either"><?php echo esc_html( get_field('fallback_location_option_either') ?: 'Either location' ); ?></option>
                  </select>
                </div>
                <div class="contact-field contact-field-full">
                  <label for="contact-message"><?php echo esc_html( get_field('fallback_message_label') ?: 'How can we help?' ); ?></label>
                  <textarea id="contact-message" name="contact_message" placeholder="<?php echo esc_attr( get_field('fallback_message_placeholder') ?: 'Tell us about your pet and what you need…' ); ?>"></textarea>
                </div>
              </div>
              <div class="contact-form-actions">
                <button type="submit" class="btn-red"><?php echo esc_html( get_field('fallback_submit_text') ?: 'Send Message' ); ?></button>
              </div>
            </form>
          <?php endif; ?>
        </article>

        <div class="contact-mini-stack">
          <article class="contact-mini-card">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
            </div>
            <h3><?php echo esc_html( get_field('mini_card_1_heading') ?: 'Form replies in 1 business day' ); ?></h3>
            <p><?php echo esc_html( get_field('mini_card_1_body') ?: 'We review all messages during regular business hours. For same-day needs or urgent concerns, calling directly is always faster.' ); ?></p>
          </article>

          <article class="contact-mini-card">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
            <h3><?php echo esc_html( get_field('mini_card_2_heading') ?: 'Two clinics serving Northern Kentucky' ); ?></h3>
            <p><?php echo esc_html( get_field('mini_card_2_body') ?: 'Fort Thomas and Independence locations serve families across NKY and the Cincinnati area. Specify which clinic works best when you reach out.' ); ?></p>
          </article>

          <article class="contact-mini-card">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3><?php echo esc_html( get_field('mini_card_3_heading') ?: 'Welcoming new patients' ); ?></h3>
            <p><?php echo esc_html( get_field('mini_card_3_body') ?: 'Both locations are accepting new patients. New families are encouraged to start with our first visit guide or simply give us a call to get started.' ); ?></p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <?php /* ══════════════════ HOURS ══════════════════ */ ?>
  <section class="contact-band" style="background:var(--cream)">
    <div class="contact-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('hours_section_eyebrow') ?: 'Clinic Hours' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('hours_section_heading') ?: 'When you can reach us.' ); ?></h2>
      <p class="contact-copy"><?php echo esc_html( get_field('hours_section_intro') ?: 'Both clinics maintain similar schedules. Call directly for same-day needs or if your concern is urgent — do not wait for a form reply.' ); ?></p>

      <div class="contact-hours-grid">
        <article class="contact-hours-card">
          <h3><?php echo esc_html( get_field('ft_hours_heading') ?: 'Fort Thomas' ); ?></h3>
          <div class="contact-hours-list">
            <div class="contact-hours-row"><span>Monday</span><strong><?php echo esc_html($ft_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Tuesday</span><strong><?php echo esc_html($ft_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Wednesday</span><strong><?php echo esc_html($ft_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Thursday</span><strong><?php echo esc_html($ft_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Friday</span><strong><?php echo esc_html($ft_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Saturday</span><strong><?php echo esc_html($ft_hours_saturday); ?></strong></div>
            <div class="contact-hours-row"><span>Sunday</span><strong><?php echo esc_html($ft_hours_sunday); ?></strong></div>
          </div>
          <p class="contact-hours-note">Call <a href="<?php echo esc_url($ft_tel); ?>"><?php echo esc_html($ft_phone); ?></a> for same-day scheduling.</p>
        </article>

        <article class="contact-hours-card">
          <h3><?php echo esc_html( get_field('ind_hours_heading') ?: 'Independence' ); ?></h3>
          <div class="contact-hours-list">
            <div class="contact-hours-row"><span>Monday</span><strong><?php echo esc_html($ind_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Tuesday</span><strong><?php echo esc_html($ind_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Wednesday</span><strong><?php echo esc_html($ind_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Thursday</span><strong><?php echo esc_html($ind_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Friday</span><strong><?php echo esc_html($ind_hours_weekday); ?></strong></div>
            <div class="contact-hours-row"><span>Saturday</span><strong><?php echo esc_html($ind_hours_saturday); ?></strong></div>
            <div class="contact-hours-row"><span>Sunday</span><strong><?php echo esc_html($ind_hours_sunday); ?></strong></div>
          </div>
          <p class="contact-hours-note">Call <a href="<?php echo esc_url($ind_tel); ?>"><?php echo esc_html($ind_phone); ?></a> for same-day scheduling.</p>
        </article>
      </div>
    </div>
  </section>

  <?php /* ══════════════════ LOCATIONS ══════════════════ */ ?>
  <section class="contact-band" id="locations" style="background:var(--warm)">
    <div class="contact-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('locations_section_eyebrow') ?: 'Find Us' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('locations_section_heading') ?: 'Two locations across Northern Kentucky.' ); ?></h2>
      <p class="contact-copy"><?php echo esc_html( get_field('locations_section_intro') ?: 'Fort Thomas and Independence clinics serve families throughout NKY and the greater Cincinnati area. Both are independently owned and operated by the same local team.' ); ?></p>

      <div class="contact-location-grid">
        <article class="contact-loc-card">
          <iframe class="contact-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=<?php echo esc_attr($ft_map_query); ?>&z=15&output=embed"
            title="<?php echo esc_attr( get_field('ft_map_title') ?: 'Map to VMC Fort Thomas' ); ?>"></iframe>
          <div class="contact-loc-body">
            <h3><?php echo esc_html( get_field('ft_location_heading') ?: 'Fort Thomas' ); ?></h3>
            <p><?php echo esc_html($ft_address); ?></p>
            <a class="contact-loc-phone" href="<?php echo esc_url($ft_tel); ?>"><?php echo esc_html($ft_phone); ?></a>
            <div class="contact-loc-actions">
              <a class="btn-red" href="#contact-form" onclick="openAptModal('contact-loc-ft'); return false;">Request Appointment</a>
              <a class="contact-loc-dir" href="https://maps.google.com/?q=<?php echo esc_attr($ft_map_query); ?>" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Get Directions
              </a>
            </div>
          </div>
        </article>

        <article class="contact-loc-card">
          <iframe class="contact-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=<?php echo esc_attr($ind_map_query); ?>&z=15&output=embed"
            title="<?php echo esc_attr( get_field('ind_map_title') ?: 'Map to VMC Independence' ); ?>"></iframe>
          <div class="contact-loc-body">
            <h3><?php echo esc_html( get_field('ind_location_heading') ?: 'Independence' ); ?></h3>
            <p><?php echo esc_html($ind_address); ?></p>
            <a class="contact-loc-phone" href="<?php echo esc_url($ind_tel); ?>"><?php echo esc_html($ind_phone); ?></a>
            <div class="contact-loc-actions">
              <a class="btn-red" href="#contact-form" onclick="openAptModal('contact-loc-ind'); return false;">Request Appointment</a>
              <a class="contact-loc-dir" href="https://maps.google.com/?q=<?php echo esc_attr($ind_map_query); ?>" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Get Directions
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="contact-all-locs">
        <a href="<?php echo esc_url($about_link); ?>">
          View full location details &amp; clinic info
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  <?php /* ══════════════════ WHY VMC ══════════════════ */ ?>
  <section class="contact-band" style="background:var(--white)">
    <div class="contact-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('seo_section_eyebrow') ?: 'About VMC' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('seo_section_heading') ?: 'Veterinary care built around your family.' ); ?></h2>
      <p class="contact-copy"><?php echo esc_html( get_field('seo_section_intro') ?: 'Veterinary Medical Center has served Northern Kentucky families for years as an independently owned practice. No corporate playbook — just a local team focused on continuity and practical guidance.' ); ?></p>

      <div class="contact-why-grid">
        <div class="contact-why-card">
          <div class="contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <h3>Independently owned</h3>
          <p>VMC is locally owned and operated — decisions are made by the people who work here, not a distant corporate office. That means consistent care from a team that knows your pet.</p>
        </div>
        <div class="contact-why-card">
          <div class="contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          <h3>Convenient NKY locations</h3>
          <p>Fort Thomas and Independence are both easy to reach from across Northern Kentucky and the greater Cincinnati area. We'll help you find the location that fits your schedule.</p>
        </div>
        <div class="contact-why-card">
          <div class="contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.2a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h3>Same-day phone guidance</h3>
          <p>When your pet needs help now, call us. Both clinics offer same-day guidance by phone and can triage quickly when a concern can't wait for a scheduled appointment.</p>
        </div>
      </div>

      <?php
      if ( have_posts() ) :
        while ( have_posts() ) : the_post();
          $content = get_the_content();
          if ( $content ) :
      ?>
      <div class="contact-seo-content"><?php the_content(); ?></div>
      <?php
          else : ?>
      <div class="contact-seo-content">
        <h2>How to contact Veterinary Medical Center in Northern Kentucky</h2>
        <p>Veterinary Medical Center operates two full-service clinics in Fort Thomas and Independence, Kentucky. Whether you need to schedule a routine wellness visit, ask about a specific service, or get guidance on an urgent concern, both locations are equipped to help families across Northern Kentucky and the Cincinnati region.</p>
        <p>The fastest way to reach us for appointments and same-day questions is always a direct call. Use the contact form above for general questions, new patient inquiries, medication refill requests, or anything that doesn't require immediate attention — our team replies within one business day during regular clinic hours.</p>
        <h3>Reaching our Fort Thomas clinic</h3>
        <p>Our Fort Thomas location serves families throughout Highland Heights, Cold Spring, Newport, Bellevue, and surrounding communities. Call <?php echo esc_html($ft_phone); ?> to reach the Fort Thomas team directly. The clinic is located at <?php echo esc_html($ft_address); ?>.</p>
        <h3>Reaching our Independence clinic</h3>
        <p>The Independence location serves Boone County, Erlanger, Florence, Union, and nearby communities. Call <?php echo esc_html($ind_phone); ?> to reach the Independence team. The clinic is located at <?php echo esc_html($ind_address); ?>.</p>
        <h3>Online tools for existing patients</h3>
        <p>Existing patients can use our <a href="<?php echo esc_url( function_exists('vmc_patient_portal_page_url') ? vmc_patient_portal_page_url() : home_url('/patient-portal-online-booking/') ); ?>" onclick="openPortalModal('portal','contact-seo'); return false;">patient portal and online booking page</a> for appointment requests, records access, and account management. Medication refills can be requested through our <a href="<?php echo esc_url( function_exists('vmc_online_pharmacy_page_url') ? vmc_online_pharmacy_page_url() : home_url('/online-vet-pharmacy-northern-kentucky-cincinnati/') ); ?>" onclick="openPortalModal('pharmacy','contact-seo'); return false;">online pharmacy</a>.</p>
        <p>New patients are always welcome at both locations. Visit our <a href="<?php echo esc_url($np_link); ?>">first visit guide</a> to learn what to expect, or call either clinic to get started.</p>
      </div>
      <?php
          endif;
        endwhile;
      endif;
      ?>
    </div>
  </section>

  <?php /* ══════════════════ FAQ ══════════════════ */ ?>
  <section class="contact-band" style="background:var(--cream)">
    <div class="contact-shell">
      <div class="sec-eye">
        <span class="sec-lbl">FAQ</span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2">Common questions about contacting VMC.</h2>

      <div class="contact-faq-grid">
        <?php
        $faqs = [
            ['How do I book an appointment at Veterinary Medical Center?', 'Existing patients can book through the patient portal or by calling either clinic directly. New patients are welcome to call or submit the contact form — our team will walk you through next steps and get you scheduled.'],
            ['What is the fastest way to reach VMC for urgent pet concerns?', 'Call the clinic directly for urgent or same-day concerns. Fort Thomas: '.$ft_phone.'. Independence: '.$ind_phone.'. Phone calls allow our team to triage immediately rather than waiting on a form reply.'],
            ['Do you accept new patients at both locations?', 'Yes, both the Fort Thomas and Independence locations are currently accepting new patients. You can start by calling, submitting the contact form, or visiting our first vet visit guide to learn what to expect.'],
            ['How long does it take to hear back from the contact form?', 'Our team reviews contact form submissions during regular business hours and replies within one business day. For time-sensitive needs, calling the clinic is always the better option.'],
            ['Can I request a prescription refill through the contact form?', 'Yes. Note your pet\'s name, the medication, and your preferred location in the message field. For faster processing, use our online pharmacy which is connected directly to your veterinary care record.'],
            ['Which VMC location is closest to me?', 'Fort Thomas serves communities including Highland Heights, Cold Spring, Newport, and Bellevue. Independence serves Boone County, Erlanger, Florence, and Union. View the maps above or check our locations page for more detail.'],
        ];
        foreach ( $faqs as $f ) : ?>
        <div class="contact-faq-item">
          <button class="contact-faq-q" aria-expanded="false">
            <?php echo esc_html($f[0]); ?>
            <span class="contact-faq-arrow" aria-hidden="true">&#8964;</span>
          </button>
          <div class="contact-faq-a"><?php echo esc_html($f[1]); ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <?php /* ══════════════════ FINAL CTA ══════════════════ */ ?>
  <section class="contact-band" style="background:var(--white)">
    <div class="contact-shell">
      <div class="contact-cta-box">
        <div class="sec-eye" style="position:relative;z-index:1">
          <span class="sec-lbl" style="color:var(--gold)"><?php echo esc_html( get_field('cta_eyebrow') ?: 'Next Steps' ); ?></span>
          <span class="sec-rule" style="background:rgba(255,255,255,.15)"></span>
        </div>
        <h3><?php echo esc_html( get_field('cta_heading') ?: 'Ready to book or have a question?' ); ?></h3>
        <p><?php echo esc_html( get_field('cta_body') ?: 'Call either clinic, use the contact form above, or request an appointment online. Our team is here to help you take the next step — whether it\'s a first visit or ongoing care.' ); ?></p>
        <div class="contact-cta-btns">
          <a href="#contact-form" class="btn-red" onclick="openAptModal('contact-cta'); return false;">
            <?php echo esc_html( get_field('cta_button_1_text') ?: 'Book an Appointment' ); ?>
          </a>
          <a href="<?php echo esc_url($np_link); ?>" class="contact-cta-ghost">
            <?php echo esc_html( get_field('cta_button_2_text') ?: 'New patients start here' ); ?>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="<?php echo esc_url($about_link); ?>" class="contact-cta-ghost">
            View our locations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

</div>

<script>
(function(){
  document.querySelectorAll('.contact-faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = this.closest('.contact-faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.contact-faq-item.open').forEach(function(el){
        el.classList.remove('open');
        el.querySelector('.contact-faq-q').setAttribute('aria-expanded','false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded','true');
      }
    });
  });
})();
</script>

<?php get_footer(); ?>
