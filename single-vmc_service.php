<?php
/**
 * Single Service Template — Veterinary Medical Center
 *
 * Meta fields (add via Screen Options → Custom Fields):
 *
 *  _vmc_service_icon        wellness|dental|surgery|behavioral|urgent|feline
 *  _vmc_service_subtitle    One sentence for hero sub-heading
 *  _vmc_service_intro       Intro paragraph (falls back to post excerpt)
 *  _vmc_service_cta_title   Heading above CTA buttons
 *  _vmc_service_cta_text    Body text above CTA buttons
 *  _vmc_service_order       Integer sort weight for related-services query
 *  _vmc_service_highlights  Pipe-separated: "No referral needed|Same-day results"
 *  _vmc_subservices         Newline-separated, one card per line: Title||Description
 *  _vmc_service_faqs        Newline-separated, one FAQ per line: Question||Answer
 */

get_header();
if ( ! have_posts() ) { get_footer(); return; }
while ( have_posts() ) : the_post();

/* ── Core data ──────────────────────────────────────────── */
$sid   = get_the_ID();
$title = get_the_title();

$excerpt = has_excerpt()
    ? get_the_excerpt()
    : wp_trim_words( wp_strip_all_tags( get_the_content() ), 30, '…' );

$hero_img = get_the_post_thumbnail_url( $sid, 'full' );
if ( ! $hero_img && function_exists( 'vmc_get_hero_image_url' ) ) {
    $hero_img = vmc_get_hero_image_url();
}

/* ── Links ──────────────────────────────────────────────── */
$contact_pg   = get_page_by_path( 'veterinary-medical-center-contact' );
$contact_link = $contact_pg ? get_permalink( $contact_pg ) : home_url( '/veterinary-medical-center-contact/' );
$np_pg        = get_page_by_path( 'first-vet-visit-northern-kentucky' );
$np_link      = $np_pg ? get_permalink( $np_pg ) : home_url( '/first-vet-visit-northern-kentucky/' );

/* ── Practice info ──────────────────────────────────────── */
$ft_phone    = function_exists('vmc_get') ? vmc_get('vmc_ft_phone',    '(859) 442-4420')                             : '(859) 442-4420';
$ind_phone   = function_exists('vmc_get') ? vmc_get('vmc_ind_phone',   '(859) 356-2242')                             : '(859) 356-2242';
$ft_address  = function_exists('vmc_get') ? vmc_get('vmc_ft_address',  '2000 Memorial Pkwy, Fort Thomas, KY 41075') : '2000 Memorial Pkwy, Fort Thomas, KY 41075';
$ind_address = function_exists('vmc_get') ? vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051') : '4147 Madison Pike, Independence, KY 41051';
$ft_tel      = function_exists('vmc_phone_link') ? vmc_phone_link('ft')  : 'tel:+18594424420';
$ind_tel     = function_exists('vmc_phone_link') ? vmc_phone_link('ind') : 'tel:+18593562242';

