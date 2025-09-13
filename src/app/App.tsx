import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { cohenSutherlandClip, type Rect } from "@/lib/func/recorte_linha";

function App() {

  return (
    <div className="flex">
      <Canva />
      <Sidebar />
    </div>
  );
}

export default App;


