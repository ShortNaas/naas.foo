// naas.foo — Terminal Portfolio
// Minimal JS. Zero dependencies. Fast and immediate.

// Helper to render directory/file tree items (projects & writeups)
function renderTreeItem(item, isWriteup) {
  const name = item.title || item.name || 'untitled';
  const url = (item.url && item.url.trim()) ? item.url.trim() : '';
  const repo = (item.repo && item.repo.trim()) ? item.repo.trim() : '';
  const writeup = (item.writeup && item.writeup.trim()) ? item.writeup.trim() : '';
  const link = url || repo || writeup || '';

  const perms = isWriteup ? '-rw-r--r--' : 'drwxr-xr-x';
  const nameSuffix = isWriteup ? '' : '/';

  const links = [];
  if (writeup) {
    const isExt = writeup.startsWith('http');
    links.push(`<a href="${writeup}" class="tree-link" ${isExt ? 'target="_blank" rel="noopener"' : ''}>[writeup]</a>`);
  }
  if (repo) {
    links.push(`<a href="${repo}" class="tree-link" target="_blank" rel="noopener">[repo]</a>`);
  }
  if (url && url !== repo && url !== writeup) {
    links.push(`<a href="${url}" class="tree-link" target="_blank" rel="noopener">[link]</a>`);
  }

  const hasTech = Boolean(item.tech && item.tech.trim());
  const hasLinks = links.length > 0;

  const descPrefix = (hasTech || hasLinks) ? '├──' : '└──';
  const techPrefix = hasLinks ? '├──' : '└──';

  const techLine = hasTech
    ? `<p class="project-line">${techPrefix} <span class="meta-label">tech:</span> ${item.tech}</p>`
    : '';
  const linksLine = hasLinks
    ? `<p class="project-line">└── <span class="meta-label">links:</span> ${links.join(' ')}</p>`
    : '';

  const nameHtml = link
    ? `<a href="${link}" class="project-name"${link.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${name}${nameSuffix}</a>`
    : `<span class="project-name">${name}${nameSuffix}</span>`;

  return `
    <div class="project-entry">
      <div class="project-header">
        <span class="perms">${perms}</span>
        ${nameHtml}
        ${item.date ? `<span class="project-date muted">[${item.date}]</span>` : ''}
      </div>
      <p class="project-line">${descPrefix} ${item.desc || ''}</p>
      ${techLine}
      ${linksLine}
    </div>
  `;
}

// 1. Active tab highlighting on scroll
(() => {
  const sections = document.querySelectorAll('main > section[id]');
  const tabs = document.querySelectorAll('.nav-tab');
  if (!sections.length || !tabs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tabs.forEach((t) => t.classList.remove('active'));
          const activeTab = document.querySelector(`.nav-tab[href="#${entry.target.id}"]`);
          if (activeTab) activeTab.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
})();

// 2. Load projects from projects.json
fetch('projects.json')
  .then((r) => r.json())
  .then((projects) => {
    const el = document.getElementById('project-list');
    if (el) {
      el.innerHTML = projects.map((p) => renderTreeItem(p, false)).join('');
    }
  })
  .catch((err) => {
    console.error('Failed to load projects.json:', err);
    const el = document.getElementById('project-list');
    if (el) {
      el.innerHTML = '<p class="output muted">// failed to load projects</p>';
    }
  });

// 3. Load writeups from writeup.json
fetch('writeup.json')
  .then((r) => r.json())
  .then((writeups) => {
    const el = document.getElementById('writeup-list');
    if (el) {
      el.innerHTML = writeups.map((w) => renderTreeItem(w, true)).join('');
    }
  })
  .catch((err) => {
    console.error('Failed to load writeup.json:', err);
    const el = document.getElementById('writeup-list');
    if (el) {
      el.innerHTML = '<p class="output muted">// failed to load writeups</p>';
    }
  });

// 4. Protect email & setup mailto links
(() => {
  document.querySelectorAll('[data-u][data-d]').forEach((el) => {
    const u = el.dataset.u;
    const d = el.dataset.d;
    const addr = `${u}@${d}`;
    el.setAttribute('href', `mailto:${addr}?subject=hello`);
    const val = el.querySelector('.social-val');
    if (val && (val.textContent.includes('enable JS') || !val.textContent.trim())) {
      val.textContent = addr;
    }
  });
})();
