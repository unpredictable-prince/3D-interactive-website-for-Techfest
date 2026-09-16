/* ==========================================================================
   TECHFEST 2026 // The Cyber-Physical Era
   Main JavaScript Module: Audio FX, Three.js 3D Core, GSAP Choreography, UI
   ========================================================================== */

/* ==========================================================================
   1. SYNTHESIZED WEB AUDIO SOUND SYSTEM (Pure Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, type, duration, gainValue = 0.1) {
  if (!soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
}

function playCyberChime() {
  playTone(587.33, 'sine', 0.2, 0.08); // D5
  setTimeout(() => playTone(880, 'triangle', 0.3, 0.08), 80); // A5
  setTimeout(() => playTone(1174.66, 'sine', 0.4, 0.08), 160); // D6
}

function playWarpSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

const audioToggleBtn = document.getElementById('audio-toggle-btn');
const audioIcon = document.getElementById('audio-icon');
const audioLabel = document.getElementById('audio-label');

if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      initAudio();
      audioIcon.className = 'fa-solid fa-volume-high text-cyber-cyan';
      audioLabel.innerText = 'SFX: ON';
      playCyberChime();
    } else {
      audioIcon.className = 'fa-solid fa-volume-xmark text-cyber-magenta';
      audioLabel.innerText = 'SFX: OFF';
    }
  });
}

// Add click audio feedback to all buttons and links
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('click', () => {
    if (soundEnabled) playTone(440, 'sine', 0.1, 0.03);
  });
});


/* ==========================================================================
   2. THREE.JS 3D HERO OBJECT & PARTICLE FIELD SCENE
   ========================================================================== */
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

// Perspective Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 7.5);

// WebGL Renderer with High-Performance Config
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Multi-Point Lighting Configuration
const ambientLight = new THREE.AmbientLight(0x0a1128, 1.5);
scene.add(ambientLight);

const cyanKeyLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
cyanKeyLight.position.set(5, 5, 5);
scene.add(cyanKeyLight);

const magentaRimLight = new THREE.PointLight(0xff007f, 3.5, 50);
magentaRimLight.position.set(-6, -4, -2);
scene.add(magentaRimLight);

const purpleCoreLight = new THREE.PointLight(0xb026ff, 3.0, 30);
purpleCoreLight.position.set(0, 0, 0);
scene.add(purpleCoreLight);


// ==========================================
// PROCEDURAL 3D CYBER CORE HIERARCHY
// ==========================================
const coreMasterGroup = new THREE.Group();
scene.add(coreMasterGroup);

// 1. Inner Glowing Faceted Core Sphere
const innerCoreGeo = new THREE.IcosahedronGeometry(1.0, 3);
const innerCoreMat = new THREE.MeshStandardMaterial({
  color: 0x05070f,
  emissive: 0xb026ff,
  emissiveIntensity: 0.8,
  roughness: 0.1,
  metalness: 0.9,
  wireframe: false
});
const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
coreMasterGroup.add(innerCore);

// 2. Inner Glowing Wireframe Structure
const innerWireGeo = new THREE.IcosahedronGeometry(1.02, 2);
const innerWireMat = new THREE.MeshBasicMaterial({
  color: 0x00f0ff,
  wireframe: true,
  transparent: true,
  opacity: 0.7
});
const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat);
coreMasterGroup.add(innerWire);

// 3. Middle Nested Geometric Polyhedron (Deconstructible Layer)
const midCageGeo = new THREE.DodecahedronGeometry(1.5, 0);
const midCageMat = new THREE.MeshStandardMaterial({
  color: 0x00f0ff,
  emissive: 0x00f0ff,
  emissiveIntensity: 0.4,
  wireframe: true,
  roughness: 0.2,
  metalness: 0.8
});
const midCage = new THREE.Mesh(midCageGeo, midCageMat);
coreMasterGroup.add(midCage);

// 4. Outer Cyber Orbital Rings
const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
const ring1Mat = new THREE.MeshStandardMaterial({
  color: 0x00f0ff,
  emissive: 0x00f0ff,
  emissiveIntensity: 0.9,
  roughness: 0.2,
  metalness: 0.9
});
const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
ring1.rotation.x = Math.PI / 3;
coreMasterGroup.add(ring1);

const ring2Geo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
const ring2Mat = new THREE.MeshStandardMaterial({
  color: 0xff007f,
  emissive: 0xff007f,
  emissiveIntensity: 0.8,
  roughness: 0.2,
  metalness: 0.9
});
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
ring2.rotation.y = Math.PI / 4;
ring2.rotation.z = Math.PI / 6;
coreMasterGroup.add(ring2);

