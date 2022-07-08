(function() {
    const $allAgreeCheckBox = document.getElementById('accept-checkbox');
    const $allAgreeCheckBoxLabel = document.querySelector('#accept .term-item');
    const $termSection = document.getElementById('term');
    const $ageSection = document.getElementById('age');
    const $nextBtn = document.getElementById('next-nextBtn');
    const requiredCheckBoxes = document.querySelectorAll('.required');
    const optionalCheckBoxes = document.querySelectorAll('.optional');
    const ageRadioBtns = document.querySelectorAll('.age-radio');

    function isAllBoxChecked() {
        return ![...requiredCheckBoxes, ...optionalCheckBoxes].map(node => node.checked).includes(false);
    }

    function isAllRequiredCheckBoxChecked() {
        return ![...requiredCheckBoxes].map(node => node.checked).includes(false);
    }

    function isAgeChecked() {
        return [...ageRadioBtns].map(node => node.checked).includes(true);
    }

    function isAllRequiredTermsChecked() {
        return isAgeChecked() && isAllRequiredCheckBoxChecked();
    }

    function changeAllBoxState(boolean) {
        [...requiredCheckBoxes, ...optionalCheckBoxes].forEach(node => node.checked = boolean);
    }

    function changeAllAgreeBoxState(boolean) {
        $allAgreeCheckBox.checked = boolean;
    }

    function changeNextBtnActivateState(boolean) {
        if (boolean) $nextBtn.setAttribute('disabled', true);
        else $nextBtn.removeAttribute('disabled');
    }

    // 전체동의 버튼 활성화/비활성화
    $allAgreeCheckBoxLabel.addEventListener('click', () => {
        const state = $allAgreeCheckBox.checked;
        changeAllBoxState(state);
    })

    // 전체동의버튼 클릭시 다음페이지 버튼 활성화/비활성화
    $allAgreeCheckBoxLabel.addEventListener('click', () => {
        changeNextBtnActivateState(!isAllRequiredTermsChecked());
    })

    // 각 항목 클릭시 전체동의 버튼 활성화/비활성화
    $termSection.addEventListener('click', (e) => {
        const term = e.target.closest('label');
        if (!term) return;
        else changeAllAgreeBoxState(isAllBoxChecked());
    })

    // 각 항목 클릭시 다음 페이지 버튼 활성화/비활성화
    $termSection.addEventListener('click', (e) => {
        const $termLabel = e.target.closest('label');
        if (!$termLabel) return;
        else changeNextBtnActivateState(!isAllRequiredTermsChecked());
    })

    // 나이 선택시 다음 페이지 버튼 활성화/비활성화
    $ageSection.addEventListener('click', (e) => {
        const $ageLabel = e.target.closest('label');
        if (!$ageLabel) return;
        else changeNextBtnActivateState(!isAllRequiredTermsChecked());
    })
})();