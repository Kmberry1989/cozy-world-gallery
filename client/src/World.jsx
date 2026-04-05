
import { useEffect } from "react";
import { useStore } from "./store";
import { init } from "./network";

export default function World(){
  const objects = useStore(s=>s.objects);

  useEffect(()=>{init();},[]);

  return <>
    <mesh rotation={[-Math.PI/2,0,0]}>
      <planeGeometry args={[100,100]} />
      <meshStandardMaterial color="green"/>
    </mesh>

    {objects.map((o,i)=>(
      <mesh key={i} position={[o.x,1,o.y]}>
        <planeGeometry args={[2,2]} />
        <meshStandardMaterial map={null} color="white"/>
      </mesh>
    ))}
  </>
}
