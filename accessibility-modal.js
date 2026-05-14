class AccessibilityModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
        this.setupGlobalFunctions();
    }

    render() {
        this.innerHTML = `
            <div id="accessibility-modal" class="accessibility-modal" role="dialog" aria-modal="true" aria-label="Accessibility Options">
                <div class="accessibility-modal-content">
                    <div class="accessibility-modal-header">
                        <h2><i class="fa-solid fa-universal-access text-sky-400"></i> Accessibility Options</h2>
                        <button id="close-modal-btn" aria-label="Close">&times;</button>
                    </div>
                    <div class="accessibility-modal-body">
                        ${this.getOptions()}
                    </div>
                    <div class="accessibility-modal-footer">
                        <button class="btn-reset" id="reset-all-btn">Reset All</button>
                        <button class="btn-close" id="modal-close-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
    }

    getOptions() {
        const options = [
            { id: 'btn-high-contrast', icon: 'fa-circle-half-stroke', color: 'text-yellow-400', label: 'High Contrast', handler: 'toggleHighContrast' },
            { id: 'btn-large-text', icon: 'fa-text-height', color: 'text-blue-400', label: 'Larger Text', handler: 'increaseTextSize' },
            { id: 'btn-dyslexic-font', icon: 'fa-font', color: 'text-emerald-400', label: 'Dyslexic Friendly Font', handler: 'toggleDyslexicFont' },
            { id: 'btn-readable-spacing', icon: 'fa-align-left', color: 'text-orange-400', label: 'Readable Line Spacing', handler: 'toggleReadableLineHeight' },
            { id: 'btn-reduce-motion', icon: 'fa-person-walking', color: 'text-rose-400', label: 'Reduce Motion', handler: 'toggleReduceMotion' },
            { id: 'btn-grayscale', icon: 'fa-palette', color: 'text-purple-400', label: 'Grayscale Mode', handler: 'toggleGrayscale' }
        ];

        return options.map(opt => `
            <div class="accessibility-option">
                <div class="accessibility-option-left">
                    <i class="fa-solid ${opt.icon} ${opt.color}"></i>
                    <span>${opt.label}</span>
                </div>
                <button id="${opt.id}" data-handler="${opt.handler}">Toggle</button>
            </div>
        `).join('');
    }

    attachEvents() {
        const modal = this.querySelector('#accessibility-modal');
        const closeBtn = this.querySelector('#close-modal-btn');
        const closeBtn2 = this.querySelector('#modal-close-btn');
        const resetBtn = this.querySelector('#reset-all-btn');

        const closeModal = () => {
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (closeBtn2) closeBtn2.addEventListener('click', closeModal);
        if (resetBtn) resetBtn.addEventListener('click', () => window.resetAllAccessibility?.());
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }

        this.querySelectorAll('.accessibility-option button').forEach(btn => {
            const handler = btn.getAttribute('data-handler');
            if (handler && window[handler]) {
                btn.addEventListener('click', () => window[handler]());
            }
        });
    }

    setupGlobalFunctions() {
        const modal = this.querySelector('#accessibility-modal');
        
        window.openAccessibilityModal = () => {
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                window.updateButtonStates?.();
            }
        };

        window.closeAccessibilityModal = () => {
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        };
    }
}

customElements.define('accessibility-modal', AccessibilityModal);
