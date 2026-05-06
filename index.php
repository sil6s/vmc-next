<?php
// Fallback – redirect to front page
if ( is_home() && ! is_front_page() ) {
    get_header();
    // Blog index
    echo '<div style="padding-top:70px;min-height:60vh;background:var(--cream)">';
    echo '<div style="max-width:900px;margin:0 auto;padding:72px var(--pad,68px)">';
    echo '<div class="sec-eye"><span class="sec-lbl">'.esc_html__('Blog','vmc').'</span><span class="sec-rule"></span></div>';
    echo '<h1 style="font-family:\'Playfair Display\',serif;font-size:clamp(28px,4vw,48px);font-weight:700;color:var(--dark);margin-top:10px;margin-bottom:40px">'.esc_html__('Latest Updates','vmc').'</h1>';
    if (have_posts()) :
        echo '<div style="display:flex;flex-direction:column;gap:36px">';
        while (have_posts()) : the_post(); ?>
        <article style="display:grid;grid-template-columns:1fr auto;gap:32px;padding-bottom:36px;border-bottom:1px solid rgba(0,0,0,0.08)">
          <div>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:10px"><?php echo get_the_date(); ?></div>
            <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:10px"><a href="<?php the_permalink(); ?>" style="color:var(--dark)"><?php the_title(); ?></a></h2>
            <div style="font-size:15px;color:var(--mid);line-height:1.7"><?php the_excerpt(); ?></div>
            <a href="<?php the_permalink(); ?>" style="display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:13px;font-weight:700;color:var(--red)"><?php esc_html_e('Read more','vmc'); ?> →</a>
          </div>
          <?php if (has_post_thumbnail()) : ?><div><?php the_post_thumbnail('thumbnail','style=width:160px;height:120px;object-fit:cover;border-radius:6px'); ?></div><?php endif; ?>
        </article>
        <?php endwhile;
        echo '</div>';
        the_posts_pagination();
    else :
        echo '<p style="color:var(--mid)">' . esc_html__('No posts yet.','vmc') . '</p>';
    endif;
    echo '</div></div>';
    get_footer();
} else {
    // Redirect to front page template
    get_template_part('front-page');
}
