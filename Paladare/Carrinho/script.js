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
        $('.menu-btn i').toggleClass("active");
    });
});
var total = [0];
var mensagemWhats = 'https://api.whatsapp.com/send?l=pt_BR&phone=5519991001491&text=Boa%20noite%20pessoal,%20gostaria%20de%20pedir:';
function renderItem(item) {
    // Adicionando uma div com o item e a quantidade na div .items
    var carrinhoExibir = document.getElementById("carrinho-produtos");

    carrinhoExibir.innerHTML += `
    <div class="column left">
        <div class="name">${item.name}</div>
        <div class="price">${parseFloat(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
        <div style="clear:both"></div>
        <div class="qty">Quantidade: <input type="number" id="qtd" value="${item.qtd}" min="1" step="1" class="itemQuantity"></div>
        <div class="subtotal">Subtotal: ${parseFloat(item.qtd * item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} </div>
        <div class="remove"><a>Remover</a></div>
    </div>`
    // var pos = indexOf(item)
    total.push(parseFloat(item.qtd * item.preco));  
}

function getItems() {
    // Pegando o array do localstorage
    const items = JSON.parse(localStorage.getItem('items'));
    // Para cada item do array, é renderizado no html
    items.forEach(item => renderItem(item));
    items.forEach(item => mensagem(item));
}
function totalFunc(valor){
    var totalFinal = 0;
    var totalExibir = document.getElementById("total");

    totalFinal = valor.reduce((totalFinal, currentElement) => totalFinal + currentElement);
    console.log("o totalFinal é de: " + totalFinal);

    totalExibir.innerHTML += `Total: ${totalFinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
}

function mensagem(item){
    var buttonWhatsApp = document.getElementById("buttonWhatsapp");
    mensagemWhats += `%0A${(item.qtd).toString()} - ${(item.name).toString()};`;

    buttonWhatsApp.innerHTML =`<a href="${mensagemWhats} " target="_blank"><i class="fab fa-whatsapp"></i> Fazer pedido</a>`
}
getItems();
totalFunc(total);



//document.getElementById("qtd").addEventListener("click", renderItem)
