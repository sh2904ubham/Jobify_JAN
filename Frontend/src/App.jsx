import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/componentslite/Navbar";
import Login from "./components/authentication/Login";
import Home from "./components/componentslite/Home";
import Register from "./components/authentication/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
