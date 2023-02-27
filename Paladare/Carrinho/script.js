$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 100){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn .fas.fa-bars').toggleClass("active");
    });
});
//----------------------------------

function renderItem(item, idPosicao) {
    
    // Adicionando uma div com o item e a quantidade na div .items
    var carrinhoExibir = document.getElementById("carrinho-produtos");
    
    carrinhoExibir.innerHTML += `
    <div class="products">
        <div class="name">${item.name}</div>
        <div class="price">${parseFloat(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
        <div style="clear:both"></div>
        <div class="qty">
            Quantidade: 
                <div class="qtde">
                    <a onclick='removeQtde(${idPosicao},${item.qtd})' id="remove">-</a>
                    <div value="" class="itemQuantity" id="qtd">${item.qtd}</div>
                    <a onclick='addQtde(${idPosicao},${item.qtd})' id="add">+</a>
                </div>
        </div>
        <div class="subtotal">Subtotal: ${parseFloat(item.qtd * item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} </div>
        <div class="remove"><a onclick='removeProd(${idPosicao})'>Remover</a></div>
    </div>`
}

function addQtde(idPosicao,quantidade){

    if(quantidade >= 15){

        console.log("tentou colocar um valor inválido");

    }else{

    let item = JSON.parse(sessionStorage.getItem('items'));
    
    // Soma +1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${quantidade + 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));
    
    // atualiza os dados na tela
    getItems();
    }
}

function removeQtde(idPosicao,quantidade){
    
    if(quantidade == 1){
        
        console.log("tentou colocar um valor inválido");

    }else{
    
        let item = JSON.parse(sessionStorage.getItem('items'));
    
    // Subtrai -1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${quantidade - 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    // atualiza os dados na tela
    getItems();
    }
    
    
}

// Se o carrinho estiver vazio mostra uma mensagem na tela para o usuário olhar o cardápio
function carrinhoVazio(){
    let items = JSON.parse(sessionStorage.getItem('items'));
    
    console.log("Chamou o CARREGA DADOS");

    if (items === null) {
        var carrinhoExibir = document.getElementById("cart-content");
        carrinhoExibir.innerHTML = "";
        var carrinhoExibir = document.getElementById("cart-null");
        carrinhoExibir.innerHTML = `
        <div class="noProduct">
            <div class="small-title">Seu carrinho do Paladare está vazio</div>
            <div class="small-subtitle">Dê uma olhada no nosso cardápio<div>
            <a href="../Cardapio/index.html">Ver Cardápio</a>
            
        </div>
        `
    }
}

function getItems() {

    // Pegando o array do sessionStorage e chamando a função carrinhoVazio por padrão
    let items = JSON.parse(sessionStorage.getItem('items'));
    carrinhoVazio();

    //verificando se o items existe no sessionStorage
    if(sessionStorage.getItem('items')){
        if(items.length == 0){
            sessionStorage.removeItem('items');

            // Limpa a tela e exibe a mensagem na tela que o carrinho está vazio
            carrinhoVazio();
            atualizaQtdeCart();

        }else{
            
            // Limpando o html
            var carrinhoExibir = document.getElementById("carrinho-produtos");
            carrinhoExibir.innerHTML="";

            // Para cada item do array, é renderizado no html
            items.forEach((item, indexid) => {renderItem(item,indexid)});

            // Atualizando a mensagem do whatsapp e o total
            mensagem();
            totalFunc()
            atualizaQtdeCart();
        }
     }
    
}

function removeProd(id){

    // pego os dados da sessionStrorage e excluo o posição que o usuário clicou    
    let item = JSON.parse(sessionStorage.getItem('items'));
    item.splice(id, 1);
    sessionStorage.setItem("items", JSON.stringify(item));

    // atualiza os dados na tela
    getItems();    
}

function totalFunc(){
    
    var totalFinal = [];
    var totalExibir = document.getElementById("total");
    let item = JSON.parse(sessionStorage.getItem('items'));

    // Adicionando os itens no total
    item.forEach((item, indexid) => {
        totalFinal.push(parseFloat(item.qtd * item.preco));  
    });

    // Soma tudo e joga no total
    totalFinal = totalFinal.reduce((totalFinal, currentElement) => totalFinal + currentElement);
    console.log("o totalFinal é de: " + totalFinal);

    //Exibe o total
    totalExibir.innerHTML = `Total: ${totalFinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
}

// Função do botão para mandar o pedido com os itens no whatsapp
function mensagem(){
    var buttonWhatsApp = document.getElementById("buttonWhatsapp");
    var mensagemWhats = 'https://api.whatsapp.com/send?l=pt_BR&phone=5519900000000&text=Boa%20noite%20pessoal,%20gostaria%20de%20pedir:';
    
    let item = JSON.parse(sessionStorage.getItem('items'));

    // Adicionando os itens na mensagem
    item.forEach((item, indexid) => {
        mensagemWhats += `%0A${(item.qtd).toString()} - ${(item.name).toString()};`;
    });
    
    // Adicionando a mensagem do WhatsApp no botão
    buttonWhatsApp.innerHTML =`<a href="${mensagemWhats} " target="_blank"><i class="fab fa-whatsapp"></i> Fazer pedido</a>`
}

// Mostra a quantidade de itens do carrinho da barra de navegacao
function atualizaQtdeCart(){
    let exibeQtdeCart = document.getElementById("cont-cart");
    let item = JSON.parse(sessionStorage.getItem('items'));
    let qtde = []
    if(item != null){
        item.forEach((item) => {
            qtde.push(parseInt(item.qtd));  
        });
        let total = qtde.reduce((total, qtde) => total + qtde, 0);
        exibeQtdeCart.innerHTML = `${total}`
    }else{
        exibeQtdeCart.innerHTML = `0`
    }
}

atualizaQtdeCart();
getItems();
totalFunc();
