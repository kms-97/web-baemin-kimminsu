(function() {
    const $phoneInput = document.getElementById('phone-input');
    const $phoneInputLabel = document.getElementById('phone-wrap');
    const $phoneInputValidMark = document.getElementById('phone-valitdate');
    const $phoneInputRemoveBtn = document.getElementById('phone-remove');
    const $confirmStartBtn = document.getElementById('confirm-start-btn');
    const $confirmSection = document.getElementById('confirm');

    function removeNotNumberChar(str) {
        return str.replace(/[^\d]/g, '');
    }

    function insertHyhpen(str) {
        return str.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-*$/, '');
    }

    function isPhoneNumberFormat(str) {
        return /^\d{3}-\d{4}-\d{4}$/.test(str);
    }

    function changePhoneInputValidState() {
        const isValid = isPhoneNumberFormat($phoneInput.value);
        $phoneInputValidMark.style.display = isValid ? 'block' : 'none';
        changeConfirmStartBtnState(isValid);
    }

    function changeConfirmStartBtnState(boolean) {
        if (boolean) $confirmStartBtn.removeAttribute('disabled');
        else $confirmStartBtn.setAttribute('disabled', true);
    }

    function generateRandomNumber() {
        const randomNumber = new Array(4);
        return randomNumber.fill().map(() => Math.floor(Math.random() * 8 + 1)).join('');
    }

    $phoneInput.addEventListener('keyup', () => {
        const numStr = removeNotNumberChar($phoneInput.value);
        $phoneInput.value = insertHyhpen(numStr);
    })

    $phoneInput.addEventListener('focusin', () => {
        $phoneInputRemoveBtn.style.display = 'block';
        $phoneInputValidMark.style.display = 'none';
    })

    window.addEventListener('click', (e) => {
        if (e.target.closest('label') === $phoneInputLabel) return;
        $phoneInputRemoveBtn.style.display = 'none';
        changePhoneInputValidState();
    })

    $phoneInputRemoveBtn.addEventListener('click', () => {
        $phoneInput.value = '';
    })

    $confirmStartBtn.addEventListener('click', () => {
        $confirmStartBtn.style.display = 'none';
        $phoneInput.setAttribute('readonly', true);
        $phoneInput.setAttribute('disabled', true);
        $confirmSection.style.display = 'block';
    })
})();