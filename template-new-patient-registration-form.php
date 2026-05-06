<?php
/**
 * Template Name: New Patient Registration
 */
get_header();

$ft_phone    = vmc_get('vmc_ft_phone', '(859) 441-1937');
$ind_phone   = vmc_get('vmc_ind_phone', '(859) 356-2242');
$ft_address  = vmc_get('vmc_ft_address', 'Veterinary Medical Center of Fort Thomas');
$ind_address = vmc_get('vmc_ind_address', 'Veterinary Medical Center of Independence');
?>

<style>
.new-patient-page{
  background:var(--cream);
}

.new-patient-shell{
  width:min(1360px, calc(100% - 48px));
  margin:0 auto;
}

.new-patient-hero{
  padding:56px 0 34px;
  background:var(--cream);
}

.new-patient-hero-grid{
  display:grid;
  grid-template-columns:minmax(0, 1.25fr) minmax(360px, .75fr);
  gap:28px;
  align-items:stretch;
}

.new-patient-hero-copy{
  min-width:0;
  padding:22px 0;
}

.new-patient-eyebrow{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:18px;
  color:var(--red);
  font-size:12px;
  font-weight:700;
  letter-spacing:.18em;
  text-transform:uppercase;
}

.new-patient-eyebrow::before{
  content:'';
  width:34px;
  height:1px;
  background:var(--red);
  display:block;
}

.new-patient-title{
  margin:0;
  font-family:'Playfair Display', serif;
  font-size:clamp(44px, 5vw, 74px);
  line-height:.95;
  color:var(--dark);
  max-width:19ch;
}

.new-patient-title em{
  display:block;
  font-style:italic;
  color:var(--red);
  font-weight:600;
}

.new-patient-lead{
  margin:18px 0 0;
  max-width:660px;
  color:var(--mid);
  font-size:16px;
  line-height:1.9;
}

.new-patient-hero-actions{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-top:24px;
}

.new-patient-hero-actions .btn-red,
.new-patient-hero-actions .btn-ghost{
  min-width:200px;
  text-align:center;
}

.new-patient-hero-stats{
  display:grid;
  grid-template-columns:repeat(3, minmax(0, 1fr));
  gap:14px;
  margin-top:28px;
  max-width:760px;
}

.new-patient-stat{
  background:#fff;
  border:1px solid rgba(0,0,0,.06);
  border-radius:12px;
  padding:16px 18px;
  box-shadow:0 12px 32px rgba(0,0,0,.04);
}

.new-patient-stat strong{
  display:block;
  color:var(--dark);
  font-size:18px;
  line-height:1.1;
  margin-bottom:6px;
}

.new-patient-stat span{
  display:block;
  color:var(--mid);
  font-size:13px;
  line-height:1.6;
}

.new-patient-info{
  background:#fff;
  border:1px solid rgba(0,0,0,.06);
  border-radius:16px;
  padding:28px;
  box-shadow:0 22px 56px rgba(0,0,0,.06);
  min-width:0;
}

.new-patient-info h3{
  margin:0 0 14px;
  font-family:'Playfair Display', serif;
  font-size:28px;
  line-height:1.05;
  color:var(--dark);
}

.new-patient-info-list{
  display:grid;
  gap:14px;
  margin:0;
}

.new-patient-info-item{
  display:grid;
  grid-template-columns:40px 1fr;
  gap:12px;
  align-items:start;
  padding-bottom:14px;
  border-bottom:1px solid rgba(0,0,0,.08);
}

.new-patient-info-item:last-child{
  padding-bottom:0;
  border-bottom:none;
}

.new-patient-info-icon{
  width:40px;
  height:40px;
  border-radius:10px;
  background:var(--rglow);
  color:var(--red);
  display:flex;
  align-items:center;
  justify-content:center;
}

.new-patient-info-item strong{
  display:block;
  color:var(--dark);
  font-size:13px;
  margin-bottom:4px;
}

