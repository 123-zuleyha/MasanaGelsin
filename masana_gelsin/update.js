

document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const message = document.getElementById('message');
  
    productForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const productName = document.getElementById('productName').value;
      const productPrice = parseFloat(document.getElementById('productPrice').value);
      const productDescription = document.getElementById('productDescription').value;
  
      if (!productName || !productPrice || !productDescription) {
        showMessage('Lütfen tüm alanları doldurun.', 'error');
        return;
      }
  
      
  
      showMessage('Ürün başarıyla güncellendi.', 'success');
      productForm.reset();
    });
  
    function showMessage(msg, className) {
      const div = document.createElement('div');
      div.className = className;
      div.appendChild(document.createTextNode(msg));
      message.appendChild(div);
  
      setTimeout(function() {
        div.remove();
      }, 4000);
    }
  });
  document.getElementById('urun_guncelle_button').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Ürünleri gösteren sayfaya yönlendir
    window.location.href = 'update.html';
});
  