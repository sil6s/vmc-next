<?php get_header(); ?>

<div style="padding-top:70px;background:var(--cream);min-height:60vh">

<?php while (have_posts()) : the_post();
  $post_type = get_post_type();
?>

<?php if ($post_type === 'vmc_service') :
  $icon_slug = get_post_meta(get_the_ID(),'_vmc_service_icon',true);
  $service_icons = [
    'wellness'   => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 7C10 7 7.5 7 7.5 11L7.5 20C7.5 26 13 30 18 30"/><path d="M18 7C18 7 20.5 7 20.5 11L20.5 20C20.5 26 15 30 18 30"/><circle cx="28" cy="32" r="6"/><circle cx="10" cy="6" r="1.5" fill="#A91B1B"/><circle cx="18" cy="6" r="1.5" fill="#A91B1B"/></svg>',
    'dental'     => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12C9 12 7 14.5 7 19C7 25 10 32 11 36C11.7 38.5 13 39.5 14 36C14.8 33 15.5 30 20 30C24.5 30 25.2 33 26 36C27 39.5 28.3 38.5 29 36C30 32 33 25 33 19C33 14.5 31 12 28 12C26 12 24 13.5 20 13.5C16 13.5 14 12 12 12Z"/></svg>',
    'surgery'    => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34L28 14"/><path d="M28 14L33 9L36 12L31 17Z" fill="#A91B1B" stroke="none"/><line x1="10" y1="8" x2="10" y2="17"/><line x1="6" y1="12.5" x2="14" y2="12.5"/></svg>',
    'behavioral' => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 5C15 5 12 9 12 13C9 13 6 16 6 20C6 24 9 27 12 27C12 30 15 34 18 34L18 37"/><path d="M20 5C25 5 28 9 28 13C31 13 34 16 34 20C34 24 31 27 28 27C28 30 25 34 22 34L22 37"/><line x1="18" y1="37" x2="22" y2="37"/></svg>',
    'urgent'     => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4L37 35H3Z"/><line x1="20" y1="17" x2="20" y2="26"/><circle cx="20" cy="30.5" r="1.5" fill="#A91B1B"/></svg>',
    'feline'     => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="24" r="13"/><polygon points="11,15 8,5 16,14" stroke-linejoin="round"/><polygon points="29,15 32,5 24,14" stroke-linejoin="round"/></svg>',
    'default'    => '<svg viewBox="0 0 40 40" fill="none" stroke="#A91B1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="20" r="15"/><line x1="20" y1="13" x2="20" y2="27"/><line x1="13" y1="20" x2="27" y2="20"/></svg>',
  ];
  $icon = $service_icons[$icon_slug] ?? $service_icons['default'];
?>
<!-- Service Hero Band -->
<div style="background:var(--warm);padding:64px var(--pad,68px) 56px">
  <div style="max-width:900px;margin:0 auto">
    <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('Our Services','vmc'); ?></span><span class="sec-rule"></span></div>
    <div style="display:flex;align-items:flex-start;gap:28px;margin-top:16px;flex-wrap:wrap">
      <div style="width:72px;height:72px;background:var(--rglow);border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><?php echo $icon; ?></div>
      <div>
        <h1 style="font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:700;color:var(--dark);line-height:1.1"><?php the_title(); ?></h1>
        <p style="margin-top:10px;font-size:15px;color:var(--mid)"><?php echo wp_trim_words(get_the_excerpt(),20,''); ?></p>
      </div>
    </div>
  </div>
