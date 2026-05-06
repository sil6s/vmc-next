<?php
/**
 * Single Location Template — Veterinary Medical Center
 * Template Name: Location Template
 *
 * ACF Fields (free ACF, registered in inc/acf-fields.php —
 * shows in the admin for any page using this template):
 *
 *   loc_subtitle     Hero sub-heading
 *   loc_intro        Intro paragraph (shown in intro card; falls back to excerpt)
 *   loc_phone        Formatted phone: (859) 442-4420
 *   loc_phone_link   tel: href: tel:+18594424420
 *   loc_address      Street address
 *   loc_hours        Weekday hours string
 *   loc_sat_hours    Saturday hours (optional)
 *   loc_map_embed    Google Maps embed URL (src only, not the full iframe tag)
 *   loc_highlights   Pipe-separated: "Locally owned|Fear-free certified"
 *   loc_nearby       Pipe-separated nearby areas: "Highland Heights|Bellevue"
 *   loc_faqs         Newline-separated: Question||Answer
 *   loc_cta_title    CTA band heading (defaults to "Ready to visit {title}?")
 *   loc_cta_text     CTA band body text
 *
 * Legacy meta keys (_vmc_loc_*) are still supported as a fallback so any
 * data entered via Screen Options → Custom Fields continues to work.
 */

get_header();
if ( ! have_posts() ) { get_footer(); return; }
while ( have_posts() ) : the_post();

$sid   = get_the_ID();
$title = get_the_title();

/* ── Helper: ACF field with legacy meta fallback ─────────── */
$loc_f = function( $acf_name, $legacy_key = '', $default = '' ) use ( $sid ) {
    $val = function_exists( 'get_field' ) ? get_field( $acf_name, $sid ) : '';
    if ( ! $val && $legacy_key ) {
        $val = get_post_meta( $sid, $legacy_key, true );
    }
    return $val ?: $default;
};

/* ── Core data ──────────────────────────────────────────── */
$excerpt = has_excerpt()
    ? get_the_excerpt()
    : wp_trim_words( wp_strip_all_tags( get_the_content() ), 32, '…' );

$hero_img = get_the_post_thumbnail_url( $sid, 'full' );

/* ── Links ──────────────────────────────────────────────── */
$contact_pg   = get_page_by_path( 'contact' );
$contact_link = $contact_pg ? get_permalink( $contact_pg ) : home_url( '/contact/' );
$np_pg        = get_page_by_path( 'new-patients' );
$np_link      = $np_pg ? get_permalink( $np_pg ) : home_url( '/new-patients/' );

/* ── Location meta ──────────────────────────────────────── */
$subtitle  = $loc_f( 'loc_subtitle',   '_vmc_loc_subtitle',   'Local, relationship-based veterinary care for dogs and cats.' );
$intro     = $loc_f( 'loc_intro',      '_vmc_loc_intro',      $excerpt );
$phone     = $loc_f( 'loc_phone',      '_vmc_loc_phone',      '(859) 442-4420' );
$phone_url = $loc_f( 'loc_phone_link', '_vmc_loc_phone_link', 'tel:+18594424420' );
$address   = $loc_f( 'loc_address',    '_vmc_loc_address',    '2000 Memorial Pkwy, Fort Thomas, KY 41075' );
$hours     = $loc_f( 'loc_hours',      '_vmc_loc_hours',      'Mon–Fri 8:00 AM – 6:00 PM' );
$sat_hours = $loc_f( 'loc_sat_hours',  '_vmc_loc_sat_hours',  '' );
$map_embed = $loc_f( 'loc_map_embed',  '_vmc_loc_map_embed',  '' );
/* translators: %s = location name */
$cta_title = $loc_f( 'loc_cta_title', '_vmc_loc_cta_title', sprintf( __( 'Ready to visit %s?', 'vmc' ), $title ) );
$cta_text  = $loc_f( 'loc_cta_text',  '_vmc_loc_cta_text',  'Call, request an appointment online, or complete your new patient form before your first visit.' );

/* Highlights — pipe-separated */
$hl_raw     = $loc_f( 'loc_highlights', '_vmc_loc_highlights', '' );
$highlights = $hl_raw ? array_filter( array_map( 'trim', explode( '|', $hl_raw ) ) ) : [];

