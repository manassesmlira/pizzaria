const c = (e)=>document.querySelector(e)
const cs = (e)=>document.querySelectorAll(e)

pizzaJson.map((item, id)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true)
//comando acima seleciona o modelo de pizza no html
   
pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
//agora dentro do clone de pizzaitem, selecionamos o nome da pizza, e inserimos no html o item nome lá do pizzajson.
//faremos o mesmo nos codigos abaixo para todos os detalhes da pizza
pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
pizzaItem.querySelector('.pizza-item--img img').src = item.img


c('.pizza-area').append(pizzaItem);
    //comando acima joga na tela o clone do modelo html, adicionando e não substituindo. 
    //como o pizzaItem seleciona todos os itens de pizza, então append em pizzaitem joga na tela todos os itens.

})