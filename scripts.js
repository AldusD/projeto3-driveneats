// Variáveis Globais - NUNCA USE O VAR!!

// seções
const pratos = document.querySelector(".pratos");
const bebidas = document.querySelector(".bebidas");
const sobremesas = document.querySelector(".sobremesas");
const fazerPedido = document.querySelector(".footer")
const modal = document.querySelector(".confirmacao")
const filtro = document.querySelector(".sem-filtro")
//valores
let precos = [0, 0, 0, 0];
let seuPedido = ["prato", "bebida", "sobremesa", "Total"];
//whatsapp
let mensagem;
let encodedMensagem;
let whatsappReference;
// confirmação
let nome;
let endereco;
let pedidoPronto = false;

function novoEstado() {
    let temPrato = pratos.querySelector(".selecionado");
    let temBebida = bebidas.querySelector(".selecionado");
    let temSobremesa = sobremesas.querySelector(".selecionado");
    pedidoPronto = temPrato && temBebida && temSobremesa
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

function precoEmNum(){
    for(let i = 0; i < 3; i++){
        // if necessário para que em caso de 
        //mudança no pedido o replace não encontre um
        // preço de tipo number causando erro e congelamento do pedido
        if(typeof(precos[i]) !== "number"){
            precos[i] = precos[i].replace(/,/g, '.')
            precos[i] = precos[i].replace('R$ ', '');  
            precos[i] = Number(precos[i]);   
        }
    }
}

function nomeEndereco() {
    nome = prompt("Qual o seu nome?");
    endereco = prompt("Qual o seu endereço?");

}

function constroiConfirmacao() {
    if(pedidoPronto){
        for(let i = 0; i < 4; i++){
            document.querySelector(`.pedido${i}`).innerHTML = seuPedido[i];
            document.querySelector(`.valor${i}`).innerHTML = precos[i].toFixed(2).replace('.', ',');
        }
        document.querySelector(".valor3").innerHTML = "R$ " + document.querySelector(".valor3").innerHTML; 
    }
}

function ativaModal() {
    modal.classList.add("confirmar-pedido");
    modal.classList.remove("confirmacao")
    filtro.classList.remove("sem-filtro");
}
function desativaModal() {
    modal.classList.remove("confirmar-pedido");
    modal.classList.add("confirmacao")
    filtro.classList.add("sem-filtro");
}

function botaoWhatsapp() {
    nomeEndereco();
    ativaModal();

    // transformando em números para 
    //aplicações de expressões matematicas
    precoEmNum();
    precos[3] = precos[0] + precos[1] + precos[2];

    // retornando a string com virgula para exibição
    precosTexto = precos[3].toFixed(2).replace('.', ',');
    constroiConfirmacao()
    mensagem = `Olá, gostaria de fazer o pedido:
    - Prato: ${seuPedido[0]}
      - Bebida: ${seuPedido[1]}
      - Sobremesa: ${seuPedido[2]}
      Total: R$ ${precosTexto}
      
      Nome: ${nome}
      Endereço: ${endereco}`;   
      
      //criando o link para o whatsapp e o adicionando ao botão
      encodedMensagem = encodeURIComponent(mensagem);
      whatsappReference = `https://wa.me/5581997456285?text=${encodedMensagem}`;
      modal.querySelector("a").setAttribute('href', whatsappReference);
}