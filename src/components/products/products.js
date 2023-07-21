import './products.style.scss'
import productsservice from '../../service/productService'
import { notify } from '../../app/observable/observer'

const itemProductTemplate = (product) => {
  const { id, title, thumbnail, price, brand } = product
  return `<li class="productCard">
    <div class="thumbnail" style="background-image:url(${thumbnail})">
    </div>
    <header class="title">
      <strong>${title}</strong>
    </header>
    <p class="brand">${brand}</p>
    <p class="price">${new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    }).format(price)}</p>
    <button type="button" data-id="${id}">Adicionar a Bag</button>
  </li>`
}

const products = async () => {
  const elem = document.querySelector('.productList')
  const productsService = await productsservice()
  const productList = productsService.getProducts()
  elem.innerHTML = ''
  for (const product of productList.products) {
    elem.innerHTML += itemProductTemplate(product)
  }

  elem.querySelectorAll('li').forEach((li) => {
    li.querySelector('button').addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const product = productsService.getProductById(id)
      notify('addItemBag', product)
    })
  })
}

export default products
