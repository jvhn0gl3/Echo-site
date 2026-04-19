class CyberBanner extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.banners = [];
        this.interval = 5000;
    }

    async connectedCallback() {
        await this.loadBanners();
        this.render();
        this.startSlideshow();
    }

    async loadBanners() {
        try {
            const response = await fetch('/data/banners.json');
            const data = await response.json();
            this.banners = data.banners;
            this.interval = data.config.interval || 5000;
        } catch (error) {
            console.error('[ERROR] Failed to load banners:', error);
            this.banners = [{ text: 'SYSTEM STATUS: OPERATIONAL', type: 'info', link: null }];
        }
    }

    render() {
        if (this.banners.length === 0) return;

        let bannerHtml = '';
        this.banners.forEach((banner, index) => {
            const isActive = index === 0 ? 'active' : '';
            const typeClass = `banner-type-${banner.type || 'info'}`;
            const tag = banner.link ? 'a' : 'div';
            const href = banner.link ? `href="${banner.link}"` : '';
            const target = banner.link && banner.link.startsWith('http') ? 'target="_blank"' : '';

            bannerHtml += `
                <${tag} ${href} ${target} class="banner-content ${isActive} ${typeClass}" data-index="${index}">
                    <i class="fas fa-satellite-dish"></i> ${banner.text}
                </${tag}>
            `;
        });

        this.innerHTML = `
            <div class="cyber-banner">
                ${bannerHtml}
            </div>
        `;
    }

    startSlideshow() {
        if (this.banners.length <= 1) return;

        setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    nextSlide() {
        const slides = this.querySelectorAll('.banner-content');
        slides[this.currentIndex].classList.remove('active');
        
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
        
        slides[this.currentIndex].classList.add('active');
    }
}

customElements.define('cyber-banner', CyberBanner);
