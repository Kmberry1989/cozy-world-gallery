
import * as Colyseus from "colyseus.js";
import { useStore } from "./store";

let room;

export async function init(){
  const client = new Colyseus.Client("ws://localhost:2567");
  room = await client.joinOrCreate("world");

  room.onStateChange(state=>{
    const players = typeof state.players?.entries === "function"
      ? Object.fromEntries(state.players.entries())
      : {...state.players};
    const gallery = Array.from(state.gallery ?? [], (item) => ({
      url: item.url,
      x: item.x,
      y: item.y
    }));

    useStore.getState().setPlayers(players);
    useStore.getState().setGallery(gallery);
  });
}

export function placeArt(url,x,y){
  room.send("placeArt",{url,x,y});
}
