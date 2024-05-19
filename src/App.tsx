import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* {isSplashVisible && <SplashScreen />} */}
      {!isSplashVisible && (
        <div className="App">
          {/* <Navbar /> */}
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default App;
