// Global variable configuration string holding user personal encryption modified secure communication routing target address
const CONTACT_EMAIL = 'jvhn0gl3@proton.me';

// Helper function for footer navigation links (make scrollTo globally accessible)
// Enables smooth scrolling to any section by its ID, used by footer navigation links
window.scrollToSection = function(id) {
    const el = document.getElementById(id); /* Locate target section element by its identifier */
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' }); /* Smooth scroll to the target section */
        // Also update active nav state in sidebar for visual consistency
        const navItem = document.querySelector(`.nav-item[data-section="${id}"]`); /* Find matching sidebar button */
        if (navItem) {
            document.querySelectorAll('.nav-item[data-section]').forEach(item => item.classList.remove('active')); /* Clear existing active states */
            navItem.classList.add('active'); /* Set current section as active in navigation */
        }
    }
};

// Automation helper function assembling and launching context-specific email queries regarding application technical skills
function sendSkillMessage(skillName, skillDetails) {
    // Build customized inquiry title string variable utilizing argument strings passed via item interaction click calls
    const subject = `Inquiry about: ${skillName}`;
    // Multi-line template generation routine packing raw inquiry context arrays together with clean user inputs placeholder lines
    const body = `Hello V3,%0D%0A%0D%0AI'm interested in your ${skillName} service.%0D%0A%0D%0ASkill Details: ${skillDetails}%0D%0A%0D%0A%0D%0A--- Please fill out the following ---%0D%0A%0D%0AProject Description:%0D%0A%0D%0ATimeline:%0D%0A%0D%0ABudget Range:%0D%0A%0D%0AAdditional Notes:%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
    // Fires browser window allocation operations driving direct mail client app handshakes passing completed instruction payloads
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Automation helper function assembling and launching formal project estimation quote request emails routing assignment variables
function sendServiceMessage(serviceName, serviceDetails) {
    // Builds customized business quotation subject headers labels incorporating structural interaction parameters values
    const subject = `Quote Request: ${serviceName}`;
    // Multi-line project proposal structural prompt injection skeleton tracking commercial service deployment metrics requests lines
    const body = `Hello V3,%0D%0A%0D%0AI'd like to request a quote for your ${serviceName} service.%0D%0A%0D%0AService Details: ${serviceDetails}%0D%0A%0D%0A%0D%0A--- Please fill out the following ---%0D%0A%0D%0AProject Description:%0D%0A%0D%0ATimeline:%0D%0A%0D%0ABudget Range:%0D%0A%0D%0AAdditional Requirements:%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
    // Dispatches assembled commercial request strings straight to native system email processors engines safely
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Immediately Invoked Function Expression (IIFE) encapsulating dialogue window visual activation hooks tracking states actions
(function() {
    // Collect target elements nodes pointers from page DOM trees to attach interactive javascript logic controls handles
    const socialModal = document.getElementById('socialModal'); /* Fetch user connectivity network hub dialog screen overlay tracking container */
    const accessibilityModal = document.getElementById('accessibilityModal'); /* Fetch user preference adjustment cockpit system dialog structure card */
    const socialOpenBtn = document.getElementById('socialNavBtn'); /* Grab sidebar contact channel access menu link click target node trigger button */
    const accessibilityOpenBtn = document.getElementById('accessibilityNavBtn'); /* Grab user preferences console launch interface shortcut menu option key pointer */
    const socialCloseBtn = document.getElementById('closeSocialModalBtn'); /* Grab exit cancellation cross toggle trigger button mapping social screens templates */
    const accessibilityCloseBtn = document.getElementById('closeAccessibilityModalBtn'); /* Grab exit cancellation cross toggle trigger button mapping options cards models */
    
    // Base state modification routine visibility rendering targeted popup panels active instantly on execution
    function openModal(modal) {
        modal.classList.add('active'); /* Injects design visibility framework class hooks to initiate css scaling fade routines animations */
        document.body.style.overflow = 'hidden'; /* Disables page background content layout scroll tracks to keep user focus locked inside popups spaces */
    }
    
    // Base state modification routine tearing down active popup visibility filters instantly to return to baseline app flows
    function closeModal(modal) {
        modal.classList.remove('active'); /* Tears down design visibility framework class hooks to fire exit closure transitions paths */
        document.body.style.overflow = ''; /* RESTORES standard vertical scroll tracking functionality back across primary page elements lines safely */
    }
    
    // Wire up interaction trigger listener events mapping launch links shortcuts over to visibility activation drivers routines
    socialOpenBtn.addEventListener('click', () => openModal(socialModal));
    accessibilityOpenBtn.addEventListener('click', () => openModal(accessibilityModal));
    
    // Wire up input termination listener events connecting close buttons directly onto closure tear down execution sequences
    socialCloseBtn.addEventListener('click', () => closeModal(socialModal));
    accessibilityCloseBtn.addEventListener('click', () => closeModal(accessibilityModal));
    
    // Multi-element structural loop processing background click intersections to let users exit menus by clicking outside modal boundaries
    [socialModal, accessibilityModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Check if user click targets match raw background veil masks properties directly instead of inside cards spaces lines
            if (e.target === modal) {
                closeModal(modal); /* Fires interface termination routing safely to clear screen layouts automatically */
            }
        });
    });
    
    // Hardware keyboard keystroke input observer loop processing emergency exit safety operations sequences
    document.addEventListener('keydown', (e) => {
        // Check if user keyboard operations event codes match system physical Escape keys indicators signals
        if (e.key === 'Escape') {
            if (socialModal.classList.contains('active')) closeModal(socialModal); /* Close social panels instantly if active during keydown events */
            if (accessibilityModal.classList.contains('active')) closeModal(accessibilityModal); /* Wipe settings dialog tracks instantly if live on screens channels */
        }
    });
})(); // Execute dialogue system encapsulation function package modules immediately

