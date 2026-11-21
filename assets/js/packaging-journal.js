(() => {
  const root = document.getElementById('dh-packaging-root') || document;
  const $ = (s, scope = root) => scope.querySelector(s);
  const $$ = (s, scope = root) => Array.from(scope.querySelectorAll(s));

  // Mobile menu for the standalone preview; the Ghost integration keeps the existing site header/nav.
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('demo-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      siteNav.classList.toggle('is-open', !open);
      navToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    $$('.site-nav a', siteNav).forEach(link => link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // Four-view packaging board. The original composite is preserved as one image;
  // hotspots highlight the matching area without cropping or changing its background.
  const viewInfo = {
    front: {
      no: '01', label: 'FRONT', title: 'The first<br><em>impression.</em>',
      copy: 'The product name, golden mascot, mountain motif and visible cardamom window create the front-of-pack identity.',
      caption: 'The front panel is the primary product-facing surface in this supplied concept.'
    },
    side: {
      no: '02', label: 'SIDE', title: 'A profile that<br><em>shows the form.</em>',
      copy: 'The side view reveals the pouch depth and gives a sense of how the pack stands when placed on a shelf or kitchen counter.',
      caption: 'The side panel is shown as a visual prototype; final dimensions and mandatory copy still need to be confirmed.'
    },
    back: {
      no: '03', label: 'REVERSE', title: 'The information<br><em>panel.</em>',
      copy: 'The reverse is intended to carry product information, storage guidance, ingredients, batch details and other required label content.',
      caption: 'The supplied reverse artwork contains text and claims that must be corrected and verified before print.'
    },
    angle: {
      no: '04', label: 'ANGLE', title: 'The pack in<br><em>three dimensions.</em>',
      copy: 'The angled view brings the front identity and the pouch structure together, helping visitors understand the physical presentation.',
      caption: 'This is a supplied concept mockup, not a photograph of a finished retail pack.'
    }
  };
  const viewTabs = $$('[data-view]');
  const viewFocus = $('#view-focus');
  const backWarning = $('#back-warning');
  function setView(view, focus = true) {
    const data = viewInfo[view];
    if (!data) return;
    viewTabs.forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (viewFocus) viewFocus.className = `view-focus ${view}`;
    $('#view-kicker').innerHTML = `VIEW ${data.no} <i>·</i> ${data.label}`;
    $('#view-heading').innerHTML = data.title;
    $('#view-copy').textContent = data.copy;
    $('#view-caption').textContent = data.caption;
    if (backWarning) backWarning.hidden = view !== 'back';
    if (focus && window.matchMedia('(max-width: 760px)').matches) {
      $('#view-detail')?.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  }
  viewTabs.forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  setView('front', false);

  // Five-part packaging index.
  const parts = [
    {eyebrow:'THE FACE / IDENTITY', status:'VISIBLE IN THE SUPPLIED ARTWORK', title:'A recognisable<br><em>front of pack.</em>', copy:'The front brings together the product name, a golden cardamom character, Himalayan mountain imagery and a window showing the pods.', kind:'01 — IDENTITY'},
    {eyebrow:'THE FARMER PANEL / TRANSPARENCY', status:'PLANNED FOR THE FINAL PACK', title:'Put the grower<br><em>in the story.</em>', copy:'The planned farmer panel can carry a producer name, village and a genuine recorded statement. These details should only be added after the producer information and permissions are confirmed.', kind:'02 — PRODUCER'},
    {eyebrow:'THE BATCH CODE / TRACEABILITY', status:'TO CONNECT TO A REAL BATCH RECORD', title:'A code that<br><em>opens the story.</em>', copy:'A working QR code should lead to the exact batch record: its district, farm or farmer group, harvest date and curing batch. The QR shown in the concept board is illustrative until connected to live data.', kind:'03 — TRACEABILITY'},
    {eyebrow:'THE QUALITY SEAL / ASSURANCE', status:'DETAILS REQUIRE VERIFICATION', title:'Useful facts.<br><em>Clearly stated.</em>', copy:'The final quality panel should give accurate product details such as grade, net weight, harvest year and a verified moisture-check date. Certification marks and health claims should not appear without supporting evidence.', kind:'04 — QUALITY'},
    {eyebrow:'THE SHARE-BACK LINE / EARNINGS', status:'PLANNED TRANSPARENCY FEATURE', title:'Show how value<br><em>reaches the grower.</em>', copy:'The proposed share-back line can state a real farmer payment or batch contribution once the amount, method and agreement are documented. Do not publish an illustrative figure as an actual payout.', kind:'05 — SHARE-BACK'}
  ];
  const partTabs = $$('.part-tab');
  function setPart(index, focusTab = false) {
    const data = parts[index];
    if (!data) return;
    partTabs.forEach((button, i) => {
      const active = i === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const panel = $('#part-panel');
    panel.setAttribute('aria-labelledby', `part-tab-${index}`);
    $('#part-panel-no').textContent = `${String(index + 1).padStart(2,'0')} / 05`;
    $('#part-panel-status').textContent = data.status;
    $('#part-panel-eyebrow').textContent = data.eyebrow;
    $('#part-panel-title').innerHTML = data.title;
    $('#part-panel-copy').textContent = data.copy;
    $('#part-panel-kind').textContent = data.kind;
    if (focusTab) partTabs[index].focus();
  }
  partTabs.forEach((button, index) => {
    button.addEventListener('click', () => setPart(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (['ArrowDown','ArrowRight'].includes(event.key)) next = (index + 1) % partTabs.length;
      else if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index - 1 + partTabs.length) % partTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = partTabs.length - 1;
      else return;
      event.preventDefault();
      setPart(next, true);
    });
  });
  setPart(0);

  // Three packaging formats, all taken from the same original lineup image.
  const formats = {
    pouch: {kicker:'FORMAT 01 / MAIN PACKAGING CONCEPT', title:'Stand-up pouch', copy:'The pouch is the central format in the supplied artwork, with a kraft finish, forest-green label and visible product window.', focus:'pouch'},
    tin: {kicker:'FORMAT 02 / ALTERNATIVE CONCEPT', title:'Metal tin', copy:'The tin presents the same product identity in a rigid container concept. Its final dimensions, material and closure would need to be confirmed.', focus:'tin'},
    jar: {kicker:'FORMAT 03 / ALTERNATIVE CONCEPT', title:'Glass jar', copy:'The glass jar makes the cardamom visible from more angles. Weight, glass specification and protective packaging would need to be decided before production.', focus:'jar'}
  };
  const formatButtons = $$('[data-format]');
  const formatFocus = $('#format-focus');
  function setFormat(format) {
    const data = formats[format];
    if (!data) return;
    formatButtons.forEach(button => {
      const active = button.dataset.format === format;
      button.classList.toggle('is-active', active);
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    formatFocus.className = `format-focus ${data.focus}`;
    $('#format-kicker').textContent = data.kicker;
    $('#format-title').textContent = data.title;
    $('#format-description').textContent = data.copy;
  }
  formatButtons.forEach(button => button.addEventListener('click', () => setFormat(button.dataset.format)));
  setFormat('pouch');

  // Golden mascot sheet: the selected expression gets a consistent focus frame.
  const expressions = {
    0: {title:'The relaxed smile.', copy:'A friendly, open expression that makes the product approachable while keeping the golden cardamom character at the centre.'},
    1: {title:'A moment of delight.', copy:'The laughing expression adds energy for lighter brand moments, recipe content and social storytelling.'},
    3: {title:'A thoughtful pause.', copy:'A curious, thinking expression can help introduce product facts or invite visitors to discover more.'},
    7: {title:'A little celebration.', copy:'The raised-arm expression is suited to celebratory messages, milestones and Nepal-origin storytelling.'},
    10:{title:'Quiet confidence.', copy:'The confident expression can support product introductions and moments where the character stands alongside the pack.'}
  };
  const expressionButtons = $$('[data-expression]');
  const expressionFocus = $('#character-focus');
  const characterHotspots = $$('.character-hotspots button');
  function setExpression(index) {
    const data = expressions[index];
    if (!data) return;
    expressionButtons.forEach(button => {
      const active = Number(button.dataset.expression) === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const col = index % 5;
    const row = Math.floor(index / 5);
    expressionFocus.style.left = `${col * 20}%`;
    expressionFocus.style.top = `${row * (100 / 3)}%`;
    $('#expression-number').textContent = String(index + 1).padStart(2,'0');
    $('#expression-title').textContent = data.title;
    $('#expression-copy').textContent = data.copy;
  }
  const expressionIndexes = [0,1,3,7,10];
  characterHotspots.forEach((button, i) => {
    const index = expressionIndexes[i];
    button.dataset.expression = String(index);
    button.style.gridColumn = String((index % 5) + 1);
    button.style.gridRow = String(Math.floor(index / 5) + 1);
  });
  expressionButtons.forEach(button => button.addEventListener('click', () => setExpression(Number(button.dataset.expression))));
  setExpression(0);

  // Original brand board opens in a native, keyboard-accessible dialog.
  const boardDialog = $('#board-dialog');
  const openBoard = () => { if (boardDialog?.showModal) boardDialog.showModal(); };
  $('#board-zoom')?.addEventListener('click', openBoard);
  $('#brand-board-image')?.addEventListener('click', openBoard);
  $('#close-board')?.addEventListener('click', () => boardDialog?.close());
  boardDialog?.addEventListener('click', event => {
    if (event.target === boardDialog) boardDialog.close();
  });
})();
