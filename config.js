// ضع مفتاح Supabase العام هنا فقط.
// هذا هو الـ Publishable/Anon key المخصص للواجهة، وليس service_role secret.
window.LUNA_CONFIG = {
  SUPABASE_URL: "https://wdjsefcbzcxcblkyhppf.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_7Sa2evuhMMy2KNXEfMJ3cg_yUIr0XI0"
};

// LUNA UI modules are loaded separately so the main page can evolve safely.
document.write('<script src="js/header-redesign.js"><\\/script>');
document.write('<script src="js/user-home.js"><\\/script>');
