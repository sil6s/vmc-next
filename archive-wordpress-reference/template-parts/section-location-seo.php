<?php
/**
 * Section: Location-Specific SEO
 * Dedicated sections for Fort Thomas, Independence, and areas served.
 * Targets: "vet Fort Thomas KY", "emergency vet Independence KY", etc.
 */

$ft_heading  = get_field('ls_ft_heading')        ?: 'Veterinarian in Fort Thomas, KY';
$ft_body     = get_field('ls_ft_body')           ?: 'Veterinary Medical Center\'s Fort Thomas location provides comprehensive veterinary care for dogs and cats in Fort Thomas and surrounding Northern Kentucky communities. Our team offers wellness exams, vaccinations, dental care, and surgery from a convenient location on Memorial Parkway. Families from Fort Thomas, Highland Heights, Bellevue, Newport, and nearby neighborhoods trust our experienced veterinarians to deliver personalized, relationship-based care. Whether you are looking for a routine wellness visit or need support for a more complex health issue, our Fort Thomas clinic is here to help with same-week appointments and a Fear-Free Certified approach to every visit.';
$ft_hoods    = get_field('ls_ft_neighborhoods')  ?: 'Highland Heights, Bellevue, Newport, Campbell County, Southgate, Dayton';
$ft_services = get_field('ls_ft_services')       ?: 'Wellness Exams, Vaccinations, Dental Care, Soft Tissue Surgery, Urgent Care';

$ind_heading  = get_field('ls_ind_heading')       ?: 'Vet Clinic in Independence, KY';
$ind_body     = get_field('ls_ind_body')          ?: 'Our Independence location on Madison Pike serves pet families throughout central Northern Kentucky who want access to full-service veterinary care close to home. From routine wellness exams and pet vaccinations to dental cleanings and surgery, our experienced veterinarians are equipped to support your pet through every stage of life. We serve families in Independence, Covington, Florence, Erlanger, and nearby Kenton County communities. With same-week appointments and a Fear-Free Certified approach, we make high-quality veterinary care accessible and comfortable for dogs and cats across Northern Kentucky.';
$ind_hoods    = get_field('ls_ind_neighborhoods') ?: 'Covington, Florence, Erlanger, Kenton County, Edgewood, Taylor Mill';
$ind_services = get_field('ls_ind_services')      ?: 'Wellness Exams, Preventive Care, Pet Dental Cleaning, Surgery, Behavior Consultations';

$areas_heading = get_field('ls_areas_heading') ?: 'Serving Covington, Newport, Florence & Nearby Northern Kentucky Communities';
$areas_body    = get_field('ls_areas_body')    ?: 'Veterinary Medical Center serves pet families throughout Northern Kentucky and the Greater Cincinnati area. With two convenient locations, we are accessible to residents of Fort Thomas, Independence, Covington, Newport, Florence, Erlanger, Bellevue, Highland Heights, Cold Spring, Alexandria, and many more communities across the region. Whether you are searching for a trusted veterinarian near Cincinnati or a neighborhood vet clinic closer to home, our team is here to provide the same high standard of care at every visit.';
$areas_list    = get_field('ls_areas_list')    ?: 'Fort Thomas, Independence, Covington, Newport, Florence, Erlanger, Bellevue, Highland Heights, Cold Spring, Alexandria, Taylor Mill, Edgewood, Southgate, Dayton, Silver Grove';

$ft_phone  = vmc_get('vmc_ft_phone',  '(859) 442-4420');
$ind_phone = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_addr   = vmc_get('vmc_ft_address',  '2000 Memorial Pkwy, Fort Thomas, KY 41075');
$ind_addr  = vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$np_page = get_page_by_path('new-patients');
$np_url  = $np_page ? get_permalink($np_page) : home_url('/new-patients/');

$ft_href  = 'tel:' . preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_href = 'tel:' . preg_replace('/[^0-9+]/', '', $ind_phone);

$ft_map  = 'https://maps.google.com/?q=' . rawurlencode($ft_addr);
$ind_map = 'https://maps.google.com/?q=' . rawurlencode($ind_addr);

$cities = array_filter(array_map('trim', explode(',', $areas_list)));
?>
<section class="lseo-outer" id="locations-nky">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Serving Northern Kentucky</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2">Serving Fort Thomas, Independence & Nearby Areas</h2>
    <p>Veterinary Medical Center has two conveniently located clinics in Fort Thomas and Independence, KY, making it easy for pet families across Northern Kentucky and the Greater Cincinnati area to access high-quality, compassionate veterinary care.</p>
  </div>

  <div class="lseo-grid rv">

    <article class="lseo-card" id="vet-fort-thomas">
      <div class="lseo-card-head">
        <span class="lseo-badge">Fort Thomas, KY</span>
        <h3><?php echo esc_html($ft_heading); ?></h3>
      </div>
      <div class="lseo-card-body">
        <p><?php echo esc_html($ft_body); ?></p>
        <div class="lseo-meta">
          <div class="lseo-meta-item">
            <strong>Nearby Communities</strong>
            <span><?php echo esc_html($ft_hoods); ?></span>
          </div>
          <div class="lseo-meta-item">
            <strong>Services Available</strong>
            <span><?php echo esc_html($ft_services); ?></span>
          </div>
          <div class="lseo-meta-item">
            <strong>Address</strong>
            <span><?php echo esc_html($ft_addr); ?></span>
          </div>
        </div>
        <div class="lseo-actions">
          <a href="<?php echo esc_url($ft_href); ?>" class="btn-red">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Fort Thomas
          </a>
          <a href="<?php echo esc_url($ft_map); ?>" class="btn-ghost" target="_blank" rel="noopener">Get Directions</a>
          <a href="<?php echo esc_url($np_url); ?>" class="lseo-text-link">New Patient Info →</a>
        </div>
      </div>
    </article>

    <article class="lseo-card" id="vet-independence">
      <div class="lseo-card-head">
        <span class="lseo-badge">Independence, KY</span>
        <h3><?php echo esc_html($ind_heading); ?></h3>
      </div>
      <div class="lseo-card-body">
        <p><?php echo esc_html($ind_body); ?></p>
        <div class="lseo-meta">
          <div class="lseo-meta-item">
            <strong>Nearby Communities</strong>
            <span><?php echo esc_html($ind_hoods); ?></span>
          </div>
          <div class="lseo-meta-item">
            <strong>Services Available</strong>
            <span><?php echo esc_html($ind_services); ?></span>
          </div>
          <div class="lseo-meta-item">
            <strong>Address</strong>
            <span><?php echo esc_html($ind_addr); ?></span>
          </div>
        </div>
        <div class="lseo-actions">
          <a href="<?php echo esc_url($ind_href); ?>" class="btn-red">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Independence
          </a>
          <a href="<?php echo esc_url($ind_map); ?>" class="btn-ghost" target="_blank" rel="noopener">Get Directions</a>
          <a href="<?php echo esc_url($np_url); ?>" class="lseo-text-link">New Patient Info →</a>
        </div>
      </div>
    </article>

  </div>

  <div class="lseo-areas rv">
    <h3><?php echo esc_html($areas_heading); ?></h3>
    <p><?php echo esc_html($areas_body); ?></p>
    <?php if ( ! empty($cities) ) : ?>
    <ul class="lseo-areas-list" aria-label="Communities we serve">
      <?php foreach ( $cities as $city ) : if ( $city ) : ?>
        <li><?php echo esc_html($city); ?></li>
      <?php endif; endforeach; ?>
    </ul>
    <?php endif; ?>
  </div>

</section>
