const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

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
