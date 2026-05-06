<?php
/**
 * Template Name: Services
 *
 * All visible copy is editable through ACF fields (registered in inc/acf-fields.php).
 * Add at least one paragraph block in the editor for Rank Math SEO analysis.
 */
get_header();

// Icon SVG map keyed by field value
$svc_icon_map = [
  'cross'   => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M2 12h20"/></svg>',
  'tooth'   => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3c2 0 2 3 4 3s2-3 4-3 2 3 4 3v5a8 8 0 0 1-16 0V6c2 0 2-3 4-3z"/></svg>',
  'scalpel' => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2l8 8-8 8-8-8z"/><path d="M6 10 2 14l8 8 4-4"/></svg>',
  'search'  => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>',
  'brain'   => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 9a3 3 0 1 1 6 0c0 3-3 3-3 6"/><circle cx="12" cy="17" r="1"/></svg>',
  'heart'   => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-7-11a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 6.65-7 11-7 11z"/></svg>',
  'default' => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
];

function vmc_svc_icon( $key, $map ) {
    return $map[$key] ?? $map['default'];
}

function vmc_svc_list_items( $text ) {
    $lines = array_filter( array_map( 'trim', explode( "\n", $text ) ) );
    foreach ( $lines as $line ) {
        echo '<li>' . esc_html($line) . '</li>';
    }
}
?>

<style>
.services-page {
  background: var(--cream);
}

/* Hero */
.services-hero {
  background: var(--cream);
}
.services-hero .hero-h1 {
  font-size: clamp(40px, 9vw, 48px);
}
.services-hero-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 72px 52px 72px 24px;
  background: var(--warm);
}

/* Sidebar panel */
.services-panel {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
  padding: 28px;
}
.services-panel h3 {
  font-size: 28px;
  line-height: 1.08;
  margin-bottom: 12px;
}
.services-panel-list {
  display: grid;
  gap: 14px;
  margin-top: 10px;
}
.services-panel-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.services-panel-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.services-panel-item strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--dark);
}
.services-panel-item span {
  display: block;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--mid);
}
.services-panel-note {
  margin-top: 16px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--mid);
}

/* Service grid cards */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 22px;
  margin-top: 34px;
}
.service-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
}
.service-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.service-card h3 {
  font-size: 26px;
  line-height: 1.08;
  margin: 0;
}
.service-card p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--mid);
}
.service-list {
  margin-top: 16px;
  padding: 0;
  list-style: none;
}
.service-list li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  font-size: 14px;
  line-height: 1.7;
  color: var(--mid);
}
.service-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.service-learn-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .02em;
  color: var(--red);
  text-decoration: none;
}
.service-learn-more svg {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
}
.service-learn-more:hover,
.service-learn-more:focus {
  text-decoration: underline;
}

/* Trust / highlight section */
.services-highlight-wrap {
  display: grid;
  grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr);
  gap: 26px;
  align-items: start;
}
.services-highlight {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 34px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
}
.services-highlight h3 {
  font-size: 32px;
  line-height: 1.08;
  margin-bottom: 12px;
}
.services-highlight p {
  max-width: 820px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--mid);
}
.services-points {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
.services-point {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 20px 56px rgba(0,0,0,.05);
}
.services-point strong {
  display: block;
  margin-bottom: 4px;
  color: var(--dark);
  font-size: 14px;
}
.services-point span {
  display: block;
  font-size: 13px;
  line-height: 1.65;
  color: var(--mid);
}

/* Appointments mini cards */
.services-mini-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 22px;
  margin-top: 34px;
}
.services-mini-card {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
}
.services-mini-card h3 {
  font-size: 28px;
  margin-bottom: 10px;
}
.services-mini-card p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--mid);
}
.services-link-card {
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 20px 56px rgba(0,0,0,.06);
}
.services-link-card h3 {
  font-size: 28px;
  margin-bottom: 10px;
}
.services-link-card p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--mid);
}
.services-link-card a {
  color: var(--red);
  font-weight: 700;
  text-decoration: none;
}
.services-link-card a:hover {
  text-decoration: underline;
}

/* Species pills */
.services-species {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.services-species span {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--white);
  border: 1px solid rgba(0,0,0,0.06);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .04em;
  color: var(--dark);
}

/* SEO body */
.services-seo-body {
  margin-top: 34px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--mid);
}
.services-seo-body h2,.services-seo-body h3 {
  font-family: 'Playfair Display', serif;
  color: var(--dark);
  margin: 24px 0 10px;
}