/* Nearby areas — pipe-separated */
$nb_raw = $loc_f( 'loc_nearby', '_vmc_loc_nearby', '' );
$nearby = $nb_raw ? array_filter( array_map( 'trim', explode( '|', $nb_raw ) ) ) : [];

/* FAQs — newline-separated, Question||Answer */
$faq_raw = $loc_f( 'loc_faqs', '_vmc_loc_faqs', '' );
$faqs    = [];
if ( $faq_raw ) {
    foreach ( array_filter( array_map( 'trim', explode( "\n", $faq_raw ) ) ) as $line ) {
        $p = explode( '||', $line, 2 );
        if ( ! empty( $p[0] ) && ! empty( $p[1] ) ) {
            $faqs[] = [ 'question' => trim( $p[0] ), 'answer' => trim( $p[1] ) ];
        }
    }
}

/* ── FAQ schema ─────────────────────────────────────────── */
$faq_schema = [];
foreach ( $faqs as $f ) {
    $faq_schema[] = [
        '@type'          => 'Question',
        'name'           => wp_strip_all_tags( $f['question'] ),
        'acceptedAnswer' => [ '@type' => 'Answer', 'text' => wp_strip_all_tags( $f['answer'] ) ],
    ];
}
?>

<?php if ( ! empty( $faq_schema ) ) : ?>
<script type="application/ld+json">
<?php echo wp_json_encode( [ '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $faq_schema ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ); ?>
</script>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */ ?>
<section class="hero hero-service hero-location">
    <div class="hero-copy">
        <div class="eyebrow">
            <span class="eyebrow-dash"></span>
            <?php esc_html_e( 'Our Locations', 'vmc' ); ?>
        </div>
        <h1 class="hero-h1"><?php echo esc_html( $title ); ?></h1>
        <p class="hero-body"><?php echo esc_html( $subtitle ); ?></p>
        <div class="hero-btns">
            <a href="<?php echo esc_url( $contact_link ); ?>" class="btn-red" onclick="openAptModal('loc-hero'); return false;"><?php esc_html_e( 'Request an Appointment', 'vmc' ); ?></a>
            <a href="<?php echo esc_url( $np_link ); ?>" class="btn-ghost">
                <?php esc_html_e( 'New patients start here', 'vmc' ); ?>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>

    <div class="hero-img">
        <?php if ( $hero_img ) : ?>
            <img src="<?php echo esc_url( $hero_img ); ?>"
                 alt="<?php echo esc_attr( $title . ' — Veterinary Medical Center' ); ?>"
                 loading="eager" width="900" height="675">
        <?php endif; ?>
        <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            <div class="hero-badge-inner">
                <span class="hero-badge-title"><?php esc_html_e( 'Locally Owned', 'vmc' ); ?></span>
                <span class="hero-badge-sub"><?php esc_html_e( 'Northern Kentucky', 'vmc' ); ?></span>
            </div>
        </div>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   BREADCRUMBS
══════════════════════════════════════════ */ ?>
<section class="svc-bc-wrap">
    <div class="svc-bc-inner">
        <nav class="svc-bc" aria-label="Breadcrumb">
            <span class="svc-bc-label"><?php esc_html_e( 'You are here', 'vmc' ); ?></span>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="svc-bc-link"><?php esc_html_e( 'Home', 'vmc' ); ?></a>
            <span class="svc-bc-sep" aria-hidden="true">/</span>
            <a href="<?php echo esc_url( home_url( '/locations/' ) ); ?>" class="svc-bc-link"><?php esc_html_e( 'Locations', 'vmc' ); ?></a>
            <span class="svc-bc-sep" aria-hidden="true">/</span>
            <span class="svc-bc-current" aria-current="page"><?php echo esc_html( $title ); ?></span>
        </nav>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   HIGHLIGHTS STRIP
══════════════════════════════════════════ */ ?>
<?php if ( ! empty( $highlights ) ) : ?>
<div class="svc-hl-strip">
    <?php foreach ( $highlights as $hl ) : ?>
        <span class="svc-hl-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <?php echo esc_html( $hl ); ?>
        </span>
    <?php endforeach; ?>
</div>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   MAIN CONTENT + SIDEBAR
══════════════════════════════════════════ */ ?>
<section class="svc-single-wrap">
    <div class="svc-single-container">

        <article class="svc-single-body" itemscope itemtype="https://schema.org/VeterinaryCare">

            <div class="svc-intro-card">
                <div class="svc-intro-icon">
                    <svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                </div>
                <div class="svc-intro-text">
                    <p class="svc-intro-label"><?php esc_html_e( 'About This Location', 'vmc' ); ?></p>
                    <p itemprop="description"><?php echo esc_html( $intro ); ?></p>
                </div>
            </div>

            <div class="svc-entry loc-entry">
                <?php the_content(); ?>
            </div>

        </article>

        <aside class="svc-sidebar" aria-label="Location contact details">

            <div class="svc-side-card">
                <div class="svc-side-card-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.23 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    <?php esc_html_e( 'Call or visit us', 'vmc' ); ?>
                </div>

                <div class="svc-side-loc">
                    <strong itemprop="name"><?php echo esc_html( $title ); ?></strong>
                    <address itemprop="address"><?php echo esc_html( $address ); ?></address>
                    <a href="<?php echo esc_url( $phone_url ); ?>" itemprop="telephone"><?php echo esc_html( $phone ); ?></a>
                </div>

                <?php if ( $hours ) : ?>
                <div class="loc-side-hours">
                    <span class="loc-side-hours-label">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <?php esc_html_e( 'Hours', 'vmc' ); ?>
                    </span>
                    <div class="loc-side-hours-val">
                        <span><?php echo esc_html( $hours ); ?></span>
                        <?php if ( $sat_hours ) : ?>
                            <span><?php echo esc_html( $sat_hours ); ?></span>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endif; ?>

                <div class="loc-side-actions">
                    <a href="<?php echo esc_url( $contact_link ); ?>" class="btn-red svc-side-cta" onclick="openAptModal('loc-sidebar'); return false;"><?php esc_html_e( 'Request Appointment', 'vmc' ); ?></a>
                    <a href="https://maps.google.com/?q=<?php echo rawurlencode( $address ); ?>" target="_blank" rel="noopener noreferrer" class="btn-ghost loc-directions-btn">
                        <?php esc_html_e( 'Get Directions', 'vmc' ); ?>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>

            <?php if ( ! empty( $highlights ) ) : ?>
            <div class="svc-side-hl">
                <p class="svc-side-hl-label"><?php esc_html_e( 'Quick highlights', 'vmc' ); ?></p>
                <ul>
                    <?php foreach ( $highlights as $hl ) : ?>
                        <li><?php echo esc_html( $hl ); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

            <?php if ( ! empty( $nearby ) ) : ?>
            <div class="svc-side-hl loc-side-nearby">
                <p class="svc-side-hl-label"><?php esc_html_e( 'Nearby areas we serve', 'vmc' ); ?></p>
                <div class="loc-nearby-chips">
                    <?php foreach ( $nearby as $area ) : ?>
                        <span class="loc-nearby-chip"><?php echo esc_html( $area ); ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <div class="svc-side-nudge">
                <p><?php esc_html_e( 'New to this practice?', 'vmc' ); ?></p>
                <a href="<?php echo esc_url( $np_link ); ?>" class="btn-ghost">
                    <?php esc_html_e( 'Start here', 'vmc' ); ?>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>

        </aside>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   MAP SECTION
══════════════════════════════════════════ */ ?>
<?php if ( $map_embed ) : ?>
<section class="loc-map-section">
    <div class="loc-map-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e( 'Find Us', 'vmc' ); ?></span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2"><?php printf( esc_html__( 'Visit %s', 'vmc' ), esc_html( $title ) ); ?></h2>
        <div class="loc-map-grid">
            <div class="loc-map-card">
                <iframe
                    src="<?php echo esc_url( $map_embed ); ?>"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="<?php echo esc_attr( $title . ' map' ); ?>">
                </iframe>
            </div>
            <div class="loc-map-details">
                <div class="loc-detail-row">
                    <div class="loc-detail-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    </div>
                    <div>
                        <strong><?php esc_html_e( 'Address', 'vmc' ); ?></strong>
                        <address><?php echo esc_html( $address ); ?></address>
                    </div>
                </div>
                <div class="loc-detail-row">
                    <div class="loc-detail-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.23 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    </div>
                    <div>
                        <strong><?php esc_html_e( 'Phone', 'vmc' ); ?></strong>
                        <a href="<?php echo esc_url( $phone_url ); ?>"><?php echo esc_html( $phone ); ?></a>
                    </div>
                </div>
                <?php if ( $hours ) : ?>
                <div class="loc-detail-row">
                    <div class="loc-detail-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                        <strong><?php esc_html_e( 'Hours', 'vmc' ); ?></strong>
                        <span><?php echo esc_html( $hours ); ?></span>
                        <?php if ( $sat_hours ) : ?>
                            <span><?php echo esc_html( $sat_hours ); ?></span>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endif; ?>
                <div class="loc-map-actions">
                    <a href="<?php echo esc_url( $contact_link ); ?>" class="btn-red" onclick="openAptModal('loc-map'); return false;"><?php esc_html_e( 'Request Appointment', 'vmc' ); ?></a>
                    <a href="https://maps.google.com/?q=<?php echo rawurlencode( $address ); ?>" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                        <?php esc_html_e( 'Get Directions', 'vmc' ); ?>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   OTHER LOCATIONS BAND
══════════════════════════════════════════ */ ?>
<div class="loc-other-band">
    <?php get_template_part( 'template-parts/section', 'locations' ); ?>
</div>

<?php /* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */ ?>
<?php if ( ! empty( $faqs ) ) : ?>
<section class="svc-faq-section">
    <div class="svc-faq-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e( 'FAQ', 'vmc' ); ?></span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2"><?php esc_html_e( 'Frequently asked questions', 'vmc' ); ?></h2>
        <div class="faq-grid" style="margin-top:40px;">
            <?php foreach ( $faqs as $f ) : ?>
                <div class="faq-item">
                    <button class="faq-q" aria-expanded="false">
                        <?php echo esc_html( $f['question'] ); ?>
                        <span class="faq-arrow" aria-hidden="true">&#8964;</span>
                    </button>
                    <div class="faq-a"><?php echo esc_html( $f['answer'] ); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   CTA BAND
══════════════════════════════════════════ */ ?>
<section class="svc-cta-section">
    <div class="svc-cta-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e( 'Next Steps', 'vmc' ); ?></span>
            <span class="sec-rule" style="background:rgba(255,255,255,.2);"></span>
        </div>
        <h2 class="sec-h2" style="color:#fff;"><?php echo esc_html( $cta_title ); ?></h2>
        <p class="svc-cta-body"><?php echo esc_html( $cta_text ); ?></p>
        <div class="svc-cta-btns">
            <a href="<?php echo esc_url( $contact_link ); ?>" class="btn-red svc-cta-btn-primary" onclick="openAptModal('loc-cta'); return false;"><?php esc_html_e( 'Request Appointment', 'vmc' ); ?></a>
            <a href="<?php echo esc_url( $np_link ); ?>" class="svc-cta-btn-ghost">
                <?php esc_html_e( 'New patients start here', 'vmc' ); ?>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

<style>
/* ═══════════════════════════════════════════════════════════
   LOCATION TEMPLATE STYLES
   Self-contained block — includes all patterns reused from
   the service template so this page works independently.
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   SECTION BACKGROUNDS
───────────────────────────────────────────── */
.svc-single-wrap,
.svc-faq-section { background: #fff; }

.svc-bc-wrap,
.loc-map-section { background: var(--warm); }

/* ─────────────────────────────────────────────
   HERO POLISH
───────────────────────────────────────────── */
.hero-service {
    position: relative;
    overflow: hidden;
}
.hero-service::after {
    content: '';
    position: absolute;
    right: -120px;
    top: -90px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(169,27,27,.08) 0%, transparent 70%);
    pointer-events: none;
}
.hero-img img   { box-shadow: 0 28px 70px rgba(0,0,0,.14); }
.hero-badge     { box-shadow: 0 14px 40px rgba(0,0,0,.14); }

/* ─────────────────────────────────────────────
   BREADCRUMBS
───────────────────────────────────────────── */
.svc-bc-wrap {
    width: 100%;
    border-top: 1px solid rgba(0,0,0,.05);
    border-bottom: 1px solid rgba(0,0,0,.06);
}
.svc-bc-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 18px var(--pad);
}
.svc-bc {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    line-height: 1.7;
}
.svc-bc-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-right: 12px;
}
.svc-bc-link {
    color: var(--mid);
    font-weight: 600;
    text-decoration: none;
    transition: color .2s ease;
}
.svc-bc-link:hover { color: var(--red); }
.svc-bc-sep     { color: rgba(0,0,0,.35); font-weight: 500; }
.svc-bc-current { color: var(--dark); font-weight: 700; }

