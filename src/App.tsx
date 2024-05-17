import React from "react";
import "./App.css";
import Lottie from "react-lottie";
import ani from "./ahah.json";

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ani,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="App">
      <Lottie options={defaultOptions} height={400} width={400} />
      <p className="bg-red-200 font-bold">haha</p>
    </div>
  );
}

export default App;
