document.addEventListener("DOMContentLoaded", function () {

  // helper selector
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  /* ===============================
     Subscribe form
  =============================== */
  const subForm = qs("#subscribeForm");

  if (subForm) {
    subForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = qs("#subscribeEmail");
      const emailValue = emailInput ? emailInput.value.trim() : "";

      if (emailValue === "") return;

      alert("تم استلام بريدك ✅ " + emailValue);
      subForm.reset();
    });
  }

  /* ===============================
     Contact form
  =============================== */
  const formContact = qs("#contactForm");

  if (formContact) {
    formContact.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("تم إرسال رسالتك ✅ سنعاود التواصل معك قريباً.");
      formContact.reset();
    });
  }

  /* ===============================
     Dots animation
  =============================== */
  const dotsContainer = document.querySelectorAll("#dots .dot");

  if (dotsContainer.length > 0) {
    let currentIndex = 0;

    setInterval(function () {
      dotsContainer.forEach(function (dot) {
        dot.classList.remove("active");
      });

      currentIndex = (currentIndex + 1) % dotsContainer.length;
      dotsContainer[currentIndex].classList.add("active");
    }, 2400);
  }

  /* ===============================
     WhatsApp floating button
  =============================== */
  const whatsappBtn = document.querySelector(".whatsapp-fab");
  if (!whatsappBtn) return;

  const subscribeBlock = document.querySelector(".subscribe");
  const footerBlock = document.querySelector(".site-footer");
  const watchTarget = subscribeBlock || footerBlock;

  if (!watchTarget) return;

  let hiddenBySection = false;
  let hiddenByScroll = false;

  function updateFabVisibility() {
    whatsappBtn.classList.toggle(
      "is-hidden",
      hiddenBySection || hiddenByScroll
    );
  }

  /* Intersection observer */
  const observer = new IntersectionObserver(
    function (entries) {
      const entry = entries[0];
      hiddenBySection = entry.isIntersecting;
      updateFabVisibility();
    },
    {
      threshold: 0,
      rootMargin: "0px"
    }
  );

  observer.observe(watchTarget);

  /* Bottom scroll check */
  function detectBottom() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    const viewportHeight = window.innerHeight || 0;
    const documentHeight = document.documentElement.scrollHeight || 0;

    const remaining = documentHeight - (scrollTop + viewportHeight);
    hiddenByScroll = remaining < 160;

    updateFabVisibility();
  }

  window.addEventListener("scroll", detectBottom, { passive: true });
  window.addEventListener("resize", detectBottom);

  detectBottom();
});