const ring3Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
const ring3Mat = new THREE.MeshStandardMaterial({
  color: 0xb026ff,
  emissive: 0xb026ff,
  emissiveIntensity: 0.7,
  roughness: 0.2,
  metalness: 0.9
});
const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
ring3.rotation.x = -Math.PI / 4;
coreMasterGroup.add(ring3);

// 5. Floating Orbital Satellite Nodes
const satellitesGroup = new THREE.Group();
const satelliteNodes = [];
const numSatellites = 6;
const satGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);

for (let i = 0; i < numSatellites; i++) {
  const satMat = new THREE.MeshStandardMaterial({
    color: i % 2 === 0 ? 0x00f0ff : 0xff007f,
    emissive: i % 2 === 0 ? 0x00f0ff : 0xff007f,
    emissiveIntensity: 1.0,
    metalness: 0.8,
    roughness: 0.2
  });
  const sat = new THREE.Mesh(satGeo, satMat);
  const angle = (i / numSatellites) * Math.PI * 2;
  const radius = 2.9;
  sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.8, Math.sin(angle) * radius);
  sat.userData = { angle: angle, speed: 0.015 + (i * 0.003), radius: radius };
  satellitesGroup.add(sat);
  satelliteNodes.push(sat);
}
coreMasterGroup.add(satellitesGroup);


// ==========================================
// 1,800+ INTERACTIVE DATA PARTICLE FIELD
// ==========================================
const particleCount = 1800;
const particleGeo = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);

const palette = [
  new THREE.Color(0x00f0ff), // Cyan
  new THREE.Color(0xb026ff), // Purple
  new THREE.Color(0xff007f), // Magenta
  new THREE.Color(0x0070f3), // Blue
  new THREE.Color(0xffffff)  // White
];

for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  particlePositions[i3] = (Math.random() - 0.5) * 35;
  particlePositions[i3 + 1] = (Math.random() - 0.5) * 35;
  particlePositions[i3 + 2] = (Math.random() - 0.5) * 35;

  const col = palette[Math.floor(Math.random() * palette.length)];
  particleColors[i3] = col.r;
  particleColors[i3 + 1] = col.g;
  particleColors[i3 + 2] = col.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.065,
  vertexColors: true,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending
});

const particleField = new THREE.Points(particleGeo, particleMat);
scene.add(particleField);


// ==========================================
// MOUSE INTERACTION & DAMPING
// ==========================================
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
});


// ==========================================
// 3. GSAP SCROLLTRIGGER CAMERA CHOREOGRAPHY
// ==========================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Scroll: Hero -> About Section
  gsap.to(coreMasterGroup.position, {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: 2.2,
    y: -0.3,
    z: 0
  });

  gsap.to(midCage.scale, {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: 1.4,
    y: 1.4,
    z: 1.4
  });

  // 2. Scroll: About -> Tracks Section
  gsap.to(coreMasterGroup.position, {
    scrollTrigger: {
      trigger: "#tracks",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: -2.6,
    y: 1.2,
    z: -0.5
  });

  gsap.to(coreMasterGroup.rotation, {
    scrollTrigger: {
      trigger: "#tracks",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: Math.PI / 4,
    z: Math.PI / 3
  });

  // 3. Scroll: Tracks -> Schedule Section
  gsap.to(coreMasterGroup.position, {
    scrollTrigger: {
      trigger: "#schedule",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: 0,
    y: -1.8,
    z: -2.0
  });

  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "#schedule",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    y: 2.5,
    z: 6.5
  });

  // 4. Scroll: Schedule -> Prizes / Submission Section
  gsap.to(coreMasterGroup.position, {
    scrollTrigger: {
      trigger: "#prizes",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: 0,
    y: 0.2,
    z: 1.0
  });

  gsap.to(midCage.scale, {
    scrollTrigger: {
      trigger: "#prizes",
      start: "top bottom",
      end: "center center",
      scrub: 1
    },
    x: 1.8,
    y: 1.8,
    z: 1.8
  });
}


// ==========================================
// ANIMATION RENDER LOOP (Locked 60 FPS)
// ==========================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Mouse damping
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;

  // Base rotations
  innerCore.rotation.y = elapsedTime * 0.35;
  innerCore.rotation.x = elapsedTime * 0.2;
  innerWire.rotation.y = -elapsedTime * 0.25;

  midCage.rotation.y = elapsedTime * 0.15;
  midCage.rotation.z = elapsedTime * 0.1;

  ring1.rotation.z = elapsedTime * 0.4;
  ring2.rotation.x = -elapsedTime * 0.3;
  ring3.rotation.y = elapsedTime * 0.25;

  // Orbiting satellite nodes
  satelliteNodes.forEach(sat => {
    sat.userData.angle += sat.userData.speed;
    sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
    sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
    sat.position.y = Math.sin(sat.userData.angle * 2) * 0.6;
    sat.rotation.x += 0.02;
    sat.rotation.y += 0.03;
  });

  // Central emissive pulse
  purpleCoreLight.intensity = 2.5 + Math.sin(elapsedTime * 3) * 1.0;
  innerCoreMat.emissiveIntensity = 0.7 + Math.sin(elapsedTime * 3) * 0.4;

  // Parallax response from cursor
  coreMasterGroup.rotation.x += (mouse.y * 0.4 - (coreMasterGroup.rotation.x % (Math.PI * 2))) * 0.03;
  coreMasterGroup.rotation.y += (mouse.x * 0.4 - (coreMasterGroup.rotation.y % (Math.PI * 2))) * 0.03;

  // Particle Field drift & cursor response
  particleField.rotation.y = elapsedTime * 0.02 + mouse.x * 0.1;
  particleField.rotation.x = mouse.y * 0.1;

  renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
});


