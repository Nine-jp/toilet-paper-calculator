document.addEventListener('DOMContentLoaded', () => {
    const calculatorCards = document.querySelectorAll('.calculator-card');

    calculatorCards.forEach(card => {
        const calculateBtn = card.querySelector('.calculate-btn');
        const resetBtn = card.querySelector('.reset-btn');
        const resultEl = card.querySelector('.result');

        const priceEl = card.querySelector('.price');
        const taxTypeEl = card.querySelector('.tax-type');
        const rollsEl = card.querySelector('.rolls');
        const lengthEl = card.querySelector('.length');
        const companyNameEl = card.querySelector('.company-name');

        calculateBtn.addEventListener('click', () => {
            const price = parseFloat(priceEl.value);
            const taxType = taxTypeEl.value;
            const rolls = parseInt(rollsEl.value, 10);
            const length = parseFloat(lengthEl.value);

            if (isNaN(price) || isNaN(rolls) || isNaN(length) || rolls <= 0 || length <= 0) {
                resultEl.textContent = '数値を入力してください';
                return;
            }

            let priceWithTax = price;
            if (taxType === 'excluded') {
                priceWithTax = price * 1.10; // 10%の消費税を想定
            }

            const totalLength = rolls * length;
            const pricePerMeter = priceWithTax / totalLength;

            if (isFinite(pricePerMeter)) {
                resultEl.textContent = `1mあたり: ${pricePerMeter.toFixed(2)}円`;
            } else {
                resultEl.textContent = '計算エラー';
            }
        });

        resetBtn.addEventListener('click', () => {
            priceEl.value = '';
            rollsEl.value = '';
            lengthEl.value = '';
            companyNameEl.value = '';
            taxTypeEl.selectedIndex = 0;
            resultEl.textContent = '';
        });
    });
});
