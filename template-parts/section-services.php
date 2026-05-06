<?php
/**
 * Section: Services — consolidated, single version.
 * Replaces both the old card grid and the separate service-seo blocks.
 * Each card: title + 1–2 sentence description + link.
 */

$service_icons = [
  'wellness'   => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4C6 4 4.5 4 4.5 6.5L4.5 12C4.5 15.6 7.5 18 11 18"/><path d="M10.5 4C10.5 4 12 4 12 6.5L12 12C12 15.6 9 18 11 18"/><circle cx="17" cy="19.5" r="3.5"/><circle cx="6" cy="3.5" r="1" fill="#A91B1B"/><circle cx="10.5" cy="3.5" r="1" fill="#A91B1B"/></svg>',
  'dental'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 7.5C5.8 7.5 4.5 9 4.5 11.5C4.5 15 6.2 19 7 22C7.4 23.4 8.2 24 8.8 22C9.2 20.4 9.5 18.5 12 18.5C14.5 18.5 14.8 20.4 15.2 22C15.8 24 16.6 23.4 17 22C17.8 19 19.5 15 19.5 11.5C19.5 9 18.2 7.5 16.5 7.5C15 7.5 14 8.3 12 8.3C10 8.3 9 7.5 7.5 7.5Z"/></svg>',
  'surgery'    => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21L17.5 8.5"/><path d="M17.5 8.5L20.5 5.5L22.5 7.5L19.5 10.5Z" fill="#A91B1B" stroke="none"/><line x1="6" y1="5" x2="6" y2="10"/><line x1="3.5" y1="7.5" x2="8.5" y2="7.5"/></svg>',
  'behavioral' => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C9.5 3 7.5 5 7.5 7C5.8 7 4 8.8 4 11C4 13.2 5.5 14.8 7.5 15C7.5 17 9 19 11 19L11 21"/><path d="M12 3C14.5 3 16.5 5 16.5 7C18.2 7 20 8.8 20 11C20 13.2 18.5 14.8 16.5 15C16.5 17 15 19 13 19L13 21"/><line x1="11" y1="21" x2="13" y2="21"/></svg>',
  'urgent'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L22 21H2Z"/><line x1="12" y1="10" x2="12" y2="15.5"/><circle cx="12" cy="18.5" r="0.9" fill="#A91B1B"/></svg>',
  'feline'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14.5" r="7.5"/><polygon points="7,9 5.2,3 10,8.5" stroke-linejoin="round"/><polygon points="17,9 18.8,3 14,8.5" stroke-linejoin="round"/></svg>',
  'default'    => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
];

$fallback = [
  [
    'title' => 'Wellness Exams & Preventive Care',
    'slug'  => 'wellness',
    'desc'  => 'Annual and bi-annual checkups with vaccinations, parasite prevention, and life-stage guidance. Regular visits are the best way to catch problems early and keep your pet healthy long-term.',
    'url'   => '/service-item/pet-wellness-exams-northern-kentucky/',
  ],
  [
    'title' => 'Dental Care & COHAT Cleanings',
    'slug'  => 'dental',
    'desc'  => 'Professional dental cleanings under anesthesia, oral health assessments, and extractions when needed. Dental disease affects most pets by age three — early care makes a real difference.',
    'url'   => '/service-item/pet-dental-care-northern-kentucky/',
  ],
  [
    'title' => 'Soft Tissue Surgery',
    'slug'  => 'surgery',
    'desc'  => 'Spays, neuters, mass removals, and other common procedures with thorough anesthesia monitoring and clear post-op instructions. We follow up to make sure recovery goes smoothly.',
    'url'   => '/service-item/pet-soft-tissue-surgery-northern-kentucky/',
  ],
  [
    'title' => 'Behavior Consultations',
    'slug'  => 'behavioral',
    'desc'  => 'Anxiety, aggression, litter box issues, and stress-related behavior often have medical roots. We help identify the cause and build a practical plan — for both dogs and cats.',
    'url'   => '/service-item/pet-behavior-consultations-northern-kentucky/',
  ],
  [
    'title' => 'Urgent Care During Clinic Hours',
    'slug'  => 'urgent',
    'desc'  => 'When something comes up that can\'t wait, our team sees urgent cases during regular hours at both locations. Call first so we can prepare and give you guidance on the way in.',
    'url'   => '/service-item/northern-kentucky-urgent-care-vet/',
  ],
  [
    'title' => 'Cat-Friendly Appointments',
    'slug'  => 'feline',
    'desc'  => 'Feline-only appointment windows at select times, with a quieter environment and handling techniques designed specifically for cats. Less stress, better exams.',
    'url'   => '/service-item/cat-friendly-vet-northern-kentucky/',
  ],
];

// Attempt to pull from CPT (if services are entered as posts)
$service_posts = get_posts([
  'post_type'      => 'vmc_service',
  'posts_per_page' => 6,
  'post_status'    => 'publish',
  'orderby'        => 'meta_value_num',
  'meta_key'       => '_vmc_service_order',
  'order'          => 'ASC',
]);

$use_posts = ! empty($service_posts);
?>

<section class="svc-outer" id="services">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl"><?php esc_html_e('Veterinary Services', 'vmc'); ?></span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2">
      <?php esc_html_e('Veterinary Services for Dogs & Cats in Northern Kentucky', 'vmc'); ?>
    </h2>
    <p>
      <?php esc_html_e('From routine wellness visits to dental care, surgery, and urgent same-day appointments — our NKY vet team handles a full range of care at both our Fort Thomas and Independence locations. Every service is delivered with the same focus on honest communication and low-stress handling.', 'vmc'); ?>
    </p>
  </div>

  <div class="svc-grid rv">
    <?php if ( $use_posts ) :
      foreach ( $service_posts as $svc ) :
        $icon_slug = get_post_meta($svc->ID, '_vmc_service_icon', true) ?: 'default';
        $icon      = $service_icons[ $icon_slug ] ?? $service_icons['default'];
        $url       = get_permalink($svc->ID);
        $desc      = $svc->post_excerpt ?: wp_trim_words(wp_strip_all_tags($svc->post_content), 30, '…');
    ?>
      <article class="svc-card">
        <a class="svc-card-link" href="<?php echo esc_url($url); ?>" aria-label="<?php echo esc_attr($svc->post_title); ?>">
          <div class="svc-iw"><?php echo $icon; ?></div>
          <h3 class="svc-h"><?php echo esc_html($svc->post_title); ?></h3>
          <p class="svc-p"><?php echo esc_html($desc); ?></p>
          <span class="svc-more">
            <?php esc_html_e('Learn more', 'vmc'); ?>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </article>
    <?php endforeach; wp_reset_postdata();
    else :
      foreach ( $fallback as $item ) :
        $card_url = esc_url( home_url( $item['url'] ) );
        $icon     = $service_icons[ $item['slug'] ] ?? $service_icons['default'];
    ?>
      <article class="svc-card">
        <a class="svc-card-link" href="<?php echo $card_url; ?>" aria-label="<?php echo esc_attr( $item['title'] ); ?>">
          <div class="svc-iw"><?php echo $icon; ?></div>
          <h3 class="svc-h"><?php echo esc_html( $item['title'] ); ?></h3>
          <p class="svc-p"><?php echo esc_html( $item['desc'] ); ?></p>
          <span class="svc-more">
            <?php esc_html_e('Learn more', 'vmc'); ?>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </article>
    <?php endforeach; endif; ?>
  </div>
</section>