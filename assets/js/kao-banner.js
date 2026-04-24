/**
 * Keep Android Open – Static Banner (ECHO://OS Edition)
 * Adaption: Removed countdown logic for high-density UI synchronization.
 */
(function () {
  "use strict";

  var messages = {
    fa:      "اندروید، یک سکّوی بسته خواهد شد!",
    ar:      "سيصبح نظام أندرويد منصة مغلقة",
    he:      "אנדרואיד תהפוך לפלטפורמה נעולה",
    en:      "Android will become a locked-down platform",
    ca:      "Android es convertir\u00E0 en una plataforma tancada",
    cs:      "Android se stane uzamčenou platformou",
    de:      "Android wird eine geschlossene Plattform werden.",
    da:      "Android vil blive en lukket platform",
    nl:      "Android zal een gesloten platform worden",
    el:      "\u03A4\u03BF Android \u03B8\u03B1 \u03B3\u03AF\u03BD\u03B5\u03B9 \u03BC\u03AF\u03B1 \u03BA\u03BB\u03B5\u03B9\u03C3\u03C4\u03AE \u03C0\u03BB\u03B1\u03C4\u03C6\u03CC\u03C1\u03BC\u03B1",
    es:      "Android se convertir\u00E1 en una plataforma cerrada",
    fr:      "Android va devenir une plateforme ferm\u00E9e",
    id:      "Android akan menjadi platform yang terkunci.",
    it:      "Android diventer\u00E0 una piattaforma bloccata",
    ko:      "Android\uAC00 \uD3D0\uC1C4\uB41C \uD50C\uB7AB\uD3FC\u0 Korean",
    pl:      "Android stanie si\u0119 platform\u0105 zamkni\u0119t\u0105",
    "pt-BR": "O Android se tornar\u00E1 uma plataforma fechada",
    ru:      "Android \u0441\u0442\u0430\u043D\u0435\u0442 \u0437\u0430\u043A\u0440\u044B\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439",
    sk:      "Android sa stane uzamknutou platformou",
    th:      "Android\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1E\u0E25\u0E15\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E25\u0E47\u0E2D\u0E01",
    tr:      "Android k\u0131s\u0131tl\u0131 bir platform haline gelecek.",
    uk:      "Android \u0441\u0442\u0430\u043D\u0435 \u0437\u0430\u043A\u0440\u0438\u0442\u043E\u044E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u044E",
    "zh-CN": "\u5B89\u5353\u5C06\u6210\u4E3A\u4E00\u4E2A\u5C01\u95ED\u5E73\u53F0",
    "zh-TW": "Android \u5C07\u6210\u70BA\u4E00\u500B\u5C01\u9589\u5E73\u53F0",
    ja:      "Androidは閉鎖的なプラットフォームになろうとしています",
    fi:      "Androidista tulee suljettu alusta",
    hu:      "Az Android egy lezárt platform lesz",
    vi:      "Android sẽ trở thành một hệ điều hành đóng",
    bg:      "Android ще стане заключена платформа",
    be:      "Android \u0441\u0442\u0430\u043d\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u0430\u0439 \u043f\u043b\u0430\u0444\u0442\u043e\u0440\u043c\u0430\u0439",
  };

  function getScriptParams() {
    var params = {};
    try {
      var src = document.currentScript && document.currentScript.src;
      if (!src) return params;
      var q = src.indexOf("?");
      if (q === -1) return params;
      var pairs = src.substring(q + 1).split("&");
      for (var i = 0; i < pairs.length; i++) {
        var kv = pairs[i].split("=");
        params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
      }
    } catch (e) {}
    return params;
  }

  var params = getScriptParams();

  function resolveLocale(tag) {
    if (!tag) return "en";
    if (messages[tag]) return tag;
    var lower = tag.toLowerCase();
    for (var key in messages) {
      if (key.toLowerCase() === lower) return key;
    }
    var base = lower.split("-")[0];
    for (var key2 in messages) {
      if (key2.toLowerCase() === base) return key2;
    }
    return "en";
  }

  var locale = resolveLocale(
    params.lang ||
    document.documentElement.lang ||
    navigator.language ||
    navigator.userLanguage
  );

  var linkParam = params.link;
  var defaultLink = "https://keepandroidopen.org" + (locale === "en" ? "" : "/" + locale + "/");
  var linkUrl = linkParam === "none" ? null : (linkParam || defaultLink);

  var showClose = params.hidebutton !== "off";
  var storageKey = "kao-banner-hidden";
  var dismissDays = 30;

  if (showClose) {
    try {
      var dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        var elapsed = Date.now() - Number(dismissed);
        if (elapsed < dismissDays * 24 * 60 * 60 * 1000) return;
        localStorage.removeItem(storageKey);
      }
    } catch (e) {}
  }

  var banner = document.createElement("div");
  banner.className = "kao-banner";

  var messageText = messages[locale] || messages.en;

  if (linkUrl) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = messageText;
    banner.appendChild(link);
  } else {
    banner.appendChild(document.createTextNode(messageText));
  }

  if (showClose) {
    var closeBtn = document.createElement("button");
    closeBtn.className = "kao-banner-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "\u2715";
    closeBtn.addEventListener("click", function () {
      banner.style.display = "none";
      try { localStorage.setItem(storageKey, String(Date.now())); } catch (e) {}
    });
    banner.appendChild(closeBtn);
  }

  var targetId = params.id;
  if (targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      target.appendChild(banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  } else {
    document.body.insertBefore(banner, document.body.firstChild);
  }
})();
