export const getWindowWidth = () => Math.max(
  document.body.scrollWidth,
  document.body.offsetWidth,
  document.body.clientWidth,
  document.documentElement.scrollWidth,
  document.documentElement.offsetWidth,
  document.documentElement.clientWidth,
);