let cart = []

let modalQt = 1
//fazer a quantidade do modal por padrão ser sempre 1, nunca 0.

let modalKey = 0

const c = (e)=>document.querySelector(e)
//ao inves de digitar document. queroselector, digito apenas o ou para selecionar todos, digito apenas cs
const cs = (e)=>document.querySelectorAll(e)



//----------------LISTAGEM DAS PIZZAS------------------------


//comando abaixo mapeia as pizzas listadas no servidor improvisado pizzajson
pizzaJson.map((item, id)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true)
//comando acima seleciona o modelo de pizza no html e faz uma copia
   
pizzaItem.setAttribute('data-key', id)
//na copia do modelo de pizza, adicionamos ao id, o data-key como uma class

pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
//agora dentro do clone de modelo de pizzahtml, selecionamos o nome da pizza, e inserimos no html o item nome lá do pizzajson.
//faremos o mesmo nos codigos abaixo para todos os detalhes da pizza
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
pizzaItem.querySelector('.pizza-item--img img').src = item.img

//agora as pizzas com suas informações aparecem no site.

pizzaItem.querySelector('a').addEventListener('click', (e)=>{
    e.preventDefault()
    //comando acima seleciona o aref(link) do modelo de pizza html. e cancela o efeito de click que fica atualizando a tela.

    let key = e.target.closest('.pizza-item').getAttribute('data-key')
//comando acima, target se refere a clicar no próprio elemento, o "e" da fun~ção, e o elemento é o 'a' de href, link.
//o .closest é um comando que faz procurar o elemento mais próximo, que tenha "pizza-item", no html ele esta localizado acima.
//entaõ inserimos em 'pizza-item' um getAtrtibute, inserimos o data-key, que se refere ao ID em pizzaJson. 

modalKey = key

modalQt = 1 //para garantir que o modal, após fechado, sempre volta a 1 quando aberto novamente

c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
//comando acima, seleciona o título da pizza no modal, e insere no html o título da pizza, puxando do 'servidor' pizzaJson, acessando key (link com atributo de data-key inserido) e substituindo por name. (nome da pizza)
//isso faz com que sempre puxe as informações da pizza que foi clicada conforme o id no pizzaJson. o mesmo processo se repete abaixo para cada informação no modal.

c('.pizzaBig img').src = pizzaJson[key].img
c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

//comando abaixo seve para remover a seleção do botão "tamanho da pizza"
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


//----------------EVENTOS DO MODAL------------------------

function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none'
    })
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
})


c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--
        c('.pizzaInfo--qt').innerHTML = modalQt
    }
})

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--
        c('.pizzaInfo--qt').innerHTML = modalQt
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++
    c('.pizzaInfo--qt').innerHTML = modalQt
})


cs('.pizzaInfo--size').forEach((size)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = c('.pizzaInfo--size.selected').getAttribute('data-key')
  
let identifier = pizzaJson[modalKey].id+'@'+size
let key = cart.findIndex((item)=>item.identifier == identifier)

if(key > -1) {
    cart[key].qt += modalQt
} else {
    cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
    
    })
}
updateCart()
closeModal()
})


function updateCart() {
    if(cart.length > 0) {
        c('aside').classList.add('show')
        c('.cart').innerHTML = '';

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)
            let cartItem = c('.models .cart--item').cloneNode(true)

            let pizzaSizeName = cart[i].size
            
       
            if(pizzaSizeName == 0) {
                pizzaSizeName = "P";
            } else if(pizzaSizeName == 1) {
                pizzaSizeName = "M";
            } else {
                pizzaSizeName = "G";
            }
            
            /*
            switch(pizzaSizeName = cart[i].size) {
                case 0:
                    pizzaSizeName = "p";
                    break;
                case 1:
                    pizzaSizeName = "m";
                    break;
                case 2:
                    pizzaSizeName = "g";
                    break;
            }
            */


            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt


            c('.cart').append(cartItem)
        }


    } else {
        c('aside').classList.remove('show')
    }
}

function updateCart() {
    if(cart.length > 0) {
        c('aside').classList.add('show')
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)

            console.log(pizzaItem)
        }
    } else {
        c('aside').classList.remove('show')
    }
}

