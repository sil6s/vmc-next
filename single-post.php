<?php
/**
 * Single Blog Post Template — Veterinary Medical Center
 *
 * WordPress uses this file automatically for all standard 'post' post type URLs.
 * Layout mirrors single-vmc_service.php: hero with eyebrow, breadcrumbs, content + sidebar, CTA band, related posts.
 */

get_header();

if ( ! have_posts() ) { get_footer(); return; }
while ( have_posts() ) : the_post();

$post_id     = get_the_ID();
$title       = get_the_title();
$date        = get_the_date('F j, Y');
$date_short  = get_the_date('M j, Y');
$author      = get_the_author();
$cats        = get_the_category();
$cat_name    = ! empty($cats) ? $cats[0]->name : 'Pet Care';
$thumb_url   = get_the_post_thumbnail_url($post_id, 'full');
$excerpt     = has_excerpt() ? get_the_excerpt() : wp_trim_words(wp_strip_all_tags(get_the_content()), 32, '…');

$ft_phone    = function_exists('vmc_get') ? vmc_get('vmc_ft_phone',    '(859) 442-4420')                              : '(859) 442-4420';
$ind_phone   = function_exists('vmc_get') ? vmc_get('vmc_ind_phone',   '(859) 356-2242')                              : '(859) 356-2242';
$ft_address  = function_exists('vmc_get') ? vmc_get('vmc_ft_address',  '2000 Memorial Pkwy, Fort Thomas, KY 41075')   : '2000 Memorial Pkwy, Fort Thomas, KY 41075';
$ind_address = function_exists('vmc_get') ? vmc_get('vmc_ind_address', '4147 Madison Pike, Independence, KY 41051')   : '4147 Madison Pike, Independence, KY 41051';
$ft_tel      = function_exists('vmc_phone_link') ? vmc_phone_link('ft')  : 'tel:+18594424420';
$ind_tel     = function_exists('vmc_phone_link') ? vmc_phone_link('ind') : 'tel:+18593562242';

$np_page     = get_page_by_path('new-patients');
$np_url      = $np_page ? get_permalink($np_page) : home_url('/new-patients/');
$contact_pg  = get_page_by_path('contact');
$contact_url = $contact_pg ? get_permalink($contact_pg) : home_url('/contact/');

$hero_img    = $thumb_url ?: (function_exists('vmc_get_hero_image_url') ? vmc_get_hero_image_url() : '');

$related = get_posts([
    'post_type'      => 'post',
    'posts_per_page' => 3,
    'post__not_in'   => [$post_id],
    'orderby'        => 'date',
    'order'          => 'DESC',
    'post_status'    => 'publish',
]);
?>

<?php /* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */ ?>
<section class="hero hero-service">
    <div class="hero-copy">
        <div class="eyebrow">
            <span class="eyebrow-dash"></span>
            Pet Care Blog
        </div>
        <h1 class="hero-h1"><?php echo esc_html($title); ?></h1>
        <p class="hero-body"><?php echo esc_html($excerpt); ?></p>
        <div class="hero-btns">
            <a href="<?php echo esc_url($ft_tel); ?>" class="btn-red">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                Book an Appointment
            </a>
            <a href="<?php echo esc_url($np_url); ?>" class="btn-ghost">
                New patients start here
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>

    <div class="hero-img">
        <?php if ( $hero_img ) : ?>
            <img src="<?php echo esc_url($hero_img); ?>" alt="<?php echo esc_attr($title . ' — Veterinary Medical Center'); ?>" loading="eager">
        <?php endif; ?>
        <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            <div class="hero-badge-inner">
                <span class="hero-badge-title"><?php echo esc_html($date_short); ?></span>
                <span class="hero-badge-sub"><?php echo esc_html($cat_name); ?></span>
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
            <span class="svc-bc-label">You are here</span>

            <a href="<?php echo esc_url(home_url('/')); ?>" class="svc-bc-link">Home</a>

            <span class="svc-bc-sep" aria-hidden="true">/</span>

            <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="svc-bc-link">Blog</a>

            <?php if ( ! empty($cats) ) : ?>
            <span class="svc-bc-sep" aria-hidden="true">/</span>
            <a href="<?php echo esc_url(get_category_link($cats[0]->term_id)); ?>" class="svc-bc-link"><?php echo esc_html($cats[0]->name); ?></a>
            <?php endif; ?>

            <span class="svc-bc-sep" aria-hidden="true">/</span>

            <span class="svc-bc-current" aria-current="page"><?php echo esc_html(wp_trim_words($title, 8, '…')); ?></span>
        </nav>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   MAIN CONTENT + SIDEBAR
