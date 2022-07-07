(function() {
    const $emailDuplicationCheckBtn = document.getElementById('email-duplicate');
    const $emailInput = document.getElementById('email-input');
    const $emailValidMark = document.getElementById('email-validate');
    const $additionalInfo = document.getElementById('additional');
    const $nicknameInput = document.getElementById('nickname-input');
    const $nicknameValidMark = document.getElementById('nickname-validate');

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
})();