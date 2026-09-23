/**
 * Assim Assado - Lanchonete, Padaria & Café Universitário (Trindade - UFSC)
 * Script de Interações: Navegação, Filtro do Cardápio, Simulador de Combo e WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMenuTabs();
  initComboBuilder();
});

// -----------------------------------------------------------------------------
// 1. Menu Mobile
// -----------------------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// -----------------------------------------------------------------------------
// 2. Filtro de Abas do Cardápio
// -----------------------------------------------------------------------------
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  if (!tabBtns.length || !menuItems.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');

        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          item.style.display = 'none';
        }
      });
    });
  });
}

// -----------------------------------------------------------------------------
// 3. Monte o seu Combo Universitário (Simulador de Lanche)
// -----------------------------------------------------------------------------
const comboState = {
  salgadoName: 'Hambúrguer de Forno Artesanal',
  salgadoPrice: 12.00,
  bebidaName: 'Café com Leite (Pingado)',
  bebidaPrice: 6.00,
  doceName: 'Sem Acompanhamento',
  docePrice: 0.00
};

function initComboBuilder() {
  const salgadoOpts = document.querySelectorAll('#step-salgados .combo-opt');
  const bebidaOpts = document.querySelectorAll('#step-bebidas .combo-opt');
  const doceOpts = document.querySelectorAll('#step-doces .combo-opt');

  const ticketSalgado = document.getElementById('ticket-salgado-name');
  const ticketSalgadoPreco = document.getElementById('ticket-salgado-price');
  const ticketBebida = document.getElementById('ticket-bebida-name');
  const ticketBebidaPreco = document.getElementById('ticket-bebida-price');
  const ticketDoce = document.getElementById('ticket-doce-name');
  const ticketDocePreco = document.getElementById('ticket-doce-price');
  const ticketTotal = document.getElementById('ticket-total');
  const btnOrderWpp = document.getElementById('btn-order-combo');

  function updateTicket() {
    if (ticketSalgado) ticketSalgado.textContent = comboState.salgadoName;
    if (ticketSalgadoPreco) ticketSalgadoPreco.textContent = `R$ ${comboState.salgadoPrice.toFixed(2).replace('.', ',')}`;

    if (ticketBebida) ticketBebida.textContent = comboState.bebidaName;
    if (ticketBebidaPreco) ticketBebidaPreco.textContent = `R$ ${comboState.bebidaPrice.toFixed(2).replace('.', ',')}`;

    if (ticketDoce) ticketDoce.textContent = comboState.doceName;
    if (ticketDocePreco) ticketDocePreco.textContent = comboState.docePrice > 0
      ? `R$ ${comboState.docePrice.toFixed(2).replace('.', ',')}`
      : 'R$ 0,00';

    const total = comboState.salgadoPrice + comboState.bebidaPrice + comboState.docePrice;
    if (ticketTotal) ticketTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Montar link WhatsApp
    if (btnOrderWpp) {
      let text = `Olá! Montei meu Combo na Assim Assado:\n`;
      text += `• Salgado: ${comboState.salgadoName} (R$ ${comboState.salgadoPrice.toFixed(2)})\n`;
      text += `• Bebida: ${comboState.bebidaName} (R$ ${comboState.bebidaPrice.toFixed(2)})\n`;
      if (comboState.docePrice > 0) {
        text += `• Acompanhamento: ${comboState.doceName} (R$ ${comboState.docePrice.toFixed(2)})\n`;
      }
      text += `Total: R$ ${total.toFixed(2).replace('.', ',')}\n\nGostaria de saber se já posso retirar no balcão!`;

      // Como o Google Maps não lista número comercial oficial direto, usamos uma rota amigável para contato ou balcão
      btnOrderWpp.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    }
  }

  // Listener Salgados
  salgadoOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      salgadoOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      comboState.salgadoName = btn.getAttribute('data-name');
      comboState.salgadoPrice = parseFloat(btn.getAttribute('data-price') || '0');
      updateTicket();
    });
  });

  // Listener Bebidas
  bebidaOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      bebidaOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      comboState.bebidaName = btn.getAttribute('data-name');
      comboState.bebidaPrice = parseFloat(btn.getAttribute('data-price') || '0');
      updateTicket();
    });
  });

  // Listener Doces / Acompanhamentos
  doceOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      doceOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      comboState.doceName = btn.getAttribute('data-name');
      comboState.docePrice = parseFloat(btn.getAttribute('data-price') || '0');
      updateTicket();
    });
  });

  // Inicializa
  updateTicket();
}
