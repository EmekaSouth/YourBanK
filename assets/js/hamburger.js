document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector("#menu-toggle");
  const navOverlay = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const closeBtn = document.querySelector(".close-btn");
  const headerWrapper = document.querySelector(".header-wrapper");
  const body = document.body;

  function positionOverlay() {
    if (!navOverlay) return;
    let topOffset = 0;
    if (headerWrapper) {
      const rect = headerWrapper.getBoundingClientRect();
      topOffset = rect.top + rect.height;
      if (topOffset < 0) topOffset = 0; // clamp when header scrolled out
    }
    navOverlay.style.top = topOffset + "px";
    navOverlay.style.left = "0";
    navOverlay.style.right = "0";
    navOverlay.style.bottom = "0";
    navOverlay.style.height = "";
    navOverlay.style.overflowY = "auto";
    navOverlay.style.webkitOverflowScrolling = "touch";
  }

  function openMenu() {
    if (!navOverlay) return;
    positionOverlay();
    navOverlay.style.display = "flex";
    navOverlay.style.position = "fixed";
    navOverlay.style.width = "100%";
    navOverlay.style.zIndex = "2000";
    body.style.overflow = "hidden";
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
    body.style.overflow = "";
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
    if (menuToggle && menuToggle.checked) positionOverlay();
  });

  window.addEventListener("orientationchange", function () {
    if (menuToggle && menuToggle.checked) setTimeout(positionOverlay, 50);
  });

  window.addEventListener(
    "scroll",
    function () {
      if (menuToggle && menuToggle.checked) positionOverlay();
    },
    { passive: true }
  );
});
