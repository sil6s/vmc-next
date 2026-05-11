<?php get_header(); ?>

<div style="padding-top:70px;background:var(--cream)">
  <!-- Archive hero band -->
  <div style="background:var(--warm);padding:64px var(--pad,68px) 56px">
    <div style="max-width:900px;margin:0 auto">
      <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('VMC','vmc'); ?></span><span class="sec-rule"></span></div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:700;color:var(--dark);line-height:1.1;margin-top:10px">
        <?php
        if (is_post_type_archive('vmc_service')) esc_html_e('Our Services','vmc');
        elseif (is_post_type_archive('vmc_team'))  esc_html_e('Our Team','vmc');
        else the_archive_title();
        ?>
      </h1>
      <?php
      if (is_post_type_archive('vmc_service')) echo '<p style="margin-top:12px;font-size:16px;color:var(--mid);max-width:540px">' . esc_html__('Six areas where VMC delivers exceptional, personalized veterinary care.','vmc') . '</p>';
      elseif (is_post_type_archive('vmc_team')) echo '<p style="margin-top:12px;font-size:16px;color:var(--mid);max-width:540px">' . esc_html__('The people behind VMC — experienced, caring, and genuinely invested in this community.','vmc') . '</p>';
      ?>
    </div>
  </div>

  <!-- Archive grid -->
  <div style="max-width:1100px;margin:0 auto;padding:64px var(--pad,68px)">
    <?php if (have_posts()) : ?>

    <?php if (is_post_type_archive('vmc_service')) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:3px">
      <?php while (have_posts()) : the_post();
        $icon_slug = get_post_meta(get_the_ID(),'_vmc_service_icon',true) ?: 'default';
        $icons = ['wellness'=>'<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round"><path d="M6 4C6 4 4.5 4 4.5 6.5L4.5 12C4.5 15.6 7.5 18 11 18"/><path d="M10.5 4C10.5 4 12 4 12 6.5L12 12C12 15.6 9 18 11 18"/><circle cx="17" cy="19.5" r="3.5"/><circle cx="6" cy="3.5" r="1" fill="#A91B1B"/><circle cx="10.5" cy="3.5" r="1" fill="#A91B1B"/></svg>','default'=>'<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'];
        $icon = $icons[$icon_slug] ?? $icons['default'];
      ?>
      <div class="svc-card" style="background:var(--white)">
        <div class="svc-iw"><?php echo $icon; ?></div>
        <h3 class="svc-h"><?php the_title(); ?></h3>
        <p class="svc-p"><?php echo wp_trim_words(get_the_excerpt(),25,'...'); ?></p>
        <a href="<?php the_permalink(); ?>" class="svc-more"><?php esc_html_e('Learn more','vmc'); ?> →</a>
      </div>
      <?php endwhile; ?>
    </div>

    <?php elseif (is_post_type_archive('vmc_team')) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
      <?php while (have_posts()) : the_post();
        $role    = get_post_meta(get_the_ID(),'_vmc_team_role',true);
        $thumb   = get_post_thumbnail_id();
        $img_src = $thumb ? wp_get_attachment_image_src($thumb,'vmc-staff') : null;
      ?>
      <a href="<?php the_permalink(); ?>" class="staff-card" style="display:block">
        <div class="staff-img">
          <?php if ($img_src) : ?><img src="<?php echo esc_url($img_src[0]); ?>" alt="<?php the_title_attribute(); ?>" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0"><?php else : ?><div class="staff-img-placeholder">🐾</div><?php endif; ?>
        </div>
        <div class="staff-info">
          <div class="staff-name"><?php the_title(); ?></div>
          <?php if ($role) : ?><div class="staff-role"><?php echo esc_html($role); ?></div><?php endif; ?>
          <p class="staff-bio"><?php echo wp_trim_words(get_the_excerpt(),20,'...'); ?></p>
        </div>
      </a>
      <?php endwhile; ?>
    </div>

    <?php else : // Generic archive ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px">
      <?php while (have_posts()) : the_post(); ?>
      <article style="background:var(--white);border-radius:8px;overflow:hidden">
        <?php if (has_post_thumbnail()) the_post_thumbnail('medium','style=width:100%;height:200px;object-fit:cover'); ?>
        <div style="padding:24px">
          <h2 style="font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-bottom:10px"><a href="<?php the_permalink(); ?>" style="color:var(--dark)"><?php the_title(); ?></a></h2>
          <p style="font-size:14px;color:var(--mid);line-height:1.65"><?php the_excerpt(); ?></p>
        </div>
      </article>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>

    <?php the_posts_pagination(['prev_text'=>'← Previous','next_text'=>'Next →']); ?>
    <?php else : ?>
    <p style="color:var(--mid);font-size:16px"><?php esc_html_e('Nothing found.','vmc'); ?></p>
    <?php endif; ?>
  </div>
</div>

<?php get_footer(); ?>
