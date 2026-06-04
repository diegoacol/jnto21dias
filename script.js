/**
 * MÉTODO 21 DIAS NO TOPO - Script de Interações e Configurações
 */

// =========================================================================
// CONFIGURAÇÃO DO CHECKOUT
// SUBSTITUA O LINK ABAIXO PELO SEU LINK DE AFILIADO OU PRODUTOR (HOTMART, KIWIFY, ETC.)
// =========================================================================
const CHECKOUT_LINK = "https://pay.cakto.com.br/3ds396o_914078";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os links de checkout nos botões
  initCheckoutLinks();

  // Header Scroll Effect
  initHeaderScroll();

  // Mobile Menu Navigation
  initMobileMenu();

  // Accordion FAQ
  initFAQ();

  // Barra Fixa Mobile Scroll Reveal
  initMobileStickyBar();
  
  // Active Navigation link highlighting on scroll
  initScrollSpy();
});

/**
 * Vincula o link de checkout configurado a todos os botões CTA da página
 */
function initCheckoutLinks() {
  const checkoutButtons = document.querySelectorAll(".checkout-btn");
  checkoutButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      // Se for um link <a>, atualiza o href
      if (button.tagName.toLowerCase() === "a") {
        button.setAttribute("href", CHECKOUT_LINK);
      } else {
        // Se for um botão genérico, redireciona via window.location
        e.preventDefault();
        window.location.href = CHECKOUT_LINK;
      }
    });
  });
}

/**
 * Adiciona classe ao header quando a página é rolada
 */
function initHeaderScroll() {
  const header = document.getElementById("header");
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Executa uma vez no carregamento para caso comece scrollado
  handleScroll();
}

/**
 * Menu mobile (Abrir / Fechar) e links âncora fecham o menu ao clicar
 */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const anchorLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  };

  menuToggle.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em qualquer link âncora
  anchorLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

/**
 * Accordion interativo do FAQ com transição de altura dinâmica
 */
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha todos os outros itens ativos para ficar limpo (estilo acordeão)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      // Alterna o estado do item clicado
      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        // Define o maxHeight para a altura real do conteúdo interno
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/**
 * Exibe a barra fixa mobile somente após sair da Hero Section e esconde na seção da oferta para evitar duplicidade
 */
function initMobileStickyBar() {
  const stickyBar = document.getElementById("mobileStickyBar");
  const heroSection = document.getElementById("hero");
  const offerSection = document.getElementById("oferta");
  
  if (!stickyBar) return;

  const handleStickyBarScroll = () => {
    // Só funciona em dispositivos menores que 768px
    if (window.innerWidth > 768) {
      stickyBar.classList.remove("visible");
      return;
    }

    const scrollPos = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;
    
    // Posição de início da oferta para ocultar a barra fixa ali
    let offerTop = Infinity;
    if (offerSection) {
      const rect = offerSection.getBoundingClientRect();
      offerTop = rect.top + window.scrollY;
    }

    // Exibe depois da hero e oculta se estiver dentro/perto da oferta principal
    const isPastHero = scrollPos > (heroHeight - 100);
    const isBeforeOffer = scrollPos < (offerTop - window.innerHeight + 100);

    if (isPastHero && isBeforeOffer) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleStickyBarScroll);
  window.addEventListener("resize", handleStickyBarScroll);
}

/**
 * ScrollSpy: destaca os links do menu superior conforme a rolagem do usuário
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const handleScrollSpy = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset do header
      const sectionId = section.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleScrollSpy);
}
