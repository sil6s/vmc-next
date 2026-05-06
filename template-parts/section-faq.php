<?php
/**
 * Section: FAQ
 * NKY-specific questions. Supports FAQ schema via heading + faq-item markup.
 * Targets long-tail queries and Google "People Also Ask".
 */

$heading = get_field('home_faq_heading') ?: 'Common Questions About Veterinary Care in Northern Kentucky';
$intro   = get_field('home_faq_intro')   ?: 'We have gathered answers to the questions we hear most often from pet owners in Fort Thomas, Independence, and throughout Northern Kentucky. If you don\'t see your question here, please call us directly — we are always happy to help.';

$faqs = get_posts([
    'post_type'      => 'vmc_faq',
    'posts_per_page' => 10,
    'post_status'    => 'publish',
    'orderby'        => 'menu_order date',
    'order'          => 'ASC',
]);

$fallback_faqs = [
    [
        __('How much does a vet visit cost in Northern Kentucky?', 'vmc'),
        __('Vet visit costs in Northern Kentucky vary by appointment type and your pet\'s individual needs. A routine wellness exam at Veterinary Medical Center includes a comprehensive nose-to-tail physical, a health discussion, and personalized recommendations. We provide transparent pricing before any services are performed so there are no surprises. Call our Fort Thomas or Independence team for current pricing and to ask about wellness plans.', 'vmc'),
    ],
    [
        __('When should I take my pet to the vet?', 'vmc'),
        __('Healthy adult dogs and cats should see a veterinarian at least once a year for a wellness exam, vaccinations, and preventive care guidance. Puppies and kittens need more frequent visits in their first year. Senior pets — generally over 7 years — benefit from twice-yearly checkups. You should also call us any time you notice changes in appetite, behavior, energy level, litter box habits, or physical appearance.', 'vmc'),
    ],
    [
        __('Do you offer emergency or urgent care services?', 'vmc'),
        __('Yes. Veterinary Medical Center provides urgent same-day care during regular business hours at both our Fort Thomas and Independence locations. If your pet is experiencing a serious emergency, we will assess the situation, provide guidance, and direct you to an appropriate 24-hour emergency facility in the Greater Cincinnati area if needed. Always call us first so we can prepare for your arrival.', 'vmc'),
    ],
    [
        __('How often do pets need vaccines?', 'vmc'),
        __('Vaccination schedules depend on species, age, lifestyle, and individual risk factors. Most dogs need core vaccines like rabies and DHPP starting as puppies, with boosters every 1–3 years depending on the vaccine. Cats need core vaccines including rabies and FVRCP. Our veterinarians create a personalized vaccination plan for your pet based on their specific needs at each wellness visit.', 'vmc'),
    ],
    [
        __('Are you accepting new patients in Fort Thomas and Independence?', 'vmc'),
        __('Yes, Veterinary Medical Center is currently welcoming new patients at both our Fort Thomas and Independence locations. Same-week appointments are often available for both wellness visits and urgent concerns. Visit our New Patients page for information on what to bring, what to expect, and how to get started.', 'vmc'),
    ],
    [
        __('What does Fear-Free Certified mean?', 'vmc'),
        __('Fear-Free is a certified training and clinical approach designed to reduce stress and anxiety during veterinary visits. Our team uses specific handling techniques, calming tools, and a carefully designed environment to help your pet feel safer from the moment they arrive. The result is a calmer, more positive visit for both pets and the people who love them.', 'vmc'),
    ],
    [
        __('Do you see both dogs and cats?', 'vmc'),
        __('Yes, we provide comprehensive veterinary care for both dogs and cats at our Fort Thomas and Independence locations. We also offer cat-friendly appointment windows that allow feline patients to experience a quieter, lower-stress visit separate from dogs in the waiting area.', 'vmc'),
    ],
    [
        __('How do I transfer records from my previous vet?', 'vmc'),
        __('Transferring to Veterinary Medical Center is straightforward. You can ask your previous clinic to send records directly to us, or bring any paperwork with you to your first appointment. Our front desk team is happy to help coordinate the transfer so your pet\'s full history is available from day one.', 'vmc'),
    ],
    [
        __('Do you offer wellness or preventive care plans?', 'vmc'),
        __('Yes. We offer wellness care options designed to make regular preventive care more manageable throughout the year. Ask our team at your next visit about what is included and how a wellness plan can help you stay on top of your pet\'s routine care needs.', 'vmc'),
    ],
    [
        __('Do you accept walk-ins?', 'vmc'),
        __('We welcome walk-ins at both locations based on same-day availability. Calling ahead is the best way to guarantee your spot and minimize wait time, especially for urgent care visits. We recommend scheduling wellness exams in advance so we have adequate time set aside for your pet.', 'vmc'),
    ],
];
?>
<section class="faq-sec rv" id="faq">
  <div class="sec-eye">
    <span class="sec-lbl"><?php esc_html_e('Frequently Asked Questions', 'vmc'); ?></span>
    <span class="sec-rule"></span>
  </div>
  <h2 class="sec-h2"><?php echo esc_html($heading); ?></h2>
  <p style="max-width:760px;margin-bottom:32px;font-size:15px;line-height:1.8;color:var(--mid);"><?php echo esc_html($intro); ?></p>
  <div class="faq-grid">
    <?php
    $source = ! empty($faqs) ? $faqs : null;
    if ( $source ) :
        foreach ( $source as $faq ) :
    ?>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)"><?php echo esc_html($faq->post_title); ?><span class="faq-arrow">▾</span></button>
      <div class="faq-a"><?php echo wp_kses_post($faq->post_content); ?></div>
    </div>
    <?php endforeach; wp_reset_postdata();
    else :
        foreach ( $fallback_faqs as [ $q, $a ] ) :
    ?>
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)"><?php echo esc_html($q); ?><span class="faq-arrow">▾</span></button>
      <div class="faq-a"><?php echo esc_html($a); ?></div>
    </div>
    <?php endforeach; endif; ?>
  </div>
</section>