/* ==========================================================================
   4. UI LOGIC: SCHEDULE SWITCHER, CARD TILT, COUNTDOWN, MODALS & COUNTERS
   ========================================================================== */

// 1. Dynamic Schedule Data & Switcher
const scheduleData = {
  1: [
    { time: "09:00 AM", title: "Genesis Check-in & Hardware Badge Distribution", venue: "Metropolis Cyber Arena", category: "Opening", color: "border-cyber-cyan text-cyber-cyan" },
    { time: "11:00 AM", title: "Opening Keynote: Autonomous Swarms in Deep Space", speaker: "Dr. Elena Vance (NASA JPL / MIT)", venue: "Quantum Main Stage", category: "Keynote", color: "border-cyber-purple text-cyber-purple" },
    { time: "01:00 PM", title: "Hackathon Genesis: Problem Statements Released & Hacking Commences", venue: "Main Matrix Hall", category: "Hackathon", color: "border-cyber-green text-cyber-green" },
    { time: "04:30 PM", title: "Workshop: Building Scalable Zero-Knowledge Proofs", speaker: "Satoshi Lab Core Devs", venue: "Lab Alpha", category: "Workshop", color: "border-cyber-magenta text-cyber-magenta" },
    { time: "09:00 PM", title: "Midnight Cyber Synthwave Mixer & Gaming Tourney", venue: "Rooftop Lounge", category: "Social", color: "border-cyber-yellow text-cyber-yellow" }
  ],
  2: [
    { time: "08:30 AM", title: "Neural Code Sprint & Mentor Office Hours", venue: "Matrix Pods 1-10", category: "Mentorship", color: "border-cyber-cyan text-cyber-cyan" },
    { time: "11:30 AM", title: "Live Swarm Robotics Arena: Autonomous Obstacle Bypass", venue: "Kinematics Colosseum", category: "Arena", color: "border-cyber-yellow text-cyber-yellow" },
    { time: "02:00 PM", title: "Fireside: The Future of Agentic Foundation Models", speaker: "OpenSource AI Consortium", venue: "Quantum Main Stage", category: "Keynote", color: "border-cyber-purple text-cyber-purple" },
    { time: "06:00 PM", title: "Security Capture-The-Flag (CTF) Showdown", venue: "Cipher Defense Dome", category: "Competition", color: "border-cyber-magenta text-cyber-magenta" },
    { time: "11:59 PM", title: "Soft Checkpoint & Code Submission Freeze Preparation", venue: "Online Portal", category: "Milestone", color: "border-cyber-green text-cyber-green" }
  ],
  3: [
    { time: "09:00 AM", title: "Final Code & Prototype Submission Deadline", venue: "Global Portal", category: "Deadline", color: "border-cyber-magenta text-cyber-magenta" },
    { time: "10:30 AM", title: "Top 20 Project Live Demos & VC Pitch Showcase", venue: "Grand Amphitheater", category: "Demos", color: "border-cyber-cyan text-cyber-cyan" },
    { time: "02:30 PM", title: "Keynote: Bio-Cybernetic Interfaces for the Next Century", speaker: "Dr. Marcus Thorne", venue: "Main Stage", category: "Keynote", color: "border-cyber-purple text-cyber-purple" },
    { time: "04:30 PM", title: "Grand Awards Gala & $50,000 Prize Distribution", venue: "Grand Amphitheater", category: "Ceremony", color: "border-cyber-yellow text-cyber-yellow" },
    { time: "07:00 PM", title: "Official Afterparty & Neon Drone Light Show", venue: "Metropolis Plaza", category: "Afterparty", color: "border-cyber-green text-cyber-green" }
  ]
};

