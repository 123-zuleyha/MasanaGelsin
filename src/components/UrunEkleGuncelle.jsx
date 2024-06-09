import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MasanaGelsinDataService from "../services/MasanaGelsinDataService";
import MasanaGelsinReducer from "../services/MasanaGelsinReducer";
import "../css/UrunEkleGuncelle.css";

function UrunEkleGuncelle() {
  const location = useLocation();
  const navigate = useNavigate();
  const updatedProduct = location.state?.updatedProduct;

  const id = location.state?.updatedProduct._id;

  const [formData, setFormData] = useState({
    productID: updatedProduct?._id || "",
    productName: updatedProduct?.name || "",
    productDescription: updatedProduct?.description || "",
    productPrice: updatedProduct?.price || "",
    productType: updatedProduct?.type || "",
    productCategory: updatedProduct?.category || "",
    productimageURL: updatedProduct?.imageURL || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const performClick = async (evt) => {
    evt.preventDefault();

    let PostData = {
      _id: id !== undefined ? id : null,
      name: evt.target[0].value,
      description: evt.target[1].value,
      imageURL: "", // Initialize imageURL here
      category: evt.target[3].value,
      type: evt.target[4].value,
      price: evt.target[5].value.split(",")[0],
    };

    const formData = new FormData();
    formData.append("image", evt.target[2].files[0]);
    formData.append("key", "c1b91e95cdd2e3a50d1f7ed90e705433");

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const imageURL = result.data.url;
      PostData.imageURL = imageURL;
      try {
        if (id !== undefined)
          await MasanaGelsinDataService.updateProduct(id, PostData);
        else await MasanaGelsinDataService.addProduct(PostData);

        navigate("/adminListele");
      } catch (error) {
        console.error("Product update/add failed:", error);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <>
      {updatedProduct ? (
        <div className="my-form-container">
          <h2 className="my-form-title">Ürün Güncelle</h2>
          <form id="productForm" method="post" onSubmit={performClick}>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productName">
                Ürün Adı:
              </label>
              <input
                className="my-form-input"
                type="text"
                id="productName"
                name="productName"
                required
                value={formData.productName}
                onChange={handleChange}
              />
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productDescription">
                Ürün İçeriği:
              </label>
              <textarea
                className="my-form-textarea"
                id="productDescription"
                name="productDescription"
                required
                value={formData.productDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productImage">
                Ürün Fotoğrafı:
              </label>
              <input
                className="my-form-input"
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                required
                onChange={handleChange}
              />
            </div>
            <div class="my-form-group">
              <label for="productCategory">Yemek Kategorisi:</label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
              >
                <option value="Yiyecekler">Yiyecekler</option>
                <option value="İçecekler">İçecekler</option>
                <option value="Aperatifler">Aperatifler</option>
                <option value="Tatlılar">Tatlılar</option>
              </select>
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productType">
                Ürün Tipi:
              </label>
              <input
                className="my-form-input"
                type="text"
                id="productType"
                name="productType"
                required
                value={formData.productType}
                onChange={handleChange}
              />
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productPrice">
                Ürün Fiyatı:
              </label>
              <input
                className="my-form-input"
                type="number"
                id="productPrice"
                name="productPrice"
                step="1"
                min="0"
                required
                value={formData.productPrice}
                onChange={handleChange}
              />
            </div>
            <button className="my-form-button" type="submit">
              Ürünü Güncelle
            </button>
          </form>
          <div id="message"></div>
        </div>
      ) : (
        <div className="my-form-container">
          <h2 className="my-form-title">Ürün Ekle</h2>
          <form id="productForm" method="post" onSubmit={performClick}>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productName">
                Ürün Adı:
              </label>
              <input
                className="my-form-input"
                type="text"
                id="productName"
                name="productName"
                required
              />
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productDescription">
                Ürün İçeriği:
              </label>
              <textarea
                className="my-form-textarea"
                id="productDescription"
                name="productDescription"
                required
              ></textarea>
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productImage">
                Ürün Fotoğrafı:
              </label>
              <input
                className="my-form-input"
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                required
              />
            </div>
            <div class="my-form-group">
              <label for="productCategory">Yemek Kategorisi:</label>
              <select id="productCategory" name="productCategory">
                <option value="Yiyecekler">Yiyecekler</option>
                <option value="İçecekler">İçecekler</option>
                <option value="Aperatifler">Aperatifler</option>
                <option value="Tatlılar">Tatlılar</option>
              </select>
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productType">
                Ürün Tipi:
              </label>
              <input
                className="my-form-input"
                type="text"
                id="productType"
                name="productType"
                required
              />
            </div>
            <div className="my-form-group">
              <label className="my-form-label" htmlFor="productPrice">
                Ürün Fiyatı:
              </label>
              <input
                className="my-form-input"
                type="number"
                id="productPrice"
                name="productPrice"
                step="1"
                min="0"
                required
              />
            </div>
            <button className="my-form-button" type="submit">
              Ürünü Ekle
            </button>
          </form>
          <div id="message"></div>
        </div>
      )}
    </>
  );
}

export default UrunEkleGuncelle;
