/* Merge published defaults into existing local data without clearing user data. */
(function (global) {
  'use strict';

  if (!global.NavStore || !global.NavStore.DEFAULT_DATA) return;

  const store = global.NavStore;
  const DEFAULT_DATA = store.DEFAULT_DATA;
  const STORAGE_KEY = store.STORAGE_KEY || 'nav_data_v5';
  const originalReset = store.reset;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeUrl(value) {
    try {
      const url = new URL(String(value || '').trim());
      url.hash = '';
      url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
      if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
      return url.toString().replace(/\/$/, '').toLowerCase();
    } catch (error) {
      return String(value || '').trim().replace(/\/$/, '').toLowerCase();
    }
  }

  function normalizeData(input) {
    const source = input && typeof input === 'object' ? input : {};
    const output = clone(DEFAULT_DATA);

    const categoryMap = new Map(DEFAULT_DATA.categories.map(category => [category.id, clone(category)]));
    if (Array.isArray(source.categories)) {
      source.categories.forEach(category => {
        if (!category || !category.id) return;
        const current = categoryMap.get(category.id) || {};
        categoryMap.set(category.id, Object.assign({}, current, category));
      });
    }
    output.categories = Array.from(categoryMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));

    const engineMap = new Map(DEFAULT_DATA.searchEngines.map(engine => [engine.id, clone(engine)]));
    if (Array.isArray(source.searchEngines)) {
      source.searchEngines.forEach(engine => {
        if (!engine || !engine.id) return;
        const current = engineMap.get(engine.id) || {};
        engineMap.set(engine.id, Object.assign({}, current, engine));
      });
    }
    output.searchEngines = Array.from(engineMap.values());
    output.settings = Object.assign({}, DEFAULT_DATA.settings, source.settings || {});

    const uniqueSites = new Map();
    DEFAULT_DATA.sites.forEach(site => {
      if (site && site.url) uniqueSites.set(normalizeUrl(site.url), clone(site));
    });
    if (Array.isArray(source.sites)) {
      source.sites.forEach((site, index) => {
        if (!site || !site.url) return;
        const key = normalizeUrl(site.url);
        const defaultSite = uniqueSites.get(key);
        if (defaultSite) {
          uniqueSites.set(key, Object.assign({}, site, defaultSite, {
            id: site.id || defaultSite.id,
            visibility: site.visibility !== false
          }));
          return;
        }
        uniqueSites.set(key, Object.assign({
          id: 'site-' + Date.now() + '-' + index,
          name: new URL(site.url).hostname,
          desc: '',
          icon: '',
          category: 'tool',
          status: 'unchecked',
          finalUrl: site.url,
          lastChecked: '',
          source: 'custom',
          visibility: true
        }, site));
      });
    }

    output.sites = Array.from(uniqueSites.values());
    output.favorites = Array.isArray(source.favorites) ? Array.from(new Set(source.favorites)) : [];
    output.version = 5;
    return output;
  }

  function load() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (error) {}
    const data = normalizeData(saved || DEFAULT_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  function save(data) {
    const normalized = normalizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function reset() {
    if (typeof originalReset === 'function') return originalReset();
    const data = clone(DEFAULT_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  store.normalizeUrl = normalizeUrl;
  store.normalizeData = normalizeData;
  store.load = load;
  store.save = save;
  store.reset = reset;

  function installCategoryGrouping() {
    if (!global.document) return;
    const style = document.createElement('style');
    style.textContent = '.category-group{grid-column:1/-1;margin:4px 0 18px}.category-head{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:var(--text)}.category-head .category-icon{width:28px;height:28px;border-radius:6px;background:var(--surface2);display:grid;place-items:center}.category-head h2{font-size:16px;margin:0;letter-spacing:0}.category-head .category-count{color:var(--muted);font-size:12px}.category-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(224px,1fr));gap:10px}@media(max-width:760px){.category-grid{grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px}.category-group{margin-bottom:16px}}@media(max-width:420px){.category-grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);

    let grouping = false;
    const byHref = site => normalizeUrl(site.finalUrl || site.url);
    const html = value => {
      const node = document.createElement('div');
      node.textContent = String(value || '');
      return node.innerHTML;
    };

    function shouldGroup() {
      const active = document.querySelector('.nav-btn.active');
      const activeId = active ? active.dataset.id : '';
      const title = document.getElementById('headerLabel')?.textContent || '';
      const searchValue = document.getElementById('searchInput')?.value.trim() || '';
      return !searchValue && (activeId === 'all' || (!activeId && title === '全部网站'));
    }

    function applyCategoryGroups() {
      if (grouping || !shouldGroup()) return;
      const grid = document.getElementById('siteGrid');
      if (!grid || grid.querySelector('.category-group')) return;
      const cards = Array.from(grid.querySelectorAll(':scope > .site-card'));
      if (!cards.length) return;
      const data = load();
      const siteByUrl = new Map(data.sites.map(site => [byHref(site), site]));
      const cardsByCategory = new Map();

      cards.forEach(card => {
        const site = siteByUrl.get(normalizeUrl(card.getAttribute('href')));
        if (!site) return;
        const items = cardsByCategory.get(site.category) || [];
        items.push(card);
        cardsByCategory.set(site.category, items);
      });
      if (!cardsByCategory.size) return;

      grouping = true;
      grid.textContent = '';
      data.categories.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(category => {
        const groupCards = cardsByCategory.get(category.id);
        if (!groupCards || !groupCards.length) return;
        const section = document.createElement('section');
        section.className = 'category-group';
        section.innerHTML = '<div class="category-head"><span class="category-icon">' + html(category.icon) + '</span><h2>' + html(category.name) + '</h2><span class="category-count">' + groupCards.length + ' 个网站</span></div><div class="category-grid"></div>';
        const groupGrid = section.querySelector('.category-grid');
        groupCards.forEach(card => groupGrid.appendChild(card));
        grid.appendChild(section);
      });
      grouping = false;
    }

    const observer = new MutationObserver(() => setTimeout(applyCategoryGroups, 0));
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(applyCategoryGroups, 0);
  }

  installCategoryGrouping();
})(window);
