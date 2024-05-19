document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    if (username === 'sena' && password === '123') {
        // Başarılı giriş
        window.location.href = 'admin_panel.html'; 
    } else {
        alert('Hatalı kullanıcı adı veya şifre.');
    }
});


