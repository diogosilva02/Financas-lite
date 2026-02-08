const formLogin = document.querySelector("#formLogin");
const msg = document.querySelector("#msg");

const API_BASE = "/api";

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (!name || !email || !password || !confirmPassword) {
    msg.textContent = "Preencha os campos corretamente";
    return;
  }

  if (password !== confirmPassword) {
    msg.textContent = "As senhas não conferem";
    return;
  }

  if (password.length < 6) {
    msg.textContent = "min 6 caracteres";
    return;
  }

  if (!email.includes("@")) {
    msg.textContent = "Adicione um email valido";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      msg.textContent = data.erro;
      return;
    }

    msg.textContent = "Cadastro realizado! Redirecionando...";

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } catch (error) {
    msg.textContent = "Falha de conexão com o servidor";
  }
});
