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
    const $birthInput = document.getElementById('birth-input');
    const $birthErrorMsg = document.getElementById('birth-error');
    const $birthValidMark = document.getElementById('birth-validate');
    const $nextBtn = document.getElementById('header-nextBtn');
    const allInputs = document.querySelectorAll('input');

    function inputError($input, $errMsg, msg) {
        $errMsg.innerText = msg;
        $input.classList.add('err');
        $input.classList.remove('valid');
    }

    function deleteError($input, $errMsg) {
        $errMsg.innerText = '';
        $input.classList.remove('err');
    }

    function showValidMark($input, $validMark, display) {
        $input.classList.add('valid');
        $validMark.style.display = display;
    }

    function hideValidMark($input, $validMark) {
        $input.classList.remove('valid');
        $validMark.style.display = 'none';
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

    function removeNotNumberOrDotChar(str) {
        return str.replace(/[^\d.]/g, '');
    }

    function isDateFormat(str) {
        const dateReg = /(\d{4}).(\d{2}).(\d{2})/;
        return dateReg.test(str);
    }

    function dateValidation() {
        const dateInput = $birthInput.value;
        if (dateInput.length !== 10) return hideValidMark($birthInput, $birthValidMark);
        if (!isDateFormat(dateInput)) return hideValidMark($birthInput, $birthValidMark);
        
        const date = new Date(dateInput.split('.').join('-'));
        const timestamp = date.getTime();
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return inputError($birthInput, $birthErrorMsg, '유효한 날짜를 입력해주세요.');
        }
    
        deleteError($birthInput, $birthErrorMsg);
        showValidMark($birthInput, $birthValidMark, 'inline-block')
    }

    function insertDot(str) {
        const len = str.length;

        if (len === 4) return `${str}.`;
        if (len === 6) {
            if (str[5] > 1) return `${str.slice(0, 5)}0${str[5]}.`
            else return str;
        }
        if (len === 7) return `${str}.`;
        if (len === 9) {
            if (str[8] > 3) return `${str.slice(0, 8)}0${str[8]}.`;
            else return str;
        }

        return str;
    }

    function isAllValid() {
        return ![...allInputs].map(input => input.classList.contains('valid')).includes(false);
    }

    function changeNextBtnState() {
        if(isAllValid()) $nextBtn.removeAttribute('disabled');
        else $nextBtn.setAttribute('disabled', true);
    }

    function validateEmail() {
        const email = $emailInput.value;
        if (!email) return;

        showValidMark($emailInput, $emailValidMark, 'block');
        $additionalInfo.style.display = 'block';
    }

    function validateNickname() {
        const nickname = $nicknameInput.value;
        if (nickname) showValidMark($nicknameInput, $nicknameValidMark, 'block');
        else hideValidMark($nicknameInput, $nicknameValidMark);
    }

    function validatePassword() {
        const password = $passwordInput.value;

        if (!isOverLength(password, 10)) {
            const msg = '비밀번호는 10자 이상이어야 합니다.';
            return inputError($passwordInput, $passwordErrorMsg, msg);
        }
        
        if (!isContainsLeastTwoType(password)) {
            const msg = '영어 대문자, 소문자, 숫자, 특수문자 중 2종류 이상을 조합해야 합니다.';
            return inputError($passwordInput, $passwordErrorMsg, msg);
        }
        
        if (isContainSameNumber(password) || isContainLinkedNumber(password)) {
            const msg = '같은 숫자 또는 연속된 숫자를 3개 이상 입력할 수 없습니다.';
            return inputError($passwordInput, $passwordErrorMsg, msg);
        }
        
        deleteError($passwordInput, $passwordErrorMsg);
        showValidMark($passwordInput, $passwordValidMark, 'inline-block');
    }

    function formatBirth(e) {
        if(e.key !== "Backspace") {
            const birth = $birthInput.value;
            const numStr = removeNotNumberOrDotChar(birth);
            $birthInput.value = insertDot(numStr);
        }

        dateValidation();
    }

    $emailDuplicationCheckBtn.addEventListener('click', validateEmail);

    $nicknameInput.addEventListener('change', validateNickname);

    $passwordInput.addEventListener('change', validatePassword);

    $birthInput.addEventListener('keyup', formatBirth);

    allInputs.forEach(el => el.addEventListener('blur', changeNextBtnState));

    // 회원가입 요청 fetch
    $nextBtn.addEventListener('click', async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: $emailInput.value,
                password: $passwordInput.value,
                nickname: $nicknameInput.value,
                birth: $birthInput.value,
            })
        }

        try {
            const response = await fetch('/signup', options);

            if (response.redirected) {
                window.location.href = response.url;
            }
        } catch (e) {
            console.log(e);
        }
    })
})();