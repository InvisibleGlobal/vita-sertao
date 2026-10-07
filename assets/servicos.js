/**
 * Página Serviços: busca da loja de atendimento mais próxima (template-parts/servicos/lojas.php).
 *
 * O CEP é consultado no ViaCEP (https://viacep.com.br) para descobrir o município. Se o município
 * tiver loja, mostra as lojas dele; senão, indica a loja do município mais próximo, pela distância
 * em linha reta entre as sedes municipais. Também dá para escolher o município direto na lista.
 */
(function () {
    'use strict';

    var root = document.querySelector('[data-vs-lojas]');

    if (!root) {
        return;
    }

    var form = root.querySelector('[data-vs-lojas-form]');
    var result = root.querySelector('[data-vs-lojas-result]');
    var cepInput = root.querySelector('#vs-lojas-cep');
    var select = root.querySelector('#vs-lojas-municipio');
    var cards = Array.prototype.slice.call(root.querySelectorAll('[data-vs-lojas-list] > .vs-loja'));
    var municipios = {};

    try {
        municipios = JSON.parse(root.getAttribute('data-vs-municipios') || '{}');
    } catch (error) {
        return;
    }

    if (!form || !result || !cepInput || !select || cards.length === 0) {
        return;
    }

    form.hidden = false;

    // Mesma regra de sanitize_title() do WordPress para nomes de municípios: sem acentos, minúsculas e hífens.
    function municipioKey(name) {
        return String(name)
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function distanceKm(a, b) {
        var rad = Math.PI / 180;
        var dLat = (b.lat - a.lat) * rad;
        var dLng = (b.lng - a.lng) * rad;
        var h = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }

    function cardsFor(key) {
        return cards.filter(function (card) {
            return card.getAttribute('data-municipio') === key;
        });
    }

    function showMessage(text, tone) {
        result.innerHTML = '';

        var message = document.createElement('p');
        message.className = 'vs-lojas__message' + (tone ? ' vs-lojas__message--' + tone : '');
        message.textContent = text;
        result.appendChild(message);
        result.hidden = false;
    }

    function showLojas(key) {
        var municipio = municipios[key];

        if (!municipio) {
            return;
        }

        var found = cardsFor(key);
        var text = '';

        if (found.length > 0) {
            text = found.length > 1
                ? 'Estas são as lojas de atendimento em ' + municipio.name + ':'
                : 'Esta é a loja de atendimento em ' + municipio.name + ':';
        } else {
            // Município sem loja: procura o município com loja mais perto.
            var nearestKey = '';
            var nearestDistance = Infinity;

            cards.forEach(function (card) {
                var cardKey = card.getAttribute('data-municipio');

                if (!municipios[cardKey]) {
                    return;
                }

                var distance = distanceKm(municipio, municipios[cardKey]);

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestKey = cardKey;
                }
            });

            if (!nearestKey) {
                showMessage('Não encontramos lojas de atendimento cadastradas.', 'warning');
                return;
            }

            found = cardsFor(nearestKey);
            text = municipio.name + ' ainda não tem loja de atendimento. A mais próxima fica em '
                + municipios[nearestKey].name + ', a cerca de ' + Math.round(nearestDistance) + ' km em linha reta:';
        }

        showMessage(text, 'success');

        var list = document.createElement('ul');
        list.className = 'vs-lojas__list vs-lojas__list--result';

        found.forEach(function (card) {
            list.appendChild(card.cloneNode(true));
        });

        result.appendChild(list);
    }

    function formatCep(value) {
        var digits = value.replace(/\D+/g, '').slice(0, 8);

        return digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits;
    }

    cepInput.addEventListener('input', function () {
        cepInput.value = formatCep(cepInput.value);
    });

    select.addEventListener('change', function () {
        if (select.value) {
            cepInput.value = '';
            showLojas(select.value);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var cep = cepInput.value.replace(/\D+/g, '');

        if (cep.length !== 8) {
            showMessage('Digite o CEP com 8 números. Ex.: 56300-000.', 'warning');
            cepInput.focus();
            return;
        }

        showMessage('Buscando o seu CEP…');
        form.setAttribute('aria-busy', 'true');

        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('viacep');
                }

                return response.json();
            })
            .then(function (data) {
                if (!data || data.erro) {
                    showMessage('CEP não encontrado. Confira os números ou escolha o município na lista.', 'warning');
                    return;
                }

                var key = municipioKey(data.localidade || '');

                if (data.uf !== 'PE' || !municipios[key]) {
                    showMessage('O CEP informado é de ' + data.localidade + '/' + data.uf + ', fora da área atendida pela VITA Sertão.', 'warning');
                    return;
                }

                select.value = key;
                showLojas(key);
            })
            .catch(function () {
                showMessage('Não foi possível consultar o CEP agora. Escolha o município na lista.', 'warning');
            })
            .then(function () {
                form.removeAttribute('aria-busy');
            });
    });
})();
