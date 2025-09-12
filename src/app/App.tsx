import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { generateCircleOutlinePixels } from "@/lib/func/circulo";

function App() {

  const circlePixels = generateCircleOutlinePixels(10, 7, 3);
  return (
    <div className="flex">
      <Canva pixels={circlePixels} />
      <Sidebar />
    </div>
  );
}

export default App;


