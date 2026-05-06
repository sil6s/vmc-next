<?php get_header(); ?>

<main id="primary" class="vmc-404-page" role="main">
  <section class="vmc-404-hero">
    <div class="vmc-404-inner">

      <div class="vmc-404-content">
        <p class="vmc-404-eyebrow"><?php esc_html_e('Sorry about that','vmc'); ?></p>

        <div class="vmc-404-number" aria-hidden="true">404</div>

        <h1><?php esc_html_e('This page is still finding its way home.','vmc'); ?></h1>

        <p class="vmc-404-lede">
          <?php esc_html_e("We’re sorry. This page may have moved while our website is still a work in progress. Veterinary Medical Center is open and ready to help, so let’s get you to the right place.",'vmc'); ?>
        </p>

        <div class="vmc-404-actions" aria-label="<?php esc_attr_e('Helpful actions','vmc'); ?>">
          <button class="btn-red js-apt-modal" onclick="openAptModal('404')" data-apt-label="404">
            <?php esc_html_e('Book Appointment','vmc'); ?>
          </button>

          <a href="<?php echo esc_url(home_url('/veterinary-medical-center-contact/')); ?>" class="btn-ghost">
            <?php esc_html_e('Contact Us','vmc'); ?> →
          </a>
        </div>
      </div>

      <aside class="vmc-404-card" aria-label="<?php esc_attr_e('Popular pages','vmc'); ?>">
        <h2><?php esc_html_e('Quick links to get you there','vmc'); ?></h2>
        <p><?php esc_html_e('Choose one of the most helpful pages below.','vmc'); ?></p>

        <ul class="vmc-404-links">
          <li><a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home','vmc'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/services/')); ?>"><?php esc_html_e('Veterinary Services','vmc'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/first-vet-visit-northern-kentucky/')); ?>"><?php esc_html_e('New Patients','vmc'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/patient-portal-online-booking/')); ?>"><?php esc_html_e('Patient Portal & Online Booking','vmc'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/online-vet-pharmacy-northern-kentucky-cincinnati/')); ?>"><?php esc_html_e('Online Pharmacy','vmc'); ?></a></li>
          <li><a href="<?php echo esc_url(home_url('/blog/')); ?>"><?php esc_html_e('Pet Care Blog','vmc'); ?></a></li>
        </ul>
      </aside>

    </div>
  </section>

  <section class="vmc-404-locations" aria-label="<?php esc_attr_e('Veterinary Medical Center locations','vmc'); ?>">
    <div class="vmc-404-location-card">
      <span><?php esc_html_e('Fort Thomas','vmc'); ?></span>
      <strong><?php echo esc_html(vmc_get('vmc_ft_address','2000 Memorial Parkway, Fort Thomas, KY 41075')); ?></strong>
      <a href="<?php echo esc_url(vmc_phone_link('ft')); ?>">
        <?php echo esc_html(vmc_get('vmc_ft_phone','(859) 442-4420')); ?>
      </a>
    </div>

    <div class="vmc-404-location-card">
      <span><?php esc_html_e('Independence','vmc'); ?></span>
      <strong><?php echo esc_html(vmc_get('vmc_ind_address','4147 Madison Pike, Independence, KY 41051')); ?></strong>
      <a href="<?php echo esc_url(vmc_phone_link('ind')); ?>">
        <?php echo esc_html(vmc_get('vmc_ind_phone','(859) 356-2242')); ?>
      </a>
    </div>
  </section>
</main>

<style>
.vmc-404-page {
  background:
    radial-gradient(circle at 12% 28%, rgba(169, 27, 27, .08), transparent 24%),
    radial-gradient(circle at 85% 18%, rgba(169, 27, 27, .06), transparent 22%),
    var(--cream);
}

.vmc-404-hero {
  padding: 170px var(--pad, 68px) 55px;
  display: flex;
  align-items: center;
}

.vmc-404-inner {
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, .88fr);
  gap: 42px;
  align-items: center;
}

.vmc-404-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(169, 27, 27, .09);
  color: var(--red);
  font-weight: 850;
  letter-spacing: .12em;
  text-transform: uppercase;
  font-size: 12px;
}

.vmc-404-eyebrow::before {
  content: '!';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--red);
  color: #fff;
  display: inline-grid;
  place-items: center;
  font-size: 13px;
  line-height: 1;
}

.vmc-404-number {
  font-family: 'Playfair Display', serif;
  font-size: clamp(100px, 16vw, 190px);
  line-height: .8;
  font-weight: 800;
  color: rgba(169, 27, 27, .13);
  margin-bottom: -8px;
}

.vmc-404-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 5vw, 68px);
  line-height: 1.02;
  color: var(--dark);
  margin: 0 0 18px;
  max-width: 760px;
}

.vmc-404-lede {
  font-size: 18px;
  color: var(--mid);
  max-width: 690px;
  line-height: 1.75;
  margin: 0 0 30px;
}

.vmc-404-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.vmc-404-card {
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(169, 27, 27, .10);
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0 24px 70px rgba(41, 33, 30, .10);
}

.vmc-404-card h2 {
  font-family: 'Playfair Display', serif;
  color: var(--dark);
  font-size: 31px;
  line-height: 1.1;
  margin: 0 0 8px;
}

.vmc-404-card p {
  margin: 0 0 20px;
  color: var(--mid);
  line-height: 1.55;
}

.vmc-404-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.vmc-404-links a {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 16px;
  border-radius: 16px;
  background: rgba(169, 27, 27, .055);
  color: var(--dark);
  text-decoration: none;
  font-weight: 800;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
}

.vmc-404-links a::after {
  content: '→';
  color: var(--red);
  font-weight: 900;
}

.vmc-404-links a:hover,
.vmc-404-links a:focus-visible {
  background: rgba(169, 27, 27, .10);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(41,33,30,.08);
}

.vmc-404-locations {
  width: min(1180px, calc(100% - (var(--pad, 68px) * 2)));
  margin: -18px auto 90px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.vmc-404-location-card {
  background: #fff;
  color: var(--dark);
  border: 1px solid rgba(169, 27, 27, .12);
  border-radius: 24px;
  padding: 24px 26px;
  display: grid;
  gap: 8px;
  box-shadow: 0 18px 50px rgba(41, 33, 30, .08);
}

.vmc-404-location-card span {
  color: var(--red);
  font-weight: 850;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: .12em;
}

.vmc-404-location-card strong {
  font-size: 17px;
  line-height: 1.45;
  color: var(--dark);
}

.vmc-404-location-card a {
  color: var(--red);
  font-weight: 850;
  text-decoration: none;
}

.vmc-404-location-card a:hover,
.vmc-404-location-card a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 860px) {
  .vmc-404-hero {
    padding: 125px 22px 50px;
  }

  .vmc-404-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .vmc-404-card {
    padding: 24px;
  }

  .vmc-404-locations {
    width: calc(100% - 44px);
    margin: 0 auto 60px;
    grid-template-columns: 1fr;
  }
}
</style>

<?php get_footer(); ?>