/* ─────────────────────────────────────────────
   HIGHLIGHTS STRIP
───────────────────────────────────────────── */
.svc-hl-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px var(--pad);
    background: var(--red);
}
.svc-hl-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    background: rgba(255,255,255,.14);
    color: #fff;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .04em;
}

/* ─────────────────────────────────────────────
   MAIN TWO-COLUMN LAYOUT
───────────────────────────────────────────── */
.svc-single-wrap {
    padding: 68px var(--pad) 84px;
}
.svc-single-container {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0,1fr) 300px;
    gap: 52px;
    align-items: start;
}

/* ─────────────────────────────────────────────
   INTRO CARD
───────────────────────────────────────────── */
.svc-intro-card {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    background: #fff;
    border: 1px solid rgba(0,0,0,.06);
    border-left: 4px solid var(--red);
    border-radius: 0 8px 8px 0;
    box-shadow: 0 8px 28px rgba(0,0,0,.05);
    padding: 24px 28px;
    margin-bottom: 40px;
}
.svc-intro-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: var(--rglow);
    color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
}
.svc-intro-icon svg { width: 28px; height: 28px; }
.svc-intro-text     { flex: 1; }
.svc-intro-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 6px;
}
.svc-intro-text p {
    font-size: 15.5px;
    line-height: 1.8;
    color: var(--mid);
    margin: 0;
}

