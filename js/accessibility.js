/**
 * V3 Digital Architect - Accessibility Module
 * Manages user preference settings with localStorage persistence
 */

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