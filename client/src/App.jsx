import "./App.css";

import HeaderNavbarDev from "./components/common/HeaderNavbarDev/HeaderNavbarDev/HeaderNavbarDev";
import Navbar from "./components/common/Navbar/Navbar";

function App() {
  function handleViewChange(view) {
    console.log(`Vue changée pour : ${view}`);
  }

  return (
    <div>
      <HeaderNavbarDev onViewChange={handleViewChange} />
      <Navbar />
    </div>
  );
}

export default App;
