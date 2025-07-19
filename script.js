document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para mostrar/ocultar senha
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('senha');
    
    togglePassword.addEventListener('click', function() {
        // Alterna o tipo do input entre 'password' e 'text'
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alterna o ícone entre 'eye' e 'eye-slash'
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Validação do formulário
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validação simples de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }
        
        // Validação simples de senha (mínimo 6 caracteres)
        if (passwordInput.value.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        // Obter os dados do formulário
        const email = emailInput.value;
        const password = passwordInput.value;
        const rememberMe = document.getElementById('lembrar').checked;
        
        // Mostrar indicador de carregamento
        const loginButton = document.querySelector('.login-button');
        const originalText = loginButton.textContent;
        loginButton.textContent = 'Processando...';
        loginButton.disabled = true;
        
        // Enviar dados para o servidor
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Redirecionamento imediato para o site beefund.exchange sem exibir alerta
            window.location.href = 'https://www.beefund.exchange/';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao processar o login. Tente novamente.');
        })
        .finally(() => {
            // Restaurar o botão
            loginButton.textContent = originalText;
            loginButton.disabled = false;
        });
    });
});