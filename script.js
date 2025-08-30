const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const dropdownBtn = document.querySelector(".icon-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const toggle = document.getElementById("conversionToggle");
const text = document.querySelector(".switch-text");

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

window.addEventListener("DOMContentLoaded", () => {
  dropdownMenu.style.display = "none";
});

dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdownMenu.style.display = "none";
  }
});

toggle.addEventListener("change", () => {
  text.textContent = toggle.checked ? "ON" : "OFF";
});
