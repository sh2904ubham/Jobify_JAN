import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/componentslite/Navbar"; // Use relative path
import React from "react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
