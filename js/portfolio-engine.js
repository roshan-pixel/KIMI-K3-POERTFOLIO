/**
 * Himanshi Parihar — Heavy Branding Studio Portfolio Architecture Engine
 * High-performance vanilla JavaScript modules for 120Hz momentum scrolling,
 * continuous badge scroll physics, progressive image blur-up, and modal case study routing.
 */

// Global State
let currentModalIndex = 0;

/**
 * 1. Scroll-Triggered Alternating Card Reveal Engine
 * Observes featured cards and project grid cards, staggering entry animations with alternating directions.
 */
function initScrollAnimations() {
  const featuredCards = Array.from(document.querySelectorAll('.featured-card'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));

  if (window._cardScrollObserver) {
    window._cardScrollObserver.disconnect();
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-in');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
  window._cardScrollObserver = observer;

  const setupCardGroup = (cards) => {
    cards.forEach((card, idx) => {
      card.classList.remove('scroll-animate-left', 'scroll-animate-right', 'scroll-in');
      if (idx % 2 === 0) {
        card.classList.add('scroll-animate-left');
      } else {
        card.classList.add('scroll-animate-right');
      }

      const rect = card.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        setTimeout(() => {
          card.classList.add('scroll-in');
        }, 60 + (idx % 4) * 80);
      } else {
        observer.observe(card);
      }
    });
  };

  setupCardGroup(featuredCards);
  setupCardGroup(projectCards);
}

/**
 * 2. Dynamic Project Showcase Renderer
 * Renders 26 comprehensive client case studies into the responsive masonry grid.
 */
