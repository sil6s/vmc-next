<?php
/**
 * Portal / Pharmacy Modal
 *
 * Shared modal for both Patient Portal and Online Pharmacy entry points.
 * openPortalModal('portal', label) or openPortalModal('pharmacy', label)
 * updates the copy and routes the two choices:
 *   "Current patient"  → external URL (portal or pharmacy) in new tab
 *   "New to VMC"       → informational landing page (same tab)
 *
 * Reuses all .apt-* CSS already in main.css — no additional styles needed.
 */

$portal_ext_url    = function_exists('vmc_get') ? vmc_get( 'vmc_portal_url',   'https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2' ) : 'https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2';
$pharmacy_ext_url  = function_exists('vmc_get') ? vmc_get( 'vmc_pharmacy_url', 'https://nky-vet.ourvet.com/' ) : 'https://nky-vet.ourvet.com/';
$portal_page_url   = function_exists('vmc_patient_portal_page_url')  ? vmc_patient_portal_page_url()  : home_url('/patient-portal-online-booking/');
$pharmacy_page_url = function_exists('vmc_online_pharmacy_page_url') ? vmc_online_pharmacy_page_url() : home_url('/online-vet-pharmacy-northern-kentucky-cincinnati/');
?>
<div id="portal-modal"
     role="dialog"
     aria-modal="true"
     aria-labelledby="portal-modal-title"
     style="display:none"
     data-portal-url="<?php echo esc_attr( $portal_ext_url ); ?>"
     data-pharmacy-url="<?php echo esc_attr( $pharmacy_ext_url ); ?>"
     data-portal-page="<?php echo esc_attr( $portal_page_url ); ?>"
     data-pharmacy-page="<?php echo esc_attr( $pharmacy_page_url ); ?>">

  <div class="apt-overlay" onclick="closePortalModal()"></div>

  <div class="apt-box">

    <button class="apt-close" onclick="closePortalModal()" aria-label="<?php esc_attr_e( 'Close', 'vmc' ); ?>">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>

    <div class="sec-eye" style="margin-bottom:10px">
      <span class="sec-lbl" id="portal-modal-eyebrow"><?php esc_html_e( 'Patient Portal', 'vmc' ); ?></span>
      <span class="sec-rule"></span>
    </div>

    <h2 id="portal-modal-title" class="apt-heading"><?php esc_html_e( 'Are you a current VMC patient?', 'vmc' ); ?></h2>
    <p class="apt-sub" id="portal-modal-sub"><?php esc_html_e( "Current patients can log in directly. First time here? We’ll walk you through how it works.", 'vmc' ); ?></p>

    <div class="apt-choices">

      <button class="apt-choice" onclick="portalCurrentPatient()">
        <span class="apt-choice-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </span>
        <strong id="portal-choice-current"><?php esc_html_e( "Yes, I’m a current patient", 'vmc' ); ?></strong>
        <span id="portal-choice-current-sub"><?php esc_html_e( 'Take me there directly', 'vmc' ); ?></span>
      </button>

      <button class="apt-choice" onclick="portalNewUser()">
        <span class="apt-choice-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/>
            <path d="M2 20c0-4 4.5-7 10-7s10 3 10 7"/>
            <line x1="12" y1="13" x2="12" y2="17"/>
            <line x1="10" y1="15" x2="14" y2="15"/>
          </svg>
        </span>
        <strong id="portal-choice-new"><?php esc_html_e( "I’m new here", 'vmc' ); ?></strong>
        <span id="portal-choice-new-sub"><?php esc_html_e( 'Show me how it works first', 'vmc' ); ?></span>
      </button>

    </div>

  </div>
</div>
