
import { placeArt } from "../network";

export default function UI(){
  return (
    <div style={{position:"absolute",bottom:20,left:20}}>
      <input id="url" placeholder="Image URL"/>
      <button onClick={()=>{
        const url=document.getElementById("url").value;
        placeArt(url,Math.random()*5,Math.random()*5);
      }}>
        Place Art
      </button>
    </div>
  );
}
