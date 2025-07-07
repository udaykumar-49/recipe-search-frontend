
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("login-link");
  const loginModal = document.getElementById("login-modal");
  const closeBtn = document.querySelector(".close");

  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.style.display = "block";
      loginLink.classList.add("active"); // 🔥 Add 'active' class
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      loginModal.style.display = "none";
      loginLink.classList.remove("active"); // ❌ Remove on close
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
      loginLink.classList.remove("active"); // ❌ Remove on outside click
    }
  });
});
