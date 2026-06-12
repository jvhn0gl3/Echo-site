/**
 * V3 Digital Architect - Email Module
 * Handles email composition and sending for skill and service inquiries
 */

// Automation helper function assembling and launching context-specific email queries regarding application technical skills
window.sendSkillMessage = function(skillName, skillDetails) {
  // Build customized inquiry title string variable utilizing argument strings passed via item interaction click calls
  const subject = `Inquiry about: ${skillName}`;
  // Multi-line template generation routine packing raw inquiry context arrays together with clean user inputs placeholder lines
  const body = `Hello V3,%0D%0A%0D%0AI'm interested in your ${skillName} service.%0D%0A%0D%0ASkill Details: ${skillDetails}%0D%0A%0D%0A%0D%0A--- Please fill out the following ---%0D%0A%0D%0AProject Description:%0D%0A%0D%0ATimeline:%0D%0A%0D%0ABudget Range:%0D%0A%0D%0AAdditional Notes:%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
  // Fires browser window allocation operations driving direct mail client app handshakes passing completed instruction payloads
  window.location.href = `mailto:${window.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Automation helper function assembling and launching formal project estimation quote request emails routing assignment variables
window.sendServiceMessage = function(serviceName, serviceDetails) {
  // Builds customized business quotation subject headers labels incorporating structural interaction parameters values
  const subject = `Quote Request: ${serviceName}`;
  // Multi-line project proposal structural prompt injection skeleton tracking commercial service deployment metrics requests lines
  const body = `Hello V3,%0D%0A%0D%0AI'd like to request a quote for your ${serviceName} service.%0D%0A%0D%0AService Details: ${serviceDetails}%0D%0A%0D%0A%0D%0A--- Please fill out the following ---%0D%0A%0D%0AProject Description:%0D%0A%0D%0ATimeline:%0D%0A%0D%0ABudget Range:%0D%0A%0D%0AAdditional Requirements:%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
  // Dispatches assembled commercial request strings straight to native system email processors engines safely
  window.location.href = `mailto:${window.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};