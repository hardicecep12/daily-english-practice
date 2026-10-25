(function () {
    let currentPGIndex = 0;
    let userAnswers = [];
    let flaggedStatus = [];

    window.toggleTranslation = function (element) {
        const wrapper = element.closest('.sentence-inline-wrapper') || element;
        const transEl = wrapper.querySelector('.id-text');
        if (transEl) {
            const isHidden = transEl.style.display === 'none' || transEl.style.display === '';
            transEl.style.display = isHidden ? 'block' : 'none';
        }
    };

    window.initPGModule = function () {
        currentPGIndex = 0;
        const totalQuestions = window.pgData ? window.pgData.length : 0;
        userAnswers = new Array(totalQuestions).fill(null);
        flaggedStatus = new Array(totalQuestions).fill(false);
        bindPGEvents();
        renderPGQuestion();
        renderPGGrid();
    };

    function bindPGEvents() {
        const prevBtn = document.getElementById('pg-prev-btn');
        const nextBtn = document.getElementById('pg-next-btn');
        const flagBtn = document.getElementById('pg-flag-btn');

        if (prevBtn) prevBtn.onclick = prevPGQuestion;
        if (nextBtn) nextBtn.onclick = nextPGQuestion;
        if (flagBtn) flagBtn.onclick = togglePGFlag;
    }

    function buildPassageHTML(activeBlankNum) {
        if (!window.pgPassage) return '';
        let html = '<div class="passage-box" style="background:#ffffff; padding:20px; border-radius:8px; line-height:1.8; border:1px solid #cbd5e1; font-size:0.95rem; text-align:justify; color:#000000; font-weight:normal;">';
        
        window.pgPassage.forEach((p) => {
            html += `<p style="margin-bottom: 16px;">`;
            p.sentences.forEach(s => {
                let sentenceEN = s.en;
                let targetPattern = `(${s.id}) _____`;
                
                const qIdx = s.id - 1;
                const selectedOptIdx = userAnswers[qIdx];
                let displayText = `(${s.id}) _____`;
                
                if (selectedOptIdx !== null && selectedOptIdx !== undefined && window.pgData && window.pgData[qIdx]) {
                    const chosenWord = window.pgData[qIdx].options[selectedOptIdx];
                    const correctOptIdx = window.pgData[qIdx].correct;

                    if (selectedOptIdx !== correctOptIdx) {
                        displayText = `(${s.id}) <span style="background-color:#e2e8f0; padding:2px 6px; border-radius:4px; border:1px solid #cbd5e1;"><u>${chosenWord}</u></span>`;
                    } else {
                        displayText = `(${s.id}) <u>${chosenWord}</u>`;
                    }
                }

                if (s.id === activeBlankNum) {
                    sentenceEN = sentenceEN.replace(
                        targetPattern,
                        `<mark style="background-color:#e2e8f0; color:#000000; padding:2px 8px; border-radius:4px; font-weight:normal; border:1px solid #94a3b8; display:inline-block;">${displayText}</mark>`
                    );
                } else {
                    sentenceEN = sentenceEN.replace(
                        targetPattern,
                        `<span style="font-weight:normal; color:#000000;">${displayText}</span>`
                    );
                }

                html += `
                    <span class="sentence-inline-wrapper" style="display:inline;">
                        <span class="sentence-clickable" 
                              onclick="window.toggleTranslation(this)" 
                              title="Klik untuk lihat terjemahan"
                              style="cursor:pointer; padding:0; color:#000000; font-weight:normal;">
                            ${sentenceEN}
                        </span> 
                        <span class="id-text" style="display:none; width:100%; font-size:0.85rem; color:#333333; font-style:italic; margin:6px 0 10px 0; padding:6px 12px; background:#f1f5f9; border-radius:4px; font-weight:normal;">
                            Terjemahan: ${s.id_trans}
                        </span>
                    </span>
                `;
            });
            html += `</p>`;
        });

        html += '</div>';
        return html;
    }

    function renderOptionsHTML(q) {
        const labels = ['A', 'B', 'C', 'D'];
        let html = '<div class="options-list">';
        const selectedIdx = userAnswers[currentPGIndex];

        q.options.forEach((opt, idx) => {
            let statusClass = '';
            
            if (selectedIdx !== null && selectedIdx !== undefined) {
                if (idx === selectedIdx) {
                    statusClass = (selectedIdx === q.correct) ? 'correct' : 'incorrect';
                }
            }

            html += `
                <button class="option-btn ${statusClass}" onclick="window.selectPGAnswer(${idx})" style="font-weight:normal; color:#000000;">
                    <span style="margin-right:8px; color:#000000; font-weight:normal;">${labels[idx]}.</span> ${opt}
                </button>
            `;
        });
        html += '</div>';
        return html;
    }

    function renderExplanationHTML(q) {
        if (userAnswers[currentPGIndex] === null) return '';
        const labels = ['A', 'B', 'C', 'D'];
        return `
            <div class="explanation-card" style="display:block; background-color:#ebf8ff; border-left:4px solid #3182ce; padding:12px; border-radius:0 8px 8px 0; margin-top:12px; font-size:0.9rem; color:#000000; font-weight:normal;">
                <div class="explanation-title" style="font-weight:normal; color:#000000; margin-bottom:4px;">Pembahasan:</div>
                <div>
                    <span>Jawaban Benar:</span> ${labels[q.correct]}. ${q.options[q.correct]}<br>
                    <span>Penjelasan:</span> ${q.explanation}
                </div>
            </div>
        `;
    }

    function renderPGQuestion() {
        if (!window.pgData || window.pgData.length === 0) return;
        const q = window.pgData[currentPGIndex];
        
        const badge = document.getElementById('pg-badge');
        if (badge) badge.textContent = `Soal ${currentPGIndex + 1} dari ${window.pgData.length}`;

        const flagBtn = document.getElementById('pg-flag-btn');
        const isFlagged = !!flaggedStatus[currentPGIndex];

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

        const questionTextContainer = document.getElementById('pg-question-text');
        const optionsContainer = document.getElementById('pg-options-container');
        const expCard = document.getElementById('pg-explanation-card');
        
        if (expCard) expCard.style.display = 'none';

        if (questionTextContainer) {
            if (q.targetBlank) {
                const instructionHTML = window.QuizWidgets ? window.QuizWidgets.renderPassageInstruction(1, 15) : '';
                const passageHTML = buildPassageHTML(q.targetBlank);
                
                questionTextContainer.innerHTML = `
                    ${instructionHTML}
                    <div class="passage-split-container">
                        <div class="passage-sticky-box">
                            ${passageHTML}
                        </div>
                        <div class="question-side-box">
                            <div style="font-weight:normal; font-size:1.05rem; margin-bottom:12px; color:#000000;">
                                ${currentPGIndex + 1}. ${q.question}
                            </div>
                            ${renderOptionsHTML(q)}
                            ${renderExplanationHTML(q)}
                        </div>
                    </div>
                `;
                if (optionsContainer) optionsContainer.innerHTML = '';
            } else {
                const instructionHTML = window.QuizWidgets ? window.QuizWidgets.renderGeneralPGInstruction(16, 30) : '';
                questionTextContainer.innerHTML = `
                    ${instructionHTML}
                    <div style="font-weight:normal; font-size:1.05rem; margin-top:10px; margin-bottom:12px; color:#000000;">
                        ${currentPGIndex + 1}. ${q.question}
                    </div>
                    ${renderOptionsHTML(q)}
                    ${renderExplanationHTML(q)}
                `;
                if (optionsContainer) optionsContainer.innerHTML = '';
            }
        }

        const prevBtn = document.getElementById('pg-prev-btn');
        const nextBtn = document.getElementById('pg-next-btn');
        if (prevBtn) prevBtn.disabled = currentPGIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = (currentPGIndex === window.pgData.length - 1) ? 'Lanjut ke Mendengarkan →' : 'Selanjutnya →';
        }

        renderPGGrid();
    }

    window.selectPGAnswer = function (idx) {
        const q = window.pgData[currentPGIndex];
        const labels = ['A', 'B', 'C', 'D'];
        const selectedText = `${labels[idx]}. ${q.options[idx]}`;

        if (window.QuizWidgets && window.QuizWidgets.showConfirmationModal) {
            window.QuizWidgets.showConfirmationModal(
                selectedText,
                function onConfirm() {
                    userAnswers[currentPGIndex] = idx;
                    renderPGQuestion();
                }
            );
        } else {
            userAnswers[currentPGIndex] = idx;
            renderPGQuestion();
        }
    };

    function togglePGFlag() {
        flaggedStatus[currentPGIndex] = !flaggedStatus[currentPGIndex];
        renderPGQuestion();
    }

    function nextPGQuestion() {
        if (currentPGIndex < window.pgData.length - 1) {
            currentPGIndex++;
            renderPGQuestion();
        } else if (window.switchTab) {
            window.switchTab('listening');
        }
    }

    function prevPGQuestion() {
        if (currentPGIndex > 0) {
            currentPGIndex--;
            renderPGQuestion();
        }
    }

    function renderPGGrid() {
        const grid = document.getElementById('pg-question-grid');
        if (!grid || !window.pgData) return;
        grid.innerHTML = '';

        window.pgData.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.className = 'grid-box';
            btn.textContent = idx + 1;

            if (idx === currentPGIndex) btn.classList.add('current');
            if (userAnswers[idx] !== null && userAnswers[idx] !== undefined) btn.classList.add('answered');
            if (flaggedStatus[idx]) btn.classList.add('flagged');

            btn.onclick = () => {
                currentPGIndex = idx;
                renderPGQuestion();
            };
            grid.appendChild(btn);
        });
    }

    window.getPGScore = function () {
        if (!window.pgData || window.pgData.length === 0) return 0;
        let correctCount = 0;
        window.pgData.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) correctCount++;
        });
        return Math.round((correctCount / window.pgData.length) * 100);
    };

    window.resetPGModule = function () {
        if (!window.pgData) return;
        currentPGIndex = 0;
        userAnswers = new Array(window.pgData.length).fill(null);
        flaggedStatus = new Array(window.pgData.length).fill(false);
        renderPGQuestion();
    };
})();