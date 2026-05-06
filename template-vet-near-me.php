<?php
/**
 * Template Name: Vet Near Me SEO Page
 *
 * A local SEO landing page for "vet near me" and related Northern Kentucky
 * searches. Visible content is editable through ACF, with an optional visible
 * block-editor section so Rank Math can analyze native post content too.
 */

get_header();

$ft_phone    = vmc_get('vmc_ft_phone', '(859) 442-4420');
$ind_phone   = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_address  = vmc_get('vmc_ft_address', '2000 Memorial Parkway, Fort Thomas, KY 41075');
$ind_address = vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$ft_phone_href  = preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_phone_href = preg_replace('/[^0-9+]/', '', $ind_phone);
$ft_map_query   = rawurlencode($ft_address);
$ind_map_query  = rawurlencode($ind_address);

$hero_image = get_field('near_hero_image') ?: get_template_directory_uri() . '/assets/images/VMC Social Media.jpg';
$hero_image_alt = get_field('near_hero_image_alt') ?: 'vet near me at Veterinary Medical Center in Northern Kentucky';
$choice_image = get_field('near_choice_image') ?: get_template_directory_uri() . '/assets/images/about-fort-thomas.jpg';
$choice_image_alt = get_field('near_choice_image_alt') ?: 'vet near me for dogs and cats near Fort Thomas Kentucky';
$reviews_image = get_field('near_reviews_image') ?: get_template_directory_uri() . '/assets/images/about-independence.jpg';
$reviews_image_alt = get_field('near_reviews_image_alt') ?: 'vet near me reviews for Veterinary Medical Center Independence Kentucky';

$faq_defaults = [
  [ 'What is the best vet near me in Northern Kentucky?', 'The best local veterinarian is the one your family can reach easily, trust over time, and return to for consistent care. Veterinary Medical Center serves Fort Thomas, Independence, and nearby Northern Kentucky communities with independently owned, relationship-focused veterinary care for dogs and cats.' ],
  [ 'Are you close to downtown Cincinnati?', 'Yes. Our Fort Thomas office is just across the river from downtown Cincinnati, and both VMC locations are convenient for Northern Kentucky families who want local veterinary care without crossing deeper into the city for routine visits.' ],
  [ 'Do you have a vet near Fort Thomas, KY?', 'Yes. Veterinary Medical Center Fort Thomas is located at 2000 Memorial Parkway and serves pets from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby neighborhoods.' ],
  [ 'Do you have a vet near Independence, KY?', 'Yes. Veterinary Medical Center Independence is located at 4147 Madison Pike and serves pets from Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky.' ],
  [ 'Are you locally owned or corporate?', 'Veterinary Medical Center is independently owned and led by Dr. Kristi Baker. Local ownership helps us stay focused on continuity, community relationships, practical communication, and care decisions made close to home.' ],
  [ 'Do you provide Fear Free or cat-friendly veterinary care?', 'Yes. Our team uses a comfort-focused, Fear Free approach, and we care deeply about making visits gentler for cats, nervous pets, and families who want a calmer veterinary experience.' ],
];

function vmc_near_list_items( $text ) {
    $lines = array_filter( array_map( 'trim', explode( "\n", $text ) ) );
    foreach ( $lines as $line ) {
        echo '<li>' . esc_html( $line ) . '</li>';
    }
}
?>