/* ── Icons ──────────────────────────────────────────────── */
$icons = [
    'wellness'   => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4C6 4 4.5 4 4.5 6.5L4.5 12C4.5 15.6 7.5 18 11 18"/><path d="M10.5 4C10.5 4 12 4 12 6.5L12 12C12 15.6 9 18 11 18"/><circle cx="17" cy="19.5" r="3.5"/><circle cx="6" cy="3.5" r="1" fill="currentColor"/><circle cx="10.5" cy="3.5" r="1" fill="currentColor"/></svg>',
    'dental'     => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.5 7.5C5.8 7.5 4.5 9 4.5 11.5C4.5 15 6.2 19 7 22C7.4 23.4 8.2 24 8.8 22C9.2 20.4 9.5 18.5 12 18.5C14.5 18.5 14.8 20.4 15.2 22C15.8 24 16.6 23.4 17 22C17.8 19 19.5 15 19.5 11.5C19.5 9 18.2 7.5 16.5 7.5C15 7.5 14 8.3 12 8.3C10 8.3 9 7.5 7.5 7.5Z"/></svg>',
    'surgery'    => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21L17.5 8.5"/><path d="M17.5 8.5L20.5 5.5L22.5 7.5L19.5 10.5Z" fill="currentColor" stroke="none"/><line x1="6" y1="5" x2="6" y2="10"/><line x1="3.5" y1="7.5" x2="8.5" y2="7.5"/></svg>',
    'behavioral' => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3C9.5 3 7.5 5 7.5 7C5.8 7 4 8.8 4 11C4 13.2 5.5 14.8 7.5 15C7.5 17 9 19 11 19L11 21"/><path d="M12 3C14.5 3 16.5 5 16.5 7C18.2 7 20 8.8 20 11C20 13.2 18.5 14.8 16.5 15C16.5 17 15 19 13 19L13 21"/><line x1="11" y1="21" x2="13" y2="21"/></svg>',
    'urgent'     => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L22 21H2Z"/><line x1="12" y1="10" x2="12" y2="15.5"/><circle cx="12" cy="18.5" r="0.9" fill="currentColor"/></svg>',
    'feline'     => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14.5" r="7.5"/><polygon points="7,9 5.2,3 10,8.5" stroke-linejoin="round"/><polygon points="17,9 18.8,3 14,8.5" stroke-linejoin="round"/></svg>',
    'default'    => '<svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
];
$icon_slug = get_post_meta( $sid, '_vmc_service_icon', true ) ?: 'default';
$icon      = $icons[ $icon_slug ] ?? $icons['default'];

/* ── Optional meta ──────────────────────────────────────── */
$intro    = get_post_meta( $sid, '_vmc_service_intro', true ) ?: $excerpt;
$subtitle = get_post_meta( $sid, '_vmc_service_subtitle', true ) ?: 'Thoughtful, relationship-based veterinary care tailored to your pet\'s needs.';
$cta_h    = get_post_meta( $sid, '_vmc_service_cta_title', true ) ?: 'Need care for your pet?';
$cta_p    = get_post_meta( $sid, '_vmc_service_cta_text', true ) ?: 'Our team is here to help you decide next steps, answer questions, and schedule an appointment at the location that works best for you.';

/* Highlights — pipe-separated */
$hl_raw     = get_post_meta( $sid, '_vmc_service_highlights', true );
$highlights = $hl_raw ? array_filter( array_map( 'trim', explode( '|', $hl_raw ) ) ) : [];

/* Subservices — newline-separated, Title||Body */
$ss_raw      = get_post_meta( $sid, '_vmc_subservices', true );
$subservices = [];
if ( $ss_raw ) {
    foreach ( array_filter( array_map( 'trim', explode( "\n", $ss_raw ) ) ) as $line ) {
        $p = explode( '||', $line, 2 );
        $subservices[] = [ 'title' => trim($p[0] ?? ''), 'text' => trim($p[1] ?? '') ];
    }
}

/* FAQs — newline-separated, Question||Answer */
$faq_raw = get_post_meta( $sid, '_vmc_service_faqs', true );
$faqs    = [];
if ( $faq_raw ) {
    foreach ( array_filter( array_map( 'trim', explode( "\n", $faq_raw ) ) ) as $line ) {
        $p = explode( '||', $line, 2 );
        if ( ! empty($p[0]) && ! empty($p[1]) ) {
            $faqs[] = [ 'question' => trim($p[0]), 'answer' => trim($p[1]) ];
        }
    }
}

