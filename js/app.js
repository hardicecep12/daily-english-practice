(function() {
    window.onload = function() {
        if (window.initPGModule) window.initPGModule();
        if (window.initListeningModule) window.initListeningModule();
        if (window.initMatchModule) window.initMatchModule();
        if (window.initTFModule) window.initTFModule();
    };

    window.switchTab = function(tabName) {
        const tabs = ['pg', 'listening', 'match', 'tf', 'result'];
        tabs.forEach(t => {
            const tabBtn = document.getElementById(`tab-${t}`);
            const viewEl = document.getElementById(`view-${t}`);
            if (tabBtn) tabBtn.classList.toggle('active', t === tabName);
            if (viewEl) viewEl.classList.toggle('active', t === tabName);
        });

        if (tabName === 'pg' && window.initPGModule) window.initPGModule();
        if (tabName === 'listening' && window.initListeningModule) window.initListeningModule();
        if (tabName === 'match' && window.initMatchModule) window.initMatchModule();
        if (tabName === 'tf' && window.initTFModule) window.initTFModule();

        if (tabName === 'result') {
            window.updateTotalScoreDisplay();
        }
    };

    window.updateTotalScoreDisplay = function() {
        let pgScore = window.getPGScore ? window.getPGScore() : 0;
        let lisScore = window.getListeningScore ? window.getListeningScore() : 0;
        let matchScore = window.getMatchScore ? window.getMatchScore() : 0;
        let tfScore = window.getTFScore ? window.getTFScore() : 0;

        const resPg = document.getElementById('res-pg-score');
        const resLis = document.getElementById('res-lis-score');
        const resMatch = document.getElementById('res-match-score');
        const resTf = document.getElementById('res-tf-score');

        if (resPg) resPg.textContent = `${pgScore} / 100`;
        if (resLis) resLis.textContent = `${lisScore} / 100`;
        if (resMatch) resMatch.textContent = `${matchScore} / 100`;
        if (resTf) resTf.textContent = `${tfScore} / 100`;

        let pgWeight = (typeof quizConfig !== 'undefined' && quizConfig.weights) ? quizConfig.weights.pg : 25;
        let lisWeight = (typeof quizConfig !== 'undefined' && quizConfig.weights) ? quizConfig.weights.listening : 25;
        let matchWeight = (typeof quizConfig !== 'undefined' && quizConfig.weights) ? quizConfig.weights.match : 25;
        let tfWeight = (typeof quizConfig !== 'undefined' && quizConfig.weights) ? quizConfig.weights.tf : 25;

        let totalScore = Math.round(
            (pgScore * pgWeight / 100) +
            (lisScore * lisWeight / 100) +
            (matchScore * matchWeight / 100) +
            (tfScore * tfWeight / 100)
        );

        const resTotal = document.getElementById('res-total-score');
        if (resTotal) resTotal.textContent = `${totalScore}%`;

        const titleEl = document.getElementById('res-eval-title');
        const descEl = document.getElementById('res-eval-desc');

        if (titleEl && descEl) {
            let passScore = (typeof quizConfig !== 'undefined' && quizConfig.passingScore) ? quizConfig.passingScore : 80;
            let modScore = (typeof quizConfig !== 'undefined' && quizConfig.moderateScore) ? quizConfig.moderateScore : 60;

            let msgHigh = (typeof quizConfig !== 'undefined' && quizConfig.messages && quizConfig.messages.high) 
                ? quizConfig.messages.high 
                : { title: "Luar Biasa!", desc: "Pemahaman Anda sangat baik." };

            let msgMedium = (typeof quizConfig !== 'undefined' && quizConfig.messages && quizConfig.messages.medium) 
                ? quizConfig.messages.medium 
                : { title: "Cukup Bagus!", desc: "Tingkatkan terus latihan Anda." };

            let msgLow = (typeof quizConfig !== 'undefined' && quizConfig.messages && quizConfig.messages.low) 
                ? quizConfig.messages.low 
                : { title: "Perlu Belajar Lagi", desc: "Pelajari kembali materi dasar." };

            if (totalScore >= passScore) {
                titleEl.textContent = msgHigh.title;
                descEl.textContent = msgHigh.desc;
            } else if (totalScore >= modScore) {
                titleEl.textContent = msgMedium.title;
                descEl.textContent = msgMedium.desc;
            } else {
                titleEl.textContent = msgLow.title;
                descEl.textContent = msgLow.desc;
            }
        }
    };

    window.resetAllQuiz = function() {
        if (window.resetPGModule) window.resetPGModule();
        if (window.resetListeningModule) window.resetListeningModule();
        if (window.resetMatchModule) window.resetMatchModule();
        if (window.resetTFModule) window.resetTFModule();
        window.switchTab('pg');
    };
})();