/**
 * V3 Digital Architect - Navigation Module
 * Handles scroll spy, active section highlighting, and smooth scrolling
 */

// Immediately Invoked Function Expression (IIFE) running structural page positioning calculations
(function(){
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
    
    // Global system security parameters restricting standard browser mouse operations to optimize application structural design safety profiles
    document.addEventListener('contextmenu', e => e.preventDefault()); /* Absolute block suppression blocking traditional mouse right-click popup context options listings tracks menus templates */
    document.addEventListener('dragstart', e => e.preventDefault()); /* Strict interception blocking item asset click dragging operations to protect visual elements tracks coordinates metrics */
})(); // Terminate core scroll positioning calculations layout scripts packages completely