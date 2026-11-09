(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var themeBtn = document.getElementById("themeToggle");
  var root = document.documentElement;

  // Mobile menu
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Dark mode (remembered in the browser)
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "dark") root.setAttribute("data-theme", "dark");
  themeBtn.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) { root.removeAttribute("data-theme"); } else { root.setAttribute("data-theme", "dark"); }
    try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) {}
  });

  // Highlight the section being viewed
  var links = nav.querySelectorAll("a");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { obs.observe(s); });
  }
})();