/* ─────────────────────────────────────────────
   ENTRY CONTENT BASE (matches service template)
───────────────────────────────────────────── */
.svc-entry {
    font-size: 15px;
    line-height: 1.85;
    color: var(--mid);
}
.svc-entry h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 700;
    color: var(--dark);
    line-height: 1.2;
    margin: 52px 0 14px;
    padding-top: 44px;
    border-top: 1px solid rgba(0,0,0,.08);
}
.svc-entry h2:first-child,
.svc-entry > *:first-child h2 { border-top: none; padding-top: 0; margin-top: 0; }
.svc-entry h3 {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 700;
    color: var(--dark);
    margin: 32px 0 9px;
}
.svc-entry h4 {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 24px 0 7px;
}
.svc-entry p              { margin-bottom: 18px; }
.svc-entry p:last-child   { margin-bottom: 0; }
.svc-entry ul,
.svc-entry ol {
    margin: 0 0 22px;
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.svc-entry ul li,
.svc-entry ol li {
    padding-left: 24px;
    position: relative;
    line-height: 1.7;
}
.svc-entry ul li::before {
    content: '';
    position: absolute;
    left: 0; top: 9px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--red);
    opacity: .7;
}
.svc-entry ol             { counter-reset: svc-ol; }
.svc-entry ol li          { counter-increment: svc-ol; }
.svc-entry ol li::before {
    content: counter(svc-ol);
    position: absolute;
    left: 0; top: 1px;
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--red);
    line-height: 1.6;
}
.svc-entry a {
    color: var(--red);
    font-weight: 600;
    border-bottom: 1px solid rgba(169,27,27,.25);
    transition: border-color .2s;
}
.svc-entry a:hover   { border-color: var(--red); }
.svc-entry strong    { color: var(--dark); font-weight: 700; }
.svc-entry blockquote,
.svc-entry .wp-block-pullquote {
    margin: 36px 0;
    padding: 22px 28px;
    border-left: 4px solid var(--red);
    background: var(--warm);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-size: 16px;
    color: var(--dark);
    line-height: 1.7;
}
.svc-entry img {
    border-radius: 8px;
    margin: 28px 0;
    box-shadow: 0 8px 32px rgba(0,0,0,.1);
}
.svc-entry table {
    width: 100%;
    border-collapse: collapse;
    margin: 28px 0;
    font-size: 14px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.svc-entry thead th {
    background: var(--dark);
    color: #fff;
    padding: 13px 18px;
    text-align: left;
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
    font-family: 'Instrument Sans', sans-serif;
}
.svc-entry td {
    padding: 14px 18px;
    border-bottom: 1px solid rgba(0,0,0,.08);
    color: var(--mid);
    vertical-align: top;
}
.svc-entry tr:last-child td      { border-bottom: none; }
.svc-entry tr:nth-child(even) td { background: rgba(0,0,0,.018); }
.svc-entry hr,
.svc-entry .wp-block-separator {
    border: none;
    border-top: 1px solid rgba(0,0,0,.1);
    margin: 40px 0;
}

/* ─────────────────────────────────────────────
   BLOCK EDITOR — loc-entry Gutenberg overrides
   Handles images, columns, groups, quotes,
   media-text, buttons, and tables so blocks
   feel editorial rather than raw defaults.
───────────────────────────────────────────── */

/* Images */
.loc-entry .wp-block-image {
    margin: 32px 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.1);
}
.loc-entry .wp-block-image img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
    border-radius: 10px;
    box-shadow: none;
}
.loc-entry .wp-block-image figcaption {
    font-size: 13px;
    color: var(--mid);
    text-align: center;
    padding: 10px 12px 0;
    font-style: italic;
}

