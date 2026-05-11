<?php
/**
 * Team Section — VMC
 * Doctors displayed side-by-side; first row of staff visible,
 * remaining staff revealed via "Meet the Full Team" toggle.
 */

// ── Fetch primary (featured) doctor ──────────────────────────────────────────
$primary_doctors = get_posts([
  'post_type'      => 'vmc_team',
  'meta_query'     => [['key' => '_vmc_team_primary', 'value' => '1']],
  'posts_per_page' => 1,
]);
$primary_doctor = $primary_doctors[0] ?? null;

// ── Fetch associate doctors (secondary, e.g. Becky) ──────────────────────────
$assoc_doctors = get_posts([
  'post_type'      => 'vmc_team',
  'meta_query'     => [['key' => '_vmc_team_associate', 'value' => '1']],
  'posts_per_page' => 5,
  'order'          => 'ASC',
  'orderby'        => 'menu_order',
  'post__not_in'   => $primary_doctor ? [$primary_doctor->ID] : [],
]);

// ── Fetch all staff (non-doctor) ──────────────────────────────────────────────
$exclude_ids = $primary_doctor ? [$primary_doctor->ID] : [];
foreach ( $assoc_doctors as $ad ) { $exclude_ids[] = $ad->ID; }

$staff_members = get_posts([
  'post_type'      => 'vmc_team',
  'posts_per_page' => -1,
  'post__not_in'   => $exclude_ids,
  'order'          => 'ASC',
  'orderby'        => 'menu_order',
  'meta_query'     => [
    'relation' => 'OR',
    ['key' => '_vmc_team_primary',   'compare' => 'NOT EXISTS'],
    ['key' => '_vmc_team_associate', 'compare' => 'NOT EXISTS'],
  ],
]);

// ── Helper: render a single vet card ─────────────────────────────────────────
function vmc_render_vet_card( $post, $fallback_role = 'Veterinarian' ) {
  if ( ! $post ) return;
  $role      = get_post_meta($post->ID, '_vmc_team_role', true) ?: $fallback_role;
  $creds_raw = get_post_meta($post->ID, '_vmc_team_credentials', true);
  $creds     = $creds_raw ? array_filter(array_map('trim', explode("\n", $creds_raw))) : [];
  $quote     = get_post_meta($post->ID, '_vmc_team_quote', true);
  $thumb_id  = get_post_thumbnail_id($post->ID);
  $thumb_src = $thumb_id ? wp_get_attachment_image_src($thumb_id, 'vmc-team') : null;
  ?>
  <div class="vet-card">
    <div class="vet-photo">
      <?php if ( $thumb_src ) : ?>
        <img src="<?php echo esc_url($thumb_src[0]); ?>" alt="<?php echo esc_attr($post->post_title); ?>">
      <?php else : ?>
        <div class="vet-photo-placeholder">🐾</div>
      <?php endif; ?>
      <div class="vet-badge">
        <?php echo esc_html($post->post_title); ?>
        <span><?php echo esc_html($role); ?></span>
      </div>
    </div>
    <div class="vet-body">
      <?php if ( $post->post_content ) : ?>
        <div class="vet-bio"><?php echo apply_filters('the_content', $post->post_content); ?></div>
      <?php endif; ?>
      <?php if ( $quote ) : ?>
        <blockquote class="vet-quote"><?php echo esc_html($quote); ?></blockquote>
      <?php endif; ?>
      <?php if ( $creds ) : ?>
        <div class="team-credentials">
          <?php foreach ( $creds as $cred ) : ?>
            <div class="team-cred"><span class="team-cred-dot"></span><?php echo esc_html($cred); ?></div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
  <?php
}
?>


<!-- ══════════════════════════════════════════════════════════════
     DOCTORS SECTION