/* ── Related services ───────────────────────────────────── */
$related = get_posts([
    'post_type'      => 'vmc_service',
    'posts_per_page' => 3,
    'post__not_in'   => [ $sid ],
    'orderby'        => 'meta_value_num',
    'meta_key'       => '_vmc_service_order',
    'order'          => 'ASC',
    'post_status'    => 'publish',
]);

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
<?php echo wp_json_encode(['@context'=>'https://schema.org','@type'=>'FAQPage','mainEntity'=>$faq_schema], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT); ?>
</script>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */ ?>
<section class="hero hero-service">
    <div class="hero-copy">
        <div class="eyebrow">
            <span class="eyebrow-dash"></span>
            <?php esc_html_e('Veterinary Services','vmc'); ?>
        </div>
        <h1 class="hero-h1"><?php echo esc_html($title); ?></h1>
        <p class="hero-body"><?php echo esc_html($subtitle); ?></p>
        <div class="hero-btns">
            <a href="<?php echo esc_url($contact_link); ?>" class="btn-red" onclick="openAptModal('svc-hero'); return false;"><?php esc_html_e('Request an Appointment','vmc'); ?></a>
            <a href="<?php echo esc_url($np_link); ?>" class="btn-ghost">
                <?php esc_html_e('New patients start here','vmc'); ?>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>

    <div class="hero-img">
        <?php if ( $hero_img ) : ?>
            <img src="<?php echo esc_url($hero_img); ?>" alt="<?php echo esc_attr($title.' — Veterinary Medical Center'); ?>" loading="eager" width="900" height="675">
        <?php endif; ?>
        <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            <div class="hero-badge-inner">
                <span class="hero-badge-title"><?php esc_html_e('Serving Northern Kentucky','vmc'); ?></span>
                <span class="hero-badge-sub"><?php esc_html_e('Fort Thomas &amp; Independence','vmc'); ?></span>
            </div>
        </div>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   SIMPLE FULL-WIDTH BREADCRUMBS
══════════════════════════════════════════ */ ?>
<section class="svc-bc-wrap">
    <div class="svc-bc-inner">
        <nav class="svc-bc" aria-label="Breadcrumb">
            <span class="svc-bc-label"><?php esc_html_e('You are here','vmc'); ?></span>

            <a href="<?php echo esc_url(home_url('/')); ?>" class="svc-bc-link">
                <?php esc_html_e('Home','vmc'); ?>
            </a>

            <span class="svc-bc-sep" aria-hidden="true">/</span>

            <a href="<?php echo esc_url(home_url('/services/')); ?>" class="svc-bc-link">
                <?php esc_html_e('Services','vmc'); ?>
            </a>

            <span class="svc-bc-sep" aria-hidden="true">/</span>

            <span class="svc-bc-current" aria-current="page"><?php echo esc_html($title); ?></span>
        </nav>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   HIGHLIGHTS STRIP
══════════════════════════════════════════ */ ?>
<?php if ( ! empty($highlights) ) : ?>
<div class="svc-hl-strip">
    <?php foreach ( $highlights as $hl ) : ?>
        <span class="svc-hl-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <?php echo esc_html($hl); ?>
        </span>
    <?php endforeach; ?>
</div>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   MAIN CONTENT + SIDEBAR
══════════════════════════════════════════ */ ?>
<section class="svc-single-wrap">
    <div class="svc-single-container">

        <article class="svc-single-body" itemscope itemtype="https://schema.org/MedicalWebPage">

            <div class="svc-intro-card">
                <div class="svc-intro-icon">
                    <?php echo $icon; ?>
                </div>
                <div class="svc-intro-text">
                    <p class="svc-intro-label"><?php esc_html_e('About This Service','vmc'); ?></p>
                    <p itemprop="description"><?php echo esc_html($intro); ?></p>
                </div>
            </div>

            <div class="svc-entry">
                <?php the_content(); ?>
            </div>

        </article>

        <aside class="svc-sidebar" aria-label="Contact our locations">

            <div class="svc-side-card">
                <div class="svc-side-card-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.23 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    <?php esc_html_e('Call a location','vmc'); ?>
                </div>

                <div class="svc-side-loc">
                    <strong><?php esc_html_e('Fort Thomas','vmc'); ?></strong>
                    <address><?php echo esc_html($ft_address); ?></address>
                    <a href="<?php echo esc_url($ft_tel); ?>"><?php echo esc_html($ft_phone); ?></a>
                </div>

                <div class="svc-side-loc">
                    <strong><?php esc_html_e('Independence','vmc'); ?></strong>
                    <address><?php echo esc_html($ind_address); ?></address>
                    <a href="<?php echo esc_url($ind_tel); ?>"><?php echo esc_html($ind_phone); ?></a>
                </div>

                <a href="<?php echo esc_url($contact_link); ?>" class="btn-red svc-side-cta" onclick="openAptModal('svc-sidebar'); return false;"><?php esc_html_e('Request an Appointment','vmc'); ?></a>
            </div>

            <?php if ( ! empty($highlights) ) : ?>
            <div class="svc-side-hl">
                <p class="svc-side-hl-label"><?php esc_html_e('Quick highlights','vmc'); ?></p>
                <ul>
                    <?php foreach ( $highlights as $hl ) : ?>
                        <li><?php echo esc_html($hl); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

            <div class="svc-side-nudge">
                <p><?php esc_html_e('Questions about this service?','vmc'); ?></p>
                <a href="<?php echo esc_url($contact_link); ?>" class="btn-ghost" onclick="openAptModal('svc-nudge'); return false;">
                    <?php esc_html_e('Ask our team','vmc'); ?>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>

        </aside>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   SUBSERVICES
