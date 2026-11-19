/**
 * Aadhi Cement Works — Interactive Website Scripts
 * Proprietor: M. Muthukumar | Contact: 8098274097 / 7339505655
 * Address: E.C.R. Road - Karisaikkadu, Murugan Kovil South Road, Manjavayal
 * 
 * Features:
 * 1. Bilingual (English / தமிழ்) instant toggle
 * 2. Direct WhatsApp Inquiry to Prop. M. Muthukumar (+91 80982 74097)
 * 3. Interactive slidable product catalog & mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Business Contacts
  const PRIMARY_PHONE = '8098274097';
  const SECONDARY_PHONE = '7339505655';
  const WHATSAPP_NUMBER = '918098274097';

  // Current state
  let currentLang = localStorage.getItem('aadhi_lang') || 'en';

  // DOM Elements
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');


  // Contact Form
  const inquiryForm = document.getElementById('inquiryForm');

  // Currency Formatter (Indian Rupee style: ₹ 4,85,850)
  function formatINR(val) {
    return '₹ ' + Math.round(val).toLocaleString('en-IN');
  }

  /* ==========================================================================
     1. LANGUAGE TOGGLE (ENGLISH / TAMIL)
     ========================================================================== */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('aadhi_lang', lang);

    document.querySelectorAll('[data-en][data-ta]').forEach(el => {
      const text = lang === 'ta' ? el.getAttribute('data-ta') : el.getAttribute('data-en');
      if (text) {
        if (el.children.length === 0) {
          el.textContent = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    if (langLabel) {
      langLabel.textContent = lang === 'ta' ? 'English / ஆங்கிலம்' : 'தமிழ் / Tamil';
    }

    if (lang === 'ta') {
      document.body.classList.add('tamil-active');
    } else {
      document.body.classList.remove('tamil-active');
    }

    if (typeof window.updateDesignerLanguage === 'function') {
      window.updateDesignerLanguage();
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ta' : 'en';
      applyLanguage(nextLang);
    });
  }

  // Initialize saved language
  applyLanguage(currentLang);

  /* ==========================================================================
     2. MOBILE MENU HANDLING
     ========================================================================== */
  if (mobileMenuBtn && mobileNavOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileNav() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });



  /* ==========================================================================
     3. CONTACT & SITE VISIT INQUIRY FORM
     ========================================================================== */
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const location = document.getElementById('clientLocation').value.trim();
      const service = document.getElementById('serviceRequirement').value;
      const message = document.getElementById('clientMessage').value.trim();

      const whatsappText = `வணக்கம் M. முத்துக்குமார் ஐயா (ஆதி சிமெண்ட் ஒர்க்ஸ்)!
இட ஆய்வு மற்றும் விலை விபரம் தேவை:
- பெயர்: ${name}
- தொலைபேசி: ${phone}
- வேலை செய்ய வேண்டிய இடம்: ${location}
- தேவை: ${service}
${message ? `- குறிப்புகள்: ${message}` : ''}
நேரில் பார்வையிட்டு மதிப்பீடு தரவும்.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`, '_blank');
    });
  }

  /* ==========================================================================
     4. HEADER BACKGROUND BLUR ON SCROLL
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.style.background = 'rgba(10, 12, 16, 0.95)';
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      siteHeader.style.background = 'rgba(10, 12, 16, 0.88)';
      siteHeader.style.boxShadow = 'none';
    }
  });

  /* ==========================================================================
     5. GENERIC DRAGGABLE TRACK CONTROLLER (MOUSE & TOUCH MOMENTUM)
     ========================================================================== */
  function makeTrackDraggable(track, onScrollCallback) {
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      isDown = true;
      hasMoved = false;
      track.classList.add('is-dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      if (onScrollCallback) onScrollCallback();
    });

    track.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      if (onScrollCallback) onScrollCallback();
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 5) hasMoved = true;
      track.scrollLeft = scrollLeft - walk;
      if (onScrollCallback) onScrollCallback();
    });

    track.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);
  }

  /* ==========================================================================
     6. PRODUCTS SLIDABLE CAROUSEL (DRAGGABLE, SIDE CHEVRONS, AUTOPLAY)
     ========================================================================== */
  const productsSliderTrack = document.getElementById('productsSliderTrack');
  const productsSliderWrapper = document.getElementById('productsSliderWrapper');
  const prodSliderPrev = document.getElementById('prodSliderPrev');
  const prodSliderNext = document.getElementById('prodSliderNext');
  const prodSidePrev = document.getElementById('prodSidePrev');
  const prodSideNext = document.getElementById('prodSideNext');
  const prodPaginationDots = document.querySelectorAll('#sliderPagination .pagination-dot');
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.products-slider-track .product-card');

  function getProductSlideStep() {
    if (!productsSliderTrack || productCards.length === 0) return 320;
    const firstCard = productCards[0];
    const gap = 28;
    return firstCard.offsetWidth + gap;
  }

  function updateProductPagination() {
    if (!productsSliderTrack || prodPaginationDots.length === 0) return;
    const scrollLeft = productsSliderTrack.scrollLeft;
    const step = getProductSlideStep();
    const activeIdx = Math.min(
      Math.max(0, Math.round(scrollLeft / step)),
      prodPaginationDots.length - 1
    );
    prodPaginationDots.forEach((d, i) => {
      d.classList.toggle('active', i === activeIdx);
    });
  }

  function slideProducts(direction) {
    if (!productsSliderTrack) return;
    const step = getProductSlideStep();
    const maxScroll = productsSliderTrack.scrollWidth - productsSliderTrack.clientWidth;
    if (direction === 'next' && productsSliderTrack.scrollLeft >= maxScroll - 10) {
      productsSliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === 'prev' && productsSliderTrack.scrollLeft <= 10) {
      productsSliderTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      productsSliderTrack.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' });
    }
  }

  [prodSliderPrev, prodSidePrev].forEach(btn => {
    if (btn) btn.addEventListener('click', () => slideProducts('prev'));
  });

  [prodSliderNext, prodSideNext].forEach(btn => {
    if (btn) btn.addEventListener('click', () => slideProducts('next'));
  });

  prodPaginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!productsSliderTrack || !productCards[index]) return;
      const targetCard = productCards[index];
      productsSliderTrack.scrollTo({
        left: targetCard.offsetLeft - productsSliderTrack.offsetLeft,
        behavior: 'smooth'
      });
    });
  });

  if (productsSliderTrack) {
    let scrollTimeout;
    productsSliderTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateProductPagination, 40);
    });
    makeTrackDraggable(productsSliderTrack, updateProductPagination);
  }

  // Category filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      if (filter === 'all') {
        productsSliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const matchedCard = document.querySelector(`.products-slider-track .product-card[data-category="${filter}"]`);
        if (matchedCard && productsSliderTrack) {
          productsSliderTrack.scrollTo({
            left: matchedCard.offsetLeft - productsSliderTrack.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Autoplay for Products Carousel (pauses on hover)
  let prodAutoplayTimer = null;
  function startProdAutoplay() {
    stopProdAutoplay();
    prodAutoplayTimer = setInterval(() => {
      slideProducts('next');
    }, 4500);
  }
  function stopProdAutoplay() {
    if (prodAutoplayTimer) {
      clearInterval(prodAutoplayTimer);
      prodAutoplayTimer = null;
    }
  }

  if (productsSliderWrapper) {
    productsSliderWrapper.addEventListener('mouseenter', stopProdAutoplay);
    productsSliderWrapper.addEventListener('mouseleave', startProdAutoplay);
    productsSliderWrapper.addEventListener('touchstart', stopProdAutoplay, { passive: true });
    productsSliderWrapper.addEventListener('touchend', startProdAutoplay, { passive: true });
    startProdAutoplay();
  }



  /* ==========================================================================
     7. PROCESS STEPS HORIZONTAL DRAG
     ========================================================================== */
  const processStepsTrack = document.getElementById('processStepsTrack');
  if (processStepsTrack) {
    makeTrackDraggable(processStepsTrack);
  }

  /* ==========================================================================
     8. INTERACTIVE 3D COMPOUND WALL DESIGN STUDIO & GAME LOGIC
     ========================================================================== */
  const wallStageViewport = document.getElementById('wallStageViewport');
  const wallPlatesColumn = document.getElementById('wallPlatesColumn');
  const postLeft = document.getElementById('postLeft');
  const postRight = document.getElementById('postRight');
  const stageActiveSlotLabel = document.getElementById('stageActiveSlotLabel');
  const tierChipsWrapper = document.getElementById('tierChipsWrapper');
  const patternsGrid = document.getElementById('patternsGrid');
  const colorsPaletteGrid = document.getElementById('colorsPaletteGrid');
  const presetsGallery = document.getElementById('presetsGallery');
  const designSummaryPreview = document.getElementById('designSummaryPreview');
  const btnSendCustomWallWhatsApp = document.getElementById('btnSendCustomWallWhatsApp');
  const btnShuffleDesign = document.getElementById('btnShuffleDesign');
  const btnResetDesign = document.getElementById('btnResetDesign');
  const btnRibbonMoveUp = document.getElementById('btnRibbonMoveUp');
  const btnRibbonMoveDown = document.getElementById('btnRibbonMoveDown');
  const btnApplyPatternAll = document.getElementById('btnApplyPatternAll');
  const heightToggleGroup = document.getElementById('heightToggleGroup');
  const atmosphereGroup = document.getElementById('atmosphereGroup');
  const paintTargetSwitch = document.getElementById('paintTargetSwitch');

  const WALL_PATTERNS = {
    'brick': {
      id: 'brick',
      nameEn: 'Brick Masonry',
      nameTa: 'செங்கல் வடிவம்',
      descEn: 'Brick texture',
      descTa: 'செங்கல் வடிவம்',
      icon: '🧱'
    },
    'medallion': {
      id: 'medallion',
      nameEn: 'Hexagon Medallion',
      nameTa: 'அறுகோண பூ',
      descEn: 'Hexagon motif',
      descTa: 'அறுகோண பூ',
      icon: '⬡'
    },
    'trellis': {
      id: 'trellis',
      nameEn: 'Diamond Trellis',
      nameTa: 'வைர கட்டம்',
      descEn: 'Diamond grid',
      descTa: 'வைர கட்டம்',
      icon: '◇'
    },
    'floral': {
      id: 'floral',
      nameEn: 'Floral Vine',
      nameTa: 'பூ கொடி வேலைப்பாடு',
      descEn: 'Floral relief',
      descTa: 'பூ கொடி',
      icon: '🌸'
    },
    'waves': {
      id: 'waves',
      nameEn: 'Wave Petals',
      nameTa: 'அலை வடிவம்',
      descEn: 'Wave petals',
      descTa: 'அலை வடிவம்',
      icon: '≋'
    },
    'rockface': {
      id: 'rockface',
      nameEn: 'Chiseled Rockface',
      nameTa: 'பாறைக்கல் வடிவம்',
      descEn: 'Stone rockface',
      descTa: 'பாறைக்கல்',
      icon: '🪨'
    },
    'panthu': {
      id: 'panthu',
      nameEn: 'Smooth Plain (Panthu)',
      nameTa: 'சமதள பந்து தட்டு',
      descEn: 'Smooth plain',
      descTa: 'சமதள பலகை',
      icon: '▭'
    }
  };

  const WALL_COLORS = [
    { id: 'raw', hex: '#b1a99e', opacity: 0, nameEn: 'Raw Concrete', nameTa: 'இயற்கை சிமெண்ட்' },
    { id: 'sunlit', hex: '#c4baa8', opacity: 0.35, nameEn: 'Sandy Grey', nameTa: 'மணல் சிமெண்ட்' },
    { id: 'terracotta', hex: '#8c2d19', opacity: 0.85, nameEn: 'Terracotta Red', nameTa: 'செம்மண் சிவப்பு' },
    { id: 'sandstone', hex: '#b4651a', opacity: 0.82, nameEn: 'Sandstone Gold', nameTa: 'பொன் நிறம்' },
    { id: 'ivory', hex: '#d9cbab', opacity: 0.80, nameEn: 'Sandal Cream', nameTa: 'சந்தன கிரீம்' },
    { id: 'slate', hex: '#3b4550', opacity: 0.85, nameEn: 'Slate Grey', nameTa: 'சாம்பல் நிறம்' },
    { id: 'olive', hex: '#434f36', opacity: 0.82, nameEn: 'Moss Green', nameTa: 'இயற்கை பச்சை' },
    { id: 'white', hex: '#deded9', opacity: 0.75, nameEn: 'Off-White', nameTa: 'வெள்ளை' },
    { id: 'teak', hex: '#59371f', opacity: 0.85, nameEn: 'Teak Brown', nameTa: 'மர பழுப்பு' }
  ];

  const WALL_PRESETS = [
    {
      id: 'site-reference-1',
      nameEn: '🏡 Manjavayal Site Model',
      nameTa: '🏡 மஞ்சவயல் தளம்',
      descEn: 'Site wall reference',
      descTa: 'மஞ்சவயல் தளம்',
      pillarColor: '#b1a99e',
      pillarOpacity: 0,
      plates: [
        { pattern: 'brick', color: '#b1a99e', opacity: 0 },
        { pattern: 'medallion', color: '#b1a99e', opacity: 0 },
        { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
        { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
        { pattern: 'medallion', color: '#b1a99e', opacity: 0 }
      ]
    },
    {
      id: 'site-reference-2',
      nameEn: '🏛️ ECR Road Villa Model',
      nameTa: '🏛️ ECR ரோடு வில்லா',
      descEn: 'ECR villa reference',
      descTa: 'ECR வில்லா',
      pillarColor: '#b1a99e',
      pillarOpacity: 0,
      plates: [
        { pattern: 'rockface', color: '#b1a99e', opacity: 0 },
        { pattern: 'medallion', color: '#b1a99e', opacity: 0 },
        { pattern: 'brick', color: '#b1a99e', opacity: 0 },
        { pattern: 'medallion', color: '#b1a99e', opacity: 0 },
        { pattern: 'medallion', color: '#b1a99e', opacity: 0 }
      ]
    },
    {
      id: 'whole-panthu-wall',
      nameEn: '🏗️ All Plain Panthu Model',
      nameTa: '🏗️ முழு சமதள தட்டு',
      descEn: 'All plain panthu slabs',
      descTa: 'முழு சமதள பலகை',
      pillarColor: '#b1a99e',
      pillarOpacity: 0,
      plates: [
        { pattern: 'panthu', color: '#b1a99e', opacity: 0 },
        { pattern: 'panthu', color: '#b1a99e', opacity: 0 },
        { pattern: 'panthu', color: '#b1a99e', opacity: 0 },
        { pattern: 'panthu', color: '#b1a99e', opacity: 0 },
        { pattern: 'panthu', color: '#b1a99e', opacity: 0 }
      ]
    },
    {
      id: 'signature-floral-villa',
      nameEn: '🌸 Signature Floral Villa',
      nameTa: '🌸 பிரத்யேக பூ & சிவப்பு',
      descEn: 'Signature Floral Villa',
      descTa: 'பிரத்யேக பூ தட்டு',
      pillarColor: '#b1a99e',
      pillarOpacity: 0,
      plates: [
        { pattern: 'floral', color: '#8c2d19', opacity: 0.85 },
        { pattern: 'medallion', color: '#b4651a', opacity: 0.82 },
        { pattern: 'brick', color: '#b4651a', opacity: 0.82 },
        { pattern: 'trellis', color: '#b4651a', opacity: 0.82 },
        { pattern: 'rockface', color: '#3b4550', opacity: 0.85 }
      ]
    }
  ];

  // Studio State
  let currentWallHeight = 5;
  let selectedSlotIndex = 0;
  let activePaintTarget = 'selected'; // 'selected' | 'all' | 'pillars'
  let activePillarColor = '#b1a99e';
  let activePillarOpacity = 0; // 0 = 100% Raw Cured Concrete!
  let currentPlates = [
    { pattern: 'brick', color: '#b1a99e', opacity: 0 },
    { pattern: 'medallion', color: '#b1a99e', opacity: 0 },
    { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
    { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
    { pattern: 'medallion', color: '#b1a99e', opacity: 0 }
  ];

  function getTierShortLabel(index, total) {
    if (index === 0) {
      return currentLang === 'ta' ? '1 (மேல்)' : '1 (Top)';
    } else if (index === total - 1) {
      return currentLang === 'ta' ? `${index + 1} (கீழ்)` : `${index + 1} (Base)`;
    } else {
      return `${index + 1}`;
    }
  }

  function getTierLabel(index, total) {
    if (index === 0) {
      return currentLang === 'ta' ? `அடுக்கு 1 (மேல் தட்டு)` : `Tier 1 (Top)`;
    } else if (index === total - 1) {
      return currentLang === 'ta' ? `அடுக்கு ${index + 1} (அடி தட்டு)` : `Tier ${index + 1} (Base)`;
    } else {
      return currentLang === 'ta' ? `அடுக்கு ${index + 1}` : `Tier ${index + 1}`;
    }
  }

  function getColorName(hex, opacity) {
    if (opacity === 0) {
      return currentLang === 'ta' ? 'இயற்கை சிமெண்ட் (வண்ணம் இல்லை)' : 'Natural Cured Concrete (Raw)';
    }
    const found = WALL_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase());
    if (found) {
      return currentLang === 'ta' ? found.nameTa : found.nameEn;
    }
    return hex;
  }

  function getPatternName(patId) {
    const p = WALL_PATTERNS[patId];
    if (p) {
      return currentLang === 'ta' ? p.nameTa : p.nameEn;
    }
    return patId;
  }

  function renderWallStage() {
    if (!wallPlatesColumn) return;

    // Apply pillar color & opacity
    document.documentElement.style.setProperty('--pillar-color', activePillarColor);
    document.documentElement.style.setProperty('--pillar-paint-opacity', activePillarOpacity);

    // Render plates with 100% clean, unobstructed surface
    wallPlatesColumn.innerHTML = '';
    currentPlates.forEach((plate, idx) => {
      const plateEl = document.createElement('div');
      plateEl.className = `plate-item pattern-${plate.pattern} ${idx === selectedSlotIndex ? 'active' : ''}`;
      plateEl.setAttribute('data-index', idx);
      plateEl.setAttribute('data-pattern', plate.pattern);
      plateEl.style.setProperty('--plate-color', plate.color);
      plateEl.style.setProperty('--plate-paint-opacity', plate.opacity !== undefined ? plate.opacity : 0.85);
      plateEl.setAttribute('tabindex', '0');
      plateEl.setAttribute('role', 'button');
      plateEl.setAttribute('aria-label', `Plate ${idx + 1}`);

      // Clean plate surface: NO text overlay blocking the beautiful patterns
      plateEl.innerHTML = `
        <div class="plate-surface">
          <div class="plate-photo-texture"></div>
          <div class="plate-paint-tint"></div>
          <div class="plate-relief-highlight"></div>
        </div>
      `;

      // Select plate on click
      plateEl.addEventListener('click', () => {
        selectPlateSlot(idx);
      });

      wallPlatesColumn.appendChild(plateEl);
    });

    // Dynamically adjust pillar shaft height to match actual plate height
    const firstPlate = wallPlatesColumn.querySelector('.plate-item');
    const plateHeight = firstPlate && firstPlate.offsetHeight > 0 ? firstPlate.offsetHeight : 82;
    const postHeightPx = Math.round((currentWallHeight * (plateHeight + 1.5)) + 26);
    if (postLeft) {
      const shaft = postLeft.querySelector('.post-shaft');
      if (shaft) shaft.style.height = `${postHeightPx}px`;
    }
    if (postRight) {
      const shaft = postRight.querySelector('.post-shaft');
      if (shaft) shaft.style.height = `${postHeightPx}px`;
    }

    renderTierRibbon();
    renderPatternsUI();
    renderColorsUI();
    renderPresetsUI();
    updateDesignSummaryText();
  }

  function selectPlateSlot(idx) {
    if (idx < 0 || idx >= currentPlates.length) return;
    selectedSlotIndex = idx;

    // Update active class on plates
    const allPlateEls = wallPlatesColumn.querySelectorAll('.plate-item');
    allPlateEls.forEach((el, i) => {
      el.classList.toggle('active', i === selectedSlotIndex);
    });

    // Update status pill
    if (stageActiveSlotLabel) {
      stageActiveSlotLabel.textContent = `${currentLang === 'ta' ? 'தேர்வு:' : 'Selected:'} ${getTierLabel(selectedSlotIndex, currentPlates.length)}`;
    }

    renderTierRibbon();
    renderPatternsUI();
    renderColorsUI();
  }

  function movePlateSlot(fromIdx, toIdx) {
    if (fromIdx < 0 || fromIdx >= currentPlates.length) return;
    if (toIdx < 0 || toIdx >= currentPlates.length) return;

    const temp = currentPlates[fromIdx];
    currentPlates[fromIdx] = currentPlates[toIdx];
    currentPlates[toIdx] = temp;

    selectedSlotIndex = toIdx;
    renderWallStage();
  }

  function renderTierRibbon() {
    if (!tierChipsWrapper) return;
    tierChipsWrapper.innerHTML = '';

    currentPlates.forEach((_, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `tier-chip ${idx === selectedSlotIndex ? 'active' : ''}`;
      chip.textContent = getTierShortLabel(idx, currentPlates.length);
      chip.title = getTierLabel(idx, currentPlates.length);
      chip.addEventListener('click', () => selectPlateSlot(idx));
      tierChipsWrapper.appendChild(chip);
    });

    if (btnRibbonMoveUp) btnRibbonMoveUp.disabled = selectedSlotIndex === 0;
    if (btnRibbonMoveDown) btnRibbonMoveDown.disabled = selectedSlotIndex === currentPlates.length - 1;
  }

  function renderPatternsUI() {
    if (!patternsGrid) return;
    patternsGrid.innerHTML = '';

    const currentPlate = currentPlates[selectedSlotIndex] || currentPlates[0];
    const activePatternId = currentPlate.pattern;

    Object.values(WALL_PATTERNS).forEach(pat => {
      const card = document.createElement('div');
      card.className = `pattern-card-btn ${pat.id === activePatternId ? 'active' : ''}`;
      card.innerHTML = `
        <div class="pattern-card-preview pattern-${pat.id}">
          <div class="plate-photo-texture"></div>
          <div class="plate-paint-tint" style="background-color: ${currentPlate.color}; opacity: ${currentPlate.opacity !== undefined ? currentPlate.opacity : 0.85};"></div>
        </div>
        <div class="pattern-card-title">${currentLang === 'ta' ? pat.nameTa : pat.nameEn}</div>
      `;

      card.addEventListener('click', () => {
        currentPlates[selectedSlotIndex].pattern = pat.id;
        renderWallStage();
      });

      patternsGrid.appendChild(card);
    });
  }

  function renderColorsUI() {
    if (!colorsPaletteGrid) return;
    colorsPaletteGrid.innerHTML = '';

    const currentPlate = currentPlates[selectedSlotIndex] || currentPlates[0];
    const currentColorHex = activePaintTarget === 'pillars' 
      ? activePillarColor 
      : currentPlate.color;
    const currentOpacity = activePaintTarget === 'pillars'
      ? activePillarOpacity
      : (currentPlate.opacity !== undefined ? currentPlate.opacity : 0.85);

    WALL_COLORS.forEach(c => {
      const isSelected = c.opacity === 0
        ? currentOpacity === 0
        : (c.hex.toLowerCase() === currentColorHex.toLowerCase() && currentOpacity > 0);

      const btn = document.createElement('div');
      btn.className = `color-swatch-btn ${isSelected ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="swatch-circle" style="background-color: ${c.hex}; ${c.opacity === 0 ? 'border: 2px dashed #ffffff; background-image: radial-gradient(circle, #78716c 20%, #a8a29e 80%);' : ''}"></div>
        <span class="swatch-name">${currentLang === 'ta' ? c.nameTa : c.nameEn}</span>
      `;

      btn.addEventListener('click', () => {
        if (activePaintTarget === 'pillars') {
          activePillarColor = c.hex;
          activePillarOpacity = c.opacity;
        } else if (activePaintTarget === 'all') {
          currentPlates.forEach(p => {
            p.color = c.hex;
            p.opacity = c.opacity;
          });
        } else {
          currentPlates[selectedSlotIndex].color = c.hex;
          currentPlates[selectedSlotIndex].opacity = c.opacity;
        }
        renderWallStage();
      });

      colorsPaletteGrid.appendChild(btn);
    });
  }

  function renderPresetsUI() {
    if (!presetsGallery) return;
    presetsGallery.innerHTML = '';

    WALL_PRESETS.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-item-card';

      const miniPlatesHtml = preset.plates
        .slice(0, currentWallHeight)
        .map(p => `<div class="mini-plate pattern-${p.pattern}" style="background-color: ${p.color}; opacity: ${p.opacity === 0 ? 0.6 : 0.9};"></div>`)
        .join('');

      card.innerHTML = `
        <div class="preset-details">
          <h4 class="preset-name">${currentLang === 'ta' ? preset.nameTa : preset.nameEn}</h4>
        </div>
        <div class="preset-mini-stack">
          ${miniPlatesHtml}
        </div>
      `;

      card.addEventListener('click', () => {
        applyPreset(preset);
      });

      presetsGallery.appendChild(card);
    });
  }

  function applyPreset(preset) {
    activePillarColor = preset.pillarColor || '#b1a99e';
    activePillarOpacity = preset.pillarOpacity !== undefined ? preset.pillarOpacity : 0;
    currentPlates = [];

    for (let i = 0; i < currentWallHeight; i++) {
      if (preset.plates[i]) {
        currentPlates.push({ ...preset.plates[i] });
      } else {
        currentPlates.push({ pattern: 'panthu', color: '#b1a99e', opacity: 0 });
      }
    }
    selectedSlotIndex = 0;
    renderWallStage();
  }

  function updateDesignSummaryText() {
    if (!designSummaryPreview) return;

    if (currentLang === 'ta') {
      designSummaryPreview.innerHTML = `
        <span class="summary-badge-item">📐 <strong>${currentWallHeight} அடி சுவர்</strong></span>
        <span class="summary-dot">•</span>
        <span class="summary-badge-item">${currentWallHeight} தட்டுகள்</span>
        <span class="summary-dot">•</span>
        <span class="summary-badge-item">M30 கான்கிரீட்</span>
      `;
    } else {
      designSummaryPreview.innerHTML = `
        <span class="summary-badge-item">📐 <strong>${currentWallHeight} ft Wall</strong></span>
        <span class="summary-dot">•</span>
        <span class="summary-badge-item">${currentWallHeight} Tiers</span>
        <span class="summary-dot">•</span>
        <span class="summary-badge-item">M30 Concrete</span>
      `;
    }

    // Generate WhatsApp text with complete technical details for Muthukumar
    if (btnSendCustomWallWhatsApp) {
      btnSendCustomWallWhatsApp.onclick = () => {
        const pillarColorLabel = getColorName(activePillarColor, activePillarOpacity);
        let msg = `வணக்கம் M. முத்துக்குமார் ஐயா (ஆதி சிமெண்ட் ஒர்க்ஸ்)!
நான் உங்கள் வெப்சைட்டில் 3D காம்பவுண்ட் சுவர் டிசைன் செய்துள்ளேன்:

📐 சுவர் அளவு: ${currentWallHeight} அடி உயரம் (${currentWallHeight} தட்டுகள்)
🏛️ தூண்கள்: 2 nos (${pillarColorLabel})
🧱 தட்டுகள் வரிசை (மேலிருந்து கீழ்):
`;
        currentPlates.forEach((p, i) => {
          msg += `- ${getTierLabel(i, currentPlates.length)}: ${getPatternName(p.pattern)} (${getColorName(p.color, p.opacity)})\n`;
        });

        msg += `\nஇடம்: மஞ்சவயல் / சுற்றுவட்டார பகுதி.
இந்த டிசைனில் சுமார் 80-100 அடி காம்பவுண்ட் சுவர் அமைக்க உத்தேச செலவு மற்றும் விபரம் தரவும்.`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      };
    }
  }

  // Set wall height (4, 5, or 6 ft)
  function setWallHeight(newHeight) {
    if (newHeight < 4 || newHeight > 6) return;
    currentWallHeight = newHeight;

    if (currentPlates.length < newHeight) {
      while (currentPlates.length < newHeight) {
        currentPlates.push({ pattern: 'panthu', color: '#b1a99e', opacity: 0 });
      }
    } else if (currentPlates.length > newHeight) {
      currentPlates = currentPlates.slice(0, newHeight);
    }

    if (selectedSlotIndex >= newHeight) {
      selectedSlotIndex = newHeight - 1;
    }

    if (heightToggleGroup) {
      heightToggleGroup.querySelectorAll('.stage-chip-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-height'), 10) === newHeight);
      });
    }

    renderWallStage();
  }

  // Set atmosphere lighting mode (day, sunset, night)
  function setAtmosphere(theme) {
    if (!wallStageViewport) return;
    wallStageViewport.classList.remove('theme-day', 'theme-sunset', 'theme-night');
    wallStageViewport.classList.add(`theme-${theme}`);

    if (atmosphereGroup) {
      atmosphereGroup.querySelectorAll('.stage-chip-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
      });
    }
  }

  // Shuffle Design (Surprise Me with realistic combinations)
  function shuffleDesign() {
    const patternKeys = Object.keys(WALL_PATTERNS);
    const validColors = WALL_COLORS;

    currentPlates = currentPlates.map((_, i) => {
      // Top tier often decorative (brick, floral, rockface, medallion)
      const pat = i === 0 
        ? ['brick', 'floral', 'rockface', 'medallion'][Math.floor(Math.random() * 4)] 
        : patternKeys[Math.floor(Math.random() * patternKeys.length)];
      // In 60% of shuffles, keep natural raw concrete
      const colObj = Math.random() > 0.4 ? validColors[0] : validColors[Math.floor(Math.random() * validColors.length)];
      return { pattern: pat, color: colObj.hex, opacity: colObj.opacity };
    });

    const pillarColObj = Math.random() > 0.3 ? validColors[0] : validColors[Math.floor(Math.random() * validColors.length)];
    activePillarColor = pillarColObj.hex;
    activePillarOpacity = pillarColObj.opacity;
    renderWallStage();
  }

  // Reset to Standard (Manjavayal Site Wall - Reference-1)
  function resetStandard() {
    currentWallHeight = 5;
    activePillarColor = '#b1a99e';
    activePillarOpacity = 0;
    currentPlates = [
      { pattern: 'brick', color: '#b1a99e', opacity: 0 },
      { pattern: 'medallion', color: '#b1a99e', opacity: 0 },
      { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
      { pattern: 'trellis', color: '#b1a99e', opacity: 0 },
      { pattern: 'medallion', color: '#b1a99e', opacity: 0 }
    ];
    selectedSlotIndex = 0;
    setWallHeight(5);
    setAtmosphere('day');
  }

  // Event Listeners for Wall Studio
  if (heightToggleGroup) {
    heightToggleGroup.querySelectorAll('.stage-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const h = parseInt(btn.getAttribute('data-height'), 10);
        setWallHeight(h);
      });
    });
  }

  if (atmosphereGroup) {
    atmosphereGroup.querySelectorAll('.stage-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setAtmosphere(theme);
      });
    });
  }

  if (btnShuffleDesign) btnShuffleDesign.addEventListener('click', shuffleDesign);
  if (btnResetDesign) btnResetDesign.addEventListener('click', resetStandard);

  if (btnRibbonMoveUp) {
    btnRibbonMoveUp.addEventListener('click', () => {
      if (selectedSlotIndex > 0) movePlateSlot(selectedSlotIndex, selectedSlotIndex - 1);
    });
  }

  if (btnRibbonMoveDown) {
    btnRibbonMoveDown.addEventListener('click', () => {
      if (selectedSlotIndex < currentPlates.length - 1) movePlateSlot(selectedSlotIndex, selectedSlotIndex + 1);
    });
  }

  if (btnApplyPatternAll) {
    btnApplyPatternAll.addEventListener('click', () => {
      const curPat = currentPlates[selectedSlotIndex].pattern;
      currentPlates.forEach(p => p.pattern = curPat);
      renderWallStage();
    });
  }

  // Studio tabs switcher
  const studioTabBtns = document.querySelectorAll('.studio-tab-btn');
  const studioTabPanes = document.querySelectorAll('.studio-tab-pane');

  studioTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      studioTabBtns.forEach(b => b.classList.remove('active'));
      studioTabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(tabId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Paint target selector (selected plate, all plates, pillars)
  if (paintTargetSwitch) {
    paintTargetSwitch.querySelectorAll('.target-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        paintTargetSwitch.querySelectorAll('.target-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activePaintTarget = chip.getAttribute('data-target');
        renderColorsUI();
      });
    });
  }

  // Initialize Designer
  if (wallPlatesColumn) {
    renderWallStage();
  }

  // Connect Site Gallery cards & Workshop Plates to 3D Wall Studio
  document.querySelectorAll('.btn-load-site-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      const foundPreset = WALL_PRESETS.find(p => p.id === presetId);
      if (foundPreset) {
        applyPreset(foundPreset);
        const designerEl = document.getElementById('wall-designer');
        if (designerEl) {
          designerEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  document.querySelectorAll('.btn-try-plate').forEach(btn => {
    btn.addEventListener('click', () => {
      const patId = btn.getAttribute('data-pattern');
      if (WALL_PATTERNS[patId]) {
        currentPlates[selectedSlotIndex].pattern = patId;
        renderWallStage();
        const tabPatternsBtn = document.getElementById('tabPatternsBtn');
        if (tabPatternsBtn) tabPatternsBtn.click();
        const designerEl = document.getElementById('wall-designer');
        if (designerEl) {
          designerEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Bilingual hook
  window.updateDesignerLanguage = function() {
    if (wallPlatesColumn) {
      renderWallStage();
    }
  };

  // Responsive window resize handler for wall pillars
  window.addEventListener('resize', () => {
    if (wallPlatesColumn) {
      const firstPlate = wallPlatesColumn.querySelector('.plate-item');
      const plateHeight = firstPlate && firstPlate.offsetHeight > 0 ? firstPlate.offsetHeight : 82;
      const postHeightPx = Math.round((currentWallHeight * (plateHeight + 1.5)) + 26);
      if (postLeft) {
        const shaft = postLeft.querySelector('.post-shaft');
        if (shaft) shaft.style.height = `${postHeightPx}px`;
      }
      if (postRight) {
        const shaft = postRight.querySelector('.post-shaft');
        if (shaft) shaft.style.height = `${postHeightPx}px`;
      }
    }
  });
});
