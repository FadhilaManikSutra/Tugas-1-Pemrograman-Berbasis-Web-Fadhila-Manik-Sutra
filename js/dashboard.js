let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "index.html";
}

document.getElementById("userNama").innerText = "Halo, " + user.nama;

let container = document.getElementById("produkContainer");
let loading = document.getElementById("loading");

/* ================= RENDER ================= */
function render(data) {
  container.innerHTML = "";

  data.forEach(item => {
    let status = item.stok < 200 ? "Hampir Habis" : "Tersedia";

    let el = document.createElement("div");
    el.className = "product";

    el.innerHTML = `
      <img src="${item.cover}">
      <h3>${item.namaBarang}</h3>
      <p class="badge">${item.jenisBarang}</p>
      <p>Stok: ${item.stok}</p>
      <p>Status: ${status}</p>
      <button onclick="pesan('${item.kodeBarang}')">Pesan</button>
    `;

    container.appendChild(el);
  });
}

render(dataBahanAjar);

/* ================= SEARCH ================= */
function filterProduk() {
  let keyword = document.getElementById("search").value.toLowerCase();

  let hasil = dataBahanAjar.filter(item =>
    item.namaBarang.toLowerCase().includes(keyword)
  );

  if (hasil.length === 0) {
    container.innerHTML = "<p class='empty'>Data tidak ditemukan</p>";
    return;
  }

  render(hasil);
}

/* ================= MODAL ================= */
function tampilModal(text) {
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").style.display = "block";
}

function tutupModal() {
  document.getElementById("modal").style.display = "none";
}

/* ================= KERANJANG ================= */
function pesan(kode) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(kode);
  localStorage.setItem("cart", JSON.stringify(cart));

  tampilModal("Berhasil ditambahkan ke keranjang!");
}

function lihatKeranjang() {
  window.location.href = "cart.html";
}

/* ================= LOADING ================= */
function showLoading() {
  loading.style.display = "block";
}

function hideLoading() {
  loading.style.display = "none";
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}