// Immediately Invoked Function Expression (IIFE) isolation module managing user preference storage state serialization routines
(function() {
    // Memory extraction routine querying browser persistent memory stores to map custom layout settings upon returning visits
    function loadSettings() {
        // Query browser database records checking local text string markers parameters states definitions values
        const highContrast = localStorage.getItem('highContrast') === 'true';
        const largeText = localStorage.getItem('largeText') === 'true';
        const dyslexicFont = localStorage.getItem('dyslexicFont') === 'true';
        const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
        const focusOutline = localStorage.getItem('focusOutline') === 'true';
        
        // Sync structural HTML options interface switch checkboxes checked states to match incoming memory boolean states
        document.getElementById('highContrastToggle').checked = highContrast;
        document.getElementById('largeTextToggle').checked = largeText;
        document.getElementById('dyslexicFontToggle').checked = dyslexicFont;
        document.getElementById('reducedMotionToggle').checked = reducedMotion;
        document.getElementById('focusOutlineToggle').checked = focusOutline;
        
        // Execute real-time theme structural adaptation style overwrites if saved settings states confirm active flags
        if (highContrast) document.body.classList.add('high-contrast');
        if (largeText) document.body.classList.add('large-text');
        if (dyslexicFont) document.body.classList.add('dyslexic-font');
        if (reducedMotion) document.body.classList.add('reduced-motion');
        if (focusOutline) {
            // Dynamically compile and inject explicit CSS high contrast focus outline blocks directly into head document fields tracks
            const style = document.createElement('style');
            style.id = 'focusOutlineStyle';
            style.textContent = `
                :focus {
                    outline: 3px solid var(--accent-cyan) !important;
                    outline-offset: 4px !important;
                }
                button:focus, a:focus, [role="button"]:focus {
                    outline: 3px solid var(--accent-cyan) !important;
                    outline-offset: 4px !important;
                }
            `;
            document.head.appendChild(style); // Append focus stylesheet block layout definitions safely onto active heads paths references
        }
    }
    
    // Serialization writing wrapper saving choice records straight into persistent browser database tables fields
    function saveSetting(setting, value, applyCallback) {
        localStorage.setItem(setting, value); /* Update item data value strings keys tracks directly inside localStorage systems records */
        applyCallback(value); /* Pass output parameter updates down inside operational execution loop tracks to trigger page style changes */
    }
    
    // Input modification listener event tracking state updates shifts across high contrast interface toggles option switches
    document.getElementById('highContrastToggle').addEventListener('change', (e) => {
        saveSetting('highContrast', e.target.checked, (val) => {
            if (val) document.body.classList.add('high-contrast'); /* Apply high-contrast CSS color override class definitions hooks immediately */
            else document.body.classList.remove('high-contrast'); /* Wipe high-visibility color modifiers from page canvas tracks safely */
        });
    });
    
    // Input modification listener event tracking state updates shifts across typography scaling interface toggles option switches
    document.getElementById('largeTextToggle').addEventListener('change', (e) => {
        saveSetting('largeText', e.target.checked, (val) => {
            if (val) document.body.classList.add('large-text'); /* Inject dynamic text enlargement scales tokens into system root frameworks variables */
            else document.body.classList.remove('large-text'); /* Strip text inflation rules instantly to reset standard reading layout footprints */
        });
    });
    
    // Input modification listener event tracking state updates shifts across accessible reading typography switches components
    document.getElementById('dyslexicFontToggle').addEventListener('change', (e) => {
        saveSetting('dyslexicFont', e.target.checked, (val) => {
            if (val) document.body.classList.add('dyslexic-font'); /* Override typography stacks instantly with OpenDyslexic structural readability rules layout shapes */
            else document.body.classList.remove('dyslexic-font'); /* Restore core elegant sans-serif system branding font stack variables rules definitions */
        });
    });
    
    // Input modification listener event tracking state updates shifts across transition animation suppression switches components
    document.getElementById('reducedMotionToggle').addEventListener('change', (e) => {
        saveSetting('reducedMotion', e.target.checked, (val) => {
            if (val) document.body.classList.add('reduced-motion'); /* Halt visual rendering timelines animations and cancel smooth scrolling paths mechanics instantly */
            else document.body.classList.remove('reduced-motion'); /* Permit standard transitional graphics behaviors curves to run naturally across layout changes */
        });
    });
    
    // Input modification listener event tracking state updates shifts across keyboard access indicator switches components
    document.getElementById('focusOutlineToggle').addEventListener('change', (e) => {
        saveSetting('focusOutline', e.target.checked, (val) => {
            const existingStyle = document.getElementById('focusOutlineStyle');
            // Check if switch activation requests clash with existing styles sheets instances data configurations paths
            if (val && !existingStyle) {
                const style = document.createElement('style');
                style.id = 'focusOutlineStyle';
                style.textContent = `
                    :focus {
                        outline: 3px solid var(--accent-cyan) !important;
                        outline-offset: 4px !important;
                    }
                    button:focus, a:focus, [role="button"]:focus {
                        outline: 3px solid var(--accent-cyan) !important;
                        outline-offset: 4px !important;
                    }
                `;
                document.head.appendChild(style); // Inject keyboard outline injection sheet safely onto live head targets maps arrays
            } else if (!val && existingStyle) {
                existingStyle.remove(); /* Instantly wipe explicit focus outline stylesheet blocks elements to revert to stock browser tracks */
            }
        });
    });
    
    // Destructive master preference wiping operation execution listener tracking user format clear queries click events
    document.getElementById('resetAccessibilityBtn').addEventListener('click', () => {
        localStorage.clear(); /* Complete destruction purge clearing all saved user configuration keys metrics entries from browser cache database profiles tables */
        document.body.classList.remove('high-contrast', 'large-text', 'dyslexic-font', 'reduced-motion'); /* Sweep preference override configuration classes clear from body nodes arrays */
        const existingStyle = document.getElementById('focusOutlineStyle');
        if (existingStyle) existingStyle.remove(); /* Purge dynamic accessibility tracking outline stylesheets components records from head layers */
        
        // Set individual preference switch interface controls graphic switches checkboxes completely back to default off settings values
        document.getElementById('highContrastToggle').checked = false;
        document.getElementById('largeTextToggle').checked = false;
        document.getElementById('dyslexicFontToggle').checked = false;
        document.getElementById('reducedMotionToggle').checked = false;
        document.getElementById('focusOutlineToggle').checked = false;
    });
    
    // Automatically fire database reading loops sequences immediately upon page runtime lifecycle initiation checkpoints
    loadSettings();
})(); // Concludes persistent preference optimization logic initialization sequence scripts

