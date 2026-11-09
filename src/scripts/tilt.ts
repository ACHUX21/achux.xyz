let started = false;

export function initTilt() {
  if (started) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduce.matches) return;
  started = true;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);

    const move = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      el.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    el.addEventListener('pointerenter', () => el.classList.add('is-tilting'));
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-tilting');
      el.style.transform = '';
    });
  });
}
