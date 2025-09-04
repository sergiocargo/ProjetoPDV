// ===== Arrays =====
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

// ===== CLIENTES =====
function adicionarCliente() {
  const nome = document.getElementById("clienteNome").value;
  const telefone = document.getElementById("clienteTelefone").value;
  const dias = document.getElementById("clienteDias").value;
  if (!nome || !telefone || !dias) { alert("Preencha todos os campos do cliente!"); return; }
  clientes.push({ nome, telefone, dias });
  localStorage.setItem("clientes", JSON.stringify(clientes));
  atualizarTabelaClientes();
  limparCamposCliente();
}
function atualizarTabelaClientes() {
  const tbody = document.querySelector("#tabelaClientes tbody");
  tbody.innerHTML = "";
  clientes.forEach(c => { tbody.innerHTML += `<tr><td>${c.nome}</td><td>${c.telefone}</td><td>${c.dias}</td></tr>`; });
}
function limparCamposCliente() {
  document.getElementById("clienteNome").value = "";
  document.getElementById("clienteTelefone").value = "";
  document.getElementById("clienteDias").value = "";
}

// ===== PRODUTOS =====
function adicionarProduto() {
  const codigo = document.getElementById("produtoCodigo").value;
  const nome = document.getElementById("produtoNome").value;
  const preco = parseFloat(document.getElementById("produtoPreco").value);
  const qtd = parseInt(document.getElementById("produtoQtd").value);

  if (!codigo || !nome || isNaN(preco) || isNaN(qtd)) { alert("Preencha todos os campos do produto corretamente!"); return; }

  if (produtos.some(p => p.codigo === codigo)) { alert("Código de barras já cadastrado!"); return; }

  produtos.push({ codigo, nome, preco, qtd });
  localStorage.setItem("produtos", JSON.stringify(produtos));
  atualizarTabelaProdutos();
  atualizarSelectProduto();
  limparCamposProduto();
}
function atualizarTabelaProdutos() {
  const tbody = document.querySelector("#tabelaProdutos tbody");
  tbody.innerHTML = "";
  produtos.forEach(p => { tbody.innerHTML += `<tr><td>${p.codigo}</td><td>${p.nome}</td><td>R$ ${p.preco.toFixed(2)}</td><td>${p.qtd}</td></tr>`; });
}
function limparCamposProduto() {
  document.getElementById("produtoCodigo").value = "";
  document.getElementById("produtoNome").value = "";
  document.getElementById("produtoPreco").value = "";
  document.getElementById("produtoQtd").value = "";
}
function atualizarSelectProduto() {
  const select = document.getElementById("vendaProduto");
  select.innerHTML = "";
  produtos.forEach((p,i)=>{ select.innerHTML += `<option value="${i}">${p.nome} - R$ ${p.preco.toFixed(2)} (Estoque: ${p.qtd})</option>`; });
}

// ===== PDV =====
document.getElementById("vendaCodigo").addEventListener("input", function() {
  const codigo = this.value.trim();
  const idx = produtos.findIndex(p => p.codigo === codigo);
  if (idx >= 0) document.getElementById("vendaProduto").value = idx;
});

function registrarVenda() {
  const idx = parseInt(document.getElementById("vendaProduto").value);
  const qtdVenda = parseInt(document.getElementById("vendaQtd").value);
  if (isNaN(qtdVenda) || qtdVenda <= 0) { alert("Digite uma quantidade válida!"); return; }

  const produto = produtos[idx];
  if (qtdVenda > produto.qtd) { alert("Quantidade maior que o estoque disponível!"); return; }

  produto.qtd -= qtdVenda;
  localStorage.setItem("produtos", JSON.stringify(produtos));
  atualizarTabelaProdutos();
  atualizarSelectProduto();

  vendas.push({ produto: produto.nome, qtdVenda, total: produto.preco * qtdVenda });
  localStorage.setItem("vendas", JSON.stringify(vendas));
  atualizarTabelaVendas();

  document.getElementById("vendaQtd").value = "";
  document.getElementById("vendaCodigo").value = "";
}
function atualizarTabelaVendas() {
  const tbody = document.querySelector("#tabelaVendas tbody");
  tbody.innerHTML = "";
  vendas.forEach(v => { tbody.innerHTML += `<tr><td>${v.produto}</td><td>${v.qtdVenda}</td><td>R$ ${v.total.toFixed(2)}</td></tr>`; });
}

// ===== Inicialização =====
function iniciarSistema() {
  atualizarTabelaClientes();
  atualizarTabelaProdutos();
  atualizarSelectProduto();
  atualizarTabelaVendas();
}
window.onload = iniciarSistema;
