//pegar os dados do arquivo json atraves do ajax
var ajax = new XMLHttpRequest();

ajax.open("GET", "produtos.json", true);
ajax.responseType = "json";
ajax.send(); 
ajax.addEventListener("readystatechange", function(){
    if(ajax.readyState === 4 && ajax.status === 200){
        console.log(ajax);

        var resposta = ajax.response;
        


        //Pego o ID que foi enviado pelo "produtos.js"
        const urlParams = new URLSearchParams(location.search);
        console.log(urlParams.get('minhaVariavel'));
        produtoID = urlParams.get('minhaVariavel');

        var exibirDados = document.getElementById("resultado");
        exibirDados.innerHTML = `
        <div class="title-details">Detalhes do produto</div>
        <div class="container">
                    <div class="img">
                        <img src="${resposta[produtoID].imagem}" alt="">
                    </div>
                    <div class="content">
                        <div class="product-name">${resposta[produtoID].titulo}</div>
                        <div class="product-description">${resposta[produtoID].descricao}</div>
                        <div class="price">${resposta[produtoID].preco}</div>
                        <div class="qty">
                            <label>Quantidade</label>
                            <input type="number" id="qtd" value="1" min="1" step="1" class="itemQuantity">
                        </div>
                        
                        <div class="btn">
                            <button id="adicionar">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>
        `
        document.getElementById("adicionar").addEventListener("click", addItem)
        function addItem() {
            
            // Pegando os valores dos campos name e qtd
            const name = `${resposta[produtoID].titulo}`;
            const qtd = document.getElementById("qtd").value;
      
            // Criando objeto com dados dos inputs
            const dataObj = { name, qtd };
      
            /* 
            Todo valor do localstorage é null no inicio (antes de adicionarmos algum valor nele),
            Por isso checamos se é null, ou seja, se será o primeiro item a ser adicionado.
            */
            if (localStorage.getItem('items') === null) {
              // Adicionando um array com um objeto no localstorage
              localStorage.setItem('items', JSON.stringify([dataObj]));
            } else {
              // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
              localStorage.setItem(
                'items',
                // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
                JSON.stringify([
                  ...JSON.parse(localStorage.getItem('items')),
                  dataObj
                ])
              );
            }
            
        }

        // Preparando os dados e colocando em um Objeto para salvalos no LocalStorage

                 

    }
});