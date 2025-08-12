// Centralized Interactivity Script for YourBanK
// Handles common interactive features across all pages

document.addEventListener("DOMContentLoaded", function () {
  // Active navigation highlighting
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.parentElement.classList.add("active");
    }
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll("a[href], button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Lazy load images for better performance
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Create scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = "↑";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #caff33;
        color: #1c1c1c;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Error Handling

  // Global error handler
  window.addEventListener("error", function (e) {
    console.error("JavaScript error:", e.error);
  });

  // Optimize scroll events
  const optimizedScrollHandler = throttle(function () {
    // Any scroll-based functionality can go here
  }, 16); // ~60fps

  window.addEventListener("scroll", optimizedScrollHandler);

  console.log("Interactivity script loaded successfully!");
});
