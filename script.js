// Lista de clientes
const clientes = [];

// Função para adicionar cliente
function adicionarCliente() {
    const nome = document.getElementById('nome-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    const dias = document.getElementById('dias-pagamento').value;

    if (!nome || !telefone) {
        alert("Preencha todos os campos!");
        return;
    }

    const cliente = { nome, telefone, dias };
    clientes.push(cliente);

    atualizarListaClientes();
    limparCamposCliente();
}

// Atualiza a lista de clientes na tela
function atualizarListaClientes() {
    const lista = document.getElementById('lista-clientes');
    lista.innerHTML = "";
    clientes.forEach((c, index) => {
        lista.innerHTML += `<li>${index + 1} - ${c.nome} | ${c.telefone} | Dias: ${c.dias}</li>`;
    });
}

// Limpa os campos do formulário
function limparCamposCliente() {
    document.getElementById('nome-cliente').value = "";
    document.getElementById('telefone-cliente').value = "";
    document.getElementById('dias-pagamento').value = "";
}
