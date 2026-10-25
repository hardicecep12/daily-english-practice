(function () {
    let currentIndex = 0;
    let userAnswers = {};
    let flaggedStatus = {};
    let currentAudioPlayer = null;

    function stopCurrentAudio() {
        if (currentAudioPlayer) {
            currentAudioPlayer.pause();
            currentAudioPlayer.onended = null;
            currentAudioPlayer.currentTime = 0;
            currentAudioPlayer = null;
        }
    }

    function getData() {
        if (typeof window.englishListeningData !== 'undefined' && Array.isArray(window.englishListeningData)) {
            return window.englishListeningData;
        }
        return [];
    }

    window.initListeningModule = function () {
        renderGrid();
        loadQuestion(currentIndex);
    };

    window.getListeningScore = function () {
        const data = getData();
        let correctCount = 0;
        data.forEach((item, idx) => {
            if (userAnswers[idx] === item.correct) correctCount++;
        });
        return data.length ? Math.round((correctCount / data.length) * 100) : 0;
    };

    window.resetListeningModule = function () {
        currentIndex = 0;
        userAnswers = {};
        flaggedStatus = {};
        stopCurrentAudio();
        window.initListeningModule();
    };

    window.playListeningAudio = function (rate = 1.0) {
        stopCurrentAudio();

        const data = getData();
        const item = data[currentIndex];
        if (!item || !item.audio) {
            alert("File audio untuk soal ini tidak ditemukan.");
            return;
        }

        currentAudioPlayer = new Audio(item.audio);
        currentAudioPlayer.playbackRate = rate;
        currentAudioPlayer.onended = function () { stopCurrentAudio(); };

        currentAudioPlayer.play().catch(err => {
            console.error("Gagal memutar audio:", err);
            alert("Gagal memutar audio. Pastikan file MP3 ada di folder 'audio/'.");
        });
    };

    function renderInstructionWidget(totalQuestions) {
        const audioBox = document.querySelector('#view-listening .audio-box');
        if (!audioBox) return;

        let instBox = document.getElementById('lis-instruction-widget');
        if (!instBox) {
            instBox = document.createElement('div');
            instBox.id = 'lis-instruction-widget';
            audioBox.parentNode.insertBefore(instBox, audioBox);
        }

        if (window.QuizWidgets && window.QuizWidgets.renderListeningInstruction) {
            instBox.innerHTML = window.QuizWidgets.renderListeningInstruction(1, totalQuestions);
        }
    }

    function loadQuestion(index) {
        stopCurrentAudio();
        const data = getData();
        currentIndex = index;
        const item = data[currentIndex];
        if (!item) return;

        renderInstructionWidget(data.length);

        const badgeEl = document.getElementById('lis-q-badge');
        if (badgeEl) badgeEl.textContent = `SOAL ${index + 1} DARI ${data.length}`;

        const isFlagged = !!flaggedStatus[index];
        const flagBtn = document.getElementById('lis-flag-btn');
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

        const revBox = document.getElementById('lis-revelation-box');
        const expCard = document.getElementById('lis-explanation-card');

        if (userAnswers[index] !== undefined) {
            const revealedText = document.getElementById('lis-revealed-text');
            const revealedTrans = document.getElementById('lis-revealed-translation');
            const expText = document.getElementById('lis-explanation-text');

            if (revealedText) revealedText.textContent = item.text;
            if (revealedTrans) revealedTrans.textContent = item.translation;
            if (expText) expText.textContent = item.explanation;

            if (revBox) revBox.style.display = 'block';
            if (expCard) expCard.style.display = 'block';
        } else {
            if (revBox) revBox.style.display = 'none';
            if (expCard) expCard.style.display = 'none';
        }

        const optsContainer = document.getElementById('lis-options-list');
        const labels = ['A', 'B', 'C', 'D'];

        if (optsContainer) {
            optsContainer.innerHTML = '';

            item.options.forEach((optText, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.style.fontWeight = 'normal';
                btn.style.color = '#000000';
                const prefix = labels[optIdx] ? `${labels[optIdx]}. ` : '';
                const fullOptText = `${prefix}${optText}`;
                btn.textContent = fullOptText;

                if (userAnswers[index] !== undefined) {
                    btn.disabled = true;
                    if (optIdx === userAnswers[index]) {
                        if (userAnswers[index] === item.correct) {
                            btn.classList.add('correct');
                        } else {
                            btn.classList.add('incorrect');
                        }
                    } else if (optIdx === item.correct) {
                        btn.classList.add('correct');
                    }
                } else {
                    btn.onclick = () => selectOption(optIdx, fullOptText);
                }

                optsContainer.appendChild(btn);
            });
        }

        updateNavButtons();
        updateGridUI();
    }

    function selectOption(optIdx, optText) {
        if (window.QuizWidgets && window.QuizWidgets.showConfirmationModal) {
            window.QuizWidgets.showConfirmationModal(
                optText,
                function onConfirm() {
                    userAnswers[currentIndex] = optIdx;
                    loadQuestion(currentIndex);
                }
            );
        } else {
            userAnswers[currentIndex] = optIdx;
            loadQuestion(currentIndex);
        }
    }

    function updateNavButtons() {
        const data = getData();
        const prevBtn = document.getElementById('lis-prev-btn');
        const nextBtn = document.getElementById('lis-next-btn');

        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) {
            nextBtn.textContent = currentIndex === data.length - 1 ? 'Lanjut ke Menjodohkan →' : 'Selanjutnya →';
        }
    }

    function renderGrid() {
        const data = getData();
        const grid = document.getElementById('lis-grid');
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
        const boxes = document.querySelectorAll('#lis-grid .grid-box');
        boxes.forEach((box, idx) => {
            box.classList.toggle('current', idx === currentIndex);
            box.classList.toggle('answered', userAnswers[idx] !== undefined);
            box.classList.toggle('flagged', !!flaggedStatus[idx]);
        });
    }

    window.toggleListeningFlag = function () {
        flaggedStatus[currentIndex] = !flaggedStatus[currentIndex];
        loadQuestion(currentIndex);
    };

    window.nextListeningQuestion = function () {
        const data = getData();
        if (currentIndex < data.length - 1) {
            loadQuestion(currentIndex + 1);
        } else {
            if (window.switchTab) window.switchTab('match');
        }
    };

    window.prevListeningQuestion = function () {
        if (currentIndex > 0) {
            loadQuestion(currentIndex - 1);
        }
    };
})();