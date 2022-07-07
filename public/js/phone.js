(function() {
    const $phoneInput = document.getElementById('phone-input');
    const $phoneInputValidMark = document.getElementById('phone-valitdate');

    function removeNotNumberChar(str) {
        return str.replace(/[^\d]/g, '');
    }

    function insertHyhpen(str) {
        return str.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-*$/, '');
    }

    function isPhoneNumberFormat(str) {
        return /^\d{3}-\d{4}-\d{4}$/.test(str);
    }

    $phoneInput.addEventListener('keyup', () => {
        const numStr = removeNotNumberChar($phoneInput.value);
        const hypenStr = insertHyhpen(numStr);
        $phoneInput.value = hypenStr 

        if (isPhoneNumberFormat(hypenStr)) {
            $phoneInputValidMark.style.display = 'block';
        } else {
            $phoneInputValidMark.style.display = 'none';
        }
    })
})();