/* Columns */
.loc-entry .wp-block-columns {
    gap: 22px;
    margin: 32px 0;
}
.loc-entry .wp-block-column {
    background: var(--cream);
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 8px;
    padding: 22px 24px;
}
.loc-entry .wp-block-column > *:last-child { margin-bottom: 0; }

/* Groups */
.loc-entry .wp-block-group {
    margin: 28px 0;
    border-radius: 8px;
    overflow: hidden;
}
.loc-entry .wp-block-group.has-background { padding: 28px 32px; }

/* Quotes */
.loc-entry .wp-block-quote {
    margin: 32px 0;
    padding: 20px 24px;
    border-left: 4px solid var(--red);
    background: var(--cream);
    border-radius: 0 8px 8px 0;
    font-style: normal;
}
.loc-entry .wp-block-quote p {
    font-style: italic;
    font-size: 16px;
    color: var(--dark);
    line-height: 1.7;
}
.loc-entry .wp-block-quote cite {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--gold);
    font-style: normal;
}

/* Pullquote */
.loc-entry .wp-block-pullquote {
    border-top: 4px solid var(--red);
    border-bottom: 4px solid var(--red);
    text-align: center;
    background: var(--warm);
    padding: 32px;
    margin: 36px 0;
}
.loc-entry .wp-block-pullquote blockquote { border: none; background: transparent; padding: 0; }
.loc-entry .wp-block-pullquote p { font-size: 18px; line-height: 1.65; color: var(--dark); }

