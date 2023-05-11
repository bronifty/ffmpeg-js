import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoProcessor from "./components/FFMPEG";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <VideoProcessor />
    </>
  );
}

export default App;
