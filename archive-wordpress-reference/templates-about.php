<?php
/**
 * Template Name: About
 *
 * HOW TO USE:
 * 1. Assign this template via Page Attributes in the Block Editor.
 * 2. All visible copy is editable through ACF fields (registered in inc/acf-fields.php).
 * 3. Add at least one paragraph block in the editor — Rank Math reads post_content for SEO analysis.
 * 4. Set Rank Math Focus Keyword, Meta Title, and Meta Description in the Rank Math sidebar.
 * 5. This template outputs AboutPage, VeterinaryCare, and FAQ schema as a fallback.
 */

get_header();

$portal_url = vmc_get('vmc_portal_url', '#');

$ft_phone    = vmc_get('vmc_ft_phone', '(859) 442-4420');
$ind_phone   = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_address  = vmc_get('vmc_ft_address', '2000 Memorial Parkway, Fort Thomas, KY 41075');
$ind_address = vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051');

$ft_map_query  = rawurlencode($ft_address);
$ind_map_query = rawurlencode($ind_address);

$ft_phone_href  = preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_phone_href = preg_replace('/[^0-9+]/', '', $ind_phone);

$about_faq_defaults = [
  [ 'Is Veterinary Medical Center independently owned?', 'Yes. Veterinary Medical Center is independently owned and led by Dr. Kristi Baker. That independence helps us keep veterinary care personal, community-rooted, and focused on long-term relationships with pets and families.' ],
  [ 'Are you a vet in Fort Thomas, KY?', 'Yes. Our Fort Thomas veterinary office is located at 2000 Memorial Parkway and serves dogs and cats from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby river city communities.' ],
  [ 'Are you a vet in Independence, KY?', 'Yes. Our Independence veterinary office is located at 4147 Madison Pike and serves pets from Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and surrounding Northern Kentucky neighborhoods.' ],
  [ 'What veterinary services do you offer?', 'We provide wellness exams, preventive medicine, vaccinations, dental care, soft tissue surgery, medical treatment, nutrition guidance, behavior support, and comfort-focused care for dogs and cats.' ],
  [ 'Do you accept new veterinary patients?', 'Yes. New patients are welcome at both Veterinary Medical Center locations. Families can request an appointment online or call Fort Thomas or Independence directly for help choosing the best location and visit type.' ],
  [ 'What makes your approach different?', 'We combine full-service veterinary medicine with clear communication, practical guidance, Fear Free handling, and a pace of care that feels less rushed and more supportive for pets and their people.' ],
];

// Images — prefer ACF field url, fall back to customizer/default
$ft_image  = get_field('about_ft_image')  ?: vmc_get('vmc_about_ft_image', get_template_directory_uri() . '/assets/images/about-fort-thomas.jpg');
$ind_image = get_field('about_ind_image') ?: vmc_get('vmc_about_ind_image', get_template_directory_uri() . '/assets/images/about-independence.jpg');

// Location detail page URLs
$ft_detail_page  = get_page_by_path('vet-in-fort-thomas-ky-locally-owned-trusted-care');
$ft_detail_url   = $ft_detail_page ? get_permalink($ft_detail_page) : home_url('/vet-in-fort-thomas-ky-locally-owned-trusted-care/');

$ind_detail_page = get_page_by_path('vet-in-independence-ky-locally-owned-trusted-pet-care');
$ind_detail_url  = $ind_detail_page ? get_permalink($ind_detail_page) : home_url('/vet-in-independence-ky-locally-owned-trusted-pet-care/');

// Helper: render a textarea value as HTML paragraphs split on newlines
function vmc_about_paras( $text ) {
    $paras = array_filter( array_map( 'trim', explode( "\n\n", $text ) ) );
    foreach ( $paras as $p ) {
        echo '<p>' . esc_html( $p ) . '</p>';
    }
}

// Helper: render a textarea value (one item per line) as <li> elements
function vmc_about_list_items( $text ) {
    $lines = array_filter( array_map( 'trim', explode( "\n", $text ) ) );
    foreach ( $lines as $line ) {
        echo '<li>' . esc_html( $line ) . '</li>';
    }
}
?>

<style>
.about-page{
  background:var(--cream);
}

/* shared page spacing — built to match existing site sections */
.about-sec{
  padding:88px var(--pad);
}
.about-sec-cream{ background:white; }
.about-sec-white{ background:var(--cream); }
.about-sec-warm{ background:var(--warm); }
.about-wrap{
  width:100%;
}
.about-copy{
  margin-top:14px;
  max-width:760px;
  font-size:15px;
  line-height:1.85;
  color:var(--mid);
}
.about-lead{
  max-width:980px;
  font-size:15.5px;
  line-height:1.85;
  color:var(--mid);
  margin-top:14px;
}

/* cards */
.about-card,
.about-panel,
.about-story-card,
.about-story-point,
.about-highlight,
.about-link-card,
.about-point,
.about-hours-card,
.about-loc-card,
.about-faq-card,
.about-location-feature,
.about-stat-card{
  background:var(--white);
  border:1px solid rgba(0,0,0,0.06);
  border-radius:8px;
  box-shadow:0 20px 56px rgba(0,0,0,.06);
}

.about-icon{
  width:40px;
  height:40px;
  border-radius:10px;
  background:var(--rglow);
  color:var(--red);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}

