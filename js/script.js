
//selecionando elementos

//elementos html
let quantidade_produtos = document.querySelector(".quantidade_produtos")
let quantidade_produtos_estoque = document.querySelector(".quantidade_produtos_estoque")
let quantidade_estoque_baixo = document.querySelector(".quantidade_estoque_baixo")
let quantidade_sem_estoque = document.querySelector(".quantidade_sem_estoque")

//botoes
const button_novo_produto = document.querySelector("#button_novo_produto")
const button_deletar_produto = document.querySelector("#button_deletar")
const button_salvar_alteraçoes = document.querySelector("#button_salvar_alteracoes")

//container
const container_estoque_produtos = document.querySelector("#container_estoque_produtos")
const container_estoque_produtos_data_itens = document.querySelector("#container_estoque_produtos__data__itens")

//inputs
const inputNomeProduto = document.querySelector("#nome_produto")
const inputCategoriaProduto = document.querySelector("#categoria_produto")
const inputPrecoProduto = document.querySelector("#preco_produto")
const inputQuantidadeProduto = document.querySelector("#quantidade_produto")
const inputStatusProduto = document.querySelector("#status_produto")



//variaveis
const produtos = []



//funcoes
function limparInputs(){
    inputNomeProduto.value = ""
    inputCategoriaProduto.value = ""
    inputPrecoProduto.value = ""
    inputQuantidadeProduto.value = ""
    inputStatusProduto.value = ""
}



button_novo_produto.addEventListener("click", () => {
    const novoProduto = {
        id: Date.now(),
        nome: inputNomeProduto.value,
        categoria: inputCategoriaProduto.value,
        preco: Number(inputPrecoProduto.value),
        quantidade: inputQuantidadeProduto.value,
        status: inputStatusProduto.value
    };

    produtos.push(novoProduto);
    adicionarDadosTabela()
    alterarValor()
    limparInputs()


});





function alterarValor() {

    let totalEstoque = 0
    let totalBaixo = 0
    let totalSemEstoque = 0

    produtos.forEach(produto => {

        if (produto.status === "Em estoque") {

            totalEstoque++

        } else if (produto.status === "Estoque baixo") {

            totalBaixo++

        } else if (produto.status === "Sem estoque") {

            totalSemEstoque++

        }

    })

    
    quantidade_produtos.textContent = produtos.length
    quantidade_produtos_estoque.textContent = totalEstoque
    quantidade_estoque_baixo.textContent = totalBaixo
    quantidade_sem_estoque.textContent = totalSemEstoque

}





const adicionarDadosTabela = () => {
    container_estoque_produtos_data_itens.innerHTML = ""


    produtos.forEach(produto => {
        const row = document.createElement("div")
        const buttonAtualizarItem = document.createElement("button")
        row.classList.add("div_row")

        row.innerHTML = `
        <p>${produto.id}</p>
        <p>${produto.nome}</p>
        <p>${produto.categoria}</p>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <p>${produto.quantidade}</p>
        <p class="${produto.status.toLowerCase().replaceAll(" ", "-")}">${produto.status}</p>
        
    <p>
        <button class="button_editar" data-id="${produto.id}">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="button_deletar" data-id="${produto.id}">
            <i class="fa-solid fa-trash"></i>
        </button>
    </p>

        `;


        container_estoque_produtos_data_itens.appendChild(row)
    

    })

}








container_estoque_produtos_data_itens.addEventListener("click", (e) => {

    if (e.target.closest(".button_deletar")) {

        const id = Number(e.target.closest(".button_deletar").dataset.id)

        const index = produtos.findIndex(produto => produto.id === id)

        produtos.splice(index, 1)
        alterarValor()

        adicionarDadosTabela()

    }

})




let idProdutoEditando = null


container_estoque_produtos_data_itens.addEventListener("click", (e) => {

    if (e.target.closest(".button_editar")) {


        const id = Number(
            e.target.closest(".button_editar").dataset.id
        )

        idProdutoEditando = id


        const produto = produtos.find(
            produto => produto.id === id
        )


        inputNomeProduto.value = produto.nome
        inputCategoriaProduto.value = produto.categoria
        inputPrecoProduto.value = Number(produto.preco)
        inputQuantidadeProduto.value = produto.quantidade
        inputStatusProduto.value = produto.status

    }

})

button_salvar_alteraçoes.addEventListener("click", () => {
    const produto = produtos.find(
        produto => produto.id === idProdutoEditando
    )


    produto.nome = inputNomeProduto.value
    produto.categoria = inputCategoriaProduto.value
    produto.preco = Number(inputPrecoProduto.value)
    produto.quantidade = inputQuantidadeProduto.value
    produto.status = inputStatusProduto.value


    adicionarDadosTabela()
     alterarValor()
    limparInputs()
   

})



