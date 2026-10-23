// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight current section in the menu
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && io.observe(s));

// Typed terminal text (one moment on page load; shown instantly if motion is reduced)
const pre = document.getElementById('typed');
const lines = JSON.parse(pre.dataset.lines);
const full = lines.join('\n');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  pre.textContent = full;
} else {
  let i = 0;
  const caret = '<span class="caret"></span>';
  (function type() {
    pre.innerHTML = full.slice(0, i).replace(/</g, '&lt;') + caret;
    if (i++ < full.length) setTimeout(type, 28);
  })();
}
