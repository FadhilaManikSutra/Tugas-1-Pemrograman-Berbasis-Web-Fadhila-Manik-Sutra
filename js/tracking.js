let user = JSON.parse(localStorage.getItem("user"));

/* ================= AUTO ISI RESI ================= */
window.onload = function () {
  if (!user) return;

  const resiInput = document.getElementById("resi");

  // Cari tracking berdasarkan nama user
  const found = Object.values(dataTracking).find(
    item => item.nama === user.nama
  );

  if (found) {
    resiInput.value = found.nomorDO;
  }

  tampilRiwayat();
};

/* ================= CEK TRACKING ================= */
function cek() {
  const resi = document.getElementById("resi").value;
  const hasil = document.getElementById("hasil");

  const data = dataTracking[resi];

  if (!data) {
    hasil.innerHTML = "<p class='empty'>Data tidak ditemukan</p>";
    return;
  }

  // Simpan ke riwayat
  simpanRiwayat(resi);

  // Buat timeline
  const timeline = data.perjalanan.map(p => `
    <div class="timeline-item">
      <p><strong>${p.waktu}</strong></p>
      <p>${p.keterangan}</p>
    </div>
  `).join("");

  // Tentukan class status
  let statusClass = "";

  if (data.status === "Dalam Perjalanan") {
    statusClass = "perjalanan";
  } else if (data.status === "Dikirim") {
    statusClass = "dikirim";
  } else if (data.status.includes("Selesai")) {
    statusClass = "selesai";
  }

  // Render hasil
  hasil.innerHTML = `
    <h3>
      Status:
      <span class="status ${statusClass}">
        ${data.status}
      </span>
    </h3>
    <p><strong>Nama:</strong> ${data.nama}</p>
    <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
    <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
    <p><strong>Kode Paket:</strong> ${data.paket}</p>
    <p><strong>Total:</strong> ${data.total}</p>
    <div class="timeline">${timeline}</div>
  `;
}

/* ================= RIWAYAT ================= */
function simpanRiwayat(resi) {
  let riwayat = JSON.parse(localStorage.getItem("riwayatTracking")) || [];

  if (!riwayat.includes(resi)) {
    riwayat.push(resi);
    localStorage.setItem("riwayatTracking", JSON.stringify(riwayat));
  }

  tampilRiwayat();
}

function tampilRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem("riwayatTracking")) || [];
  const container = document.getElementById("riwayat");

  if (!container) return;

  if (riwayat.length === 0) {
    container.innerHTML = "<p class='empty'>Belum ada riwayat</p>";
    return;
  }

  container.innerHTML = riwayat.map(r => `
    <button onclick="isiResi('${r}')">${r}</button>
  `).join("");
}

function isiResi(resi) {
  document.getElementById("resi").value = resi;
  cek();
}

/* ================= NAVIGASI ================= */
function kembali() {
  window.location.href = "dashboard.html";
}