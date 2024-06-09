import React, { useState, useEffect } from 'react';
import MasanaGelsinDataService from '../services/MasanaGelsinDataService';
import '../css/Sepet.css';

function Sepet() {
    const [basketItems, setBasketItems] = useState([]);
    const [orderNote, setOrderNote] = useState('');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('basketFoods')) || [];
        setBasketItems(items);
    }, []);

    const anaSayfayaYonlendir = () => {
        window.location.href = "/index";
    };

    const sepetiBosalt = () => {
        if (window.confirm("Sepeti boşaltmak istediğinize emin misiniz?")) {
            localStorage.removeItem("basketFoods");
            window.location.href = "/sepet";
        }
    };

    const urunuSepettenSil = (index) => {
        if (window.confirm("Bu ürünü sepetten silmek istediğinize emin misiniz?")) {
            const newBasketItems = basketItems.filter((_, i) => i !== index);
            setBasketItems(newBasketItems);
            localStorage.setItem('basketFoods', JSON.stringify(newBasketItems));
        }
    };

    const odemeSayfasinaYonlendir = async () => {
        const username = localStorage.getItem('username');
        const deskNumber = localStorage.getItem('deskNumber');

        if (!username || !deskNumber) {
            alert("Kullanıcı adı veya masa numarası doğru girilmedi");
            return;
        }

        if (basketItems.length === 0) {
            alert("Sepet Boş");
            return;
        }

        try {
            const orderData = {
                username,
                deskNumber,
                foods: basketItems,
                note: orderNote
            };

            await MasanaGelsinDataService.createOrder(orderData);
            window.location.href = "/odeme";

        } catch (error) {
            console.error('Failed to submit order:', error);
        }
    };

    const toplamTutar = basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="sepet-container">
            <img src="https://i.ibb.co/hVMPstk/logo-ilk.png" alt="logo" width="300" height="200" />
            <div className="sepet-content">
                <div className="basket-items">
                    {basketItems.length > 0 ? (
                        basketItems.map((item, index) => (
                            <div key={index} className="basket-item">
                                <div className="basket-item-details mt-8 justify-between">
                                    <img src={item.imageURL} alt={item.name} className="basket-item-image" style={{ maxWidth: '20rem', maxHeight: '8rem' }} />
                                    <h2 className="text-lg font-medium">{item.name}</h2>
                                    <div className="item-price-quantity flex justify-between items-center">
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="px-3 py-1.5 border border-gray-200 text-black">{`${item.price} ₺`}</button>
                                        <button className="text-red-500 ml-4" onClick={() => urunuSepettenSil(index)}>
                                            &#10005;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Sepetiniz şu anda boş</p>
                    )}
                </div>

                <div className="sepet-controls">
                    <button className="eda" onClick={anaSayfayaYonlendir}>
                        Menüye dönmek için tıklayınız
                    </button>
                    <div className="">
                        TUTAR = {toplamTutar} TL
                    </div>
                    <div className="container mx-auto px-4">
                        <div className="md:flex items-start gap-10">
                            <div className="mt-3 flex flex-col justify-start">
                                <label htmlFor="message" className="mb-3 block text-base font-medium">
                                    Sipariş Notunuz
                                </label>
                                <div className="flex items-start">
                                    <textarea
                                        rows="4"
                                        name="message"
                                        id="message"
                                        className="order-note-textarea"
                                        onChange={(e) => setOrderNote(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-3 flex space-x-20">
                        <button className="onay" onClick={odemeSayfasinaYonlendir}>
                            Siparişi Onayla
                        </button>
                        <button className="onay" onClick={sepetiBosalt}>
                            Sepeti Boşalt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sepet;