</div>
<!-- Service Content -->
<div style="max-width:900px;margin:0 auto;padding:56px var(--pad,68px)">
  <div class="entry-content" style="font-size:16px;line-height:1.85;color:var(--mid)"><?php the_content(); ?></div>
  <div style="margin-top:48px;padding:36px;background:var(--cream);border-left:3px solid var(--red);border-radius:0 8px 8px 0">
    <h3 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:14px"><?php esc_html_e('Ready to schedule?','vmc'); ?></h3>
    <p style="color:var(--mid);margin-bottom:20px;font-size:15px"><?php esc_html_e('Call either location directly — we\'ll find you a time that works.','vmc'); ?></p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <a href="<?php echo esc_url(vmc_phone_link('ft')); ?>" class="btn-red"><?php echo esc_html(vmc_get('vmc_ft_phone','(859) 442-4420')); ?> · Fort Thomas</a>
      <a href="<?php echo esc_url(vmc_phone_link('ind')); ?>" class="btn-red" style="background:var(--dark)"><?php echo esc_html(vmc_get('vmc_ind_phone','(859) 356-2242')); ?> · Independence</a>
    </div>
  </div>
  <!-- Related services -->
  <?php
  $related = get_posts(['post_type'=>'vmc_service','posts_per_page'=>3,'post__not_in'=>[get_the_ID()],'orderby'=>'rand']);
  if ($related) :
  ?>
  <div style="margin-top:56px">
    <h3 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;margin-bottom:24px"><?php esc_html_e('Other Services','vmc'); ?></h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">
      <?php foreach ($related as $r) : ?>
      <a href="<?php echo esc_url(get_permalink($r->ID)); ?>" style="display:block;padding:22px;background:var(--warm);border-radius:8px;transition:transform .2s;font-size:15px;font-weight:700;color:var(--dark)" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''"><?php echo esc_html($r->post_title); ?> →</a>
      <?php endforeach; wp_reset_postdata(); ?>
    </div>
  </div>
  <?php endif; ?>
</div>

<?php elseif ($post_type === 'vmc_team') :
  $role    = get_post_meta(get_the_ID(),'_vmc_team_role',true);
  $creds   = get_post_meta(get_the_ID(),'_vmc_team_credentials',true);
?>
<div style="background:var(--warm);padding:64px var(--pad,68px) 56px">
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:start;flex-wrap:wrap">
    <div style="width:220px;flex-shrink:0">
      <?php if (has_post_thumbnail()) : the_post_thumbnail('vmc-team','style=width:220px;height:275px;object-fit:cover;border-radius:4px'); else : ?>
      <div style="width:220px;height:275px;background:linear-gradient(135deg,#d8d2ca,#c8c0b5);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#a09890;font-size:13px"><?php esc_html_e('Photo Coming Soon','vmc'); ?></div>
      <?php endif; ?>
    </div>
    <div>
      <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('Meet the Team','vmc'); ?></span><span class="sec-rule"></span></div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,48px);font-weight:700;color:var(--dark);line-height:1.1;margin-top:10px"><?php the_title(); ?></h1>
      <?php if ($role) : ?><p style="font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-top:8px"><?php echo esc_html($role); ?></p><?php endif; ?>
      <?php if ($creds) :
        $cred_list = array_filter(array_map('trim',explode("\n",$creds)));
      ?>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:22px;padding-top:22px;border-top:1px solid rgba(0,0,0,0.09)">
        <?php foreach ($cred_list as $cred) : ?>
        <div style="display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:600;color:var(--dark)"><span style="width:6px;height:6px;border-radius:50%;background:var(--red);flex-shrink:0;display:block"></span><?php echo esc_html($cred); ?></div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>
  </div>
</div>
<div style="max-width:860px;margin:0 auto;padding:52px var(--pad,68px)">
  <div class="entry-content" style="font-size:16px;line-height:1.85;color:var(--mid)"><?php the_content(); ?></div>
</div>

<?php else : ?>
<!-- Generic post/page -->
<div style="max-width:860px;margin:0 auto;padding:72px var(--pad,68px)">
  <?php if (has_post_thumbnail()) : ?><div style="margin-bottom:36px;border-radius:6px;overflow:hidden"><?php the_post_thumbnail('large','style=width:100%;height:auto'); ?></div><?php endif; ?>
  <h1 style="font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,50px);font-weight:700;color:var(--dark);line-height:1.1;margin-bottom:28px"><?php the_title(); ?></h1>
  <div class="entry-content" style="font-size:16px;line-height:1.85;color:var(--mid)"><?php the_content(); ?></div>
</div>
<?php endif; ?>

<?php endwhile; ?>

</div>

<?php get_footer(); ?>