/* Media & Text */
.loc-entry .wp-block-media-text {
    margin: 32px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.06);
}
.loc-entry .wp-block-media-text .wp-block-media-text__content { padding: 24px 28px; }
.loc-entry .wp-block-media-text img { box-shadow: none; margin: 0; border-radius: 0; }

/* Buttons */
.loc-entry .wp-block-buttons { margin: 24px 0; }
.loc-entry .wp-block-button__link {
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    padding: 12px 22px;
}

/* Cover blocks */
.loc-entry .wp-block-cover {
    border-radius: 10px;
    overflow: hidden;
    margin: 32px 0;
}

/* Separator */
.loc-entry .wp-block-separator { margin: 36px 0; }

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
.svc-sidebar {
    position: sticky;
    top: 88px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.svc-side-card {
    background: #fff;
    border: 1px solid rgba(0,0,0,.06);
    border-top: 3px solid var(--red);
    border-radius: 8px;
    box-shadow: 0 8px 40px rgba(0,0,0,.08);
    padding: 26px;
    overflow: hidden;
}
.svc-side-card-header {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 22px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(0,0,0,.07);
}
.svc-side-card-header svg { color: var(--red); flex-shrink: 0; }
.svc-side-loc {
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(0,0,0,.06);
}
.svc-side-loc strong {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 5px;
}
.svc-side-loc address {
    font-style: normal;
    font-size: 12.5px;
    line-height: 1.55;
    color: var(--mid);
    margin-bottom: 7px;
}
.svc-side-loc a {
    font-size: 16px;
    font-weight: 700;
    color: var(--dark);
    transition: color .2s;
    letter-spacing: -.01em;
    border-bottom: none;
}
.svc-side-loc a:hover { color: var(--red); }

/* Hours row */
.loc-side-hours {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 0;
    border-top: 1px solid rgba(0,0,0,.07);
    margin-top: 4px;
}
.loc-side-hours-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--gold);
    flex-shrink: 0;
    padding-top: 2px;
}
.loc-side-hours-val {
    font-size: 13px;
    line-height: 1.65;
    color: var(--mid);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

/* Sidebar action buttons */
.loc-side-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}
.svc-side-cta {
    display: flex;
    justify-content: center;
    width: 100%;
}
.loc-directions-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    font-size: 13px;
    font-weight: 600;
}

