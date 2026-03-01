(function () {
  const s = localStorage.getItem('theme');
  const d = !s && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', s === 'dark' || d);
})();