.new-patient-info-item span{
  display:block;
  color:var(--mid);
  font-size:13px;
  line-height:1.7;
}

.new-patient-note{
  margin-top:16px;
  background:var(--cream);
  border-radius:10px;
  padding:14px;
  color:var(--mid);
  font-size:13px;
  line-height:1.75;
}

.new-patient-note strong{
  color:var(--red);
}

.new-patient-band{
  padding:72px 0;
  background:#fff;
}

.new-patient-intro{
  margin-top:14px;
  max-width:780px;
  color:var(--mid);
  font-size:15px;
  line-height:1.9;
}

.new-patient-layout{
  display:grid;
  grid-template-columns:minmax(0, 1.15fr) minmax(320px, .85fr);
  gap:28px;
  align-items:start;
  margin-top:34px;
}

.new-patient-form-card,
.new-patient-side-card,
.new-patient-cta{
  background:#fff;
margin-top:50px;
  border:1px solid rgba(0,0,0,.06);
  border-radius:16px;
  box-shadow:0 20px 56px rgba(0,0,0,.06);
}

.new-patient-form-card{
  padding:34px;
  min-width:0;
  overflow:hidden;
}

.new-patient-form-card h2{
  margin:0 0 8px;
  font-family:'Playfair Display', serif;
  font-size:34px;
  line-height:1.05;
  color:var(--dark);
}

.new-patient-form-card > p{
  margin:0 0 24px;
  color:var(--mid);
  font-size:14px;
  line-height:1.8;
}

.new-patient-sidebar{
  display:grid;
  gap:18px;
}

.new-patient-side-card{
  padding:24px;
}

.new-patient-side-card h3{
  margin:0 0 10px;
  font-family:'Playfair Display', serif;
  font-size:24px;
  line-height:1.08;
  color:var(--dark);
}

.new-patient-side-card p,
.new-patient-side-card li{
  color:var(--mid);
  font-size:13.5px;
  line-height:1.8;
}

.new-patient-side-card ul{
  margin:8px 0 0;
  padding-left:18px;
}

.new-patient-side-card li{
  margin-bottom:4px;
}

.new-patient-badge{
  display:inline-block;
  margin-bottom:10px;
  padding:5px 10px;
  border-radius:999px;
  background:var(--rglow);
  color:var(--red);
  font-size:11px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
}

.new-patient-cta-wrap{
  padding:0 0 76px;
  background:var(--cream);
}

.new-patient-cta{
  padding:34px;
}

.new-patient-cta h3{
  margin:0 0 10px;
  font-family:'Playfair Display', serif;
  font-size:36px;
  line-height:1.05;
  color:var(--dark);
}

.new-patient-cta p{
  margin:0;
  max-width:760px;
  color:var(--mid);
  font-size:15px;
  line-height:1.85;
}

.new-patient-cta-actions{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-top:22px;
}

/* CF7 content styles */
.form-section-label{
  display:flex;
  align-items:center;
  gap:14px;
  margin:30px 0 18px;
}

.form-section-label .fsl-num{
  width:30px;
  height:30px;
  border-radius:50%;
  background:var(--red);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:13px;
  font-weight:700;
  flex-shrink:0;
}

.form-section-label .fsl-text{
  font-family:'Playfair Display', serif;
  font-size:20px;
  font-weight:700;
  color:var(--dark);
}

.form-section-label::after{
  content:'';
  flex:1;
  height:1px;
  background:rgba(0,0,0,.08);
}

.vmc-field-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px 20px;
}

.vmc-field{
  display:flex;
  flex-direction:column;
  gap:8px;
  min-width:0;
}

.vmc-field-full{
  grid-column:1 / -1;
}

.vmc-field > label,
.vmc-field .field-label{
  display:block;
  color:var(--gold);
  font-size:11px;
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
}

.new-patient-form-card .wpcf7{
  width:100%;
}

.new-patient-form-card .wpcf7-form-control-wrap{
  display:block;
  width:100%;
}