══════════════════════════════════════════ */ ?>
<section class="svc-single-wrap">
    <div class="svc-single-container">

        <article class="svc-single-body">

            <div class="svc-intro-card">
                <div class="svc-intro-icon">
                    <svg viewBox="0 0 25 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="17" height="19" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></svg>
                </div>
                <div class="svc-intro-text">
                    <p class="svc-intro-label">About This Article</p>
                    <p><?php echo esc_html($excerpt); ?></p>
                </div>
            </div>

            <div class="post-meta-strip">
                <span class="post-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <?php echo esc_html($date); ?>
                </span>
                <span class="post-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <?php echo esc_html($author); ?>
                </span>
                <?php if ( ! empty($cats) ) : ?>
                <span class="post-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    <a href="<?php echo esc_url(get_category_link($cats[0]->term_id)); ?>"><?php echo esc_html($cats[0]->name); ?></a>
                </span>
                <?php endif; ?>
            </div>

            <div class="svc-entry">
                <?php the_content(); ?>
            </div>

            <?php $tags = get_the_tags(); if ( $tags ) : ?>
            <div class="post-tags">
                <?php foreach ( $tags as $tag ) : ?>
                <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" class="post-tag"><?php echo esc_html($tag->name); ?></a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

        </article>

        <aside class="svc-sidebar" aria-label="Contact our locations">

            <div class="svc-side-card">
                <div class="svc-side-card-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.23 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    Call a location
                </div>

                <div class="svc-side-loc">
                    <strong>Fort Thomas</strong>
                    <address><?php echo esc_html($ft_address); ?></address>
                    <a href="<?php echo esc_url($ft_tel); ?>"><?php echo esc_html($ft_phone); ?></a>
                </div>

                <div class="svc-side-loc">
                    <strong>Independence</strong>
                    <address><?php echo esc_html($ind_address); ?></address>
                    <a href="<?php echo esc_url($ind_tel); ?>"><?php echo esc_html($ind_phone); ?></a>
                </div>

                <a href="<?php echo esc_url($contact_url); ?>" class="btn-red svc-side-cta">Book an Appointment</a>
            </div>

            <div class="svc-side-nudge">
                <p>Questions about your pet's health?</p>
                <a href="<?php echo esc_url($contact_url); ?>" class="btn-ghost">
                    Ask our team
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>

        </aside>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   CTA BAND
══════════════════════════════════════════ */ ?>
<section class="svc-cta-section">
    <div class="svc-cta-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl">Next Steps</span>
            <span class="sec-rule" style="background:rgba(255,255,255,.2);"></span>
        </div>
        <h2 class="sec-h2" style="color:#fff;">Ready to schedule an appointment?</h2>
        <p class="svc-cta-body">Our team in Fort Thomas and Independence is here to help. Same-week appointments are often available for new and existing patients.</p>
        <div class="svc-cta-btns">
            <a href="<?php echo esc_url($contact_url); ?>" class="btn-red svc-cta-btn-primary">Request an Appointment</a>
            <a href="<?php echo esc_url($np_url); ?>" class="svc-cta-btn-ghost">
                New patients start here
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

<?php /* ══════════════════════════════════════════
   RELATED POSTS
══════════════════════════════════════════ */ ?>
<?php if ( ! empty($related) ) : ?>
<section class="svc-related-section">
    <div class="svc-related-inner">
        <div class="svc-section-eye">
            <span class="sec-lbl">More Articles</span>
            <span class="sec-rule"></span>
        </div>
        <h2 class="sec-h2">More from our blog</h2>

        <div class="blog-prev-grid" style="margin-top:44px">
            <?php foreach ( $related as $r ) :
                $r_url   = get_permalink($r->ID);
                $r_title = get_the_title($r->ID);
                $r_cats  = get_the_category($r->ID);
                $r_cat   = ! empty($r_cats) ? $r_cats[0]->name : 'Veterinary Care';
                $r_date  = get_the_date('M j, Y', $r->ID);
                $r_exc   = has_excerpt($r->ID)
                    ? get_the_excerpt($r->ID)
                    : wp_trim_words(wp_strip_all_tags(get_post_field('post_content', $r->ID)), 22, '…');
                $r_thumb = get_the_post_thumbnail_url($r->ID, 'medium');
            ?>
            <article class="blog-prev-card">
                <?php if ( $r_thumb ) : ?>
                <a href="<?php echo esc_url($r_url); ?>" class="blog-prev-thumb" tabindex="-1" aria-hidden="true">
                    <img src="<?php echo esc_url($r_thumb); ?>" alt="<?php echo esc_attr($r_title); ?>" loading="lazy">
                </a>
                <?php endif; ?>
                <div class="blog-prev-body">
                    <div class="blog-prev-meta">
                        <span class="blog-prev-cat"><?php echo esc_html($r_cat); ?></span>
                        <span class="blog-prev-date"><?php echo esc_html($r_date); ?></span>
                    </div>
                    <h3 class="blog-prev-title"><a href="<?php echo esc_url($r_url); ?>"><?php echo esc_html($r_title); ?></a></h3>
                    <p class="blog-prev-excerpt"><?php echo esc_html($r_exc); ?></p>
                    <a href="<?php echo esc_url($r_url); ?>" class="blog-prev-link">
                        Read article
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </article>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
    </div>
