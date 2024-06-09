import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UrunSilme from "./components/UrunSilme";
import UrunListele from "./components/UrunListele";
import UrunGuncelle from "./components/UrunGuncelle";
import UrunEkleGuncelle from "./components/UrunEkleGuncelle";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Index from "./components/Index";
import Sepet from "./components/Sepet";
import OdemeForm from "./components/Odeme";
import Favorites from "./components/Favorites";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="admin" element={<AdminPanel />} />
      <Route path="adminSilme" element={<UrunSilme />} />
      <Route path="adminGuncelle" element={<UrunGuncelle />} />
      <Route path="adminListele" element={<UrunListele />} />
      <Route path="adminEkleGuncelle" element={<UrunEkleGuncelle />} />
      <Route path="/" element={<Login />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/index" element={<Index />} />
      <Route path="/sepet" element={<Sepet />} />
      <Route path="/odeme" element={<OdemeForm />} />
      <Route path="/favoriler" element={<Favorites />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
