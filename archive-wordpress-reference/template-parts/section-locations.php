<?php
/**
 * Section: Locations — combined section (replaces both section-locations.php
 * and section-location-seo.php). Image + copy cards, inline communities,
 * small "We also serve…" footer line. No giant city tag list.
 */

$ft_phone    = vmc_get('vmc_ft_phone',    '(859) 442-4420');
$ind_phone   = vmc_get('vmc_ind_phone',   '(859) 356-2242');
$ft_address  = vmc_get('vmc_ft_address',  '2000 Memorial Parkway, Fort Thomas, KY 41075');
$ind_address = vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$ft_href   = 'tel:' . preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_href  = 'tel:' . preg_replace('/[^0-9+]/', '', $ind_phone);

$ft_map_link  = 'https://maps.google.com/?q=' . rawurlencode($ft_address);
$ind_map_link = 'https://maps.google.com/?q=' . rawurlencode($ind_address);

$portal_url = vmc_get('vmc_portal_url', '#');

$ft_image  = vmc_get('vmc_about_ft_image',  get_template_directory_uri() . '/assets/images/about-fort-thomas.jpg');
$ind_image = vmc_get('vmc_about_ind_image', get_template_directory_uri() . '/assets/images/about-independence.jpg');

$ft_weekday   = vmc_get('vmc_ft_hours_weekday',   '8:00 AM – 6:00 PM');
$ft_saturday  = vmc_get('vmc_ft_hours_saturday',  'Rotating — call ahead');
$ind_weekday  = vmc_get('vmc_ind_hours_weekday',  '8:00 AM – 6:00 PM');
$ind_saturday = vmc_get('vmc_ind_hours_saturday', 'Closed');

$np_page = get_page_by_path('new-patients');
$np_url  = $np_page ? get_permalink($np_page) : home_url('/new-patients/');

$ft_detail_page  = get_page_by_path('vet-in-fort-thomas-ky-locally-owned-trusted-care');
$ft_detail_url   = $ft_detail_page ? get_permalink($ft_detail_page) : home_url('/vet-in-fort-thomas-ky-locally-owned-trusted-care/');

$ind_detail_page = get_page_by_path('vet-in-independence-ky-locally-owned-trusted-pet-care');
$ind_detail_url  = $ind_detail_page ? get_permalink($ind_detail_page) : home_url('/vet-in-independence-ky-locally-owned-trusted-pet-care/');

// ACF overrides for location copy
$ft_heading  = get_field('ls_ft_heading')  ?: 'Veterinarian in Fort Thomas, KY';
$ind_heading = get_field('ls_ind_heading') ?: 'Vet Clinic in Independence, KY';
?>

