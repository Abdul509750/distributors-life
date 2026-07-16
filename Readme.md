# Distribution Life — website & updates

Static site for **Distribution Life** by Forza Inc.

## Folder layout

```
distributors-life/
├── index.html                 Marketing homepage
├── download.html              Standalone download page (separate from homepage)
├── css/
│   └── styles.css             Homepage styles
├── js/
│   └── main.js                Homepage only (nav, FAQ, scroll)
├── assets/
│   └── images/
├── downloads/
│   └── DistributionLife.exe   ← drop your Windows build here
└── updates/
    └── latest.json            For the desktop app auto-updater (not shown on the website)
```

## Two pages

| Page | Purpose |
|------|---------|
| `index.html` | Marketing site. Menu has a **Download** link only. |
| `download.html` | Completely separate download page. Own layout, no homepage menu/sections. |

## Shipping a new Windows build

1. Copy `DistributionLife.exe` into `downloads/`.
2. Edit **`download.html`** — update the version number, date, and notes on the download card. Move the previous card under “Older versions” if you want to keep it.
3. Edit `updates/latest.json` if the desktop app will check for updates (version, date, notes, download URL).
4. Deploy.

## Local preview

```bash
npx serve .
```

## App auto-update

Point the desktop updater at:

```
https://your-domain.com/updates/latest.json
```

Fields: `version`, `downloadUrl`, `releaseNotes`, `releaseDate`, `sha256` (optional), `mandatory` (optional).