<style>
.near-page{background:var(--cream)}
.near-sec{padding:88px var(--pad)}
.near-sec-white{background:var(--white)}
.near-sec-cream{background:var(--cream)}
.near-sec-warm{background:var(--warm)}
.near-wrap{width:100%}
.near-copy{max-width:780px;margin-top:14px;font-size:15.5px;line-height:1.85;color:var(--mid)}
.near-card,
.near-panel,
.near-image-card,
.near-link-card,
.near-review-card,
.near-location-card,
.near-proof-card,
.near-faq-card,
.near-editor-content{
  background:var(--white);
  border:1px solid rgba(0,0,0,.06);
  border-radius:8px;
  box-shadow:0 20px 56px rgba(0,0,0,.06);
}
.near-hero{
  display:grid;
  grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);
  background:var(--cream);
  min-height:680px;
}
.near-hero-copy{
  padding:118px 64px 82px 68px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.near-hero .hero-h1{
  max-width:13ch;
  font-size:clamp(42px,6vw,70px);
}
.near-hero .hero-body{
  max-width:640px;
}
.near-hero-side{
  padding:110px 52px 72px 24px;
  background:var(--warm);
  display:flex;
  align-items:center;
}
.near-panel{
  width:100%;
  padding:30px;
}
.near-panel h2,
.near-card h3,
.near-location-card h3,
.near-proof-card h3,
.near-faq-card h3,
.near-editor-content h2,
.near-editor-content h3{
  font-family:'Playfair Display',serif;
  color:var(--dark);
}
.near-panel h2{font-size:32px;line-height:1.08;margin-bottom:14px}
.near-panel p{font-size:14.5px;line-height:1.8;color:var(--mid)}
.near-panel-list{display:grid;gap:12px;margin-top:20px}
.near-panel-item{
  padding:16px;
  border-radius:8px;
  background:var(--cream);
  border:1px solid rgba(0,0,0,.05);
}
.near-panel-item strong{display:block;font-size:14px;color:var(--dark);margin-bottom:4px}
.near-panel-item span{display:block;font-size:13px;line-height:1.65;color:var(--mid)}
.near-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:26px}
.near-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:34px}
.near-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:34px}
.near-card,.near-proof-card,.near-faq-card,.near-link-card,.near-review-card{padding:28px}
.near-card h3,.near-proof-card h3,.near-faq-card h3,.near-link-card h3,.near-review-card h3{font-size:26px;line-height:1.1;margin-bottom:10px}
.near-card p,.near-proof-card p,.near-faq-card p,.near-link-card p,.near-review-card p{font-size:14px;line-height:1.8;color:var(--mid)}
.near-image-card{overflow:hidden}
.near-image-card img{width:100%;height:100%;min-height:360px;object-fit:cover}
.near-image-caption{padding:18px 22px;font-size:13px;line-height:1.7;color:var(--mid);background:var(--white)}
.near-link-card a,.near-review-card a{color:var(--red);font-weight:700;text-decoration:none}
.near-link-card a:hover,.near-review-card a:hover{text-decoration:underline}
.near-review-stars{font-size:14px;letter-spacing:.08em;color:var(--gold);margin-bottom:10px}
.near-review-card blockquote{font-size:14px;line-height:1.8;color:var(--mid);margin:0}
.near-review-card cite{display:block;margin-top:12px;font-size:13px;font-style:normal;font-weight:700;color:var(--dark)}
.near-review-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
.near-list{margin-top:16px;padding:0;list-style:none}
.near-list li{padding:10px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:14px;line-height:1.7;color:var(--mid)}
.near-list li:last-child{border-bottom:none;padding-bottom:0}
.near-location-card{overflow:hidden}
.near-location-body{padding:30px}
.near-location-card h3{font-size:30px;line-height:1.08;margin-bottom:10px}
.near-location-card p{font-size:14.5px;line-height:1.82;color:var(--mid)}
.near-location-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:20px}
.near-location-meta div{padding:14px;border-radius:8px;background:var(--cream);border:1px solid rgba(0,0,0,.05)}
.near-location-meta strong{display:block;margin-bottom:4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.near-location-meta span,.near-location-meta a{font-size:13px;line-height:1.7;color:var(--mid)}
.near-map{width:100%;height:260px;border:0;display:block;background:var(--warm)}
.near-seo-body{max-width:980px;margin-top:34px;font-size:15.5px;line-height:1.88;color:var(--mid)}
.near-seo-body h2,.near-seo-body h3{font-family:'Playfair Display',serif;color:var(--dark);margin:26px 0 10px}
.near-editor-content{padding:34px;margin-top:34px;font-size:15.5px;line-height:1.88;color:var(--mid)}
.near-editor-content > * + *{margin-top:14px}
.near-editor-content ul,.near-editor-content ol{padding-left:22px}
.near-editor-content a{color:var(--red);font-weight:700}
@media(max-width:1100px){
  .near-hero,.near-grid-3,.near-grid-2{grid-template-columns:1fr}
  .near-hero{min-height:0;padding-top:70px}
  .near-hero-copy{padding:56px 24px 34px}
  .near-hero-side{padding:0 24px 56px}
}
@media(max-width:700px){
  .near-sec{padding:56px 24px}
  .near-location-meta{grid-template-columns:1fr}
  .near-review-list{grid-template-columns:1fr}
  .near-actions{flex-direction:column;align-items:flex-start}
}
</style>

<div class="near-page">
  <section class="near-hero">
    <div class="near-hero-copy">
      <div class="eyebrow">
        <span class="eyebrow-dash"></span>
        <?php echo esc_html( get_field('near_hero_eyebrow') ?: 'Vet Near Me in Northern Kentucky' ); ?>
      </div>
      <h1 class="hero-h1"><?php echo esc_html( get_field('near_hero_heading') ?: 'Looking for a vet near you in Northern Kentucky?' ); ?></h1>
      <p class="hero-body"><?php echo esc_html( get_field('near_hero_body') ?: 'Veterinary Medical Center is a locally owned veterinary practice with convenient offices in Fort Thomas and Independence, KY. We care for dogs and cats from Northern Kentucky, nearby Greater Cincinnati, and families just across the river from downtown Cincinnati who want personal, compassionate veterinary care close to home.' ); ?></p>
      <div class="near-actions">
        <button class="btn-red" onclick="openAptModal('vet-near-me-hero')"><?php echo esc_html( get_field('near_hero_btn1') ?: 'Request Appointment' ); ?></button>
        <a class="btn-ghost" href="#locations"><?php echo esc_html( get_field('near_hero_btn2') ?: 'Choose a Location' ); ?></a>
        <a class="btn-ghost" href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>"><?php echo esc_html( get_field('near_hero_btn3') ?: 'New Patient Guide' ); ?></a>
      </div>
    </div>

    <aside class="near-hero-side">
      <div class="near-panel">
        <h2><?php echo esc_html( get_field('near_panel_heading') ?: 'Why choose VMC when you search "vet near me"?' ); ?></h2>
        <p><?php echo esc_html( get_field('near_panel_body') ?: 'A nearby vet should be easy to reach, but location is only the beginning. Families choose VMC because our care is personal, local, consistent, and rooted in relationships.' ); ?></p>
        <?php
        $panel_items = [
          [ get_field('near_panel_1_title') ?: 'Locally and independently owned', get_field('near_panel_1_body') ?: 'Led by Dr. Kristi Baker, VMC is shaped by this community instead of a remote corporate model.' ],
          [ get_field('near_panel_2_title') ?: 'Minutes from Cincinnati and NKY neighborhoods', get_field('near_panel_2_body') ?: 'Our Fort Thomas office is just across the river from downtown Cincinnati, and our Independence office serves central Northern Kentucky.' ],
          [ get_field('near_panel_3_title') ?: 'Fear Free and cat-friendly care', get_field('near_panel_3_body') ?: 'We work to make visits calmer for dogs, cats, nervous pets, and the people who love them.' ],
          [ get_field('near_panel_4_title') ?: 'Full-service veterinary medicine', get_field('near_panel_4_body') ?: 'Wellness, dentistry, surgery, medical care, behavior support, and end-of-life guidance are available through one trusted team.' ],
        ];
        ?>
        <div class="near-panel-list">
          <?php foreach ( $panel_items as $item ) : ?>
          <div class="near-panel-item">
            <strong><?php echo esc_html($item[0]); ?></strong>
            <span><?php echo esc_html($item[1]); ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </aside>
  </section>

  <section class="near-sec near-sec-white">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_choice_eyebrow') ?: 'Local Veterinary Care' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_choice_heading') ?: 'Vet near me for Cincinnati, Fort Thomas, and Independence families.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_choice_body') ?: 'If you found this page by searching for a vet near me, you are probably trying to decide who can care for your pet well, communicate clearly, and be close enough for routine visits, follow-ups, and real-life schedules. Veterinary Medical Center was built for families who want that local connection.' ); ?></p>

      <div class="near-grid-2">
        <article class="near-image-card">
          <img src="<?php echo esc_url($hero_image); ?>" alt="<?php echo esc_attr($hero_image_alt); ?>" loading="eager">
          <div class="near-image-caption"><?php echo esc_html( get_field('near_hero_image_caption') ?: 'A local veterinary team for families searching for a vet near me in Northern Kentucky.' ); ?></div>
        </article>
        <article class="near-card">
          <h3><?php echo esc_html( get_field('near_fast_links_heading') ?: 'Fast links for pet owners comparing a vet near me' ); ?></h3>
          <p><?php echo esc_html( get_field('near_fast_links_body') ?: 'If you are ready to take the next step, these pages help you move from research to care without digging through the site.' ); ?></p>
          <ul class="near-list">
            <li><a href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>">Start here if you are a new patient</a></li>
            <li><a href="<?php echo esc_url( home_url('/services/') ); ?>">Compare veterinary services for dogs and cats</a></li>
            <li><a href="<?php echo esc_url( home_url('/about/') ); ?>">Learn why VMC is locally owned and community rooted</a></li>
            <li><a href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">Contact Fort Thomas or Independence</a></li>
          </ul>
        </article>
      </div>

      <?php
      $choice_cards = [
        [ get_field('near_choice_1_title') ?: 'Women-led and locally owned', get_field('near_choice_1_body') ?: 'VMC is led by Dr. Kristi Baker and grounded in the Northern Kentucky community. Decisions are made by people who know this area, not by a distant corporate office.', get_field('near_choice_1_list') ?: "Independent ownership\nCommunity-rooted decision making\nCare built around long-term relationships" ],
        [ get_field('near_choice_2_title') ?: 'Compassionate, Fear Free care', get_field('near_choice_2_body') ?: 'We care about how veterinary medicine feels. Lower-stress handling, clear communication, and gentler visits are especially important for anxious pets and cats.', get_field('near_choice_2_list') ?: "Fear Free handling principles\nCat-friendly visit awareness\nSupport for nervous or sensitive pets" ],
        [ get_field('near_choice_3_title') ?: 'Two convenient Northern Kentucky offices', get_field('near_choice_3_body') ?: 'With locations in Fort Thomas and Independence, families can choose the office that fits their commute, neighborhood, and pet care needs.', get_field('near_choice_3_list') ?: "Fort Thomas near downtown Cincinnati\nIndependence for central NKY\nEasy access from nearby communities" ],
      ];
      ?>
      <div class="near-grid-3">
        <?php foreach ( $choice_cards as $card ) : ?>
        <article class="near-card">
          <h3><?php echo esc_html($card[0]); ?></h3>
          <p><?php echo esc_html($card[1]); ?></p>
          <ul class="near-list"><?php vmc_near_list_items( $card[2] ); ?></ul>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-warm">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_services_eyebrow') ?: 'What We Help With' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_services_heading') ?: 'Vet near me for full-service dog and cat care.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_services_body') ?: 'A strong local veterinary relationship should support your pet through everyday wellness and more complicated seasons of life. Our team helps with preventive care, sick visits, oral health, surgery, behavior conversations, and compassionate guidance when needs change.' ); ?></p>

      <div class="near-grid-2">
        <article class="near-card">
          <h3><?php echo esc_html( get_field('near_care_path_heading') ?: 'What a vet near me should make easier' ); ?></h3>
          <p><?php echo esc_html( get_field('near_care_path_body') ?: 'Local veterinary care should reduce friction. That means a practical location, clear next steps, helpful records transfer, transparent conversations, and a team that helps you understand what your pet needs now and what can wait.' ); ?></p>
          <ul class="near-list">
            <li>New puppy, kitten, adult pet, and senior pet visits</li>
            <li>Preventive care, dental care, surgery, and sick visits</li>
            <li>Gentler handling for cats and nervous pets</li>
            <li>Clear recommendations before treatment decisions</li>
          </ul>
        </article>
        <article class="near-image-card">
          <img src="<?php echo esc_url($choice_image); ?>" alt="<?php echo esc_attr($choice_image_alt); ?>" loading="lazy">
          <div class="near-image-caption"><?php echo esc_html( get_field('near_choice_image_caption') ?: 'A visible image with vet near me alt text for local search relevance.' ); ?></div>
        </article>
      </div>

      <?php
      $service_cards = [
        [ get_field('near_service_1_title') ?: 'Wellness and preventive care', get_field('near_service_1_body') ?: 'Routine exams, vaccines, parasite prevention, nutrition conversations, and life-stage planning for dogs and cats.' ],
        [ get_field('near_service_2_title') ?: 'Dental care and surgery', get_field('near_service_2_body') ?: 'Oral health assessments, dental treatment planning, soft tissue surgery, anesthesia monitoring, and recovery support.' ],
        [ get_field('near_service_3_title') ?: 'Medical visits and second opinions', get_field('near_service_3_body') ?: 'Thoughtful support for sick visits, chronic conditions, new symptoms, records review, and treatment planning.' ],
        [ get_field('near_service_4_title') ?: 'Behavior, comfort, and end-of-life care', get_field('near_service_4_body') ?: 'Support for anxiety, quality-of-life conversations, comfort-focused care, and compassionate end-of-life decisions.' ],
      ];
      ?>
      <div class="near-grid-2">
        <?php foreach ( $service_cards as $card ) : ?>
        <article class="near-proof-card">
          <h3><?php echo esc_html($card[0]); ?></h3>
          <p><?php echo esc_html($card[1]); ?></p>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-white">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_reviews_eyebrow') ?: 'Local Reviews' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_reviews_heading') ?: 'Pet owners searching for a vet near me choose VMC for comfort, clarity, and follow-through.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_reviews_body') ?: 'Real local families often mention the same things: thorough exams, gentle cat visits, clear estimates, follow-up calls, and a team that treats pets like family.' ); ?></p>

      <div class="near-grid-2">
        <article class="near-image-card">
          <img src="<?php echo esc_url($reviews_image); ?>" alt="<?php echo esc_attr($reviews_image_alt); ?>" loading="lazy">
          <div class="near-image-caption"><?php echo esc_html( get_field('near_reviews_image_caption') ?: 'Review themes from families who found their local vet near Fort Thomas and Independence.' ); ?></div>
        </article>

        <div class="near-review-list">
          <?php
          $review_cards = [
            [ get_field('near_review_1_quote') ?: 'They treat your furbabies like family.', get_field('near_review_1_author') ?: 'Local pet owner' ],
            [ get_field('near_review_2_quote') ?: 'The vet tech actually sat on the floor with my kitty.', get_field('near_review_2_author') ?: 'Cat owner near Northern Kentucky' ],
            [ get_field('near_review_3_quote') ?: 'Went over prices before the treatment.', get_field('near_review_3_author') ?: 'VMC client' ],
            [ get_field('near_review_4_quote') ?: 'They even called to check on him.', get_field('near_review_4_author') ?: 'Local reviewer' ],
          ];
          foreach ( $review_cards as $review ) : ?>
          <article class="near-review-card">
            <div class="near-review-stars" aria-label="Five star review">5 / 5</div>
            <blockquote>&ldquo;<?php echo esc_html($review[0]); ?>&rdquo;</blockquote>
            <cite><?php echo esc_html($review[1]); ?></cite>
          </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-white" id="locations">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_locations_eyebrow') ?: 'Choose Your Location' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_locations_heading') ?: 'Vet near me with two local Northern Kentucky offices.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_locations_body') ?: 'Whether you live close to downtown Cincinnati, along the river cities, or farther south in Kenton County, VMC gives you a local veterinary team with two practical options for care.' ); ?></p>

      <div class="near-grid-2">
        <article class="near-location-card">
          <iframe class="near-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=<?php echo esc_attr($ft_map_query); ?>&z=15&output=embed" title="Map to Veterinary Medical Center Fort Thomas"></iframe>
          <div class="near-location-body">
            <h3><?php echo esc_html( get_field('near_ft_heading') ?: 'Vet near Fort Thomas and downtown Cincinnati' ); ?></h3>
            <p><?php echo esc_html( get_field('near_ft_body') ?: 'Our Fort Thomas office is convenient for families in Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Greater Cincinnati. It is a practical choice for pet owners who want a veterinarian near downtown Cincinnati without losing the personal feel of a local Northern Kentucky practice.' ); ?></p>
            <div class="near-location-meta">
              <div><strong>Address</strong><span><?php echo esc_html($ft_address); ?></span></div>
              <div><strong>Phone</strong><a href="tel:<?php echo esc_attr($ft_phone_href); ?>"><?php echo esc_html($ft_phone); ?></a></div>
            </div>
            <div class="near-actions">
              <button class="btn-red" onclick="openAptModal('vet-near-me-ft')">Request Appointment</button>
              <a class="btn-ghost" href="https://maps.google.com/?q=<?php echo esc_attr($ft_map_query); ?>" target="_blank" rel="noopener">Get Directions</a>
            </div>
          </div>
        </article>

        <article class="near-location-card">
          <iframe class="near-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=<?php echo esc_attr($ind_map_query); ?>&z=15&output=embed" title="Map to Veterinary Medical Center Independence"></iframe>
          <div class="near-location-body">
            <h3><?php echo esc_html( get_field('near_ind_heading') ?: 'Vet near Independence and central Northern Kentucky' ); ?></h3>
            <p><?php echo esc_html( get_field('near_ind_body') ?: 'Our Independence office is convenient for families in Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and surrounding central Northern Kentucky communities. It gives local pet owners access to full-service care with an independently owned, relationship-based team.' ); ?></p>
            <div class="near-location-meta">
              <div><strong>Address</strong><span><?php echo esc_html($ind_address); ?></span></div>
              <div><strong>Phone</strong><a href="tel:<?php echo esc_attr($ind_phone_href); ?>"><?php echo esc_html($ind_phone); ?></a></div>
            </div>
            <div class="near-actions">
              <button class="btn-red" onclick="openAptModal('vet-near-me-ind')">Request Appointment</button>
              <a class="btn-ghost" href="https://maps.google.com/?q=<?php echo esc_attr($ind_map_query); ?>" target="_blank" rel="noopener">Get Directions</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-warm">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_links_eyebrow') ?: 'Helpful Resources' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_links_heading') ?: 'Resources for choosing a vet near me with confidence.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_links_body') ?: 'A strong SEO page should still be useful. These internal and external resources help families make a better decision about veterinary care, cat-friendly visits, and Fear Free handling.' ); ?></p>

      <div class="near-grid-2">
        <article class="near-link-card">
          <h3><?php echo esc_html( get_field('near_internal_heading') ?: 'Explore VMC next' ); ?></h3>
          <p><?php echo esc_html( get_field('near_internal_body') ?: 'Move from research to action with the pages most pet owners need after choosing a local veterinarian.' ); ?></p>
          <ul class="near-list">
            <li><a href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>">First vet visit and new patient appointments</a></li>
            <li><a href="<?php echo esc_url( home_url('/services/') ); ?>">Veterinary services in Northern Kentucky</a></li>
            <li><a href="<?php echo esc_url( home_url('/about/') ); ?>">About Veterinary Medical Center</a></li>
            <li><a href="<?php echo esc_url( home_url('/blog/') ); ?>">Pet health articles from the VMC team</a></li>
          </ul>
        </article>

        <article class="near-link-card">
          <h3><?php echo esc_html( get_field('near_external_heading') ?: 'Trusted outside resources' ); ?></h3>
          <p><?php echo esc_html( get_field('near_external_body') ?: 'These dofollow external resources support the care topics families often ask about before booking a local vet visit.' ); ?></p>
          <ul class="near-list">
            <li><a href="https://www.avma.org/resources-tools/pet-owners" target="_blank" rel="noopener">AVMA pet owner resources</a></li>
            <li><a href="https://fearfreepets.com/resources/directory/" target="_blank" rel="noopener">Fear Free pet care resources</a></li>
            <li><a href="https://catfriendly.com/" target="_blank" rel="noopener">Cat Friendly Homes by feline veterinary experts</a></li>
            <li><a href="https://www.aspca.org/pet-care" target="_blank" rel="noopener">ASPCA pet care guidance</a></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-cream">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_faq_eyebrow') ?: 'Vet Near Me FAQ' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_faq_heading') ?: 'Vet near me questions families ask before booking.' ); ?></h2>
      <p class="near-copy"><?php echo esc_html( get_field('near_faq_body') ?: 'Choosing a veterinarian is personal. These answers are written for families comparing local vets near Fort Thomas, Independence, downtown Cincinnati, and the Northern Kentucky communities around us.' ); ?></p>
      <?php
      $faqs = [];
      for ( $i = 1; $i <= 6; $i++ ) {
          $faqs[] = [
              get_field("near_faq{$i}_question") ?: $faq_defaults[$i - 1][0],
              get_field("near_faq{$i}_answer") ?: $faq_defaults[$i - 1][1],
          ];
      }
      ?>
      <div class="near-grid-2">
        <?php foreach ( $faqs as $faq ) : ?>
        <article class="near-faq-card">
          <h3><?php echo esc_html($faq[0]); ?></h3>
          <p><?php echo esc_html($faq[1]); ?></p>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="near-sec near-sec-white">
    <div class="near-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('near_seo_eyebrow') ?: 'Local Veterinary Search Guide' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('near_seo_heading') ?: 'When "vet near me" should mean local, personal, and close by.' ); ?></h2>
      <div class="near-seo-body">
        <?php
        $seo_body = get_field('near_seo_body');
        if ( $seo_body ) {
            echo wp_kses_post( $seo_body );
        } else { ?>
          <p>Search engines can show many options when you type vet near me, veterinarian near me, animal hospital near me, or local vet near Cincinnati. The better question is which veterinary team will know your pet, communicate clearly, and be close enough to support your family through wellness visits, follow-up appointments, dental care, medical concerns, and the unexpected questions that come with pet ownership.</p>
          <p>If you are comparing every vet near me result in Northern Kentucky, look beyond distance alone. A nearby veterinarian should also offer practical appointment options, helpful communication, and a team your pet can return to over time.</p>
          <p>Veterinary Medical Center serves Northern Kentucky with two convenient offices in Fort Thomas and Independence. Our Fort Thomas location is close to downtown Cincinnati and the river city communities, while our Independence location supports families throughout central Northern Kentucky. Both offices share the same local ownership, compassionate culture, and relationship-based approach to veterinary medicine.</p>
          <h3>Why locally owned veterinary care matters</h3>
          <p>Local ownership changes the feel of care. It means the people setting the tone for the practice are present in the hospital, invested in the community, and available to shape decisions around real families. VMC is women-led, independently owned, and rooted in Northern Kentucky, which helps us prioritize continuity, honesty, comfort, and practical guidance over a one-size-fits-all model.</p>
          <h3>A calmer choice for dogs, cats, and nervous pets</h3>
          <p>Our Fear Free and cat-friendly mindset is part of how we care. We think about handling, pacing, communication, and emotional comfort because a better visit experience can make veterinary care easier for pets and their people. If your pet is nervous, sensitive, shy, or overdue because past visits have been stressful, our team would be glad to talk through what may help.</p>
          <h3>Start with the page that fits your next step</h3>
          <p>New to VMC? Visit our <a href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>">new patients page</a> for first-visit guidance. Comparing care options? Learn more <a href="<?php echo esc_url( home_url('/about/') ); ?>">about our locally owned practice</a>. Looking for a specific appointment type? Review our <a href="<?php echo esc_url( home_url('/services/') ); ?>">veterinary services</a> or contact either location for help choosing the right visit.</p>
          <h3>Ready to stop searching vet near me?</h3>
          <p>When you are ready to move from research to care, our Fort Thomas and Independence teams can help you choose the right location, transfer records, and schedule the visit that fits your pet's needs.</p>
        <?php } ?>
      </div>

      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php if ( trim( wp_strip_all_tags( get_the_content() ) ) ) : ?>
          <div class="near-editor-content">
            <?php the_content(); ?>
          </div>
        <?php endif; ?>
      <?php endwhile; endif; ?>

      <div class="near-actions">
        <button class="btn-red" onclick="openAptModal('vet-near-me-bottom')"><?php echo esc_html( get_field('near_final_btn1') ?: 'Request Appointment' ); ?></button>
        <a class="btn-ghost" href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>"><?php echo esc_html( get_field('near_final_btn2') ?: 'Contact Us' ); ?></a>
      </div>
    </div>
  </section>
