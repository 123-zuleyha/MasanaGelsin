function redirectToSepet() {
    window.location.href = "sepet.html";
}

// Butonu seçiyoruz
var button = document.getElementById("sepet");

// Butona tıklanma olayı ekliyoruz
button.addEventListener("click", function() {
    // Yönlendirme işlevini çağırıyoruz
    redirectToSepet();
});