document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      const header = btn.closest(".category-header");
      const children = header.nextElementSibling;

      if (!children || !children.classList.contains("category-children"))
        return;

      children.classList.toggle("hidden");
      btn.textContent = children.classList.contains("hidden") ? "▶" : "▼";
    });
  });
});
