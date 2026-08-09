/* ==========================================================================
   EVENTNIGHT GMBH - INTERACTIVE CATALOG & WARENKORB SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // State
  let cart = [];

  // DOM Elements
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawerClose = document.getElementById('cartDrawerClose');
  const cartHeaderBtn = document.getElementById('cartHeaderBtn');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartItemsBody = document.getElementById('cartItemsBody');
  const cartForm = document.getElementById('cartForm');
  const cartSuccessAlert = document.getElementById('cartSuccessAlert');

  /* ------------------------------------------------------------------------
     1. CART DRAWER OPEN / CLOSE
     ------------------------------------------------------------------------ */
  function openCart() {
    cartDrawerOverlay.classList.add('active');
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove('active');
  }

  if (cartHeaderBtn) cartHeaderBtn.addEventListener('click', openCart);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeCart);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCart();
    });
  }

  /* ------------------------------------------------------------------------
     2. QUANTITY PICKER IN CATALOG CARDS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.qty-picker').forEach(picker => {
    const minusBtn = picker.querySelector('.qty-minus');
    const plusBtn = picker.querySelector('.qty-plus');
    const input = picker.querySelector('.qty-input');

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
      });

      plusBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    }
  });

  /* ------------------------------------------------------------------------
     3. ADD TO CART HANDLER
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.getAttribute('data-id');
      const title = card.getAttribute('data-title');
      const qtyInput = card.querySelector('.qty-input');
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

      // Add or update cart item
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id, title, qty });
      }

      updateCartUI();
      openCart();

      // Reset card input
      if (qtyInput) qtyInput.value = 1;
    });
  });

  /* ------------------------------------------------------------------------
     4. UPDATE CART UI
     ------------------------------------------------------------------------ */
  function updateCartUI() {
    // Total count badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalItems;

    // Cart items list render
    if (cart.length === 0) {
      cartItemsBody.innerHTML = `
        <div class="cart-empty-msg">
          <i class="fas fa-shopping-basket"></i>
          <p>Ihr Anfragekorb ist noch leer.</p>
          <small>Wählen Sie oben Produkte aus, um ein Angebot anzufordern.</small>
        </div>
      `;
      if (cartForm) cartForm.style.display = 'none';
    } else {
      if (cartForm) cartForm.style.display = 'block';
      let html = '';

      cart.forEach((item, index) => {
        html += `
          <div class="cart-item">
            <div>
              <div class="cart-item-title">${item.title}</div>
              <div class="qty-picker" style="margin-top: 0.4rem;">
                <button class="qty-btn cart-qty-minus" data-index="${index}">-</button>
                <input type="text" class="qty-input" value="${item.qty}" readonly>
                <button class="qty-btn cart-qty-plus" data-index="${index}">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-index="${index}" title="Entfernen">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        `;
      });

      cartItemsBody.innerHTML = html;

      // Attach cart item quantity & remove listeners
      cartItemsBody.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          updateCartUI();
        });
      });

      cartItemsBody.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          cart[idx].qty += 1;
          updateCartUI();
        });
      });

      cartItemsBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          updateCartUI();
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. CART INQUIRY FORM SUBMIT
     ------------------------------------------------------------------------ */
  if (cartForm) {
    cartForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (cart.length === 0) return;

      const submitBtn = cartForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;

        // Reset cart
        cart = [];
        updateCartUI();

        // Show success alert
        cartSuccessAlert.style.display = 'block';
        cartForm.reset();

        setTimeout(() => {
          cartSuccessAlert.style.display = 'none';
          closeCart();
        }, 4000);

      }, 1000);
    });
  }

  /* ------------------------------------------------------------------------
     6. CATEGORY FILTER TABS
     ------------------------------------------------------------------------ */
  const catTabs = document.querySelectorAll('.cat-tab');
  const productCards = document.querySelectorAll('.product-card');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-category');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});
