/* =============================================
   JAVASCRIPT INFO PAGE — script.js
   Animations, interactions, canvas particles
   ============================================= */

'use strict';

// ─── CANVAS PARTICLE BACKGROUND ───────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;
  let mouse = { x: -9999, y: -9999 };

  const COLORS = ['rgba(247,201,72,', 'rgba(59,130,246,', 'rgba(16,185,129,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 1.4 + 0.3;
      this.speed = Math.random() * 0.4 + 0.1;
      this.drift = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.pulse += this.pulseSpeed;
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x += (dx / dist) * 0.5;
        this.y += (dy / dist) * 0.5;
      }
      if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
    draw() {
      const a = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + a + ')';
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    if (!particles) {
      particles = Array.from({ length: 140 }, () => new Particle());
    }
  }

  function drawConnections() {
    const MAX_DIST = 90;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(247,201,72,${0.06 * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  loop();
})();


// ─── CUSTOM CURSOR ────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    cursor.style.left = tx + 'px';
    cursor.style.top  = ty + 'px';
  });

  // Smooth trail
  function animTrail() {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    trail.style.left = cx + 'px';
    trail.style.top  = cy + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // Hover effect on interactive elements
  const interactives = 'a, button, .concept-card, .quirk-card, .eco-card, .timeline-content';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.background = 'var(--accent)';
      trail.style.width = '50px';
      trail.style.height = '50px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      trail.style.width = '32px';
      trail.style.height = '32px';
    }
  });
})();


// ─── NAVBAR ───────────────────────────────────
(function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  });

  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = 'var(--nav-h)';
    links.style.left = '0'; links.style.right = '0';
    links.style.background = 'rgba(7,11,20,0.98)';
    links.style.padding = '1.5rem';
    links.style.gap = '1.2rem';
    links.style.borderBottom = '1px solid var(--border)';
  });
})();


// ─── SCROLL REVEAL ────────────────────────────
(function initReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
})();


// ─── COUNTER ANIMATION ────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1400;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ─── TYPING ANIMATION ────────────────────────
(function initTyping() {
  const el = document.getElementById('typing-code');
  if (!el) return;

  const code = [
    `// 🌟 Bienvenido a JavaScript`,
    ``,
    `const lenguaje = {`,
    `  nombre: "JavaScript",`,
    `  año: 1995,`,
    `  creador: "Brendan Eich",`,
    `  tipado: "dinámico",`,
    `  paradigmas: [`,
    `    "funcional",`,
    `    "orientado a objetos",`,
    `    "imperativo"`,
    `  ]`,
    `};`,
    ``,
    `async function hola(nombre) {`,
    `  const saludo = \`¡Hola, \${nombre}!\`;`,
    `  console.log(saludo);`,
    `  return saludo;`,
    `}`,
    ``,
    `hola("Mundo 🚀");`
  ].join('\n');

  const syntaxMap = [
    { re: /(\/\/.+)/g,            cls: 'comment' },
    { re: /\b(const|let|var|async|function|return|await)\b/g, cls: 'kw' },
    { re: /(".*?"|'.*?'|`.*?`)/g, cls: 'str' },
    { re: /\b(\d+)\b/g,           cls: 'num' },
  ];

  function highlight(raw) {
    let safe = raw.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    syntaxMap.forEach(({ re, cls }) => {
      safe = safe.replace(re, m => `<span class="${cls}">${m}</span>`);
    });
    return safe;
  }

  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'code-cursor';

  function type() {
    if (i <= code.length) {
      const chunk = code.substring(0, i);
      el.innerHTML = highlight(chunk);
      el.appendChild(cursor);
      i++;
      setTimeout(type, i < 5 ? 80 : 25);
    }
  }

  // Start when hero is in view
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { type(); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(el);
})();


// ─── ACCORDION ────────────────────────────────
(function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
  // Open first by default
  const first = document.querySelector('.accordion-item');
  if (first) first.classList.add('open');
})();


// ─── ECOSYSTEM TABS ───────────────────────────
(function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  function activateTab(id) {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
    contents.forEach(c => {
      c.classList.toggle('active', c.id === 'tab-' + id);
    });
    // Animate eco bars in active tab
    setTimeout(() => {
      document.querySelectorAll('.tab-content.active .eco-fill').forEach(f => {
        f.classList.add('animated');
      });
    }, 100);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // Init first tab bars
  setTimeout(() => {
    document.querySelectorAll('#tab-frontend .eco-fill').forEach(f => f.classList.add('animated'));
  }, 800);
})();


