// ========================================
// MENU MOBILE TOGGLE
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do ícone do menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTADOR ANIMADO (ESTATÍSTICAS)
// ========================================

const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function checkStatVisibility() {
    if (animated) return;
    
    const sobreSection = document.querySelector('.sobre');
    if (!sobreSection) return;
    
    const sectionTop = sobreSection.offsetTop;
    const sectionHeight = sobreSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    
    if (scrollPosition > sectionTop + sectionHeight / 2) {
        statNumbers.forEach(stat => animateCounter(stat));
        animated = true;
    }
}

window.addEventListener('scroll', checkStatVisibility);
window.addEventListener('load', checkStatVisibility);

// ========================================
// ANIMAÇÃO DE SCROLL REVEAL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll(`
    .problema-card,
    .solucao-card,
    .diferencial-item,
    .plano-card,
    .stat-card
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// BACK TO TOP BUTTON
// ========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validação básica
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simular envio (em produção, você conectaria a um backend)
    const formData = {
        nome,
        email,
        telefone,
        mensagem,
        data: new Date().toLocaleString('pt-BR')
    };
    
    console.log('Dados do formulário:', formData);
    
    // Feedback visual
    const submitButton = contatoForm.querySelector('.btn-form');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        submitButton.textContent = '✓ Enviado com Sucesso!';
        submitButton.style.backgroundColor = '#4CAF50';
        
        // Resetar formulário
        contatoForm.reset();
        
        // Restaurar botão após 3 segundos
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 3000);
        
        // Mostrar mensagem de sucesso
        alert('Obrigado por entrar em contato! Responderemos em breve.');
    }, 1500);
});

// ========================================
// VALIDAÇÃO EM TEMPO REAL DOS CAMPOS
// ========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#f44336';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#FF9800';
    });
});

// ========================================
// ANIMAÇÃO DE HOVER NOS CARDS DE PLANOS
// ========================================

const planoCards = document.querySelectorAll('.plano-card');

planoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================================
// EFEITO PARALLAX NO HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// CLICK NOS BOTÕES DOS PLANOS
// ========================================

const planButtons = document.querySelectorAll('.btn-plano');

planButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const planoNomes = ['Básico', 'Premium', 'Empresarial'];
        const planoNome = planoNomes[index] || 'Plano';
        
        if (planoNome === 'Empresarial') {
            // Rolar para seção de contato
            const contatoSection = document.getElementById('contato');
            if (contatoSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contatoSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Simular ação de assinatura
            alert(`Você selecionou o plano ${planoNome}! Em breve você será redirecionado para a página de pagamento.`);
        }
    });
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// EASTER EGG - CLICK NO LOGO
// ========================================

const logo = document.querySelector('.logo h1');
let clickCount = 0;

logo.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
        logo.style.animation = 'spin 1s ease';
        setTimeout(() => {
            logo.style.animation = '';
            clickCount = 0;
        }, 1000);
    }
});

// Adicionar animação de spin
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🛠️ Tool Express', 'font-size: 24px; font-weight: bold; color: #FFC107;');
console.log('%cSem compra, sem dor de cabeça!', 'font-size: 14px; color: #FF9800;');
console.log('%cDesenvolvido com ❤️ para revolucionar o acesso a ferramentas', 'font-size: 12px; color: #666;');