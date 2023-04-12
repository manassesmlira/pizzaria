let modalQt = 1

const c = (e)=>document.querySelector(e)
const cs = (e)=>document.querySelectorAll(e)

pizzaJson.map((item, id)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true)
//comando acima seleciona o modelo de pizza no html
   
pizzaItem.setAttribute('data-key', id)


pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
//agora dentro do clone de modelo de pizzahtml, selecionamos o nome da pizza, e inserimos no html o item nome lá do pizzajson.
//faremos o mesmo nos codigos abaixo para todos os detalhes da pizza
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
pizzaItem.querySelector('.pizza-item--img img').src = item.img

pizzaItem.querySelector('a').addEventListener('click', (e)=>{
    e.preventDefault()
    //comando acima seleciona o aref(link) do modelo de pizza html. e cancela o efeito de click que fica atualizando a tela.

    let key = e.target.closest('.pizza-item').getAttribute('data-key')
//comando acima, target se refere a clicar no próprio elemento, o "e" da fun~ção, e o elemento é o 'a' de href, link.
//o .closest é um comando que faz procurar o elemento mais próximo, que tenha "pizza-item", no html ele esta localizado acima.
//entaõ inserimos em 'pizza-item' um getAtrtibute, inserimos o data-key, que se refere ao ID em pizzaJson.

modalQt = 1

c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
//comando acima, seleciona o título da pizza no modal, e insere no html o título da pizza, puxando do 'servidor' pizzaJson, acessando key (link com atributo de data-key inserido) e substituindo por name. (nome da pizza)
//isso faz com que sempre puxe as informações da pizza que foi clicada conforme o id no pizzaJson. o mesmo processo se repete abaixo para cada informação no modal.

c('.pizzaBig img').src = pizzaJson[key].img
c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`


c('.pizzaInfo--size.selected').classList.remove('selected')



//selecionamos as 3 classes de pizzainfosize de uma vez. e criamos a função forEach, significa para cada classe de pizzaInfo-size, porque são 3x a mesma classe para 3 tamanhos diferentes. então na função chamamos size (tamanho da pizza) e chamamos sizeIndex (correspondente ao ID da pizza em pizzajson para identificar o tamanho da pizza conforme informaçoes em pizzajson)
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    
    if (sizeIndex == 2) {
        size.classList.add('selected')
    }

    //no html, nas linhas 3 onde temos as pizzaInfo--size, temos a tag span, que recebe o valor do tamanho da pizza. então selecionamos spam aqui, e no html inserimos: puxando de pizzajson pelo key(ID de pizzajson) e dentro do id vamos em sizes (tamanhos da pizza, que são pequena, media grande pra cada pizza),
    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex] 
    //
    //pizzaJson[key].sizes[sizeIndex] acesso aos tamanhos de pizza
})


c('.pizzaInfo--qt').innerHTML = modalQt


    c('.pizzaWindowArea').style.opacity = 0
//comando acima faz o modal inteiro ficar transparente, invisivel
    //comando abaixo acessa o css e muda o display do modal de none para flex, assim ele vai aparecer quando clicar
    
    c('.pizzaWindowArea').style.display = 'flex'
setTimeout(()=>{
    c('.pizzaWindowArea').style.opacity = 1

}, 200) // função para fazer o modal esperar 200 milisegundos antes de ficar opacidade 1, que significa 100% criando assim uma animação ao abrir o modal
   
})

c('.pizza-area').append(pizzaItem);
    //comando acima joga na tela o clone do modelo html, adicionando e não substituindo. 
    //como o pizzaItem seleciona todos os itens de pizza, então append em pizzaitem joga na tela todos os itens.




})