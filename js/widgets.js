window.QuizWidgets = {
    // Modal Floating Pop-up Konfirmasi Jawaban dengan Background Blur
    showConfirmationModal: function (selectedText, onConfirm, onCancel) {
        const existingModal = document.getElementById('quiz-confirm-modal');
        if (existingModal) existingModal.remove();

        const overlay = document.createElement('div');
        overlay.id = 'quiz-confirm-modal';
        overlay.className = 'confirmation-modal-overlay';

        overlay.innerHTML = `
            <div class="confirmation-modal-box">
                <div class="confirmation-modal-title">Konfirmasi Jawaban</div>
                <div class="confirmation-modal-desc">
                    Anda memilih: <strong>${selectedText}</strong>.<br><br>Apakah Anda yakin dengan pilihan jawaban ini?
                </div>
                <div class="confirmation-modal-actions">
                    <button id="btn-confirm-no" class="btn-modal-no">Tidak</button>
                    <button id="btn-confirm-yes" class="btn-modal-yes">Ya, Yakin</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById('btn-confirm-yes').onclick = function () {
            overlay.remove();
            if (typeof onConfirm === 'function') onConfirm();
        };

        document.getElementById('btn-confirm-no').onclick = function () {
            overlay.remove();
            if (typeof onCancel === 'function') onCancel();
        };
    },

    renderPassageInstruction: function (startNum = 1, endNum = 15) {
        return `
            <div class="instruction-widget">
                Petunjuk: Perhatikan paragraf berikut untuk menjawab soal nomor ${startNum} - ${endNum}. Klik pada kalimat bahasa Inggris untuk menampilkan atau menyembunyikan terjemahan.
            </div>
        `;
    },

    renderGeneralPGInstruction: function (startNum = 16, endNum = 30) {
        return `
            <div class="instruction-widget">
                Petunjuk: Pilihlah satu jawaban yang paling tepat untuk soal nomor ${startNum} - ${endNum}.
            </div>
        `;
    },

    renderListeningInstruction: function (startNum = 1, endNum = 5) {
        return `
            <div class="instruction-widget">
                Petunjuk: Dengarkan pengucapan audio bahasa Inggris dengan cermat, lalu pilihlah jawaban yang paling tepat untuk soal nomor ${startNum} - ${endNum}.
            </div>
        `;
    },

    renderMatchInstruction: function () {
        return `
            <div class="instruction-widget">
                Petunjuk: Pasangkan setiap pernyataan atau istilah di kolom kiri dengan pasangan yang sesuai pada kolom kanan.
            </div>
        `;
    },

    renderTFInstruction: function (startNum = 1, endNum = 10) {
        return `
            <div class="instruction-widget">
                Petunjuk: Baca setiap pernyataan dengan saksama, lalu tentukan apakah pernyataan tersebut Benar (True) atau Salah (False) untuk soal nomor ${startNum} - ${endNum}.
            </div>
        `;
    },

    toggleNavDrawer: function () {
        const activeView = document.querySelector('.section-view.active');
        if (!activeView) return;

        const sidebar = activeView.querySelector('.sidebar-card');
        const overlay = document.getElementById('nav-drawer-overlay');

        if (sidebar) {
            const isOpen = sidebar.classList.contains('open');
            if (isOpen) {
                sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            } else {
                sidebar.classList.add('open');
                if (overlay) overlay.classList.add('active');
            }
        }
    },

    closeNavDrawer: function () {
        const sidebars = document.querySelectorAll('.sidebar-card');
        const overlay = document.getElementById('nav-drawer-overlay');
        sidebars.forEach(s => s.classList.remove('open'));
        if (overlay) overlay.classList.remove('active');
    },

    toggleFullscreen: function () {
        const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);

        if (!isFullscreen) {
            const docEl = document.documentElement;
            const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen;
            if (requestFS) requestFS.call(docEl).catch(err => console.error(err));
        } else {
            const exitFS = document.exitFullscreen || document.webkitExitFullscreen;
            if (exitFS) exitFS.call(document).catch(err => console.error(err));
        }
    },

    initFullscreenListener: function () {
        const handleFSChange = () => {
            const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
            const btn = document.getElementById('btn-fullscreen');
            const text = document.getElementById('fs-text');
            const icon = document.getElementById('fs-icon');

            const enterIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
            const exitIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;

            if (btn && text) {
                btn.classList.toggle('active', isFS);
                text.textContent = isFS ? 'Keluar Fullscreen' : 'Layar Penuh';
                if (icon) icon.innerHTML = isFS ? exitIconSVG : enterIconSVG;
            }
        };

        document.addEventListener('fullscreenchange', handleFSChange);
        document.addEventListener('webkitfullscreenchange', handleFSChange);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.QuizWidgets && window.QuizWidgets.initFullscreenListener) {
        window.QuizWidgets.initFullscreenListener();
    }
});