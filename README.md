
# Cozy World Gallery

Small multiplayer prototype for a shared world with a gallery placement loop.

## Current Scope

- Colyseus room server for real-time state sync
- React + Vite client
- `react-three-fiber` world rendering
- Simple art placement UI that sends an image URL and random coordinates
- In-memory gallery state shared across connected clients

## Repo Layout

- `client/`: Vite React app and 3D scene
- `server/`: Express + Colyseus multiplayer server
- [AGENTS.md](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/AGENTS.md): instructions for coding agents and contributors
- [ARCHITECTURE.md](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/ARCHITECTURE.md): system overview and data flow
- [CONTRIBUTING.md](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/CONTRIBUTING.md): local workflow and verification notes

## Run

From the repo root:

```bash
cd /Users/kyleberry/Documents/GitHub/cozy-world-gallery
npm install
npm run dev
```

That starts:

- client dev server via Vite
- server on `ws://localhost:2567`

You can also run each side separately:

```bash
cd /Users/kyleberry/Documents/GitHub/cozy-world-gallery/client
npm install
npm run dev
```

```bash
cd /Users/kyleberry/Documents/GitHub/cozy-world-gallery/server
npm install
node index.js
```

## Notes

- Gallery data is currently in memory only. Restarting the server clears it.
- The client stores gallery entries and renders them as white planes; uploaded image URLs are not yet turned into textures.
- The README feature list from the original stub mentioned land ownership and inventory, but those systems are not implemented in this repo yet.
