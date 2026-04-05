
import { create } from "zustand";

export const useStore = create(set => ({
  players:{},
  objects:[],
  gallery:[],
  setPlayers:p=>set({players:p}),
  addObject:o=>set(s=>({objects:[...s.objects,o]})),
  setGallery:g=>set({gallery:g, objects:g})
}));
