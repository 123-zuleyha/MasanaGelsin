// const foods = [
//     { image: './images/yemek/karışık.jpg', type: 'Fast Food', name: 'Karışık Pizza', price: '200,00', ingredient: 'Pizza sosu, mozzarella peyniri, sosis, sucuk, salam, mantar, zeytin, mısır, yeşil biber' },
//     { image: './images/yemek/sucuklu.jpg', type: 'Fast Food', name: 'Sucuklu Pizza', price: '220,00', ingredient: 'Pizza sosu, mozzarella peyniri, sucuk' },
//     { image: './images/yemek/klasik.jpg', type: 'Fast Food', name: 'Klasik Hamburger', price: '250,00', ingredient: 'Hamburger eti (dana),ekmek, turşu, ketçap, mayonez, göbek salata, domates, soğan' },
//     { image: './images/yemek/tavuk.jpg', type: 'Fast Food', name: 'Tavuklu Hamburger', price: '230,00', ingredient: 'Brioche ekmek, klasik gurme eti, 2 dilim peynir, marul, mayonez, barbekü sos' },
//     { image: './images/yemek/mantarli.jpg', type: 'Fast Food', name: 'Kremalı Mantarlı Makarna', price: '190,00', ingredient: 'Mantar,krema,penne makarna' },
//     { image: './images/yemek/pestolu.jpg', type: 'Fast Food', name: 'Pestolu Makarna', price: '210,00', ingredient: 'Özel pesto sos, yeni kesilmiş taptaze makarna' }
// ];

// const drinks = [
//     { image: './images/içecek/suu.jpg', type: 'İçecek', name: 'Su', price: '15,00' },
//     { image: './images/içecek/cay.jpg', type: 'İçecek', name: 'Çay', price: '30,00' },
//     { image: './images/içecek/kahve.jpg', type: 'İçecek', name: 'Türk Kahvesi', price: '70,00' },
//     { image: './images/içecek/ayran.jpg', type: 'İçecek', name: 'Ayran', price: '60,00' },
//     { image: './images/içecek/limonataa.jpg', type: 'İçecek', name: 'Limonata', price: '100,00' }
// ];

// const products = [
//     { image: './images/aperatifler/patates.jpg', type: 'Kızartma', name: 'Patates Kızartması', price: '150,00', ingredient: 'İnce dilimlenmiş klasik patatesler' },
//     { image: './images/aperatifler/sogan.jpg', type: 'Kızartma', name: 'Soğan Halkası', price: '150,00', ingredient: '7 adet soğan halkası' },
//     { image: './images/aperatifler/börek.jpg', type: 'Börek', name: 'Sigara Böreği', price: '170,00', ingredient: 'Peynir dolgulu 5 adet sigara böreği' }
// ];

// const candies = [
//     { image: './images/tatli/visne.jpg', type: 'Cheesecake', name: 'Frambuazlı Cheesecake', price: '180,00', ingredient: 'Bisküvi, frambuaz sos' },
//     { image: './images/tatli/limon.jpg', type: 'Cheesecake', name: 'Limonlu Cheesecake', price: '180,00', ingredient: 'Bisküvi, limonlu sos' },
//     { image: './images/tatli/san_sebastian.jpg', type: 'Cheesecake', name: 'San Sebastian Cheesecake', price: '190,00', ingredient: 'Özel çikolata sosu ile servis edilir' },
//     { image: './images/tatli/browni.jpg', type: 'Browni', name: 'Çikolatalı Browni', price: '160,00', ingredient: 'Yanında 1 top dondurma ile servis edilir' },
//     { image: './images/tatli/magnolya.jpg', type: 'Magnolya', name: 'Çilekli Magnolya', price: '150,00', ingredient: 'Çilek, bisküvi, krema' },
//     { image: './images/tatli/tiramisu.jpg', type: 'Tiramisu', name: 'Tiramisu', price: '160,00', ingredient: 'Kedidili, kakao, krema' }
// ];

import React, { useState, useEffect, useReducer } from "react";
import MasanaGelsinDataService from "../services/MasanaGelsinDataService";
import MasanaGelsinReducer from "../services/MasanaGelsinReducer";
import "../css/UrunSilme.css";

function UrunListele() {
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
  const [sortOrder, setSortOrder] = useState("asc"); // State to manage sorting order

  function HandleChangeTab(tab, index) {
    setCurrentIndex(index);
    setCategory(tab);
  }

  const handleSort = (order) => {
    setSortOrder(order);
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

  const tabs = ["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"];

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
          {products.data.map((item) => (
            <div
              key={item._id}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UrunListele;
