// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Terminal type-in effect on the homepage hero
const typeTarget = document.querySelector('[data-type]');
if (typeTarget) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = JSON.parse(typeTarget.getAttribute('data-type'));

  if (reduceMotion) {
    typeTarget.innerHTML = lines.map(renderLineFinal).join('');
  } else {
    typeTarget.innerHTML = '';
    playLines(lines, 0);
  }
}

function renderLineFinal(l) {
  const out = l.out ? `<span class="out">${l.out}</span>` : '';
  return `<div class="line"><span class="prompt">${l.prompt}</span> ${l.cmd}</div>${out}`;
}

function playLines(lines, i) {
  if (i >= lines.length) return;
  const l = lines[i];
  const row = document.createElement('div');
  row.className = 'line';
  row.innerHTML = `<span class="prompt">${l.prompt}</span> <span class="cmd"></span><span class="cursor"></span>`;
  typeTarget.appendChild(row);
  const cmdEl = row.querySelector('.cmd');
  const cursorEl = row.querySelector('.cursor');
  let c = 0;
  const speed = 32;
  const typer = setInterval(() => {
    cmdEl.textContent = l.cmd.slice(0, c + 1);
    c++;
    if (c >= l.cmd.length) {
      clearInterval(typer);
      cursorEl.remove();
      if (l.out) {
        const outEl = document.createElement('span');
        outEl.className = 'out';
        outEl.textContent = l.out;
        typeTarget.appendChild(outEl);
      }
      setTimeout(() => playLines(lines, i + 1), 260);
    }
  }, speed);
}

// Lightbox for project screenshots
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
}
