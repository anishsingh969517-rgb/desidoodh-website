// Desi Doodh website settings
// IMPORTANT: Replace the sample number below with your WhatsApp number.
// Use country code + number, digits only. India example: 919876543210
const WHATSAPP_NUMBER = "917607369374";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const whatsappLink = document.getElementById("whatsapp-link");
if (whatsappLink) {
  const message = "Hello Desi Doodh, I would like to know about your products.";
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
