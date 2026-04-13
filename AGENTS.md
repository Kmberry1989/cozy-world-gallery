# AGENTS.md

This file is for coding agents and human contributors working in this repo.

## Goal

Keep this project as a small, understandable multiplayer prototype. Prefer direct changes over framework churn.

## What This Repo Is

- `client/` is a Vite React app using `@react-three/fiber`.
- `server/` is an Express + Colyseus server with one room type: `world`.
- Real-time state is the product boundary. The server owns room state and the client mirrors it into Zustand.

## What Exists Today

- Players join one shared Colyseus room.
- The server tracks:
  - `players`: keyed by Colyseus `sessionId`
  - `gallery`: array of placed art records with `url`, `x`, `y`
- The client:
  - connects to `ws://localhost:2567`
  - subscribes to room state changes
  - copies `players` and `gallery` into Zustand
  - renders gallery entries as simple planes in the 3D world
  - exposes a minimal UI to send `placeArt`

## Important Constraints

- There is no persistence layer.
- There is no auth, ownership validation, or upload pipeline.
- The art URL is stored, but it is not rendered as a texture yet.
- The repo has no lint, test, or formatting setup yet. Keep edits small and readable.

## Working Conventions

- Preserve the current split:
  - server owns authoritative multiplayer state
  - client owns presentation and local UI state
- If you change room state schema, update both:
  - [server/index.js](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/server/index.js)
  - [client/src/network.js](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/network.js)
- Prefer React state and refs over direct DOM access when touching UI code. The current `document.getElementById` usage works, but it should not spread.
- Avoid introducing TypeScript or larger tooling unless the task justifies it.
- Keep the transport contract explicit. Message names and payload shape should stay obvious.

## Verification

Minimum verification after code changes:

```bash
npm --prefix client run build
node --check server/index.js
```

If you change runtime behavior, also run the app and validate the flow manually.
