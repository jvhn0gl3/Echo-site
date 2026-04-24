/**
 * Keep Android Open – Static Banner (ECHO://OS Edition)
 * Adaption: Removed countdown logic, internalizing styles and branding.
 */
(function () {
  "use strict";

  var messages = {
    en: "Android will become a locked-down platform",
    es: "Android se convertir\u00E1 en una plataforma cerrada",
    fr: "Android va devenir une plateforme ferm\u00E9e",
    de: "Android wird eine geschlossene Plattform werden.",
    zh: "\u5B89\u5353\u5C06\u6210\u4E3A\u4E00\u4E2A\u5C01\u95ED\u5E73\u53F0",
    ja: "Androidは閉鎖的なプラットフォームになろうとしています",
    ko: "Android\uAC00 \uD3D0\uC1C4\uB41C \uD50C\uB7AB\uD3FC\u0 Korean",
    pt: "O Android se tornar\u00E1 uma plataforma fechada",
    ru: "Android \u0441\u0442\u0430\u043D\u0435\u0442 \u0437\u0430\u043A\u0440\u044B\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439",
    it: "Android diventer\u00E0 una piattaforma bloccata"
  };

  function resolveLocale() {
    var tag = document.documentElement.lang || navigator.language || "en";
    var base = tag.toLowerCase().split("-")[0];
    return messages[base] ? base : "en";
  }

  var locale = resolveLocale();
  var storageKey = "kao-banner-hidden";
  var dismissDays = 30;

  // Check dismissal
  try {
    var dismissed = localStorage.getItem(storageKey);
    if (dismissed) {
      var elapsed = Date.now() - Number(dismissed);
      if (elapsed < dismissDays * 24 * 60 * 60 * 1000) return;
    }
  } catch (e) {}

  var banner = document.createElement("div");
  banner.className = "kao-banner";

  var link = document.createElement("a");
  link.href = "https://keepandroidopen.org" + (locale === "en" ? "" : "/" + locale + "/");
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = messages[locale];
  banner.appendChild(link);

  var closeBtn = document.createElement("button");
  closeBtn.className = "kao-banner-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "\u2715";
  closeBtn.onclick = function() {
    banner.style.display = "none";
    try { localStorage.setItem(storageKey, String(Date.now())); } catch (e) {}
  };
  banner.appendChild(closeBtn);

  // Automatic target detection
  var target = document.getElementById("kao-banner") || document.body.firstChild;
  if (target === document.body.firstChild) {
      document.body.insertBefore(banner, document.body.firstChild);
  } else {
      target.appendChild(banner);
  }
})();