/* Responsive */
@media (max-width: 1100px) {
  .services-grid,
  .services-highlight-wrap,
  .services-mini-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 900px) {
  .services-hero-side {
    padding: 24px;
  }
}
</style>

<div class="services-page">

  <!-- ═══════════════════════════ HERO ═══════════════════════════ -->
  <section class="hero services-hero">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="eyebrow-dash"></span>
        <?php echo esc_html( get_field('svc_hero_eyebrow') ?: 'Veterinary Services' ); ?>
      </div>

      <h1 class="hero-h1">
        <?php echo esc_html( get_field('svc_hero_title') ?: 'Veterinary services in Northern Kentucky,' ); ?>
        <em><?php echo esc_html( get_field('svc_hero_title_em') ?: 'for every stage of your pet’s life.' ); ?></em>
      </h1>

      <p class="hero-body">
        <?php echo esc_html( get_field('svc_hero_body') ?: "Veterinary Medical Center offers full-service veterinary services in Northern Kentucky for dogs, cats, and select small pets. From wellness exams and vaccines to dental care, surgery, urgent care, behavior support, and end-of-life guidance, our Fort Thomas and Independence teams make care clear, practical, and comfort-focused." ); ?>
      </p>

      <div class="hero-btns">
        <button class="btn-red" onclick="openAptModal('services-hero')"><?php echo esc_html( get_field('svc_hero_btn1_label') ?: 'Request Appointment' ); ?></button>
        <a href="#locations" class="btn-ghost"><?php echo esc_html( get_field('svc_hero_btn2_label') ?: 'View Locations' ); ?></a>
      </div>

      <div class="hero-stats">
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('svc_stat1_value') ?: 'Fear Free' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('svc_stat1_label') ?: 'Comfort-focused care' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('svc_stat2_value') ?: 'Urgent' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('svc_stat2_label') ?: 'Care available weekdays' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('svc_stat3_value') ?: 'Dogs to' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('svc_stat3_label') ?: 'Pocket pets &amp; more' ); ?></span>
        </div>
      </div>
    </div>

    <aside class="services-hero-side">
      <div class="services-panel">
        <h3><?php echo esc_html( get_field('svc_panel_heading') ?: 'What makes care here different' ); ?></h3>

        <?php
        $panel_icons = [
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-7-11a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 6.65-7 11-7 11z"/></svg>',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18"/><path d="M12 3v18"/></svg>',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 8-4-16-3 8H2"/></svg>',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>',
        ];
        $panel_defaults = [
          [ 'Fear Free approach',                  'Gentle handling and lower-stress visits designed to help pets feel safer and people feel more supported.' ],
          [ 'Feline-exclusive appointment times',  'Dedicated times designed to make visits more comfortable for cats and the people who love them.' ],
          [ 'Urgent care support',                 'Our team is equipped to handle many urgent medical needs during the work week.' ],
          [ 'Personalized recommendations',        "Care plans are tailored to your pet's age, species, lifestyle, and health history." ],
        ];
        ?>
        <div class="services-panel-list">
          <?php for ( $i = 1; $i <= 4; $i++ ) :
            $title = get_field( "svc_panel_item{$i}_title" ) ?: $panel_defaults[$i-1][0];
            $body  = get_field( "svc_panel_item{$i}_body" )  ?: $panel_defaults[$i-1][1];
          ?>
          <div class="services-panel-item">
            <div class="services-icon"><?php echo $panel_icons[$i-1]; ?></div>
            <div>
              <strong><?php echo esc_html($title); ?></strong>
              <span><?php echo esc_html($body); ?></span>
            </div>
          </div>
          <?php endfor; ?>
        </div>

        <div class="services-panel-note">
          <?php echo esc_html( get_field('svc_panel_note') ?: 'We see dogs, cats, rabbits, pocket pets, and select small farm animals. Availability may vary by veterinarian.' ); ?>
        </div>
      </div>
    </aside>
  </section>

  <!-- ═══════════════════════════ OUR SERVICES ═══════════════════════════ -->
  <section class="services-band" style="background:var(--cream);">
    <div class="services-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('svc_section_eyebrow') ?: 'Our Services' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('svc_section_heading') ?: 'Veterinary services Northern Kentucky pet owners can use through every life stage.' ); ?></h2>
      <p class="services-section-copy">
        <?php echo esc_html( get_field('svc_section_body') ?: 'Our veterinary services in Northern Kentucky are designed to help pets stay healthy, address problems early, and support quality of life over time. Whether your pet is due for preventive care or needs more specialized attention, we aim to make the process clear, thoughtful, and manageable.' ); ?>
      </p>

      <?php
      $card_defaults = [
        [ 'cross',   'Wellness & Preventive Care',      "Preventive care helps us build a complete picture of your pet's health and catch concerns before they become bigger problems.",          "Wellness evaluations tailored to life stage\nVaccinations and preventive recommendations\nRoutine physical exams\nPersonalized care planning",                                                  '/service-item/pet-wellness-exams-northern-kentucky/' ],
        [ 'tooth',   'Dental & Oral Health',            'Oral health affects comfort, appetite, and overall wellbeing. Dental care is an important part of long-term health.',                     "Comprehensive Oral Health Assessment and Treatment (COHAT)\nDental cleanings\nOral exams and treatment planning\nRecommendations for ongoing home care",                                      '/service-item/veterinary-dental-care-northern-kentucky/' ],
        [ 'scalpel', 'Surgery',                         'When surgery is needed, we focus on careful planning, clear communication, and support before and after the procedure.',                 "Soft tissue surgery\nPre-surgical evaluation\nRecovery guidance and follow-up care\nDischarge instructions and home monitoring support",                                                       '/service-item/pet-soft-tissue-surgery-northern-kentucky/' ],
        [ 'search',  'Consultation & Second Opinions',  'Sometimes you need a fresh perspective or more time to talk through a complex issue. We are happy to help you make informed decisions.',  "Second-opinion consultations\nReview of previous history and records\nAdditional recommendations and care options\nGoal-based conversations for ongoing conditions",                          '/service-item/urgent-veterinary-care-northern-kentucky/' ],
        [ 'brain',   'Behavior & Quality of Life',      'Behavior changes can affect daily life for both pets and people. We can help assess concerns and talk through realistic next steps.',     "Behavioral consultations\nStress-reduction recommendations\nSupport for lifestyle and home-management concerns\nQuality-of-life discussions when needs change",                               '/service-item/pet-behavior-consultations-northern-kentucky/' ],
        [ 'heart',   'End-of-Life Care',                'Some of the most important care we provide happens during the hardest moments. We offer compassionate support centered on comfort, clarity, and dignity.', "Euthanasia in office or at home\nGuidance for difficult decisions\nSupportive conversations about comfort and next steps",                                                             '/service-item/cat-friendly-veterinarian-northern-kentucky/' ],
      ];
      ?>
      <div class="services-grid">
        <?php for ( $i = 1; $i <= 6; $i++ ) :
          $n   = $i - 1;
          $icon_key = get_field( "svc_card{$i}_icon" )  ?: $card_defaults[$n][0];
          $title    = get_field( "svc_card{$i}_title" ) ?: $card_defaults[$n][1];
          $body     = get_field( "svc_card{$i}_body" )  ?: $card_defaults[$n][2];
          $list     = get_field( "svc_card{$i}_list" )  ?: $card_defaults[$n][3];
          $url      = get_field( "svc_card{$i}_url" )   ?: home_url( $card_defaults[$n][4] );
        ?>
        <article class="service-card">
          <div class="service-card-top">
            <div class="services-icon"><?php echo vmc_svc_icon( $icon_key, $svc_icon_map ); ?></div>
            <h3><?php echo esc_html($title); ?></h3>
          </div>
          <p><?php echo esc_html($body); ?></p>
          <ul class="service-list">
            <?php vmc_svc_list_items($list); ?>
          </ul>
          <a href="<?php echo esc_url($url); ?>" class="service-learn-more">
            Learn More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </article>
        <?php endfor; ?>
      </div>

      <div class="services-mini-grid">
        <article class="services-link-card">
          <h3><?php echo esc_html( get_field('svc_internal_heading') ?: 'Explore veterinary services in Northern Kentucky' ); ?></h3>
          <p><?php echo esc_html( get_field('svc_internal_body') ?: 'These internal pages help pet owners move from comparing services to choosing the right appointment.' ); ?></p>
          <ul class="service-list">
            <li><a href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>">First vet visit and new patient appointments</a></li>
            <li><a href="<?php echo esc_url( home_url('/northern-kentucky-vet-near-me/') ); ?>">Vet near me in Northern Kentucky</a></li>
            <li><a href="<?php echo esc_url( home_url('/about/') ); ?>">About our locally owned veterinary hospital</a></li>
            <li><a href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">Contact Fort Thomas or Independence</a></li>
          </ul>
        </article>

        <article class="services-link-card">
          <h3><?php echo esc_html( get_field('svc_priority_heading') ?: 'Common service searches we support' ); ?></h3>
          <p><?php echo esc_html( get_field('svc_priority_body') ?: 'Families often reach this page while comparing dog and cat vet services, pet wellness exams, veterinary dental care, pet surgery, urgent veterinary care, and cat-friendly veterinary care in Northern Kentucky.' ); ?></p>
          <ul class="service-list">
            <li>Pet wellness exams and vaccines</li>
            <li>Veterinary dental care and oral health</li>
            <li>Pet soft tissue surgery and recovery support</li>
            <li>Urgent veterinary care during regular clinic hours</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ COMFORT-FOCUSED CARE ═══════════════════════════ -->
  <section class="services-band" style="background:var(--white);">
    <div class="services-shell">
      <div class="services-highlight-wrap">
        <div class="services-highlight">
          <div class="sec-eye">
            <span class="sec-lbl"><?php echo esc_html( get_field('svc_comfort_eyebrow') ?: 'Comfort-focused care' ); ?></span>
            <span class="sec-rule"></span>
          </div>
          <h3><?php echo esc_html( get_field('svc_comfort_heading') ?: 'Care built around comfort, communication, and trust.' ); ?></h3>
          <p>
            <?php echo esc_html( get_field('svc_comfort_body') ?: 'We believe good veterinary medicine is not just about treatment. It is also about how care feels. That means taking time to explain what we see, creating a lower-stress environment whenever possible, and helping you feel confident about the decisions you make for your pet.' ); ?>
          </p>
        </div>

        <div class="services-points">
          <?php
          $comfort_points = [
            [ get_field('svc_cp1_title') ?: 'Calmer visits',        get_field('svc_cp1_body') ?: 'Fear Free methods help reduce stress and make visits easier for nervous pets.' ],
            [ get_field('svc_cp2_title') ?: 'Species-aware care',   get_field('svc_cp2_body') ?: 'Different pets need different approaches, and care is tailored accordingly.' ],
            [ get_field('svc_cp3_title') ?: 'Clear next steps',     get_field('svc_cp3_body') ?: 'You leave with recommendations you can understand and act on.' ],
          ];
          foreach ( $comfort_points as $cp ) : ?>
          <div class="services-point">
            <strong><?php echo esc_html($cp[0]); ?></strong>
            <span><?php echo esc_html($cp[1]); ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ TRUSTED RESOURCES ═══════════════════════════ -->
  <section class="services-band" style="background:var(--white);">
    <div class="services-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('svc_resources_eyebrow') ?: 'Pet Care Resources' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('svc_resources_heading') ?: 'Helpful resources for veterinary services Northern Kentucky families ask about.' ); ?></h2>
      <p class="services-section-copy">
        <?php echo esc_html( get_field('svc_resources_body') ?: 'Good veterinary care includes reliable education. These outside resources are useful for pet owners researching preventive care, dental health, behavior, and lower-stress handling before or after a visit.' ); ?>
      </p>

      <div class="services-mini-grid">
        <article class="services-link-card">
          <h3>Outside pet health resources</h3>
          <p>These dofollow external resources add helpful context for families researching veterinary care topics.</p>
          <ul class="service-list">
            <li><a href="https://www.avma.org/resources-tools/pet-owners" target="_blank" rel="noopener">AVMA pet owner resources</a></li>
            <li><a href="https://www.avma.org/resources-tools/pet-owners/petcare/pet-dental-care" target="_blank" rel="noopener">AVMA pet dental care guidance</a></li>
            <li><a href="https://fearfreepets.com/resources/directory/" target="_blank" rel="noopener">Fear Free pet care resources</a></li>
            <li><a href="https://catfriendly.com/" target="_blank" rel="noopener">Cat Friendly Homes</a></li>
          </ul>
        </article>

        <article class="services-link-card">
          <h3>When to schedule veterinary care</h3>
          <p>Contact our team if your pet is due for routine veterinary services in Northern Kentucky or if something has changed and you are not sure what type of visit to request.</p>
          <ul class="service-list">
            <li>Book wellness care before vaccines or preventives lapse.</li>
            <li>Schedule dental concerns before appetite or comfort changes worsen.</li>
            <li>Call promptly for limping, vomiting, wounds, or sudden behavior changes.</li>
            <li>Ask about Fear Free planning if past visits have been stressful.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ APPOINTMENTS & SUPPORT ═══════════════════════════ -->
  <section class="services-band" style="background:var(--warm);">
    <div class="services-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('svc_appt_eyebrow') ?: 'Appointments &amp; Support' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('svc_appt_heading') ?: 'Here when you need routine care, answers, or urgent support.' ); ?></h2>
      <p class="services-section-copy">
        <?php echo esc_html( get_field('svc_appt_body') ?: 'Our appointment system is designed to help us schedule efficiently while still giving each pet the attention they need. We do our best to accommodate requests, and our team is available during the week to address many urgent medical concerns.' ); ?>
      </p>

      <div class="services-mini-grid">
        <article class="services-mini-card">
          <h3><?php echo esc_html( get_field('svc_appt1_title') ?: 'Appointments' ); ?></h3>
          <p><?php echo esc_html( get_field('svc_appt1_body') ?: 'Our computerized appointment book helps us coordinate care efficiently and make the most of your visit. If you have scheduling concerns or need help choosing the right appointment type, our team is happy to guide you.' ); ?></p>
        </article>
        <article class="services-mini-card">
          <h3><?php echo esc_html( get_field('svc_appt2_title') ?: 'Urgent care' ); ?></h3>
          <p><?php echo esc_html( get_field('svc_appt2_body') ?: 'We have a veterinarian and trained staff on duty five days a week who are equipped to handle urgent medical needs. If your pet needs prompt attention, contact us so we can help you determine the best next step.' ); ?></p>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ PETS WE SEE ═══════════════════════════ -->
  <section class="services-band" style="background:var(--cream);">
    <div class="services-shell">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('svc_pets_eyebrow') ?: 'Pets We See' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('svc_pets_heading') ?: 'We care for more than just dogs and cats.' ); ?></h2>
      <p class="services-section-copy">
        <?php echo esc_html( get_field('svc_pets_body') ?: 'Because our veterinarians have a range of experience and interests, we are able to care for many different kinds of pets. Availability for some species may depend on the veterinarian, so please call if you have specific questions.' ); ?>
      </p>

      <?php
      $species_raw  = get_field('svc_pets_list') ?: "Dogs\nCats\nRabbits*\nPocket Pets*\nSmall Farm Animals*";
      $species_list = array_filter( array_map( 'trim', explode( "\n", $species_raw ) ) );
      ?>
      <div class="services-species">
        <?php foreach ( $species_list as $sp ) : ?>
          <span><?php echo esc_html($sp); ?></span>
        <?php endforeach; ?>
      </div>

      <p style="margin-top:12px;font-size:13px;line-height:1.7;color:var(--mid);">
        <?php echo esc_html( get_field('svc_pets_note') ?: '*Select veterinarians only. Contact us for details about species-specific care and appointment availability.' ); ?>
      </p>

      <?php $seo_body = get_field('svc_seo_body'); ?>
      <div class="services-seo-body">
        <?php
        if ( $seo_body ) {
            echo wp_kses_post( $seo_body );
        } else { ?>
          <h2>Veterinary services Northern Kentucky families can keep coming back to</h2>
          <p>Veterinary Medical Center provides veterinary services in Northern Kentucky for families who want medicine that is thorough, local, and easy to understand. Our Fort Thomas and Independence teams support dogs, cats, rabbits, pocket pets, and select small farm animals with wellness care, sick visits, dental care, surgery, behavior guidance, and end-of-life support.</p>
          <h3>Dog and cat vet services with continuity</h3>
          <p>Many pet owners are not looking for a one-time transaction. They want a veterinary team that gets to know their pet, explains options clearly, and helps them make decisions over time. Our dog and cat vet services are built around that kind of relationship, from the first puppy or kitten visit to senior pet care and quality-of-life conversations.</p>
          <h3>Preventive, dental, surgical, urgent, and comfort-focused care</h3>
          <p>Because VMC is a full-service veterinary hospital, families can use one trusted team for many needs. Preventive care helps us find problems early. Veterinary dental care protects comfort and long-term health. Surgery is planned with communication and recovery support. Urgent veterinary care is available during regular weekday hours for many non-life-threatening concerns. Fear Free handling and cat-friendly awareness help make the experience calmer for pets and people.</p>
          <h3>Veterinary services near Fort Thomas, Independence, and Greater Cincinnati</h3>
          <p>Our Fort Thomas location serves nearby river city communities and families close to downtown Cincinnati, while our Independence location supports central Northern Kentucky communities including Covington, Taylor Mill, Latonia, Erlanger, and Florence. If you are comparing veterinary services in Northern Kentucky, our team can help you choose the right appointment and location.</p>
        <?php } ?>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ LOCATIONS CTA ═══════════════════════════ -->
  <section class="services-band" id="locations" style="background:var(--white);">
    <div class="services-shell">
      <?php get_template_part('template-parts/partial', 'cta'); ?>
      <?php get_template_part('template-parts/partial', 'locations'); ?>
    </div>
  </section>

</div>

<?php get_footer(); ?>
