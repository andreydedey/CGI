import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { rasterizePolyline } from "@/lib/func/polilinha";
import { useState } from "react";

function App() {
  const [points, setPoints] = useState([
    { x: 10, y: 10 },
    { x: 200, y: 200 },
  ]);

  const handleFormChange = (points: Point[]) => {
    setPoints(points);
  };

  const pixels = rasterizePolyline(points);
  return (
    <div className="flex">
      <Canva pixels={pixels} />
      <Sidebar onFormChange={handleFormChange} />
    </div>
  );
}

export default App;
