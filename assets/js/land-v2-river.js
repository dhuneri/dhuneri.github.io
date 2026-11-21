(function () {
  'use strict';

  const root = document.querySelector('[data-land-river-profile]');
  if (!root) return;

  const assetCanopy = root.getAttribute('data-asset-canopy') || 'https://upload.wikimedia.org/wikipedia/commons/9/96/Alnus_nepalensis.JPG';
  const assetUnderstory = root.getAttribute('data-asset-understory') || 'https://upload.wikimedia.org/wikipedia/commons/0/09/Tehrathum_cash_crop_cardamom.JPG';
  const assetStream = root.getAttribute('data-asset-stream') || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Water_stream.jpg/1280px-Water_stream.jpg';

  const records = {
    canopy: {
      index: '01 / 03',
      photoIndex: '01 · CANOPY',
      location: 'PANCHKHAL VALLEY · NEPAL',
      title: 'Shade begins above the crop',
      description: 'This photograph shows Himalayan alder (Alnus nepalensis) in Panchkhal Valley, Nepal. It is a species reference for the canopy layer, not a photograph of a named DHUNERI partner farm.',
      image: assetCanopy,
      alt: 'Leaves and branches of Himalayan alder, Alnus nepalensis, in Panchkhal Valley, Nepal',
      credit: 'Photograph: Krish Dulal · CC BY-SA 3.0 · View source and licence ↗',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Alnus_nepalensis.JPG',
      foot: '01 Canopy'
    },
    understory: {
      index: '02 / 03',
      photoIndex: '02 · UNDERSTORY',
      location: 'TEHRATHUM · NEPAL',
      title: 'The crop grows beneath the shade',
      description: 'This archive photograph documents large-cardamom cultivation in Tehrathum district, Nepal. It provides a real crop reference; the people pictured are not identified as DHUNERI partners.',
      image: assetUnderstory,
      alt: 'People among large cardamom plants in Tehrathum district, Nepal',
      credit: 'Photograph: Bikash Bhattarai · CC BY-SA 3.0 · View source and licence ↗',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Tehrathum_cash_crop_cardamom.JPG',
      foot: '02 Understory'
    },
    stream: {
      index: '03 / 03',
      photoIndex: '03 · WATER',
      location: 'SIROLI · BAITADI, NEPAL',
      title: 'Water moving through the forest',
      description: 'This photograph documents Dhanra ko kholo in Siroli village, Baitadi district. It illustrates a Nepal watercourse; it is not a mapped stream on a named DHUNERI farm.',
      image: assetStream,
      alt: 'A small watercourse running through dense green forest in Siroli village, Baitadi district, Nepal',
      credit: 'Photograph: Nirajan Pant · CC BY-SA 3.0 · View source and licence ↗',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Water_stream.jpg',
      foot: '03 Water'
    }
  };

  const tabs = Array.from(root.querySelectorAll('[data-river-layer]'));
  const image = root.querySelector('[data-river-image]');
  const counter = root.querySelector('[data-river-counter]');
  const photoIndex = root.querySelector('[data-river-photo-index]');
  const location = root.querySelector('[data-river-location]');
  const title = root.querySelector('[data-river-title]');
  const description = root.querySelector('[data-river-description]');
  const credit = root.querySelector('[data-river-credit]');
  const panel = root.querySelector('#land-river-panel');
  const footSpans = Array.from(root.querySelectorAll('[data-river-foot]'));

  function selectLayer(key, focusTab) {
    const record = records[key];
    if (!record) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.riverLayer === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });

    image.classList.add('is-changing');
    const nextImage = new Image();
    nextImage.onload = () => {
      image.src = record.image;
      image.alt = record.alt;
      image.classList.remove('is-changing');
    };
    nextImage.onerror = () => {
      image.classList.remove('is-changing');
      image.alt = record.alt + ' (source image could not be loaded)';
    };
    nextImage.src = record.image;

    counter.textContent = record.index;
    photoIndex.textContent = record.photoIndex;
    location.textContent = record.location;
    title.textContent = record.title;
    description.textContent = record.description;
    credit.href = record.creditUrl;
    credit.textContent = record.credit;
    panel.setAttribute('aria-labelledby', 'land-river-tab-' + key);
    
    footSpans.forEach((span) => {
      span.classList.toggle('is-current', span.dataset.riverFoot === key);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectLayer(tab.dataset.riverLayer, false));
    tab.addEventListener('keydown', (event) => {
      let target = null;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== null) {
        event.preventDefault();
        selectLayer(tabs[target].dataset.riverLayer, true);
      }
    });
  });

  selectLayer('stream', false);
})();
