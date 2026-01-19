function financas() {
  const form = document.querySelector("#formTransacao");
  const descricaoInput = form.querySelector("#descricao");
  const valorInput = form.querySelector("#valor");
  const tipoInput = form.querySelector("#tipo");
  const categoriaInput = form.querySelector("#categoria");
  const dataInput = form.querySelector("#data");
  const lista = document.querySelector("#listaTransacoes");
  const mensagem = document.querySelector("#msg");

  const transacoes = [];
  let idEmEdicao = null;

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

  function renderizarLista() {
    lista.innerHTML = "";

    transacoes.forEach((obj) => {
      const li = document.createElement("li");
      li.textContent = `${obj.descricao} - R$ ${obj.valor} - ${obj.tipo} `;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.dataset.id = obj.id;
      btnRemover.dataset.acao = "remover";

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.dataset.id = obj.id;
      btnEditar.dataset.acao = "editar";

      li.appendChild(btnEditar);
      li.appendChild(btnRemover);
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

      preencherFormulario(editTrans);

      return;
    }

    if (acao === "remover") {
      const indiceReal = transacoes.findIndex((transfer) => transfer.id === id);
      if (indiceReal === -1) return;

      transacoes.splice(indiceReal, 1);

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

    form.reset();
    renderizarLista();
  });
}

financas();
