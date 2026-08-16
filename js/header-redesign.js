(() => {
  "use strict";

  const STYLE_ID = "luna-header-redesign-style";
  const MENU_ID = "luna-profile-menu";

  const css = `
    :root {
      --luna-header-height: 66px;
      --luna-header-gold: #e6c579;
      --luna-header-gold-soft: rgba(230,197,121,.16);
      --luna-header-panel: rgba(5,8,20,.82);
      --luna-header-line: rgba(230,197,121,.18);
    }

    .sidebar { display: none !important; }
    .shell {
      width: min(1540px, calc(100% - 24px)) !important;
      display: block !important;
      margin: 12px auto !important;
    }
    main { min-width: 0; }

    .topbar.luna-topbar {
      min-height: var(--luna-header-height);
      height: 66px;
      padding: 8px 14px;
      display: grid !important;
      grid-template-columns: minmax(270px, 1fr) minmax(280px, 1.35fr) minmax(270px, 1fr);
      align-items: center;
      gap: 20px;
      position: sticky;
      top: 12px;
      z-index: 100;
      border-radius: 14px;
      background: var(--luna-header-panel);
    }

    .luna-brand-zone {
      grid-column: 3;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 18px;
      direction: rtl;
      min-width: 0;
    }
    .luna-header-logo {
      color: var(--luna-header-gold);
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 31px;
      font-weight: 500;
      letter-spacing: 7px;
      line-height: 1;
      text-decoration: none;
      white-space: nowrap;
      text-shadow: 0 0 22px rgba(230,197,121,.13);
    }
    .luna-category {
      appearance: none;
      border: 0;
      border-right: 1px solid var(--luna-header-line);
      background: transparent;
      color: var(--muted);
      padding: 4px 17px 4px 4px;
      font: 500 12px Inter, Arial, sans-serif;
      cursor: pointer;
      outline: none;
    }
    .luna-category:hover { color: var(--luna-header-gold); }
    .luna-category option { background: #080b19; color: #eee9dc; }

    .luna-search-zone {
      grid-column: 2;
      width: 100%;
      max-width: 620px;
      justify-self: center;
    }
    .luna-search-zone .search { max-width: none !important; width: 100%; }
    .luna-search-zone .search input {
      height: 42px;
      padding: 10px 17px 10px 44px;
      background: rgba(1,3,11,.42);
      border-color: rgba(255,255,255,.10);
      box-shadow: inset 0 0 0 1px rgba(230,197,121,.025);
    }
    .luna-search-zone .search span { top: 10px; left: 16px; }

    .luna-actions-zone {
      grid-column: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      direction: ltr;
    }
    .luna-write-wrap { position: relative; }
    .luna-write-button {
      border: 0;
      background: transparent;
      color: var(--text);
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 7px;
      font: 600 13px Inter, Arial, sans-serif;
      cursor: pointer;
      transition: .2s ease;
    }
    .luna-write-button:hover { color: var(--luna-header-gold); transform: translateY(-1px); }
    .luna-feather {
      width: 21px;
      height: 21px;
      color: var(--luna-header-gold);
      filter: drop-shadow(0 0 7px rgba(230,197,121,.18));
    }
    .luna-write-menu {
      position: absolute;
      left: 0;
      top: calc(100% + 9px);
      width: 190px;
      padding: 7px;
      border: 1px solid var(--luna-header-line);
      border-radius: 12px;
      background: rgba(7,10,24,.96);
      box-shadow: 0 22px 60px rgba(0,0,0,.48);
      opacity: 0;
      transform: translateY(-5px);
      pointer-events: none;
      transition: .18s ease;
    }
    .luna-write-wrap.open .luna-write-menu { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .luna-menu-item {
      width: 100%;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: var(--text);
      padding: 10px 11px;
      text-align: right;
      cursor: pointer;
      font: 500 12px Inter, Arial, sans-serif;
    }
    .luna-menu-item:hover { background: var(--luna-header-gold-soft); color: var(--luna-header-gold); }

    .luna-user-wrap { position: relative; }
    .luna-user-button {
      width: 38px;
      height: 38px;
      padding: 0;
      border-radius: 50%;
      border: 1px solid rgba(230,197,121,.42);
      background: linear-gradient(145deg, #2a2143, #b28a42);
      color: #f4e2ac;
      display: grid;
      place-items: center;
      cursor: pointer;
      overflow: hidden;
      box-shadow: 0 0 0 3px rgba(230,197,121,.045);
      transition: .2s ease;
    }
    .luna-user-button:hover { transform: translateY(-1px); box-shadow: 0 0 0 4px rgba(230,197,121,.08); }
    .luna-user-button img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .luna-user-fallback { font-family: "Cormorant Garamond", serif; font-size: 19px; }

    .luna-profile-menu {
      position: absolute;
      left: 0;
      top: calc(100% + 9px);
      width: 225px;
      padding: 8px;
      border: 1px solid var(--luna-header-line);
      border-radius: 13px;
      background: rgba(7,10,24,.97);
      box-shadow: 0 24px 70px rgba(0,0,0,.52);
      opacity: 0;
      transform: translateY(-5px);
      pointer-events: none;
      transition: .18s ease;
      direction: rtl;
    }
    .luna-user-wrap.open #${MENU_ID} { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .luna-menu-head { padding: 9px 11px 11px; border-bottom: 1px solid rgba(255,255,255,.07); margin-bottom: 5px; }
    .luna-menu-head strong { display: block; color: var(--text); font: 600 13px Inter, Arial, sans-serif; }
    .luna-menu-head span { display: block; color: var(--muted); font-size: 10px; margin-top: 3px; }
    .luna-menu-divider { height: 1px; background: rgba(255,255,255,.07); margin: 5px 2px; }
    .luna-lang-row { display: flex; gap: 5px; padding: 4px; }
    .luna-lang {
      flex: 1;
      border: 1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.025);
      color: var(--muted);
      border-radius: 7px;
      padding: 7px;
      cursor: pointer;
      font-size: 10px;
    }
    .luna-lang.active, .luna-lang:hover { color: var(--luna-header-gold); border-color: rgba(230,197,121,.25); background: var(--luna-header-gold-soft); }
    .luna-logout { color: #d99797 !important; }

    @media (max-width: 900px) {
      .topbar.luna-topbar {
        grid-template-columns: auto 1fr auto;
        gap: 9px;
      }
      .luna-category { display: none; }
      .luna-brand-zone { grid-column: 3; }
      .luna-search-zone { grid-column: 2; }
      .luna-actions-zone { grid-column: 1; }
      .luna-write-button span { display: none; }
    }
    @media (max-width: 620px) {
      .shell { width: calc(100% - 12px) !important; margin: 6px auto !important; }
      .topbar.luna-topbar { top: 6px; height: 58px; min-height: 58px; padding: 6px 9px; }
      .luna-header-logo { font-size: 25px; letter-spacing: 5px; }
      .luna-search-zone .search input { height: 38px; }
      .luna-user-button { width: 34px; height: 34px; }
      .luna-write-button { padding: 7px 3px; }
    }
  `;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function go(view) {
    if (typeof window.showView === "function") window.showView(view);
    closeMenus();
  }

  function closeMenus() {
    document.querySelectorAll(".luna-write-wrap.open, .luna-user-wrap.open").forEach(el => el.classList.remove("open"));
  }

  function avatarMarkup() {
    return `<span class="luna-user-fallback">☾</span>`;
  }

  function buildHeader() {
    const old = document.querySelector(".topbar");
    if (!old || old.dataset.lunaRedesigned === "1") return;

    old.dataset.lunaRedesigned = "1";
    old.classList.add("luna-topbar");
    old.innerHTML = `
      <div class="luna-brand-zone">
        <a class="luna-header-logo" href="#" onclick="showView('home');return false;">LUNA</a>
        <select class="luna-category" id="lunaCategory" aria-label="التصنيف">
          <option value="">التصنيفات</option>
          <option value="romance">رومانسية</option>
          <option value="fantasy">فانتازيا</option>
          <option value="mystery">غموض</option>
          <option value="thriller">إثارة</option>
          <option value="historical">تاريخية</option>
          <option value="science-fiction">خيال علمي</option>
          <option value="horror">رعب</option>
          <option value="short">قصص قصيرة</option>
        </select>
      </div>

      <div class="luna-search-zone">
        <div class="search">
          <span>⌕</span>
          <input id="globalSearch" placeholder="ابحث عن رواية أو كاتب..." autocomplete="off">
        </div>
      </div>

      <div class="luna-actions-zone">
        <div class="luna-write-wrap" id="lunaWriteWrap">
          <button class="luna-write-button" id="lunaWriteButton" type="button" aria-expanded="false">
            <svg class="luna-feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.7 3.3c-4.7.2-8.1 1.8-10.2 4.7-1.5 2.1-2.1 4.5-2.3 6.4l-3.8 3.8 1.2 1.2 3.8-3.8c1.9-.2 4.3-.8 6.4-2.3 2.9-2.1 4.5-5.5 4.9-10z"/>
              <path d="M8.2 14.8 18.7 4.3"/>
              <path d="M11.2 8.9 7.6 5.3"/>
              <path d="M15.1 12.8 18.7 16.4"/>
            </svg>
            <span>اكتب</span>
          </button>
          <div class="luna-write-menu">
            <button class="luna-menu-item" type="button" onclick="showView('writer');document.getElementById('lunaWriteWrap').classList.remove('open');">✎ قصصي</button>
            <button class="luna-menu-item" type="button" onclick="newStory();document.getElementById('lunaWriteWrap').classList.remove('open');">✦ اكتب قصة جديدة</button>
          </div>
        </div>

        <div class="luna-user-wrap" id="lunaUserWrap">
          <button class="luna-user-button" id="lunaUserButton" type="button" aria-label="حسابي" aria-expanded="false">${avatarMarkup()}</button>
          <div class="luna-profile-menu" id="${MENU_ID}">
            <div class="luna-menu-head">
              <strong id="lunaMenuName">حساب LUNA</strong>
              <span id="lunaMenuHint">الملف الشخصي والإعدادات</span>
            </div>
            <button class="luna-menu-item" type="button" data-view="profile">◉ الملف الشخصي</button>
            <button class="luna-menu-item" type="button" data-view="messages">✉ الرسائل</button>
            <button class="luna-menu-item" type="button" data-view="notifications">♧ الإشعارات</button>
            <button class="luna-menu-item" type="button" data-view="settings">⚙ الإعدادات</button>
            <div class="luna-menu-divider"></div>
            <div class="luna-menu-item" style="cursor:default">اللغة</div>
            <div class="luna-lang-row">
              <button class="luna-lang active" type="button" data-lang="ar">العربية</button>
              <button class="luna-lang" type="button" data-lang="en">English</button>
            </div>
            <div class="luna-menu-divider"></div>
            <button class="luna-menu-item luna-logout" type="button" id="lunaLogout">↪ تسجيل الخروج</button>
          </div>
        </div>
      </div>
    `;

    const writeWrap = document.getElementById("lunaWriteWrap");
    const writeButton = document.getElementById("lunaWriteButton");
    const userWrap = document.getElementById("lunaUserWrap");
    const userButton = document.getElementById("lunaUserButton");

    writeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      userWrap.classList.remove("open");
      writeWrap.classList.toggle("open");
      writeButton.setAttribute("aria-expanded", writeWrap.classList.contains("open"));
    });

    userButton.addEventListener("click", (event) => {
      event.stopPropagation();
      writeWrap.classList.remove("open");
      userWrap.classList.toggle("open");
      userButton.setAttribute("aria-expanded", userWrap.classList.contains("open"));
    });

    document.querySelectorAll("#luna-profile-menu [data-view]").forEach(button => {
      button.addEventListener("click", () => go(button.dataset.view));
    });

    document.getElementById("lunaLogout").addEventListener("click", async () => {
      try {
        if (window.supabase && window.LUNA_SUPABASE_CLIENT?.auth) {
          await window.LUNA_SUPABASE_CLIENT.auth.signOut();
        }
      } catch (_) {}
      if (typeof window.signOut === "function") window.signOut();
      else go("home");
      closeMenus();
    });

    document.querySelectorAll(".luna-lang").forEach(button => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });

    document.getElementById("lunaCategory").addEventListener("change", (event) => {
      const value = event.target.value;
      if (!value) return;
      const discoverSearch = document.getElementById("discoverSearch");
      go("discover");
      if (discoverSearch) {
        discoverSearch.value = value;
        discoverSearch.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    document.addEventListener("click", closeMenus);
    old.querySelectorAll("button").forEach(button => button.addEventListener("click", e => e.stopPropagation()));
  }

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.querySelectorAll(".luna-lang").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
    localStorage.setItem("luna-language", lang);
    const menuHint = document.getElementById("lunaMenuHint");
    if (menuHint) menuHint.textContent = lang === "en" ? "Profile, messages and settings" : "الملف الشخصي والإعدادات";
    if (typeof window.toast === "function") window.toast(lang === "en" ? "English selected" : "تم اختيار العربية");
  }

  function refreshAvatar() {
    const button = document.getElementById("lunaUserButton");
    if (!button) return;
    const candidates = [
      window.LUNA_PROFILE_AVATAR,
      document.querySelector("#profileAvatar")?.style.backgroundImage?.match(/url\\([\"']?(.*?)[\"']?\\)/)?.[1]
    ].filter(Boolean);
    if (candidates[0]) {
      button.innerHTML = `<img src="${String(candidates[0]).replace(/"/g, '&quot;')}" alt="">`;
    }
  }

  function start() {
    addStyles();
    buildHeader();
    const saved = localStorage.getItem("luna-language");
    if (saved === "en" || saved === "ar") setLanguage(saved);
    refreshAvatar();
    setTimeout(refreshAvatar, 1200);
    setTimeout(refreshAvatar, 3000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
