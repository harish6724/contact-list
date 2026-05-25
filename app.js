(function () {
  'use strict';

  const STORAGE_KEY = 'contacts_v1';

  // ── Inline SVG icons ───────────────────────────────────────────────────────
  const ICONS = {
    mail:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12 19.79 19.79 0 0 1 1.18 3.41 2 2 0 0 1 3.17 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
    calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    tag:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>`,
    copy:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    check:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    edit:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    sun:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    chevron:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  };

  // ── Avatar colours ─────────────────────────────────────────────────────────
  const AVATAR_COLORS = [
    '#4f46e5','#0891b2','#059669','#d97706',
    '#7c3aed','#0284c7','#16a34a','#e11d48',
    '#0e7490','#b45309','#4338ca','#0f766e',
  ];
  function avatarColor(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return AVATAR_COLORS[h % AVATAR_COLORS.length];
  }

  // ── Utilities ──────────────────────────────────────────────────────────────
  function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function initials(name) {
    return (name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // ── Storage ────────────────────────────────────────────────────────────────
  let contacts = [];

  const MOCK_CONTACTS = [
    { id: generateId(), createdAt: '2026-01-05T09:00:00Z', name: 'Alice Nguyen',    email: 'alice.nguyen@example.com',   phone: '+1-415-555-0101',  category: 'Work'    },
    { id: generateId(), createdAt: '2026-01-12T11:30:00Z', name: 'Bob Martínez',    email: 'bob.martinez@example.com',   phone: '+1-312-555-0148',  category: 'Friends' },
    { id: generateId(), createdAt: '2026-01-20T14:00:00Z', name: 'Carol Singh',     email: 'carol.singh@example.com',    phone: '+44-20-5550-0193', category: 'Work'    },
    { id: generateId(), createdAt: '2026-02-03T08:45:00Z', name: 'David Kim',       email: 'david.kim@example.com',      phone: '+1-213-555-0172',  category: 'Family'  },
    { id: generateId(), createdAt: '2026-02-14T16:20:00Z', name: 'Eva Rossi',       email: 'eva.rossi@example.com',      phone: '+39-06-5550-0184', category: 'Friends' },
    { id: generateId(), createdAt: '2026-02-28T10:10:00Z', name: 'Frank Osei',      email: 'frank.osei@example.com',     phone: '+233-30-555-0167', category: 'Work'    },
    { id: generateId(), createdAt: '2026-03-07T13:55:00Z', name: 'Grace Liu',       email: 'grace.liu@example.com',      phone: '+86-10-5550-0139', category: 'Work'    },
    { id: generateId(), createdAt: '2026-03-15T09:30:00Z', name: 'Hiro Tanaka',     email: 'hiro.tanaka@example.com',    phone: '+81-3-5550-0115',  category: 'Friends' },
    { id: generateId(), createdAt: '2026-03-22T17:00:00Z', name: 'Isla Fernández',  email: 'isla.fernandez@example.com', phone: '+34-91-555-0128',  category: 'Family'  },
    { id: generateId(), createdAt: '2026-04-01T08:00:00Z', name: 'James Okonkwo',   email: 'james.okonkwo@example.com',  phone: '+234-1-555-0142',  category: 'Work'    },
    { id: generateId(), createdAt: '2026-04-09T12:15:00Z', name: 'Kira Patel',      email: 'kira.patel@example.com',     phone: '+91-22-5550-0156', category: 'Friends' },
    { id: generateId(), createdAt: '2026-04-18T15:40:00Z', name: 'Luca Bianchi',    email: 'luca.bianchi@example.com',   phone: '+39-02-5550-0177', category: 'Family'  },
    { id: generateId(), createdAt: '2026-05-02T10:00:00Z', name: 'Maya Johansson',  email: 'maya.johansson@example.com', phone: '+46-8-5550-0163',  category: 'Work'    },
    { id: generateId(), createdAt: '2026-05-10T14:30:00Z', name: 'Noah Abebe',      email: 'noah.abebe@example.com',     phone: '+251-11-555-0188', category: 'Friends' },
    { id: generateId(), createdAt: '2026-05-20T09:50:00Z', name: 'Olivia Chen',     email: 'olivia.chen@example.com',    phone: '+1-650-555-0134',  category: 'Work'    },
  ];

  function loadContacts() {
    try { contacts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (_) { contacts = []; }
    if (contacts.length === 0) { contacts = MOCK_CONTACTS; saveContacts(); }
  }
  function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  // ── State ──────────────────────────────────────────────────────────────────
  const state = { query: '', sort: 'name', group: 'none', selectedId: null };

  // ── Theme ──────────────────────────────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = saved;
    updateThemeIcon(saved);
  }
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }
  function updateThemeIcon(theme) {
    themeIconEl.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    btnTheme.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const listEl          = document.getElementById('contact-list');
  const listEmptyEl     = document.getElementById('list-empty');
  const sidebarCountEl  = document.getElementById('sidebar-count');
  const searchEl        = document.getElementById('search');
  const sortEl          = document.getElementById('sort');
  const groupEl         = document.getElementById('group');
  const detailEmptyEl   = document.getElementById('detail-empty');
  const detailViewEl    = document.getElementById('detail-view');
  const flyoutOverlay   = document.getElementById('flyout-overlay');
  const flyoutPanel     = document.getElementById('flyout-panel');
  const flyoutTitleEl   = document.getElementById('flyout-title');
  const contactForm     = document.getElementById('contact-form');
  const fieldId         = document.getElementById('contact-id');
  const fieldName       = document.getElementById('field-name');
  const fieldEmail      = document.getElementById('field-email');
  const fieldPhone      = document.getElementById('field-phone');
  const fieldCategory   = document.getElementById('field-category');
  const errorName       = document.getElementById('error-name');
  const errorEmail      = document.getElementById('error-email');
  const confirmOverlay  = document.getElementById('confirm-overlay');
  const confirmMessage  = document.getElementById('confirm-message');
  const confirmOk       = document.getElementById('confirm-ok');
  const themeIconEl     = document.getElementById('theme-icon');
  const btnTheme        = document.getElementById('btn-theme');
  const toastContainer  = document.getElementById('toast-container');

  // ── List rendering ─────────────────────────────────────────────────────────
  function renderList() {
    const q = state.query.toLowerCase();
    let list = contacts.filter(c =>
      (c.name     || '').toLowerCase().includes(q) ||
      (c.email    || '').toLowerCase().includes(q) ||
      (c.phone    || '').toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q)
    );
    list.sort((a, b) => {
      const av = (a[state.sort] || '').toLowerCase();
      const bv = (b[state.sort] || '').toLowerCase();
      return av < bv ? -1 : av > bv ? 1 : 0;
    });

    const total = contacts.length;
    sidebarCountEl.textContent = q
      ? `${list.length} of ${total} contacts`
      : `${total} contact${total !== 1 ? 's' : ''}`;

    listEl.innerHTML = '';

    if (list.length === 0) {
      listEmptyEl.classList.remove('hidden');
      return;
    }
    listEmptyEl.classList.add('hidden');

    let idx = 0;
    if (state.group === 'none') {
      list.forEach(c => listEl.appendChild(buildListItem(c, idx++)));
    } else {
      groupContacts(list).forEach(({ label, items }) => {
        const hdr = document.createElement('div');
        hdr.className = 'group-header';
        hdr.textContent = label || '—';
        listEl.appendChild(hdr);
        items.forEach(c => listEl.appendChild(buildListItem(c, idx++)));
      });
    }
  }

  function groupContacts(list) {
    const map = new Map();
    list.forEach(c => {
      const key = state.group === 'letter'
        ? (c.name || '?')[0].toUpperCase()
        : (c.category || 'Uncategorised');
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(c);
    });
    return [...map.entries()]
      .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([label, items]) => ({ label, items }));
  }

  function buildListItem(c, index) {
    const item = document.createElement('div');
    item.className = 'contact-item' + (c.id === state.selectedId ? ' selected' : '');
    item.dataset.id = c.id;
    item.style.animationDelay = `${Math.min(index * 22, 280)}ms`;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', c.id === state.selectedId ? 'true' : 'false');
    const color = avatarColor(c.name || '');
    item.innerHTML = `
      <div class="contact-item__avatar" style="background:${color}">${escHtml(initials(c.name))}</div>
      <div class="contact-item__info">
        <div class="contact-item__name">${escHtml(c.name)}</div>
        <div class="contact-item__sub">${escHtml(c.email || c.phone || c.category || ' ')}</div>
      </div>
      <span class="contact-item__chevron">${ICONS.chevron}</span>
    `;
    item.addEventListener('click', () => selectContact(c.id));
    return item;
  }

  // ── Contact selection ──────────────────────────────────────────────────────
  function selectContact(id) {
    state.selectedId = id;
    document.querySelectorAll('.contact-item').forEach(el => {
      const sel = el.dataset.id === id;
      el.classList.toggle('selected', sel);
      el.setAttribute('aria-selected', sel ? 'true' : 'false');
    });
    renderDetail();
    const selEl = listEl.querySelector('.contact-item.selected');
    if (selEl) selEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // ── Detail rendering ───────────────────────────────────────────────────────
  function renderDetail() {
    if (!state.selectedId) {
      detailEmptyEl.classList.remove('hidden');
      detailViewEl.classList.add('hidden');
      return;
    }
    const c = contacts.find(x => x.id === state.selectedId);
    if (!c) {
      state.selectedId = null;
      renderDetail();
      return;
    }
    detailEmptyEl.classList.add('hidden');
    detailViewEl.classList.remove('hidden');

    const color = avatarColor(c.name || '');
    const rows = [];
    if (c.email)    rows.push(buildDetailRow('mail',     'Email',    escHtml(c.email),    `mailto:${escHtml(c.email)}`,  c.email,    true));
    if (c.phone)    rows.push(buildDetailRow('phone',    'Phone',    escHtml(c.phone),    `tel:${escHtml(c.phone)}`,     c.phone,    true));
    if (c.category) rows.push(buildDetailRow('tag',      'Category', escHtml(c.category), null,                         null,       false));
    rows.push(buildDetailRow('calendar', 'Added', formatDate(c.createdAt), null, null, false));

    detailViewEl.innerHTML = `
      <div class="detail-hero">
        <div class="detail-hero__glow" style="background:radial-gradient(ellipse at 0% 0%, ${color}, transparent 70%)"></div>
        <div class="detail-hero__top">
          <div class="detail-avatar" style="background:${color};box-shadow:0 4px 0 rgba(0,0,0,0.16),0 8px 32px ${color}60,inset 0 1px 0 rgba(255,255,255,0.32)">
            ${escHtml(initials(c.name))}
          </div>
          <div class="detail-hero__info">
            <h2 class="detail-name">${escHtml(c.name)}</h2>
            ${c.category ? `<span class="detail-badge">${escHtml(c.category)}</span>` : ''}
          </div>
        </div>
        <div class="detail-hero__actions">
          <button class="btn btn-primary btn-sm" id="detail-edit">
            ${ICONS.edit} Edit contact
          </button>
          <button class="btn btn-ghost btn-sm" id="detail-delete" style="color:var(--danger);border-color:rgba(239,68,68,0.2)">
            ${ICONS.trash} Delete
          </button>
        </div>
      </div>
      <div class="detail-body">
        ${rows.join('')}
      </div>
    `;

    document.getElementById('detail-edit').addEventListener('click', () => openFlyout('edit', c));
    document.getElementById('detail-delete').addEventListener('click', () => confirmDelete(c));

    detailViewEl.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.copy;
        navigator.clipboard.writeText(val).then(() => {
          btn.classList.add('copied');
          btn.innerHTML = ICONS.check;
          setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = ICONS.copy; }, 1600);
        }).catch(() => showToast('Could not copy to clipboard', 'error'));
      });
    });
  }

  function buildDetailRow(iconKey, label, valueHtml, href, copyValue, copyable) {
    const valueEl = href
      ? `<a class="detail-row__value" href="${href}">${valueHtml}</a>`
      : `<span class="detail-row__value">${valueHtml}</span>`;
    const copyBtn = copyable
      ? `<button class="btn-copy" data-copy="${escHtml(copyValue)}" title="Copy ${label.toLowerCase()}">${ICONS.copy}</button>`
      : '';
    return `
      <div class="detail-row">
        <div class="detail-row__icon">${ICONS[iconKey]}</div>
        <div class="detail-row__content">
          <span class="detail-row__label">${label}</span>
          ${valueEl}
        </div>
        ${copyBtn}
      </div>
    `;
  }

  // ── Flyout ─────────────────────────────────────────────────────────────────
  function openFlyout(mode, contact) {
    clearFormErrors();
    flyoutTitleEl.textContent = mode === 'add' ? 'Add Contact' : 'Edit Contact';
    if (contact) {
      fieldId.value       = contact.id;
      fieldName.value     = contact.name     || '';
      fieldEmail.value    = contact.email    || '';
      fieldPhone.value    = contact.phone    || '';
      fieldCategory.value = contact.category || '';
    } else {
      contactForm.reset();
      fieldId.value = '';
    }
    flyoutOverlay.classList.remove('hidden');
    flyoutOverlay.removeAttribute('aria-hidden');
    requestAnimationFrame(() => flyoutPanel.classList.add('open'));
    setTimeout(() => fieldName.focus(), 60);
  }

  function closeFlyout() {
    flyoutPanel.classList.remove('open');
    setTimeout(() => {
      flyoutOverlay.classList.add('hidden');
      flyoutOverlay.setAttribute('aria-hidden', 'true');
    }, 320);
  }

  function clearFormErrors() {
    [fieldName, fieldEmail].forEach(el => el.classList.remove('invalid'));
    errorName.textContent = errorEmail.textContent = '';
  }

  function validateForm() {
    let ok = true;
    clearFormErrors();
    if (!fieldName.value.trim()) {
      fieldName.classList.add('invalid');
      errorName.textContent = 'Name is required.';
      ok = false;
    }
    if (fieldEmail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldEmail.value.trim())) {
      fieldEmail.classList.add('invalid');
      errorEmail.textContent = 'Enter a valid email address.';
      ok = false;
    }
    return ok;
  }

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;
    const id = fieldId.value;
    const data = {
      name:     fieldName.value.trim(),
      email:    fieldEmail.value.trim(),
      phone:    fieldPhone.value.trim(),
      category: fieldCategory.value.trim(),
    };
    if (id) {
      const idx = contacts.findIndex(c => c.id === id);
      if (idx !== -1) contacts[idx] = { ...contacts[idx], ...data };
      state.selectedId = id;
    } else {
      const nc = { id: generateId(), createdAt: new Date().toISOString(), ...data };
      contacts.push(nc);
      state.selectedId = nc.id;
    }
    saveContacts();
    renderList();
    renderDetail();
    closeFlyout();
    showToast(id ? 'Contact updated' : 'Contact added', 'success');
  });

  // ── Delete confirm ─────────────────────────────────────────────────────────
  let pendingDeleteId = null;

  function confirmDelete(contact) {
    pendingDeleteId = contact.id;
    confirmMessage.textContent = `"${contact.name}" will be permanently removed.`;
    confirmOverlay.classList.remove('hidden');
  }

  confirmOk.addEventListener('click', () => {
    if (pendingDeleteId) {
      const name = (contacts.find(c => c.id === pendingDeleteId) || {}).name || 'Contact';
      contacts = contacts.filter(c => c.id !== pendingDeleteId);
      if (state.selectedId === pendingDeleteId) state.selectedId = null;
      saveContacts();
      renderList();
      renderDetail();
      showToast(`${name} deleted`, 'success');
    }
    pendingDeleteId = null;
    confirmOverlay.classList.add('hidden');
  });

  document.getElementById('confirm-cancel').addEventListener('click', () => {
    pendingDeleteId = null;
    confirmOverlay.classList.add('hidden');
  });

  // ── CSV import ─────────────────────────────────────────────────────────────
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = splitCSVRow(lines[0]).map(h => h.toLowerCase().trim());
    const col = key => headers.indexOf(key);
    const iName = col('name'), iEmail = col('email'), iPhone = col('phone'), iCat = col('category');
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cells = splitCSVRow(lines[i]);
      const name  = iName  >= 0 ? (cells[iName]  || '').trim() : '';
      const email = iEmail >= 0 ? (cells[iEmail] || '').trim() : '';
      if (!name) continue;
      rows.push({
        id: generateId(), createdAt: new Date().toISOString(),
        name, email,
        phone:    iPhone >= 0 ? (cells[iPhone] || '').trim() : '',
        category: iCat   >= 0 ? (cells[iCat]  || '').trim() : '',
      });
    }
    return rows;
  }

  function splitCSVRow(line) {
    const cells = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
      else if (ch === ',' && !inQ) { cells.push(cur); cur = ''; }
      else cur += ch;
    }
    cells.push(cur);
    return cells;
  }

  document.getElementById('csv-import').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const rows = parseCSV(e.target.result);
      const existingEmails = new Set(contacts.map(c => (c.email || '').toLowerCase()));
      let added = 0;
      rows.forEach(r => {
        const key = r.email.toLowerCase();
        if (r.email && existingEmails.has(key)) return;
        contacts.push(r);
        if (r.email) existingEmails.add(key);
        added++;
      });
      saveContacts();
      renderList();
      const skipped = rows.length - added;
      showToast(`Imported ${added} contact${added !== 1 ? 's' : ''}${skipped ? `, skipped ${skipped} duplicate${skipped !== 1 ? 's' : ''}` : ''}`, 'success');
    };
    reader.readAsText(file);
    this.value = '';
  });

  // ── CSV export ─────────────────────────────────────────────────────────────
  function csvQuote(val) {
    const s = String(val || '');
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  document.getElementById('btn-export').addEventListener('click', () => {
    if (!contacts.length) { showToast('No contacts to export', 'error'); return; }
    const cols = ['name', 'email', 'phone', 'category', 'createdAt'];
    const csv  = [cols.join(','), ...contacts.map(c => cols.map(k => csvQuote(c[k])).join(','))].join('\r\n');
    const url  = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    Object.assign(document.createElement('a'), { href: url, download: 'contacts.csv' }).click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`, 'success');
  });

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast toast--${type}`;
    const dot = type === 'success'
      ? `<span style="width:7px;height:7px;border-radius:50%;background:var(--success);flex-shrink:0"></span>`
      : `<span style="width:7px;height:7px;border-radius:50%;background:var(--danger);flex-shrink:0"></span>`;
    t.innerHTML = `${dot}<span>${escHtml(message)}</span>`;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.classList.add('leaving');
      t.addEventListener('animationend', () => t.remove(), { once: true });
    }, 3200);
  }

  // ── Event wiring ───────────────────────────────────────────────────────────
  searchEl.addEventListener('input', () => { state.query = searchEl.value; renderList(); });
  sortEl.addEventListener('change',  () => { state.sort  = sortEl.value;  renderList(); });
  groupEl.addEventListener('change', () => { state.group = groupEl.value; renderList(); });

  document.getElementById('btn-add').addEventListener('click', () => openFlyout('add', null));
  btnTheme.addEventListener('click', toggleTheme);

  document.getElementById('flyout-close').addEventListener('click', closeFlyout);
  document.getElementById('flyout-cancel').addEventListener('click', closeFlyout);
  flyoutOverlay.addEventListener('click', e => { if (e.target === flyoutOverlay) closeFlyout(); });

  confirmOverlay.addEventListener('click', e => {
    if (e.target === confirmOverlay) { pendingDeleteId = null; confirmOverlay.classList.add('hidden'); }
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeFlyout();
    pendingDeleteId = null;
    confirmOverlay.classList.add('hidden');
  });

  // ── Boot ───────────────────────────────────────────────────────────────────
  loadContacts();
  initTheme();
  renderList();
  renderDetail();
})();
