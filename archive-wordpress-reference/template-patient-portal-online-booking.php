<?php
/**
 * Template Name: Patient Portal / Online Booking Page
 */

get_header();

$ext_url  = get_field( 'portal_external_link_url' ) ?: vmc_get( 'vmc_portal_url', 'https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2' );
$h1       = get_field( 'portal_h1' )    ?: get_the_title();
$intro    = get_field( 'portal_intro' ) ?: 'Log in to view records, request appointments, and manage your pet\'s care — all in one secure place.';
?>

<style>
/* ── Hero ─────────────────────────────────────────────────── */
.tool-hero{background:var(--cream);padding:100px var(--pad) 72px}
.tool-hero .eyebrow{margin-bottom:18px}
.tool-hero-h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);line-height:1.18;color:var(--dark);margin:0 0 20px;max-width:18ch}
.tool-hero-sub{font-size:16px;line-height:1.8;color:var(--mid);max-width:62ch;margin:0 0 32px}
.tool-hero-btns{display:flex;flex-wrap:wrap;gap:12px;align-items:center}

/* ── Block-editor content area ───────────────────────────── */
.tool-entry{background:var(--white);padding:80px var(--pad) 96px}
.tool-entry .rv{max-width:860px}

/* Typography inside the block area */
.tool-entry h2{font-family:'Playfair Display',serif;font-size:clamp(1.45rem,2.5vw,2rem);line-height:1.24;color:var(--dark);margin:0 0 14px}
.tool-entry h3{font-family:'Playfair Display',serif;font-size:1.25rem;line-height:1.3;color:var(--dark);margin:0 0 10px}
.tool-entry h4{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin:24px 0 8px}
.tool-entry p{font-size:15.5px;line-height:1.84;color:var(--mid);margin:0 0 18px}
.tool-entry ul,.tool-entry ol{padding-left:1.4em;margin:0 0 18px}
.tool-entry li{font-size:15.5px;line-height:1.84;color:var(--mid);margin-bottom:6px}
.tool-entry a{color:var(--red);font-weight:700;text-decoration:none}
.tool-entry a:hover{text-decoration:underline}
.tool-entry strong{color:var(--dark)}
.tool-entry hr,.tool-entry .wp-block-separator{border:none;border-top:1px solid rgba(0,0,0,.1);margin:40px 0}

/* Gutenberg columns */
.tool-entry .wp-block-columns{gap:28px;margin-bottom:28px}
.tool-entry .wp-block-column{min-width:0}

/* Gutenberg group blocks as cards */
.tool-entry .wp-block-group.is-style-card,
.tool-entry .wp-block-group[class*="has-background"]{border-radius:8px;padding:28px;margin-bottom:22px}
.tool-entry .wp-block-group.has-cream-background-color{background:var(--cream) !important}
.tool-entry .wp-block-group.has-warm-background-color{background:var(--warm) !important}

/* Buttons inside content */
.tool-entry .wp-block-buttons{margin:24px 0}
.tool-entry .wp-block-button__link{background:var(--red);color:#fff;border-radius:6px;padding:12px 24px;font-weight:700;font-size:14px;letter-spacing:.03em;text-decoration:none}
.tool-entry .wp-block-button.is-style-outline .wp-block-button__link{background:transparent;color:var(--red);border:2px solid var(--red)}

/* Image blocks */
.tool-entry .wp-block-image img{border-radius:8px}

/* Quote / pullquote */
.tool-entry blockquote,.tool-entry .wp-block-quote{border-left:3px solid var(--red);padding:4px 0 4px 20px;margin:24px 0}
.tool-entry blockquote p,.tool-entry .wp-block-quote p{font-style:italic;font-size:16px;color:var(--dark)}

/* Cover blocks */
.tool-entry .wp-block-cover{border-radius:8px;overflow:hidden;margin-bottom:22px}

@media(max-width:700px){
  .tool-hero{padding:80px 24px 56px}
  .tool-entry{padding:56px 24px 72px}
}
</style>

<div class="tool-page">

  <section class="tool-hero">
    <div class="rv">
      <div class="eyebrow"><span class="eyebrow-dash"></span><?php esc_html_e( 'Patient Portal', 'vmc' ); ?></div>
      <h1 class="tool-hero-h1"><?php echo esc_html( $h1 ); ?></h1>
      <p class="tool-hero-sub"><?php echo esc_html( $intro ); ?></p>
      <div class="tool-hero-btns">
        <a class="btn-red" href="<?php echo esc_url( $ext_url ); ?>" target="_blank" rel="noopener noreferrer">
          <?php esc_html_e( 'Open Patient Portal', 'vmc' ); ?>
        </a>
        <button class="btn-ghost" onclick="openAptModal('portal-page')">
          <?php esc_html_e( 'Book an Appointment', 'vmc' ); ?>
        </button>
      </div>
    </div>
  </section>

  <div class="tool-entry">
    <div class="rv">
      <?php
      if ( have_posts() ) :
        while ( have_posts() ) : the_post();
          the_content();
        endwhile;
      endif;
      ?>
    </div>
  </div>

</div>

<?php get_footer(); ?>
