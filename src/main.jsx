import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./components/Index";
import Sepet from "./components/Sepet";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/sepet" element={<Sepet />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
