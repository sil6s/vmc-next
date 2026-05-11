<?php
/**
 * Template Name: VMC Home Hybrid
 * Template Post Type: page
 *
 * Section order:
 *  1. Hero + Ticker
 *  2. Hidden SEO content (Rank Math)
 *  3. Reviews          — cream bg
 *  4. Why VMC          — white bg
 *  5. Services         — cream bg  (single consolidated section)
 *  6. Emergency        — warm bg   (stands out between services & locations)
 *  7. Locations        — white bg  (single combined section)
 *  8. Team             — cream bg
 *  9. New Patient CTA  — white bg
 * 10. Blog / Resources — cream bg
 * 11. Internal Links   — white bg
 * 12. FAQ              — cream bg  (always last content section)
 * 13. Schema JSON-LD
 */

get_header();

$hero_img = vmc_get_hero_image_url();

$new_patients_page = get_page_by_path('new-patients');
$hero_btn2_link    = $new_patients_page ? get_permalink($new_patients_page) : home_url('/new-patients/');

/* ── Hero ACF fields ── */
$hero_title_line_1 = get_field('hero_title_line_1') ?: 'Veterinarian in Northern Kentucky &';
$hero_title_line_2 = get_field('hero_title_line_2') ?: 'Greater Cincinnati';
$hero_body         = get_field('hero_body')         ?: 'Fear-free veterinary care in Fort Thomas and Independence, KY. Same-week appointments and a team dedicated to serving pets and families across Northern Kentucky.';
$hero_btn_1_label  = get_field('hero_btn_1_label')  ?: 'Book an Appointment';
$hero_btn_1_url    = get_field('hero_btn_1_url')    ?: vmc_phone_link('ft');
$hero_btn_2_label  = get_field('hero_btn_2_label')  ?: 'Contact Us';
$hero_btn_2_url    = get_field('hero_btn_2_url')    ?: home_url('/contact/');
$hero_img_alt      = get_field('hero_img_alt')      ?: 'Veterinarian with a dog at VMC Northern Kentucky';
$hero_badge_title  = get_field('hero_badge_title')  ?: 'Same-Week Appointments';
$hero_badge_sub    = get_field('hero_badge_sub')    ?: 'Now welcoming new patients';

$stat1_num = get_field('hero_stat_1_number') ?: '4.8';
$stat1_lbl = get_field('hero_stat_1_label')  ?: 'Avg. Rating';
$stat2_num = get_field('hero_stat_2_number') ?: '158';
$stat2_lbl = get_field('hero_stat_2_label')  ?: 'Reviews';
$stat3_num = get_field('hero_stat_3_number') ?: '5+';
$stat3_lbl = get_field('hero_stat_3_label')  ?: 'Yrs Serving NKY';

/* ── Ticker ── */
$ticker_items = get_field('ticker_items');
if ( empty($ticker_items) || ! is_array($ticker_items) ) {
    $ticker_items = [
        ['item_text' => 'Fear-Free Certified'],
        ['item_text' => 'Same-Week Appointments'],
        ['item_text' => 'Fort Thomas, KY'],
        ['item_text' => 'Independence, KY'],
        ['item_text' => 'Locally & Independently Owned'],
        ['item_text' => 'Dogs & Cats'],
        ['item_text' => 'Wellness & Prevention'],
        ['item_text' => 'Dental Care (COHAT)'],
        ['item_text' => 'Soft Tissue Surgery'],
        ['item_text' => 'Behavioral Consults'],
    ];
}
?>

<!-- ═══ 1. HERO ═══ -->
<section class="hero">
  <div class="hero-copy">
    <h1 class="hero-h1">
      <?php echo esc_html($hero_title_line_1); ?><br>
      <em><?php echo esc_html($hero_title_line_2); ?></em>
    </h1>

    <p class="hero-body"><?php echo esc_html($hero_body); ?></p>

    <div class="hero-btns">
      <button class="btn-red" onclick="openAptModal('home-hero')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <?php echo esc_html($hero_btn_1_label); ?>
      </button>
      <a href="<?php echo esc_url($hero_btn_2_url); ?>" class="btn-ghost">
        <?php echo esc_html($hero_btn_2_label); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>

    <div class="hero-stats">
      <div class="hstat">
        <span class="hstat-n" data-count="<?php echo esc_attr($stat1_num); ?>">0</span>
        <span class="hstat-l"><?php echo esc_html($stat1_lbl); ?></span>
      </div>
      <div class="hstat">
        <span class="hstat-n" data-count="<?php echo esc_attr($stat2_num); ?>">0</span>
        <span class="hstat-l"><?php echo esc_html($stat2_lbl); ?></span>
      </div>
      <div class="hstat">
        <span class="hstat-n"><?php echo esc_html($stat3_num); ?></span>
        <span class="hstat-l"><?php echo esc_html($stat3_lbl); ?></span>
      </div>
    </div>
  </div>

  <div class="hero-img">
    <img src="<?php echo esc_url($hero_img); ?>" alt="<?php echo esc_attr($hero_img_alt); ?>">
    <div class="hero-badge">
      <span class="hero-badge-dot"></span>
      <div class="hero-badge-inner">
        <span class="hero-badge-title"><?php echo esc_html($hero_badge_title); ?></span>
        <span class="hero-badge-sub"><?php echo esc_html($hero_badge_sub); ?></span>
      </div>
    </div>
  </div>
