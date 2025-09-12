import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { rasterizePolyline } from "@/lib/func/polilinha";

function App() {

  const points: Point[] = [
    { x: 10, y: 10 },
    { x: 50, y: 80 },
    { x: 90, y: 20 },
    { x: 130, y: 100 }
  ];

  const pixels = rasterizePolyline(points);
  return (
    <div className="flex">
      <Canva pixels={pixels} />
      <Sidebar />
    </div>
  );
}

export default App;


