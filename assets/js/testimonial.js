// Testimonial functionality
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 767;
  }

  // Position buttons on mobile
  function positionButtonsOnMobile() {
    if (!isMobile()) return;

    const leftBtn = document.querySelector(".testimonial-left-btn");
    const rightBtn = document.querySelector(".testimonial-right-btn");
    const testimonialWrapper = document.querySelector(".testimonial-wrapper-1");

    if (leftBtn && rightBtn && testimonialWrapper) {
      // Get the testimonial position and dimensions
      const testimonialRect = testimonialWrapper.getBoundingClientRect();
      const testimonialBottom = testimonialRect.bottom;
      const testimonialLeft = testimonialRect.left;
      const testimonialWidth = testimonialRect.width;

      // Position left button right below testimonial, centered on page
      leftBtn.style.position = "absolute";
      leftBtn.style.top = testimonialBottom - 20 + "px";
      leftBtn.style.left = "50%";
      leftBtn.style.transform = "translateX(-60px)";

      // Position right button right below testimonial, centered on page
      rightBtn.style.position = "absolute";
      rightBtn.style.top = testimonialBottom - 20 + "px";
      rightBtn.style.left = "50%";
      rightBtn.style.transform = "translateX(20px)";
    }
  }

  // Run on page load
  positionButtonsOnMobile();

  // Run on window resize
  window.addEventListener("resize", positionButtonsOnMobile);
});