══════════════════════════════════════════ */ ?>
<?php if ( ! empty($subservices) ) : ?>
<section class="svc-sub-section">
    <div class="svc-sub-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e("What's Included",'vmc'); ?></span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2"><?php esc_html_e('Services included in this area of care','vmc'); ?></h2>
        <div class="svc-grid">
            <?php foreach ( $subservices as $item ) :
                if ( ! $item['title'] && ! $item['text'] ) continue; ?>
                <div class="svc-card">
                    <div class="svc-iw"><?php echo $icon; ?></div>
                    <?php if ( $item['title'] ) : ?><h3 class="svc-h"><?php echo esc_html($item['title']); ?></h3><?php endif; ?>
                    <?php if ( $item['text'] ) : ?><p class="svc-p"><?php echo esc_html($item['text']); ?></p><?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php /* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */ ?>
<?php if ( ! empty($faqs) ) : ?>
<section class="svc-faq-section">
    <div class="svc-faq-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e('FAQ','vmc'); ?></span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2"><?php esc_html_e('Frequently asked questions','vmc'); ?></h2>

        <div class="faq-grid" style="margin-top:40px;">
            <?php foreach ( $faqs as $f ) : ?>
                <div class="faq-item">
                    <button class="faq-q" aria-expanded="false">
                        <?php echo esc_html($f['question']); ?>
                        <span class="faq-arrow" aria-hidden="true">&#8964;</span>
                    </button>
                    <div class="faq-a"><?php echo esc_html($f['answer']); ?></div>
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
            <span class="sec-lbl"><?php esc_html_e('Next Steps','vmc'); ?></span>
            <span class="sec-rule" style="background:rgba(255,255,255,.2);"></span>
        </div>
        <h2 class="sec-h2" style="color:#fff;"><?php echo esc_html($cta_h); ?></h2>
        <p class="svc-cta-body"><?php echo esc_html($cta_p); ?></p>
        <div class="svc-cta-btns">
            <a href="<?php echo esc_url($contact_link); ?>" class="btn-red svc-cta-btn-primary" onclick="openAptModal('svc-cta'); return false;"><?php esc_html_e('Request an Appointment','vmc'); ?></a>
            <a href="<?php echo esc_url($np_link); ?>" class="svc-cta-btn-ghost">
                <?php esc_html_e('New patients start here','vmc'); ?>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   RELATED SERVICES
══════════════════════════════════════════ */ ?>
<?php if ( ! empty($related) ) : ?>
<section class="svc-related-section">
    <div class="svc-related-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl"><?php esc_html_e('Related Services','vmc'); ?></span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2"><?php esc_html_e('Explore more ways we care for pets','vmc'); ?></h2>

        <div class="svc-grid">
            <?php foreach ( $related as $r ) :
                $r_slug    = get_post_meta($r->ID,'_vmc_service_icon',true) ?: 'default';
                $r_icon    = $icons[$r_slug] ?? $icons['default'];
                $r_excerpt = has_excerpt($r->ID)
                    ? get_the_excerpt($r->ID)
                    : wp_trim_words(wp_strip_all_tags(get_post_field('post_content',$r->ID)),24,'…');
            ?>
                <div class="svc-card">
                    <div class="svc-iw"><?php echo $r_icon; ?></div>
                    <h3 class="svc-h"><?php echo esc_html(get_the_title($r->ID)); ?></h3>
                    <p class="svc-p"><?php echo esc_html($r_excerpt); ?></p>
                    <a href="<?php echo esc_url(get_permalink($r->ID)); ?>" class="svc-more">
                        <?php esc_html_e('Learn more','vmc'); ?>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
    </div>
