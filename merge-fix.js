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
})(window);
