# Portfolio & Blog (Jekyll)

Personal site powered by Jekyll for Paul Martinez's portfolio and blog. The Jekyll project lives entirely under [`src/`](src/).

## Run locally

```bash
cd src
bundle install
npm install
npm run dev
```

Runs Jekyll and the Tailwind CSS watcher together at http://localhost:4000.

## Tests

Unit tests live in [`tests/`](tests/) (Minitest) and check the content data itself — the class of bug that doesn't show up as a build error, like FR/EN pages drifting out of sync. Run them from `src/` (they share its `Gemfile`):

```bash
cd src
bundle exec ruby ../tests/run.rb
```

Also worth a manual sanity check before pushing:

```bash
cd src
npm run build:css
bundle exec jekyll build
```

Both should complete without errors or warnings, and `_site/` should contain only site output (no `node_modules`, `Gemfile`, etc. — see `exclude:` in `_config.yml`).

## Features

- Bilingual (FR/EN) with a language switcher — French pages at the root, English under `/en/`
- Light/dark mode, persisted in `localStorage`
- Projects showcase with a "featured" subset highlighted on the landing page
- Blog powered by Markdown posts, with auto-computed reading time and localized dates
- Photography gallery page
- Styling via Tailwind CSS (CLI-compiled, no CDN dependency)
- Deployed to GitHub Pages through a GitHub Actions workflow
