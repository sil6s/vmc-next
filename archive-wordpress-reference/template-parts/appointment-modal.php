<?php
$portal_url = vmc_patient_portal_page_url();
$ft_phone   = vmc_get('vmc_ft_phone','(859) 442-4420');
$ind_phone  = vmc_get('vmc_ind_phone','(859) 356-2242');
$ft_link    = vmc_phone_link('ft');
$ind_link   = vmc_phone_link('ind');
?>
<div id="apt-modal" role="dialog" aria-modal="true" aria-labelledby="apt-modal-title" style="display:none">
  <div class="apt-overlay" onclick="closeAptModal()"></div>
  <div class="apt-box">

    <button class="apt-close" onclick="closeAptModal()" aria-label="<?php esc_attr_e('Close','vmc'); ?>">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <!-- Step 1: New or existing -->
    <div id="apt-step-1">
      <div class="sec-eye" style="margin-bottom:10px">
        <span class="sec-lbl"><?php esc_html_e('Request an Appointment','vmc'); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 id="apt-modal-title" class="apt-heading"><?php esc_html_e('Are you a new or existing patient?','vmc'); ?></h2>
      <p class="apt-sub"><?php esc_html_e("We'll point you in the right direction based on where you're starting.",'vmc'); ?></p>

      <div class="apt-choices">
        <button class="apt-choice" onclick="aptNewPatient()">
          <span class="apt-choice-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/><path d="M2 20c0-4 4.5-7 10-7s10 3 10 7"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>
          </span>
          <strong><?php esc_html_e("I'm a new patient",'vmc'); ?></strong>
          <span><?php esc_html_e("First visit to VMC",'vmc'); ?></span>
        </button>

        <button class="apt-choice" onclick="aptExistingPatient()">
          <span class="apt-choice-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </span>
          <strong><?php esc_html_e("I'm an existing patient",'vmc'); ?></strong>
          <span><?php esc_html_e("I've been to VMC before",'vmc'); ?></span>
        </button>
      </div>
    </div>

    <!-- Step 2: Existing patient options -->
    <div id="apt-step-2" style="display:none">
      <button class="apt-back" onclick="aptBack()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        <?php esc_html_e('Back','vmc'); ?>
      </button>

      <div class="sec-eye" style="margin:10px 0">
        <span class="sec-lbl"><?php esc_html_e('Existing Patients','vmc'); ?></span>
        <span class="sec-rule"></span>
      </div>
      <h2 class="apt-heading"><?php esc_html_e('How would you like to book?','vmc'); ?></h2>
      <p class="apt-sub"><?php esc_html_e('Choose whichever is easiest for you.','vmc'); ?></p>

      <div class="apt-options">
        <a href="<?php echo esc_url($portal_url); ?>" target="_blank" rel="noopener" class="apt-option" onclick="aptTrack('online')">
          <span class="apt-option-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </span>
          <div class="apt-option-text">
            <strong><?php esc_html_e('Book Online','vmc'); ?></strong>
            <span><?php esc_html_e('Go to patient portal & online booking page','vmc'); ?></span>
          </div>
          <svg class="apt-option-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>

        <a href="<?php echo esc_url($ft_link); ?>" class="apt-option" onclick="aptTrack('call')">
          <span class="apt-option-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
          </span>
          <div class="apt-option-text">
            <strong><?php esc_html_e('Call Us','vmc'); ?></strong>
            <span><?php echo esc_html($ft_phone); ?> · FT &nbsp;|&nbsp; <?php echo esc_html($ind_phone); ?> · IND</span>
          </div>
          <svg class="apt-option-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>

        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="apt-option" onclick="aptTrack('contact')">
          <span class="apt-option-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </span>
          <div class="apt-option-text">
            <strong><?php esc_html_e('Contact Form','vmc'); ?></strong>
            <span><?php esc_html_e('Send a message · we reply within 1 business day','vmc'); ?></span>
          </div>
          <svg class="apt-option-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>

  </div>
</div>
