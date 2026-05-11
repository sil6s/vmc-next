<?php get_header(); ?>

<div style="padding-top:70px;min-height:60vh;background:var(--cream)">
  <div style="max-width:860px;margin:0 auto;padding:72px var(--pad,68px)">
    <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('Search','vmc'); ?></span><span class="sec-rule"></span></div>
    <h1 style="font-family:'Playfair Display',serif;font-size:clamp(24px,3.5vw,42px);font-weight:700;color:var(--dark);margin:10px 0 32px">
      <?php printf(esc_html__('Results for: "%s"','vmc'), get_search_query()); ?>
    </h1>
    <?php get_search_form(); ?>
    <div style="margin-top:40px;display:flex;flex-direction:column;gap:28px">
      <?php if (have_posts()) :
        while (have_posts()) : the_post(); ?>
        <article style="padding-bottom:28px;border-bottom:1px solid rgba(0,0,0,0.08)">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:8px"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name ?? get_post_type()); ?></div>
          <h2 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-bottom:8px"><a href="<?php the_permalink(); ?>" style="color:var(--dark)"><?php the_title(); ?></a></h2>
          <p style="font-size:14px;color:var(--mid);line-height:1.65"><?php the_excerpt(); ?></p>
        </article>
        <?php endwhile;
        the_posts_pagination();
      else : ?>
        <p style="color:var(--mid);font-size:15px"><?php esc_html_e('No results found. Try different keywords or','vmc'); ?> <a href="<?php echo esc_url(home_url('/#contact')); ?>" style="color:var(--red)"><?php esc_html_e('contact us directly','vmc'); ?></a>.</p>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php get_footer(); ?>
