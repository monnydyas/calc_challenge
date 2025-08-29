const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const dropdownBtn = document.querySelector(".icon-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");

buttons.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    const value = buttons.textContent;

    if (buttons.classList.contains("clear")) {
      display.value = "";
    } else if (buttons.classList.contains("delete")) {
      display.value = display.value.slice(0, -1);
    } else if (buttons.classList.contains("equal")) {
      try {
        display.value = eval(display.value.replace("÷", "/").replace("x", "*"));
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
});

// Garantir que começa escondido ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  dropdownMenu.style.display = "none";
});

// Alterna mostrar/esconder ao clicar no botão
dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // <-- impede o clique de subir até o window
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Fecha se clicar fora
window.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdownMenu.style.display = "none";
  }
});
