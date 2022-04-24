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
        console.log(urlParams.get('produto'));
        produtoID = urlParams.get('produto');

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
                      <div class="price">${parseFloat(resposta[produtoID].preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                      <div class="qty">
                          <label>Quantidade</label>
                          <input type="number" id="qtd" value="1" min="1" max="15" maxlength="2" step="1" class="itemQuantity">
                      </div>
                      
                      <div class="btn">
                          <button id="adicionar">Adicionar ao Carrinho</button>
                      </div>
                  </div>
        </div>
        <div id="error"></div>
        `
        // Preparando os dados e colocando em um Objeto para salvalos no sessionStorage
        document.getElementById("adicionar").addEventListener("click", addItem)
        function addItem() {

            // Pegando os valores dos campos name e qtd
            const id = `${resposta[produtoID].id}`;
            const name = `${resposta[produtoID].titulo}`;
            const qtd = document.getElementById("qtd").value;
            const preco = `${resposta[produtoID].preco}`;

            // Criando objeto com dados dos inputs
            const dataObj = { id, name, qtd, preco};


            // If para verificar se a quantidade esta correta
            if(!isNaN(qtd) && (qtd != "")){
              if ((qtd >= 1) && (qtd <= 15) && !(parseInt(qtd) != parseFloat(qtd))){

                /* 
                Todo valor do sessionStorage é null no inicio (antes de adicionarmos algum valor nele),
                Por isso checamos se é null, ou seja, se será o primeiro item a ser adicionado.
                */
                
                if (sessionStorage.getItem('items') === null) {
                  
                  // Adicionando um array com um objeto no sessionStorage
                  sessionStorage.setItem('items', JSON.stringify([dataObj]));

                } else {

                  // Copiando o array existente no sessionStorage e adicionando o novo objeto ao final.
                  sessionStorage.setItem(
                    'items',
                    // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
                    JSON.stringify([
                      ...JSON.parse(sessionStorage.getItem('items')),
                      dataObj
                    ])
                  );

                }

                // ----------- Efeito splash -----------
                const splash = document.querySelector('.splash');
                console.log("entrou")
                
                setTimeout(()=>{
                    splash.classList.add('effect')
                }, 200)
                console.log("entrou")
                setTimeout(()=>{
                    splash.classList.add('display-none')
                }, 2000)
                setTimeout(()=>{
                    splash.classList.remove('display-none')
                }, 0)
                

                //----------- atualiza qtde carrinho -----------
                atualizaQtdeCart();

              }else{
                const erro = document.getElementById("error");
                erro.innerHTML = `* Você não pode adicionar ${qtd} itens`
              }
            }else{
              const erro = document.getElementById("error");
              erro.innerHTML = `* Adicione uma quantidade`
            }
        }     
    }
});

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

atualizaQtdeCart();
