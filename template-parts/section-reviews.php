<?php // section-reviews.php
$reviews = get_posts([
  'post_type'      => 'vmc_review',
  'posts_per_page' => 6,
  'post_status'    => 'publish',
  'orderby'        => 'menu_order date',
  'order'          => 'ASC',
]);

$fallback_reviews = [
  ['BK','Brat K.','Fort Thomas, KY',5,'Dr. Baker and her associates are amazing. They treat your pets like family and take the time to answer every question without rushing. You can tell they genuinely care about both the animals and their owners.'],
  
  ['BB','Bilinda B.','Independence, KY',5,'From the moment we walked in, everything felt calm and thoughtful. The team took time to help my cat feel comfortable, and the care was incredibly thorough. We are so happy to have found our new family vet.'],
  
  ['TB','Tiffany B.','Northern Kentucky',5,'Amazing is an understatement. The staff is gentle, kind, and professional. They explained pricing upfront and even followed up the next day to check on my pet. That level of care is rare.'],
  
  ['JR','Jerriann R.','Fort Thomas, KY',5,'Our first visit couldn’t have gone better. Everyone was kind, patient, and made sure our pet felt comfortable. From start to finish, it was a 10 out of 10 experience.'],
  
  ['EJ','Elizabeth J.','Covington, KY',5,'The most thorough and compassionate care we’ve ever experienced. The staff went above and beyond, even helping us during a stressful situation. You can truly feel how much they care.'],
  
  ['CJ','Christopher J.','Independence, KY',5,'Fantastic service and expert care. They treated our cat quickly and effectively, and even followed up afterward. We won’t be going anywhere else.'],
];
?>
<section class="reviews-sec" id="reviews">
  <div class="rv">
    <div class="reviews-hed">
      <div>
        <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('Client Reviews','vmc'); ?></span><span class="sec-rule"></span></div>
        <h2 class="sec-h2"><?php esc_html_e('What our community says.','vmc'); ?></h2>
      </div>
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
        <div class="rmeta-score">
          <span class="rmeta-n">4.8</span>
          <div>
            <div style="font-size:18px;color:#E6AC00;letter-spacing:2px">★★★★★</div>
            <div style="font-size:12px;color:var(--mid);margin-top:2px"><?php esc_html_e('49 reviews · Fort Thomas','vmc'); ?></div>
            <div style="font-size:12px;color:var(--mid)"><?php esc_html_e('109 reviews · Independence','vmc'); ?></div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="https://maps.app.goo.gl/qbewx9TWKZW2apwx5" target="_blank" rel="noopener" class="verify-badge">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Fort Thomas Reviews ↗
          </a>
          <a href="https://maps.app.goo.gl/TWJQMEUG2TmpcnKT9" target="_blank" rel="noopener" class="verify-badge">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Independence Reviews ↗
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="rev-grid rv">
    <?php
    $source = ! empty($reviews) ? $reviews : null;
    if ( $source ) :
      foreach ($source as $review) :
        $author   = get_post_meta($review->ID,'_vmc_review_author',true) ?: $review->post_title;
        $loc      = get_post_meta($review->ID,'_vmc_review_location',true);
        $rating   = (int) get_post_meta($review->ID,'_vmc_review_rating',true) ?: 5;
        $initials = get_post_meta($review->ID,'_vmc_review_initials',true) ?: strtoupper(substr($author,0,2));
        $content  = $review->post_content;
    ?>
    <div class="rev-card">
      <div class="rev-q">"</div>
      <div class="rev-st"><?php echo vmc_stars($rating); ?></div>
      <p class="rev-txt"><?php echo esc_html($content); ?></p>
      <div class="rev-auth">
        <div class="rev-av"><?php echo esc_html($initials); ?></div>
        <div>
          <div class="rev-name"><?php echo esc_html($author); ?></div>
          <div class="rev-meta"><span class="rev-chk">✓</span> Google<?php echo $loc ? ' · '.esc_html($loc) : ''; ?></div>
        </div>
      </div>
    </div>
    <?php endforeach; wp_reset_postdata();
    else :
      foreach ($fallback_reviews as [$initials,$name,$loc,$rating,$text]) :
    ?>
    <div class="rev-card">
      <div class="rev-q">"</div>
      <div class="rev-st"><?php echo vmc_stars($rating); ?></div>
      <p class="rev-txt"><?php echo esc_html($text); ?></p>
      <div class="rev-auth">
        <div class="rev-av"><?php echo esc_html($initials); ?></div>
        <div>
          <div class="rev-name"><?php echo esc_html($name); ?></div>
          <div class="rev-meta"><span class="rev-chk">✓</span> Google · <?php echo esc_html($loc); ?></div>
        </div>
      </div>
    </div>
    <?php endforeach; endif; ?>
  </div>
  <div style="margin-top:28px">
    <a href="https://reviews.birdeye.com/veterinary-medical-center-of-fort-thomas-176970753364756" target="_blank" rel="noopener" style="font-size:13px;font-weight:600;color:var(--red)"><?php esc_html_e('Read all reviews on BirdEye ↗','vmc'); ?></a>
  </div>
</section>
