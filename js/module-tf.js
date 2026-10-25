(function () {
    let currentIndex = 0;
    let userAnswers = {};
    let flaggedStatus = {};

    function getData() {
        return window.tfData || [];
    }

    window.initTFModule = function () {
        const data = getData();
        if (!data.length) return;
        renderGrid();
        loadQuestion(currentIndex);
        setupEventListeners();
    };

    window.getTFScore = function () {
        const data = getData();
        if (!data.length) return 0;
        let correctCount = 0;
        data.forEach((item, idx) => {
            if (userAnswers[idx] === item.correct) {
                correctCount++;
            }
        });
        return Math.round((correctCount / data.length) * 100);
    };

    window.resetTFModule = function () {
        currentIndex = 0;
        userAnswers = {};
        flaggedStatus = {};
        window.initTFModule();
    };

    function setupEventListeners() {
        const prevBtn = document.getElementById('tf-prev-btn');
        const nextBtn = document.getElementById('tf-next-btn');
        const flagBtn = document.getElementById('tf-flag-btn');

        if (prevBtn) prevBtn.onclick = prevQuestion;
        if (nextBtn) nextBtn.onclick = nextQuestion;
        if (flagBtn) flagBtn.onclick = toggleFlag;
    }

    function loadQuestion(index) {
        const data = getData();
        currentIndex = index;
        const item = data[currentIndex];
        if (!item) return;

        const badgeEl = document.getElementById('tf-badge');
        if (badgeEl) badgeEl.textContent = `SOAL ${index + 1} DARI ${data.length}`;

        const isFlagged = !!flaggedStatus[index];
        const flagBtn = document.getElementById('tf-flag-btn');
        if (flagBtn) {
            flagBtn.classList.toggle('active', isFlagged);
            flagBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFlagged ? '#1E3A8A' : 'none'}" stroke="${isFlagged ? '#1E3A8A' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                    <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                <span>${isFlagged ? "Ragu-ragu" : "Tandai Ragu"}</span>
            `;
        }

        const qTextEl = document.getElementById('tf-question-text');
        if (qTextEl) {
            const instructionHTML = window.QuizWidgets ? window.QuizWidgets.renderTFInstruction(1, data.length) : '';
            qTextEl.innerHTML = `
                ${instructionHTML}
                <div style="font-weight:normal; font-size:1.05rem; margin-top:10px; color:#000000;">
                    ${index + 1}. ${item.statement}
                </div>
            `;
        }

        const expCard = document.getElementById('tf-explanation-card');
        const expText = document.getElementById('tf-explanation-text');

        if (userAnswers[index] !== undefined) {
            if (expText) expText.textContent = item.explanation;
            if (expCard) expCard.style.display = 'block';
        } else {
            if (expCard) expCard.style.display = 'none';
        }

        const optsContainer = document.getElementById('tf-options-container');
        const options = [
            { text: "True (Benar)", val: true },
            { text: "False (Salah)", val: false }
        ];

        if (optsContainer) {
            optsContainer.innerHTML = '';

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.style.fontWeight = 'normal';
                btn.style.color = '#000000';
                btn.textContent = opt.text;

                if (userAnswers[index] !== undefined) {
                    btn.disabled = true;
                    if (opt.val === userAnswers[index]) {
                        if (userAnswers[index] === item.correct) {
                            btn.classList.add('correct');
                        } else {
                            btn.classList.add('incorrect');
                        }
                    } else if (opt.val === item.correct) {
                        btn.classList.add('correct');
                    }
                } else {
                    btn.onclick = () => selectOption(opt.val, opt.text);
                }

                optsContainer.appendChild(btn);
            });
        }

        updateNavButtons();
        updateGridUI();
    }

    function selectOption(val, text) {
        if (window.QuizWidgets && window.QuizWidgets.showConfirmationModal) {
            window.QuizWidgets.showConfirmationModal(
                text,
                function onConfirm() {
                    userAnswers[currentIndex] = val;
                    loadQuestion(currentIndex);
                }
            );
        } else {
            userAnswers[currentIndex] = val;
            loadQuestion(currentIndex);
        }
    }

    function updateNavButtons() {
        const data = getData();
        const prevBtn = document.getElementById('tf-prev-btn');
        const nextBtn = document.getElementById('tf-next-btn');

        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = currentIndex === data.length - 1 ? 'Selesai' : 'Selanjutnya →';
        }
    }

    function renderGrid() {
        const data = getData();
        const grid = document.getElementById('tf-question-grid');
        if (!grid) return;
        grid.innerHTML = '';

        data.forEach((_, idx) => {
            const box = document.createElement('div');
            box.className = 'grid-box';
            box.textContent = idx + 1;
            box.onclick = () => loadQuestion(idx);
            grid.appendChild(box);
        });
    }

    function updateGridUI() {
        const boxes = document.querySelectorAll('#tf-question-grid .grid-box');
        boxes.forEach((box, idx) => {
            box.classList.toggle('current', idx === currentIndex);
            box.classList.toggle('answered', userAnswers[idx] !== undefined);
            box.classList.toggle('flagged', !!flaggedStatus[idx]);
        });
    }

    function toggleFlag() {
        flaggedStatus[currentIndex] = !flaggedStatus[currentIndex];
        loadQuestion(currentIndex);
    }

    function nextQuestion() {
        const data = getData();
        if (currentIndex < data.length - 1) {
            loadQuestion(currentIndex + 1);
        } else {
            if (window.switchTab) window.switchTab('result');
        }
    }

    function prevQuestion() {
        if (currentIndex > 0) {
            loadQuestion(currentIndex - 1);
        }
    }
})();