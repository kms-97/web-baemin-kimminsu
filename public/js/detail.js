(function() {
    const $emailDuplicationCheckBtn = document.getElementById('email-duplicate');
    const $emailInput = document.getElementById('email-input');
    const $emailValidMark = document.getElementById('email-validate');
    const $additionalInfo = document.getElementById('additional');

    $emailDuplicationCheckBtn.addEventListener('click', () => {
        const email = $emailInput.value;
        if (!email) return;

        $emailValidMark.style.display = 'block';
        $additionalInfo.style.display = 'block';
    })
})();