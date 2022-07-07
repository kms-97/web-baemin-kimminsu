(function() {
    const $emailDuplicationCheckBtn = document.getElementById('email-duplicate');
    const $emailInput = document.getElementById('email-input');
    const $emailValidMark = document.getElementById('email-validate');
    const $additionalInfo = document.getElementById('additional');
    const $nicknameInput = document.getElementById('nickname-input');
    const $nicknameValidMark = document.getElementById('nickname-validate');
    const $passwordInput = document.getElementById('password-input');
    const $passwordErrorMsg = document.getElementById('password-error');
    const $passwordValidMark = document.getElementById('password-validate');

    function inputError($input, $errMsg, msg) {
        $errMsg.innerText = msg;
        $input.classList.add('err');
    }

    function isOverLength(str, length = 10) {
        return str.length >= length;
    }

    function isContainsLeastTwoType(str) {
        const smallAlpabetReg = /[a-z]/;
        const largeAlpabetReg = /[A-Z]/;
        const specialCharReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
        const numberReg = /\d/;
        
        return [smallAlpabetReg, largeAlpabetReg, specialCharReg, numberReg].map(reg => reg.test(str)).reduce((p, c) => p + c, 0) >= 2;
    }

    function isContainSameNumber(str) {
        const sameNumberReg = /(\d)\1{2}/;
        return sameNumberReg.test(str);
    }

    function isContainLinkedNumber(str) {
        const linkedNumberReg = /012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210/;
        return linkedNumberReg.test(str);
    }

    $emailDuplicationCheckBtn.addEventListener('click', () => {
        const email = $emailInput.value;
        if (!email) return;

        $emailValidMark.style.display = 'block';
        $additionalInfo.style.display = 'block';
    })

    $nicknameInput.addEventListener('change', () => {
        const nickname = $nicknameInput.value;
        if (nickname) $nicknameValidMark.style.display = 'block';
        else $nicknameValidMark.style.display = 'none';
    })

    $passwordInput.addEventListener('change', () => {
        const password = $passwordInput.value;

        if (!isOverLength(password, 10)) return inputError($passwordInput, $passwordErrorMsg, '비밀번호는 10자 이상이어야 합니다.');
        if (!isContainsLeastTwoType(password)) return inputError($passwordInput, $passwordErrorMsg, '영어 대문자, 소문자, 숫자, 특수문자 중 2종류 이상을 조합해야 합니다.');
        if (isContainSameNumber(password) || isContainLinkedNumber(password)) return inputError($passwordInput, $passwordErrorMsg, '같은 숫자 또는 연속된 숫자를 3개 이상 입력할 수 없습니다.');

        $passwordErrorMsg.value = '';
        $passwordInput.classList.remove('err');
        $passwordValidMark.style.display = 'block';
    })
})();