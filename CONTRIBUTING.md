# Contributing

## Setup

Install and run from the repo root:

```bash
cd /Users/kyleberry/Documents/GitHub/cozy-world-gallery
npm install
npm run dev
```

This relies on the root `postinstall` script to install both `client/` and `server/`.

## Development Workflow

- Client work lives in `client/`.
- Server and multiplayer state live in `server/`.
- If you add fields to room state, update both the Colyseus schema and the client-side mapping logic.
- Prefer small vertical changes that keep the client/server contract easy to inspect.

## Code Style

- The codebase is plain JavaScript, not TypeScript.
- Existing components are simple function components.
- Zustand is used for shared client state.
- Colyseus schema classes define the authoritative multiplayer model.
- There is currently no formatter or linter. Match surrounding style and keep changes explicit.

## Manual Verification

Before handing off a change, run:

```bash
npm --prefix client run build
node --check server/index.js
```

If you changed user-visible behavior, also verify the app manually:

1. Start the root dev command.
2. Open the Vite client in a browser.
3. Confirm the world renders.
4. Place an art item and confirm it appears.
5. If you changed networking or state, verify with a second browser tab.

## Suggested Next Improvements

- Add `onLeave` cleanup for players.
- Replace DOM querying in the UI with controlled React state.
- Load textures from `ArtObject.url` instead of rendering white placeholders.
- Add persistence if the gallery should survive server restarts.
