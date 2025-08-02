document.addEventListener("DOMContentLoaded", function () {
  const hideFaqsBtn = document.querySelector(".hide-faqs-btn");
  const hiddenFaqs = document.querySelectorAll(".hidden-faq");
  const faqSection = document.querySelector(".faq-section");
  let isExpanded = false;

  hideFaqsBtn.addEventListener("click", function () {
    if (isExpanded) {
      // Hide FAQs with animation
      hiddenFaqs.forEach((faq) => {
        faq.classList.remove("expanded");
      });
      faqSection.classList.remove("expanded");
      hideFaqsBtn.innerHTML =
        'Load All FAQ\'s <img src="assets/svg/down-arrow.svg" alt="" />';
      hideFaqsBtn.classList.remove("active");
      isExpanded = false;
    } else {
      // Show FAQs with animation
      hiddenFaqs.forEach((faq) => {
        faq.classList.add("expanded");
      });
      faqSection.classList.add("expanded");
      hideFaqsBtn.innerHTML =
        'Show Less FAQ\'s <img src="assets/svg/down-arrow.svg" alt="" />';
      hideFaqsBtn.classList.add("active");
      isExpanded = true;
    }
  });
});
