document.addEventListener('DOMContentLoaded', () => {
    const calculatorCards = document.querySelectorAll('.calculator-card');
    const results = []; // 各カードの計算結果を保存する配列

    calculatorCards.forEach((card, index) => {
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
            const companyName = companyNameEl.value.trim();

            if (isNaN(price) || isNaN(rolls) || isNaN(length) || rolls <= 0 || length <= 0) {
                resultEl.textContent = '数値を入力してください';
                results[index] = null; // 無効な結果としてマーク
                updateOverallCheapest();
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
                results[index] = {
                    pricePerMeter: pricePerMeter,
                    companyName: companyName || `商品${index + 1}` // 商品名がない場合はデフォルト名
                };
            } else {
                resultEl.textContent = '計算エラー';
                results[index] = null; // 無効な結果としてマーク
            }
            updateOverallCheapest();
        });

        resetBtn.addEventListener('click', () => {
            priceEl.value = '';
            rollsEl.value = '';
            lengthEl.value = '';
            companyNameEl.value = '';
            taxTypeEl.selectedIndex = 0;
            resultEl.textContent = '';
            results[index] = null; // 結果をリセット
            updateOverallCheapest();
        });
    });

    // 最安値表示用の要素をHTMLに追加
    const cheapestDisplay = document.createElement('div');
    cheapestDisplay.id = 'cheapest-display';
    cheapestDisplay.innerHTML = '<h2>最安値: <span id="cheapest-value">--</span></h2>';
    document.querySelector('.container').appendChild(cheapestDisplay);

    function updateOverallCheapest() {
        let minPrice = Infinity;
        let cheapestProduct = 'なし';

        results.forEach(item => {
            if (item && item.pricePerMeter < minPrice) {
                minPrice = item.pricePerMeter;
                cheapestProduct = `${item.companyName} (${minPrice.toFixed(2)}円/m)`;
            }
        });

        const cheapestValueEl = document.getElementById('cheapest-value');
        if (cheapestValueEl) {
            cheapestValueEl.textContent = cheapestProduct;
        }
    }
});
