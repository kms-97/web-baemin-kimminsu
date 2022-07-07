(function() {
    const $phoneInput = document.getElementById('phone-input');
    const $phoneInputLabel = document.getElementById('phone-wrap');
    const $phoneInputValidMark = document.getElementById('phone-valitdate');
    const $phoneInputRemoveBtn = document.getElementById('phone-remove');

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
        $phoneInputValidMark.style.display = isPhoneNumberFormat($phoneInput.value) ? 'block' : 'none';
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
})();