// Simulador de empréstimo: Tabela Price (parcelas fixas).

const form = document.getElementById('loan-form');
const submitButton = form.querySelector('button[type="submit"]');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const errorBox = document.getElementById('error');

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

let errorTimer;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    hideError();
    results.hidden = true;
    loading.hidden = false;
    submitButton.disabled = true;

    setTimeout(calculateResults, 600);
});

// Esconde o resultado anterior quando o usuário altera algum campo.
form.addEventListener('change', function () {
    results.hidden = true;
});

function calculateResults() {
    const principal = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('interest').value) / 100;
    const months = parseInt(document.getElementById('years').value, 10);

    const x = Math.pow(1 + rate, months);
    const monthly = rate === 0 ? principal / months : (principal * x * rate) / (x - 1);

    loading.hidden = true;
    submitButton.disabled = false;

    if (!(principal > 0 && months > 0 && isFinite(monthly))) {
        showError('Os dados inseridos não são válidos.');
        return;
    }

    const total = monthly * months;

    document.getElementById('monthly-payment').textContent = currency.format(monthly);
    document.getElementById('total-payment').textContent = currency.format(total);
    document.getElementById('total-interest').textContent = currency.format(total - principal);

    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    results.hidden = true;
    errorBox.textContent = message;
    errorBox.hidden = false;

    clearTimeout(errorTimer);
    errorTimer = setTimeout(hideError, 4000);
}

function hideError() {
    errorBox.hidden = true;
    errorBox.textContent = '';
}
