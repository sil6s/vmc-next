<?php
/**
 * Section: Service-Specific SEO Blocks
 * Expandable blocks for each high-value service keyword.
 * Targets: "dog dental cleaning near me", "cat vaccinations Cincinnati", etc.
 */

$section_heading = get_field('service_seo_heading') ?: 'Veterinary Services for Dogs & Cats in Northern Kentucky';
$section_intro   = get_field('service_seo_intro')   ?: 'At Veterinary Medical Center, we offer a full range of veterinary services for dogs and cats at both our Fort Thomas and Independence locations. From routine wellness exams to specialized dental care and surgery, our experienced team is equipped to support your pet\'s health at every stage of life.';

$acf_items = get_field('service_seo_items');

$fallback_items = [
    [
        'ssi_title' => 'Dog & Cat Wellness Exams',
        'ssi_slug'  => 'wellness',
        'ssi_what'  => 'Annual wellness exams are the cornerstone of preventive veterinary care. During a wellness visit, our veterinarians perform a comprehensive physical examination, review vaccination status, discuss nutrition and parasite prevention, and check for early signs of disease. Routine care helps pets live longer, healthier lives.',
        'ssi_when'  => 'Pets should have wellness exams at least once a year. Senior pets — typically over 7 years for most dogs and cats — benefit from bi-annual visits, as health changes can occur more rapidly with age. Puppies and kittens need more frequent visits in their first year.',
        'ssi_why'   => 'Our Fear-Free Certified approach means your pet experiences exams in a calmer, lower-stress environment. We take time to answer your questions and provide individualized recommendations — not a rushed checklist. Same-week appointments are often available.',
        'ssi_url'   => '/service-item/pet-wellness-exams-northern-kentucky/',
    ],
    [
        'ssi_title' => 'Pet Dental Care & Dog Dental Cleaning',
        'ssi_slug'  => 'dental',
        'ssi_what'  => 'Dental disease is one of the most common health issues in dogs and cats. Our dental services include comprehensive oral health assessments and treatments (COHAT), professional dental cleanings under anesthesia, tooth extractions when needed, and ongoing oral health guidance for pet owners.',
        'ssi_when'  => 'Most dogs and cats develop significant dental disease by age 3 without regular professional care. Signs your pet needs a dental exam include bad breath, difficulty eating, drooling, pawing at the mouth, or visible tartar and redness along the gumline.',
        'ssi_why'   => 'We perform thorough pre-anesthetic assessments and use full anesthesia monitoring throughout every cleaning. You receive a detailed report of findings afterward. Early dental treatment protects your pet\'s comfort, appetite, and long-term organ health.',
        'ssi_url'   => '/service-item/pet-dental-care-northern-kentucky/',
    ],
    [
        'ssi_title' => 'Emergency & Urgent Veterinary Care',
        'ssi_slug'  => 'urgent',
        'ssi_what'  => 'When your pet has an urgent health concern that cannot wait for a routine appointment, our team provides same-day urgent care during clinic hours. We evaluate and treat many non-life-threatening urgent conditions at both our Fort Thomas and Independence locations, with no long emergency room wait.',
        'ssi_when'  => 'Call us for urgent care if your pet is vomiting repeatedly, has a wound or laceration, is limping severely, has eye swelling or discharge, is straining to urinate, or is acting unusually lethargic or distressed. Always call first so we can prepare and advise.',
        'ssi_why'   => 'Our team provides calm, efficient urgent care in a familiar environment. We know your pet by name and can access their health history immediately to guide treatment decisions. We also help direct to 24-hour emergency facilities when after-hours or specialist care is needed.',
        'ssi_url'   => '/service-item/northern-kentucky-urgent-care-vet/',
    ],
    [
        'ssi_title' => 'Pet Surgery in Northern Kentucky',
        'ssi_slug'  => 'surgery',
        'ssi_what'  => 'Veterinary Medical Center offers soft tissue surgery for dogs and cats, including spays, neuters, mass removals, wound repairs, and other common procedures. We prioritize patient safety with thorough pre-surgical assessments, careful anesthesia monitoring, and attentive post-operative support.',
        'ssi_when'  => 'Surgery may be recommended for spay or neuter procedures, tumor or mass removal, wound repair, gastrointestinal issues, or other conditions identified during examination or diagnostics. Your veterinarian will walk you through all options and answer every question before any procedure.',
        'ssi_why'   => 'We use current anesthesia and monitoring protocols, provide transparent surgical estimates before scheduling, and follow up after procedures to ensure your pet is recovering well. Our surgical team brings the same care and communication to the OR that we bring to every exam room.',
        'ssi_url'   => '/service-item/pet-soft-tissue-surgery-northern-kentucky/',
    ],
    [
        'ssi_title' => 'Cat & Dog Vaccinations',
        'ssi_slug'  => 'wellness',
        'ssi_what'  => 'Vaccinations protect pets from serious and potentially life-threatening diseases. We offer core and non-core vaccines for dogs and cats based on age, lifestyle, and individual risk factors. Our veterinarians discuss every recommendation so you understand what each vaccine prevents and why it matters for your specific pet.',
        'ssi_when'  => 'Puppies and kittens need a series of vaccines starting at 6–8 weeks of age. Adult pets require boosters on a schedule tailored to their individual needs and the vaccines used. We will help you stay on track with a personalized vaccination plan updated at each wellness visit.',
        'ssi_why'   => 'We avoid a one-size-fits-all approach to vaccination. Our team evaluates your pet\'s lifestyle, health history, and individual risk factors to recommend only what is appropriate — communicated clearly, honestly, and without unnecessary pressure.',
        'ssi_url'   => '/service-item/pet-wellness-exams-northern-kentucky/',
    ],
    [
        'ssi_title' => 'Spay & Neuter Services',
        'ssi_slug'  => 'surgery',
        'ssi_what'  => 'Spay and neuter procedures offer important health and behavioral benefits for dogs and cats. Our surgical team performs these procedures with full anesthesia monitoring, appropriate pain management, and clear pre- and post-operative instructions so you know exactly what to expect before and after surgery day.',
        'ssi_when'  => 'Most dogs and cats are spayed or neutered between 4–6 months, though timing varies by breed, size, and individual health status. Your veterinarian will recommend the right timing for your pet at a wellness visit and answer any questions you have about the procedure.',
        'ssi_why'   => 'Every surgical patient at VMC receives the same careful attention as any other medical case. You receive a written cost estimate before scheduling, clear same-day instructions, and a follow-up to ensure recovery is going smoothly.',
        'ssi_url'   => '/service-item/pet-soft-tissue-surgery-northern-kentucky/',
    ],
];

