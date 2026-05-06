<?php
$label    = 'Why Families Trust Us';
$headline = 'A locally owned veterinary medical center that treats you like neighbors.';
$intro    = 'At Veterinary Medical Center, we are proud to be independently owned and rooted right here in Northern Kentucky, with locations in Fort Thomas and Independence. We are not part of a corporate chain, which means your pet receives consistent, personalized care from the same trusted veterinarians every visit. Our focus is simple: honest conversations, low-stress experiences, and lasting relationships with the families and pets we care for across NKY and the Greater Cincinnati area.';

$icons = [
  1 => '<svg viewBox="0 0 20 20" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 1.5L3.5 5v6c0 4 3 7.5 6.5 8.5C13.5 18.5 16.5 15 16.5 11V5L10 1.5z"/><polyline points="7,10 9.5,12.5 14,8"/></svg>',
  2 => '<svg viewBox="0 0 20 20" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3.5"/><path d="M3 19c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>',
  3 => '<svg viewBox="0 0 20 20" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="14" rx="1.5"/><path d="M6 8h8M6 11.5h5"/></svg>',
  4 => '<svg viewBox="0 0 20 20" fill="none" stroke="#A91B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l7-6 7 6v9a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 18V9z"/><polyline points="8,20.5 8,11 12,11 12,20.5"/></svg>',
];

$titles = [
  1 => 'Fear-Free visits, every time',
  2 => 'Care from familiar faces',
  3 => 'Clear answers and honest pricing',
  4 => 'Proudly local, deeply rooted',
];

$descs = [
  1 => 'We use gentle, fear-free techniques, longer appointments, and a calm environment to help pets feel safe and comfortable from the moment they arrive.',
  2 => 'As a locally owned veterinary medical center, you will see the same veterinarians and team members who truly know your pet and their history.',
  3 => 'We take time to walk through every option and provide transparent pricing upfront so you can make the best decision without pressure.',
  4 => 'With two locations in Fort Thomas and Independence, we are proud to serve Northern Kentucky and the Greater Cincinnati community we call home.',
];
?>

<section class="why-outer" id="why">
  <div class="why-intro rv">
    <div class="sec-eye">
      <span class="sec-lbl"><?php echo esc_html($label); ?></span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php echo esc_html($headline); ?></h2>
    <p><?php echo esc_html($intro); ?></p>
  </div>

  <div class="why-grid rv">
    <?php for ( $i = 1; $i <= 4; $i++ ) : ?>
      <div class="why-card">
        <div class="why-num">0<?php echo $i; ?></div>
        <div class="why-icon"><?php echo $icons[$i]; ?></div>
        <h3 class="why-h"><?php echo esc_html($titles[$i]); ?></h3>
        <p class="why-p"><?php echo esc_html($descs[$i]); ?></p>
      </div>
    <?php endfor; ?>
  </div>
</section>