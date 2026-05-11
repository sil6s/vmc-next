<?php
/**
 * Section: New Patient SEO
 * Targets: "new vet near me", "first vet visit NKY".
 * Light/brand styling — no dark box.
 */

$heading        = get_field('np_seo_heading')        ?: 'New Patient Vet Visits in Northern Kentucky';
$intro          = get_field('np_seo_intro')          ?: 'Looking for a new veterinarian in Northern Kentucky? We welcome new patients at both Fort Thomas and Independence. First visits are designed to feel unhurried — we\'ll review your pet\'s history, answer your questions, and build a care plan together.';
$expect_heading = get_field('np_seo_expect_heading') ?: 'What to expect at your first visit';
$expect_body    = get_field('np_seo_expect_body')    ?: 'Your first appointment includes a nose-to-tail physical exam, a review of your pet\'s health history, and a conversation about any concerns you\'ve noticed. We\'ll cover vaccination schedules, preventive care options, and next steps specific to your pet\'s age and lifestyle.';
$steps_raw      = get_field('np_seo_steps')          ?: "Call or request an appointment at either location\nBring any prior vet records or vaccination history\nArrive a few minutes early to complete new patient paperwork\nLet us know about any concerns, behavior changes, or symptoms\nAsk about our wellness plans and ongoing care options";
$cta_label      = get_field('np_seo_cta_label')      ?: 'Start as a New Patient';
$cta_url_raw    = get_field('np_seo_cta_url');

$np_page = get_page_by_path('new-patients');
$cta_url = $cta_url_raw ?: ( $np_page ? get_permalink($np_page) : home_url('/new-patients/') );

$ft_phone  = vmc_get('vmc_ft_phone',  '(859) 442-4420');
$ind_phone = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_href   = 'tel:' . preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_href  = 'tel:' . preg_replace('/[^0-9+]/', '', $ind_phone);

$steps = array_filter(array_map('trim', explode("\n", $steps_raw)));
?>
<section class="npseo-outer" id="new-patients-seo">
  <div class="npseo-inner rv">

    <div class="npseo-expect">
      <div class="sec-eye">
        <span class="sec-lbl">New Patients</span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html($heading); ?></h2>
      <p><?php echo esc_html($intro); ?></p>

      <h3 class="npseo-subhead"><?php echo esc_html($expect_heading); ?></h3>
      <p><?php echo esc_html($expect_body); ?></p>

      <?php if ( ! empty($steps) ) : ?>
      <ul class="npseo-steps">
        <?php foreach ( $steps as $step ) : ?>
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A91B1B" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <?php echo esc_html($step); ?>
        </li>
        <?php endforeach; ?>
      </ul>
      <?php endif; ?>
    </div>

    <div class="npseo-cta-wrap">
      <div class="npseo-cta-box">
        <span class="npseo-cta-badge">Accepting new patients now</span>
        <h3>Same-week appointments available at both locations.</h3>
        <p>Whether your pet is due for a wellness exam or you just moved to the area, we make it easy to get started. Fort Thomas and Independence are both welcoming new patients.</p>
        <a href="<?php echo esc_url($cta_url); ?>" class="btn-red npseo-cta-btn">
          <?php echo esc_html($cta_label); ?>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <div class="npseo-phones">
          <a href="<?php echo esc_url($ft_href); ?>" class="npseo-phone-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span><em>Fort Thomas</em><?php echo esc_html($ft_phone); ?></span>
          </a>
          <a href="<?php echo esc_url($ind_href); ?>" class="npseo-phone-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span><em>Independence</em><?php echo esc_html($ind_phone); ?></span>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>
