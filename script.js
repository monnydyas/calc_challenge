const display = document.querySelector(".display"); // pega o display
const buttons = document.querySelectorAll("button"); // pega todos os botões
const dropdownBtn = document.querySelector(".icon-btn"); // pega o icone do dropdown
const dropdownMenu = document.querySelector(".dropdown-menu"); // pega o dropdown
const toggle = document.getElementById("conversionToggle"); // pega o switch button
const text = document.querySelector(".switch-text"); // texto do switch

// Função que normaliza os símbolos e avalia
function calculate(expr) {
  try {
    // normaliza símbolos de multiplicação/divisão no JS
    expr = expr.replace(/[x×✕*]/g, "*").replace(/[÷\/]/g, "/");

    // retira os operadores pendentes no final (ex: "2+")
    expr = expr.replace(/[+\-*/%]+$/, "");

    // capta erro de divisão por zero
    if (/\/0(?!\d)/.test(expr)) return "Undefined";

    // avalia com precedência normal do JS
    return Function('"use strict"; return (' + expr + ")")();
  } catch {
    return "Erro";
  }
}

// lista de operadores que aceitamos tipo / e ÷ e outras variantes)
const operators = ["+", "-", "x", "×", "*", "/", "÷", "%"];

// listener para o button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    // limpar a calc
    if (button.classList.contains("clear")) {
      display.value = "";
      return;
    }

    // deletar último
    if (button.classList.contains("delete")) {
      display.value = display.value.slice(0, -1);
      return;
    }

    // calcular
    if (button.classList.contains("equal")) {
      const result = calculate(display.value);
      display.value = String(result);
      return;
    }

    // permite só um ponto por número
    if (value === ".") {
      const lastNumber = display.value.split(/[+\-x×\*\/÷%]/).pop();
      if (!lastNumber.includes(".")) {
        display.value += ".";
      }
      return;
    }

    // números
    if (!isNaN(value)) {
      display.value += value;
      return;
    }

    // operadores (inclui /)
    if (operators.includes(value)) {
      // não adiciona nenhum operador se o display estiver vazio ou se tiver um operador no final
      if (display.value !== "" && !/[+\-x×\*\/÷%]$/.test(display.value)) {
        display.value += value;
      }
      return;
    }

    // Ignora outros botões inesperados
  });
});

// Dropdown
window.addEventListener("DOMContentLoaded", () => {
  if (dropdownMenu) dropdownMenu.style.display = "none";
});

if (dropdownBtn) {
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });
}

window.addEventListener("click", (e) => {
  if (!e.target.closest || !e.target.closest(".dropdown")) {
    if (dropdownMenu) dropdownMenu.style.display = "none";
  }
});

// Toggle - botao switch liga-desliga
if (toggle) {
  toggle.addEventListener("change", () => {
    if (text) text.textContent = toggle.checked ? "ON" : "OFF";
  });
}
