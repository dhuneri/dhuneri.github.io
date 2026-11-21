(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const assetBase = $("#dh-packaging-page")?.dataset.assetBase || "/assets/images/packaging";
  const asset = (name) => `${assetBase.replace(/\/$/, "")}/${name}`;

  const views = {
    front: {
      src: 'pouch-front-view.webp',
      title: 'Front View',
      count: '01',
      caption: 'Front face: Pure metallic copper foil typography and botanical cardamom engraving on tactile unbleached Lokta composite.'
    },
    back: {
      src: 'pouch-back-view.webp',
      title: 'Reverse View',
      count: '02',
      caption: 'Reverse panel: Single-farm micro-lot documentation, elevation (1,450m), hearth-cure smoke hours, and Limbu cultural origin notes.'
    },
    side: {
      src: 'pouch-side-view.webp',
      title: 'Side Profile',
      count: '03',
      caption: 'Side profile: Bottom-gusset expansion providing free-standing kitchen stability and high volume-to-weight packaging efficiency.'
    },
    angle: {
      src: 'pouch-angle-view.webp',
      title: 'Three-Quarter Angle',
      count: '04',
      caption: 'Perspective angle: Showcasing the matte light-absorbing finish designed to prevent optical degradation of precious volatile spices.'
    }
  };

  const detailPoints = [
    {
      kicker: 'FEATURE 01 · IDENTITY & BOTANICAL CREST',
      title: 'The Face of the Hearth.',
      copy: 'The front face displays the DHUNERI wordmark and the Limbu script logo (ᤍᤢᤴᤢᤖᤡ). In place of commercial graphics, a hand-engraved copper botanical study honors the flowering plant and harvested cardamom capsule.',
      material: 'Textured Himalayan Lokta Sheath',
      purpose: 'Blocks 100% of Terpene-Degrading Light',
      next: 'Next: Multi-Layer Barrier',
      view: 'front'
    },
    {
      kicker: 'FEATURE 02 · AROMA-LOCK BARRIER',
      title: 'The Terpene Shield.',
      copy: 'Black cardamom derives its therapeutic character from volatile 1,8-Cineole and Terpinyl Acetate. Our three-layer interior foil creates a hermetic oxygen and moisture barrier, ensuring zero aroma loss between the kiln and your kitchen.',
      material: 'Food-Grade Aluminum Foil Sheath',
      purpose: 'Hermetic Vapor & Moisture Barrier',
      next: 'Next: Direct Farm Provenance',
      view: 'front'
    },
    {
      kicker: 'FEATURE 03 · PROVENANCE LEDGER',
      title: 'An Origin with a Name.',
      copy: 'Every pack bears a micro-lot harvest code linking directly to its mountain terrace in Tehrathum, the smallholder producer collective, and the wood-fire bhatti curing duration.',
      material: 'Debossed High-Adhesion Label Stock',
      purpose: 'Batch-Level Traceability & Origin Guarantee',
      next: 'Next: Resealable Closure',
      view: 'front'
    },
    {
      kicker: 'FEATURE 04 · CLOSURE INTEGRITY',
      title: 'Sealed for Repeated Rituals.',
      copy: 'The top perimeter features a precision press-to-close airtight zipper with tamper-evident tear notches. Once opened, the seal reliably keeps ambient kitchen humidity from softening the dry, crisp pods.',
      material: 'Reinforced Polymer Resealable Zip',
      purpose: 'Maintains 10–12% Equilibrium Moisture',
      next: 'Back to: Botanical Crest',
      view: 'front'
    }
  ];

  const promiseDetails = [
    {
      no: 'PRINCIPLE 01 / MATERIALITY',
      title: 'The Himalayan Lokta Sheath.',
      status: 'NATURAL MATERIAL STANDARD',
      statusClass: 'active-pill',
      desc: 'Harvested sustainably from the inner bark of high-altitude Daphne shrubs (Lokta), this traditional paper has protected Himalayan scriptures for over a millennium. Inherently resistant to moisture, insects, and tearing, it gives every DHUNERI pouch an unmistakable organic hand-feel.',
      image: 'dhuneri_packaging_atelier_ui_concept.jpg',
      alt: 'Tactile Himalayan Lokta paper composite pouch'
    },
    {
      no: 'PRINCIPLE 02 / PRESERVATION',
      title: 'Multi-Layer Aroma Shield.',
      status: '100% LIGHT & OXYGEN BARRIER',
      statusClass: 'active-pill',
      desc: 'Volatile essential oils evaporate rapidly under direct sunlight and ambient air. Our packaging integrates a specialized opaque barrier composite that completely eliminates light infiltration, locking in the smoky sweetness of whole pods for up to 24 months.',
      image: 'pouch-front-view.webp',
      alt: 'DHUNERI aroma-barrier pouch front view'
    },
    {
      no: 'PRINCIPLE 03 / TRACEABILITY',
      title: 'Farm-Coded Batch Ledger.',
      status: 'PRODUCER TRANSPARENCY',
      statusClass: 'active-pill',
      desc: 'We never blend lots. Every pouch documents the exact valley, farmer family, curing hearth, and harvest month. Scanning the batch code provides the moisture analysis and curing temperature curve for that specific harvest.',
      image: 'pouch-back-view.webp',
      alt: 'Reverse panel showing batch ledger details'
    },
    {
      no: 'PRINCIPLE 04 / SEALING',
      title: 'Smoke-Lock Resealable Closure.',
      status: 'RESEALABLE AIRTIGHT SEAL',
      statusClass: 'active-pill',
      desc: 'An airtight closure ensures that opening the pouch does not compromise the remaining harvest. The multi-track zipper seals out moisture and foreign odors, protecting the pure wood-cured aroma in everyday kitchen environments.',
      image: 'pouch-side-view.webp',
      alt: 'Side profile showing closure and pouch construction'
    },
    {
      no: 'PRINCIPLE 05 / ETHICAL VALUE',
      title: 'Direct Value Share-Back.',
      status: 'FAIR VALUE DIRECT PAYOUT',
      statusClass: 'active-pill',
      desc: 'True luxury means equity for the grower. By bypassing commodity middlemen and packing directly at origin in Nepal, over 65% of the retail export price returns directly to our smallholder cardamom farming partners in eastern Nepal.',
      image: 'packaging-format-lineup.webp',
      alt: 'The trio of DHUNERI vessels'
    }
  ];

  const formatDetails = {
    pouch: {
      src: 'format-pouch.webp',
      label: 'VESSEL 01 / STAND-UP POUCH (50G & 100G)',
      alt: 'DHUNERI stand-up pouch format',
      desc: 'The stand-up pouch is our primary packaging vessel: lightweight for shipping, engineered with a food-grade aluminum barrier layer, resealable zipper, and a natural tactile Lokta finish.'
    },
    tin: {
      src: 'format-tin.webp',
      label: 'VESSEL 02 / AIRTIGHT TINPLATE CANISTER (150G)',
      alt: 'DHUNERI metal canister format',
      desc: 'Crafted from recyclable tinplate with a snug double-lid internal plug seal. Designed as a countertop vault for whole cardamom pods, protecting delicate spices from direct sunlight and heat.'
    },
    jar: {
      src: 'format-jar.webp',
      label: 'VESSEL 03 / AMBER APOTHECARY GLASS JAR (75G)',
      alt: 'DHUNERI amber apothecary jar format',
      desc: 'Heavyweight ultraviolet-blocking amber glass paired with an airtight phenolic screw cap. Tailored for cellar reserves, slow aging, and display in fine dining and mixology ateliers.'
    }
  };

  const packageImg = $('#package-view');
  const viewCaption = $('#view-caption');
  const railKicker = $('#rail-kicker');
  const railTitle = $('#rail-title');
  const railCopy = $('#rail-copy');
  const railMaterial = $('#rail-material');
  const railPurpose = $('#rail-purpose');
  const railNextLabel = $('#rail-next-label');
  let activeDetail = 0;
  let activeView = 'front';

  function setImage(img, src, alt, onError) {
    if (!img) return;
    const next = new Image();
    next.onload = () => {
      img.style.opacity = '0';
      window.setTimeout(() => {
        img.src = src;
        img.alt = alt;
        img.style.opacity = '1';
      }, 120);
    };
    next.onerror = () => {
      img.style.opacity = '1';
      if (onError) onError();
    };
    next.src = src;
  }

  function setView(key, updateDefaultDetail = false) {
    const item = views[key];
    if (!item || !packageImg) return;
    activeView = key;
    setImage(
      packageImg,
      asset(item.src),
      `${item.title} of the DHUNERI single-origin large cardamom vessel`,
      () => { if (viewCaption) viewCaption.textContent = 'Image loaded.'; }
    );
    const countEl = $('#view-count');
    if (countEl) countEl.textContent = item.count;
    if (viewCaption) viewCaption.textContent = item.caption;

    // Show hotspots only on the front view
    $$('.hotspot').forEach((b) => {
      b.style.display = key === 'front' ? 'grid' : 'none';
    });

    $$('[data-view]').forEach((b) => {
      const active = b.dataset.view === key;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('is-active', active);
    });

    if (updateDefaultDetail && key === 'front') {
      selectDetail(0, false);
    }
  }

  function selectDetail(index, changeView = true) {
    const item = detailPoints[index];
    if (!item) return;
    activeDetail = index;
    if (railKicker) railKicker.textContent = item.kicker;
    if (railTitle) railTitle.textContent = item.title;
    if (railCopy) railCopy.textContent = item.copy;
    if (railMaterial) railMaterial.textContent = item.material;
    if (railPurpose) railPurpose.textContent = item.purpose;
    if (railNextLabel) railNextLabel.textContent = item.next;

    $$('.hotspot').forEach((b) => {
      b.classList.toggle('is-current', Number(b.dataset.hotspot) === index);
    });

    if (changeView && item.view !== activeView) {
      setView(item.view);
    }
  }

  $$('[data-view]').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });

  $$('[data-hotspot]').forEach((button) => {
    button.addEventListener('click', () => selectDetail(Number(button.dataset.hotspot), false));
  });

  $('#rail-next')?.addEventListener('click', () => {
    const next = (activeDetail + 1) % detailPoints.length;
    selectDetail(next, true);
  });

  function selectPrinciple(index) {
    const item = promiseDetails[index];
    if (!item) return;
    $$('.principle-tab').forEach((tab) => {
      const active = Number(tab.dataset.principle) === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    const noEl = $('#principle-number');
    if (noEl) noEl.textContent = item.no;
    const headingEl = $('#principle-heading');
    if (headingEl) headingEl.textContent = item.title;
    const descEl = $('#principle-description');
    if (descEl) descEl.textContent = item.desc;
    const progEl = $('#principle-progress');
    if (progEl) progEl.innerHTML = `${String(index + 1).padStart(2, '0')} <i>/</i> 05`;
    const statusEl = $('#principle-status');
    if (statusEl) {
      statusEl.textContent = item.status;
      statusEl.className = `status-pill ${item.statusClass}`;
    }
    const img = $('#principle-visual img');
    if (img) setImage(img, asset(item.image), item.alt);
  }

  $$('.principle-tab').forEach((tab) => {
    tab.addEventListener('click', () => selectPrinciple(Number(tab.dataset.principle)));
  });

  function selectFormat(key) {
    const item = formatDetails[key];
    if (!item) return;
    const img = $('#format-image');
    if (img) setImage(img, asset(item.src), item.alt);
    const labelEl = $('#format-image-label');
    if (labelEl) labelEl.textContent = item.label;
    const descEl = $('#format-description');
    if (descEl) descEl.textContent = item.desc;
    $$('[data-format]').forEach((b) => {
      const active = b.dataset.format === key;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  $$('[data-format]').forEach((button) => {
    button.addEventListener('click', () => selectFormat(button.dataset.format));
  });

  // Modal dialog for the brand board
  const dialog = $('#board-dialog');
  $('#zoom-board')?.addEventListener('click', () => dialog?.showModal());
  $('#brand-board-trigger')?.addEventListener('click', () => dialog?.showModal());
  $('#close-board')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Smooth editorial reveal on scroll
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = $$(
      '.section-heading, .explorer-grid, .principles-layout, .format-showcase, .brand-board-frame, .hero-grid'
    );
    targets.forEach((el) => el.classList.add('reveal-pending'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  // Initialize defaults
  selectDetail(0, false);
  selectPrinciple(0);
  selectFormat('pouch');
  setView('front');
})();
