//pegar os dados do arquivo json atraves do ajax
var ajax = new XMLHttpRequest();

ajax.open("GET", "produtos.json", true);
ajax.responseType = "json";
ajax.send(); 
ajax.addEventListener("readystatechange", function(){
    if(ajax.readyState === 4 && ajax.status === 200){
        console.log(ajax);

        var resposta = ajax.response;

//depois de pegar os dados agora é hora de mapealos montando o card dos produtos
        var containerCardsPedidos = document.getElementById('card-pedidos');

        resposta.map((valor)=>{
            containerCardsPedidos.innerHTML += `
            <div class="card">
                <div class="img"><img src="${valor.imagem}" alt=""></div>
                <div class="content">
                    <div class="product-name">${valor.titulo}</div>
                    <div class="price">${parseFloat(valor.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                    <div style="clear:both"></div>
    
                    <div class="product-description">${valor.descricao}<br><br></div>
                    <div class="btn">
                        <a key="${valor.id}" href="#">Detalhes</a>
                    </div>
                </div>
            </div>
            `;
        })

// Passo o ID do produto atraves do metodo get para a pagina "detalhes.js"
        var passaValor= function(valor){
            window.location = "detalhes.html?produto="+valor;
        }
        
        var links = document.getElementsByTagName('a');
            for(var i = 0; i < links.length; i++){
                links[i].addEventListener("click",function(){
                    let key = this.getAttribute('key');
                    console.log("O valor é: " + key);
        
                    var valorQueEuQueroPassar = key;
                    passaValor(valorQueEuQueroPassar);
                    return false;
                })
            }



    }
});

