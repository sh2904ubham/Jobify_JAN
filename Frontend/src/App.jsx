import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/componentslite/Navbar";
import Login from "./components/authentication/Login";
import Home from "./components/componentslite/Home";
import Register from "./components/authentication/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "./components/componentslite/PrivacyPolicy";
import TermsOfService from "./components/componentslite/TermsofService";

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
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/TermsOfService",
    element: <TermsOfService />,
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
