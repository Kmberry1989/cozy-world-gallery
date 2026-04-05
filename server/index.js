
const http = require("http");
const express = require("express");
const { Server, Room } = require("colyseus");
const { Schema, ArraySchema, MapSchema, defineTypes } = require("@colyseus/schema");

const app = express();
const server = http.createServer(app);
const gameServer = new Server({server});

class Player extends Schema {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }
}

defineTypes(Player, {
  x: "number",
  y: "number"
});

class ArtObject extends Schema {
  constructor() {
    super();
    this.url = "";
    this.x = 0;
    this.y = 0;
  }
}

defineTypes(ArtObject, {
  url: "string",
  x: "number",
  y: "number"
});

class State extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
    this.gallery = new ArraySchema();
  }
}

defineTypes(State, {
  players: { map: Player },
  gallery: [ArtObject]
});

class WorldRoom extends Room {
  onCreate(){
    this.setState(new State());

    this.onMessage("placeArt",(c,data)=>{
      const obj = new ArtObject();
      obj.url = data.url;
      obj.x = data.x;
      obj.y = data.y;
      this.state.gallery.push(obj);
    });
  }

  onJoin(c){
    this.state.players.set(c.sessionId, new Player());
  }
}

gameServer.define("world", WorldRoom);
gameServer.listen(2567);