/* Highlights + nearby chips */
.svc-side-hl {
    background: var(--warm);
    border: 1px solid rgba(0,0,0,.05);
    border-radius: 8px;
    padding: 20px;
}
.svc-side-hl-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
}
.svc-side-hl ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 9px;
}
.svc-side-hl li {
    font-size: 13px;
    color: var(--mid);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
}
.svc-side-hl li::before {
    content: '';
    position: absolute;
    left: 0; top: 7px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--red);
    opacity: .5;
}
.loc-nearby-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 10px;
}
.loc-nearby-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 100px;
    background: var(--cream);
    border: 1px solid rgba(0,0,0,.08);
    font-size: 12px;
    color: var(--mid);
    font-weight: 600;
}
.svc-side-nudge {
    background: #fff;
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 8px;
    padding: 18px 20px;
    text-align: center;
}
.svc-side-nudge p {
    font-size: 13px;
    color: var(--mid);
    margin-bottom: 10px;
    font-weight: 500;
}
.svc-side-nudge .btn-ghost {
    font-size: 12px;
    font-weight: 700;
    justify-content: center;
    width: 100%;
}

/* ─────────────────────────────────────────────
   SHARED SECTION UTILITIES
───────────────────────────────────────────── */
.svc-section-eye {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}
.sec-lbl {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--gold);
}
.sec-rule {
    flex: 1;
    height: 1px;
    background: rgba(0,0,0,.1);
}
.sec-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3.2vw, 42px);
    line-height: 1.12;
    color: var(--dark);
    margin: 0;
}

/* ─────────────────────────────────────────────
   MAP SECTION
───────────────────────────────────────────── */
.loc-map-section {
    padding: 80px var(--pad);
}
.loc-map-inner {
    max-width: 1280px;
    margin: 0 auto;
}
.loc-map-grid {
    display: grid;
    grid-template-columns: minmax(0,1.1fr) minmax(0,.9fr);
    gap: 28px;
    margin-top: 36px;
    align-items: start;
}
.loc-map-card {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.07);
    box-shadow: 0 20px 56px rgba(0,0,0,.07);
}
.loc-map-card iframe {
    display: block;
    width: 100%;
    height: 380px;
    border: 0;
}
.loc-map-details {
    background: var(--white);
    border: 1px solid rgba(0,0,0,.07);
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 20px 56px rgba(0,0,0,.06);
    display: flex;
    flex-direction: column;
    gap: 0;
}
.loc-detail-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(0,0,0,.07);
}
.loc-detail-row:first-child    { padding-top: 0; }
.loc-detail-row:last-of-type   { border-bottom: none; }
.loc-detail-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--rglow);
    color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
}
.loc-detail-row > div strong {
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
}
.loc-detail-row > div address,
.loc-detail-row > div span,
.loc-detail-row > div a {
    font-size: 14px;
    line-height: 1.65;
    color: var(--mid);
    font-style: normal;
    text-decoration: none;
    transition: color .2s;
    border-bottom: none;
}
.loc-detail-row > div a:hover  { color: var(--red); }
.loc-map-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    padding-top: 20px;
    margin-top: 4px;
    border-top: 1px solid rgba(0,0,0,.07);
}

