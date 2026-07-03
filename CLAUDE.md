# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The Jekyll project lives entirely under `src/` — config, source, `Gemfile`, `package.json`, dependencies. Run all commands below from `src/` unless noted. The repo root only holds `README.md`, this file, `tests/` (Minitest, see below), misc personal scripts (`qrcodemaker.py`), and `.github/workflows/pages.yml` (the deploy workflow).

## Commands

```bash
cd src

# Install dependencies (Ruby gems + Tailwind CLI)
bundle install
npm install

# Run dev server: Jekyll (http://localhost:4000) + Tailwind watcher together
npm run dev

# Run Jekyll alone (does NOT rebuild css/styles.css)
bundle exec jekyll serve

# Rebuild css/styles.css from css/input.css (minified, one-shot)
npm run build:css

# Build static site to _site/
bundle exec jekyll build

# Run the unit test suite (from src/, uses its Gemfile; test files live in ../tests/)
bundle exec ruby ../tests/run.rb
```

**Tests** (`tests/`, Minitest, no Rakefile — `run.rb` just requires every `test_*.rb`): they check content data directly via `YAML.load_file`, not through a Jekyll build. `test_data_parity.rb` and `test_i18n_parity.rb` exist specifically because FR/EN content has drifted before (mismatched project counts, mismatched `featured` flags, no parity enforcement anywhere in Jekyll itself) — expect these to fail loudly whenever one language's `_data` is updated without the other.

**CSS must be built and committed manually for local testing, but production builds it automatically.** `.github/workflows/pages.yml` runs `npm run build:css` before `jekyll build` on every deploy — GitHub Pages is *not* used in classic auto-build mode here (Pages source must be set to "GitHub Actions" in repo Settings). Still, commit `src/css/styles.css` after any Tailwind change so local `git diff`/previews stay accurate between deploys.

## Architecture

Jekyll static site (source in `src/`) deployed to GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`), not the classic branch-based auto-builder.

**Styling**: Tailwind is compiled locally via the Tailwind CLI (`tailwindcss`), not the CDN. `src/css/input.css` is the real source — it pulls in `@tailwind base/components/utilities` and defines all custom component classes under `@layer components`: generic ones (`.card`, `.btn*`, `.tag`, `.section-title*`, `.link-see-more`, `.timeline-dot`, `.post-content` prose, `.photo-grid`/`.photo-item`) plus two reusable card families built on `.card` — `.article-card` (`.article-header`/`.article-date`/`.article-title`/`.article-content`/`.article-arrow`, used for blog list items) and `.project-card` (`.project-header`/`.project-title`/`.project-icon`/`.project-link`/`.project-date`/`.project-content`/`.project-tags`, used for project cards). Both are shared between their dedicated page (`blog_page.html` / `projects_page.html`) and their landing-page section. `npm run build:css` / `npm run watch:css` compile `input.css` to `css/styles.css`, which `_layouts/default.html` and `_layouts/photo.html` link directly — `styles.css` is a generated artifact, don't hand-edit it. Tailwind's content scan paths are declared in `src/tailwind.config.js`; a class used only in a file outside those globs won't be generated. Accent color across the site is Tailwind's amber palette (`amber-400`/`amber-500` light, `amber-300` dark) — no other accent hue is used intentionally.

**Layouts** (`_layouts/`):
- `default.html` — wraps all standard pages; injects `_includes/header.html` and `{{ content }}`. Dark mode is class-based (`dark` on `<html>`), toggled by `window.toggleTheme()` and persisted in `localStorage`; the inline `<script>` in `<head>` applies it before paint to avoid a flash. The viewport-pinned gradient background is currently commented out in the markup — the live background is just `dark:bg-slate-900` / light default.
- `photo.html` — a separate full layout (not built on `default.html`) forced into dark mode (`class="h-full dark"` on `<html>`, `bg-black` body) for the photo gallery. Duplicates the theme-toggle boilerplate from `default.html` rather than sharing it.
- `post.html` — wraps blog posts in a frosted-glass `.card` with a `post-content` class for prose styling. Header shows date + auto-computed reading time (`content | number_of_words` divided by 200 wpm). Supports optional `description` and `tags` front matter.

**Bilingual content (i18n)**: Pages declare `lang: fr` or `lang: en` in front matter. French pages live at the root (`/`, `/projects/`, `/blog/`); English pages under `en/`. Each page sets `lang_alt_url` so the header language switcher links to the equivalent page. The `photo/` page is FR-only (`lang_alt_url` points to itself). The header's language switcher renders inline SVG flags via `_includes/flag.html` (params: `code` = `fr`/`gb`, `class`) rather than emoji, since flag emoji don't render on Windows.

**UI strings** (`_data/i18n/{lang}.yml`): All user-facing labels are stored here and accessed via:
```liquid
{% assign t = site.data.i18n[page.lang] %}
```
Includes a `months` array per language, used by `_includes/localized_date.html` (params: `date`) to render dates with a localized month name — Liquid's `date` filter has no locale awareness, so `%B` always renders in English otherwise.

**Content files** (YAML under `_data/{lang}/`, split per language — `_data/fr/` and `_data/en/`): Accessed in templates via `{% assign data = site.data[page.lang] %}`, then `data.projects`, `data.profile`. Keep the two language directories in sync manually — nothing enforces parity (has broken before: differing `featured` flags, extra/commented-out projects between languages). `data.profile` (`name`, `hook`, `description`) drives the landing-page hero in `_includes/landing_page.html`. `_data/photos.yml` (not language-split) feeds the photo gallery — a flat list of `{ src, alt }` consumed by `_includes/photo_page.html`.

**Page architecture**: Each page type has a shared `_includes/` template (`landing_page.html`, `projects_page.html`, `blog_page.html`, `photo_page.html`). Actual page files (`index.html`, `en/index.html`, etc.) contain only front matter + a single `{% include %}` call. The landing page additionally surfaces the 2 most recent posts and any project with `featured: true`, reusing the same `.article-card`/`.project-card` markup as the dedicated list pages.

**Pages beyond FR/EN pairs**:
- `/photo/` — photography gallery page (shared by both languages, uses the `photo.html` layout)

**Design system**: Frosted-glass card pattern: `bg-white/75 dark:bg-zinc-900/70 backdrop-blur-lg squircle overflow-hidden border ...` (packaged as the `.card` component class, base for `.article-card`/`.project-card`). Timeline dots use the `.timeline-dot` CSS class (gradient defined in `css/input.css` for dark mode compatibility, currently unused since the experience/education timeline sections are commented out in `landing_page.html`). Squircle corners (`border-radius: 22px`) come from the `.squircle` utility.

**Blog posts**: Markdown files in `_posts/` with `YYYY-MM-DD-title.md` naming. Front matter fields: `title`, `date`, `lang` (defaults to `fr`), optional `description` and `tags`. Surfaced via `site.posts` in `blog_page.html` and the landing page.
