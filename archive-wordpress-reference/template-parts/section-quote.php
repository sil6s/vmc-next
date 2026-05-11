<?php
// section-quote.php
$quote    = vmc_get('vmc_quote_text','"Our rescue used to shake from the moment we pulled into the parking lot. After a few visits here she walks in on her own."');
$attr     = vmc_get('vmc_quote_attr','— Sarah M., Fort Thomas, KY · Google Review');
$bg_url   = vmc_get_quote_bg_url();
$style    = $bg_url ? 'style="background-image:url(' . esc_url($bg_url) . ');background-size:cover;background-position:center;"' : '';
?>
<div class="photo-break" <?php echo $style; ?>>
  <?php if ( ! $bg_url ) : ?>
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#c8c0b5,#b5ada3)"></div>
  <?php endif; ?>
  <div class="photo-break-overlay">
    <div class="photo-break-quote"><?php echo wp_kses_post($quote); ?></div>
    <?php if ( $attr ) : ?><div class="photo-break-attr"><?php echo esc_html($attr); ?></div><?php endif; ?>
  </div>
</div>
