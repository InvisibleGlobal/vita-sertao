(() => {
    'use strict';

    const calculator = document.querySelector('[data-vs-calculadora-caixa]');
    if (!calculator) {
        return;
    }

    const limits = {
        moradores: { min: 1, max: 100 },
        consumo: { min: 1, max: 1000 },
        dias: { min: 1, max: 30 },
    };
    const fallbackDefaults = { consumo: 150, dias: 1 };
    const inputs = Object.fromEntries(
        Object.keys(limits).map((key) => [key, calculator.querySelector(`[data-vs-calculadora-input="${key}"]`)]),
    );
    const errors = Object.fromEntries(
        Object.keys(limits).map((key) => [key, calculator.querySelector(`[data-vs-calculadora-error="${key}"]`)]),
    );
    const status = calculator.querySelector('[data-vs-calculadora-status]');
    const result = calculator.querySelector('[data-vs-calculadora-result]');

    if (Object.values(inputs).some((input) => !input) || !status || !result) {
        return;
    }

    const parseBoundedInteger = (value, minimum, maximum, fallback = null) => {
        if (typeof value !== 'string' || !/^\d+$/.test(value)) {
            return fallback;
        }

        const parsed = Number(value);
        if (!Number.isFinite(parsed) || !Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) {
            return fallback;
        }

        return parsed;
    };

    const defaultConsumption = parseBoundedInteger(calculator.dataset.defaultLitros, 1, 1000, fallbackDefaults.consumo);
    const defaultDays = parseBoundedInteger(calculator.dataset.defaultDias, 1, 30, fallbackDefaults.dias);
    inputs.consumo.value = String(defaultConsumption);
    inputs.dias.value = String(defaultDays);

    const validateInput = (key) => {
        const input = inputs[key];
        const error = errors[key];
        const { min, max } = limits[key];
        const raw = input.value;
        const value = parseBoundedInteger(raw, min, max);

        if (value === null) {
            const message = raw === '' && !input.validity.badInput
                ? 'Informe um valor inteiro.'
                : `Informe um número inteiro de ${min} a ${max}.`;
            input.setAttribute('aria-invalid', 'true');
            error.textContent = message;
            return null;
        }

        input.removeAttribute('aria-invalid');
        error.textContent = '';
        return value;
    };

    const update = () => {
        const values = Object.fromEntries(Object.keys(limits).map((key) => [key, validateInput(key)]));
        if (Object.values(values).some((value) => value === null)) {
            result.textContent = '';
            status.textContent = 'Corrija os campos destacados para ver o volume estimado.';
            return;
        }

        const volume = values.moradores * values.consumo * values.dias;
        if (!Number.isFinite(volume) || !Number.isSafeInteger(volume)) {
            result.textContent = '';
            status.textContent = 'Não foi possível calcular. Confira os valores informados.';
            return;
        }

        status.textContent = 'Volume estimado com os valores informados:';
        result.textContent = `${new Intl.NumberFormat('pt-BR').format(volume)} L`;
    };

    Object.values(inputs).forEach((input) => {
        input.addEventListener('input', update);
        input.addEventListener('change', update);
    });
})();
