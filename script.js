document.addEventListener('DOMContentLoaded', function() {
    // Menú Hamburguesa
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animar las líneas del hamburguesa
            const line1 = document.getElementById('line1');
            const line2 = document.getElementById('line2');
            const line3 = document.getElementById('line3');
            
            if (mobileMenu.classList.contains('hidden')) {
                line1.style.transform = 'rotate(0deg) translateY(0)';
                line2.style.opacity = '1';
                line3.style.transform = 'rotate(0deg) translateY(0)';
            } else {
                line1.style.transform = 'rotate(45deg) translateY(8px)';
                line2.style.opacity = '0';
                line3.style.transform = 'rotate(-45deg) translateY(-8px)';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const line1 = document.getElementById('line1');
                const line2 = document.getElementById('line2');
                const line3 = document.getElementById('line3');
                line1.style.transform = 'rotate(0deg) translateY(0)';
                line2.style.opacity = '1';
                line3.style.transform = 'rotate(0deg) translateY(0)';
            });
        });
    }
    
    // Formulario de contacto (solo si existe en la página)
    const form = document.getElementById('contact-form');
    if (form) {
        const messageElement = document.getElementById('form-message');

        // Función para manejar el envío del formulario
        form.addEventListener('submit', function(event) {
            // Validar campos antes de enviar
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre === '' || email === '' || servicio === '' || mensaje === '') {
                event.preventDefault();
                messageElement.className = 'text-center font-semibold text-red-600 py-3 px-4 bg-red-100 rounded-lg';
                messageElement.textContent = '⚠️ Por favor, completa todos los campos requeridos.';
                messageElement.style.display = 'block';
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                event.preventDefault();
                messageElement.className = 'text-center font-semibold text-red-600 py-3 px-4 bg-red-100 rounded-lg';
                messageElement.textContent = '⚠️ Por favor, ingresa un email válido.';
                messageElement.style.display = 'block';
                return;
            }

            // Si pasa validaciones, Getform lo maneja automáticamente
            messageElement.className = 'text-center font-semibold text-blue-600 py-3 px-4 bg-blue-100 rounded-lg';
            messageElement.textContent = '⏳ Enviando solicitud...';
            messageElement.style.display = 'block';
        });

        // Escuchar respuesta después de envío
        form.addEventListener('submit', function() {
            setTimeout(() => {
                const messageElement = document.getElementById('form-message');
                messageElement.className = 'text-center font-semibold text-green-700 py-3 px-4 bg-green-100 rounded-lg';
                messageElement.textContent = '✅ ¡Tu solicitud ha sido enviada con éxito! Te contactaremos en 24 horas.';
                messageElement.style.display = 'block';
                
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Funciones de Chat
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.classList.toggle('hidden');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input || !messagesContainer || input.value.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.className = 'bg-green-100 p-2 rounded-lg text-sm text-right ml-auto';
    userMessage.textContent = input.value;
    messagesContainer.appendChild(userMessage);

    // Respuestas automáticas (simuladas)
    const responses = [
        'Gracias por tu mensaje. Nuestro equipo te responderá en breve.',
        '¿Necesitas información sobre algún servicio específico?',
        'Puedes ver nuestros precios en la página de Precios.',
        '¿Te interesa agendar una consulta gratuita?'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bg-blue-100 p-2 rounded-lg text-sm';
        botMessage.textContent = randomResponse;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}