# naas.foo

Terminal-themed personal portfolio.

## Stack

- Pure HTML + CSS + ~30 lines vanilla JS
- No frameworks, no build tools, no dependencies
- JetBrains Mono font via Google Fonts

## Run locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

> **Note**: Projects load via `fetch()`, so a local server is needed (not `file://`).

## Customize

### Projects

Edit `projects.json` — no HTML editing needed:

```json
{
  "name": "my-project",
  "desc": "A short description.",
  "url": "https://github.com/shortnaas/my-project"
}
```

### Bio

Edit the intro text in `index.html` → `<section id="intro">`.

### Socials

Update links and handles in `index.html` → `<section id="socials">`.

The email is obfuscated via `data-u` / `data-d` attributes to prevent bot scraping. To change it, update the `data-u` (username) and `data-d` (domain) values on the `#email-link` element.

### Blog

Connect your RSS or API feed by uncommenting the stub in `main.js`.

### Colors

Edit CSS custom properties in `style.css` → `:root`.

### Last updated

Update the date in the `<footer>` when you push changes.
