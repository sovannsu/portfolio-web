# Sovann Su — Portfolio

Static portfolio site. Plain HTML, CSS, and a small amount of JavaScript. No
framework, no build step, no dependencies.

**Live site:** https://sovannsu.github.io/portfolio/

## Contents

```
.
├── index.html                   Home / About
├── projects.html                Projects grid
├── skills.html                  Skills & certifications (tabbed)
├── case-study-geo.html          Long-form write-up: AI search citation instrument
├── project-card-template.html   Copy-paste template for a new project card
├── 404.html                     Custom not-found page
├── css/style.css                The only stylesheet — all styling lives here
├── js/main.js                   Mobile nav, certification tabs, resume link check
├── assets/
│   ├── favicon.svg              Browser tab icon
│   ├── resume.pdf               (you add this — see assets/README.md)
│   └── README.md
├── robots.txt
├── sitemap.xml
├── .nojekyll                    Tells Pages to serve files as-is
└── .github/workflows/deploy.yml GitHub Actions deploy
```

---

## Deploying to GitHub Pages

The repo is set up as a **project site**, which means it lives at
`https://sovannsu.github.io/<repo-name>/`. These instructions assume the repo is
named **`portfolio`**. If you name it something else, see
[Renaming the repo](#renaming-the-repo) below — three files hardcode the name.

### 1. Create the repository

On GitHub, create a new **public** repository named `portfolio`. Do not add a
README, .gitignore, or license — this folder already has what it needs.

> Pages only works on private repos with a paid plan, so keep it public.

### 2. Push this folder

From inside this folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/sovannsu/portfolio.git
git push -u origin main
```

### 3. Turn on Pages

In the repository: **Settings → Pages → Build and deployment → Source**, choose
**GitHub Actions**.

That is the only setting to change. Do not pick "Deploy from a branch" — the
included workflow handles it, and the two methods conflict.

### 4. Watch the first deploy

Go to the **Actions** tab. The "Deploy to GitHub Pages" run starts automatically
from your push and takes about a minute. When it finishes green, the site is at:

```
https://sovannsu.github.io/portfolio/
```

The very first deploy can take a few extra minutes to become reachable. A 404
right after a green run usually just means DNS and the CDN have not caught up —
wait five minutes before assuming something is broken.

### 5. From then on

Every push to `main` redeploys automatically. There is nothing to build or run
locally first.

---

## Previewing locally

Open `index.html` in a browser and it mostly works — but the resume link check
needs a real server, so use this instead:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000. Stop it with Ctrl+C.

---

## Adding a resume download

Put your PDF at `assets/resume.pdf`, commit, and push. The hero button and the
footer link reveal themselves automatically — see `assets/README.md` for how the
check works and for a note about what is on your current resume that you may not
want public.

## Adding a project

Open `project-card-template.html`, copy the `<article class="card">` block, paste
it into the `project-grid` container in `projects.html`, and fill in the
bracketed placeholders. Delete the placeholder card once you have a real one.

## Adding a case study

For a project that needs more than a card, copy `case-study-geo.html`, replace the
content inside `<article class="case-study">`, and point a project card at it. The
building blocks are already styled in section 14 of `css/style.css`:

| Markup | What it gives you |
|---|---|
| `.case-study__eyebrow` / `.case-study__deck` | Kicker line and standfirst under the title |
| `.case-study__meta` | Role / context / duration / stack strip |
| `.stat-row` + `.stat` | The headline-numbers band |
| `.problem-list` + `.problem` | Divided list of write-ups, each with a `.problem__tag` |
| `.table-wrap` + `.data-table` | A table that scrolls sideways on small screens |
| `.key-finding` | Accent-ruled pull quote for the takeaway |
| `.case-study__stack` | Monospace tools-and-techniques footer |

Then add the new page to `sitemap.xml`.

## Editing the look

All styling is in `css/style.css`. The color palette, type scale, and spacing are
CSS custom properties in the `:root` block at the top of that file — change them
there rather than hunting through individual rules. There is no inline CSS
anywhere in this project, and it should stay that way.

---

## Renaming the repo

The repo name appears in the URL path for a project site. Three files hardcode
`/portfolio/` and need updating if you rename:

| File | What to change |
|---|---|
| `404.html` | Every `/portfolio/...` path (Pages serves this page from arbitrary URLs, so its links must be absolute) |
| `robots.txt` | The `Sitemap:` line |
| `sitemap.xml` | All three `<loc>` URLs |

The three main pages use relative links only, so they need no changes.

## Switching to a custom domain

1. Add a file named `CNAME` at the repo root containing just your domain, e.g.
   `sovannsu.com`.
2. At your DNS provider, point the domain at GitHub Pages — an `ALIAS`/`ANAME`
   record to `sovannsu.github.io` for an apex domain, or a `CNAME` record to the
   same for a `www` subdomain.
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the
   certificate is issued.
4. Update the absolute paths listed in the table above — with a custom domain the
   site is served from the root, so `/portfolio/...` becomes `/...`.

## Troubleshooting

**The Actions run failed on "Deploy".** Almost always means the Pages source is
still set to a branch. Set **Settings → Pages → Source** to **GitHub Actions**
and re-run the job.

**The page loads but has no styling.** The CSS path is wrong for where the page
is being served from. Check that `css/style.css` exists in the repo with that
exact lowercase name — Pages is case-sensitive even if your computer is not.

**The resume button never appears.** Confirm the file is at `assets/resume.pdf`
exactly, that it is committed (`git ls-files assets/`), and that you are viewing
over `http://` rather than opening the file from disk.

**Changes are not showing up.** Check the Actions tab for a green run, then hard
reload the page (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).

**There is a 404 for `assets/resume.pdf` in the browser console.** Expected while
no resume is committed — that is the check looking for the file. Visitors never
see it, and it disappears once you add the PDF.