═══════════════════════════════════════════════════════════════ -->
<section class="doctors-sec" id="team">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl"><?php esc_html_e('Meet Your Doctors', 'vmc'); ?></span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php esc_html_e('Veterinarians who actually stay.', 'vmc'); ?></h2>
    <p class="doctors-intro"><?php esc_html_e('When you come to VMC, you get continuity — with someone who remembers your pet, your history, and what actually matters to your family.', 'vmc'); ?></p>
  </div>

  <div class="doctors-grid rv">

    <?php if ( $primary_doctor ) :
      vmc_render_vet_card($primary_doctor, 'Owner & DVM');
    else : ?>
      <!-- Fallback: Dr. Kristi Baker -->
      <div class="vet-card">
        <div class="vet-photo">
          <div class="vet-photo-placeholder">🐾</div>
          <div class="vet-badge">Dr. Kristi Baker<span>Owner &amp; DVM</span></div>
        </div>
        <div class="vet-body">
          <div class="vet-bio">
            <p><?php esc_html_e('Dr. Baker is a licensed veterinarian in both Kentucky and Ohio. She built VMC because she wanted to practice medicine the right way: unhurried, thorough, and rooted in a community she genuinely cares about.', 'vmc'); ?></p>
          </div>
          <blockquote class="vet-quote"><?php esc_html_e('I have always loved animals and pets so working with them all day and learning how their bodies work fascinates me. Everyday, I feel like I am making a difference in the lives of not only my pet patients, but also their human families as well.', 'vmc'); ?></blockquote>
          <div class="team-credentials">
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('Licensed in Kentucky and Ohio', 'vmc'); ?></div>
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('Fear-Free Certified practice', 'vmc'); ?></div>
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('Soft tissue surgery and oral health expertise', 'vmc'); ?></div>
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('End-of-life care, in-clinic and at home', 'vmc'); ?></div>
          </div>
        </div>
      </div>
    <?php endif; ?>

    <?php if ( ! empty($assoc_doctors) ) :
      foreach ( $assoc_doctors as $ad ) vmc_render_vet_card($ad, 'Associate Veterinarian');
    else : ?>
      <!-- Fallback: Dr. Becky Golatzki -->
      <div class="vet-card">
        <div class="vet-photo">
          <div class="vet-photo-placeholder">🐾</div>
          <div class="vet-badge">Dr. Becky Golatzki<span>Associate Veterinarian</span></div>
        </div>
        <div class="vet-body">
          <div class="vet-bio">
            <p><?php esc_html_e('Dr. Golatzki brings warmth and expertise to every appointment, partnering with Dr. Baker to provide the same consistent, relationship-focused care VMC is known for.', 'vmc'); ?></p>
          </div>
          <blockquote class="vet-quote"><?php esc_html_e('I love being part of a practice where we truly know our patients. Building those long-term relationships — with the pets and their families — is what makes this work so rewarding.', 'vmc'); ?></blockquote>
          <div class="team-credentials">
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('Doctor of Veterinary Medicine', 'vmc'); ?></div>
            <div class="team-cred"><span class="team-cred-dot"></span><?php esc_html_e('Compassionate, relationship-focused care', 'vmc'); ?></div>
          </div>
        </div>
      </div>
    <?php endif; ?>

  </div><!-- .doctors-grid -->
</section>


<!-- ══════════════════════════════════════════════════════════════
     STAFF SECTION
