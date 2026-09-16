# TECHFEST 2026 // The Cyber-Physical Era 🌐⚡

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **"Where Silicon Meets Synapse."**  
> A high-performance, production-ready 3D interactive web application for an annual collegiate technology festival. Featuring procedural WebGL geometry, multi-layer ambient particle systems, GSAP ScrollTrigger camera choreography, perspective 3D tilt cards, synthesized Web Audio SFX, and complete interactive registration & submission portals.

---

## 🌟 Key Highlights & Visual Features

1. **Procedural 3D Cyber Core (Three.js):**
   - Central glowing metallic icosahedron core with pulsing emissive purple/magenta shaders.
   - Nested deconstructible wireframe dodecahedron cages.
   - Orbiting cyan/magenta rings and revolving satellite nodes with real-time coordinate transformations.

2. **1,800+ Floating Interactive Particle Field:**
   - Distributed 3D volume stardust and data matrix particles.
   - Smooth cursor parallax and inertia damping (`mouse lerping`).

3. **GSAP ScrollTrigger Camera Choreography:**
   - **Hero View:** Central focal point with interactive floating nodes.
   - **About Section:** Dynamic camera track, wireframe cage expansion (deconstruction), and multi-axis rotation.
   - **Competition Tracks:** Viewport framing tilt toward top-right corner to complement the interactive track cards.
   - **Schedule & Prize Pool:** Top-down perspective orbit with accelerating particle flow.

4. **Interactive UI & Feature Modals:**
   - **"Build in 3D" Submission Portal:** High-fidelity challenge task modal with `100 🪙` token badge, validation, and confetti celebration.
   - **Hacker Registration Portal:** Multi-field validation, track picker, and dynamic digital **Hacker Pass Generation**.
   - **3D Perspective Tilt Cards:** Real-time mouse coordinate physics on hover across all 4 competition tracks.
   - **Schedule Timeline Switcher:** Dynamic Day 01, 02, and 03 agenda switcher.
   - **Synthesized Web Audio Engine:** Pure Web Audio API futuristic sound feedback (no external asset dependencies).

---

## 📁 Modular Project Structure

```
├── index.html          # Semantic HTML structure & CDN references
├── css/
│   └── style.css       # Glassmorphism, animations, custom scanlines & 3D tilt styles
├── js/
│   └── main.js         # Three.js 3D scene, Web Audio synthesizer, GSAP choreography & UI logic
└── README.md           # Project overview, tech stack documentation & instructions
```

---

## 🚀 Quick Start (Zero Build Step Required)

### Option 1: Direct Browser Launch
Simply open [`index.html`](index.html) directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server
```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```
Navigate to `http://localhost:8080` in your browser.

---

## 🛠️ Technology Stack

- **Core:** HTML5, Modern ES6+ JavaScript, CSS3
- **3D Engine:** [Three.js](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) (r128)
- **Animation Engine:** [GSAP](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Styling:** [Tailwind CSS CDN](https://tailwindcss.com) + Custom Cyberpunk Glassmorphism
- **Typography:** Google Fonts (`Syne`, `Outfit`, `Space Grotesk`, `JetBrains Mono`)
- **Icons:** FontAwesome 6
- **Effects:** Canvas Confetti & Web Audio API Oscillator Nodes

---

## 🏆 Competition Tracks

| Track | Prize Pool | Tech Stack Focus |
| :--- | :--- | :--- |
| **RoboGenesis: Swarm Systems** | **$15,000** | ROS2, Computer Vision, Kinematics, C++ / Rust |
| **NeuralNexus: Agentic AI** | **$15,000** | PyTorch, Multi-Agent Swarms, Diffusion Models |
| **CipherMatrix: Sec & Web3** | **$10,000** | ZK-SNARKs, Smart Contracts, Pen-Testing |
| **DimensionX: 3D & Gaming** | **$10,000** | Three.js, WebGPU, GLSL Shaders, Spatial Web |

---

## 📜 License
Released under the [MIT License](LICENSE). Built for TECHFEST 2026.