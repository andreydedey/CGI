import Canva from "@/components/Canva";
import Sidebar from "@/components/sidebar";
import { bresenhamLine } from "@/lib/func/bresenham";

function App() {

  const pixels = bresenhamLine(1, 2, 3, 4);
  return (
    <div className="flex gap-4">
      <Canva pixels={pixels} />
      <Sidebar />
    </div>
  );
}

export default App;
