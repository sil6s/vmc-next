<?php
/**
 * Template Name: Blog
 * Template Post Type: page
 */

get_header();

$paged = max(1, get_query_var('paged'), get_query_var('page'));

$posts = new WP_Query([
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'paged'          => $paged,
    'posts_per_page' => 9,
]);
?>

<div class="home-page">

    <!-- HERO -->
    <div class="home-band home-band--cream">
        <section class="blog-prev-outer">
            <div class="home-shell">
                <div class="sec-eye">
                    <span class="sec-lbl">Pet Care Resources</span>
                    <span class="sec-rule"></span>
                </div>

                <h1 class="sec-h2" style="max-width: 16ch;">
                    Pet care articles for everyday decisions.
                </h1>

                <p class="blog-prev-intro" style="max-width: 720px; margin-top: 14px;">
                    Practical guidance from our veterinary team in Northern Kentucky. Learn about pet health, behavior, and when to seek care.
                </p>

                <div class="hero-btns" style="margin-top: 24px;">
                    <a href="#posts" class="btn-red">Browse Articles</a>
                    <a href="/contact" class="btn-ghost">Contact Our Team</a>
                </div>
            </div>
        </section>
    </div>

    <!-- POSTS -->
    <div class="home-band home-band--white" id="posts">
        <section class="blog-prev-outer">
            <div class="home-shell">
                <div class="sec-eye">
                    <span class="sec-lbl">Latest Posts</span>
                    <span class="sec-rule"></span>
                </div>

                <h2 class="sec-h2">Recent articles from our veterinary team</h2>

                <p class="blog-prev-intro" style="max-width: 720px; margin-top: 14px;">
                    Browse recent posts below for helpful insights and everyday pet care guidance.
                </p>

                <?php if ($posts->have_posts()) : ?>
                    <div class="blog-prev-grid" style="margin-top: 40px;">
                        <?php while ($posts->have_posts()) : $posts->the_post(); ?>
                            <article class="blog-prev-card">

                                <?php if (has_post_thumbnail()) : ?>
                                    <a href="<?php the_permalink(); ?>" class="blog-prev-thumb" aria-label="<?php echo esc_attr(get_the_title()); ?>">
                                        <?php the_post_thumbnail('medium_large', ['loading' => 'lazy']); ?>
                                    </a>
                                <?php endif; ?>

                                <div class="blog-prev-body">
                                    <div class="blog-prev-meta">
                                        <?php
                                        $cats = get_the_category();
                                        if (!empty($cats)) :
                                        ?>
                                            <span class="blog-prev-cat"><?php echo esc_html($cats[0]->name); ?></span>
                                        <?php endif; ?>

                                        <span class="blog-prev-time"><?php echo esc_html(get_the_date('M j, Y')); ?></span>
                                    </div>

                                    <h3>
                                        <a href="<?php the_permalink(); ?>" style="color: inherit; text-decoration: none;">
                                            <?php the_title(); ?>
                                        </a>
                                    </h3>

                                    <p>
                                        <?php echo esc_html(wp_trim_words(get_the_excerpt(), 24)); ?>
                                    </p>

                                    <a href="<?php the_permalink(); ?>" class="blog-prev-link">
                                        Read article
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>

                    <?php wp_reset_postdata(); ?>

                    <?php if ($posts->max_num_pages > 1) : ?>
                        <div class="blog-prev-footer" style="margin-top: 40px;">
                            <?php
                            echo paginate_links([
                                'total'      => $posts->max_num_pages,
                                'current'    => $paged,
                                'mid_size'   => 1,
                                'prev_text'  => '← Previous',
                                'next_text'  => 'Next →',
                                'type'       => 'list',
                            ]);
                            ?>
                        </div>
                    <?php endif; ?>

                <?php else : ?>
                    <div style="margin-top: 32px;">
                        <p class="blog-prev-coming">No articles found right now. Please check back soon.</p>
                    </div>
                <?php endif; ?>
            </div>
        </section>
    </div>

    <!-- CTA -->
    <div class="home-band home-band--cream">
        <section class="blog-prev-outer">
            <div class="home-shell">
                <div class="sec-eye">
                    <span class="sec-lbl">Need Care Instead?</span>
                    <span class="sec-rule"></span>
                </div>

                <h2 class="sec-h2">Looking for an appointment instead?</h2>

                <p class="blog-prev-intro" style="max-width: 640px; margin-top: 14px;">
                    If you’re here because something is going on with your pet, our team is here to help you take the next step.
                </p>

                <div class="hero-btns" style="margin-top: 24px;">
                    <button class="btn-red" onclick="openAptModal('blog-cta')">Request Appointment</button>
                    <a href="/contact" class="btn-ghost">Contact Us</a>
                </div>
            </div>
        </section>
    </div>

</div>

<?php get_footer(); ?>