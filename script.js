(function(){
    let navItems=document.querySelectorAll('.ide-item[data-section]');
    function setActive(sectionId){navItems.forEach(item=>{let btnSection=item.getAttribute('data-section');if(btnSection===sectionId)item.classList.add('active');else item.classList.remove('active');});}
    function scrollToSection(sectionId){let el=document.getElementById(sectionId);if(el){el.scrollIntoView({behavior:'smooth',block:'start'});setActive(sectionId);}}
    navItems.forEach(item=>{item.addEventListener('click',()=>{let section=item.getAttribute('data-section');scrollToSection(section);});item.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();let section=item.getAttribute('data-section');scrollToSection(section);}});});
    
    let homeLogo=document.getElementById('homeLogoLink');if(homeLogo){homeLogo.addEventListener('click',(e)=>{e.preventDefault();scrollToSection('about');});homeLogo.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();scrollToSection('about');}});}
    
    window.addEventListener('scroll',()=>{let scrollPos=window.scrollY+100;let sections=['about','skills','services','pricing','products','roadmap','projects','blog','contact'];let current='';for(let s of sections){let sec=document.getElementById(s);if(sec&&sec.offsetTop<=scrollPos)current=s;}if(current)setActive(current);});
    setActive('about');
    
    let a11yNavBtn=document.getElementById('a11yNavBtn');if(a11yNavBtn){a11yNavBtn.addEventListener('click',()=>{document.getElementById('a11yModal').classList.add('active');document.body.style.overflow='hidden';updateBtns();});a11yNavBtn.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('a11yModal').classList.add('active');document.body.style.overflow='hidden';updateBtns();}});}
    
    document.querySelectorAll('.project-card-link, .blog-card-link').forEach(card=>{card.addEventListener('click',()=>{modal('Project Details');});card.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();modal('Project Details');}});});
    
    document.querySelectorAll('.pricing-btn').forEach(btn=>{btn.addEventListener('click',()=>{let plan=btn.getAttribute('data-plan');modal(plan + ' Plan - Get in touch for details!');});});
    
    let viewProjects=document.getElementById('view-projects');if(viewProjects){viewProjects.addEventListener('click',(e)=>{e.preventDefault();window.open('https://github.com/v3','_blank');});}
    let viewBlog=document.getElementById('view-blog');if(viewBlog){viewBlog.addEventListener('click',(e)=>{e.preventDefault();modal('All Blog Posts');});}
    
    function modal(msg){let o=document.createElement('div');o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','Information modal');o.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.95);backdrop-filter:blur(12px);z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;';o.innerHTML=`<div style="background:#0f0f0f;border:1px solid rgba(0,212,255,.3);border-radius:24px;padding:2rem;max-width:420px;width:90%;text-align:center;box-shadow:0 25px 40px -12px rgba(0,212,255,.2);"><i class="fas fa-code-branch" style="font-size:3rem;color:#00d4ff;margin-bottom:1rem;" aria-hidden="true"></i><h3 style="margin-bottom:.5rem;color:#fff;">${msg}</h3><p style="color:#a0a0a0;margin-bottom:1.5rem;">Redirecting you to our partner's store...</p><button id="closeModalBtn" style="background:linear-gradient(135deg,#00d4ff,#7c3aed);border:none;padding:.6rem 1.8rem;border-radius:40px;color:#fff;font-weight:600;cursor:pointer;" aria-label="Close modal">Got it</button></div>`;document.body.appendChild(o);setTimeout(()=>o.style.opacity='1',10);let close=o.querySelector('#closeModalBtn');let rm=()=>{o.style.opacity='0';setTimeout(()=>o.remove(),200);};close.onclick=rm;close.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();rm();}});o.onclick=e=>{if(e.target===o)rm();};}
    
    let cursor=document.querySelector('.cursor'),follower=document.querySelector('.cursor-follower');if(cursor&&follower)document.addEventListener('mousemove',e=>{cursor.style.transform=`translate(${e.clientX-4}px,${e.clientY-4}px)`;follower.style.transform=`translate(${e.clientX-20}px,${e.clientY-20}px)`;});
    
    let modalEl=document.getElementById('a11yModal'),closeModalBtn=document.getElementById('closeModalBtn');
    let closeModal=()=>{modalEl.classList.remove('active');document.body.style.overflow='';};
    closeModalBtn?.addEventListener('click',closeModal);closeModalBtn?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();closeModal();}});modalEl?.addEventListener('click',e=>{if(e.target===modalEl)closeModal();});
    
    let hc=document.getElementById('highContrastBtn'),lt=document.getElementById('largeTextBtn'),df=document.getElementById('dyslexicFontBtn'),rm=document.getElementById('reduceMotionBtn');
    
    function updateBtns(){
        let highContrastActive=document.body.classList.contains('high-contrast');
        let largeTextActive=document.body.classList.contains('large-text');
        let dyslexicActive=document.body.classList.contains('dyslexic-font');
        let reduceMotionActive=document.body.classList.contains('reduce-motion');
        
        if(hc){hc.textContent=highContrastActive?'On':'Off';hc.classList.toggle('active',highContrastActive);hc.setAttribute('aria-label',highContrastActive?'Disable high contrast mode':'Enable high contrast mode');}
        if(lt){lt.textContent=largeTextActive?'On':'Off';lt.classList.toggle('active',largeTextActive);lt.setAttribute('aria-label',largeTextActive?'Disable larger text mode':'Enable larger text mode');}
        if(df){df.textContent=dyslexicActive?'On':'Off';df.classList.toggle('active',dyslexicActive);df.setAttribute('aria-label',dyslexicActive?'Disable dyslexic font mode':'Enable dyslexic font mode');}
        if(rm){rm.textContent=reduceMotionActive?'On':'Off';rm.classList.toggle('active',reduceMotionActive);rm.setAttribute('aria-label',reduceMotionActive?'Disable reduced motion mode':'Enable reduced motion mode');}
    }
    
    function applyHighContrast(enabled){if(enabled){document.body.classList.add('high-contrast');}else{document.body.classList.remove('high-contrast');}localStorage.setItem('highContrast',enabled);updateBtns();}
    function applyLargeText(enabled){if(enabled){document.body.classList.add('large-text');}else{document.body.classList.remove('large-text');}localStorage.setItem('largeText',enabled);updateBtns();}
    function applyDyslexicFont(enabled){if(enabled){document.body.classList.add('dyslexic-font');}else{document.body.classList.remove('dyslexic-font');}localStorage.setItem('dyslexicFont',enabled);updateBtns();}
    function applyReduceMotion(enabled){if(enabled){document.body.classList.add('reduce-motion');}else{document.body.classList.remove('reduce-motion');}localStorage.setItem('reduceMotion',enabled);updateBtns();}
    
    hc?.addEventListener('click',()=>{applyHighContrast(!document.body.classList.contains('high-contrast'));});
    lt?.addEventListener('click',()=>{applyLargeText(!document.body.classList.contains('large-text'));});
    df?.addEventListener('click',()=>{applyDyslexicFont(!document.body.classList.contains('dyslexic-font'));});
    rm?.addEventListener('click',()=>{applyReduceMotion(!document.body.classList.contains('reduce-motion'));});
    
    hc?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();applyHighContrast(!document.body.classList.contains('high-contrast'));}});
    lt?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();applyLargeText(!document.body.classList.contains('large-text'));}});
    df?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();applyDyslexicFont(!document.body.classList.contains('dyslexic-font'));}});
    rm?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();applyReduceMotion(!document.body.classList.contains('reduce-motion'));}});
    
    if(localStorage.getItem('highContrast')==='true')document.body.classList.add('high-contrast');
    if(localStorage.getItem('largeText')==='true')document.body.classList.add('large-text');
    if(localStorage.getItem('dyslexicFont')==='true')document.body.classList.add('dyslexic-font');
    if(localStorage.getItem('reduceMotion')==='true')document.body.classList.add('reduce-motion');
    updateBtns();
    
    let images=document.querySelectorAll('img[data-fallback]');images.forEach(img=>{let currentSrc=img.src;let primary=currentSrc;let fallback1=img.getAttribute('data-fallback');let fallback2=img.getAttribute('data-fallback2');let attempt=0;img.addEventListener('error',function(){if(attempt===0&&fallback1){this.src=fallback1;attempt=1;}else if(attempt===1&&fallback2){this.src=fallback2;attempt=2;}else{console.warn('All image sources failed:',primary,fallback1,fallback2);}});});
    
    let observer=new IntersectionObserver(e=>{e.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('fade-in');observer.unobserve(entry.target);}});},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('section').forEach(s=>observer.observe(s));
    
    let touchStartX=0;document.body.addEventListener('touchstart',function(e){touchStartX=e.touches[0].clientX;},{passive:false});document.body.addEventListener('touchmove',function(e){let touchCurrentX=e.touches[0].clientX;let diff=touchCurrentX-touchStartX;if(Math.abs(diff)>10){if((diff>0&&window.scrollX===0)||(diff<0&&(window.scrollX+window.innerWidth)>=document.documentElement.scrollWidth)){e.preventDefault();}}},{passive:false});document.addEventListener('contextmenu',e=>e.preventDefault());document.addEventListener('dragstart',e=>e.preventDefault());
})();