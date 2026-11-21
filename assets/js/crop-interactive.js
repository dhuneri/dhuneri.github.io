/* DHUNERI — Section 02B (The Crop) Interactive Module
   Vanilla JS, zero dependencies, loaded with defer. */
(function () {
    'use strict';

    var cropSection = document.getElementById('crop');
    if (!cropSection) return;

    /* ---------- 1. District Terroir Module ---------- */
    var districtData = {
        taplejung: {
            alt: '1,800m – 2,200m',
            title: 'Taplejung Terroir:',
            desc: 'Glacial air beneath Mt. Kanchenjunga yields dense, resinous pods with penetrating camphor depth and wild herbal strength.'
        },
        panchthar: {
            alt: '1,500m – 1,900m',
            title: 'Panchthar Terroir:',
            desc: 'Shaded mountain gullies and cold mountain streams produce balanced pods with refined sweetness and rich woody aroma.'
        },
        ilam: {
            alt: '1,400m – 1,800m',
            title: 'Ilam Terroir:',
            desc: 'Perpetual monsoon mist and rich Himalayan alder soil yield high essential-oil concentration and delicate herbal warmth.'
        },
        sankhuwasabha: {
            alt: '1,200m – 1,700m',
            title: 'Sankhuwasabha Terroir:',
            desc: 'Deep Arun River canyon slopes home to ancient wild cardamom lineages prized for robust, earthy smoke resonance.'
        }
    };

    var districtBtns = cropSection.querySelectorAll('.crop-district-btn');
    var altBadge = document.getElementById('cropAlt');
    var terroirText = document.getElementById('cropTerroirText');

    districtBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            districtBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');

            var distKey = btn.getAttribute('data-district');
            var data = districtData[distKey];
            if (data && altBadge && terroirText) {
                altBadge.textContent = data.alt;
                terroirText.innerHTML = '<strong>' + data.title + '</strong> ' + data.desc;
            }
        });
    });

    /* ---------- 2. Specimen Hotspots & Tabs ---------- */
    var spotData = {
        '1': {
            num: '01',
            title: 'The Ribbed Capsule',
            desc: 'Thick, longitudinally furrowed outer husk that shields precious volatile essential oils against torrential Himalayan monsoon rains.'
        },
        '2': {
            num: '02',
            title: 'The Resinous Heart of Seeds',
            desc: 'Cracked pod reveals 20 to 40 tightly clustered dark seeds packed with 1,8-cineole, cooling herbal notes, and lingering sweetness.'
        },
        '3': {
            num: '03',
            title: 'The Traditional Bhatti Smoke',
            desc: 'Slow-cured for 24 to 36 hours over native Himalayan alder (Utis) woodsmoke in traditional stone hearths, imparting its signature smoky soul.'
        }
    };

    var pins = cropSection.querySelectorAll('.specimen-pin');
    var tabBtns = cropSection.querySelectorAll('.specimen-tab-btn');
    var spotTitle = document.getElementById('spotTitle');
    var spotDesc = document.getElementById('spotDesc');

    function selectHotspot(spotId) {
        pins.forEach(function (pin) {
            var isActive = pin.getAttribute('data-spot') === spotId;
            pin.classList.toggle('is-active', isActive);
        });

        tabBtns.forEach(function (tab) {
            var isActive = tab.getAttribute('data-spot') === spotId;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        var data = spotData[spotId];
        if (data && spotTitle && spotDesc) {
            spotTitle.innerHTML = '<span class="spot-num">' + data.num + '</span> ' + data.title;
            spotDesc.textContent = data.desc;
        }
    }

    pins.forEach(function (pin) {
        pin.addEventListener('click', function () {
            selectHotspot(pin.getAttribute('data-spot'));
        });
        pin.addEventListener('mouseenter', function () {
            selectHotspot(pin.getAttribute('data-spot'));
        });
    });

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            selectHotspot(btn.getAttribute('data-spot'));
        });
    });
})();