/* hero */
.about-hero{
  display:grid;
  grid-template-columns:1fr 1fr;
  overflow:hidden;
  background:var(--cream);
}
.about-hero-copy{
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:80px 56px 80px 68px;
  position:relative;
  z-index:2;
}
.about-hero-copy::after{
  content:'';
  position:absolute;
  right:0;
  top:15%;
  bottom:15%;
  width:1px;
  background:linear-gradient(to bottom,transparent,rgba(0,0,0,0.08) 20%,rgba(0,0,0,0.08) 80%,transparent);
}
.about-hero-copy .hero-h1{
  max-width:11.5ch;
  font-size:clamp(40px,5vw,64px);
}
.about-hero-copy .hero-body{
  max-width:560px;
}
.about-hero-side{
  display:flex;
  align-items:center;
  justify-content:center;
  padding:42px 42px 42px 28px;
  background:var(--warm);
}
.about-panel{
  width:100%;
  max-width:620px;
  padding:28px;
}
.about-panel h2,
.about-card h3,
.about-story-card h3,
.about-highlight h3,
.about-hours-card h3,
.about-loc-card h3,
.about-faq-card h3,
.about-location-copy h3,
.about-stat-card h3{
  font-family:'Playfair Display',serif;
  color:var(--dark);
}
.about-panel h2{
  font-size:30px;
  line-height:1.08;
  margin-bottom:14px;
}
.about-panel-list{
  display:grid;
  gap:14px;
  margin-top:10px;
}
.about-panel-item{
  display:grid;
  grid-template-columns:40px 1fr;
  gap:12px;
  align-items:start;
  padding-bottom:14px;
  border-bottom:1px solid rgba(0,0,0,0.08);
}
.about-panel-item:last-child{
  border-bottom:none;
  padding-bottom:0;
}
.about-panel-item strong{
  display:block;
  margin-bottom:4px;
  font-size:14px;
  color:var(--dark);
}
.about-panel-item span{
  display:block;
  font-size:13.5px;
  line-height:1.7;
  color:var(--mid);
}
.about-panel-note{
  margin-top:16px;
  font-size:13px;
  line-height:1.7;
  color:var(--mid);
}

/* intro stats */
.about-stats{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:22px;
  margin-top:34px;
}
.about-stat-card{
  padding:26px;
}
.about-stat-card strong{
  display:block;
  font-family:'Playfair Display',serif;
  font-size:38px;
  line-height:1;
  color:var(--red);
  margin-bottom:8px;
}
.about-stat-card h3{
  font-size:20px;
  line-height:1.12;
  margin-bottom:8px;
}
.about-stat-card p{
  font-size:14px;
  line-height:1.75;
  color:var(--mid);
}

/* story */
.about-story-grid{
  display:grid;
  grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr);
  gap:24px;
  margin-top:34px;
}
.about-story-card{
  padding:32px;
}
.about-story-card h3{
  font-size:30px;
  line-height:1.08;
  margin-bottom:12px;
}
.about-story-card p{
  font-size:14px;
  line-height:1.85;
  color:var(--mid);
}
.about-story-points{
  display:grid;
  gap:12px;
}
.about-story-point{
  padding:18px;
}
.about-story-point strong{
  display:block;
  margin-bottom:4px;
  color:var(--dark);
  font-size:14px;
}
.about-story-point span{
  display:block;
  font-size:13px;
  line-height:1.7;
  color:var(--mid);
}

/* services */
.about-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:22px;
  margin-top:34px;
}
.about-card{
  padding:28px;
}
.about-card-top{
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:14px;
}
.about-card h3{
  font-size:26px;
  line-height:1.08;
  margin:0;
}
.about-card p{
  font-size:14px;
  line-height:1.8;
  color:var(--mid);
}
.about-list{
  margin-top:16px;
  padding:0;
  list-style:none;
}
.about-list li{
  padding:10px 0;
  border-bottom:1px solid rgba(0,0,0,0.08);
  font-size:14px;
  line-height:1.7;
  color:var(--mid);
}
.about-list li:last-child{
  border-bottom:none;
  padding-bottom:0;
}

/* values */
.about-highlight-wrap{
  display:grid;
  grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);
  gap:24px;
  margin-top:34px;
  align-items:start;
}
.about-highlight{
  padding:34px;
  height:100%;
}
.about-highlight h3{
  font-size:34px;
  line-height:1.08;
  margin-bottom:12px;
}
.about-highlight p{
  font-size:15px;
  line-height:1.85;
  color:var(--mid);
}
.about-points{
  display:grid;
  gap:14px;
}
.about-point{
  padding:20px;
}
.about-point strong{
  display:block;
  margin-bottom:4px;
  color:var(--dark);
  font-size:14px;
}
.about-point span{
  display:block;
  font-size:13px;
  line-height:1.7;
  color:var(--mid);
}

/* location features */
.about-location-features{
  display:grid;
  gap:24px;
  margin-top:34px;
}
.about-location-feature{
  overflow:hidden;
}
.about-location-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  align-items:stretch;
}
.about-location-grid.reverse{
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
}
.about-location-media{
  min-height:420px;
  background:linear-gradient(135deg,#d8d2ca,#c8c0b5);
}
.about-location-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}
.about-location-copy{
  padding:36px;
}
.about-location-copy h3{
  font-size:34px;
  line-height:1.08;
  margin:10px 0 12px;
}
.about-location-copy p{
  font-size:14.5px;
  line-height:1.85;
  color:var(--mid);
}
.about-location-meta{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
  margin-top:22px;
}
.about-location-meta-card{
  background:var(--cream);
  border:1px solid rgba(0,0,0,.06);
  border-radius:8px;
  padding:16px;
}
.about-location-meta-card strong{
  display:block;
  margin-bottom:4px;
  font-size:12px;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--gold);
}
.about-location-meta-card span,
.about-location-meta-card a{
  font-size:13px;
  line-height:1.7;
  color:var(--mid);
}
.about-location-actions{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-top:24px;
}

/* local SEO */
.about-local-grid{
  display:grid;
  grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);
  gap:24px;
  margin-top:34px;
  align-items:start;
}
.about-local-intro{
  padding:34px;
}
.about-local-intro h3{
  font-family:'Playfair Display',serif;
  font-size:34px;
  line-height:1.08;
  margin-bottom:12px;
  color:var(--dark);
}
.about-local-intro p{
  font-size:15px;
  line-height:1.85;
  color:var(--mid);
}
.about-local-list{
  display:grid;
  gap:14px;
}
.about-local-item{
  padding:22px;
}
.about-local-item h3{
  font-family:'Playfair Display',serif;
  font-size:24px;
  line-height:1.12;
  margin-bottom:8px;
  color:var(--dark);
}
.about-local-item p{
  font-size:14px;
  line-height:1.8;
  color:var(--mid);
}
.about-local-item a{
  display:inline-flex;
  margin-top:12px;
  font-size:14px;
  font-weight:700;
  color:var(--red);
}
.about-link-card{
  padding:28px;
}
.about-link-card h3{
  font-family:'Playfair Display',serif;
  font-size:26px;
  line-height:1.1;
  margin-bottom:10px;
  color:var(--dark);
}
.about-link-card p{
  font-size:14px;
  line-height:1.8;
  color:var(--mid);
}
.about-link-card a{
  color:var(--red);
  font-weight:700;
  text-decoration:none;
}
.about-link-card a:hover{
  text-decoration:underline;
}

