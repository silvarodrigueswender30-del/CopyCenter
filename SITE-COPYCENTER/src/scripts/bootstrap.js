const root = document.documentElement;

root.classList.add("w-mod-js");

if ("ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
  root.classList.add("w-mod-touch");
}
