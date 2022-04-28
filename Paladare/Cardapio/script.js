// Mostra a quantidade de itens do carrinho
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

$(document).ready(function(){
    atualizaQtdeCart();
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
