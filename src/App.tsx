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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isSplashVisible && <SplashScreen />}
      {!isSplashVisible && (
        <div className="App">
          <h1 className="bg-red-100 w-[900px]">test</h1>
          <Navbar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
