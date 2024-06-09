import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MasanaGelsinDataService from "../services/MasanaGelsinDataService";
import MasanaGelsinReducer from "../services/MasanaGelsinReducer";
import "../css/UrunSilme.css";

function UrunGuncelle() {
  const [category, setCategory] = useState("Yiyecekler");
  const [products, dispatchProducts] = useReducer(MasanaGelsinReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    dispatchProducts({ type: "FETCH_INIT" });
    try {
      MasanaGelsinDataService.getProductsByCategory(category).then((result) => {
        dispatchProducts({
          type: "FETCH_SUCCESS",
          payload: result.data.data,
        });
      });
    } catch {
      dispatchProducts({ type: "FETCH_FAILURE" });
    }
  }, [category]);

  const [currentIndex, setCurrentIndex] = useState(0);

  function HandleChangeTab(tab, index) {
    setCurrentIndex(index);
    setCategory(tab);
  }

  const tabs = ["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"];

  const navigate = useNavigate();

  const [updatedProduct, setUpdatedProduct] = useState({
    _id: "",
    name: "",
    description: "",
    imageURL: "",
    price: "",
    type: "",
    category: "",
  });

  const confirmUpdate = (item) => {
    setUpdatedProduct(item);
  };

  useEffect(() => {
    if (updatedProduct._id) {
      navigate("/adminEkleGuncelle", { state: { updatedProduct } });
    }
  }, [updatedProduct, navigate]);

  const [sortOrder, setSortOrder] = useState("asc");

  const sortProducts = (order) => {
    dispatchProducts({
      type: "FETCH_SUCCESS",
      payload: [...products.data].sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      }),
    });
  };

  const handleSort = (order) => {
    setSortOrder(order);
    sortProducts(order);
  };

  return (
    <div id="menu" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-xl mx-auto mb-4 flex p-2 bg-white shadow-md rounded-lg size">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => HandleChangeTab(tab, index)}
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
              currentIndex === index ? "bg-red-600 text-white" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        className="mx-auto px-4 flex"
        style={{ marginBottom: "1cm", padding: "1rem 0 1rem 0.5rem" }}
      >
        <button
          className={`px-4 py-2.5 border border-gray-200 rounded-l-full tracking-wider ${
            sortOrder === "asc" ? "bg-gray-400" : "bg-gray-300"
          } transition hover:bg-gray-400`}
          onClick={() => handleSort("asc")}
        >
          Fiyata Göre Artan
        </button>
        <button
          className={`px-4 py-2.5 border border-gray-200 rounded-r-full tracking-wider ${
            sortOrder === "desc" ? "bg-gray-400" : "bg-gray-300"
          } transition hover:bg-gray-400`}
          onClick={() => handleSort("desc")}
        >
          Fiyata Göre Azalan
        </button>
      </div>
      <div className="mx-auto px-4 mx-20">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1">
          {[products.data].flat().map((item, index) => (
            <div
              key={index}
              className="bg-white w-full shadow-lg rounded-3xl p-4 max-w-[360px] lg:max-w-none lg:flex"
            >
              <div className="w-full lg:size-48">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="size-full rounded-3xl object-cover bg-gray-100"
                />
              </div>
              <div className="flex-auto mt-4 lg:mt-0 lg:ml-4">
                <h5 className="text-xl font-medium text-red-600">
                  {item.type}
                </h5>
                <h2 className="text-lg font-medium">{item.name}</h2>
                {item.description && (
                  <div className="mt-4 text-black">
                    <h3>{item.description}</h3>
                  </div>
                )}
                <div className="border-t border-gray-200 mt-8 sm-12 lg:mt-16 pt-4 text-sm font-medium flex justify-between items-center">
                  <div className="flex-auto text-left">
                    <button className="px-4 py-2.5 border border-gray-200 rounded-full text-black tracking-wider">{`${item.price} ₺`}</button>
                  </div>
                  <button
                    onClick={() => confirmUpdate(item)}
                    className="px-2 py-2.5 border border-red-200 rounded-full text-white tracking-wider bg-red-600 transition hover:bg-gray-600"
                  >
                    Ürünü Güncelle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UrunGuncelle;
