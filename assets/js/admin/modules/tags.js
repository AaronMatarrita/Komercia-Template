// Módulo: Tag Inputs (phones + emails)
const TagsModule = (() => {

    function create($wrapper, opts) {
        const name = opts.name;
        const type = opts.type;
        const max = Number(opts.max) || 5;

        const $input = $('<input type="text" autocomplete="off">');
        const $hint = $('<div class="hint d-none"></div>');
        $wrapper.append($input, $hint);

        const values = [];

        const validators = {
            phone: v => /^[+\d][\d\s().-]{6,20}$/.test(v),
            email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
        };

        function showError(msg) {
            $wrapper.addClass("is-invalid");
            $hint.text(msg).removeClass("d-none");
            setTimeout(() => {
                $wrapper.removeClass("is-invalid");
                $hint.addClass("d-none");
            }, 1800);
        }

        function add(raw) {
            const v = String(raw || "").trim();
            if (!v) return;

            if (values.includes(v.toLowerCase())) { showError("Ya existe."); return; }
            if (values.length >= max) { showError(`Máximo ${max}.`); return; }

            const isValid = validators[type] ? validators[type](v) : true;
            if (!isValid) { showError(type === "phone" ? "Teléfono inválido." : "Email inválido."); return; }

            values.push(v.toLowerCase());

            const $tag = $(`
                <span class="tag" data-value="${v}">
                    <i class="bi ${type === 'email' ? 'bi-envelope' : 'bi-telephone'}"></i>${v}
                    <button type="button" class="remove" aria-label="Quitar"><i class="bi bi-x"></i></button>
                    <input type="hidden" name="${name}" value="${v}">
                </span>
            `);

            $tag.insertBefore($input);
            $input.val("");
        }

        $wrapper.on("click", () => $input.trigger("focus"));

        $input.on("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                add($input.val());
            } else if (e.key === "Backspace" && !$input.val() && $wrapper.find(".tag").length) {
                $wrapper.find(".tag").last().find(".remove").trigger("click");
            }
        });

        $wrapper.on("click", ".remove", function () {
            const $tag = $(this).closest(".tag");
            const val = $tag.data("value").toLowerCase();
            const idx = values.indexOf(val);
            if (idx >= 0) values.splice(idx, 1);
            $tag.remove();
        });

        return {
            add,
            getAll: () => [...values]
        };
    }

    return { create };

})();