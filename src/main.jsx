import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Index from "./components/Index";
import Sepet from "./components/Sepet";
import Favorites from "./components/Favorites";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Index />} />
      <Route path="/sepet" element={<Sepet />} />
      <Route path="/favoriler" element={<Favorites />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
