// Variáveis Globais - NUNCA USE O VAR!!

// seções
const pratos = document.querySelector(".pratos");
const bebidas = document.querySelector(".bebidas");
const sobremesas = document.querySelector(".sobremesas");
const fazerPedido = document.querySelector(".footer")
//valores
let precos = [0,0,0];
let seuPedido = ["prato", "bebida", "sobremesa"];

function novoEstado() {
    let temPrato = pratos.querySelector(".selecionado");
    let temBebida = bebidas.querySelector(".selecionado");
    let temSobremesa = sobremesas.querySelector(".selecionado");
    let pedidoPronto = temPrato && temBebida && temSobremesa
    if(pedidoPronto) {
        fazerPedido.classList.add("pedido-pronto");
    } else {
        fazerPedido.classList.remove("pedido-pronto")
    }
}

function newValues(pedido, secao) {
    if(secao === pratos) {
        precos[0] = pedido.querySelector(".preco").innerHTML;
        seuPedido[0] = pedido.querySelector("h4").innerHTML;
    }
    if(secao === bebidas) {
        precos[1] = pedido.querySelector(".preco").innerHTML;
        seuPedido[1] = pedido.querySelector("h4").innerHTML;
    }
    if(secao === sobremesas) {
        precos[2] = pedido.querySelector(".preco").innerHTML;
        seuPedido[2] = pedido.querySelector("h4").innerHTML;
    }
}

function addSelecionado(pedido, secao) {
    //removendo a classe do ja selecionado se ele for 
    //diferente do clicado
    let selecionado = secao.querySelector(".selecionado");
    if(selecionado && selecionado !== pedido) {
        selecionado.classList.remove("selecionado");
    }
    //alternando o estado do clicado
    pedido.classList.toggle("selecionado");
    //novo estado
    newValues(pedido, secao);
    novoEstado();
}
//ainda em desenvolvimento
function zapZap() {
    let precoTotal = precos[0] + precos[1] + precos[2];
    let mensagem = `Olá, gostaria de fazer o pedido:
    - Prato: ${seuPedido[0]}
      - Bebida: ${seuPedido[1]}
      - Sobremesa: ${seuPedido[2]}
      Total: R$ ${precoTotal}`;   
    let encodedMensagem;
}