// naas.foo — Terminal Portfolio
// Minimal JS. No dependencies.

// 1. Active tab highlighting
(() => {
  const sections = document.querySelectorAll('main > section[id]');
  const tabs = document.querySelectorAll('.nav-tab');
  if (!sections.length || !tabs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tabs.forEach((t) => t.classList.remove('active'));
          document.querySelector(`.nav-tab[href="#${entry.target.id}"]`)
            ?.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
})();

// 2. Load projects from projects.json
fetch('projects.json')
  .then((r) => r.json())
  .then((projects) => {
    document.getElementById('project-list').innerHTML = projects
      .map(
        (p) =>
          `<div class="project">
        <div class="project-header">
          <span class="perms">drwxr-xr-x</span>
          <a href="${p.url}" class="project-name" target="_blank" rel="noopener">${p.name}/</a>
        </div>
        <p class="project-desc">└── ${p.desc}</p>
      </div>`
      )
      .join('');
  })
  .catch(() => {
    document.getElementById('project-list').innerHTML =
      '<p class="output muted">// failed to load projects</p>';
  });

// 3. Reveal obfuscated email (bots can't scrape data attributes)
(() => {
  const el = document.getElementById('email-link');
  if (!el) return;
  const u = el.dataset.u, d = el.dataset.d;
  const addr = u + '@' + d;
  const a = document.createElement('a');
  a.href = 'mailto:' + addr;
  a.className = 'social';
  a.innerHTML = el.innerHTML;
  a.querySelector('.social-val').textContent = addr;
  el.replaceWith(a);
})();

// 4. Blog post loader — STUB for future RSS/API
// Uncomment and configure when your feed is ready:
//
// fetch('https://www.naas.work/rss.xml')
//   .then((r) => r.text())
//   .then((text) => {
//     const xml = new DOMParser().parseFromString(text, 'text/xml');
//     document.getElementById('blog-posts').innerHTML =
//       [...xml.querySelectorAll('item')].slice(0, 5)
//         .map((item) => {
//           const title = item.querySelector('title')?.textContent ?? '';
//           const link = item.querySelector('link')?.textContent ?? '#';
//           const date = item.querySelector('pubDate')?.textContent ?? '';
//           const iso = date ? new Date(date).toISOString().split('T')[0] : '';
//           return `<a href="${link}" class="blog-entry" target="_blank" rel="noopener">
//             <time>[${iso}]</time> ${title}</a>`;
//         }).join('');
//   })
//   .catch((err) => console.warn('Blog feed unavailable:', err));
