document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = dataPengguna.find(u => u.email === email && u.password === password);

  if(user){
    alert("Login berhasil!");
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Email atau password salah!");
  }
});