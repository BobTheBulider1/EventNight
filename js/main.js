/* ==========================================================================
   EVENTNIGHT GMBH - CLEAN SECTION-BY-SECTION PRODUCT & SINGLE PRODUCT DETAIL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // State
  let cart = [];
  let navigationHistory = ['main'];

  // DOM Elements
  const mainView = document.getElementById('mainView');
  const categoryDetailView = document.getElementById('categoryDetailView');
  const productDetailView = document.getElementById('productDetailView');

  const detailTitle = document.getElementById('detailTitle');
  const detailSubtitle = document.getElementById('detailSubtitle');
  const detailBreadcrumb = document.getElementById('detailBreadcrumb');
  const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
  const detailCatalogGrid = document.getElementById('detailCatalogGrid');

  // Single Product DOM Elements
  const singleProductBreadcrumb = document.getElementById('singleProductBreadcrumb');
  const singleProductImg = document.getElementById('singleProductImg');
  const singleProductCategory = document.getElementById('singleProductCategory');
  const singleProductTitle = document.getElementById('singleProductTitle');
  const singleProductMetaCat = document.getElementById('singleProductMetaCat');
  const singleProductQtyInput = document.getElementById('singleProductQtyInput');
  const singleProductAnfragenBtn = document.getElementById('singleProductAnfragenBtn');
  const backFromSingleBtn = document.getElementById('backFromSingleBtn');

  // Logos for Homepage Navigation
  const siteLogos = document.querySelectorAll('.site-logo, .footer-logo');

  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawerClose = document.getElementById('cartDrawerClose');
  const cartHeaderBtn = document.getElementById('cartHeaderBtn');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartItemsBody = document.getElementById('cartItemsBody');
  const cartForm = document.getElementById('cartForm');
  const cartSuccessAlert = document.getElementById('cartSuccessAlert');

  // Current active product being viewed in detail
  let currentDetailProduct = null;

  // Exact Screenshot Sections Data for ABSPERRUNGEN (All clean ASCII user photos integrated)
  const absperrungenSections = [
    {
      title: 'ABSPERRGITTER',
      products: [
        {
          id: 'ab1',
          title: 'Mannesmanngitter / Absperrgitter',
          categoryName: 'Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/Mannesmanngitter  Absperrgitter.jpg',
          defaultQty: 10
        },
        {
          id: 'ab2',
          title: 'Polizeigitter klappbar',
          categoryName: 'Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/Polizeigitter klappbar.jpg',
          defaultQty: 5
        },
        {
          id: 'ab3',
          title: 'Erdnagel für Absperrband / Flatterband etc.',
          categoryName: 'Zubehör für Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/erdnagel-300x300.jpg',
          defaultQty: 20
        }
      ]
    },
    {
      title: 'BÜHNENGITTER',
      products: [
        {
          id: 'bg1',
          title: 'Bühnengitter / Crash Barrier (Alu)',
          categoryName: 'Bühnengitter',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Crash Barrier.jpg',
          defaultQty: 5
        },
        {
          id: 'bg2',
          title: 'Bühnengitter Eck-Element / Vario-Element',
          categoryName: 'Bühnengitter Zubehör',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Eck-Element  Vario-Element.jpg',
          defaultQty: 2
        },
        {
          id: 'bg3',
          title: 'Multicore Kabeldurchlass Element',
          categoryName: 'Bühnengitter Zubehör',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Multicore Kabeldurchlass.jpg',
          defaultQty: 2
        }
      ]
    },
    {
      title: 'EINLASSSCHLEUSEN',
      products: [
        {
          id: 'es1',
          title: 'Einlassschleuse',
          categoryName: 'Einlassschleusen',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Einlassschleuse.jpg',
          defaultQty: 2
        },
        {
          id: 'es2',
          title: 'Einlassschleuse mit Korb',
          categoryName: 'Einlassschleusen',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Einlassschleuse mit Korb.jpg',
          defaultQty: 2
        },
        {
          id: 'es3',
          title: 'Korb für Einlassschleuse',
          categoryName: 'Zubehör für Einlassschleuse',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Korb-fuer-Einlassschleuse.jpg',
          defaultQty: 1
        }
      ]
    }
  ];

  const bauzaunSections = [
    {
      title: 'BAUZAUN-ELEMENTE & ABSTÜTZUNG',
      products: [
        {
          id: 'bz1',
          title: 'Bauzaun-Element 3,50m x 2,00m (Mobilzaun)',
          categoryName: 'Bauzaun',
          img: 'images/Bauzaun/Bauzaun-Element.png',
          defaultQty: 10
        },
        {
          id: 'bz2',
          title: 'Bauzaun Abstützung / Stütze',
          categoryName: 'Bauzaun Zubehör',
          img: 'images/Bauzaun/Bauzaun-Abstutzung.jpg',
          defaultQty: 5
        },
        {
          id: 'bz3',
          title: 'Kreuzverbinder für Bauzaun',
          categoryName: 'Bauzaun Zubehör',
          img: 'images/Bauzaun/Kreuzverbinder-fur-Bauzaun.jpg',
          defaultQty: 10
        }
      ]
    },
    {
      title: 'TOR-SYSTEME & ROLLEN',
      products: [
        {
          id: 'bz4',
          title: 'Drehgelenk Halterung für Bauzauntür / Bauzauntor',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Drehgelenk-Halterung-fur-Bauzauntur-Bauzauntor.jpg',
          defaultQty: 2
        },
        {
          id: 'bz5',
          title: 'Einfache Tor Rolle für Bauzaun',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Einfache-Tor-Rolle.jpg',
          defaultQty: 2
        },
        {
          id: 'bz6',
          title: 'Tor Rolle mit Gestell für Bauzaun',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Tor-Rolle-mit-Gestell.jpg',
          defaultQty: 2
        }
      ]
    }
  ];

  // Helper map for all products
  const allProductsMap = {};
  [...absperrungenSections, ...bauzaunSections].forEach(sec => {
    sec.products.forEach(p => {
      allProductsMap[p.id] = p;
    });
  });

  /* ------------------------------------------------------------------------
     NAVBAR MODE SWITCHER (CLASSIC HOMEPAGE VS SUBPAGE/CART/CHECKOUT)
     ------------------------------------------------------------------------ */
  const mainNavLinks = document.getElementById('mainNavLinks');
  const eventbedarfNavDropdown = document.getElementById('eventbedarfNavDropdown');

  function updateNavbarMode(isSubpage) {
    if (isSubpage) {
      if (mainNavLinks) mainNavLinks.style.display = 'none';
      if (eventbedarfNavDropdown) eventbedarfNavDropdown.style.display = 'inline-block';
    } else {
      if (mainNavLinks) mainNavLinks.style.display = 'flex';
      if (eventbedarfNavDropdown) eventbedarfNavDropdown.style.display = 'none';
    }
  }

  /* ------------------------------------------------------------------------
     LOGO CLICK -> ALWAYS GO TO HOMEPAGE (MAIN VIEW)
     ------------------------------------------------------------------------ */
  siteLogos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      showMainView();
    });
  });

  /* ------------------------------------------------------------------------
     1. SUBPAGE CATEGORY NAVIGATION
     ------------------------------------------------------------------------ */
  function openCategorySubpage(catKey) {
    detailCatalogGrid.innerHTML = '';

    let activeSections = null;

    if (catKey === 'absperrgitter') {
      detailTitle.innerText = 'ABSPERRUNGEN';
      detailSubtitle.innerText = 'Absperrgitter, Bühnengitter & Einlassschleusen im Überblick';
      detailBreadcrumb.innerText = 'ABSPERRUNGEN';
      activeSections = absperrungenSections;
    } else if (catKey === 'bauzaun' || catKey === 'bauzaeune') {
      detailTitle.innerText = 'BAUZAUN';
      detailSubtitle.innerText = 'Bauzäune, Abstützungen, Verbinder & Tor-Rollen im Überblick';
      detailBreadcrumb.innerText = 'BAUZAUN';
      activeSections = bauzaunSections;
    }

    if (activeSections) {
      activeSections.forEach(sec => {
        const secBlock = document.createElement('div');
        secBlock.className = 'subpage-section-block';

        secBlock.innerHTML = `
          <div class="subpage-dark-bar">
            <h2>${sec.title}</h2>
          </div>
          <div class="subpage-products-grid">
            ${sec.products.map(item => `
              <div class="product-row-card product-card" data-id="${item.id}" data-title="${item.title}">
                <div class="product-row-img">
                  <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="product-row-title">${item.title}</div>
                <div class="product-row-action" onclick="event.stopPropagation()">
                  <div class="qty-picker">
                    <button class="qty-btn qty-minus">-</button>
                    <input type="text" class="qty-input" value="${item.defaultQty}" inputmode="numeric">
                    <button class="qty-btn qty-plus">+</button>
                  </div>
                  <button class="add-cart-btn" style="padding: 0.55rem 0.85rem;">
                    <i class="fas fa-plus"></i> Anfragen
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        detailCatalogGrid.appendChild(secBlock);
      });

      attachProductCardListeners(detailCatalogGrid);
      initImageZoomHandlers(detailCatalogGrid);

    } else {
      detailTitle.innerText = catKey.toUpperCase();
      detailSubtitle.innerText = `Mietartikel der Kategorie ${catKey.toUpperCase()}`;
      detailBreadcrumb.innerText = catKey.toUpperCase();

      const secBlock = document.createElement('div');
      secBlock.className = 'subpage-section-block';
      secBlock.innerHTML = `
        <div class="subpage-dark-bar">
          <h2>${catKey.toUpperCase()}</h2>
        </div>
        <div class="subpage-products-grid"></div>
      `;

      const productsGrid = secBlock.querySelector('.subpage-products-grid');
      const mainCatalogCards = document.querySelectorAll('#mainView .product-card');
      mainCatalogCards.forEach(card => {
        productsGrid.appendChild(card.cloneNode(true));
      });

      detailCatalogGrid.appendChild(secBlock);
      attachProductCardListeners(detailCatalogGrid);
      initImageZoomHandlers(detailCatalogGrid);
    }

    if (cartView) cartView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    productDetailView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'category', catKey: catKey }, '', '#kategorie-' + catKey);
    }
  }

  function showMainView(pushState = true) {
    if (cartView) cartView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    productDetailView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    mainView.style.display = 'block';
    updateNavbarMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'main' }, '', '#start');
    }
  }

  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  /* ------------------------------------------------------------------------
     2. SINGLE PRODUCT DETAIL VIEW
     ------------------------------------------------------------------------ */
  function openSingleProductView(productId, pushState = true) {
    const product = allProductsMap[productId] || {
      id: productId,
      title: 'Korb für Einlassschleuse',
      categoryName: 'Zubehör für Einlassschleuse',
      img: 'images/ABSPERRUNGEN/Einlassschleusen/Korb-fuer-Einlassschleuse.jpg',
      defaultQty: 1
    };

    currentDetailProduct = product;

    singleProductBreadcrumb.innerHTML = `<a href="#" class="breadcrumb-home-link">Start</a> / Einlassschleusen / <strong style="color:#111;">${product.title}</strong>`;
    singleProductImg.src = product.img;
    singleProductImg.alt = product.title;
    singleProductCategory.innerText = product.categoryName || 'Einlassschleusen';
    singleProductTitle.innerText = product.title;
    singleProductMetaCat.innerText = `Kategorie: Einlassschleusen`;
    if (singleProductQtyInput) singleProductQtyInput.value = product.defaultQty || 1;

    // Attach breadcrumb home link click
    const breadHome = singleProductBreadcrumb.querySelector('.breadcrumb-home-link');
    if (breadHome) {
      breadHome.onclick = (e) => {
        e.preventDefault();
        showMainView();
      };
    }

    if (checkoutView) checkoutView.style.display = 'none';
    if (cartView) cartView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'product', productId: productId }, '', '#produkt-' + productId);
    }
  }

  if (backFromSingleBtn) {
    backFromSingleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  if (singleProductAnfragenBtn) {
    singleProductAnfragenBtn.addEventListener('click', () => {
      if (!currentDetailProduct) return;
      const qty = parseInt(singleProductQtyInput ? singleProductQtyInput.value : 1) || 1;

      const existing = cart.find(item => item.id === currentDetailProduct.id);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id: currentDetailProduct.id, title: currentDetailProduct.title, qty });
      }

      updateCartUI();
      openCart();
    });
  }

  /* ------------------------------------------------------------------------
     3. 3D CARD TILT ANIMATION EFFECT & CLICK NAVIGATION
     ------------------------------------------------------------------------ */
  const cards3D = document.querySelectorAll('.category-3d-card');

  cards3D.forEach(card => {
    const inner = card.querySelector('.card-3d-inner');
    const glare = card.querySelector('.card-3d-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 16;
      const rotateY = ((x - centerX) / centerX) * 16;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4), transparent 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });

    card.addEventListener('click', () => {
      const catKey = card.getAttribute('data-cat');
      openCategorySubpage(catKey);
    });
  });

  /* ------------------------------------------------------------------------
     4. CART DRAWER OPEN / CLOSE
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
     5. PRODUCT CARD LISTENERS
     ------------------------------------------------------------------------ */
  function attachProductCardListeners(container) {
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        if (id) {
          openSingleProductView(id);
        }
      });
    });

    container.querySelectorAll('.qty-picker').forEach(picker => {
      const minusBtn = picker.querySelector('.qty-minus');
      const plusBtn = picker.querySelector('.qty-plus');
      const input = picker.querySelector('.qty-input');

      if (input) {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^0-9]/g, '');
        });

        input.addEventListener('blur', () => {
          if (!input.value || parseInt(input.value) < 1) {
            input.value = '1';
          }
        });
      }

      if (minusBtn && plusBtn && input) {
        minusBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.value) || 1;
          if (val > 1) input.value = val - 1;
        };

        plusBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.value) || 1;
          input.value = val + 1;
        };
      }
    });

    container.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const title = card.getAttribute('data-title');
        const qtyInput = card.querySelector('.qty-input');
        const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

        const existing = cart.find(item => item.id === id);
        if (existing) {
          existing.qty += qty;
        } else {
          cart.push({ id, title, qty });
        }

        updateCartUI();
        openCart();
        if (qtyInput) qtyInput.value = 1;
      };
    });
  }

  attachProductCardListeners(document);

  /* ------------------------------------------------------------------------
     6. UPDATE CART UI
     ------------------------------------------------------------------------ */
  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalItems;
    const cartDrawerTotalCount = document.getElementById('cartDrawerTotalCount');
    if (cartDrawerTotalCount) {
      cartDrawerTotalCount.innerText = `${totalItems} Artikel`;
    }

    if (cart.length === 0) {
      cartItemsBody.innerHTML = `
        <div class="cart-empty-msg">
          <i class="fas fa-shopping-basket"></i>
          <p>Ihr Anfragekorb ist noch leer.</p>
          <small>Wählen Sie oben Produkte aus, um ein Angebot anzufordern.</small>
        </div>
      `;
    } else {
      let html = '';

      cart.forEach((item, index) => {
        html += `
          <div class="cart-item">
            <div>
              <div class="cart-item-title">${item.title}</div>
              <div class="qty-picker" style="margin-top: 0.4rem;">
                <button class="qty-btn cart-qty-minus" data-index="${index}">-</button>
                <input type="text" class="qty-input cart-qty-input" data-index="${index}" value="${item.qty}" inputmode="numeric">
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

      cartItemsBody.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
          input.value = input.value.replace(/[^0-9]/g, '');
          const idx = e.target.getAttribute('data-index');
          const val = parseInt(input.value) || 0;
          if (val > 0) {
            cart[idx].qty = val;
            const updatedTotal = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCountBadge.innerText = updatedTotal;
            if (cartDrawerTotalCount) cartDrawerTotalCount.innerText = `${updatedTotal} Artikel`;
          }
        });

        input.addEventListener('blur', (e) => {
          const idx = e.target.getAttribute('data-index');
          if (!input.value || parseInt(input.value) < 1) {
            cart[idx].qty = 1;
          }
          updateCartUI();
        });
      });

      cartItemsBody.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          updateCartUI();
        };
      });

      cartItemsBody.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart[idx].qty += 1;
          updateCartUI();
        };
      });

      cartItemsBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          updateCartUI();
        };
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. WEITER ZUR KASSE BUTTON IN CART DRAWER
     ------------------------------------------------------------------------ */
  const cartWeiterBtn = document.getElementById('cartWeiterBtn');
  if (cartWeiterBtn) {
    cartWeiterBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist noch leer. Bitte wählen Sie zuerst Produkte aus.');
        return;
      }
      closeCart();
      openCheckoutView();
    });
  }

  /* ------------------------------------------------------------------------
     7.5 OFFICIAL CHECKOUT VIEW LOGIC (MATCHING EVENTNIGHT.DE/CHECKOUT/)
     ------------------------------------------------------------------------ */
  const checkoutView = document.getElementById('checkoutView');
  const backFromCheckoutBtn = document.getElementById('backFromCheckoutBtn');
  const checkoutTableBody = document.getElementById('checkoutTableBody');
  const officialCheckoutForm = document.getElementById('officialCheckoutForm');
  const checkoutSuccessAlert = document.getElementById('checkoutSuccessAlert');

  function openCheckoutView(pushState = true) {
    if (!checkoutView) return;

    // Render cart items in checkout summary table
    if (cart.length === 0) {
      checkoutTableBody.innerHTML = `
        <tr>
          <td colspan="2" style="text-align: center; color: #777; padding: 2rem;">
            Ihr Anfragekorb ist noch leer. Wählen Sie erst Produkte aus.
          </td>
        </tr>
      `;
    } else {
      checkoutTableBody.innerHTML = cart.map(item => `
        <tr>
          <td style="display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem 1rem;">
            <img src="${item.img || 'images/Eventnight-Logo-ausgeschnitten.png'}" alt="${item.title}" style="width: 44px; height: 44px; object-fit: contain; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 4px; padding: 2px; flex-shrink: 0;">
            <strong style="font-size: 0.92rem; color: #111;">${item.title}</strong>
          </td>
          <td style="text-align: center; font-weight: 800; color: #111; font-size: 1rem;">&times; ${item.qty}</td>
        </tr>
      `).join('');
    }

    if (cartView) cartView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'none';
    checkoutView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'checkout' }, '', '#checkout');
    }
  }

  if (backFromCheckoutBtn) {
    backFromCheckoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  if (officialCheckoutForm) {
    officialCheckoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist leer.');
        return;
      }

      const submitBtn = document.getElementById('chkSubmitBtn');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Anfrage wird übermittelt...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        cart = [];
        updateCartUI();

        checkoutSuccessAlert.style.display = 'block';
        officialCheckoutForm.reset();

        window.scrollTo({ top: checkoutSuccessAlert.offsetTop - 140, behavior: 'smooth' });

        setTimeout(() => {
          checkoutSuccessAlert.style.display = 'none';
          showMainView();
        }, 5000);
      }, 1200);
    });
  }

  /* ------------------------------------------------------------------------
     8. CATEGORY FILTER TABS (FOR MAIN VIEW)
     ------------------------------------------------------------------------ */
  const catTabs = document.querySelectorAll('.cat-tab');
  const productCards = document.querySelectorAll('#mainView .product-card');

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

  /* ------------------------------------------------------------------------
     9. INTERACTIVE CURSOR-POSITION IMAGE ZOOM (EXCLUSIVELY FOR PRODUCT DETAIL VIEW)
     ------------------------------------------------------------------------ */
  function initImageZoomHandlers(container = document) {
    const zoomBoxes = container.querySelectorAll('.single-product-image-box');
    
    zoomBoxes.forEach(box => {
      const img = box.querySelector('img');
      if (!img) return;

      box.style.overflow = 'hidden';
      box.style.cursor = 'zoom-in';

      if (box.dataset.zoomInitialized) return;
      box.dataset.zoomInitialized = 'true';

      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2.2)';
      });

      box.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
      });
    });
  }

  // Initial call for single product detail view image
  initImageZoomHandlers();

  /* ------------------------------------------------------------------------
     10. SCROLLSPY & NAVBAR ACTIVE HIGHLIGHTING (YELLOW)
     ------------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mainSections = document.querySelectorAll('#mainView section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();

        if (mainView.style.display === 'none') {
          showMainView();
        }

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 110;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  function updateScrollSpy() {
    if (mainView.style.display === 'none') return;

    const scrollPos = window.scrollY + 180;

    mainSections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');

      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        navLinks.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${secId}`) {
            l.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();

  /* ------------------------------------------------------------------------
     11. STANDALONE CART PAGE VIEW LOGIC (#cartView)
     ------------------------------------------------------------------------ */
  const cartView = document.getElementById('cartView');
  const backFromCartBtn = document.getElementById('backFromCartBtn');
  const cartPageItemsBody = document.getElementById('cartPageItemsBody');
  const cartPageTotalCount = document.getElementById('cartPageTotalCount');
  const cartPageWeiterBtn = document.getElementById('cartPageWeiterBtn');

  function openCartView(pushState = true) {
    if (!cartView) return;

    renderCartPageUI();

    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    cartView.style.display = 'block';
    updateNavbarMode(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'cart' }, '', '#anfragekorb');
    }
  }

  function renderCartPageUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalItems;
    if (cartPageTotalCount) cartPageTotalCount.innerText = `${totalItems} Artikel`;

    if (!cartPageItemsBody) return;

    if (cart.length === 0) {
      cartPageItemsBody.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: #F9F9F9; border-radius: var(--radius-md); border: 1px solid #E5E5E5;">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #CCC; margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #333;">Ihr Anfragekorb ist leer</h3>
          <p style="color: #777; margin-bottom: 1.5rem;">Wählen Sie unsere Mietkategorien, um Produkte hinzuzufügen.</p>
          <button class="btn btn-yellow" onclick="showMainView();"><i class="fas fa-layer-group"></i> Zu den Kategorien</button>
        </div>
      `;
    } else {
      let html = '';
      cart.forEach((item, index) => {
        html += `
          <div class="cart-page-item-card">
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div class="cart-page-item-img">
                <img src="${item.img || 'images/Eventnight-Logo-ausgeschnitten.png'}" alt="${item.title}">
              </div>
              <div>
                <div class="cart-page-item-title">${item.title}</div>
                <div style="font-size: 0.85rem; color: #666;">Artikel-ID: ${item.id}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div class="qty-picker">
                <button class="qty-btn cart-page-qty-minus" data-index="${index}">-</button>
                <input type="text" class="qty-input cart-page-qty-input" data-index="${index}" value="${item.qty}" inputmode="numeric">
                <button class="qty-btn cart-page-qty-plus" data-index="${index}">+</button>
              </div>

              <button class="cart-item-remove cart-page-item-remove" data-index="${index}" title="Entfernen" style="font-size: 1.1rem; color: #EF4444; background: none; border: none; cursor: pointer; padding: 0.5rem;">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
      });

      cartPageItemsBody.innerHTML = html;

      cartPageItemsBody.querySelectorAll('.cart-page-qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
          input.value = input.value.replace(/[^0-9]/g, '');
          const idx = e.target.getAttribute('data-index');
          const val = parseInt(input.value) || 0;
          if (val > 0) {
            cart[idx].qty = val;
            renderCartPageUI();
          }
        });
      });

      cartPageItemsBody.querySelectorAll('.cart-page-qty-minus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          renderCartPageUI();
        };
      });

      cartPageItemsBody.querySelectorAll('.cart-page-qty-plus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart[idx].qty += 1;
          renderCartPageUI();
        };
      });

      cartPageItemsBody.querySelectorAll('.cart-page-item-remove').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          renderCartPageUI();
        };
      });
    }
  }

  if (cartHeaderBtn) {
    cartHeaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartView();
    });
  }

  if (backFromCartBtn) {
    backFromCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  if (cartPageWeiterBtn) {
    cartPageWeiterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist leer. Bitte fügen Sie erst Artikel hinzu.');
        return;
      }
      openCheckoutView();
    });
  }

  /* ------------------------------------------------------------------------
     12. HEADER MEGA DROPDOWN EVENTBEDARF CATEGORY NAVIGATION
     ------------------------------------------------------------------------ */
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const catKey = item.getAttribute('data-cat');
      openCategorySubpage(catKey);
    });
  });

  /* ------------------------------------------------------------------------
     13. NATIVE BROWSER BACK / FORWARD BUTTON (POPSTATE) NAVIGATION
     ------------------------------------------------------------------------ */
  history.replaceState({ view: 'main' }, '', window.location.hash || '#start');

  window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (state && state.view === 'category' && state.catKey) {
      openCategorySubpage(state.catKey, false);
    } else if (state && state.view === 'product' && state.productId) {
      openSingleProductView(state.productId, false);
    } else if (state && state.view === 'cart') {
      openCartView(false);
    } else if (state && state.view === 'checkout') {
      openCheckoutView(false);
    } else {
      showMainView(false);
    }
  });

});
