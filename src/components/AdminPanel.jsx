import React from "react";
import "../css/AdminPanel.css";

function Admin() {
    return (
        <div className="admin-panel-container">
            <h2>Hoş Geldiniz, Admin!</h2>
            <p>Burada yapmak istediğiniz işlemleri gerçekleştirebilirsiniz.</p>
            <div className="button-container">
                <a id="urun_ekle_button" className="action-button" href="adminEkleGuncelle">Ürün Ekleme</a>
                <a id="urun_sil_button" className="action-button" href="adminSilme">Ürün Silme</a>
                <a id="urun_guncelle_button" className="action-button" href="adminGuncelle">Ürün Güncelleme</a>
                <a id="urun_listeleme_button" className="action-button" href="adminListele">Ürünleri Listeleme</a>
            </div>
        </div>
    );
}

export default Admin;