// ─── CODE SNIPPETS ────────────────────────────
(function initSnippets() {
  const snippets = {
    closures: `// Closure — función que recuerda su entorno léxico
function crearContador(inicio = 0) {
  let count = inicio;          // Variable privada

  return {
    incrementar: (n = 1) => (count += n),
    decrementar: (n = 1) => (count -= n),
    reset:       ()      => (count = inicio),
    valor:       ()      => count,
  };
}

const contador = crearContador(10);
contador.incrementar(5);    // 15
contador.decrementar(3);    // 12
console.log(contador.valor()); // 12

// Closure para memoización
function memo(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fibMemo = memo(function fib(n) {
  if (n <= 1) return n;
  return fibMemo(n - 1) + fibMemo(n - 2);
});`,

    promises: `// Promises y async/await — manejo de asincronía
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUsuario(id) {
  const res = await fetch(\`/api/usuarios/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

// Promise.all — ejecución paralela
async function cargarDashboard(userId) {
  try {
    const [usuario, posts, amigos] = await Promise.all([
      fetchUsuario(userId),
      fetch(\`/api/posts/\${userId}\`).then(r => r.json()),
      fetch(\`/api/amigos/\${userId}\`).then(r => r.json()),
    ]);
    return { usuario, posts, amigos };
  } catch (err) {
    console.error("Error cargando dashboard:", err);
    throw err;
  }
}

// Promise.allSettled — tolera fallos
async function intentarTodo(promesas) {
  const resultados = await Promise.allSettled(promesas);
  const exitosos = resultados
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  return exitosos;
}`,

    classes: `// Clases ES6+ con herencia, getters y privados
class Animal {
  #nombre;        // Campo privado (ES2022)
  #energia = 100;

  constructor(nombre, especie) {
    this.#nombre  = nombre;
    this.especie  = especie;
  }

  get nombre() { return this.#nombre; }
  get energia() { return this.#energia; }

  comer(puntos = 10) {
    this.#energia = Math.min(100, this.#energia + puntos);
    return this;   // method chaining
  }

  toString() {
    return \`\${this.#nombre} (\${this.especie})\`;
  }

  static comparar(a, b) {
    return a.energia - b.energia;
  }
}

class Perro extends Animal {
  #raza;

  constructor(nombre, raza) {
    super(nombre, 'Canis lupus');
    this.#raza = raza;
  }

  ladrar() { console.log(\`\${this.nombre}: ¡Guau!\`); }
  toString() { return \`\${super.toString()} — \${this.#raza}\`; }
}

const rex = new Perro('Rex', 'Labrador');
rex.comer(20).ladrar();   // method chaining + log`,

    patterns: `// Patrones de diseño en JavaScript moderno

// 1. Observer / PubSub
class EventEmitter {
  #events = new Map();

  on(event, fn) {
    if (!this.#events.has(event)) this.#events.set(event, []);
    this.#events.get(event).push(fn);
    return () => this.off(event, fn);  // unsubscribe fn
  }

  off(event, fn) {
    this.#events.set(event,
      (this.#events.get(event) || []).filter(f => f !== fn));
  }

  emit(event, ...args) {
    (this.#events.get(event) || []).forEach(fn => fn(...args));
  }
}

// 2. Singleton
const Config = (() => {
  let instance;
  return {
    getInstance() {
      if (!instance) instance = { theme: 'dark', lang: 'es' };
      return instance;
    }
  };
})();

// 3. Decorator (función de orden superior)
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 4. Strategy
const validators = {
  email:    v => /^[^@]+@[^@]+\.[^@]+$/.test(v),
  required: v => v !== null && v !== undefined && v !== '',
  minLen:   n => v => v.length >= n,
};`,

    functional: `// Programación funcional con JavaScript

// Composición de funciones
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Currying manual
const curry = fn => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

// Ejemplo de pipeline funcional
const usuarios = [
  { nombre: 'Ana',   edad: 28, activo: true,  score: 85 },
  { nombre: 'Pedro', edad: 17, activo: false, score: 70 },
  { nombre: 'María', edad: 34, activo: true,  score: 92 },
  { nombre: 'Luis',  edad: 22, activo: true,  score: 68 },
];

const procesarUsuarios = pipe(
  users => users.filter(u => u.activo && u.edad >= 18),
  users => users.map(u => ({ ...u, nivel: u.score >= 80 ? 'A' : 'B' })),
  users => users.sort((a, b) => b.score - a.score),
  users => users.map(({ nombre, score, nivel }) => ({ nombre, score, nivel }))
);

console.log(procesarUsuarios(usuarios));
// [{ nombre: 'María', score: 92, nivel: 'A' },
//  { nombre: 'Ana',   score: 85, nivel: 'A' }]`,
  };

  const codeEl = document.getElementById('snippet-code');
  const copyBtn = document.getElementById('copy-btn');
  let currentKey = 'closures';

  function setSnippet(key) {
    currentKey = key;
    codeEl.innerHTML = syntaxHighlight(snippets[key]);
    codeEl.style.opacity = 0;
    requestAnimationFrame(() => {
      codeEl.style.transition = 'opacity .3s';
      codeEl.style.opacity = 1;
    });
    document.querySelectorAll('.snippet-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.snippet === key)
    );
  }

  function syntaxHighlight(code) {
    const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const lines = code.split('\n');
    return lines.map(line => {
      let out = escape(line);
      // Comments
      out = out.replace(/(\/\/.*)$/, '<span class="comment">$1</span>');
      // Strings (template, double, single)
      out = out.replace(/(`[^`]*`|"[^"]*"|'[^']*')/g, '<span class="str">$1</span>');
      // Keywords
      out = out.replace(/\b(const|let|var|function|async|await|return|class|extends|new|this|super|if|else|throw|try|catch|for|of|in|import|export|from|static|get|set|null|undefined|true|false)\b/g,
        '<span class="kw">$1</span>');
      // Numbers
      out = out.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
      // Function names
      out = out.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="fn">$1</span>');
      return out;
    }).join('\n');
  }

  document.querySelectorAll('.snippet-tab').forEach(btn => {
    btn.addEventListener('click', () => setSnippet(btn.dataset.snippet));
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(snippets[currentKey]).then(() => {
      copyBtn.textContent = '✓ Copiado';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar`;
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  });

  // Init
  setSnippet('closures');
})();


// ─── SCROLL TO TOP ────────────────────────────
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ─── GLITCH TITLE EFFECT ─────────────────────
(function initGlitch() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  setInterval(() => {
    title.style.textShadow = `
      ${(Math.random()-0.5)*4}px 0 rgba(247,201,72,0.8),
      ${(Math.random()-0.5)*4}px 0 rgba(59,130,246,0.6)
    `;
    setTimeout(() => {
      title.style.textShadow = 'none';
    }, 80);
  }, 4000);
})();


// ─── SMOOTH SECTION PARALLAX ─────────────────
(function initParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.15}px)`;
    hero.style.opacity = Math.max(0, 1 - y / 600);
  }, { passive: true });
})();


// ─── TIMELINE GLOW ON SCROLL ─────────────────
(function initTimelineGlow() {
  const dots = document.querySelectorAll('.timeline-dot');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.style.transform = entry.isIntersecting
        ? 'translateX(-50%) scale(1.5)'
        : 'translateX(-50%) scale(1)';
      entry.target.style.transition = 'transform .4s ease';
    });
  }, { threshold: 1 });
  dots.forEach(d => observer.observe(d));
})();


// ─── CARD TILT EFFECT ────────────────────────
(function initTilt() {
  const cards = document.querySelectorAll('.concept-card, .eco-card, .quirk-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `
        translateY(-4px)
        rotateX(${-dy * 6}deg)
        rotateY(${dx * 6}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ─── PAGE LOAD ANIMATION ─────────────────────
(function initPageLoad() {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity .6s ease';
    document.body.style.opacity = '1';
  });
})();

console.log(`
%c{JS}%c — La Guía Definitiva
%cHecho con ❤️ y JavaScript puro
%cTipea algo de código aquí si te atreves 😄
`,
  'color:#f7c948;font-size:2rem;font-weight:bold;',
  'color:#e2e8f0;font-size:1.2rem;',
  'color:#6b7280;font-size:0.9rem;',
  'color:#3b82f6;font-size:0.9rem;'
);