// Immediately Invoked Function Expression (IIFE) running structural page positioning calculations and lazy entrance animation observers
(function(){
    // Structured registry array grouping tracking layout properties, companion DOM card elements anchors, and code decoration headings
    const sections = [
        { id: 'hero', element: document.querySelector('.component-hero'), codeBlock: null },
        { id: 'about', element: document.querySelector('.component-about'), codeBlock: document.querySelector('.component-hero + .component-code-header') },
        { id: 'skills', element: document.querySelector('.grid-container#skills'), codeBlock: document.querySelectorAll('.component-code-header')[2] },
        { id: 'services', element: document.querySelector('.grid-container#services'), codeBlock: document.querySelectorAll('.component-code-header')[3] },
        { id: 'store', element: document.querySelector('.products-container'), codeBlock: document.querySelectorAll('.component-code-header')[4] },
        { id: 'clients', element: document.querySelector('.clients-container'), codeBlock: document.querySelectorAll('.component-code-header')[5] },
        { id: 'blog', element: document.querySelector('.blog-container'), codeBlock: document.querySelectorAll('.component-code-header')[6] }
    ];
    
    // Normalization processing scan checking that all structural elements maps anchor points carry explicitly active HTML ID tag keys
    sections.forEach(section => {
        if (section.element && !section.element.id) {
            section.element.id = section.id; /* Map configuration names keys straight into hardware element identifier attributes fields fields */
        }
    });
    
    // Flatten list records mapping both components cards nodes and structural coding header simulations side-by-side inside tracking indexes
    const scrollElements = [];
    sections.forEach(section => {
        if (section.element) {
            scrollElements.push({ id: section.id, element: section.element });
        }
        if (section.codeBlock) {
            // Parse dynamic NodeList arrays packages safely to extract nested data arrays structures elements links maps loops
            if (section.codeBlock.length) {
                section.codeBlock.forEach(block => {
                    scrollElements.push({ id: section.id, element: block });
                });
            } else if (section.codeBlock) {
                scrollElements.push({ id: section.id, element: section.codeBlock });
            }
        }
    });
    
    // Collect list array links formatting sidebar dashboard indicator button links nodes parameters elements
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    // Structural theme style updater setting active configuration classes across selected category shortcuts button layouts links
    function setActive(id) {
        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            // Check if current target items match calculation location keys variables output
            if (sectionId === id) {
                item.classList.add('active'); /* Add neon display indicators highlighting active choices states instantly */
            } else {
                item.classList.remove('active'); /* Tear down highlights modifiers from inactive menu categories button lines tags */
            }
        });
    }
    
    // Automated smooth viewport scroll tracking navigation driver routing screen tracks precisely to targeted component blocks cards
    function scrollTo(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' }); /* Fire fluid native layout scroll engine sequences targeting topmost screen edges layout lines */
            setActive(id); /* Force navigation panel active state markers updates ahead of scroll calculation loops delays checks */
        }
    }
    
    // Attach action click processing interception loops across menu buttons shortcuts to manage animated view transformations tracks
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            if (section) scrollTo(section); /* Launch automated positioning animations drivers immediately upon link clicking inputs events */
        });
    });
    
    // Performance throttled vertical coordinate observation calculation logic managing tracking changes indicator updates maps rules
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            // Request client display thread optimization hooks to run calculations safely along hardware frame refresh markers lines
            requestAnimationFrame(() => {
                const viewportTop = window.scrollY + 100; /* Factor small upper layout cushion buffer spaces into current viewport position numbers */
                let currentSection = 'hero'; // Set fallback default positioning states zones indices labels
                let closestDistance = Infinity; // Set calculation threshold tracking parameter limits to initialization infinity values
                
                // Loop across tracking records lists evaluating element proximity margins relative to viewport viewing boxes thresholds
                scrollElements.forEach(({ id, element }) => {
                    if (element) {
                        const rect = element.getBoundingClientRect(); // Capture physical screen matrix pixel positions coordinates tracking parameters
                        const elementTop = rect.top + window.scrollY; // Calculate absolute vertical distance maps values measuring from top layout origins
                        const distance = Math.abs(elementTop - viewportTop); // Compute mathematical gap intervals running between viewport points and card edges lines
                        
                        // Check if current layout items have breached top view thresholds lines safely under closer parameters matches
                        if (rect.top <= 200 && distance < closestDistance) {
                            closestDistance = distance; /* Overwrite previous records with tightest spacing verification matches scores metrics */
                            currentSection = id; /* Extract current target identity tags to determine valid tracking zone locations names */
                        }
                    }
                });
                
                setActive(currentSection); /* Sync sidebar selection highlights markers directly to match computed positioning values output */
                ticking = false; /* Open throttling barriers blocks safely to permit subsequent coordinate tracking computations data entries */
            });
            ticking = true; /* Close structural checking gates to block layout observation flood bugs across active animation sequences threads */
        }
    });
    
    // Fire synthetic initial scroll tracking trigger routines to configure starting selection markers locations during load screens checkpoints
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
    
    // Modern asynchronous Intersection Observer tracker managing dynamic entrance animation lazy deployment workflows metrics
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Check if targeted components cards cards have crossed visually inside browser scanning margins parameters parameters
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in'); /* Fire hardware accelerated slide and transition entry visualization styles class tags paths */
                    observer.unobserve(entry.target); /* Strip observation checks tracking loops off elements maps once visual reveal cycles finish successfully */
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' } // Fine-tuned layout trigger configuration bounds adjusting tracking entry lines padding parameters
    );
    
    // Register all functional page section panel containers and simulated code elements blocks targets directly inside lazy animation engines tracks
    document.querySelectorAll('.component-hero, .component-about, .grid-container, .products-container, .clients-container, .blog-container, .component-code-header, .disclaimer-section, .site-footer').forEach(el => observer.observe(el));
    
    // Global system security parameters restricting standard browser mouse operations to optimize application structural design safety profiles
    document.addEventListener('contextmenu', e => e.preventDefault()); /* Absolute block suppression blocking traditional mouse right-click popup context options listings tracks menus templates */
    document.addEventListener('dragstart', e => e.preventDefault()); /* Strict interception blocking item asset click dragging operations to protect visual elements tracks coordinates metrics */
})(); // Terminate core scroll positioning calculations layout scripts packages completely