(function () {
  'use strict';
  var steps = Array.prototype.slice.call(document.querySelectorAll('.craft-story-step'));
  var panel = document.getElementById('craft-stage-panel');
  if (!steps.length || !panel) return;

  var image = panel.querySelector('[data-stage-image]');
  var visual = panel.querySelector('[data-stage-visual]');
  var credit = panel.querySelector('[data-stage-credit]');
  var title = panel.querySelector('[data-stage-title]');
  var kicker = panel.querySelector('[data-stage-kicker]');
  var description = panel.querySelector('[data-stage-description]');
  var facts = panel.querySelector('[data-stage-facts]');
  var index = panel.querySelector('[data-stage-index]');
  var previous = panel.querySelector('[data-stage-prev]');
  var next = panel.querySelector('[data-stage-next]');
  var activeIndex = 0;

  var stageData = {
    plant: {
      number: '01', label: 'Stage 01 · Growing conditions', title: 'The plant.',
      description: 'Large cardamom (<em>Amomum subulatum</em>) grows 1.5–3.0 metres tall in humid shade. In the eastern hills, it grows at 765–1,675 metres, with temperatures of 4–20°C and 2,000–2,500 mm of rain.',
      image: '/assets/images/craft/alaichi.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Alaichi.jpg/960px-Alaichi.jpg',
      alt: 'Large cardamom plant at Godavari, Lalitpur, Nepal',
      credit: 'Field reference · Godavari, Lalitpur', author: 'Janak Bhatta · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Alaichi.jpg',
      facts: [['1.5–3.0 m','Plant height'],['765–1,675 m','Growing elevation'],['4–20°C','Temperature'],['2,000–2,500 mm','Rainfall']]
    },
    harvest: {
      number: '02', label: 'Stage 02 · Harvest', title: 'The harvest.',
      description: 'Ripe red capsules are hand-picked at the base of the plant. The harvest season begins around August, according to the process brief.',
      image: '/assets/images/craft/tehrathum-cardamom.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Tehrathum_cash_crop_cardamom.JPG',
      alt: 'Large cardamom growing area in Tehrathum district, Nepal',
      credit: 'Cardamom-growing area · Tehrathum, Nepal', author: 'Bikash Bhattarai · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Tehrathum_cash_crop_cardamom.JPG',
      facts: [['Ripe red','Capsules selected'],['By hand','Harvest method'],['Around August','Harvest season begins']]
    },
    cure: {
      number: '03', label: 'Stage 03 · Curing', title: 'The cure.',
      description: 'Pods are cured for roughly 48–72 hours over a low wood-fire smoulder in the traditional bhatti. Direct smoke contact gives large cardamom its distinctive smoky, camphor-rich character.',
      image: '/assets/images/craft/bhatti-structure.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/A_Bhatti_%28where_some_stuffs_are_cooked_or_dried%29.jpg/1280px-A_Bhatti_%28where_some_stuffs_are_cooked_or_dried%29.jpg',
      alt: 'A traditional bhatti structure in Nepal, used for cooking or drying',
      credit: 'Bhatti structure · Nepal, location not recorded', author: 'Iceshra · CC BY-SA 4.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:A_Bhatti_(where_some_stuffs_are_cooked_or_dried).jpg',
      facts: [['48–72 hours','Approximate curing time'],['Low wood fire','Heat source'],['Smoke contact','Builds smoky character']]
    },
    grade: {
      number: '04', label: 'Stage 04 · Grading & quality gate', title: 'Grading & quality.',
      description: 'After curing, pods are graded by size and colour. Moisture is measured, and only whole, well-cured pods carry the DHUNERI mark.',
      image: '/assets/images/craft/large-cardamom-pods.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/BlackCardamom.jpg/960px-BlackCardamom.jpg',
      alt: 'Dried large cardamom pods',
      credit: 'Large cardamom pods · product reference', author: 'Brian Arthur · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:BlackCardamom.jpg',
      facts: [['Size','Grading criterion'],['Colour','Grading criterion'],['Moisture','Measured after curing'],['Whole pods','DHUNERI quality gate']]
    },
    pack: {
      number: '05', label: 'Stage 05 · Packing & batch code', title: 'Packing & batch code.',
      description: 'The pods are sealed in aroma-barrier pouches. Each pouch is coded to its farm, creating a link between the pack and the place where the crop began.',
      image: '/assets/images/craft/large-cardamom-pods.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/BlackCardamom.jpg/960px-BlackCardamom.jpg',
      alt: 'Dried large cardamom pods, shown as a product reference',
      credit: 'Large cardamom pods · product reference', author: 'Brian Arthur · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:BlackCardamom.jpg',
      facts: [['Aroma-barrier','Pouch type'],['Farm-coded','Batch link'],['Origin to pack','Traceability direction']]
    },
    you: {
      number: '06', label: 'Stage 06 · To you', title: 'To you.',
      description: 'The process journey ends at your kitchen. The brief describes dispatch across Nepal and export with full documentation, carrying the origin and craft behind every pod.',
      image: '/assets/images/craft/large-cardamom-pods.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/BlackCardamom.jpg/960px-BlackCardamom.jpg',
      alt: 'Dried large cardamom pods',
      credit: 'Large cardamom pods · product reference', author: 'Brian Arthur · CC BY-SA 3.0',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:BlackCardamom.jpg',
      facts: [['Across Nepal','Domestic dispatch'],['Full documentation','For export']]
    }
  };

  function renderFacts(items) {
    facts.innerHTML = '';
    items.forEach(function (item) {
      var cell = document.createElement('div');
      var value = document.createElement('strong');
      var label = document.createElement('span');
      value.textContent = item[0];
      label.textContent = item[1];
      cell.appendChild(value);
      cell.appendChild(label);
      facts.appendChild(cell);
    });
  }

  function setStage(nextIndex, moveFocus) {
    activeIndex = Math.max(0, Math.min(steps.length - 1, nextIndex));
    var step = steps[activeIndex];
    var data = stageData[step.getAttribute('data-stage')];
    if (!data) return;

    steps.forEach(function (button, i) {
      var selected = i === activeIndex;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      button.setAttribute('tabindex', selected ? '0' : '-1');
    });

    panel.setAttribute('aria-labelledby', step.id);
    kicker.textContent = data.label;
    title.textContent = data.title;
    description.innerHTML = data.description;
    index.textContent = data.number;
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === steps.length - 1;
    renderFacts(data.facts);
    visual.classList.add('is-changing');

    var stepAsset = step.getAttribute('data-stage-asset');
    var targetImage = stepAsset || data.image;

    var preload = new Image();
    preload.onload = function () {
      image.src = targetImage;
      image.alt = data.alt;
      var sourceLabel = document.createElement('span');
      var sourceLink = document.createElement('a');
      sourceLabel.textContent = data.credit;
      sourceLink.textContent = data.author;
      sourceLink.href = data.creditUrl;
      sourceLink.target = '_blank';
      sourceLink.rel = 'noopener noreferrer';
      credit.innerHTML = '';
      credit.appendChild(sourceLabel);
      credit.appendChild(sourceLink);
      requestAnimationFrame(function () { visual.classList.remove('is-changing'); });
    };
    preload.onerror = function () {
      if (data.fallback && preload.src !== data.fallback) {
        preload.src = data.fallback;
        return;
      }
      visual.classList.remove('is-changing');
      // Keep the previously visible image if a remote source is unavailable.
    };
    preload.src = targetImage;
    if (moveFocus) step.focus();
  }

  steps.forEach(function (step, i) {
    step.addEventListener('click', function () { setStage(i, false); });
    step.addEventListener('keydown', function (event) {
      var target = i;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (i + 1) % steps.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (i - 1 + steps.length) % steps.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = steps.length - 1;
      else return;
      event.preventDefault();
      setStage(target, true);
    });
  });
  previous.addEventListener('click', function () { setStage(activeIndex - 1, false); });
  next.addEventListener('click', function () { setStage(activeIndex + 1, false); });
})();