function renderSchedule(day) {
  const container = document.getElementById('schedule-container');
  if (!container) return;
  const items = scheduleData[day] || scheduleData[1];
  
  container.innerHTML = items.map(item => `
    <div class="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyber-cyan/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:translate-x-1">
      <div class="flex items-start sm:items-center space-x-4">
        <div class="font-mono text-sm font-bold text-white bg-obsidian/80 px-3 py-1.5 rounded-xl border border-white/10 whitespace-nowrap">
          ${item.time}
        </div>
        <div>
          <h4 class="font-syne font-bold text-base text-white group-hover:text-cyber-cyan transition-colors">${item.title}</h4>
          <div class="flex items-center space-x-3 text-xs font-space text-slate-400 mt-1">
            ${item.speaker ? `<span><i class="fa-solid fa-microphone-lines text-cyber-purple mr-1"></i> ${item.speaker}</span>` : ''}
            <span><i class="fa-solid fa-location-dot text-cyber-cyan mr-1"></i> ${item.venue}</span>
          </div>
        </div>
      </div>
      <div>
        <span class="inline-block px-3 py-1 rounded-full text-[11px] font-mono border ${item.color} bg-white/5">
          ${item.category}
        </span>
      </div>
    </div>
  `).join('');
}

function switchScheduleDay(day) {
  [1, 2, 3].forEach(d => {
    const tab = document.getElementById(`day-tab-${d}`);
    if (tab) {
      if (d === day) {
        tab.className = 'px-5 py-2.5 rounded-xl font-space text-xs sm:text-sm font-bold uppercase tracking-wider transition-all bg-cyber-cyan text-obsidian shadow-neon-cyan';
      } else {
        tab.className = 'px-5 py-2.5 rounded-xl font-space text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-slate-400 hover:text-white';
      }
    }
  });
  renderSchedule(day);
}
renderSchedule(1);


// 2. 3D Card Mouse Tilt Interaction
function handleCardTilt(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
}

function resetCardTilt(card) {
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
}


// 3. Live Countdown Timer
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 12);
targetDate.setHours(targetDate.getHours() + 18);

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const dEl = document.getElementById('countdown-days');
    const hEl = document.getElementById('countdown-hours');
    const mEl = document.getElementById('countdown-mins');
    const sEl = document.getElementById('countdown-secs');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();


// 4. Animated Numerical Counters (Triggered on scroll)
let countersAnimated = false;
if (typeof ScrollTrigger !== 'undefined') {
  ScrollTrigger.create({
    trigger: "#prizes",
    start: "top 75%",
    onEnter: () => {
      if (!countersAnimated) {
        countersAnimated = true;
        document.querySelectorAll('.stat-counter').forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const isCurrency = target >= 50000;
          const duration = 2000;
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.innerText = isCurrency ? `$${currentVal.toLocaleString()}+` : `${currentVal.toLocaleString()}+`;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            }
          }
          requestAnimationFrame(updateNumber);
        });
      }
    }
  });
}


// 5. REGISTRATION MODAL & CELEBRATION
function triggerConfettiCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#b026ff', '#ff007f', '#ffd700']
    });
  }
}

const regModal = document.getElementById('registration-modal');
const regModalBox = document.getElementById('registration-modal-box');
const regTrackSelect = document.getElementById('reg-track-select');

function openRegistrationModal(preselectedTrack = null) {
  playWarpSound();
  if (preselectedTrack && regTrackSelect) {
    regTrackSelect.value = preselectedTrack;
  }
  if (regModal && regModalBox) {
    regModal.classList.remove('hidden');
    setTimeout(() => {
      regModal.classList.remove('opacity-0');
      regModalBox.classList.remove('scale-95');
    }, 10);
  }
}

function closeRegistrationModal() {
  if (regModal && regModalBox) {
    regModal.classList.add('opacity-0');
    regModalBox.classList.add('scale-95');
    setTimeout(() => {
      regModal.classList.add('hidden');
      const form = document.getElementById('registration-form');
      const result = document.getElementById('pass-result');
      if (form) {
        form.reset();
        form.classList.remove('hidden');
      }
      if (result) result.classList.add('hidden');
    }, 300);
  }
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  playCyberChime();
  triggerConfettiCelebration();
  const form = document.getElementById('registration-form');
  const result = document.getElementById('pass-result');
  if (form) form.classList.add('hidden');
  if (result) result.classList.remove('hidden');
}


// 6. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Close modals on clicking backdrop
if (regModal) {
  regModal.addEventListener('click', (e) => {
    if (e.target === regModal) closeRegistrationModal();
  });
}

// Global exposure for inline HTML event handlers
window.openRegistrationModal = openRegistrationModal;
window.closeRegistrationModal = closeRegistrationModal;
window.handleRegistrationSubmit = handleRegistrationSubmit;
window.switchScheduleDay = switchScheduleDay;
window.handleCardTilt = handleCardTilt;
window.resetCardTilt = resetCardTilt;