</section>

<!-- ═══ TICKER ═══ -->
<div class="ticker" aria-hidden="true">
  <div class="ticker-inner">
    <?php
    $ticker_all = array_merge($ticker_items, $ticker_items);
    foreach ( $ticker_all as $t ) {
        $txt = $t['item_text'] ?? '';
        if ( $txt ) echo '<span class="ti">' . esc_html($txt) . '</span>';
    }
    ?>
  </div>
</div>

<!-- ═══ HIDDEN SEO CONTENT (Rank Math reads this) ═══ -->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <?php if ( trim(get_the_content()) !== '' ) : ?>
    <section class="seo-content-section" aria-hidden="true">
      <div class="services-shell"><?php the_content(); ?></div>
    </section>
  <?php endif; ?>
<?php endwhile; endif; ?>

<!-- ═══ 2. REVIEWS — Trust & credibility first ═══ -->
<div class="home-band home-band--cream">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'reviews'); ?>
  </div>
</div>

<!-- ═══ 3. WHY VMC — Differentiators ═══ -->
<div class="home-band home-band--white">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'why'); ?>
  </div>
</div>

<!-- ═══ 4. SERVICES — Single consolidated section ═══ -->
<div class="home-band home-band--cream">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'services'); ?>
  </div>
</div>

<!-- ═══ 5. EMERGENCY / URGENT CARE — Stands out with warm accent bg ═══ -->
<div class="home-band home-band--warm">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'emergency'); ?>
  </div>
</div>

<!-- ═══ 6. LOCATIONS — Single combined section ═══ -->
<div class="home-band home-band--white">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'locations'); ?>
  </div>
</div>

<!-- ═══ 7. TEAM ═══ -->
<div class="home-band home-band--cream">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'team'); ?>
  </div>
</div>

<!-- ═══ 8. NEW PATIENT CTA ═══ -->
<div class="home-band home-band--white">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'new-patients-seo'); ?>
  </div>
</div>

<!-- ═══ 9. BLOG / RESOURCES ═══ -->
<div class="home-band home-band--cream">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'blog-preview'); ?>
  </div>
</div>

<!-- ═══ 10. INTERNAL LINKS ═══ -->
<div class="home-band home-band--white">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'internal-links'); ?>
  </div>
</div>

<!-- ═══ Utility Access Links (indexing support) ═══ -->
<div class="home-band home-band--cream">
  <section class="sec">
    <div class="rv">
      <div class="sec-eye"><span class="sec-lbl">Online Tools</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2">Manage records, booking, and refills online.</h2>
      <p style="max-width:760px;margin-top:14px;font-size:15.5px;line-height:1.8;color:var(--mid)">Use our online utility pages for secure portal access, online vet booking, and medication refills tied to your local VMC team.</p>
      <div class="hero-btns" style="margin-top:22px">
        <a class="btn-red" href="<?php echo esc_url( vmc_patient_portal_page_url() ); ?>" onclick="openPortalModal('portal','home-tools'); return false;">Patient Portal &amp; Online Booking</a>
        <a class="btn-red" href="<?php echo esc_url( vmc_online_pharmacy_page_url() ); ?>" onclick="openPortalModal('pharmacy','home-tools'); return false;">Online Vet Pharmacy</a>
      </div>
    </div>
  </section>
</div>

<!-- ═══ 11. FAQ — Always last content section ═══ -->
<div class="home-band home-band--cream">
  <div class="home-shell">
    <?php get_template_part('template-parts/section', 'faq'); ?>
  </div>
</div>
<!-- ═══ SCHEMA JSON-LD ═══ -->
<?php
$schema_enable = get_field('schema_enable');
$price_range   = get_field('schema_price_range') ?: '$$';

$ft_phone_raw  = vmc_get('vmc_ft_phone',    '(859) 442-4420');
$ind_phone_raw = vmc_get('vmc_ind_phone',   '(859) 356-2242');
$ft_addr_raw   = vmc_get('vmc_ft_address',  '2000 Memorial Pkwy, Fort Thomas, KY 41075');
$ind_addr_raw  = vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$faq_posts = get_posts([
    'post_type'      => 'vmc_faq',
    'posts_per_page' => 10,
    'post_status'    => 'publish',
    'orderby'        => 'menu_order date',
    'order'          => 'ASC',
]);

