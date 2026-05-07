let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "index.html";
}

let container = document.getElementById("cartContainer");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Keranjang kosong</p>";
    return;
  }

  container.innerHTML = "";

  cart.forEach((kode, index) => {
    let item = dataBahanAjar.find(b => b.kodeBarang === kode);

    let div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <h3>${item.namaBarang}</h3>
      <p>Kode: ${kode}</p>
      <button onclick="hapus(${index})">Hapus</button>
    `;

    container.appendChild(div);
  });
}

function hapus(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

function kembali() {
  window.location.href = "dashboard.html";
}

renderCart();