<section class="loc-sec" id="locations">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Our Locations</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2">Fort Thomas &amp; Independence — two NKY locations, one standard of care.</h2>
    <p class="loc-intro">Pet care in Northern Kentucky shouldn&rsquo;t require a long drive. Our two clinics make it easy to find a trusted local vet close to home, whether you&rsquo;re in Campbell County, Kenton County, or anywhere in between — including the Greater Cincinnati area just across the river.</p>
  </div>

  <div class="loc-feature-list rv">

    <!-- Fort Thomas -->
    <article class="loc-feature-card" id="fort-thomas-vet">
      <div class="loc-feature-grid">
        <div class="loc-feature-media">
          <img src="<?php echo esc_url($ft_image); ?>" alt="VMC Fort Thomas veterinary clinic exterior" loading="lazy">
        </div>
        <div class="loc-feature-copy">
          <div class="sec-eye" style="margin-bottom:8px;">
            <span class="sec-lbl">Fort Thomas, KY</span>
            <span class="sec-rule"></span>
          </div>
          <h3><?php echo esc_html($ft_heading); ?></h3>
          <p>Our Fort Thomas clinic sits on Memorial Parkway and serves as the go-to NKY vet for families in Campbell County and the river cities. We offer wellness exams, dental care, surgery, and same-day urgent care in a Fear-Free Certified environment.</p>
          <p class="loc-nearby"><strong>Nearby:</strong> Highland Heights, Newport, Bellevue, Southgate, Dayton</p>

          <div class="loc-meta-row">
            <div class="loc-meta-item">
              <strong>Address</strong>
              <span><?php echo esc_html($ft_address); ?></span>
            </div>
            <div class="loc-meta-item">
              <strong>Phone</strong>
              <a href="<?php echo esc_url($ft_href); ?>"><?php echo esc_html($ft_phone); ?></a>
            </div>
            <div class="loc-meta-item">
              <strong>Mon – Fri</strong>
              <span><?php echo esc_html($ft_weekday); ?></span>
            </div>
            <div class="loc-meta-item">
              <strong>Saturday</strong>
              <span><?php echo esc_html($ft_saturday); ?></span>
            </div>
          </div>

          <div class="loc-feature-actions">
            <a href="<?php echo esc_url($ft_href); ?>" class="btn-red">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call Fort Thomas
            </a>
            <a href="<?php echo esc_url($ft_map_link); ?>" class="btn-ghost" target="_blank" rel="noopener">Get Directions</a>
            <a href="<?php echo esc_url($np_url); ?>" class="loc-text-link">New patients →</a>
            <a href="<?php echo esc_url($ft_detail_url); ?>" class="loc-text-link loc-detail-link">More about this location →</a>
          </div>
        </div>
      </div>
    </article>

    <!-- Independence -->
    <article class="loc-feature-card" id="independence-vet">
      <div class="loc-feature-grid loc-feature-grid--reverse">
        <div class="loc-feature-copy">
          <div class="sec-eye" style="margin-bottom:8px;">
            <span class="sec-lbl">Independence, KY</span>
            <span class="sec-rule"></span>
          </div>
          <h3><?php echo esc_html($ind_heading); ?></h3>
          <p>Located on Madison Pike, our Independence clinic serves families across Kenton County looking for a full-service vet that feels personal and unhurried. Same wellness, dental, surgical, and behavior services — same team standards.</p>
          <p class="loc-nearby"><strong>Nearby:</strong> Covington, Florence, Erlanger, Edgewood, Taylor Mill, Cold Spring</p>

          <div class="loc-meta-row">
            <div class="loc-meta-item">
              <strong>Address</strong>
              <span><?php echo esc_html($ind_address); ?></span>
            </div>
            <div class="loc-meta-item">
              <strong>Phone</strong>
              <a href="<?php echo esc_url($ind_href); ?>"><?php echo esc_html($ind_phone); ?></a>
            </div>
            <div class="loc-meta-item">
              <strong>Mon – Fri</strong>
              <span><?php echo esc_html($ind_weekday); ?></span>
            </div>
            <div class="loc-meta-item">
              <strong>Saturday</strong>
              <span><?php echo esc_html($ind_saturday); ?></span>
            </div>
          </div>

          <div class="loc-feature-actions">
            <a href="<?php echo esc_url($ind_href); ?>" class="btn-red">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call Independence
            </a>
            <a href="<?php echo esc_url($ind_map_link); ?>" class="btn-ghost" target="_blank" rel="noopener">Get Directions</a>
            <a href="<?php echo esc_url($np_url); ?>" class="loc-text-link">New patients →</a>
            <a href="<?php echo esc_url($ind_detail_url); ?>" class="loc-text-link loc-detail-link">More about this location →</a>
          </div>
        </div>
        <div class="loc-feature-media">
          <img src="<?php echo esc_url($ind_image); ?>" alt="VMC Independence veterinary clinic" loading="lazy">
        </div>
      </div>
    </article>

  </div>

  <p class="loc-also-serve rv">We also serve pet families from Alexandria, Bellevue, Cold Spring, Dayton, Silver Grove, Southgate, and surrounding Greater Cincinnati communities.</p>

</section>
