document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuToggle) {
        menuToggle.checked = false;
      }
    });
  });

});