</div>

<?php
$schema_faqs = [];
foreach ( $faqs as $faq ) {
    $schema_faqs[] = [
        '@type' => 'Question',
        'name' => wp_strip_all_tags( $faq[0] ),
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text' => wp_strip_all_tags( $faq[1] ),
        ],
    ];
}

$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'WebPage',
            '@id' => get_permalink() . '#webpage',
            'url' => get_permalink(),
            'name' => 'Vet Near Me in Northern Kentucky',
            'description' => 'Local, independently owned veterinary care near Fort Thomas, Independence, Northern Kentucky, and downtown Cincinnati.',
            'about' => [
                '@type' => 'Thing',
                'name' => 'Veterinary care near me',
            ],
        ],
        [
            '@type' => 'VeterinaryCare',
            '@id' => home_url('/') . '#vmc-fort-thomas',
            'name' => 'Veterinary Medical Center - Fort Thomas',
            'url' => get_permalink(),
            'telephone' => $ft_phone,
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '2000 Memorial Parkway',
                'addressLocality' => 'Fort Thomas',
                'addressRegion' => 'KY',
                'postalCode' => '41075',
                'addressCountry' => 'US',
            ],
            'areaServed' => [ 'Fort Thomas KY', 'Downtown Cincinnati OH', 'Highland Heights KY', 'Bellevue KY', 'Newport KY', 'Dayton KY', 'Cold Spring KY', 'Northern Kentucky' ],
            'medicalSpecialty' => 'Veterinary medicine',
        ],
        [
            '@type' => 'VeterinaryCare',
            '@id' => home_url('/') . '#vmc-independence',
            'name' => 'Veterinary Medical Center - Independence',
            'url' => get_permalink(),
            'telephone' => $ind_phone,
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '4147 Madison Pike',
                'addressLocality' => 'Independence',
                'addressRegion' => 'KY',
                'postalCode' => '41051',
                'addressCountry' => 'US',
            ],
            'areaServed' => [ 'Independence KY', 'Covington KY', 'Taylor Mill KY', 'Latonia KY', 'Erlanger KY', 'Florence KY', 'Northern Kentucky' ],
            'medicalSpecialty' => 'Veterinary medicine',
        ],
        [
            '@type' => 'FAQPage',
            '@id' => get_permalink() . '#faq',
            'mainEntity' => $schema_faqs,
        ],
    ],
];

echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) . '</script>' . "\n";
?>

<?php get_footer(); ?>