</section>
<?php endif; ?>

<style>
/* ─────────────────────────────────────────────
   FIX: reveal items if observer doesn't run
───────────────────────────────────────────── */
.svc-single-wrap .rv,
.svc-sub-section .rv,
.svc-faq-section .rv,
.svc-related-section .rv {
    opacity: 1 !important;
    transform: none !important;
}

/* ─────────────────────────────────────────────
   PAGE SECTION BACKGROUNDS
───────────────────────────────────────────── */
.svc-single-wrap,
.svc-faq-section {
    background: #fff;
}
.svc-bc-wrap,
.svc-sub-section,
.svc-related-section {
    background: var(--warm);
}

/* ─────────────────────────────────────────────
   HERO polish
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
.hero-img img {
    box-shadow: 0 28px 70px rgba(0,0,0,.14);
}
.hero-badge {
    box-shadow: 0 14px 40px rgba(0,0,0,.14);
}

/* ─────────────────────────────────────────────
   SIMPLE FULL-WIDTH BREADCRUMBS
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
.svc-bc-link:hover {
    color: var(--red);
}
.svc-bc-sep {
    color: rgba(0,0,0,.35);
    font-weight: 500;
}
.svc-bc-current {
    color: var(--dark);
    font-weight: 700;
}

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
   MAIN LAYOUT
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
.svc-intro-icon svg {
    width: 28px;
    height: 28px;
}
.svc-intro-text {
    flex: 1;
}
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
   ENTRY CONTENT
───────────────────────────────────────────── */
.svc-entry {
    font-size: 15px;
    line-height: 1.85;
    color: var(--mid);
}
	.svc-entry h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 700;
    color: var(--dark);
    line-height: 1.2;
    margin: 52px 0 14px;
    padding-top: 44px;
    border-top: 1px solid rgba(0,0,0,.08);
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
.svc-entry > *:first-child h2 {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
}
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
.svc-entry p {
    margin-bottom: 18px;
}
.svc-entry p:last-child {
    margin-bottom: 0;
}
.svc-entry ul,
.svc-entry ol {
    margin: 0 0 22px 0;
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
    left: 0;
    top: 9px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--red);
    opacity: .7;
}
.svc-entry ol {
    counter-reset: svc-ol;
}
.svc-entry ol li {
    counter-increment: svc-ol;
}
.svc-entry ol li::before {
    content: counter(svc-ol);
    position: absolute;
    left: 0;
    top: 1px;
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
.svc-entry a:hover {
    border-color: var(--red);
}
.svc-entry strong {
    color: var(--dark);
    font-weight: 700;
}
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
.svc-entry tr:last-child td {
    border-bottom: none;
}
.svc-entry tr:nth-child(even) td {
    background: rgba(0,0,0,.018);
}
.svc-entry hr,
.svc-entry .wp-block-separator {
    border: none;
    border-top: 1px solid rgba(0,0,0,.1);
    margin: 40px 0;
}

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
.svc-side-card-header svg {
    color: var(--red);
    flex-shrink: 0;
}
.svc-side-loc {
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(0,0,0,.06);
}
.svc-side-loc:last-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
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
}
.svc-side-loc a:hover {
    color: var(--red);
}
.svc-side-cta {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
}
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
    left: 0;
    top: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--red);
    opacity: .5;
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
   SHARED UTILITIES
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
   CARD / GRID AREAS
