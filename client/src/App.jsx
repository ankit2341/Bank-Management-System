import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import NavbarForAll from "./Components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarForAll />
      <MainRoutes />
      <ToastContainer autoClose={1500} theme="dark" position="bottom-right" />
    </>
  );
}

export default App;