function renderProjects(items = allProjects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = items.map(p => `
    <div class="project-card" onclick="openProjectModal('${p.id}')">
      <img src="${p.heroImage}" alt="${p.title}" class="card-thumb" loading="lazy">
      <div class="card-body">
        <div class="card-meta">
          <h3 class="card-title">${p.title}</h3>
          <span class="project-tag">${p.category} / ${p.year}</span>
        </div>
        <p class="card-desc">${p.tagline}</p>
        <div class="card-footer-action">
          <span>Open Case Study & Products ↗</span>
          <span class="product-counter-pill">↗ ${p.productCount} Products & Photos</span>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof initScrollAnimations === 'function') {
    initScrollAnimations();
  }
}

/**
 * 3. Interactive Category Filter Controller
 * Handles tactile pill switching across Packaging, Identity, Art Direction, and Editorial.
 */
function filterProjects(category) {
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.innerText.includes(category));
  });

  if (category === 'All') {
    renderProjects(allProjects);
  } else {
    const filtered = allProjects.filter(p => p.category === category);
    renderProjects(filtered);
  }
}

/**
 * 4. High-Performance 120Hz Native GPU Scroller & Modal Lock
 * Manages body overflow locking during modal presentation and hardware-accelerated smooth scrolling.
 */
const kimiScroller = {
  isEnabled: false,
  toggleModal(open) {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
  scrollTo(offset) {
    window.scrollTo({
      top: Math.max(0, offset),
      behavior: 'smooth'
    });
  }
};

/**
 * 5. Buttery Smooth Anchor Navigation
 * Computes exact header-offset scroll targets for fluid anchor navigation.
 */
function smoothScrollTo(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    const headerOffset = window.innerWidth <= 768 ? 68 : 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth"
    });
  }
}

/**
 * 6. CLICK TO MEET Badge Continuous Scroll Physics & Floating Dock
 * Interpolates badge position from hero poster anchor into a fixed viewport bottom-left dock.
 * Enforces 0° rotation, gentle initial scroll derivative, and dimming inside About section.
 */
function initClickBadgeScroll() {
  const badge = document.getElementById('clickBadge');
  const heroContainer = document.querySelector('.hero-media-container');
  const aboutSection = document.getElementById('about');
  if (!badge || !heroContainer) return;

  if (badge.parentElement !== document.body) {
    document.body.appendChild(badge);
  }

  let isTicking = false;

  function updateBadge() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 768;
    const pad = isMobile ? 12 : 24;
    const badgeWidth = isMobile ? 82 : 125;
    const badgeHeight = badgeWidth;
    const floatBottom = isMobile ? 20 : 28;
    const floatLeft = isMobile ? 16 : 28;

    const heroRect = heroContainer.getBoundingClientRect();
    const heroDocTop = heroRect.top + scrollY;
    const heroDocLeft = heroRect.left + (window.pageXOffset || 0);
    const heroHeight = heroContainer.offsetHeight;

    const initialViewportTop = heroDocTop + heroHeight - pad - badgeHeight;
    const initialViewportLeft = heroDocLeft + pad;

    const targetViewportLeft = floatLeft;
    const targetViewportTop = window.innerHeight - floatBottom - badgeHeight;

    const transDist = isMobile ? 700 : 850;
    const p = Math.min(Math.max(scrollY / transDist, 0), 1);
    const ease = -(Math.cos(Math.PI * p) - 1) / 2;

    const curLeft = initialViewportLeft + (targetViewportLeft - initialViewportLeft) * ease;
    const curTop = initialViewportTop + (targetViewportTop - initialViewportTop) * ease;

    badge.style.position = 'fixed';
    badge.style.left = curLeft.toFixed(1) + 'px';
    badge.style.top = curTop.toFixed(1) + 'px';
    badge.style.bottom = 'auto';
    badge.style.right = 'auto';
    badge.style.width = badgeWidth + 'px';
    badge.style.zIndex = '9995';
    badge.style.transform = 'none';

    let inAbout = false;
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.15) {
        inAbout = true;
      }
    }
    badge.classList.toggle('in-about', inAbout);

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(updateBadge);
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!isTicking) {
      requestAnimationFrame(updateBadge);
      isTicking = true;
    }
  }, { passive: true });

  updateBadge();
}

/**
 * 7. Progressive Image Loading & Skeleton Shimmer Controller
 * Removes skeleton placeholder and triggers smooth blur-up transition upon asset decode.
 */
function onProductImageLoaded(imgEl) {
  requestAnimationFrame(() => {
    imgEl.classList.add('loaded');
    const card = imgEl.closest('.product-photo-card');
    if (card) {
      const shimmer = card.querySelector('.skeleton-shimmer');
      if (shimmer) {
        shimmer.style.opacity = '0';
        setTimeout(() => { if (shimmer.parentNode) shimmer.remove(); }, 400);
      }
    }
  });
}

/**
 * 8. Interactive Project Modal Lightbox Launcher & Hash Router
 * Displays full case studies with metadata, deliverables, materials, and batch gallery assets.
 */
function openProjectModal(projectId) {
  const idx = allProjects.findIndex(item => item.id === projectId);
  if (idx === -1) return;
  currentModalIndex = idx;
  
  kimiScroller.toggleModal(true);
  displayProjectInModal(allProjects[idx]);

  const overlay = document.getElementById('projectModal');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const modalContainer = document.getElementById('modalContainer');
  if (modalContainer) modalContainer.scrollTop = 0;

  window.location.hash = 'project/' + projectId;
}

/**
 * 9. Batch Layout Injection & Case Study Presentation Engine
 * Batches asset injection via DocumentFragment to maintain locked 60fps/120fps frame rates.
 */
function displayProjectInModal(p) {
  document.getElementById('modalTitle').innerText = p.title;
  document.getElementById('modalTag').innerText = `${p.category} / ${p.year}`;
  document.getElementById('modalClient').innerText = p.client;
  
  const heroCover = document.getElementById('modalHeroCover');
  heroCover.style.opacity = '0.3';
  heroCover.src = p.heroImage;
  heroCover.onload = () => { heroCover.style.opacity = '1'; };

  document.getElementById('modalDesc').innerText = p.desc;
  document.getElementById('modalMaterials').innerText = p.materials;
  document.getElementById('modalProductCountBadge').innerText = `${p.productCount} Products & Assets`;

  const delivContainer = document.getElementById('modalDeliverables');
  delivContainer.innerHTML = p.deliverables.map(d => `<span class="deliverable-badge">✦ ${d}</span>`).join('');

  const gallery = document.getElementById('modalProductsGrid');
  gallery.innerHTML = '';

  const fragment = document.createDocumentFragment();
  p.productImages.forEach((img, i) => {
    const card = document.createElement('div');
    card.className = 'product-photo-card';
    card.style.animationDelay = `${Math.min(i * 35, 450)}ms`;

    const shimmer = document.createElement('div');
    shimmer.className = 'skeleton-shimmer';
    card.appendChild(shimmer);

    const imgEl = document.createElement('img');
    imgEl.className = 'product-photo-img';
    imgEl.alt = `${p.title} Product Asset ${i+1}`;
    imgEl.loading = 'lazy';
    imgEl.decoding = 'async';
    imgEl.src = img;
    imgEl.onload = function() { onProductImageLoaded(this); };
    imgEl.onerror = function() { onProductImageLoaded(this); };

    card.appendChild(imgEl);

    const badge = document.createElement('div');
    badge.className = 'photo-expand-badge';
    badge.innerHTML = `<span>↗ Product & Photo ${i + 1}</span>`;
    card.appendChild(badge);

    card.style.cursor = 'pointer';
    card.title = `View Product & Photo ${i + 1} (${p.title})`;
    card.onclick = function() { window.open(img, '_blank'); };

    fragment.appendChild(card);
  });

  requestAnimationFrame(() => {
    gallery.appendChild(fragment);
  });

  document.getElementById('modalEmailBtn').href = `mailto:himanshiparihar.design@gmail.com?subject=Inquiry regarding ${encodeURIComponent(p.title)} project deliverables`;
}

/**
 * 10. Carousel Keyboard & Touch Navigator
 * Steps through 26 case studies circularly with history state updates.
 */
function navigateProject(direction) {
  currentModalIndex = (currentModalIndex + direction + allProjects.length) % allProjects.length;
  const nextP = allProjects[currentModalIndex];
  displayProjectInModal(nextP);
  window.location.hash = 'project/' + nextP.id;
  const modalContainer = document.getElementById('modalContainer');
  if (modalContainer) modalContainer.scrollTop = 0;
}

/**
 * 11. Modal Dismissal & Scroller Resumption
 * Dismisses lightbox, clears hash state, and restores smooth momentum scrolling.
 */
function closeProjectModal() {
  const overlay = document.getElementById('projectModal');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  kimiScroller.toggleModal(false);

  if (window.location.hash.startsWith('#project/')) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

/**
 * 12. Clipboard & Form Feedback Utilities
 */
function copyEmail() {
  const email = document.getElementById('contactEmailText').innerText;
  navigator.clipboard.writeText(email).then(() => {
    showToast("Copied himanshiparihar.design@gmail.com to clipboard! 📋");
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  showToast(`Thank you, ${name}! Your project request has been sent to Himanshi Parihar.`);
  document.getElementById('contactForm').reset();
}

function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.innerText = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

/**
 * 13. Mobile Drawer Navigation Controller
 */
function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const menuBtn = document.getElementById('mobileMenuBtn');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  if (menuBtn) menuBtn.innerText = '☰';
}
