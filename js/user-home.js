(() => {
  "use strict";

  const STYLE_ID = "luna-user-home-style";
  const VIEW_ID = "luna-user-home";
  let originalShowView = null;
  let client = null;
  let ready = false;

  const css = `
    #${VIEW_ID}{display:none;min-height:calc(100vh - 105px);padding:18px 0 34px;direction:rtl}
    #${VIEW_ID}.active{display:block}
    .luna-home-wrap{max-width:1250px;margin:0 auto}
    .luna-welcome{padding:28px 24px 24px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;border:1px solid rgba(230,197,121,.12);border-radius:16px;background:radial-gradient(circle at 85% 15%,rgba(102,76,150,.16),transparent 32%),linear-gradient(120deg,rgba(8,11,27,.78),rgba(12,16,34,.42));box-shadow:0 25px 70px rgba(0,0,0,.18)}
    .luna-welcome-kicker{font-size:10px;letter-spacing:3px;color:#a99a78;margin-bottom:8px}
    .luna-welcome h1{margin:0;font-family:"Cormorant Garamond",serif;font-size:42px;font-weight:500;color:var(--text);line-height:1.05}
    .luna-welcome h1 span{color:var(--gold)}
    .luna-welcome p{margin:9px 0 0;color:var(--muted);font-size:12px}
    .luna-home-quick{display:flex;gap:8px;flex-wrap:wrap}
    .luna-home-quick button{border:1px solid rgba(230,197,121,.2);background:rgba(230,197,121,.06);color:var(--gold);padding:9px 13px;border-radius:9px;font:600 11px Inter,Arial,sans-serif;cursor:pointer}
    .luna-home-quick button:hover{background:rgba(230,197,121,.12)}
    .luna-home-section{margin-top:16px;padding:20px;border:1px solid rgba(255,255,255,.06);border-radius:14px;background:rgba(3,6,16,.25)}
    .luna-home-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
    .luna-home-section-head h2{margin:0;font:500 28px "Cormorant Garamond",serif;color:var(--text)}
    .luna-home-section-head span{font-size:10px;color:#727587}
    .luna-home-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
    .luna-home-cards .card{min-width:0}
    .luna-resume{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center;padding:17px;border:1px solid rgba(230,197,121,.12);border-radius:12px;background:linear-gradient(100deg,rgba(230,197,121,.045),rgba(67,52,101,.07))}
    .luna-resume-copy strong{display:block;font:600 16px "Cormorant Garamond",serif;color:var(--text)}
    .luna-resume-copy p{margin:5px 0 0;font-size:11px;color:var(--muted)}
    .luna-resume-bar{height:4px;margin-top:12px;border-radius:10px;background:rgba(255,255,255,.07);overflow:hidden}.luna-resume-bar i{display:block;width:36%;height:100%;background:var(--gold);border-radius:10px}
    .luna-empty-home{min-height:150px;display:grid;place-items:center;text-align:center;border:1px dashed rgba(214,184,107,.15);border-radius:11px;background:radial-gradient(circle at center,rgba(73,55,106,.09),transparent 58%)}
    .luna-empty-home strong{display:block;font:500 23px "Cormorant Garamond",serif;color:var(--text)}.luna-empty-home p{margin:6px 0 0;color:var(--muted);font-size:11px}
    @media(max-width:950px){.luna-home-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.luna-welcome{align-items:flex-start;flex-direction:column}}
    @media(max-width:700px){.luna-home-wrap{padding:0 8px}.luna-home-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.luna-welcome{padding:22px 18px}.luna-welcome h1{font-size:34px}.luna-home-section{padding:14px}.luna-resume{grid-template-columns:1fr}}
    @media(max-width:440px){.luna-home-cards{grid-template-columns:1fr}.luna-home-section-head h2{font-size:25px}}
  `;

  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement("style");style.id=STYLE_ID;style.textContent=css;document.head.appendChild(style);
  }

  function esc(value){
    return String(value??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
  }

  function getName(session){
    return session?.user?.user_metadata?.display_name || session?.user?.user_metadata?.username || session?.user?.email?.split("@")[0] || "قارئ لونا";
  }

  function createView(){
    if(document.getElementById(VIEW_ID))return document.getElementById(VIEW_ID);
    const main=document.querySelector("main");
    if(!main)return null;
    const view=document.createElement("section");view.id=VIEW_ID;view.className="view";
    view.innerHTML=`<div class="luna-home-wrap">
      <section class="luna-welcome">
        <div><div class="luna-welcome-kicker">YOUR LUNA · HOME</div><h1>مرحبًا بك في <span id="lunaWelcomeName">لونا</span></h1><p>سماؤك القصصية تبدأ من هنا. تابع ما تركته، واكتشف حكاية جديدة.</p></div>
        <div class="luna-home-quick"><button type="button" onclick="showView('discover')">اكتشف الروايات</button><button type="button" onclick="newStory()">اكتب قصة جديدة</button></div>
      </section>
      <section class="luna-home-section" id="lunaResumeSection"><div class="luna-home-section-head"><h2>تابع القراءة</h2><span>من حيث توقفت</span></div><div class="luna-resume"><div class="luna-resume-copy"><strong>لم تبدأ قصة بعد</strong><p>ستظهر هنا الرواية التي كنت تقرؤها مع تقدمك في الفصول.</p><div class="luna-resume-bar"><i></i></div></div><button class="btn subtle" type="button" onclick="showView('discover')">اكتشف قصة</button></div></section>
      <section class="luna-home-section"><div class="luna-home-section-head"><h2>من أجلك</h2><span id="lunaForYouCount">روايات لونا</span></div><div class="luna-home-cards" id="lunaForYouCards"></div></section>
      <section class="luna-home-section"><div class="luna-home-section-head"><h2>أحدث الروايات</h2><span>وصلت حديثًا إلى لونا</span></div><div class="luna-home-cards" id="lunaLatestCards"></div></section>
    </div>`;
    main.appendChild(view);return view;
  }

  function emptyMarkup(text="لا توجد روايات بعد"){
    return `<div class="luna-empty-home" style="grid-column:1/-1"><div><strong>${text}</strong><p>عندما تصل القصص الجديدة ستجدها هنا.</p></div></div>`;
  }

  function copyExistingCards(target,count=4){
    const source=document.getElementById("homeStories");
    if(!source)return 0;
    const cards=[...source.querySelectorAll(":scope > .card")].slice(0,count);
    if(!cards.length)return 0;
    target.innerHTML="";cards.forEach(card=>target.appendChild(card.cloneNode(true)));return cards.length;
  }

  async function fetchStories(){
    if(!client)return [];
    try{
      const result=await client.from("stories").select("id,title,cover_url,status,created_at,profile:profiles(display_name)").order("created_at",{ascending:false}).limit(12);
      if(result.error)throw result.error;
      return result.data||[];
    }catch(error){console.warn("LUNA home stories:",error);return []}
  }

  function storyCard(story){
    return `<article class="card" onclick="openStory(${Number(story.id)})"><div class="cover">${story.cover_url?`<img src="${esc(story.cover_url)}" alt="">`:"☾"}</div><h4>${esc(story.title||"بدون عنوان")}</h4><small>${esc(story.profile?.display_name||"كاتب لونا")}${story.status?` · ${esc(story.status)}`:""}</small></article>`;
  }

  async function render(session){
    const view=createView();if(!view)return;
    const name=getName(session);const nameEl=document.getElementById("lunaWelcomeName");if(nameEl)nameEl.textContent=name;
    const forYou=document.getElementById("lunaForYouCards"),latest=document.getElementById("lunaLatestCards");
    const stories=await fetchStories();
    if(stories.length){
      latest.innerHTML=stories.slice(0,4).map(storyCard).join("");
      forYou.innerHTML=stories.slice(4,8).map(storyCard).join("");
      if(!forYou.innerHTML)forYou.innerHTML=stories.slice(0,4).map(storyCard).join("");
      document.getElementById("lunaForYouCount").textContent=`${stories.length} رواية متاحة`;
    }else{
      const copied=copyExistingCards(forYou,4);const copiedLatest=copyExistingCards(latest,4);
      if(!copied)forYou.innerHTML=emptyMarkup();
      if(!copiedLatest)latest.innerHTML=emptyMarkup();
    }
  }

  function activate(){
    document.querySelectorAll("main > .view").forEach(v=>v.classList.remove("active"));
    const view=createView();if(view)view.classList.add("active");
    document.querySelectorAll(".sidebar").forEach(el=>el.style.display="none");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function deactivate(){const view=document.getElementById(VIEW_ID);if(view)view.classList.remove("active");}

  function installShowView(){
    if(typeof window.showView!=="function"||window.showView.__lunaUserHome)return;
    originalShowView=window.showView;
    const wrapped=function(view,...args){
      if(view==="home"&&ready){activate();return;}
      deactivate();return originalShowView.call(this,view,...args);
    };
    wrapped.__lunaUserHome=true;window.showView=wrapped;
  }

  async function initClient(){
    if(client)return;
    if(!window.supabase||!window.LUNA_CONFIG?.SUPABASE_URL||!window.LUNA_CONFIG?.SUPABASE_ANON_KEY)return;
    try{client=window.supabase.createClient(window.LUNA_CONFIG.SUPABASE_URL,window.LUNA_CONFIG.SUPABASE_ANON_KEY)}catch(error){console.warn("LUNA home client:",error);return}
    const {data}=await client.auth.getSession();
    ready=!!data?.session;
    if(ready){await render(data.session);if(typeof window.showView==="function")installShowView();setTimeout(()=>{if(document.body.classList.contains("logged-in")||ready)activate()},400)}
    client.auth.onAuthStateChange(async(_event,session)=>{
      ready=!!session;
      if(session){await render(session);installShowView();setTimeout(activate,100)}else{deactivate()}
    });
  }

  function start(){addStyles();createView();installShowView();initClient();setTimeout(initClient,800);setTimeout(initClient,2000)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();
