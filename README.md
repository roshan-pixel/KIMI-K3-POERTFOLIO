# Himanshi Parihar — Heavy Branding Studio Portfolio

A high-performance, buttery-smooth portfolio clone for **Himanshi Parihar** (Lead Brand & Graphic Designer at Heavy Branding Studio). Featuring 26 comprehensive client case studies, over 600 authentic packaging and brand identity assets, and cutting-edge creative front-end engineering powered by **Kimi K3**.

🌐 **Target**: Heavy Branding Studio (`https://heavy.mx/`)  
📧 **Contact**: [himanshiparihar.design@gmail.com](mailto:himanshiparihar.design@gmail.com)

---

## ✨ Features & Architecture

### 1. Buttery Smooth Inertial Momentum Scrolling
- Custom **Kimi K3 RAF Momentum Engine** with linear interpolation (`lerp: 0.082`), touch momentum physics, and wheel damping.
- Eliminates discrete mousewheel steps, delivering a floaty, luxurious studio feel.
- Seamlessly pauses momentum during modal interactions to prevent background scroll jitter.

### 2. GPU Hardware Acceleration & Paint Containment
- Utilizes CSS `content-visibility: auto; contain-intrinsic-size: 0 420px; contain: layout style paint;` across all project cards.
- Off-screen layout calculations and paint passes are skipped until scrolled into view, guaranteeing a locked 60fps/120fps refresh rate even across 26 project cards and hundreds of high-res images.
- GPU layer promotion with `transform: translateZ(0)` and `backface-visibility: hidden`.

### 3. Progressive Skeleton Shimmer & Blur-Up Image Pipeline
- **Skeleton Shimmer Placeholders**: Subtle chromatic iridescent sweep while assets decode.
- **Asynchronous Image Decoding**: Every image uses `loading="lazy"` and `decoding="async"`.
- **Progressive Blur-Up**: Images transition smoothly from `filter: blur(14px) scale(1.08) opacity(0)` to `filter: blur(0px) scale(1) opacity(1)` via `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Batch Layout Injection**: Modals render up to 32 assets using `DocumentFragment` and `requestAnimationFrame`, preventing main-thread layout freezes.

### 4. Interactive Project Case Studies & Products Showcase
- Full-screen modal lightbox (`z-index: 100000`) and 26 standalone project pages (`barsk.html`, `mayawell.html`, etc.).
- **Creative Direction & Rationale** generated with Kimi K3.
- **Tactile Material Specs**: Foil stamping, FSC uncoated stocks, custom amber glass, blind debossing.
- **Deliverables Badges**: Packaging sets, brand identity systems, retail displays, custom apparel.
- Direct email inquiry buttons pre-addressed to `himanshiparihar.design@gmail.com`.

### 5. Glittering & Color-Changing "LET'S TALK ✨" Button
- High-contrast solid black typography with an animated multi-stop chromatic rainbow gradient (`#FF1361`, `#FFF800`, `#00E4FF`, `#FF7300`).
- Specular sweep shimmer and pulsing outer glow halo.
- Present on both desktop glass header and mobile slide-out drawer.

---

## 🚀 Getting Started

To run the portfolio locally:

```bash
# Clone the repository
git clone https://github.com/roshan-pixel/KIMI-K3-POERTFOLIO.git
cd KIMI-K3-POERTFOLIO

# Start a local HTTP server
python -m http.server 8089
```

Open your browser and navigate to:
**`http://localhost:8089/index.html`**

---

## 📁 Repository Structure

```
├── index.html                   # Main long-scrolling portfolio with interactive modal
├── aledano.html                 # Standalone project page for Aledaño
├── barsk.html                   # Standalone project page for Barsk
├── heavy-2025.html              # Standalone project page for Heavy Rebrand
├── mayawell.html                # Standalone project page for Mayawell
├── ...                          # 26 standalone project HTML files
├── assets/                      # 625 authentic local product and packaging assets
├── css/                         # Inter font and stylesheet overrides
├── js/                          # Helper scripts
└── snippets/                    # Original layout snippets
```

---

## 🎨 Credits & Colophon
- **Designer**: Himanshi Parihar
- **Original Inspiration**: Heavy Branding Studio (`https://heavy.mx/`)
- **AI Acceleration & Creative Direction**: Moonshot Kimi K3