/* hours */
.about-hours-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:22px;
  margin-top:34px;
}
.about-hours-card{
  padding:28px;
}
.about-hours-card h3{
  font-size:28px;
  margin-bottom:16px;
}
.about-hours-list{
  display:grid;
  gap:10px;
}
.about-hours-row{
  display:flex;
  justify-content:space-between;
  gap:20px;
  padding-bottom:10px;
  border-bottom:1px solid rgba(0,0,0,0.08);
}
.about-hours-row:last-child{
  border-bottom:none;
  padding-bottom:0;
}
.about-hours-row span{
  font-size:14px;
  line-height:1.6;
  color:var(--mid);
}
.about-hours-row strong{
  font-size:14px;
  line-height:1.6;
  color:var(--dark);
  text-align:right;
}

/* faq */
.about-faq-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:22px;
  margin-top:34px;
}
.about-faq-card{
  padding:28px;
}
.about-faq-card h3{
  font-size:24px;
  line-height:1.12;
  margin-bottom:10px;
}
.about-faq-card p{
  font-size:14px;
  line-height:1.8;
  color:var(--mid);
}

/* cta + location cards */
.about-cta-box{
  background:var(--white);
  border:1px solid rgba(0,0,0,0.06);
  border-radius:8px;
  box-shadow:0 20px 56px rgba(0,0,0,.06);
  padding:34px;
}
.about-cta-box h3{
  font-family:'Playfair Display',serif;
  color:var(--dark);
  font-size:34px;
  line-height:1.08;
  margin-bottom:12px;
}
.about-cta-box p{
  max-width:760px;
  font-size:15px;
  line-height:1.85;
  color:var(--mid);
}
.about-cta-btns{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-top:24px;
}
.about-location-cards{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:22px;
  margin-top:34px;
}
.about-loc-card{
  overflow:hidden;
}
.about-map{
  width:100%;
  height:280px;
  border:0;
  display:block;
  background:var(--warm);
}
.about-loc-body{
  padding:28px;
}
.about-loc-card h3{
  font-size:26px;
  margin-bottom:10px;
}
.about-loc-card p{
  font-size:14px;
  line-height:1.75;
  color:var(--mid);
}
.about-loc-card a{
  display:inline-flex;
  margin-top:12px;
  font-size:14px;
  font-weight:700;
  color:var(--red);
}

/* SEO body */
.about-seo-body{
  margin-top:34px;
  font-size:15px;
  line-height:1.85;
  color:var(--mid);
}
.about-seo-body h2,.about-seo-body h3{
  font-family:'Playfair Display',serif;
  color:var(--dark);
  margin:24px 0 10px;
}

/* Hide the block editor content area visually but keep it readable by Rank Math */
.about-wp-content{
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap;
  border:0;
}

/* responsive */
@media(max-width:1100px){
  .about-hero,
  .about-story-grid,
  .about-grid,
  .about-highlight-wrap,
  .about-local-grid,
  .about-hours-grid,
  .about-location-cards,
  .about-faq-grid,
  .about-location-grid,
  .about-location-grid.reverse{
    grid-template-columns:1fr;
  }

  .about-stats{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }

  .about-location-media{
    min-height:320px;
  }
}

@media(max-width:900px){
  .about-sec{
    padding:56px 24px;
  }

  .about-hero{
    grid-template-columns:1fr;
    padding-top:64px;
  }

  .about-hero-copy{
    padding:48px 24px 34px;
  }

  .about-hero-copy::after{
    display:none;
  }

  .about-hero-side{
    padding:0 24px 48px;
  }

  .about-cta-btns,
  .about-location-actions{
    flex-direction:column;
    align-items:flex-start;
  }

  .about-map{
    height:240px;
  }

  .about-location-meta{
    grid-template-columns:1fr;
  }
}

@media(max-width:560px){
  .about-stats{
    grid-template-columns:1fr;
  }
}
</style>

<?php
if ( have_posts() ) :
  while ( have_posts() ) : the_post(); ?>
    <div class="about-wp-content" aria-hidden="true">
      <?php the_content(); ?>
    </div>
  <?php endwhile;
endif;
?>

