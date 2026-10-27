# naas.foo

Terminal-themed personal portfolio.

## Stack

- Pure HTML + CSS + minimal vanilla JS
- No frameworks, no build tools, no runtime dependencies
- JetBrains Mono & Fira Code fonts via Google Fonts

## Run locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

> **Note**: Projects and writeups load via `fetch()`, so a local server is needed (not `file://`).

## Customize

### Projects

Edit `projects.json` — no HTML editing needed:

```json
{
  "name": "wazuh-siem-lab",
  "title": "Wazuh SIEM Detection & Active Response Lab",
  "desc": "Deployed Wazuh SIEM & Suricata in Proxmox to detect SSH brute-force attacks and trigger automated firewall mitigation.",
  "tech": "Wazuh, Suricata, Proxmox VE, Ubuntu, Python, Bash",
  "repo": "https://github.com/shortnaas/wazuh-soc-lab",
  "writeup": "#writeups"
}
```

### Writeups

Edit `writeup.json` — no HTML editing needed:

```json
{
  "name": "building-wazuh-siem-lab",
  "title": "Building a Wazuh SIEM & Active Response Lab in Proxmox",
  "desc": "Step-by-step walkthrough of deploying a Wazuh manager and active response rules.",
  "tech": "Wazuh, Suricata, Proxmox VE, Ubuntu, Bash",
  "date": "2026-10",
  "url": "https://github.com/shortnaas/wazuh-soc-lab#readme"
}
```

### Bio, Status, Resume, & Skills

Edit the details in `index.html`:
- Status: `<p class="status-line">`
- Resume: `resume.pdf` in project root
- About: `<section id="about">`
- Skills: `<section id="skills">`
- Certs: `<section id="certs">`

### Contact & Socials

Update links and handles in `index.html` → `<section id="contact">`.

### Colors

Edit CSS custom properties in `style.css` → `:root`.

### Last updated

Update the date in the `<footer>` when you push changes.
