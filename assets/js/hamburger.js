document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector("#menu-toggle");
  const navOverlay = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const closeBtn = document.querySelector(".close-btn");
  const hero = document.querySelector(".hero-section");
  const body = document.body;

  function setOverlayToHero() {
    if (!navOverlay || !hero) return;
    const rect = hero.getBoundingClientRect();
    // Height from top of viewport to the bottom of the hero
    let height = Math.min(
      window.innerHeight,
      Math.max(0, Math.round(rect.bottom))
    );
    navOverlay.style.top = "0";
    navOverlay.style.left = "0";
    navOverlay.style.right = "0";
    navOverlay.style.bottom = "";
    navOverlay.style.height = height + "px";
    navOverlay.style.overflowY = "auto";
    navOverlay.style.webkitOverflowScrolling = "touch";
  }

  function openMenu() {
    if (!navOverlay) return;
    setOverlayToHero();
    navOverlay.style.display = "flex";
    navOverlay.style.position = "fixed";
    navOverlay.style.width = "100%";
    navOverlay.style.zIndex = "2000";
    body.classList.add("menu-active");
  }

  function closeMenu() {
    if (!navOverlay) return;
    navOverlay.style.display = "";
    navOverlay.style.position = "";
    navOverlay.style.top = "";
    navOverlay.style.left = "";
    navOverlay.style.right = "";
    navOverlay.style.bottom = "";
    navOverlay.style.height = "";
    navOverlay.style.overflowY = "";
    body.classList.remove("menu-active");
  }

  if (menuToggle) {
    menuToggle.addEventListener("change", function () {
      if (menuToggle.checked) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (menuToggle) menuToggle.checked = false;
      closeMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuToggle) menuToggle.checked = false;
      closeMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (menuToggle && menuToggle.checked) setOverlayToHero();
  });

  window.addEventListener("orientationchange", function () {
    if (menuToggle && menuToggle.checked) setTimeout(setOverlayToHero, 50);
  });

  window.addEventListener(
    "scroll",
    function () {
      if (menuToggle && menuToggle.checked) setOverlayToHero();
    },
    { passive: true }
  );
});
