/**
 * DHUNERI — The Farmers of the Hearth
 * Clean Farmgate Impact Calculator · Ranjana Gurung (Makalu, Sankhuwasabha)
 */

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.getElementById('farmer-tin-slider');
    const tinCountDisplay = document.getElementById('slider-tin-count');
    const unitLabelDisplay = document.getElementById('slider-unit-label');
    const calcFarmerCash = document.getElementById('calc-farmer-cash');
    const calcNurseryFund = document.getElementById('calc-nursery-fund');
    const calcPctGain = document.getElementById('calc-pct-gain');
    const milestoneText = document.getElementById('calc-milestone-text');
    const presetButtons = document.querySelectorAll('.dhf-preset-btn');

    // Economic Parameters:
    // 1 tin = 50g = 0.050 kg
    // 1 mann = 40 kg = 800 tins
    // DHUNERI Direct Farmgate Rate (Ranjana): NPR 125.00 / tin (NPR 2,500/kg · NPR 100,000/mann guaranteed)
    // Makalu Nursery & Hearth Fund: NPR 25.00 / tin
    // Total Mountain Retention: NPR 150.00 / tin (NPR 3,000/kg)
    // Conventional Broker Depot Cut: NPR 64.00 / tin (NPR 1,280/kg auction average)
    // Surplus per tin: NPR 86.00 / tin (+134.4% farmer advantage)
    const CASH_PER_TIN = 125.00;
    const FUND_PER_TIN = 25.00;
    const BROKER_PER_TIN = 64.00;

    function formatNPR(num) {
        return 'NPR ' + Math.round(num).toLocaleString('en-US');
    }

    function updateCalculations(tins) {
        const farmerCash = tins * CASH_PER_TIN;
        const nurseryFund = tins * FUND_PER_TIN;
        const totalMountain = tins * (CASH_PER_TIN + FUND_PER_TIN);
        const surplusPerTin = (CASH_PER_TIN + FUND_PER_TIN) - BROKER_PER_TIN;
        const pctAdvantage = ((surplusPerTin / BROKER_PER_TIN) * 100).toFixed(1);

        const kg = (tins * 0.05).toFixed(1);
        const mann = (tins / 800).toFixed(2);

        if (tinCountDisplay) tinCountDisplay.textContent = tins;
        if (unitLabelDisplay) {
            unitLabelDisplay.textContent = `Tins (${kg} kg · ${mann} Mann)`;
        }

        if (calcFarmerCash) calcFarmerCash.textContent = formatNPR(farmerCash);
        if (calcNurseryFund) calcNurseryFund.textContent = formatNPR(nurseryFund);
        if (calcPctGain) calcPctGain.textContent = `+${pctAdvantage}%`;

        // Dynamic Real-World Milestone Message
        if (milestoneText) {
            if (tins <= 40) {
                milestoneText.innerHTML = `At <strong>${tins} tins</strong> (${kg} kg First Cut / ${mann} Mann), Ranjana receives <strong>${formatNPR(farmerCash)}</strong> in guaranteed direct cash. This funds clean rhizome propagation and compost preparation for her spring nursery beds.`;
            } else if (tins <= 120) {
                milestoneText.innerHTML = `At <strong>${tins} tins</strong> (${kg} kg First Cut / ${mann} Mann), Ranjana receives <strong>${formatNPR(farmerCash)}</strong> direct cash plus <strong>${formatNPR(nurseryFund)}</strong> for the Makalu nursery fund—covering seasoned alder firewood harvest and terrace ditching.`;
            } else if (tins <= 350) {
                milestoneText.innerHTML = `At <strong>${tins} tins</strong> (${kg} kg / ${mann} Mann), <strong>${formatNPR(totalMountain)}</strong> stays directly on the mountain holding. This provides capital to re-slate the stone bhatti roof, install fine curing mesh, and secure family reserves without debt.`;
            } else {
                milestoneText.innerHTML = `At <strong>${tins} tins</strong> (${kg} kg / ${mann} Mann — a full seasonal lot), <strong>${formatNPR(totalMountain)}</strong> stays in Sankhuwasabha. This guarantees complete multi-generational independence from foreign broker cycles, supporting her children's education and sustainable agroforestry.`;
            }
        }
    }

    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            updateCalculations(val);

            presetButtons.forEach(btn => {
                const btnVal = parseInt(btn.getAttribute('data-tins'), 10);
                if (btnVal === val) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }

    if (presetButtons.length > 0) {
        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = parseInt(btn.getAttribute('data-tins'), 10);
                if (slider) {
                    slider.value = val;
                }
                presetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateCalculations(val);
            });
        });
    }

    // Initialize with default 80 tins
    updateCalculations(80);
});
