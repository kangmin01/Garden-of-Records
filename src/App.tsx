import React, { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>
      {/* {isSplashVisible && <SplashScreen />} */}
      {!isSplashVisible && (
        <div className="App">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default App;
