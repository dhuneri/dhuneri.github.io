/* DHUNERI homepage story interactions — no dependencies. */
(function () {
    'use strict';

    function initTabs(root, selector, stateKey, panelId, entries, onActivate) {
        if (!root) return;
        var tabs = Array.prototype.slice.call(root.querySelectorAll(selector));
        var panel = root.querySelector('#' + panelId);
        if (!tabs.length || !panel) return;

        function activate(tab, moveFocus) {
            var key = tab.getAttribute(stateKey);
            var entry = entries[key];
            if (!entry) return;

            tabs.forEach(function (item) {
                var active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
                item.setAttribute('tabindex', active ? '0' : '-1');
            });

            panel.setAttribute('aria-labelledby', tab.id);
            if (onActivate) onActivate(entry, key, panel);
            if (moveFocus) tab.focus();
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () { activate(tab, false); });
            tab.addEventListener('keydown', function (event) {
                var nextIndex = index;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
                else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === 'Home') nextIndex = 0;
                else if (event.key === 'End') nextIndex = tabs.length - 1;
                else return;
                event.preventDefault();
                activate(tabs[nextIndex], true);
            });
        });
    }

    var whyRoot = document.querySelector('[data-why-story]');
    if (whyRoot) {
        var whyEntries = {
            origin: {
                index: '01', kicker: '01 / AT ORIGIN', imageTitle: 'Grown in Nepal’s hills',
                title: 'Grown close to the source',
                description: 'Farmers cultivate large cardamom in the cool, moist and shaded hills of Nepal. The crop begins with local knowledge and work on the land.',
                image: whyRoot.getAttribute('data-asset-origin'),
                alt: 'People among large cardamom plants in Tehrathum, Nepal',
                credit: 'Photo: Bikash Bhattarai · CC BY-SA 3.0',
                creditUrl: 'https://commons.wikimedia.org/wiki/File:Tehrathum_cash_crop_cardamom.JPG'
            },
            raw: {
                index: '02', kicker: '02 / THE COMMODITY ROUTE', imageTitle: 'Black cardamom, product view',
                title: 'Much of the crop leaves unbranded',
                description: 'A large share of Nepal’s crop leaves the country before consumer-facing processing and branding. The pods travel, but much of their finished identity is added later.',
                image: whyRoot.getAttribute('data-asset-raw'),
                alt: 'Dried black cardamom pods in a sack',
                credit: 'Photo: CNEcija12345 · Manila · CC BY-SA 4.0',
                creditUrl: 'https://commons.wikimedia.org/wiki/File:Black_cardamom_pods.jpg'
            },
            value: {
                index: '03', kicker: '03 / VALUE ADDITION', imageTitle: 'Cardamom drying in Sankhuwasabha',
                title: 'The opportunity is in the craft',
                description: 'Curing, grading, packing and brand-building create value beyond the raw crop. DHUNERI’s ambition is to build more of those stages in Nepal and connect the finished product to its origin.',
                image: whyRoot.getAttribute('data-asset-value'),
                alt: 'People beside a stone cardamom-drying kiln during a 2013 project in Sankhuwasabha, Nepal',
                credit: 'Photo: Marcel Thiele · Sankhuwasabha · CC BY-SA 4.0',
                creditUrl: 'https://commons.wikimedia.org/wiki/File:Nepal_CSR_Project_Spices_for_Health_2013_-_Spicehunter_Purple_Cardamom.jpg'
            }
        };

        initTabs(whyRoot, '[data-why-stage]', 'data-why-stage', 'why-stage-panel', whyEntries, function (entry) {
            var image = whyRoot.querySelector('[data-why-image]');
            var stageVisual = whyRoot.querySelector('.why-stage-visual');
            var kicker = whyRoot.querySelector('[data-why-kicker]');
            var imageTitle = whyRoot.querySelector('[data-why-image-title]');
            var index = whyRoot.querySelector('[data-why-index]');
            var title = whyRoot.querySelector('[data-why-title]');
            var description = whyRoot.querySelector('[data-why-description]');
            var credit = whyRoot.querySelector('[data-why-credit]');
            if (stageVisual) stageVisual.classList.add('is-changing');
            if (image) {
                image.src = entry.image;
                image.alt = entry.alt;
            }
            if (kicker) kicker.textContent = entry.kicker;
            if (imageTitle) imageTitle.textContent = entry.imageTitle;
            if (index) index.textContent = entry.index;
            if (title) title.textContent = entry.title;
            if (description) description.textContent = entry.description;
            if (credit) {
                credit.href = entry.creditUrl;
                credit.textContent = entry.credit;
                credit.setAttribute('aria-label', 'Photo credit and licence: ' + entry.credit);
            }
            window.requestAnimationFrame(function () {
                if (stageVisual) stageVisual.classList.remove('is-changing');
            });
        });
    }

    var nameRoot = document.querySelector('[data-name-story]');
    if (nameRoot) {
        var nameEntries = {
            transformation: {
                index: '01', title: 'Transformation',
                description: 'The hearth is where fire changes food — and where the pod receives its smoke. The transformation is part of the name’s story.'
            },
            gratitude: {
                index: '02', title: 'Gratitude, practised',
                description: 'A small offering is placed each day before the family eats. Gratitude is practised, not only spoken.'
            },
            heritage: {
                index: '03', title: 'Heritage, preserved',
                description: 'The logo uses Sirijunga script, connecting the name to the preservation of Limbu identity.'
            },
            travels: {
                index: '04', title: 'A name that travels',
                description: 'Three soft syllables carry an echo of “dhuni” — the sacred fire — connecting the farmer’s hearth to kitchens further afield.'
            }
        };

        initTabs(nameRoot, '[data-name-meaning]', 'data-name-meaning', 'name-meaning-panel', nameEntries, function (entry) {
            var index = nameRoot.querySelector('[data-name-index]');
            var title = nameRoot.querySelector('[data-name-title]');
            var description = nameRoot.querySelector('[data-name-description]');
            if (index) index.textContent = entry.index;
            if (title) title.textContent = entry.title;
            if (description) description.textContent = entry.description;
        });
    }
}());
