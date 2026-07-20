# Recipe Book

A dynamic recipe book built with React, TypeScript, and Tailwind CSS. Recipes are stored as individual static JSON files and rendered through a shared template: add a new recipe by adding a new JSON file, no code changes required.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS

## How it works

1. A **manifest** (`manifest.json`) lists a lightweight summary — `id` and `title` — for every recipe. This is the only file read to populate the sidebar, so the app never needs to scan a folder or load every recipe just to build the list.
2. Clicking a recipe in the sidebar fetches that **one specific recipe's JSON file**, using its `id` to build the file path.
3. A single `RecipeCard` template renders whichever recipe is currently loaded — the template doesn't know or care which file the data came from, as long as it matches the shared schema.
4. Tag styling (colors, borders) lives in a central `tagRegistry`, not inside each recipe file. Recipes only reference tags by id string; the registry is the single source of truth for how each tag looks.

## File structure

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

## Data schema

**Recipe** (one file per recipe, e.g. `public/recipe-data/lemon-water.json`):

```json
{
  "id": "example-id",
  "title": "Recipe Title",
  "coverImage": "/images/placeholder.png",
  "tags": ["quick", "vegetarian"],
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step one", "step two"]
}
```

- `id` must exactly match the filename (minus `.json`) — it's how the app knows which file to fetch when a recipe is selected.
- `coverImage` is a public path (files live in `public/images/`), not a bundler import — this lets it work for recipes added after the app is built.
- `tags` is an array of tag **id strings**, referencing entries in `tagRegistry` (in `App.tsx`) — not full tag objects. This keeps each tag's color/styling defined in one place instead of duplicated across every recipe that uses it.

**Manifest** (`public/recipe-data/manifest.json`) — a bare array, one entry per recipe:

```json
[{ "id": "template", "title": "Template" }]
```

## Adding a new recipe (current, manual process)

1. Create a new JSON file in `public/recipe-data/`, named `<id>.json`, matching the schema above.
2. Add a `{ "id": "...", "title": "..." }` entry for it to `manifest.json`.
3. If it uses a new tag, add that tag's definition to `tagRegistry` in `App.tsx` first.

Note: recipes are already present for testing and for fun - likely to be replaced with 2-3 mock files in the future

## Known gaps / next steps

- ~~No error handling yet if a fetch fails (malformed JSON, missing file, manifest/recipe id mismatch) — currently fails silently or throws an uncaught error in the console.~~
  - Displays only on the console - consider rendering in the UI
- Manifest is maintained by hand; a small script to regenerate it from the contents of `recipe-data/` would remove the need to edit it manually every time.
- Adding/editing recipes currently requires editing files directly — a UI-driven "add recipe" flow would need a backend to write files, since the browser can't write to disk on its own.
- Tag styling uses literal Tailwind class names per tag (required for Tailwind's build-time class scanning to pick them up) rather than dynamically constructed classes.
- No grouping / filtering / searching functionality implemented yet - need to scroll through each recipe manually
