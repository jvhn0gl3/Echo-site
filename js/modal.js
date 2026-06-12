/**
 * V3 Digital Architect - Modal Module
 * Handles opening and closing of social and accessibility modals
 */

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