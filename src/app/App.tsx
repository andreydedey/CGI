import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { cohenSutherlandClip, type Rect } from "@/lib/func/recorte_linha";

function App() {

  const rect: Rect = { xmin: 10, ymin: 10, xmax: 80, ymax: 60 };

  const lineStart: Point = { x: 0, y: 20 };
  const lineEnd: Point = { x: 100, y: 50 };

  const clipped = cohenSutherlandClip(lineStart, lineEnd, rect);

  return (
    <div className="flex">
      <Canva pixels={clipped} />
      <Sidebar />
    </div>
  );
}

export default App;


