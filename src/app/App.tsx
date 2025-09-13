import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { type Point } from "@/lib/func/bezier";
import { useState } from "react";

function App() {
  const [points, setPoints] = useState([
    { x: 10, y: 10 },
    { x: 200, y: 200 },
  ]);

  const handleFormChange = (points: Point[]) => {
    setPoints(points);
  };

  return (
    <div className="flex">
      <Canva pixels={points}/>
      <Sidebar onFormChange={handleFormChange} />
    </div>
  );
}

export default App;
