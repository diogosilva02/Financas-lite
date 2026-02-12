const formLogin = document.querySelector("#formLogin");
const msg = document.querySelector("#msg");

const logoutMessage = localStorage.getItem("logoutMessage");
if (logoutMessage) {
  msg.textContent = logoutMessage;
  localStorage.removeItem("logoutMessage");

  setTimeout(() => {
    msg.textContent = "";
  }, 1000);
}

const API_BASE = "/api";

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    msg.textContent = "Preencha os campos corretamente";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      msg.textContent = data.erro || "Erro ao fazer login";
      return;
    }

    if (!data.token) {
      msg.textContent = data.erro;
      return;
    }

    localStorage.setItem("token", data.token);

    window.location.href = "/dashboard";
  } catch (error) {
    msg.textContent = "Falha de conexão com o servidor";
  }
});
