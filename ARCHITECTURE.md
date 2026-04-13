# Architecture

## Overview

This repo is a two-part prototype:

- `server/` hosts a Colyseus room that keeps multiplayer state in memory.
- `client/` connects to that room and renders a simple top-level 3D world.

There is no database and no API layer beyond the Colyseus room connection.

## Runtime Topology

1. Root `npm run dev` starts both subprojects with `concurrently`.
2. The server listens on port `2567`.
3. The client joins or creates the `world` room over WebSocket.
4. Colyseus pushes room state changes to each client.
5. The client normalizes that state into Zustand and renders it.

## Server

Main file: [server/index.js](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/server/index.js)

### Schema

- `Player`
  - `x`
  - `y`
- `ArtObject`
  - `url`
  - `x`
  - `y`
- `State`
  - `players`: `MapSchema<Player>`
  - `gallery`: `ArraySchema<ArtObject>`

### Room Behavior

- `onCreate`
  - initializes state
  - registers `placeArt`
- `onJoin`
  - inserts a new `Player` at the connecting client's `sessionId`

### Gaps

- No `onLeave`, so disconnected players are never removed.
- No movement message or player state updates beyond default `(0, 0)`.
- No validation for `placeArt`.
- No persistence or upload handling.

## Client

### Entry Points

- [client/src/main.jsx](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/main.jsx)
- [client/src/App.jsx](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/App.jsx)

### Key Modules

- [client/src/World.jsx](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/World.jsx)
  - boots the network connection
  - renders the ground plane
  - renders gallery objects as white planes
- [client/src/network.js](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/network.js)
  - joins the room
  - listens for `onStateChange`
  - converts Colyseus structures to plain objects and arrays
  - sends `placeArt`
- [client/src/store.js](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/store.js)
  - stores `players`, `objects`, and `gallery`
  - currently duplicates gallery data into `objects`
- [client/src/ui/UI.jsx](/Users/kyleberry/Documents/GitHub/cozy-world-gallery/client/src/ui/UI.jsx)
  - simple absolute-positioned input/button overlay
  - sends random placement coordinates

## Data Flow

1. `World` mounts and calls `init()`.
2. `init()` joins the `world` room.
3. Colyseus sends room state snapshots.
4. The client converts `state.players` and `state.gallery` to plain data.
5. Zustand stores the data.
6. `World` reads `objects` from Zustand and renders meshes.
7. `UI` calls `placeArt(url, x, y)` to emit a room message.
8. The server appends the new `ArtObject`.
9. Updated room state fans out to all clients.

## Current Product Reality

The repo is best described as a real-time placement prototype, not a full gallery system yet. The image URL travels through the stack, but the render path does not use it. The README claims land ownership and inventory, but those systems are not present in code.
