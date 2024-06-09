import React, { useState, useEffect, useReducer } from "react";
import MasanaGelsinDataService from "../services/MasanaGelsinDataService";
import MasanaGelsinReducer from "../services/MasanaGelsinReducer";

const useCookies = (key, defaultValue) => {
  const [cookie, setCookie] = useState(
    localStorage.getItem(key) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, cookie);
  }, [cookie, key]);
  return [cookie, setCookie];
};

function Menu() {
  const [category, setCategory] = useState("Yiyecekler");
  const [searchProduct, setSearchProduct] = useCookies("searchProduct", "");
  const [products, dispatchProducts] = useReducer(MasanaGelsinReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const [quantities, setQuantities] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");

  const search = (event) => {
    setSearchProduct(event.target.value);
  };

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

  const handleQuantityChange = (id, increment) => {
    if ((quantities[id] || 0) + increment >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: (prevQuantities[id] || 0) + increment,
      }));
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const addToBasket = (item) => {
    if (quantities[item._id] > 0) {
      const existingItems =
        JSON.parse(localStorage.getItem("basketFoods")) || [];
      const itemIndex = existingItems.findIndex(
        (existingItem) => existingItem.name === item.name
      );

      if (itemIndex !== -1) {
        existingItems[itemIndex].quantity += quantities[item._id];
      } else {
        const newItem = {
          imageURL: item.imageURL,
          name: item.name,
          price: item.price,
          quantity: quantities[item._id],
        };
        existingItems.push(newItem);
      }

      localStorage.setItem("basketFoods", JSON.stringify(existingItems));
      setMessage("Ürün sepete eklendi!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const addToFavorites = (item) => {
    const existingItems =
      JSON.parse(localStorage.getItem("favoriteFoods")) || [];
    const itemIndex = existingItems.findIndex(
      (existingItem) => existingItem.name === item.name
    );

    if (itemIndex === -1) {
      const newItem = {
        imageURL: item.imageURL,
        name: item.name,
        price: item.price,
      };
      existingItems.push(newItem);
      localStorage.setItem("favoriteFoods", JSON.stringify(existingItems));
      setMessage("Ürün favorilere eklendi!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const filteredProducts = products.data.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div
      id="menu"
      className="py-8 sm:py-12 md:py-16 lg:py-20 mx-20"
      style={{ backgroundColor: "white" }}
    >
      <div className="max-w-xl mx-auto mb-4 flex p-2 shadow-md rounded-lg size">
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
        style={{
          marginBottom: "1cm",
          padding: "1rem 0 1rem 0.5rem",
          backgroundColor: "white",
        }}
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
      <div className="mx-auto">
        <div className="ml-auto flex items-center mb-4 justify-end">
          <input
            type="text"
            placeholder="Ara"
            className="px-3 py-2 text-sm font-semibold text-black bg-gray-300 rounded-full focus:outline-none"
            onChange={search}
            value={searchProduct}
            style={{ marginLeft: "auto", width: "20rem", height: "4rem" }}
          />
        </div>
        {message && <p className="message">{message}</p>}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1">
          {filteredProducts.map((item) => (
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
                <div className="border-t border-gray-200 flex py-4 justify-between space-x-20">
                  <div className="flex flex-1 items-center space-x-4">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-full text-black tracking-wider">{`${item.price} ₺`}</button>
                    <span className="mx-2">{quantities[item._id] || 0}</span>
                    <button
                      className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      -
                    </button>
                  </div>
                  <div className="flex flex-1 justify-end items-center space-x-4">
                    <button
                      className="px-2 py-1.5 border border-red-200 rounded-full text-white tracking-wider bg-red-600 transition hover:bg-gray-600"
                      onClick={() => addToFavorites(item)}
                    >
                      Favorilere ekle
                    </button>
                    <button
                      className="px-3 py-1.5 border border-gray-200 rounded-full text-white tracking-wider bg-gray-800 transition hover:bg-red-600"
                      onClick={() => addToBasket(item)}
                    >
                      Sepete ekle
                    </button>
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

export default Menu;

