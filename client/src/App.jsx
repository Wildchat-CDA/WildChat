import "./App.css";

import HeaderNavbarDev from "./components/common/HeaderNavbarDev/HeaderNavbarDev/HeaderNavbarDev";

function App() {
  function handleViewChange(view) {
    console.log(`Vue changée pour : ${view}`);
  }

  return (
    <div>
      <HeaderNavbarDev onViewChange={handleViewChange} />
    </div>
  );
}

export default App;