═══════════════════════════════════════════════════════════════ -->
<section class="staff-sec" id="staff">
  <div class="rv">
    <div class="sec-eye">
      <span class="sec-lbl"><?php esc_html_e('The Whole Team', 'vmc'); ?></span>
      <span class="sec-rule"></span>
    </div>
    <h2 class="sec-h2"><?php esc_html_e('People who love what they do.', 'vmc'); ?></h2>
    <p class="staff-intro"><?php esc_html_e('From the front desk to the treatment room, every person on the VMC team is here because they genuinely care about animals.', 'vmc'); ?></p>
  </div>

  <?php

  // ── Build fallback staff list ─────────────────────────────────────────────
  $fallback_staff = [
    [
      'name'  => 'Cara',
      'role'  => 'Office Manager',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'April',
      'role'  => 'RVT',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'Jess',
      'role'  => 'RVT',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'Taiyler',
      'role'  => 'RVT',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'April',
      'role'  => 'Veterinary Technician',
      'bio'   => "April graduated from Morehead State with her associate's in veterinary technology in 2002. She has been in the industry since 1999 and licensed for over 20 years. She loves helping animals live their best lives and dreams of opening a rescue one day. In her spare time, she enjoys traveling with her family. She has two dogs (Echo and Griffin) and three cats: Cleocatra, Spitfire, and Cuddles.",
      'quote' => "I work here because in all the places I've worked, I like the medicine and care the best here. Dr. Baker's knowledge is top notch!",
      'emoji' => '🐶',
    ],
    [
      'name'  => 'Emerald',
      'role'  => 'Veterinary Assistant',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'Jamie',
      'role'  => 'Client Service Representative / Veterinary Assistant',
      'bio'   => "Jamie is currently attending Penn Foster online to get her degree in veterinary technology. She likes working here with team members who share her same goal of doing what is best for animals. She has two dogs (Sammy and Ranger) and two cats (Serenity and Ezra).",
      'quote' => "I have been working with animals since I was young. It all started when my grandpa was an animal control officer. He taught me the importance of loving and helping animals.",
      'emoji' => '🐾',
    ],
    [
      'name'  => 'Missy',
      'role'  => 'Veterinary Assistant',
      'bio'   => "Missy has been in the veterinary field for 12 years. She enjoys working with and getting to know the clients and their pets and loves developing relationships with them. In her free time, she takes care of her 50 chickens, 16 cats, and three dogs on her farm, and enjoys time with her three adult children.",
      'emoji' => '🐔',
    ],
    [
      'name'  => 'Natalie',
      'role'  => 'Veterinary Assistant',
      'bio'   => '',
      'emoji' => '🐾',
    ],
    [
      'name'  => 'Scotty',
      'role'  => 'Service Dog',
      'bio'   => '',
      'emoji' => '🐕',
    ],
    [
      'name'  => 'Terri',
      'role'  => 'Client Service Representative',
      'bio'   => "Terri has been an integral part of the team for over 15 years. In her free time, she likes to read, work in her garden, and attend concerts. She has a Dachshund mix named Beatrix.",
      'emoji' => '🐶',
    ],
  ];

  // Decide whether to use dynamic posts or fallback
  $use_dynamic = ! empty($staff_members);
  $total_staff = $use_dynamic ? count($staff_members) : count($fallback_staff);
  $first_row   = 3; // cards visible before "show more"
  ?>

  <div class="staff-grid rv" id="staff-grid">

    <?php if ( $use_dynamic ) :
      foreach ( $staff_members as $i => $member ) :
        $role      = get_post_meta($member->ID, '_vmc_team_role', true);
        $quote     = get_post_meta($member->ID, '_vmc_team_quote', true);
        $thumb     = get_post_thumbnail_id($member->ID);
        $img_src   = $thumb ? wp_get_attachment_image_src($thumb, 'vmc-staff') : null;
        $hidden    = $i >= $first_row ? ' staff-card--hidden' : '';
    ?>
      <div class="staff-card<?php echo esc_attr($hidden); ?>">
        <div class="staff-img">
          <?php if ( $img_src ) : ?>
            <img src="<?php echo esc_url($img_src[0]); ?>" alt="<?php echo esc_attr($member->post_title); ?>" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
          <?php else : ?>
            <div class="staff-img-placeholder">🐾</div>
          <?php endif; ?>
        </div>
        <div class="staff-info">
          <div class="staff-name"><?php echo esc_html($member->post_title); ?></div>
          <?php if ( $role ) : ?>
            <div class="staff-role"><?php echo esc_html($role); ?></div>
          <?php endif; ?>
          <?php if ( $member->post_content ) : ?>
            <p class="staff-bio"><?php echo esc_html(wp_trim_words(wp_strip_all_tags($member->post_content), 30, '…')); ?></p>
          <?php endif; ?>
          <?php if ( $quote ) : ?>
            <p class="staff-quote"><?php echo esc_html($quote); ?></p>
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; wp_reset_postdata();

    else :
      foreach ( $fallback_staff as $i => $s ) :
        $hidden = $i >= $first_row ? ' staff-card--hidden' : '';
    ?>
      <div class="staff-card<?php echo esc_attr($hidden); ?>">
        <div class="staff-img">
          <div class="staff-img-placeholder"><?php echo esc_html($s['emoji']); ?></div>
        </div>
        <div class="staff-info">
          <div class="staff-name"><?php echo esc_html($s['name']); ?></div>
          <?php if ( ! empty($s['role']) ) : ?>
            <div class="staff-role"><?php echo esc_html($s['role']); ?></div>
          <?php endif; ?>
          <?php if ( ! empty($s['bio']) ) : ?>
            <p class="staff-bio"><?php echo esc_html($s['bio']); ?></p>
          <?php endif; ?>
          <?php if ( ! empty($s['quote']) ) : ?>
            <p class="staff-quote"><?php echo esc_html($s['quote']); ?></p>
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; endif; ?>

  </div><!-- .staff-grid -->

  <?php if ( $total_staff > $first_row ) : ?>
    <div class="staff-toggle-wrap rv">
      <button class="staff-toggle-btn" id="staff-toggle" aria-expanded="false">
        <span class="staff-toggle-label"><?php esc_html_e('Meet the Full Team', 'vmc'); ?></span>
        <span class="staff-toggle-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    </div>

    <script>
    (function(){
      var btn   = document.getElementById('staff-toggle');
      var grid  = document.getElementById('staff-grid');
      if (!btn || !grid) return;

      btn.addEventListener('click', function(){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var cards    = grid.querySelectorAll('.staff-card--hidden');

        if (!expanded) {
          // Reveal hidden cards
          cards.forEach(function(c){ c.classList.add('staff-card--visible'); });
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.staff-toggle-label').textContent = '<?php echo esc_js(__('Show Less', 'vmc')); ?>';
          btn.querySelector('.staff-toggle-icon').style.transform = 'rotate(180deg)';
        } else {
          // Hide again
          cards.forEach(function(c){ c.classList.remove('staff-card--visible'); });
          btn.setAttribute('aria-expanded', 'false');
          btn.querySelector('.staff-toggle-label').textContent = '<?php echo esc_js(__('Meet the Full Team', 'vmc')); ?>';
          btn.querySelector('.staff-toggle-icon').style.transform = 'rotate(0deg)';
          // Scroll back up to staff section
          document.getElementById('staff').scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    })();
    </script>
  <?php endif; ?>

</section>