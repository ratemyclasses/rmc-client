import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter.jsx";
import { Auth } from "./features/auth/Auth.jsx";

function App() {
  return (
    <div className="md:container md:mx-auto">
      <Auth />
    </div>
  );
}

export default App;
