import React, { useState } from 'react';
import MasanaGelsinDataService from '../services/MasanaGelsinDataService';
import '../css/Odeme.css';

function OdemeForm() {
    const [formData, setFormData] = useState({
        cardType: 'bankaKarti',
        nameSurname: '',
        cardNumber: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { nameSurname, cardNumber } = formData;

        if (!nameSurname || !cardNumber) {
            showMessage('Lütfen tüm alanları doldurun.', 'error');
            return;
        }

        await MasanaGelsinDataService.addPayment(formData);

        showMessage('Ödeme başarıyla tamamlandı.', 'success');
        setFormData({
            cardType: 'bankaKarti',
            nameSurname: '',
            cardNumber: ''
        });

        localStorage.removeItem("basketFoods");
        window.location.href="/index";
    };

    const showMessage = (msg, className) => {
        setMessage({ text: msg, className });
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div className="p-20 m-20 border border-gray-300 rounded-xl bg-gray-100">
            <h2>Ödeme Sayfası</h2>
            <form id="paymentForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cardType" className="label">Kart Türü:</label>
                    <select id="cardType" name="cardType" value={formData.cardType} onChange={handleChange} className="select">
                        <option value="bankaKarti">Banka Kartı</option>
                        <option value="krediKarti">Kredi Kartı</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="nameSurname" className="label">Ad Soyad:</label>
                    <input type="text" id="nameSurname" name="nameSurname" value={formData.nameSurname} onChange={handleChange} required className="input" />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber" className="label">Kart Numarası:</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required className="input" />
                </div>
                <button type="submit" className="button odeme-button">Ödemeyi Tamamla</button>
            </form>
            <div id="message">
                {message && <div className={message.className}>{message.text}</div>}
            </div>
        </div>
    );
    
}

export default OdemeForm;
