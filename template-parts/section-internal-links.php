<?php
/**
 * Section: Internal Links
 * Improves crawlability and distributes page authority to deeper pages.
 */

$heading  = get_field('intlinks_heading') ?: 'Explore Our Veterinary Services';
$acf_items = get_field('intlinks_items');

$fallback_items = [
    [ 'ili_label' => 'Dental Care',         'ili_url' => '/service-item/pet-dental-care-northern-kentucky/',    'ili_desc' => 'COHAT cleanings and oral health assessments' ],
    [ 'ili_label' => 'Soft Tissue Surgery', 'ili_url' => '/service-item/pet-soft-tissue-surgery-northern-kentucky/',   'ili_desc' => 'Spay, neuter, mass removal and more' ],
    [ 'ili_label' => 'Wellness Exams',      'ili_url' => '/service-item/pet-wellness-exams-northern-kentucky/',         'ili_desc' => 'Preventive care and annual checkups' ],
    [ 'ili_label' => 'Urgent Care',         'ili_url' => '/service-item/northern-kentucky-urgent-care-vet/',     'ili_desc' => 'Same-day urgent care during clinic hours' ],
    [ 'ili_label' => 'Behavior',            'ili_url' => '/service-item/pet-behavior-consultations-northern-kentucky/', 'ili_desc' => 'Anxiety, aggression, and behavior support' ],
    [ 'ili_label' => 'Cat-Friendly Visits', 'ili_url' => '/service-item/cat-friendly-vet-northern-kentucky/', 'ili_desc' => 'Cat-only appointment windows available' ],
    [ 'ili_label' => 'New Patients',        'ili_url' => '/new-patients/',                                              'ili_desc' => 'First visit info and registration forms' ],
    [ 'ili_label' => 'Patient Portal',      'ili_url' => '/patient-portal-online-booking/',                             'ili_desc' => 'Secure portal login and online booking' ],
    [ 'ili_label' => 'Online Pharmacy',     'ili_url' => '/online-vet-pharmacy-northern-kentucky-cincinnati/',          'ili_desc' => 'Request medications and refill support' ],
    [ 'ili_label' => 'Contact Us',          'ili_url' => '/contact/',                                                   'ili_desc' => 'Get in touch or find our locations' ],
];

$source = ( ! empty($acf_items) && is_array($acf_items) ) ? $acf_items : $fallback_items;
?>
<section class="intlinks-outer" id="services-links">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Quick Links</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php echo esc_html($heading); ?></h2>
  </div>
  <div class="intlinks-grid rv">
    <?php foreach ( $source as $item ) :
      $label = $item['ili_label'] ?? '';
      $url   = $item['ili_url']   ?? '';
      $desc  = $item['ili_desc']  ?? '';
      if ( ! $label || ! $url ) continue;
    ?>
    <a href="<?php echo esc_url( home_url($url) ); ?>" class="intlink-card">
      <span class="intlink-label"><?php echo esc_html($label); ?></span>
      <?php if ( $desc ) : ?><span class="intlink-desc"><?php echo esc_html($desc); ?></span><?php endif; ?>
      <svg class="intlink-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <?php endforeach; ?>
  </div>
</section>