<div class="about-page">

  <!-- ═══════════════════════════ HERO ═══════════════════════════ -->
  <section class="about-hero">
    <div class="about-hero-copy">
      <div class="eyebrow">
        <span class="eyebrow-dash"></span>
        <?php echo esc_html( get_field('about_hero_eyebrow') ?: 'About Veterinary Medical Center' ); ?>
      </div>

      <h1 class="hero-h1">
        <?php echo esc_html( get_field('about_hero_title') ?: 'An independently owned veterinary hospital in Northern Kentucky.' ); ?>
      </h1>

      <p class="hero-body">
        <?php echo esc_html( get_field('about_hero_body') ?: 'Veterinary Medical Center is an independently owned veterinary hospital in Northern Kentucky serving Fort Thomas, Independence, and surrounding communities with thoughtful, relationship-based care. Led by Dr. Kristi Baker, our local veterinary team helps dogs, cats, and their families with strong medicine, honest communication, and a calmer visit experience.' ); ?>
      </p>

      <div class="hero-btns">
        <button class="btn-red" onclick="openAptModal('about-hero')"><?php echo esc_html( get_field('about_hero_btn1_label') ?: 'Request Appointment' ); ?></button>
        <a href="#locations" class="btn-ghost"><?php echo esc_html( get_field('about_hero_btn2_label') ?: 'Explore Our Locations' ); ?></a>
      </div>

      <div class="hero-stats">
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('about_stat1_value') ?: 'Local' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('about_stat1_label') ?: 'Independent ownership' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('about_stat2_value') ?: '2' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('about_stat2_label') ?: 'Northern Kentucky locations' ); ?></span>
        </div>
        <div class="hstat">
          <span class="hstat-n"><?php echo esc_html( get_field('about_stat3_value') ?: 'Fear Free' ); ?></span>
          <span class="hstat-l"><?php echo esc_html( get_field('about_stat3_label') ?: 'Comfort-focused visits' ); ?></span>
        </div>
      </div>
    </div>

    <aside class="about-hero-side">
      <div class="about-panel">
        <h2><?php echo esc_html( get_field('about_panel_heading') ?: 'Why families choose VMC' ); ?></h2>

        <div class="about-panel-list">
          <?php
          $panel_icons = [
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-7-11a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 6.65-7 11-7 11z"/></svg>',
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>',
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 8-4-16-3 8H2"/></svg>',
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 9a3 3 0 1 1 6 0c0 3-3 3-3 6"/><circle cx="12" cy="17" r="1"/></svg>',
          ];
          $panel_defaults = [
            [ 'Independent and community-rooted',    'We are based here because we live here, and the pets we care for belong to the same community we call home.' ],
            [ 'Led by Dr. Kristi Baker',              'As owner, Dr. Baker has shaped a veterinary practice that values continuity, compassion, and truly knowing the families it serves.' ],
            [ 'Full-service and relationship-based',  'We support routine wellness, surgery, dental care, and long-term health with a more personal, less rushed approach to veterinary medicine.' ],
            [ 'Real guidance for pet owners',         'We believe families deserve practical support, clear answers, and education that helps pets thrive between visits too.' ],
          ];
          for ( $i = 1; $i <= 4; $i++ ) :
            $title = get_field( "about_panel_item{$i}_title" ) ?: $panel_defaults[$i-1][0];
            $body  = get_field( "about_panel_item{$i}_body" )  ?: $panel_defaults[$i-1][1];
          ?>
          <div class="about-panel-item">
            <div class="about-icon"><?php echo $panel_icons[$i-1]; ?></div>
            <div>
              <strong><?php echo esc_html($title); ?></strong>
              <span><?php echo esc_html($body); ?></span>
            </div>
          </div>
          <?php endfor; ?>
        </div>

        <div class="about-panel-note">
          <?php echo esc_html( get_field('about_panel_note') ?: 'Proudly serving Fort Thomas, Independence, Covington, and pet families throughout Northern Kentucky and Greater Cincinnati.' ); ?>
        </div>
      </div>
    </aside>
  </section>

  <!-- ═══════════════════════════ LOCATIONS ═══════════════════════════ -->
  <section class="about-sec about-sec-cream">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_loc_eyebrow') ?: 'Our Locations' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_loc_heading') ?: 'A Fort Thomas vet and Independence vet with the same personal approach to care.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_loc_body') ?: 'Families choose Veterinary Medical Center because they want both convenience and continuity. With veterinary offices in Fort Thomas and Independence, we serve pet owners across Northern Kentucky while preserving the neighborhood feel that makes care more comfortable and personal.' ); ?>
      </p>

      <div class="about-location-features">
        <!-- Fort Thomas -->
        <article class="about-location-feature">
          <div class="about-location-grid">
            <div class="about-location-media">
              <img src="<?php echo esc_url($ft_image); ?>" alt="Veterinary Medical Center Fort Thomas location">
            </div>
            <div class="about-location-copy">
              <div class="sec-eye" style="margin-bottom:8px;">
                <span class="sec-lbl"><?php echo esc_html( get_field('about_ft_eyebrow') ?: 'Fort Thomas, KY' ); ?></span>
                <span class="sec-rule"></span>
              </div>
              <h3><?php echo esc_html( get_field('about_ft_heading') ?: 'A trusted vet in Fort Thomas for dogs, cats, and their families.' ); ?></h3>
              <p><?php echo esc_html( get_field('about_ft_body1') ?: 'Our Fort Thomas location gives local pet families a trusted veterinarian close to home. This office reflects the same approach that defines our practice everywhere: calm, relationship-based care that makes space for real questions and individualized recommendations.' ); ?></p>
              <p style="margin-top:14px;"><?php echo esc_html( get_field('about_ft_body2') ?: 'For many families, proximity matters. It makes wellness exams, vaccinations, dental follow-ups, and ongoing medical care easier to keep on schedule. We are proud to care for pets from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby communities throughout Northern Kentucky.' ); ?></p>
              <div class="about-location-meta">
                <div class="about-location-meta-card">
                  <strong>Address</strong>
                  <span><?php echo esc_html($ft_address); ?></span>
                </div>
                <div class="about-location-meta-card">
                  <strong>Phone</strong>
                  <a href="tel:<?php echo esc_attr($ft_phone_href); ?>"><?php echo esc_html($ft_phone); ?></a>
                </div>
              </div>
              <div class="about-location-actions">
                <button class="btn-red" onclick="openAptModal('about-ft-location')"><?php echo esc_html( get_field('about_ft_btn1_label') ?: 'Request Appointment' ); ?></button>
                <a href="https://maps.google.com/?q=<?php echo esc_attr($ft_map_query); ?>" class="btn-ghost" target="_blank" rel="noopener"><?php echo esc_html( get_field('about_ft_btn2_label') ?: 'Get Directions' ); ?></a>
                <a href="<?php echo esc_url($ft_detail_url); ?>" class="loc-text-link">More about Fort Thomas →</a>
              </div>
            </div>
          </div>
        </article>

        <!-- Independence -->
        <article class="about-location-feature">
          <div class="about-location-grid reverse">
            <div class="about-location-copy">
              <div class="sec-eye" style="margin-bottom:8px;">
                <span class="sec-lbl"><?php echo esc_html( get_field('about_ind_eyebrow') ?: 'Independence, KY' ); ?></span>
                <span class="sec-rule"></span>
              </div>
              <h3><?php echo esc_html( get_field('about_ind_heading') ?: 'A relationship-focused vet in Independence for everyday and ongoing care.' ); ?></h3>
              <p><?php echo esc_html( get_field('about_ind_body1') ?: 'Our Independence location helps make comprehensive veterinary care more accessible for families who want an independently owned hospital with a more personal feel. Here, pets and people are cared for with the same warmth, clarity, and comfort-focused approach that guides the entire practice.' ); ?></p>
              <p style="margin-top:14px;"><?php echo esc_html( get_field('about_ind_body2') ?: 'This location supports wellness visits, preventive medicine, dentistry, surgery, treatment planning, and ongoing guidance. We are grateful to serve loyal pet owners in Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and the surrounding Northern Kentucky area.' ); ?></p>
              <div class="about-location-meta">
                <div class="about-location-meta-card">
                  <strong>Address</strong>
                  <span><?php echo esc_html($ind_address); ?></span>
                </div>
                <div class="about-location-meta-card">
                  <strong>Phone</strong>
                  <a href="tel:<?php echo esc_attr($ind_phone_href); ?>"><?php echo esc_html($ind_phone); ?></a>
                </div>
              </div>
              <div class="about-location-actions">
                <button class="btn-red" onclick="openAptModal('about-ind-location')"><?php echo esc_html( get_field('about_ind_btn1_label') ?: 'Request Appointment' ); ?></button>
                <a href="https://maps.google.com/?q=<?php echo esc_attr($ind_map_query); ?>" class="btn-ghost" target="_blank" rel="noopener"><?php echo esc_html( get_field('about_ind_btn2_label') ?: 'Get Directions' ); ?></a>
                <a href="<?php echo esc_url($ind_detail_url); ?>" class="loc-text-link">More about Independence →</a>
              </div>
            </div>
            <div class="about-location-media">
              <img src="<?php echo esc_url($ind_image); ?>" alt="Veterinary Medical Center Independence location">
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ LOCAL VET CARE ═══════════════════════════ -->
  <section class="about-sec about-sec-warm">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_local_eyebrow') ?: 'Local Veterinary Care' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_local_heading') ?: 'Veterinary care close to home in Fort Thomas and Independence.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_local_body') ?: 'When you search for a vet in Fort Thomas or a vet in Independence, you are usually looking for more than a nearby address. You want a team that is easy to reach, clear about next steps, and familiar enough with your pet to notice what changes over time.' ); ?>
      </p>

      <div class="about-local-grid">
        <article class="about-local-intro about-card">
          <h3><?php echo esc_html( get_field('about_local_card_heading') ?: 'Care that fits Northern Kentucky families.' ); ?></h3>
          <p><?php echo esc_html( get_field('about_local_card_body') ?: 'Veterinary Medical Center brings preventive care, medical visits, dental care, surgery, and comfort-focused support together under one local practice. With two offices, families can choose the location that best fits their day while still staying connected to the same independent veterinary team.' ); ?></p>
        </article>

        <div class="about-local-list">
          <article class="about-local-item about-card">
            <h3><?php echo esc_html( get_field('about_local_ft_heading') ?: 'For Fort Thomas pet owners' ); ?></h3>
            <p><?php echo esc_html( get_field('about_local_ft_body') ?: 'Our Fort Thomas veterinary team serves families near Memorial Parkway, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and the river city communities. We help with wellness exams, vaccines, dental needs, sick visits, surgery consultations, and practical at-home guidance.' ); ?></p>
            <a href="tel:<?php echo esc_attr($ft_phone_href); ?>"><?php echo esc_html($ft_phone); ?></a>
          </article>

          <article class="about-local-item about-card">
            <h3><?php echo esc_html( get_field('about_local_ind_heading') ?: 'For Independence pet owners' ); ?></h3>
            <p><?php echo esc_html( get_field('about_local_ind_body') ?: 'Our Independence veterinary team serves families near Madison Pike, Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky. We support new puppies and kittens, adult pets, senior pets, and families managing longer-term health needs.' ); ?></p>
            <a href="tel:<?php echo esc_attr($ind_phone_href); ?>"><?php echo esc_html($ind_phone); ?></a>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ ABOUT OUR PRACTICE ═══════════════════════════ -->
  <section class="about-sec about-sec-white">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_practice_eyebrow') ?: 'About Our Practice' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_practice_heading') ?: 'An independently owned veterinary hospital Northern Kentucky families can know by name.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_practice_body') ?: 'When families look for an independently owned veterinary hospital in Northern Kentucky, they are often looking for more than a checklist of services. They want a place where questions are welcome, recommendations are clear, and their pet is treated like an individual. That is the kind of local veterinary practice Veterinary Medical Center was built to be.' ); ?>
      </p>

      <?php
      $stat_cards = [
        [ 'value' => get_field('about_sc1_value') ?: '2',         'heading' => get_field('about_sc1_heading') ?: 'Convenient locations',    'body' => get_field('about_sc1_body') ?: 'We serve pet families from both Fort Thomas and Independence, making it easier to stay connected to care close to home.' ],
        [ 'value' => get_field('about_sc2_value') ?: 'Full',      'heading' => get_field('about_sc2_heading') ?: 'Service hospital',          'body' => get_field('about_sc2_body') ?: 'We provide preventive care, surgery, dental care, and medical support for pets through many life stages and health needs.' ],
        [ 'value' => get_field('about_sc3_value') ?: 'Local',     'heading' => get_field('about_sc3_heading') ?: 'Independent ownership',     'body' => get_field('about_sc3_body') ?: 'Our practice is shaped by the community around us, not by a remote corporate model or one-size-fits-all expectations.' ],
        [ 'value' => get_field('about_sc4_value') ?: 'Fear Free', 'heading' => get_field('about_sc4_heading') ?: 'Comfort-focused care',      'body' => get_field('about_sc4_body') ?: 'We care deeply about making the veterinary experience gentler, calmer, and more supportive for pets and people alike.' ],
      ];
      ?>
      <div class="about-stats">
        <?php foreach ( $stat_cards as $sc ) : ?>
        <article class="about-stat-card">
          <strong><?php echo esc_html($sc['value']); ?></strong>
          <h3><?php echo esc_html($sc['heading']); ?></h3>
          <p><?php echo esc_html($sc['body']); ?></p>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ OUR STORY ═══════════════════════════ -->
  <section class="about-sec about-sec-cream">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_story_eyebrow') ?: 'Our Story' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_story_heading') ?: 'The kind of independently owned veterinary practice you build when this community is your home.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_story_body') ?: 'Veterinary Medical Center was built to serve Northern Kentucky families with care that feels more personal, more thoughtful, and more grounded. Dr. Kristi Baker is licensed in Kentucky and Ohio, but this independently owned veterinary hospital is rooted right here, because this is where we live, where we work, and where we have chosen to invest in long-term relationships with pets and their people.' ); ?>
      </p>

      <div class="about-story-grid">
        <article class="about-story-card">
          <h3><?php echo esc_html( get_field('about_story_card_heading') ?: 'More than a clinic' ); ?></h3>
          <?php
          $story_card_body = get_field('about_story_card_body');
          if ( $story_card_body ) {
              echo wp_kses_post( $story_card_body );
          } else { ?>
            <p>We are a full-service animal hospital, but the heart of this practice has always been bigger than that. We care deeply about the day-to-day lives of the pets we see, the families who trust us, and the kind of experience people walk away with after a visit.</p>
            <p style="margin-top:14px;">That means strong medicine, of course, but it also means kindness, communication, and a calmer environment. We want the waiting room to feel welcoming, the exam room to feel less overwhelming, and every recommendation to feel honest, helpful, and rooted in what is best for your pet.</p>
            <p style="margin-top:14px;">We believe the best veterinary care grows from familiarity and trust. Over time, that helps us understand your pet more fully and support your family more thoughtfully.</p>
          <?php } ?>
        </article>

        <div class="about-story-points">
          <?php
          $story_points = [
            [ get_field('about_sp1_title') ?: 'Owned here. Built here.',         get_field('about_sp1_body') ?: 'This is not a distant corporate practice. It is an independently owned hospital shaped by people who are part of the Fort Thomas, Independence, and Northern Kentucky community.' ],
            [ get_field('about_sp2_title') ?: 'Relationships over transactions',  get_field('about_sp2_body') ?: "We want to know your pet over time, remember your concerns, and be a steady part of your animal's life." ],
            [ get_field('about_sp3_title') ?: 'Wholesome, neighborhood care',     get_field('about_sp3_body') ?: 'Our goal is simple: treat people with warmth, treat pets with gentleness, and care for both like they matter here, because they do.' ],
            [ get_field('about_sp4_title') ?: 'Clear support for pet owners',     get_field('about_sp4_body') ?: 'We want families to leave visits with practical next steps, understandable recommendations, and confidence in how to care well at home.' ],
          ];
          foreach ( $story_points as $sp ) : ?>
          <div class="about-story-point">
            <strong><?php echo esc_html($sp[0]); ?></strong>
            <span><?php echo esc_html($sp[1]); ?></span>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ WHAT WE OFFER ═══════════════════════════ -->
  <section class="about-sec about-sec-white">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_offer_eyebrow') ?: 'What We Offer' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_offer_heading') ?: 'Full-service veterinary care with a more human feel.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_offer_body') ?: 'We welcome routine visits and more serious medical concerns, always with the goal of making care feel thorough, understandable, and supportive. Whether your pet needs preventive care, vaccinations, surgery, dental care, or help with a more complex issue, our team works to make the process clear and personal from the first conversation forward.' ); ?>
      </p>

      <?php
      $offer_icons = [
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M2 12h20"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2l8 8-8 8-8-8z"/><path d="M6 10 2 14l8 8 4-4"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 9a3 3 0 1 1 6 0c0 3-3 3-3 6"/><circle cx="12" cy="17" r="1"/></svg>',
      ];
      $offer_cards = [
        [
          'heading' => get_field('about_oc1_heading') ?: 'Routine & Preventive Care',
          'body'    => get_field('about_oc1_body')    ?: 'Ongoing wellness care helps pets stay healthier over time and helps families feel more confident about what their pets need at each life stage.',
          'list'    => get_field('about_oc1_list')    ?: "Wellness exams for dogs and cats\nVaccinations and parasite prevention\nNutrition support and problem prevention\nLong-term care planning as needs change",
        ],
        [
          'heading' => get_field('about_oc2_heading') ?: 'Medical, Surgical & Dental Care',
          'body'    => get_field('about_oc2_body')    ?: 'From more complex medical conditions to soft tissue surgery and oral health support, we provide comprehensive care under one roof.',
          'list'    => get_field('about_oc2_list')    ?: "Soft tissue surgery\nOral health assessments and treatment\nSupport for serious medical conditions\nThoughtful treatment planning and follow-up",
        ],
        [
          'heading' => get_field('about_oc3_heading') ?: 'Comfort, Behavior & Wellness',
          'body'    => get_field('about_oc3_body')    ?: 'We care about emotional wellbeing too. Mental wellness, lower-stress handling, and a calmer visit experience matter just as much as the treatment plan.',
          'list'    => get_field('about_oc3_list')    ?: "Fear Free Certified approach\nComfort-focused handling and communication\nSupportive care for pets and their people\nA gentler visit for nervous or sensitive pets",
        ],
      ];
      ?>
      <div class="about-grid">
        <?php foreach ( $offer_cards as $idx => $oc ) : ?>
        <article class="about-card">
          <div class="about-card-top">
            <div class="about-icon"><?php echo $offer_icons[$idx]; ?></div>
            <h3><?php echo esc_html($oc['heading']); ?></h3>
          </div>
          <p><?php echo esc_html($oc['body']); ?></p>
          <ul class="about-list">
            <?php vmc_about_list_items( $oc['list'] ); ?>
          </ul>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <?php get_template_part('template-parts/section', 'team'); ?>

  <!-- ═══════════════════════════ LOCAL TRUST LINKS ═══════════════════════════ -->
  <section class="about-sec about-sec-warm">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_links_eyebrow') ?: 'Local Trust' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_links_heading') ?: 'Why an independently owned veterinary hospital matters.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_links_body') ?: 'For many families, choosing an independently owned veterinary hospital in Northern Kentucky means choosing continuity, local accountability, and a team that can shape care around real pets instead of a distant corporate playbook.' ); ?>
      </p>
      <p class="about-copy" style="margin-top:10px">Need online access? Use our <a href="<?php echo esc_url( vmc_patient_portal_page_url() ); ?>" onclick="openPortalModal('portal','about-body'); return false;">patient portal and booking page</a> or the <a href="<?php echo esc_url( vmc_online_pharmacy_page_url() ); ?>" onclick="openPortalModal('pharmacy','about-body'); return false;">online pharmacy</a> for medication and refill support.</p>

      <div class="about-grid">
        <article class="about-link-card">
          <h3><?php echo esc_html( get_field('about_internal_heading') ?: 'Helpful VMC pages' ); ?></h3>
          <p><?php echo esc_html( get_field('about_internal_body') ?: 'These pages help families learn more about our local veterinary team and choose the next step.' ); ?></p>
          <ul class="about-list">
            <li><a href="<?php echo esc_url( home_url('/northern-kentucky-vet-near-me/') ); ?>">Vet near me in Northern Kentucky</a></li>
            <li><a href="<?php echo esc_url( home_url('/first-vet-visit-northern-kentucky/') ); ?>">First vet visit and new patient guide</a></li>
            <li><a href="<?php echo esc_url( home_url('/services/') ); ?>">Veterinary services in Northern Kentucky</a></li>
            <li><a href="<?php echo esc_url( vmc_patient_portal_page_url() ); ?>" onclick="openPortalModal('portal','about-links'); return false;">Patient portal and online booking</a></li>
            <li><a href="<?php echo esc_url( vmc_online_pharmacy_page_url() ); ?>" onclick="openPortalModal('pharmacy','about-links'); return false;">Online vet pharmacy and refill access</a></li>
            <li><a href="<?php echo esc_url( home_url('/veterinary-medical-center-contact/') ); ?>">Contact Fort Thomas or Independence</a></li>
          </ul>
        </article>

        <article class="about-link-card">
          <h3><?php echo esc_html( get_field('about_external_heading') ?: 'Trusted veterinary resources' ); ?></h3>
          <p><?php echo esc_html( get_field('about_external_body') ?: 'These dofollow outside resources support the comfort-focused and cat-friendly care topics families often ask about.' ); ?></p>
          <ul class="about-list">
            <li><a href="https://www.avma.org/resources-tools/pet-owners" target="_blank" rel="noopener">AVMA pet owner resources</a></li>
            <li><a href="https://fearfreepets.com/resources/directory/" target="_blank" rel="noopener">Fear Free pet care resources</a></li>
            <li><a href="https://catfriendly.com/" target="_blank" rel="noopener">Cat Friendly Homes</a></li>
            <li><a href="https://www.aspca.org/pet-care" target="_blank" rel="noopener">ASPCA pet care guidance</a></li>
          </ul>
        </article>

        <article class="about-link-card">
          <h3><?php echo esc_html( get_field('about_compare_heading') ?: 'What local ownership changes' ); ?></h3>
          <p><?php echo esc_html( get_field('about_compare_body') ?: 'Local ownership gives VMC room to emphasize relationship-based medicine, practical communication, community trust, and comfort-focused visits for dogs, cats, and the people who love them.' ); ?></p>
          <ul class="about-list">
            <li>Decisions made close to the pets and families we serve.</li>
            <li>Continuity with a team that wants to know your pet over time.</li>
            <li>Care shaped by Fort Thomas, Independence, and Northern Kentucky.</li>
            <li>Fear Free and cat-friendly awareness built into the visit experience.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ HOURS ═══════════════════════════ -->
  <section class="about-sec about-sec-white">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_hours_eyebrow') ?: 'Hours' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_hours_heading') ?: 'Office hours for both locations.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_hours_body') ?: 'We are proud to serve families in both Independence and Fort Thomas, with hours designed to support everyday care and ongoing relationships.' ); ?>
      </p>

      <?php
      $ind_mon_fri = get_field('about_ind_hours_mon_fri') ?: '8:00 am–6:00 pm';
      $ind_sat     = get_field('about_ind_hours_sat')     ?: 'Closed';
      $ind_sun     = get_field('about_ind_hours_sun')     ?: 'Closed';
      $ft_mon_fri  = get_field('about_ft_hours_mon_fri')  ?: '8:00 am–6:00 pm';
      $ft_sat      = get_field('about_ft_hours_sat')      ?: 'Rotating schedule, please call';
      $ft_sun      = get_field('about_ft_hours_sun')      ?: 'Closed';
      $days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];
      ?>
      <div class="about-hours-grid">
        <article class="about-hours-card">
          <h3>Independence</h3>
          <div class="about-hours-list">
            <?php foreach ( $days as $day ) : ?>
            <div class="about-hours-row"><span><?php echo esc_html($day); ?></span><strong><?php echo esc_html($ind_mon_fri); ?></strong></div>
            <?php endforeach; ?>
            <div class="about-hours-row"><span>Saturday</span><strong><?php echo esc_html($ind_sat); ?></strong></div>
            <div class="about-hours-row"><span>Sunday</span><strong><?php echo esc_html($ind_sun); ?></strong></div>
          </div>
        </article>

        <article class="about-hours-card">
          <h3>Fort Thomas</h3>
          <div class="about-hours-list">
            <?php foreach ( $days as $day ) : ?>
            <div class="about-hours-row"><span><?php echo esc_html($day); ?></span><strong><?php echo esc_html($ft_mon_fri); ?></strong></div>
            <?php endforeach; ?>
            <div class="about-hours-row"><span>Saturday</span><strong><?php echo esc_html($ft_sat); ?></strong></div>
            <div class="about-hours-row"><span>Sunday</span><strong><?php echo esc_html($ft_sun); ?></strong></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ FAQ ═══════════════════════════ -->
  <section class="about-sec about-sec-cream">
    <div class="about-wrap rv">
      <div class="sec-eye">
        <span class="sec-lbl"><?php echo esc_html( get_field('about_faq_eyebrow') ?: 'Frequently Asked Questions' ); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="sec-h2"><?php echo esc_html( get_field('about_faq_heading') ?: 'Helpful answers for families looking for a veterinarian in Fort Thomas or Independence.' ); ?></h2>
      <p class="about-copy">
        <?php echo esc_html( get_field('about_faq_body') ?: 'These are some of the questions pet owners often have when getting to know our practice and deciding whether Veterinary Medical Center is the right fit for their family.' ); ?>
      </p>

      <?php
      $faqs = [
        [ get_field('about_faq1_question') ?: $about_faq_defaults[0][0], get_field('about_faq1_answer') ?: $about_faq_defaults[0][1] ],
        [ get_field('about_faq2_question') ?: $about_faq_defaults[1][0], get_field('about_faq2_answer') ?: $about_faq_defaults[1][1] ],
        [ get_field('about_faq3_question') ?: $about_faq_defaults[2][0], get_field('about_faq3_answer') ?: $about_faq_defaults[2][1] ],
        [ get_field('about_faq4_question') ?: $about_faq_defaults[3][0], get_field('about_faq4_answer') ?: $about_faq_defaults[3][1] ],
        [ get_field('about_faq5_question') ?: $about_faq_defaults[4][0], get_field('about_faq5_answer') ?: $about_faq_defaults[4][1] ],
        [ get_field('about_faq6_question') ?: $about_faq_defaults[5][0], get_field('about_faq6_answer') ?: $about_faq_defaults[5][1] ],
      ];
      ?>
      <div class="about-faq-grid">
        <?php foreach ( $faqs as $faq ) : ?>
        <article class="about-faq-card">
          <h3><?php echo esc_html($faq[0]); ?></h3>
          <p><?php echo esc_html($faq[1]); ?></p>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ CTA + LOCATIONS ═══════════════════════════ -->
  <section class="about-sec about-sec-white" id="locations">
    <div class="about-wrap rv">
      <div class="about-cta-box">
        <div class="sec-eye">
          <span class="sec-lbl"><?php echo esc_html( get_field('about_cta_eyebrow') ?: 'Ready to Visit?' ); ?></span>
          <span class="sec-rule"></span>
        </div>
        <h3><?php echo esc_html( get_field('about_cta_heading') ?: "We'd be honored to care for your pet." ); ?></h3>
        <p>
          <?php echo esc_html( get_field('about_cta_body') ?: 'Whether you are new to the area, looking for a more personal veterinary experience, or simply want a team that feels rooted in the same community you are, we would love to welcome you to Veterinary Medical Center.' ); ?>
        </p>
        <div class="about-cta-btns">
          <button class="btn-red" onclick="openAptModal('about-cta')"><?php echo esc_html( get_field('about_cta_btn1_label') ?: 'Request Appointment' ); ?></button>
          <a href="<?php echo esc_url( get_field('about_cta_btn2_url') ?: '/contact-us' ); ?>" class="btn-ghost"><?php echo esc_html( get_field('about_cta_btn2_label') ?: 'Contact Us' ); ?></a>
          <a href="<?php echo esc_url( get_field('about_cta_btn3_url') ?: '/services' ); ?>" class="btn-ghost"><?php echo esc_html( get_field('about_cta_btn3_label') ?: 'View Services' ); ?></a>
        </div>
      </div>

      <div class="about-location-cards">
        <article class="about-loc-card">
          <iframe class="about-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=<?php echo esc_attr($ft_map_query); ?>&z=15&output=embed"
            title="Map to Fort Thomas location"></iframe>
          <div class="about-loc-body">
            <h3>Fort Thomas</h3>
            <p><?php echo esc_html($ft_address); ?></p>
            <a href="tel:<?php echo esc_attr($ft_phone_href); ?>"><?php echo esc_html($ft_phone); ?></a>
          </div>
        </article>

        <article class="about-loc-card">
          <iframe class="about-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=<?php echo esc_attr($ind_map_query); ?>&z=15&output=embed"
            title="Map to Independence location"></iframe>
          <div class="about-loc-body">
            <h3>Independence</h3>
            <p><?php echo esc_html($ind_address); ?></p>
            <a href="tel:<?php echo esc_attr($ind_phone_href); ?>"><?php echo esc_html($ind_phone); ?></a>
          </div>
        </article>
      </div>

      <?php
      $seo_body = get_field('about_seo_body');
      ?>
        <div class="about-seo-body">
          <?php
          if ( $seo_body ) {
              echo wp_kses_post( $seo_body );
          } else { ?>
            <h2>Independently owned veterinary hospital in Northern Kentucky</h2>
            <p>Veterinary Medical Center is an independently owned veterinary hospital in Northern Kentucky serving families from Fort Thomas, Independence, Covington, Highland Heights, Bellevue, Newport, Taylor Mill, Latonia, Erlanger, Florence, and nearby Greater Cincinnati. Our team helps with wellness exams, vaccinations, dental care, surgery, sick visits, senior pet support, and ongoing treatment planning.</p>
            <h3>Local veterinary care in Fort Thomas and Independence</h3>
            <p>From Fort Thomas, we regularly welcome pet owners from Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby river city neighborhoods. From Independence, we serve families from Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky. Both offices share the same independently owned, relationship-focused approach.</p>
            <h3>Why pet owners choose an independently owned veterinary hospital</h3>
            <p>Families choose Veterinary Medical Center because they want clear communication, continuity, comfort-focused handling, and veterinary recommendations that fit their pet as an individual. If you are comparing an independently owned veterinary hospital with a larger corporate clinic, VMC offers a more personal, community-rooted option for dogs, cats, and the people who love them.</p>
            <h3>A local vet team with Fear Free and cat-friendly awareness</h3>
            <p>Our approach is built around both medical quality and emotional comfort. Fear Free handling, cat-friendly visit awareness, practical education, and honest conversations help make veterinary care easier to return to over time.</p>
          <?php } ?>
        </div>
    </div>
  </section>

</div>

<?php
$about_schema_faqs = [];
foreach ( $faqs as $faq ) {
    $about_schema_faqs[] = [
        '@type' => 'Question',
        'name' => wp_strip_all_tags( $faq[0] ),
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text' => wp_strip_all_tags( $faq[1] ),
        ],
    ];
}

$about_schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'AboutPage',
            '@id' => get_permalink() . '#about',
            'url' => get_permalink(),
            'name' => 'About Veterinary Medical Center',
            'description' => 'About Veterinary Medical Center, an independently owned veterinary hospital serving Fort Thomas and Independence, KY.',
            'about' => [
                '@id' => home_url('/') . '#vmc-organization',
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
            'areaServed' => [ 'Fort Thomas KY', 'Highland Heights KY', 'Bellevue KY', 'Newport KY', 'Dayton KY', 'Cold Spring KY', 'Northern Kentucky' ],
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
            '@id' => get_permalink() . '#about-faq',
            'mainEntity' => $about_schema_faqs,
        ],
    ],
];

echo '<script type="application/ld+json">' . wp_json_encode( $about_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) . '</script>' . "\n";
?>

<?php get_footer(); ?>
