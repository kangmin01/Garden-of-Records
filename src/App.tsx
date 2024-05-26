import "./App.css";
import { Outlet } from "react-router-dom";
import FloatingButton from "./components/ui/FloatingButton";

const App: React.FC = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
