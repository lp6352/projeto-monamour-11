// MENU MOBILE
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // ANIMAÇÕES
  const faders = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));
});

// CARRINHO
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(nome, preco, imagem) {
  carrinho.push({ nome, preco, imagem });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho");
}

function carregarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <img src="${item.imagem}" width="80">
      <strong>${item.nome}</strong>
      <span>R$ ${item.preco.toFixed(2)}</span>
      <button class="btn" onclick="remover(${index})">Remover</button>
    `;
    lista.appendChild(div);
    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

function remover(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}
