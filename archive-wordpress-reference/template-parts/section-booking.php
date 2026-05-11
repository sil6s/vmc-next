<?php // section-booking.php
$ft_addr  = vmc_get('vmc_ft_address','2000 Memorial Pkwy, Fort Thomas, KY 41075');
$ind_addr = vmc_get('vmc_ind_address','4147 Madison Pike, Covington, KY 41017');
$ft_phone = vmc_get('vmc_ft_phone','(859) 442-4420');
$ind_phone= vmc_get('vmc_ind_phone','(859) 356-2242');
$pin_svg  = '<svg viewBox="0 0 22 22" fill="none" stroke="#A91B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-10 13-10 13S1 17 1 10a10 10 0 0120 0z"/><circle cx="11" cy="10" r="3"/></svg>';
$tel_svg  = '<svg viewBox="0 0 22 22" fill="none" stroke="#A91B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>';
?>
<section class="booking-sec rv" id="booking">
  <div class="booking-inner">
    <div class="booking-copy">
      <span class="sec-lbl"><?php esc_html_e('Get in Touch','vmc'); ?></span>
      <h2 class="booking-h2"><?php esc_html_e('Tell us a little about your pet and we will take it from there.','vmc'); ?></h2>
      <p class="booking-p"><?php esc_html_e("Fill out the form and someone from our team will follow up to confirm your appointment. Prefer to call? We pick up.",'vmc'); ?></p>
      <div class="bc-row"><div class="bc-icon"><?php echo $pin_svg; ?></div><div class="bc-text"><?php echo __('Fort Thomas','vmc'); ?> · <?php echo esc_html($ft_addr); ?></div></div>
      <div class="bc-row"><div class="bc-icon"><?php echo $pin_svg; ?></div><div class="bc-text"><?php echo __('Independence','vmc'); ?> · <?php echo esc_html($ind_addr); ?></div></div>
      <div class="bc-row"><div class="bc-icon"><?php echo $tel_svg; ?></div><div class="bc-text"><a href="<?php echo esc_url(vmc_phone_link('ft')); ?>"><?php echo esc_html($ft_phone); ?></a> · <?php esc_html_e('Fort Thomas','vmc'); ?></div></div>
      <div class="bc-row"><div class="bc-icon"><?php echo $tel_svg; ?></div><div class="bc-text"><a href="<?php echo esc_url(vmc_phone_link('ind')); ?>"><?php echo esc_html($ind_phone); ?></a> · <?php esc_html_e('Independence','vmc'); ?></div></div>
    </div>
    <div class="booking-form" id="booking-form-wrap">
      <div class="booking-form-title"><?php esc_html_e('Request an Appointment','vmc'); ?></div>
      <div id="booking-success" style="display:none;padding:24px;text-align:center;color:#2a7a2a;font-weight:600;font-size:15px"><?php esc_html_e('Request sent! We\'ll follow up within one business day.','vmc'); ?></div>
      <div id="booking-form-inner">
      <?php wp_nonce_field('vmc_nonce','vmc_booking_nonce'); ?>
      <div class="bf-grid">
        <div><label class="bf-label"><?php esc_html_e('Your Name *','vmc'); ?></label><input class="bf-input" type="text" id="bf-name" placeholder="<?php esc_attr_e('First and last name','vmc'); ?>"></div>
        <div><label class="bf-label"><?php esc_html_e('Phone Number *','vmc'); ?></label><input class="bf-input" type="tel" id="bf-phone" placeholder="(859) 000-0000"></div>
        <div><label class="bf-label"><?php esc_html_e('Email Address','vmc'); ?></label><input class="bf-input" type="email" id="bf-email" placeholder="you@email.com"></div>
        <div><label class="bf-label"><?php esc_html_e("Pet's Name",'vmc'); ?></label><input class="bf-input" type="text" id="bf-pet" placeholder="<?php esc_attr_e('What do you call them?','vmc'); ?>"></div>
        <div>
          <label class="bf-label"><?php esc_html_e('Type of Pet','vmc'); ?></label>
          <select class="bf-select" id="bf-pet-type">
            <option value=""><?php esc_html_e('Select...','vmc'); ?></option>
            <option><?php esc_html_e('Dog','vmc'); ?></option>
            <option><?php esc_html_e('Cat','vmc'); ?></option>
            <option><?php esc_html_e('Rabbit','vmc'); ?></option>
            <option><?php esc_html_e('Pocket Pet','vmc'); ?></option>
            <option><?php esc_html_e('Small Farm Animal','vmc'); ?></option>
            <option><?php esc_html_e('Other','vmc'); ?></option>
          </select>
        </div>
        <div>
          <label class="bf-label"><?php esc_html_e('Preferred Location','vmc'); ?></label>
          <select class="bf-select" id="bf-location">
            <option value=""><?php esc_html_e('Select...','vmc'); ?></option>
            <option><?php esc_html_e('Fort Thomas','vmc'); ?></option>
            <option><?php esc_html_e('Independence','vmc'); ?></option>
            <option><?php esc_html_e('No preference','vmc'); ?></option>
          </select>
        </div>
        <div>
          <label class="bf-label"><?php esc_html_e('Preferred Day','vmc'); ?></label>
          <select class="bf-select" id="bf-day">
            <option value=""><?php esc_html_e('Any day','vmc'); ?></option>
            <option><?php esc_html_e('Monday','vmc'); ?></option>
            <option><?php esc_html_e('Tuesday','vmc'); ?></option>
            <option><?php esc_html_e('Wednesday','vmc'); ?></option>
            <option><?php esc_html_e('Thursday','vmc'); ?></option>
            <option><?php esc_html_e('Friday','vmc'); ?></option>
          </select>
        </div>
        <div>
          <label class="bf-label"><?php esc_html_e('Preferred Time','vmc'); ?></label>
          <select class="bf-select" id="bf-time">
            <option value=""><?php esc_html_e('Any time','vmc'); ?></option>
            <option><?php esc_html_e('Morning (8 AM – 11 AM)','vmc'); ?></option>
            <option><?php esc_html_e('Midday (11 AM – 2 PM)','vmc'); ?></option>
            <option><?php esc_html_e('Afternoon (2 PM – 6 PM)','vmc'); ?></option>
          </select>
        </div>
        <div class="bf-full">
          <label class="bf-label"><?php esc_html_e('Reason for Visit','vmc'); ?></label>
          <select class="bf-select" id="bf-reason">
            <option value=""><?php esc_html_e('Select a reason...','vmc'); ?></option>
            <option><?php esc_html_e('Wellness / Annual Exam','vmc'); ?></option>
            <option><?php esc_html_e('Sick Visit / Urgent Care','vmc'); ?></option>
            <option><?php esc_html_e('Dental (COHAT)','vmc'); ?></option>
            <option><?php esc_html_e('Surgery Consultation','vmc'); ?></option>
            <option><?php esc_html_e('Behavioral Consultation','vmc'); ?></option>
            <option><?php esc_html_e('New Patient','vmc'); ?></option>
            <option><?php esc_html_e('Other / Not Sure','vmc'); ?></option>
          </select>
        </div>
        <div class="bf-full">
          <label class="bf-label"><?php esc_html_e('Anything else we should know?','vmc'); ?></label>
          <textarea class="bf-textarea" id="bf-notes" placeholder="<?php esc_attr_e('Allergies, anxiety, recent symptoms, medications, prior records to bring...','vmc'); ?>"></textarea>
        </div>
      </div>
      <button class="bf-submit" id="bf-submit"><?php esc_html_e('Send Appointment Request','vmc'); ?></button>
      <p class="bf-note"><?php esc_html_e('We will follow up by phone or email within one business day to confirm.','vmc'); ?></p>
      </div>
    </div>
  </div>
</section>
