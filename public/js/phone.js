(function() {
    function removeNotNumberChar(str) {
        return str.replace(/\d/g, '');
    }

    function insertHyhpen(str) {
        return str.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-*$/, '');
    }
})();