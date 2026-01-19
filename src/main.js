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

  function renderizarLista() {
    lista.innerHTML = "";

    transacoes.forEach((obj) => {
      const li = document.createElement("li");
      li.textContent = `${obj.descricao} - R$ ${obj.valor} - ${obj.tipo}`;

      lista.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();

    if (!validarFormulario(dados)) {
      mensagem.textContent = "Preencha os campos corretamente";

      return;
    }

    const transacao = criarTransacao(dados);
    transacoes.push(transacao);
    renderizarLista();

    form.reset();

    console.log(transacoes);
  });
}

financas();
