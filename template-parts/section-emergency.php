<?php
/**
 * Section: Emergency / Urgent Care
 * Prominent, keyword-rich section targeting "emergency vet near me", "urgent vet NKY".
 */

$heading        = get_field('emerg_heading')       ?: 'Urgent Veterinary Care in Northern Kentucky';
$intro          = get_field('emerg_intro')         ?: 'When your pet needs prompt veterinary attention, Veterinary Medical Center provides urgent same-day care during business hours at both our Fort Thomas and Independence locations. Our experienced veterinarians are equipped to evaluate and treat many urgent conditions quickly so your pet gets the help they need without the long emergency room wait.';
$hours_note     = get_field('emerg_hours_note')    ?: 'Urgent care available Monday–Friday during regular clinic hours. Call ahead for fastest service.';
$signs_heading  = get_field('emerg_signs_heading') ?: 'Signs Your Pet Needs Urgent Care';
$signs_raw      = get_field('emerg_signs')         ?: "Difficulty breathing or labored breathing\nSudden collapse or extreme weakness\nSeizures or uncontrolled trembling\nSevere vomiting or diarrhea (more than twice)\nUncontrolled bleeding or deep wounds\nSuspected poisoning or toxin ingestion\nInability to urinate, especially in cats\nEye injuries or sudden vision changes\nSevere limping or sudden inability to walk\nExtreme pain, crying out, or abnormal behavior";

$ft_phone  = vmc_get('vmc_ft_phone',  '(859) 442-4420');
$ind_phone = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_href   = 'tel:' . preg_replace('/[^0-9+]/', '', $ft_phone);
$ind_href  = 'tel:' . preg_replace('/[^0-9+]/', '', $ind_phone);

$signs = array_filter(array_map('trim', explode("\n", $signs_raw)));
?>
<section class="emerg-outer" id="urgent-care">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl">Emergency &amp; Urgent Care</span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php echo esc_html($heading); ?></h2>
    <p class="emerg-intro"><?php echo esc_html($intro); ?></p>
  </div>

  <div class="emerg-grid rv">

    <div class="emerg-signs">
      <h3><?php echo esc_html($signs_heading); ?></h3>
      <?php if ( ! empty($signs) ) : ?>
      <ul class="emerg-signs-list">
        <?php foreach ( $signs as $sign ) : ?>
        <li>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A91B1B" stroke-width="2.5" aria-hidden="true"><path d="M12 3L22 21H2Z"/><line x1="12" y1="10" x2="12" y2="15.5"/><circle cx="12" cy="18.5" r="0.8" fill="#A91B1B"/></svg>
          <?php echo esc_html($sign); ?>
        </li>
        <?php endforeach; ?>
      </ul>
      <?php endif; ?>
    </div>

    <div class="emerg-action">
      <div class="emerg-action-head">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
        Call a location
      </div>

      <div class="emerg-locs">
        <div class="emerg-loc">
          <strong>Fort Thomas</strong>
          <span class="emerg-loc-num"><?php echo esc_html($ft_phone); ?></span>
          <a href="<?php echo esc_url($ft_href); ?>" class="btn-red emerg-call-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Fort Thomas
          </a>
        </div>
        <div class="emerg-loc">
          <strong>Independence</strong>
          <span class="emerg-loc-num"><?php echo esc_html($ind_phone); ?></span>
          <a href="<?php echo esc_url($ind_href); ?>" class="btn-ghost emerg-call-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Independence
          </a>
        </div>
      </div>

      <div class="emerg-hours-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A91B1B" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <?php echo esc_html($hours_note); ?>
      </div>
    </div>

  </div>
</section>
