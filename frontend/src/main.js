const API_BASE = "/api";

async function init() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return;
  }

  const res = await fetch(`${API_BASE}/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  financas(token);
}

function financas(token) {
  const form = document.querySelector("#formTransacao");
  const descricaoInput = form.querySelector("#descricao");
  const valorInput = form.querySelector("#valor");
  const tipoInput = form.querySelector("#tipo");
  const categoriaInput = form.querySelector("#categoria");
  const dataInput = form.querySelector("#data");
  const lista = document.querySelector("#listaTransacoes");
  const mensagem = document.querySelector("#msg");
  const titleForm = document.querySelector("#tituloForm");
  const btnCancelar = form.querySelector("#btnCancelar");
  const totalEntradas = document.querySelector("#totalEntradas");
  const totalSaidas = document.querySelector("#totalSaidas");
  const totalSaldo = document.querySelector("#saldoTotal");
  const btnLogout = document.querySelector("#btnLogout");

  const transacoes = [];
  let idEmEdicao = null;

  carregarTransacao(token);

  function logout(motivo) {
    localStorage.removeItem("token");

    if (motivo) {
      localStorage.setItem("logoutMessage", motivo);
    }

    window.location.href = "/login";
  }

  async function carregarTransacao(token) {
    try {
      const response = await fetch(`${API_BASE}/transactions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        mensagem.textContent = data.erro || "Erro ao carregar transacoes";
        return;
      }

      transacoes.length = 0;
      transacoes.push(...data);

      refreshUI();
    } catch (error) {
      mensagem.textContent = "Falha ao conectar no servidor";
    }
  }

  function lerFormulario() {
    return {
      descricao: descricaoInput.value,
      valor: Number(valorInput.value),
      tipo: tipoInput.value,
      categoria: categoriaInput.value,
      data: dataInput.value,
    };
  }

  function validarFormulario(dados) {
    if (!dados.descricao || dados.descricao.length < 2) return false;
    if (dados.valor <= 0) return false;
    if (!dados.tipo || !dados.categoria) return false;
    if (!dados.data) return false;

    return true;
  }

  function preencherFormulario(transacao) {
    descricaoInput.value = transacao.descricao;
    valorInput.value = transacao.valor;
    tipoInput.value = transacao.tipo;
    categoriaInput.value = transacao.categoria;
    dataInput.value = String(transacao.data).slice(0, 10);
  }

  function sairModoEdicao() {
    titleForm.textContent = "Nova transação";
    form.classList.remove("editando");
  }

  function entrarModoEdicao() {
    titleForm.textContent = "Editando";
    form.classList.add("editando");
  }

  function formatarData(data) {
    return new Date(data).toISOString().split("T")[0];
  }

  function renderizarLista() {
    lista.innerHTML = "";

    const listaParaRenderizar = [...transacoes].sort((a, b) =>
      a.data < b.data ? 1 : -1,
    );

    listaParaRenderizar.forEach((obj) => {
      const li = document.createElement("li");
      li.classList.add("item");

      const info = document.createElement("div");
      info.classList.add("info");

      const span = document.createElement("span");
      span.classList.add("descricao");
      span.textContent = `${obj.descricao}`;

      const small = document.createElement("small");
      small.classList.add("meta");
      small.textContent = ` ${obj.categoria} • ${formatarData(obj.data)}`;

      const acoes = document.createElement("div");
      acoes.classList.add("acoes");

      const valor = document.createElement("span");
      valor.classList.add("valor");
      valor.textContent = formatarMoeda(obj.valor);

      const tipo = document.createElement("span");
      tipo.classList.add("tipo");
      tipo.textContent = ` ${obj.tipo}`;

      if (obj.tipo === "entrada") {
        tipo.classList.add("entrada");
      } else if (obj.tipo === "saida") {
        tipo.classList.add("saida");
      }

      const buttons = document.createElement("div");
      buttons.classList.add("botoes");

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.dataset.id = obj._id;
      btnRemover.dataset.acao = "remover";

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.dataset.id = obj._id;
      btnEditar.dataset.acao = "editar";

      buttons.appendChild(btnEditar);
      buttons.appendChild(btnRemover);
      acoes.appendChild(valor);
      acoes.appendChild(tipo);
      acoes.appendChild(buttons);

      info.appendChild(span);
      info.appendChild(small);
      li.appendChild(info);
      li.appendChild(acoes);
      lista.appendChild(li);
    });
  }

  function refreshUI() {
    renderizarLista();
    carregarResumo(token);
  }

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  async function carregarResumo(token) {
    try {
      const response = await fetch(`${API_BASE}/summary`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        mensagem.textContent = data.erro;
        return;
      }

      totalSaldo.classList.remove("saldo-positivo");
      totalSaldo.classList.remove("saldo-negativo");

      data.saldo >= 0
        ? totalSaldo.classList.add("saldo-positivo")
        : totalSaldo.classList.add("saldo-negativo");

      totalEntradas.textContent = formatarMoeda(data.entradas);
      totalSaidas.textContent = formatarMoeda(data.saidas);
      totalSaldo.textContent = formatarMoeda(data.saldo);
    } catch (error) {
      mensagem.textContent = "Falha ao conectar no servidor";
    }
  }

  lista.addEventListener("click", async (e) => {
    if (!e.target.matches("button")) return;

    const id = e.target.dataset.id;
    const acao = e.target.dataset.acao;

    if (acao === "editar") {
      const editTrans = transacoes.find((t) => t._id === id);
      if (!editTrans) return;

      idEmEdicao = id;
      entrarModoEdicao();
      preencherFormulario(editTrans);

      return;
    }

    if (acao === "remover") {
      const res = await fetch(`${API_BASE}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        mensagem.textContent = data.erro || "Erro ao remover transação";
        return;
      }

      const indice = transacoes.findIndex((t) => t._id === id);
      if (indice !== -1) transacoes.splice(indice, 1);

      refreshUI();
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = lerFormulario();

    if (!validarFormulario(dados)) {
      mensagem.textContent = "Preencha os campos corretamente";

      return;
    }

    mensagem.textContent = "";

    if (idEmEdicao === null) {
      const res = await fetch(`${API_BASE}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const created = await res.json();

      if (!res.ok) {
        mensagem.textContent = created.erro || "Erro ao criar transação";
        return;
      }

      transacoes.push(created);
    } else {
      const res = await fetch(`${API_BASE}/transactions/${idEmEdicao}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const updated = await res.json();

      if (!res.ok) {
        mensagem.textContent = updated.erro || "Erro ao editar transação";
        return;
      }

      const indice = transacoes.findIndex((t) => t._id === updated._id);
      if (indice !== -1) {
        transacoes[indice] = updated;
      }
    }

    idEmEdicao = null;
    sairModoEdicao();

    form.reset();

    refreshUI();
  });

  btnCancelar.addEventListener("click", () => {
    idEmEdicao = null;
    sairModoEdicao();
    form.reset();
    mensagem.textContent = "";
  });

  btnLogout.addEventListener("click", () => {
    logout("logout realizado");
  });
}

init();