/* ─────────────────────────────────────────────
   OTHER LOCATIONS BAND
───────────────────────────────────────────── */
.loc-other-band {
    background: var(--warm);
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
.svc-faq-section {
    padding: 80px var(--pad);
}
.svc-faq-inner {
    max-width: 1280px;
    margin: 0 auto;
}
.faq-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.faq-item {
    background: var(--white);
    border: 1px solid rgba(0,0,0,.07);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,.04);
}
.faq-q {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    color: var(--dark);
    cursor: pointer;
}
.faq-arrow {
    flex-shrink: 0;
    transition: transform .22s ease;
    color: var(--red);
    font-size: 18px;
}
.faq-a {
    display: none;
    padding: 0 22px 20px;
    font-size: 14.5px;
    line-height: 1.8;
    color: var(--mid);
}
.faq-item.open .faq-a    { display: block; }
.faq-item.open .faq-arrow { transform: rotate(180deg); }

/* ─────────────────────────────────────────────
   CTA BAND
───────────────────────────────────────────── */
.svc-cta-section {
    background: var(--dark);
    padding: 80px var(--pad);
    position: relative;
    overflow: hidden;
}
.svc-cta-section::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(169,27,27,.18) 0%, transparent 70%);
    pointer-events: none;
}
.svc-cta-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}
.svc-cta-body {
    font-size: 15px;
    line-height: 1.8;
    color: rgba(255,255,255,.6);
    max-width: 560px;
    margin: 14px 0 28px;
}
.svc-cta-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
}
.svc-cta-btn-primary { box-shadow: 0 4px 20px rgba(169,27,27,.35); }
.svc-cta-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.75);
    transition: color .2s;
}
.svc-cta-btn-ghost:hover           { color: #fff; }
.svc-cta-btn-ghost svg             { transition: transform .2s; }
.svc-cta-btn-ghost:hover svg       { transform: translateX(4px); }
.svc-cta-section .sec-lbl         { color: var(--gold); }
.svc-cta-section .sec-rule        { background: rgba(255,255,255,.15); }

/* ─────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 1060px) {
    .svc-single-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    .svc-sidebar { position: static; }
    .svc-side-card,
    .svc-side-hl,
    .svc-side-nudge { max-width: 480px; }
    .loc-map-grid   { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
    .svc-single-wrap,
    .svc-faq-section,
    .svc-cta-section,
    .loc-map-section { padding: 56px 24px; }
    .svc-bc-inner    { padding: 14px 24px; }
    .svc-hl-strip    { padding: 12px 24px; justify-content: flex-start; }
    .svc-intro-card  { flex-direction: column; gap: 14px; }
    .svc-intro-icon  { width: 48px; height: 48px; }
    .svc-entry h2    { font-size: 22px; padding-top: 32px; margin-top: 36px; }
    .svc-cta-btns    { flex-direction: column; align-items: flex-start; }
    .loc-map-actions { flex-direction: column; align-items: flex-start; }
    .svc-bc          { gap: 6px; font-size: 12px; }
    .svc-bc-label    { width: 100%; margin-right: 0; margin-bottom: 2px; }
    .loc-entry .wp-block-column { padding: 18px 20px; }
    .loc-entry .wp-block-group.has-background { padding: 20px 24px; }
}
@media (max-width: 580px) {
    .svc-intro-card  { padding: 20px; }
    .loc-map-details { padding: 20px; }
    .loc-side-actions { gap: 8px; }
    .svc-side-nudge  { padding: 16px; }
}
</style>

<script>
(function(){
    document.querySelectorAll('.faq-q').forEach(function(btn){
        btn.addEventListener('click', function(){
            var item    = this.closest('.faq-item');
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function(el){
                el.classList.remove('open');
                el.querySelector('.faq-q').setAttribute('aria-expanded','false');
            });
            if (!wasOpen){
                item.classList.add('open');
                this.setAttribute('aria-expanded','true');
            }
        });
    });
})();
</script>

<?php endwhile; ?>
<?php get_footer(); ?>
