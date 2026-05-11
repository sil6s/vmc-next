/* VMC Theme – main.js */
(function () {
  'use strict';

  /* ── Nav scroll shrink ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('s', scrollY > 60), { passive: true });
  }

  /* ── Mobile menu ── */
  const toggle = document.getElementById('mobToggle');
  const menu   = document.getElementById('mob-menu');
  let menuOpen = false;

  window.openMob = function () {
    menuOpen = true;
    toggle && toggle.classList.add('open');
    toggle && toggle.setAttribute('aria-expanded', 'true');
    if (menu) {
      menu.style.display = 'flex';
      requestAnimationFrame(() => menu.classList.add('open'));
    }
    document.body.style.overflow = 'hidden';
  };

  window.closeMob = function () {
    menuOpen = false;
    toggle && toggle.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    if (menu) {
      menu.classList.remove('open');
      setTimeout(() => { if (!menuOpen) menu.style.display = 'none'; }, 360);
    }
    document.body.style.overflow = '';
  };

  if (toggle) {
    toggle.addEventListener('click', () => menuOpen ? closeMob() : openMob());
  }


  /* ── Floater ── */
  const floater = document.getElementById('floater');
  if (floater) {
    window.addEventListener('scroll', () => {
      floater.style.display = scrollY > 480 ? 'flex' : 'none';
    }, { passive: true });
  }

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -44px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  } else {
    // Fallback: show everything
    document.querySelectorAll('.rv').forEach(el => el.classList.add('on'));
  }

  /* ── Stat counters ── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target  = parseFloat(el.dataset.count);
    const isFloat = target % 1 !== 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = performance.now();
      (function run(now) {
        const p = Math.min((now - t0) / 1500, 1);
        const v = (1 - Math.pow(1 - p, 3)) * target;
        el.textContent = isFloat ? v.toFixed(1) : Math.round(v);
        if (p < 1) requestAnimationFrame(run);
      })(t0);
      obs.unobserve(el);
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── FAQ accordion ── */
  window.toggleFaq = function (btn) {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };

  /* ── Newsletter (AJAX) ── */
  const nlSubmit = document.getElementById('nl-submit');
  const nlEmail  = document.getElementById('nl-email');
  if (nlSubmit && nlEmail && typeof vmcData !== 'undefined') {
    nlSubmit.addEventListener('click', () => {
      const email = nlEmail.value.trim();
      if (!email) { nlEmail.focus(); return; }
      nlSubmit.textContent = 'Sending…';
      nlSubmit.disabled = true;
      fetch(vmcData.ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'vmc_newsletter', nonce: vmcData.nonce, email }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            nlSubmit.textContent = 'Subscribed!';
            nlSubmit.style.background = '#f0ece5';
            nlSubmit.style.color = '#2a7a2a';
          } else {
            nlSubmit.textContent = 'Try Again';
            nlSubmit.disabled = false;
          }
        })
        .catch(() => { nlSubmit.textContent = 'Error'; nlSubmit.disabled = false; });
    });
  }

  /* ── Booking form (AJAX) ── */
  const bfSubmit = document.getElementById('bf-submit');
  if (bfSubmit && typeof vmcData !== 'undefined') {
    bfSubmit.addEventListener('click', () => {
      const name  = document.getElementById('bf-name')?.value.trim();
      const phone = document.getElementById('bf-phone')?.value.trim();
      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }
      bfSubmit.textContent = 'Sending…';
      bfSubmit.disabled = true;

      const payload = {
        action:    'vmc_appointment',
        nonce:     vmcData.nonce,
        name,
        phone,
        email:     document.getElementById('bf-email')?.value || '',
        pet_name:  document.getElementById('bf-pet')?.value || '',
        pet_type:  document.getElementById('bf-pet-type')?.value || '',
        location:  document.getElementById('bf-location')?.value || '',
        day:       document.getElementById('bf-day')?.value || '',
        time:      document.getElementById('bf-time')?.value || '',
        reason:    document.getElementById('bf-reason')?.value || '',
        notes:     document.getElementById('bf-notes')?.value || '',
      };

      fetch(vmcData.ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload),
      })
        .then(r => r.json())
        .then(data => {
          const inner   = document.getElementById('booking-form-inner');
          const success = document.getElementById('booking-success');
          if (data.success && inner && success) {
            inner.style.display   = 'none';
            success.style.display = 'block';
          } else {
            bfSubmit.textContent = 'Request Sent ✓';
            bfSubmit.style.background = '#2a7a2a';
          }
        })
        .catch(() => {
          bfSubmit.textContent = 'Request Sent ✓';
          bfSubmit.style.background = '#2a7a2a';
        });
    });
  }


  /* ── Appointment modal ── */
  const aptModal = document.getElementById('apt-modal');

  function aptPush(eventName, params) {
    if (window.dataLayer) {
      window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    }
  }

  window.openAptModal = function (triggerLabel) {
    if (!aptModal) return;
    aptModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Reset to step 1
    const s1 = document.getElementById('apt-step-1');
    const s2 = document.getElementById('apt-step-2');
    if (s1) s1.style.display = '';
    if (s2) s2.style.display = 'none';
    aptPush('apt_modal_open', { trigger_label: triggerLabel || '' });
  };

  window.closeAptModal = function () {
    if (!aptModal) return;
    aptModal.style.display = 'none';
    document.body.style.overflow = '';
  };

  window.aptNewPatient = function () {
    aptPush('apt_patient_type', { patient_type: 'new' });
    closeAptModal();
    window.location.href = '/first-vet-visit-northern-kentucky/';
  };

  window.aptExistingPatient = function () {
    aptPush('apt_patient_type', { patient_type: 'existing' });
    const s1 = document.getElementById('apt-step-1');
    const s2 = document.getElementById('apt-step-2');
    if (s1) s1.style.display = 'none';
    if (s2) s2.style.display = '';
  };

  window.aptBack = function () {
    const s1 = document.getElementById('apt-step-1');
    const s2 = document.getElementById('apt-step-2');
    if (s1) s1.style.display = '';
    if (s2) s2.style.display = 'none';
  };

  window.aptTrack = function (action) {
    aptPush('apt_booking_action', { booking_method: action });
  };

  /* ── Portal / Pharmacy modal ── */
  const portalModal = document.getElementById('portal-modal');
  let _portalService = 'portal'; // 'portal' | 'pharmacy'

  // Copy keyed by service — keeps the PHP template static and JS dynamic
  const _portalCopy = {
    portal: {
      eyebrow:    'Patient Portal',
      heading:    'Are you a current VMC patient?',
      sub:        "Current patients can log in directly. First time here? We’ll walk you through how it works.",
      currentLbl: "Yes, I’m a current patient",
      currentSub: 'Take me to the portal',
      newLbl:     "I’m new to the portal",
      newSub:     'Show me how it works first',
    },
    pharmacy: {
      eyebrow:    'Online Pharmacy',
      heading:    'Are you a current VMC patient?',
      sub:        "Current VMC patients can order and request refills directly. New to us? We’ll explain how the pharmacy works.",
      currentLbl: "Yes, I’m a current patient",
      currentSub: 'Take me to the pharmacy',
      newLbl:     "I’m new to VMC",
      newSub:     'Show me how the pharmacy works',
    },
  };

  function _applyPortalCopy(service) {
    if (!portalModal) return;
    const c  = _portalCopy[service] || _portalCopy.portal;
    const el = (id) => document.getElementById(id);
    if (el('portal-modal-eyebrow'))    el('portal-modal-eyebrow').textContent    = c.eyebrow;
    if (el('portal-modal-title'))      el('portal-modal-title').textContent      = c.heading;
    if (el('portal-modal-sub'))        el('portal-modal-sub').textContent        = c.sub;
    if (el('portal-choice-current'))   el('portal-choice-current').textContent   = c.currentLbl;
    if (el('portal-choice-current-sub')) el('portal-choice-current-sub').textContent = c.currentSub;
    if (el('portal-choice-new'))       el('portal-choice-new').textContent       = c.newLbl;
    if (el('portal-choice-new-sub'))   el('portal-choice-new-sub').textContent   = c.newSub;
  }

  window.openPortalModal = function (service, triggerLabel) {
    if (!portalModal) return;
    _portalService = service === 'pharmacy' ? 'pharmacy' : 'portal';
    _applyPortalCopy(_portalService);
    portalModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'portal_modal_open', service: _portalService, trigger_label: triggerLabel || '' });
    }
  };

  window.closePortalModal = function () {
    if (!portalModal) return;
    portalModal.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Current patient → external URL in new tab
  window.portalCurrentPatient = function () {
    if (!portalModal) return;
    const url = _portalService === 'pharmacy'
      ? (portalModal.dataset.pharmacyUrl || '#')
      : (portalModal.dataset.portalUrl  || '#');
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'portal_modal_choice', service: _portalService, patient_type: 'existing' });
    }
    closePortalModal();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // New user → informational landing page (same tab)
  window.portalNewUser = function () {
    if (!portalModal) return;
    const url = _portalService === 'pharmacy'
      ? (portalModal.dataset.pharmacyPage || '#')
      : (portalModal.dataset.portalPage   || '#');
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'portal_modal_choice', service: _portalService, patient_type: 'new' });
    }
    closePortalModal();
    window.location.href = url;
  };

  // Close on ESC (appointment modal → portal modal → mobile menu)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (aptModal    && aptModal.style.display    !== 'none') {
        closeAptModal();
      } else if (portalModal && portalModal.style.display !== 'none') {
        closePortalModal();
      } else if (menuOpen) {
        closeMob();
      }
    }
  });

  // Wire up any .js-apt-modal elements added dynamically
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-apt-modal');
    if (trigger) {
      e.preventDefault();
      openAptModal(trigger.dataset.aptLabel || trigger.textContent.trim());
    }
  });

})();