$schema_faqs = [];
if ( ! empty($faq_posts) ) {
    foreach ( $faq_posts as $faq_post ) {
        $schema_faqs[] = [
            '@type'          => 'Question',
            'name'           => $faq_post->post_title,
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => wp_strip_all_tags($faq_post->post_content),
            ],
        ];
    }
}

if ( empty($schema_faqs) ) {
    $schema_faqs = [
        [ '@type' => 'Question', 'name' => 'How much does a vet visit cost with a Northern Kentucky vet?', 'acceptedAnswer' => [ '@type' => 'Answer', 'text' => 'Costs vary by appointment type. Veterinary Medical Center, a trusted Northern Kentucky vet, provides transparent pricing before services are performed. Call our Fort Thomas or Independence team for current pricing.' ] ],
        [ '@type' => 'Question', 'name' => 'Do you offer emergency or urgent care in Northern Kentucky?', 'acceptedAnswer' => [ '@type' => 'Answer', 'text' => 'Yes. We provide urgent same-day care from our Northern Kentucky vet team during regular business hours at both Fort Thomas and Independence locations.' ] ],
        [ '@type' => 'Question', 'name' => 'Are you accepting new patients at your Northern Kentucky vet clinics?', 'acceptedAnswer' => [ '@type' => 'Answer', 'text' => 'Yes, we are currently welcoming new patients at both our Northern Kentucky vet locations. Same-week appointments are often available.' ] ],
        [ '@type' => 'Question', 'name' => 'What does Fear-Free Certified mean at a Northern Kentucky vet?', 'acceptedAnswer' => [ '@type' => 'Answer', 'text' => 'Fear-Free is a certified approach used by our Northern Kentucky vet team to reduce pet stress using calm handling techniques and a low-stress clinic environment.' ] ],
    ];
}

if ( $schema_enable !== false && $schema_enable !== '0' ) :
    $site_url = home_url('/');
    $schema = [
        '@context' => 'https://schema.org',
        '@graph'   => [
            [
                '@type'       => 'VeterinaryCare',
                '@id'         => $site_url . '#northern-kentucky-vet-ft',
                'name'        => 'Veterinary Medical Center – Fort Thomas',
                'description' => 'Trusted Northern Kentucky vet for dogs and cats in Fort Thomas, KY. Fear-free visits, wellness exams, dental care, surgery, and same-day urgent care.',
                'url'         => $site_url,
                'telephone'   => $ft_phone_raw,
                'priceRange'  => $price_range,
                'address'     => [ 
                    '@type' => 'PostalAddress',
                    'streetAddress' => '2000 Memorial Pkwy',
                    'addressLocality' => 'Fort Thomas',
                    'addressRegion' => 'KY',
                    'postalCode' => '41075',
                    'addressCountry' => 'US'
                ],
                'geo' => [ 
                    '@type' => 'GeoCoordinates',
                    'latitude' => '39.0795',
                    'longitude' => '-84.4489'
                ],
                'openingHoursSpecification' => [[
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                    'opens' => '08:00',
                    'closes' => '18:00'
                ]],
                'areaServed' => [
                    'Northern Kentucky',
                    'Fort Thomas KY',
                    'Newport KY',
                    'Bellevue KY',
                    'Highland Heights KY',
                    'Greater Cincinnati'
                ],
            ],
            [
                '@type'       => 'VeterinaryCare',
                '@id'         => $site_url . '#northern-kentucky-vet-ind',
                'name'        => 'Veterinary Medical Center – Independence',
                'description' => 'Experienced Northern Kentucky vet serving Independence, Covington, Florence, and Erlanger. Dog and cat care with fear-free handling and same-week appointments.',
                'url'         => $site_url,
                'telephone'   => $ind_phone_raw,
                'priceRange'  => $price_range,
                'address'     => [ 
                    '@type' => 'PostalAddress',
                    'streetAddress' => '4147 Madison Pike',
                    'addressLocality' => 'Independence',
                    'addressRegion' => 'KY',
                    'postalCode' => '41051',
                    'addressCountry' => 'US'
                ],
                'geo' => [ 
                    '@type' => 'GeoCoordinates',
                    'latitude' => '38.9437',
                    'longitude' => '-84.5441'
                ],
                'openingHoursSpecification' => [[
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                    'opens' => '08:00',
                    'closes' => '18:00'
                ]],
                'areaServed' => [
                    'Northern Kentucky',
                    'Independence KY',
                    'Covington KY',
                    'Florence KY',
                    'Erlanger KY',
                    'Greater Cincinnati'
                ],
            ],
            [
                '@type'      => 'FAQPage',
                '@id'        => $site_url . '#faq',
                'mainEntity' => $schema_faqs,
            ],
        ],
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</script>' . "\n";
endif;

get_footer();