.new-patient-form-card input[type="text"],
.new-patient-form-card input[type="email"],
.new-patient-form-card input[type="tel"],
.new-patient-form-card input[type="date"],
.new-patient-form-card input[type="file"],
.new-patient-form-card select,
.new-patient-form-card textarea{
  width:100%;
  max-width:100%;
  box-sizing:border-box;
  border:1px solid rgba(0,0,0,.12);
  background:var(--cream);
  color:var(--dark);
  border-radius:10px;
  padding:13px 14px;
  font:inherit;
  font-size:14px;
  line-height:1.45;
  transition:border-color .15s, box-shadow .15s, background .15s;
  appearance:none;
  -webkit-appearance:none;
}

.new-patient-form-card input:focus,
.new-patient-form-card select:focus,
.new-patient-form-card textarea:focus{
  outline:none;
  border-color:var(--red);
  box-shadow:0 0 0 3px var(--rglow);
}

.new-patient-form-card textarea{
  min-height:120px;
  resize:vertical;
}

.new-patient-form-card select{
  padding-right:42px;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--dark) 50%),
    linear-gradient(135deg, var(--dark) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) calc(50% - 3px),
    calc(100% - 12px) calc(50% - 3px);
  background-size:6px 6px, 6px 6px;
  background-repeat:no-repeat;
}

.vmc-consent-box{
  margin:30px 0 22px;
  background:var(--cream);
  border:1px solid rgba(0,0,0,.08);
  border-radius:12px;
  padding:22px;
}

.vmc-consent-box h4{
  margin:0 0 10px;
  font-family:'Playfair Display', serif;
  font-size:18px;
  color:var(--dark);
}

.vmc-consent-box p{
  margin:0;
  color:var(--mid);
  font-size:13px;
  line-height:1.9;
}

.vmc-payment-notice{
  margin-top:12px !important;
  color:var(--red) !important;
  font-size:12px !important;
  font-weight:700 !important;
  letter-spacing:.08em;
  text-transform:uppercase;
}

/* Force radios + checkboxes visible */
.new-patient-form-card .wpcf7 input[type="radio"],
.new-patient-form-card .wpcf7 input[type="checkbox"]{
  appearance:auto !important;
  -webkit-appearance:radio !important;
  display:inline-block !important;
  opacity:1 !important;
  visibility:visible !important;
  position:static !important;
  width:18px !important;
  height:18px !important;
  min-width:18px !important;
  min-height:18px !important;
  margin:0 !important;
  accent-color:var(--red);
  vertical-align:middle;
}

.new-patient-form-card .wpcf7 input[type="checkbox"]{
  -webkit-appearance:checkbox !important;
}

.vmc-radio-group,
.vmc-check-group{
  margin-top:2px;
}

.vmc-radio-group .wpcf7-form-control,
.vmc-check-group .wpcf7-form-control{
  display:flex !important;
  flex-wrap:wrap;
  gap:10px;
}

.vmc-radio-group .wpcf7-list-item,
.vmc-check-group .wpcf7-list-item{
  display:inline-flex !important;
  margin:0 !important;
}

.vmc-radio-group .wpcf7-list-item label,
.vmc-check-group .wpcf7-list-item label{
  display:inline-flex !important;
  align-items:center;
  gap:10px;
  padding:11px 14px;
  background:#fff;
  border:1px solid rgba(0,0,0,.12);
  border-radius:10px;
  cursor:pointer;
  color:var(--dark);
  font-size:14px;
  font-weight:500;
  line-height:1.35;
  text-transform:none;
  letter-spacing:0;
}

.vmc-radio-group .wpcf7-list-item label:hover,
.vmc-check-group .wpcf7-list-item label:hover{
  border-color:var(--red);
  background:var(--rglow);
}

.vmc-form-actions{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:14px;
  margin-top:24px;
}