</section>
<?php endif; ?>

<style>
/* ── Shared layout styles (mirrors single-vmc_service.php) ── */
.svc-single-wrap,
.svc-faq-section { background:#fff }
.svc-bc-wrap,
.svc-related-section { background:var(--warm) }
.svc-cta-section { background:var(--dark) }

.svc-bc-wrap { width:100%;border-top:1px solid rgba(0,0,0,.05);border-bottom:1px solid rgba(0,0,0,.06) }
.svc-bc-inner { max-width:1280px;margin:0 auto;padding:18px var(--pad) }
.svc-bc { display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:13px;line-height:1.7 }
.svc-bc-label { font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-right:12px }
.svc-bc-link { color:var(--mid);font-weight:600;text-decoration:none;transition:color .2s }
.svc-bc-link:hover { color:var(--red) }
.svc-bc-sep { color:rgba(0,0,0,.35);font-weight:500 }
.svc-bc-current { color:var(--dark);font-weight:700 }

.svc-single-wrap { padding:68px var(--pad) 84px }
.svc-single-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:52px;align-items:start }

.svc-intro-card { display:flex;gap:20px;align-items:flex-start;background:#fff;border:1px solid rgba(0,0,0,.06);border-left:4px solid var(--red);border-radius:0 8px 8px 0;box-shadow:0 8px 28px rgba(0,0,0,.05);padding:24px 28px;margin-bottom:32px }
.svc-intro-icon { flex-shrink:0;width:56px;height:56px;border-radius:12px;background:rgba(169,27,27,.06);color:var(--red);display:flex;align-items:center;justify-content:center }
.svc-intro-icon svg { width:28px;height:28px }
.svc-intro-text { flex:1 }
.svc-intro-label { font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:6px }
.svc-intro-text p { font-size:15.5px;line-height:1.8;color:var(--mid);margin:0 }

.svc-entry { font-size:15px;line-height:1.85;color:var(--mid) }
.svc-entry h2 { font-family:'Playfair Display',serif;font-size:clamp(20px,2.4vw,28px);font-weight:700;color:var(--dark);line-height:1.2;margin:52px 0 14px;padding-top:44px;border-top:1px solid rgba(0,0,0,.08) }
.svc-entry h2:first-child { border-top:none;padding-top:0;margin-top:0 }
.svc-entry h3 { font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--dark);margin:32px 0 9px }
.svc-entry h4 { font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin:24px 0 7px }
.svc-entry p { margin-bottom:18px }
.svc-entry p:last-child { margin-bottom:0 }
.svc-entry ul,.svc-entry ol { margin:0 0 22px;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:10px }
.svc-entry ul li,.svc-entry ol li { padding-left:24px;position:relative;line-height:1.7 }
.svc-entry ul li::before { content:'';position:absolute;left:0;top:9px;width:7px;height:7px;border-radius:50%;background:var(--red);opacity:.7 }
.svc-entry ol { counter-reset:svc-ol }
.svc-entry ol li { counter-increment:svc-ol }
.svc-entry ol li::before { content:counter(svc-ol);position:absolute;left:0;top:1px;font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:var(--red);line-height:1.6 }
.svc-entry a { color:var(--red);font-weight:600;border-bottom:1px solid rgba(169,27,27,.25);transition:border-color .2s }
.svc-entry a:hover { border-color:var(--red) }
.svc-entry strong { color:var(--dark);font-weight:700 }
.svc-entry blockquote { margin:36px 0;padding:22px 28px;border-left:4px solid var(--red);background:var(--warm);border-radius:0 8px 8px 0;font-style:italic;font-size:16px;color:var(--dark);line-height:1.7 }
.svc-entry img { border-radius:8px;margin:28px 0;box-shadow:0 8px 32px rgba(0,0,0,.1);width:100%;height:auto }
.svc-entry hr { border:none;border-top:1px solid rgba(0,0,0,.1);margin:40px 0 }
.svc-entry table { width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06) }
.svc-entry thead th { background:var(--dark);color:#fff;padding:13px 18px;text-align:left;font-size:11px;letter-spacing:.14em;text-transform:uppercase }
.svc-entry td { padding:14px 18px;border-bottom:1px solid rgba(0,0,0,.08);color:var(--mid);vertical-align:top }
.svc-entry tr:last-child td { border-bottom:none }
.svc-entry tr:nth-child(even) td { background:rgba(0,0,0,.018) }

.svc-sidebar { position:sticky;top:88px;display:flex;flex-direction:column;gap:14px }
.svc-side-card { background:#fff;border:1px solid rgba(0,0,0,.06);border-top:3px solid var(--red);border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.08);padding:26px;overflow:hidden }
.svc-side-card-header { display:flex;align-items:center;gap:9px;font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--dark);margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid rgba(0,0,0,.07) }
.svc-side-card-header svg { color:var(--red);flex-shrink:0 }
.svc-side-loc { margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(0,0,0,.06) }
.svc-side-loc:last-of-type { border:none;margin-bottom:0;padding-bottom:0 }
.svc-side-loc strong { display:block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:5px }
.svc-side-loc address { font-style:normal;font-size:12.5px;line-height:1.55;color:var(--mid);margin-bottom:7px }
.svc-side-loc a { font-size:16px;font-weight:700;color:var(--dark);transition:color .2s;letter-spacing:-.01em }
.svc-side-loc a:hover { color:var(--red) }
.svc-side-cta { display:flex;justify-content:center;margin-top:20px;width:100% }
.svc-side-nudge { background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:8px;padding:18px 20px;text-align:center }
.svc-side-nudge p { font-size:13px;color:var(--mid);margin-bottom:10px;font-weight:500 }
.svc-side-nudge .btn-ghost { font-size:12px;font-weight:700;justify-content:center;width:100% }

.svc-section-eye { display:flex;align-items:center;gap:12px;margin-bottom:12px }
.svc-cta-section { padding:80px var(--pad);position:relative;overflow:hidden }
.svc-cta-section::before { content:'';position:absolute;top:-60px;right:-60px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(169,27,27,.18) 0%,transparent 70%);pointer-events:none }
.svc-cta-inner { max-width:1280px;margin:0 auto;position:relative;z-index:1 }
.svc-cta-body { font-size:15px;line-height:1.8;color:rgba(255,255,255,.6);max-width:560px;margin:14px 0 28px }
.svc-cta-btns { display:flex;flex-wrap:wrap;gap:14px;align-items:center }
.svc-cta-btn-primary { box-shadow:0 4px 20px rgba(169,27,27,.35) }
.svc-cta-btn-ghost { display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:rgba(255,255,255,.75);transition:color .2s }
.svc-cta-btn-ghost:hover { color:#fff }
.svc-cta-btn-ghost svg { transition:transform .2s }
.svc-cta-btn-ghost:hover svg { transform:translateX(4px) }
.svc-cta-section .sec-lbl { color:var(--gold) }
.svc-cta-section .sec-rule { background:rgba(255,255,255,.15) }
.svc-related-section { padding:80px var(--pad) }
.svc-related-inner { max-width:1280px;margin:0 auto }

/* ── Post-specific ── */
.post-meta-strip { display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,.07) }
.post-meta-item { display:flex;align-items:center;gap:6px;font-size:13px;color:var(--mid) }
.post-meta-item svg { flex-shrink:0;opacity:.6 }
.post-meta-item a { color:var(--mid);font-weight:600;text-decoration:none }
.post-meta-item a:hover { color:var(--red) }
.post-tags { display:flex;flex-wrap:wrap;gap:8px;margin-top:36px;padding-top:28px;border-top:1px solid rgba(0,0,0,.08) }
.post-tag { font-size:11.5px;font-weight:700;letter-spacing:.06em;color:var(--mid);background:var(--cream);border:1px solid rgba(0,0,0,.08);border-radius:4px;padding:5px 12px;text-decoration:none;transition:border-color .2s,color .2s }
.post-tag:hover { border-color:rgba(169,27,27,.3);color:var(--red) }

/* ── Responsive ── */
@media(max-width:1060px) {
    .svc-single-container { grid-template-columns:1fr;gap:40px }
    .svc-sidebar { position:static }
    .svc-side-card,.svc-side-nudge { max-width:480px }
}
@media(max-width:900px) {
    .svc-single-wrap,.svc-cta-section,.svc-related-section { padding:56px 24px }
    .svc-bc-inner { padding:14px 24px }
    .svc-intro-card { flex-direction:column;gap:14px }
    .svc-intro-icon { width:48px;height:48px }
    .svc-entry h2 { font-size:22px;padding-top:32px;margin-top:36px }
    .svc-cta-btns { flex-direction:column;align-items:flex-start }
    .svc-bc { gap:6px;font-size:12px }
    .svc-bc-label { width:100%;margin-right:0;margin-bottom:2px }
}
</style>

<?php endwhile; ?>
<?php get_footer(); ?>
