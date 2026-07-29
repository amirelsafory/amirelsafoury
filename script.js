/* =====================================================================
   Amir Mohamed El-Safory — script.js
   Modular vanilla JS: mobile nav, keyboard support, smooth page fade
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------- Mobile hamburger menu ---------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    function closeMenu() {
      toggle.classList.remove("open");
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      toggle.classList.add("open");
      links.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // close menu when a link is chosen
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // close on outside click
    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // close on Escape for keyboard users
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------------- Smooth page transition on nav click ---------------- */
  function initPageTransitions() {
    var main = document.getElementById("main-content");
    if (!main) return;

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (!href || link.classList.contains("active")) return;

        e.preventDefault();
        main.style.transition = "opacity .28s ease";
        main.style.opacity = "0";
        setTimeout(function () {
          window.location.href = href;
        }, 220);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initPageTransitions();
  });
})();
