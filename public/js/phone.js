(function() {
    const $phoneInput = document.getElementById('phone-input');
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

    $phoneInput.addEventListener('focusout', () => {
        $phoneInputRemoveBtn.style.display = 'none';
        changePhoneInputValidState();
    })
})();