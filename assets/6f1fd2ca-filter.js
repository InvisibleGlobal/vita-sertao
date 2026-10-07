document.addEventListener('change', function (event) {
    var select = event.target;
    if (!(select instanceof HTMLSelectElement) || !select.hasAttribute('data-vs-filter-target')) {
        return;
    }

    var targetSelector = select.getAttribute('data-vs-filter-target') || '';
    var filterAttr = select.getAttribute('data-vs-filter-attr') || 'municipios';
    if (targetSelector === '') {
        return;
    }

    var selected = select.value;
    var attributeName = 'data-' + filterAttr;
    var cards = document.querySelectorAll(targetSelector);

    cards.forEach(function (card) {
        var rawValue = card.getAttribute(attributeName) || 'todos';
        var values = rawValue.split(',').map(function (item) {
            return item.trim();
        });

        if (selected === 'todos' || values.includes('todos') || values.includes(selected)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

(function () {
    function applyPhoneMask() {
        if (typeof window.Inputmask === 'undefined') {
            return;
        }

        var fields = document.querySelectorAll('.campo-telefone');
        if (!fields.length) {
            return;
        }

        var mask = new window.Inputmask({
            mask: ['(99) 9999-9999', '(99) 99999-9999'],
            keepStatic: true,
            clearIncomplete: true
        });

        fields.forEach(function (field) {
            mask.mask(field);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPhoneMask, { once: true });
        return;
    }

    applyPhoneMask();
})();
