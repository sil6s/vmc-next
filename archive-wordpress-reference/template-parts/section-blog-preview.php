<?php
/**
 * Section: Blog / Resources
 * Pulls latest published posts. Falls back to placeholder cards if none exist.
 * Styled to match the services section card grid.
 */

$heading        = get_field('blog_section_heading') ?: 'From Our Pet Care Blog';
$intro          = get_field('blog_section_intro')   ?: 'Practical guidance from our veterinary team in Northern Kentucky. Articles on pet health, wellness, and veterinary care for dogs and cats in Fort Thomas and Independence.';
$view_all_url   = get_field('blog_view_all_url')    ?: home_url('/blog/');
$view_all_label = get_field('blog_view_all_label')  ?: 'View all articles';

$posts = get_posts([
    'post_type'      => 'post',
    'posts_per_page' => 3,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
]);

$fallback = [
    [
        'title'    => 'How Often Should You Take Your Dog to the Vet?',
        'excerpt'  => 'Most healthy adult dogs benefit from annual wellness exams, while puppies and senior dogs need more frequent visits. Learn what to expect at each life stage and why routine care matters.',
        'category' => 'Dog Care',
    ],
    [
        'title'    => 'Signs Your Cat Needs a Dental Cleaning',
        'excerpt'  => 'Bad breath, drooling, and difficulty eating are common signs of dental disease in cats. Here is how to recognize the warning signs early and what a professional COHAT cleaning involves.',
        'category' => 'Cat Health',
    ],
    [
        'title'    => 'Emergency Symptoms in Pets: When To Call Your Vet Right Away',
        'excerpt'  => 'Knowing which symptoms require urgent veterinary care can save your pet\'s life. This guide covers the most important warning signs for dogs and cats in Northern Kentucky.',
        'category' => 'Pet Safety',
    ],
];

$use_real = ! empty($posts);
?>
<section class="blog-prev-outer" id="resources">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Pet Care Resources</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php echo esc_html($heading); ?></h2>
    <p class="blog-prev-intro"><?php echo esc_html($intro); ?></p>
  </div>

  <div class="blog-prev-grid rv">
    <?php if ( $use_real ) :
      foreach ( $posts as $p ) :
        setup_postdata($p);
        $url      = get_permalink($p->ID);
        $title    = get_the_title($p->ID);
        $cats     = get_the_category($p->ID);
        $cat_name = ! empty($cats) ? $cats[0]->name : 'Veterinary Care';
        $date_fmt = get_the_date('M j, Y', $p->ID);
        $excerpt  = has_excerpt($p->ID)
            ? get_the_excerpt($p->ID)
            : wp_trim_words(wp_strip_all_tags(get_post_field('post_content', $p->ID)), 28, '…');
        $thumb    = get_the_post_thumbnail_url($p->ID, 'medium');
    ?>
    <article class="blog-prev-card">
      <?php if ($thumb) : ?>
      <a href="<?php echo esc_url($url); ?>" class="blog-prev-thumb" tabindex="-1" aria-hidden="true">
        <img src="<?php echo esc_url($thumb); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy">
      </a>
      <?php endif; ?>
      <div class="blog-prev-body">
        <div class="blog-prev-meta">
          <span class="blog-prev-cat"><?php echo esc_html($cat_name); ?></span>
          <span class="blog-prev-date"><?php echo esc_html($date_fmt); ?></span>
        </div>
        <h3 class="blog-prev-title"><a href="<?php echo esc_url($url); ?>"><?php echo esc_html($title); ?></a></h3>
        <p class="blog-prev-excerpt"><?php echo esc_html($excerpt); ?></p>
        <a href="<?php echo esc_url($url); ?>" class="blog-prev-link">
          Read article
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
    <?php endforeach; wp_reset_postdata();
    else :
      foreach ( $fallback as $f ) : ?>
    <article class="blog-prev-card">
      <div class="blog-prev-body">
        <div class="blog-prev-meta">
          <span class="blog-prev-cat"><?php echo esc_html($f['category']); ?></span>
        </div>
        <h3 class="blog-prev-title"><?php echo esc_html($f['title']); ?></h3>
        <p class="blog-prev-excerpt"><?php echo esc_html($f['excerpt']); ?></p>
        <span class="blog-prev-coming">Coming soon</span>
      </div>
    </article>
    <?php endforeach; endif; ?>
  </div>

  <div class="blog-prev-footer rv">
    <a href="<?php echo esc_url($view_all_url); ?>" class="btn-ghost blog-prev-all">
      <?php echo esc_html($view_all_label); ?>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>
