import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { bresenhamLine } from "@/lib/func/bresenham";
import { rasterizePolyline } from "@/lib/func/polilinha";
import { useState } from "react";

function App() {
  const mapFunctions = {
    bresenham: bresenhamLine,
  };

  const [points, setPoints] = useState([
    { x: 10, y: 10 },
    { x: 200, y: 200 },
  ]);

  const handleFormChange = (data) => {
    const { algorithm, ...params } = data;
    const selectedAlgorithm = mapFunctions[algorithm];
    if (selectedAlgorithm) {
      console.log("Form data:", data);
      // const points = selectedAlgorithm(params);
      // setPoints(points);
    }
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
