(function () {
    let userSelections = {};

    function getData() {
        return window.matchData || [];
    }

    window.initMatchModule = function () {
        renderMatchList();
        bindMatchEvents();
    };

    function bindMatchEvents() {
        // Event listener tambahan jika diperlukan
    }

    window.getMatchScore = function () {
        const data = getData();
        if (!data.length) return 0;
        let correctCount = 0;
        data.forEach((item, idx) => {
            if (userSelections[idx] === item.right) {
                correctCount++;
            }
        });
        return Math.round((correctCount / data.length) * 100);
    };

    window.resetMatchModule = function () {
        userSelections = {};
        renderMatchList();
    };

    function selectOption(idx, value) {
        if (!value) {
            delete userSelections[idx];
            renderMatchList();
            return;
        }

        const data = getData();
        const item = data[idx];
        const chosenText = `${item.left} = ${value}`;

        if (window.QuizWidgets && window.QuizWidgets.showConfirmationModal) {
            window.QuizWidgets.showConfirmationModal(
                chosenText,
                function onConfirm() {
                    userSelections[idx] = value;
                    renderMatchList();
                    checkAutoAdvance();
                },
                function onCancel() {
                    renderMatchList();
                }
            );
        } else {
            userSelections[idx] = value;
            renderMatchList();
            checkAutoAdvance();
        }
    }

    function renderMatchList() {
        const data = getData();
        const container = document.getElementById('match-container');
        if (!container || !data.length) return;

        const instructionHTML = window.QuizWidgets ? window.QuizWidgets.renderMatchInstruction() : '';
        container.innerHTML = instructionHTML;

        const rightOptions = data.map(d => d.right).sort(() => Math.random() - 0.5);

        const listWrapper = document.createElement('div');
        listWrapper.className = 'match-list-items';

        data.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = 'match-row';

            const leftLabel = document.createElement('div');
            leftLabel.className = 'question-text';
            leftLabel.style.margin = '0';
            leftLabel.style.fontWeight = 'normal';
            leftLabel.style.color = '#000000';
            leftLabel.textContent = `${idx + 1}. ${item.left}`;

            const select = document.createElement('select');
            select.className = 'match-select';
            select.style.fontWeight = 'normal';
            select.style.color = '#000000';

            if (userSelections[idx] !== undefined && userSelections[idx] !== '') {
                if (userSelections[idx] === item.right) {
                    select.style.backgroundColor = '#ffffff';
                    select.style.borderColor = '#3b82f6';
                } else {
                    select.style.backgroundColor = '#e2e8f0';
                    select.style.borderColor = '#cbd5e1';
                }
            }

            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = '-- Pilih Pasangan --';
            select.appendChild(defaultOpt);

            rightOptions.forEach(optText => {
                const opt = document.createElement('option');
                opt.value = optText;
                opt.textContent = optText;
                if (userSelections[idx] === optText) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            });

            select.onchange = (e) => {
                selectOption(idx, e.target.value);
            };

            row.appendChild(leftLabel);
            row.appendChild(select);
            listWrapper.appendChild(row);
        });

        container.appendChild(listWrapper);
    }

    function checkAutoAdvance() {
        const data = getData();
        const answeredCount = Object.keys(userSelections).filter(key => userSelections[key] !== '').length;

        if (data.length > 0 && answeredCount === data.length) {
            setTimeout(() => {
                if (window.switchTab) window.switchTab('tf');
            }, 400);
        }
    }
})();