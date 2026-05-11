<?php // section-new-patients.php ?>
<section class="np-sec" id="new-patients">
  <div class="np-inner">
    <div class="rv">
      <div class="sec-eye"><span class="sec-lbl"><?php esc_html_e('New Patients','vmc'); ?></span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php esc_html_e('Your first visit, made easy.','vmc'); ?></h2>
      <p style="font-size:15px;line-height:1.8;color:var(--mid);margin-top:12px;margin-bottom:32px"><?php esc_html_e("We know the first vet visit can feel like a lot. Here is exactly what to expect when you come in for the first time, and what to bring along.",'vmc'); ?></p>
      <a href="<?php echo esc_url(vmc_phone_link('ft')); ?>" class="btn-red" style="width:fit-content">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.6 7.81 19.8 19.8 0 01.53 3.14 2 2 0 012.5 1h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 8.76a16 16 0 006.32 6.32l1.13-1.13a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
        <?php esc_html_e('Schedule Your First Visit','vmc'); ?>
      </a>
      <div class="np-info-box" style="margin-top:32px">
        <h4><?php esc_html_e('What to Bring','vmc'); ?></h4>
        <div class="np-checklist">
          <?php
          $checklist = [
            __('Prior vaccination records (if you have them)','vmc'),
            __('List of current medications & dosages','vmc'),
            __('Any concerns or questions written down','vmc'),
            __('A favorite treat (helps with fear-free visits!)','vmc'),
          ];
          $check_svg = '<svg viewBox="0 0 10 10" fill="none" stroke="white" stroke-width="1.8"><polyline points="2,5.5 4.2,7.5 8,3"/></svg>';
          foreach ($checklist as $item) :
          ?>
          <div class="np-check">
            <div class="np-check-dot"><?php echo $check_svg; ?></div>
            <?php echo esc_html($item); ?>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
    <div class="rv">
      <div class="np-steps">
        <?php
        $steps = [
          [__('Give us a call','vmc'),        __('Call either location directly. We will find you a same-week or next-available time that works. No online-only booking maze.','vmc')],
          [__('Bring your records','vmc'),     __('Prior vaccination history, any medications, and a list of concerns. No records? That is okay too — we will work from what you know.','vmc')],
          [__('Meet the team','vmc'),          __('You will meet Dr. Baker or one of our staff before the exam begins. We take time to get to know your pet before we start anything.','vmc')],
          [__('Leave with a real plan','vmc'), __('Every visit ends with a clear summary of findings, your options, and next steps. No vague instructions, no surprise charges added after.','vmc')],
        ];
        foreach ($steps as $n => [$title,$desc]) :
        ?>
        <div class="np-step">
          <div class="np-step-num"><?php echo $n+1; ?></div>
          <div class="np-step-body">
            <h4 class="np-step-h"><?php echo esc_html($title); ?></h4>
            <p class="np-step-p"><?php echo esc_html($desc); ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
