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
function renderItem(item) {
    // Adicionando uma div com o item e a quantidade na div .items
    var carrinhoExibir = document.getElementById("carrinho-produtos");

    carrinhoExibir.innerHTML += `
    <div class="column left">
        <div class="name">${item.name}</div>
        <div class="price">${parseFloat(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
        <div class="qty">Quantidade: <input type="number" id="qtd" value="${item.qtd}" min="1" step="1" class="itemQuantity"></div>
        <div class="subtotal">Subtotal: ${parseFloat(item.qtd * item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} </div>
    </div>`
    // var pos = indexOf(item)
    total.push(parseFloat(item.qtd * item.preco));
    console.log("o total é de: " + total)    
}

function getItems() {
    // Pegando o array do localstorage
    const items = JSON.parse(localStorage.getItem('items'));
    // Para cada item do array, é renderizado no html
    items.forEach(item => renderItem(item));
}
function totalFunc(valor){
    var totalFinal = 0;
    var totalExibir = document.getElementById("total");
    totalFinal = valor.reduce((totalFinal, currentElement) => totalFinal + currentElement);
    console.log("o totalFinal é de: " + totalFinal);

    totalExibir.innerHTML += `O valor total é: ${totalFinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
}
getItems();
totalFunc(total);

//document.getElementById("qtd").addEventListener("click", renderItem)
