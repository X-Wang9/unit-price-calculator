/* Shared Tweaks panel — theme / density / accent
   Looks for: #tweaksFab, #tweaksPanel, #tweaksClose, [data-tweak] groups
   Persists per-variant via window.APP_VARIANT. */
(function(){
  const variant = window.APP_VARIANT || 'v1';
  const storeKey = `tweaks-${variant}`;
  const defaults = { theme: 'light', density: 'normal', accent: '' };
  let state;
  try { state = { ...defaults, ...(JSON.parse(localStorage.getItem(storeKey) || '{}') || {}) }; }
  catch { state = { ...defaults }; }

  const fab = document.getElementById('tweaksFab');
  const panel = document.getElementById('tweaksPanel');
  const closeBtn = document.getElementById('tweaksClose');
  if (!panel) return;

  function apply() {
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    root.setAttribute('data-density', state.density);
    if (state.accent) root.style.setProperty('--accent', state.accent);
    else root.style.removeProperty('--accent');
    // Mark active buttons
    document.querySelectorAll('[data-tweak]').forEach((group) => {
      const key = group.dataset.tweak;
      group.querySelectorAll('[data-value]').forEach((btn) => {
        const isOn = String(state[key] || '') === btn.dataset.value;
        btn.classList.toggle('on', isOn);
      });
    });
  }

  function persist() {
    try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {}
  }

  document.querySelectorAll('[data-tweak]').forEach((group) => {
    const key = group.dataset.tweak;
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-value]');
      if (!btn) return;
      state[key] = btn.dataset.value;
      persist();
      apply();
    });
  });

  function openPanel() { panel.classList.add('open'); if (fab) fab.style.display = 'none'; }
  function closePanel() { panel.classList.remove('open'); if (fab) fab.style.display = 'inline-flex'; }
  if (fab) fab.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  // Keep settings closed by default; open from the floating button when needed.
  closePanel();

  apply();
})();