.vmc-form-actions .btn-red,
.vmc-form-actions input[type="submit"]{
  border:none;
  cursor:pointer;
}

.vmc-form-actions small{
  color:var(--mid);
  font-size:12px;
}

.new-patient-form-card .wpcf7-not-valid-tip{
  font-size:12px;
  margin-top:6px;
}

.new-patient-form-card .wpcf7-response-output{
  margin:18px 0 0 !important;
  border-radius:10px;
  font-size:14px;
}

.new-patient-form-card canvas{
  width:100% !important;
  max-width:100%;
  min-height:180px;
  background:#fff;
  border:1px dashed rgba(0,0,0,.18);
  border-radius:10px;
}

/* Responsive */
@media (max-width: 1180px){
  .new-patient-hero-grid,
  .new-patient-layout{
    grid-template-columns:1fr;
  }

  .new-patient-title{
    max-width:19ch;
  }
}

@media (max-width: 900px){
  .new-patient-shell{
    width:min(100% - 28px, 1360px);
  }

  .new-patient-hero{
    padding:40px 0 24px;
  }

  .new-patient-band{
    padding:56px 0;
  }

  .new-patient-form-card,
  .new-patient-side-card,
  .new-patient-info,
  .new-patient-cta{
    padding:22px;
    border-radius:12px;
  }

  .vmc-field-grid{
    grid-template-columns:1fr;
    gap:14px;
  }

  .new-patient-hero-stats{
    grid-template-columns:1fr;
    max-width:none;
  }

  .vmc-radio-group .wpcf7-form-control,
  .vmc-check-group .wpcf7-form-control{
    flex-direction:column;
    align-items:stretch;
  }

  .vmc-radio-group .wpcf7-list-item,
  .vmc-check-group .wpcf7-list-item{
    width:100%;
  }

  .vmc-radio-group .wpcf7-list-item label,
  .vmc-check-group .wpcf7-list-item label{
    width:100%;
  }

  .new-patient-hero-actions,
  .new-patient-cta-actions,
  .vmc-form-actions{
    flex-direction:column;
    align-items:stretch;
  }

  .new-patient-hero-actions .btn-red,
  .new-patient-hero-actions .btn-ghost,
  .new-patient-cta-actions a,
  .vmc-form-actions input[type="submit"]{
    width:100%;
    text-align:center;
  }
}

@media (max-width: 640px){
  .new-patient-title{
    max-width:none;
    font-size:clamp(36px, 11vw, 52px);
  }

  .form-section-label{
    gap:10px;
  }

  .form-section-label .fsl-text{
    font-size:17px;
  }

  .new-patient-info-item{
    grid-template-columns:36px 1fr;
  }
}
</style>