$source = ( ! empty($acf_items) && is_array($acf_items) ) ? $acf_items : $fallback_items;

$icons = [
    'wellness'   => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4C6 4 4.5 4 4.5 6.5L4.5 12C4.5 15.6 7.5 18 11 18"/><path d="M10.5 4C10.5 4 12 4 12 6.5L12 12C12 15.6 9 18 11 18"/><circle cx="17" cy="19.5" r="3.5"/><circle cx="6" cy="3.5" r="1" fill="#A91B1B"/><circle cx="10.5" cy="3.5" r="1" fill="#A91B1B"/></svg>',
    'dental'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 7.5C5.8 7.5 4.5 9 4.5 11.5C4.5 15 6.2 19 7 22C7.4 23.4 8.2 24 8.8 22C9.2 20.4 9.5 18.5 12 18.5C14.5 18.5 14.8 20.4 15.2 22C15.8 24 16.6 23.4 17 22C17.8 19 19.5 15 19.5 11.5C19.5 9 18.2 7.5 16.5 7.5C15 7.5 14 8.3 12 8.3C10 8.3 9 7.5 7.5 7.5Z"/></svg>',
    'surgery'    => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21L17.5 8.5"/><path d="M17.5 8.5L20.5 5.5L22.5 7.5L19.5 10.5Z" fill="#A91B1B" stroke="none"/><line x1="6" y1="5" x2="6" y2="10"/><line x1="3.5" y1="7.5" x2="8.5" y2="7.5"/></svg>',
    'urgent'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L22 21H2Z"/><line x1="12" y1="10" x2="12" y2="15.5"/><circle cx="12" cy="18.5" r="0.9" fill="#A91B1B"/></svg>',
    'behavioral' => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C9.5 3 7.5 5 7.5 7C5.8 7 4 8.8 4 11C4 13.2 5.5 14.8 7.5 15C7.5 17 9 19 11 19L11 21"/><path d="M12 3C14.5 3 16.5 5 16.5 7C18.2 7 20 8.8 20 11C20 13.2 18.5 14.8 16.5 15C16.5 17 15 19 13 19L13 21"/><line x1="11" y1="21" x2="13" y2="21"/></svg>',
    'feline'     => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14.5" r="7.5"/><polygon points="7,9 5.2,3 10,8.5" stroke-linejoin="round"/><polygon points="17,9 18.8,3 14,8.5" stroke-linejoin="round"/></svg>',
    'default'    => '<svg viewBox="0 0 25 25" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
];
?>
<section class="sseo-outer" id="services-detail">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Our Services</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php echo esc_html($section_heading); ?></h2>
    <p><?php echo esc_html($section_intro); ?></p>
  </div>

  <div class="sseo-list rv">
    <?php foreach ( $source as $item ) :
      $title = $item['ssi_title'] ?? '';
      $slug  = $item['ssi_slug']  ?? 'default';
      $what  = $item['ssi_what']  ?? '';
      $when  = $item['ssi_when']  ?? '';
      $why   = $item['ssi_why']   ?? '';
      $url   = $item['ssi_url']   ?? '';
      $icon  = $icons[ $slug ] ?? $icons['default'];
      if ( ! $title ) continue;
    ?>
    <div class="sseo-block">
      <div class="sseo-block-icon" aria-hidden="true"><?php echo $icon; ?></div>
      <div class="sseo-block-content">
        <h3><?php echo esc_html($title); ?></h3>
        <div class="sseo-block-cols">
          <?php if ( $what ) : ?>
          <div class="sseo-col">
            <strong>What it is</strong>
            <p><?php echo esc_html($what); ?></p>
          </div>
          <?php endif; ?>
          <?php if ( $when ) : ?>
          <div class="sseo-col">
            <strong>When it&rsquo;s needed</strong>
            <p><?php echo esc_html($when); ?></p>
          </div>
          <?php endif; ?>
          <?php if ( $why ) : ?>
          <div class="sseo-col">
            <strong>Why choose VMC</strong>
            <p><?php echo esc_html($why); ?></p>
          </div>
          <?php endif; ?>
        </div>
        <?php if ( $url ) : ?>
        <a href="<?php echo esc_url( home_url($url) ); ?>" class="sseo-link">
          Learn more about <?php echo esc_html($title); ?>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <?php endif; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>
