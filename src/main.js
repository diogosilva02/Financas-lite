function financas() {
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

  const transacoes = [];
  let idEmEdicao = null;
  const STORAGE_KEY = "transacoes";
  carregarTransacao();
  renderizarLista();

  function salvarTransacao() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes));
  }

  function carregarTransacao() {
    const transacoesSalvas = localStorage.getItem(STORAGE_KEY);

    if (transacoesSalvas) {
      transacoes.push(...JSON.parse(transacoesSalvas));
    }
  }

  function criarTransacao(dados) {
    return {
      id: crypto.randomUUID(),
      descricao: dados.descricao,
      valor: dados.valor,
      tipo: dados.tipo,
      categoria: dados.categoria,
      data: dados.data,
    };
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
    dataInput.value = transacao.data;
  }

  function sairModoEdicao() {
    titleForm.textContent = "Nova transação";
    titleForm.classList.remove("editando");
  }

  function entrarModoEdicao() {
    titleForm.textContent = "Editando";
    titleForm.classList.add("editando");
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
      small.textContent = ` ${obj.categoria} • ${obj.data}`;

      const acoes = document.createElement("div");
      acoes.classList.add("acoes");

      const valor = document.createElement("span");
      valor.classList.add("valor");
      valor.textContent = `R$ ${obj.valor} `;

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
      btnRemover.dataset.id = obj.id;
      btnRemover.dataset.acao = "remover";

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.dataset.id = obj.id;
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

  lista.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const id = e.target.dataset.id;
    const acao = e.target.dataset.acao;

    if (acao === "editar") {
      const editTrans = transacoes.find((t) => t.id === id);
      if (!editTrans) return;

      idEmEdicao = id;
      entrarModoEdicao();

      preencherFormulario(editTrans);

      return;
    }

    if (acao === "remover") {
      const indiceReal = transacoes.findIndex((transfer) => transfer.id === id);
      if (indiceReal === -1) return;

      transacoes.splice(indiceReal, 1);

      salvarTransacao();

      renderizarLista();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();

    if (!validarFormulario(dados)) {
      mensagem.textContent = "Preencha os campos corretamente";

      return;
    }

    mensagem.textContent = "";

    if (idEmEdicao === null) {
      const transacao = criarTransacao(dados);
      transacoes.push(transacao);
    } else {
      const indice = transacoes.findIndex((i) => i.id === idEmEdicao);
      if (indice === -1) return;

      transacoes[indice] = { ...transacoes[indice], ...dados };
    }

    idEmEdicao = null;
    sairModoEdicao();

    salvarTransacao();

    form.reset();

    renderizarLista();
  });

  btnCancelar.addEventListener("click", () => {
    idEmEdicao = null;
    sairModoEdicao();
    form.reset();
    mensagem.textContent = "";
  });
}

financas();
