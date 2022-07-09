(function() {
    const $inputEmail = document.getElementById('login-form-email');
    const $inputPassword = document.getElementById('login-form-password');
    const $inputErrorMsg = document.getElementById('login-email-error');
    const $passwordErrorMsg = document.getElementById('login-password-error');
    const $loginErrorMsg = document.getElementById('login-error');
    const $submitBtn = document.getElementById('login-form-submitBtn');

    function inputError($input, $errMsg, msg) {
        $errMsg.innerText = msg;
        if ($input) {
            $input.classList.add('err');
            $input.classList.remove('valid');
        }
    }

    function deleteError($input, $errMsg) {
        $errMsg.innerText = '';
        if($input) $input.classList.remove('err');
    }

    $inputEmail.addEventListener('focusin', () => {
        deleteError($inputEmail, $inputErrorMsg);
    })
    
    $inputPassword.addEventListener('focusin', () => {
        deleteError($inputPassword, $passwordErrorMsg);
    })

    // 로그인 요청 fetch
    $submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        deleteError($inputEmail, $inputErrorMsg);
        deleteError($inputPassword, $passwordErrorMsg);
        deleteError(null, $loginErrorMsg);

        const email = $inputEmail.value;
        const password = $inputPassword.value;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({email, password})
        }

        if (!email) return inputError($inputEmail, $inputErrorMsg, '아이디 또는 이메일을 입력해주세요.');
        if (!password) return inputError($inputPassword, $passwordErrorMsg, '비밀번호를 입력해주세요.');

        try {
            const response = await fetch('/login', options);

            if (response.redirected) window.location.href = response.url;
            if (response.status === 204) {
                inputError(null, $loginErrorMsg, '아이디 또는 비밀번호를 확인해주세요.');
            }
        } catch(e) {
            console.log(e);
        }
    })
})();