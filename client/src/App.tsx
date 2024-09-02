import React from "react";
import "./App.css";
import { HandRaiseProvider } from "./context/HandRaiseContext";
import HeaderNavbarDev from "./components/common/HeaderNavbarDev/HeaderNavbarDev/HeaderNavbarDev";
import Navbar from "./components/common/Navbar/Navbar";
import RaisedHandsList from "./components/teacher/RaisedHandsList";

function App() {
  function handleViewChange(view: string) {
    console.log(`Vue changée pour : ${view}`);
  }

  return (
    <HandRaiseProvider>
      <div>
        <HeaderNavbarDev onViewChange={handleViewChange} />
        <Navbar />
        <RaisedHandsList />
      </div>
    </HandRaiseProvider>
  );
}

export default App;