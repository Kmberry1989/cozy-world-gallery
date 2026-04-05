
import * as Colyseus from "colyseus.js";
import { useStore } from "./store";

let room;

export async function init(){
  const client = new Colyseus.Client("ws://localhost:2567");
  room = await client.joinOrCreate("world");

  room.onStateChange(state=>{
    useStore.getState().setPlayers({...state.players});
    useStore.getState().setGallery(state.gallery);
  });

  room.onMessage("placed",o=>{
    useStore.getState().addObject(o);
  });
}

export function placeArt(url,x,y){
  room.send("placeArt",{url,x,y});
}
