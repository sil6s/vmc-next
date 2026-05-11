<?php // section-pets.php
$pets = [
  ['Dogs',              '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="11" r="6.5"/><ellipse cx="4.5" cy="9.5" rx="1.8" ry="2.8" transform="rotate(-10 4.5 9.5)" fill="currentColor" opacity="0.2" stroke="currentColor"/><ellipse cx="15.5" cy="9.5" rx="1.8" ry="2.8" transform="rotate(10 15.5 9.5)" fill="currentColor" opacity="0.2" stroke="currentColor"/><ellipse cx="10" cy="13.5" rx="3" ry="1.8"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/></svg>'],
  ['Cats',              '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="12" r="6"/><polygon points="6.5,7.5 5,2.5 9.5,7" stroke-linejoin="round"/><polygon points="13.5,7.5 15,2.5 10.5,7" stroke-linejoin="round"/><circle cx="8" cy="11.5" r="1" fill="currentColor"/><circle cx="12" cy="11.5" r="1" fill="currentColor"/></svg>'],
  ['Rabbits',           '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="10" cy="14" rx="5" ry="4.5"/><ellipse cx="7.5" cy="6.5" rx="2" ry="4.5"/><ellipse cx="12.5" cy="6.5" rx="2" ry="4.5"/><circle cx="8.5" cy="13.5" r=".8" fill="currentColor"/><circle cx="11.5" cy="13.5" r=".8" fill="currentColor"/></svg>'],
  ['Pocket Pets',       '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="11" r="6.5"/><ellipse cx="4" cy="10" rx="1.8" ry="1.2"/><ellipse cx="16" cy="10" rx="1.8" ry="1.2"/><circle cx="8" cy="10.5" r=".9" fill="currentColor"/><circle cx="12" cy="10.5" r=".9" fill="currentColor"/></svg>'],
  ['Small Farm Animals*','<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="10" cy="12" rx="5.5" ry="5"/><path d="M7 8 Q6 4.5 4.5 3.5"/><path d="M13 8 Q14 4.5 15.5 3.5"/></svg>'],
  ['Guinea Pigs',       '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="5.5"/><path d="M6 14.5 Q10 18 14 14.5"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="12" cy="9" r="1" fill="currentColor"/></svg>'],
  ['Ferrets',           '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="10" cy="12" rx="5" ry="4"/><path d="M5 12 Q3 9 4 6"/><path d="M15 12 Q17 9 16 6"/><circle cx="8.5" cy="11" r=".8" fill="currentColor"/><circle cx="11.5" cy="11" r=".8" fill="currentColor"/></svg>'],
];
?>
<section class="pets-sec rv" id="patients" style="background:var(--cream)">
  <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('Patients We Treat','vmc'); ?></span><span class="sec-rule"></span></div>
  <h2 class="sec-h2"><?php esc_html_e('All kinds of animals. Same standard of care.','vmc'); ?></h2>
  <div class="pets-flex rv2">
    <?php foreach ($pets as [$name,$icon]) : ?>
    <div class="pet-chip"><?php echo $icon; ?><?php echo esc_html($name); ?></div>
    <?php endforeach; ?>
  </div>
  <p style="font-size:12.5px;color:var(--mid);margin-top:18px;font-style:italic"><?php esc_html_e('* Farm animals at select locations only. Call for availability.','vmc'); ?></p>
</section>