───────────────────────────────────────────── */
.svc-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
    margin-top: 44px;
}
.svc-card {
    background: #fff;
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 8px 28px rgba(0,0,0,.05);
    transition: transform .22s ease, box-shadow .22s ease;
}
.svc-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px rgba(0,0,0,.07);
}
.svc-iw {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: rgba(169,27,27,.06);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--red);
    margin-bottom: 16px;
}
.svc-iw svg {
    width: 26px;
    height: 26px;
}
.svc-h {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    line-height: 1.2;
    color: var(--dark);
    margin: 0 0 10px;
}
.svc-p {
    font-size: 14px;
    line-height: 1.75;
    color: var(--mid);
    margin: 0;
}
.svc-more {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 16px;
    font-size: 13px;
    font-weight: 700;
    color: var(--red);
}
.svc-more svg {
    transition: transform .2s ease;
}
.svc-card:hover .svc-more svg {
    transform: translateX(3px);
}

/* ─────────────────────────────────────────────
   SUBSERVICES
───────────────────────────────────────────── */
.svc-sub-section {
    padding: 80px var(--pad);
}
.svc-sub-inner {
    max-width: 1280px;
    margin: 0 auto;
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}
.faq-item {
    border: 1px solid rgba(0,0,0,.07);
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 6px 22px rgba(0,0,0,.04);
}
.faq-q {
    width: 100%;
    border: 0;
    background: transparent;
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
.faq-item.open .faq-a {
    display: block;
}
.faq-item.open .faq-arrow {
    transform: rotate(180deg);
}

/* ─────────────────────────────────────────────
   CTA
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
    top: -60px;
    right: -60px;
    width: 320px;
    height: 320px;
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
.svc-cta-btn-primary {
    box-shadow: 0 4px 20px rgba(169,27,27,.35);
}
.svc-cta-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.75);
    transition: color .2s;
}
.svc-cta-btn-ghost:hover {
    color: #fff;
}
.svc-cta-btn-ghost svg {
    transition: transform .2s;
}
.svc-cta-btn-ghost:hover svg {
    transform: translateX(4px);
}
.svc-cta-section .sec-lbl {
    color: var(--gold);
}
.svc-cta-section .sec-rule {
    background: rgba(255,255,255,.15);
}

/* ─────────────────────────────────────────────
   RELATED
───────────────────────────────────────────── */
.svc-related-section {
    padding: 80px var(--pad);
}
.svc-related-inner {
    max-width: 1280px;
    margin: 0 auto;
}

/* ─────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 1180px) {
    .svc-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (max-width: 1060px) {
    .svc-single-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    .svc-sidebar {
        position: static;
    }
    .svc-side-card,
    .svc-side-hl,
    .svc-side-nudge {
        max-width: 480px;
    }
}
@media (max-width: 900px) {
    .svc-single-wrap,
    .svc-sub-section,
    .svc-faq-section,
    .svc-cta-section,
    .svc-related-section {
        padding: 56px 24px;
    }
    .svc-bc-inner {
        padding: 14px 24px;
    }
    .svc-hl-strip {
        padding: 12px 24px;
        justify-content: flex-start;
    }
    .svc-intro-card {
        flex-direction: column;
        gap: 14px;
    }
    .svc-intro-icon {
        width: 48px;
        height: 48px;
    }
    .svc-entry h2 {
        font-size: 22px;
        padding-top: 32px;
        margin-top: 36px;
    }
    .svc-grid {
        grid-template-columns: 1fr;
    }
    .svc-cta-btns {
        flex-direction: column;
        align-items: flex-start;
    }
    .svc-bc {
        gap: 6px;
        font-size: 12px;
    }
    .svc-bc-label {
        width: 100%;
        margin-right: 0;
        margin-bottom: 2px;
    }
}
@media (max-width: 580px) {
    .svc-intro-card {
        padding: 20px;
    }
}
</style>

<script>
/* FAQ toggle */
(function(){
    document.querySelectorAll('.faq-q').forEach(function(btn){
        btn.addEventListener('click', function(){
            var item = this.closest('.faq-item');
            var wasOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(function(el){
                el.classList.remove('open');
                el.querySelector('.faq-q').setAttribute('aria-expanded','false');
            });

            if(!wasOpen){
                item.classList.add('open');
                this.setAttribute('aria-expanded','true');
            }
        });
    });
})();
</script>

<?php endwhile; ?>
<?php get_footer(); ?>