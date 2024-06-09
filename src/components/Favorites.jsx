import React, { useState, useEffect } from 'react';
import '../css/Favorites.css';

function Favorites() {
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('favoriteFoods')) || [];
        setFavoriteItems(items);
    }, []);

    const anaSayfayaYonlendir = () => {
        window.location.href = "/index";
    };

    const favorileriBosalt = () => {
        if (window.confirm("Favorileri boşaltmak istediğinize emin misiniz?")) {
            localStorage.removeItem("favoriteFoods");
            setFavoriteItems([]);
        }
    };

    const urunuFavorilerdenSil = (index) => {
        if (window.confirm("Bu ürünü favorilerden silmek istediğinize emin misiniz?")) {
            const newFavoriteItems = favoriteItems.filter((_, i) => i !== index);
            setFavoriteItems(newFavoriteItems);
            localStorage.setItem('favoriteFoods', JSON.stringify(newFavoriteItems));
        }
    };

    return (
        <div className="favorites-container">
            <div className="header">
                <img src="https://i.ibb.co/hVMPstk/logo-ilk.png" alt="logo" className="logo" />
                <button className="back-to-menu" onClick={anaSayfayaYonlendir}>
                    Menüye dön
                </button>
            </div>
            <div className="favorites-content">
                <h1 className="title">Favorilerim</h1>
                <div className="favorite-items">
                    {favoriteItems.length > 0 ? (
                        favoriteItems.map((item, index) => (
                            <div key={index} className="favorite-item">
                                <img src={item.imageURL} alt={item.name} className="favorite-item-image" />
                                <div className="favorite-item-details">
                                    <h2 className="item-name">{item.name}</h2>
                                    <span className="item-price">{item.price} ₺</span>
                                    <button className="remove-button" onClick={() => urunuFavorilerdenSil(index)}>
                                        &#10005;
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">Favorileriniz şu anda boş</p>
                    )}
                </div>
                <div className="favorites-controls">
                    <button className="clear-favorites" onClick={favorileriBosalt}>
                        Favorileri Boşalt
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
