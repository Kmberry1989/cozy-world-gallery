
const http = require("http");
const express = require("express");
const { Server } = require("colyseus");

const app = express();
const server = http.createServer(app);
const gameServer = new Server({server});

class Room{
  onCreate(){
    this.setState({
      players:{},
      gallery:[]
    });

    this.onMessage("placeArt",(c,data)=>{
      const obj = {url:data.url,x:data.x,y:data.y};
      this.state.gallery.push(obj);
      this.broadcast("placed",obj);
    });
  }

  onJoin(c){
    this.state.players[c.sessionId]={x:0,y:0};
  }
}

gameServer.define("world",Room);
gameServer.listen(2567);
