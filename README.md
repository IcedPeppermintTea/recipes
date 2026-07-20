# Recipe Book

A dynamic recipe book built with React, TypeScript, and Tailwind CSS. Recipes are stored as individual static JSON files and rendered through a shared template: add a new recipe by adding a new JSON file, no code changes required.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [How It Works](#how-it-works)
  - [Data Schema](#data-schema)
  - [Adding a New Recipe](#adding-a-new-recipe)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)

---

## About

A recipe book where content and code are fully decoupled: every recipe is a static JSON file rendered through one shared template, so new recipes can be added without touching the application code.

## Features

- File-based recipes — no database, no CMS, just JSON
- Lightweight manifest keeps the sidebar fast without loading every recipe up front
- Centralized tag registry keeps tag styling consistent and in one place
- Shared `RecipeCard` template renders any recipe that matches the schema

## Getting Started

### Prerequisites

- React + TypeScript
- Vite
- Tailwind CSS

## Usage

### How It Works

1. A **manifest** (`manifest.json`) lists a lightweight summary — `id` and `title` — for every recipe. This is the only file read to populate the sidebar, so the app never needs to scan a folder or load every recipe just to build the list.
2. Clicking a recipe in the sidebar fetches that **one specific recipe's JSON file**, using its `id` to build the file path.
3. A single `RecipeCard` template renders whichever recipe is currently loaded — the template doesn't know or care which file the data came from, as long as it matches the shared schema.
4. Tag styling (colors, borders) lives in a central `tagRegistry`, not inside each recipe file. Recipes only reference tags by id string; the registry is the single source of truth for how each tag looks.

### Data Schema

**Recipe** (one file per recipe, e.g. `public/recipe-data/lemon-water.json`):

```json
{
  "id": "template",
  "title": "Template",
  "coverImage": "/images/placeholder.png",
  "tags": ["quick", "vegetarian"],
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step one", "step two"]
}
```

- `id` must exactly match the filename (minus `.json`) — it's how the app knows which file to fetch when a recipe is selected.
- `coverImage` is a public path (files live in `public/images/`)
- `tags` is an array of tag **id strings**, referencing entries in `tagRegistry` (in `App.tsx`)

**Manifest** (`public/recipe-data/manifest.json`) — an array, one entry per recipe:

```json
[{ "id": "template", "title": "Template" }]
```

### Adding a New Recipe

Currently a manual process:

1. Create a new JSON file in `public/recipe-data/`, named `<id>.json`, matching the schema above.
2. Add a `{ "id": "...", "title": "..." }` entry for it to `manifest.json`.
3. If it uses a new tag, add that tag's definition to `tagRegistry` in `App.tsx` first.

> Note: recipes are already present for testing and for fun — likely to be replaced with 2-3 mock files in the future.

## Project Structure

```
public/
  recipe-data/
    manifest.json        ← {id, title} summary for every recipe (Table of Contents)
    template.json       ← one file per recipe, filename matches its id
    ...
src/
  App.tsx                 ← state, data fetching, type definitions, tag registry
  components/
    TableofContent.tsx    ← sidebar, reads the manifest
    RecipeCard.tsx         ← template, renders one recipe
    Tag.tsx                ← renders a single styled tag pill
```

## Roadmap

- [x] ~~No error handling if a fetch fails (malformed JSON, missing file, manifest/recipe id mismatch)~~ — now displays only on the console; consider rendering in the UI
- [ ] Regenerate `manifest.json` automatically from the contents of `recipe-data/` instead of maintaining it by hand
- [ ] UI-driven "add recipe" flow (requires a backend, since the browser can't write to disk on its own)
- [ ] Replace literal per-tag Tailwind class names with a more dynamic approach, if a workaround for build-time class scanning is found
- [ ] Grouping / filtering / searching functionality — currently requires scrolling through each recipe manually
- [ ] Make Table of Contents collapsible on smaller screens