<div class="new-patient-page">

  <section class="new-patient-hero">
    <div class="new-patient-shell">
      <div class="new-patient-hero-grid">

        <div class="new-patient-hero-copy">
          <div class="new-patient-eyebrow">New Patient Registration</div>

          <h1 class="new-patient-title">
            Welcome to Veterinary Medical Center
            <em>let's get started.</em>
          </h1>

          <p class="new-patient-lead">
            Complete your new patient registration form before your visit so our team can get to know you and your pet ahead of time.
          </p>

          <div class="new-patient-hero-actions">
            <a href="#registration-form" class="btn-red">Start Registration</a>
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn-ghost">Contact Us</a>
          </div>

          <div class="new-patient-hero-stats">
            <div class="new-patient-stat">
              <strong>About 5 minutes</strong>
              <span>Most families finish the form quickly.</span>
            </div>
            <div class="new-patient-stat">
              <strong>Secure submission</strong>
              <span>Your information goes directly to our team.</span>
            </div>
            <div class="new-patient-stat">
              <strong>Two locations</strong>
              <span>Fort Thomas and Independence.</span>
            </div>
          </div>
        </div>

        <aside class="new-patient-info">
          <h3>Before you begin</h3>

          <div class="new-patient-info-list">
            <div class="new-patient-info-item">
              <div class="new-patient-info-icon">✓</div>
              <div>
                <strong>Have this ready</strong>
                <span>Owner information, pet details, vaccination history, and a daytime phone number.</span>
              </div>
            </div>

            <div class="new-patient-info-item">
              <div class="new-patient-info-icon">☎</div>
              <div>
                <strong>Fort Thomas</strong>
                <span><?php echo esc_html($ft_phone); ?></span>
              </div>
            </div>

            <div class="new-patient-info-item">
              <div class="new-patient-info-icon">☎</div>
              <div>
                <strong>Independence</strong>
                <span><?php echo esc_html($ind_phone); ?></span>
              </div>
            </div>

            <div class="new-patient-info-item">
              <div class="new-patient-info-icon">🔒</div>
              <div>
                <strong>Private and secure</strong>
                <span>Your information is used only for your pet’s care and registration.</span>
              </div>
            </div>
          </div>

          <div class="new-patient-note">
            <strong>Important:</strong> fields marked with an asterisk are required, and daytime phone numbers are very important to us.
          </div>
        </aside>

      </div>
    </div>
  </section>

  <section class="new-patient-band" id="registration-form">
    <div class="new-patient-shell">

      <div class="sec-eye">
        <span class="sec-lbl">Patient Intake</span>
        <span class="sec-rule"></span>
      </div>

      <h2 class="sec-h2">New patient registration.</h2>

      <p class="new-patient-intro">
        Please complete the form below before your first appointment. You can also upload previous health records if you have them available.
      </p>

      <div class="new-patient-layout">

        <article class="new-patient-form-card">
          <h2>Registration form</h2>
          <p>All required fields should be completed before submitting.</p>

          <?php echo do_shortcode('[contact-form-7 id="52c983f" title="New Patient Registration"]'); ?>
        </article>

        <aside class="new-patient-sidebar">
          <div class="new-patient-side-card">
            <span class="new-patient-badge">New Clients</span>
            <h3>What happens next?</h3>
            <p>Once your registration is submitted, our team will review it and follow up as needed before your visit.</p>
          </div>

          <div class="new-patient-side-card">
            <h3>What to bring</h3>
            <ul>
              <li>A photo ID</li>
              <li>Any prior vaccine records</li>
              <li>Previous medical records if available</li>
              <li>Your pet on a leash or in a carrier</li>
              <li>Your preferred payment method</li>
            </ul>
          </div>

          <div class="new-patient-side-card">
            <h3>Locations</h3>
            <p>
              <strong>Fort Thomas</strong><br>
              <?php echo esc_html($ft_address); ?><br>
              <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $ft_phone)); ?>" style="color:var(--red);font-weight:700;">
                <?php echo esc_html($ft_phone); ?>
              </a>
            </p>

            <p style="margin-top:12px;">
              <strong>Independence</strong><br>
              <?php echo esc_html($ind_address); ?><br>
              <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $ind_phone)); ?>" style="color:var(--red);font-weight:700;">
                <?php echo esc_html($ind_phone); ?>
              </a>
            </p>
          </div>

          <div class="new-patient-side-card">
            <h3>Need help?</h3>
            <p>If something is not working, contact your preferred location and our team will help you complete the process.</p>
          </div>
        </aside>

      </div>
    </div>
  </section>

  <section class="new-patient-cta-wrap">
    <div class="new-patient-shell">
      <div class="new-patient-cta">
        <h3>Questions before your first visit?</h3>
        <p>
          Our team is happy to help you complete registration or answer questions before your appointment.
        </p>

        <div class="new-patient-cta-actions">
          <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn-red">Contact Us</a>
          <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $ft_phone)); ?>" class="btn-ghost">Call Fort Thomas</a>
          <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $ind_phone)); ?>" class="btn-ghost">Call Independence</a>
        </div>
      </div>
    </div>
  </section>

</div>

<?php get_footer(); ?>