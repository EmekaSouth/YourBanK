document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  const pageHeading = document
    .querySelector(".hero-text-container h3")
    ?.textContent?.trim()
    .toLowerCase();

  const isSignup = pageHeading?.includes("sign up");
  const isLogin = pageHeading?.includes("login");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const firstName = contactForm
          .querySelector('input[placeholder="Enter First Name"]')
          ?.value?.trim();
        const lastName = contactForm
          .querySelector('input[placeholder="Enter Last Name"]')
          ?.value?.trim();
        const email = contactForm
          .querySelector('input[type="email"]')
          ?.value?.trim();
        const password = contactForm
          .querySelector('input[type="password"]')
          ?.value?.trim();

        if (!firstName || !lastName || !email || !password) {
          showNotification("Please fill in all fields", "error");
          return;
        }

        if (!isValidEmail(email)) {
          showNotification("Please enter a valid email address", "error");
          return;
        }

        if (password.length < 6) {
          showNotification("Password must be at least 6 characters", "error");
          return;
        }

        showNotification(
          "Account created successfully! Welcome aboard to YourBanK, Empowering your Financial Journey.",
          "success"
        );
        contactForm.reset();
        return;
      }

      if (isLogin) {
        const email = contactForm
          .querySelector('input[type="email"]')
          ?.value?.trim();
        const password = contactForm
          .querySelector('input[type="password"]')
          ?.value?.trim();

        if (!email || !password) {
          showNotification("Please enter email and password", "error");
          return;
        }

        if (!isValidEmail(email)) {
          showNotification("Please enter a valid email address", "error");
          return;
        }

        if (password.length < 6) {
          showNotification("Invalid credentials", "error");
          return;
        }

        showNotification(
          "Logged in successfully! Welcome back to YourBank",
          "success"
        );
        contactForm.reset();
        return;
      }

      // Fallback if page heading not found
      showNotification("Form submitted.", "success");
      contactForm.reset();
    } catch (err) {
      showNotification("Something went wrong. Please try again.", "error");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class=\"notification-content\">
            <span class=\"notification-message\">${message}</span>
            <button class=\"notification-close\" aria-label=\"Close notification\">&times;</button>
        </div>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#caff33"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  const content = notification.querySelector(".notification-content");
  content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
        padding: 0;
        margin-left: 8px;
        box-shadow: none;
        outline: none;
        appearance: none;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Navigate black button between auth pages
document.addEventListener("DOMContentLoaded", function () {
  const blackBtn = document.querySelector(".black-btn");
  if (!blackBtn) return;

  blackBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const heading = document
      .querySelector(".hero-text-container h3")
      ?.textContent?.trim()
      .toLowerCase();
    const target = heading?.includes("sign up") ? "login.html" : "signup.html";
    window.location.href = target;
  });
});

// Password visibility toggles (Signup and Login)
document.addEventListener("DOMContentLoaded", function () {
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  // SVG icons
  const eyeOpenSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>`;

  const eyeOffSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.8 21.8 0 0 1 5.06-5.94"></path>
      <path d="M1 1l22 22"></path>
      <path d="M9.88 9.88A3 3 0 1 0 14.12 14.12"></path>
      <path d="M14.12 14.12A10.94 10.94 0 0 0 23 12s-4-8-11-8a10.94 10.94 0 0 0-4.66.88"></path>
    </svg>`;

  passwordInputs.forEach((input) => {
    // Wrap input for positioning the toggle
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "block";

    const cs = window.getComputedStyle(input);
    wrapper.style.marginTop = cs.marginTop;
    wrapper.style.marginRight = cs.marginRight;
    wrapper.style.marginBottom = cs.marginBottom;
    wrapper.style.marginLeft = cs.marginLeft;
    input.style.margin = "0";
    input.style.display = "block";

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    // Create toggle button
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "password-toggle";
    toggle.setAttribute("aria-label", "Show password");
    toggle.setAttribute("title", "Show password");
    toggle.innerHTML = eyeOpenSvg;
    toggle.style.cssText = `
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        color: #59595A;
        border: none;
        border-radius: 8px;
        font-size: 0;
        padding: 6px;
        line-height: 0;
        cursor: pointer;
    `;

    toggle.addEventListener("click", function () {
      const isHidden = input.getAttribute("type") === "password";
      input.setAttribute("type", isHidden ? "text" : "password");
      toggle.innerHTML = isHidden ? eyeOffSvg : eyeOpenSvg;
      toggle.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
      );
      toggle.setAttribute(
        "title",
        isHidden ? "Hide password" : "Show password"
      );
    });

    // Prevent losing focus on mousedown
    toggle.addEventListener("mousedown", (e) => e.preventDefault());

    wrapper.appendChild(toggle);
  });
});
