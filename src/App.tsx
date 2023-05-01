import React from "react";
import AppHeader from "./components/app-header";
import WithBurgersComponents from "./hocs/with-burgers-components";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <WithBurgersComponents />
    </div>
  );
}

export default App;
