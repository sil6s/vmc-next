<?php get_header(); ?>

<div style="padding-top:70px;min-height:60vh;background:var(--cream)">
  <div style="max-width:860px;margin:0 auto;padding:72px var(--pad,68px)">
    <?php while (have_posts()) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <div class="sec-eye" style="margin-bottom:12px">
        <span class="sec-lbl"><?php echo esc_html(get_bloginfo('name')); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:700;line-height:1.1;color:var(--dark);margin-bottom:28px"><?php the_title(); ?></h1>
      <?php if (has_post_thumbnail()) : ?>
      <div style="margin-bottom:36px;border-radius:6px;overflow:hidden"><?php the_post_thumbnail('large','style=width:100%;height:auto'); ?></div>
      <?php endif; ?>
      <div class="entry-content" style="font-size:16px;line-height:1.82;color:var(--mid);max-width:700px">
        <?php the_content(); ?>
      </div>
    </article>
    <?php endwhile; ?>
  </div>
</div>

<?php get_footer(); ?>
