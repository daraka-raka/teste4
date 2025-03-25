// Função para inicializar todos os scripts quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o contador regressivo
    initCountdown();
    
    // Inicializa o contador de vagas restantes
    initRemainingSpots();
    
    // Inicializa efeitos de animação
    initAnimations();
    
    // Inicializa os efeitos de hover
    initHoverEffects();
    
    // Adiciona eventos aos botões
    initButtonEvents();
});

// Função para inicializar o contador regressivo
function initCountdown() {
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('timer').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Atualiza o contador a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Função para inicializar contador de vagas restantes
function initRemainingSpots() {
    let remainingSpots = 20;
    const vagasElements = document.querySelectorAll('#vagas-restantes, #vagas-contador');
    
    function updateRemainingSpots() {
        if (remainingSpots <= 3) {
            vagasElements.forEach(elem => {
                elem.style.color = '#ff0000';
                elem.style.fontWeight = 'bold';
            });
        }
        
        vagasElements.forEach(elem => {
            elem.textContent = remainingSpots;
        });
        
        // Diminui aleatoriamente entre 0 e 1 vagas a cada chamada
        if (remainingSpots > 1) {
            remainingSpots -= Math.floor(Math.random() * 2);
        }
    }
    
    // Atualiza as vagas a cada 30 segundos
    updateRemainingSpots();
    setInterval(updateRemainingSpots, 30000);
    
    // Às vezes diminui as vagas quando o usuário rola a página
    window.addEventListener('scroll', function() {
        if (Math.random() > 0.9 && remainingSpots > 1) {
            remainingSpots--;
            updateRemainingSpots();
        }
    });
}

// Função para inicializar animações
function initAnimations() {
    // Efeito de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Adiciona efeito de fade-in aos elementos quando scrollar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
        
        // Adiciona classe visible quando entrar na viewport
        section.addEventListener('transitionrun', function() {
            this.classList.add('visible');
        }, { once: true });
    });
}

// Função para inicializar efeitos de hover
function initHoverEffects() {
    // Efeito de hover nas cards
    const cards = document.querySelectorAll('.benefit-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Função para inicializar eventos de botões
function initButtonEvents() {
    // Botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-final');
    
    ctaButtons.forEach(button => {
        // Efeito de hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Efeito de clique
        button.addEventListener('click', function() {
            alert('🔥 PARABÉNS! 🔥\n\nVocê garantiu sua vaga no Curso Milionário Online!\n\nEm uma situação real, você seria redirecionado para a página de pagamento.');
        });
    });
    
    // Adiciona efeito ao vídeo
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('click', function() {
            alert('Em uma página real, o vídeo seria reproduzido aqui. Imagine um vídeo motivacional com depoimentos impressionantes!');
        });
    }
}

// Adiciona efeito de urgência quando o usuário tentar sair da página
window.addEventListener('beforeunload', function (e) {
    // Cancelado para não incomodar o usuário, mas em uma página real de vendas
    // isso poderia ser usado para exibir uma mensagem como "Espere! Não perca esta oferta!"
    // e = e || window.event;
    // e.preventDefault();
    // e.returnValue = '';
}); 