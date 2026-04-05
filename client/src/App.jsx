
import { Canvas } from "@react-three/fiber";
import World from "./World";
import UI from "./ui/UI";

export default function App(){
  return <>
    <Canvas camera={{position:[0,6,10]}}>
      <ambientLight />
      <World/>
    </Canvas>
    <UI/>
  </>
}
