import './products.style.scss'
import productsservice from '../../service/productService'
import { notify, subscribe, unsubscribe } from '../../app/observable/observer'
import { toPrice } from '../../utils/toPrice'

const itemProductTemplate = (product) => {
  const { id, title, thumbnail, price, brand } = product
  return `<li class="productCard">
    <div class="thumbnail" style="background-image:url(${thumbnail})">
    </div>
    <header class="title">
      <strong>${title}</strong>
    </header>
    <p class="brand">${brand}</p>
    <p class="price">${toPrice(price)}</p>
    <button type="button" data-id="${id}">Adicionar a Bag <span class="bagCount"></span></button>
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

  let bagCount = 0
  let lastProductId = 0
  subscribe('updateBag', (itemsMap) => {
    const itemBag = itemsMap.get(lastProductId)
    if (itemBag !== undefined) {
      bagCount = itemBag.quantity
      return
    }
    bagCount = 0
  })

  subscribe('clearQuantityItemBag', (button) => {
    const counterElem = button.querySelector('.bagCount')
    const parentNodeElem = counterElem.parentNode
    subscribe('removeItemBag', (id) => {
      if (parentNodeElem.dataset.id === id) {
        counterElem.innerHTML = ''
      }
    })
  })

  elem.querySelectorAll('li').forEach((li) => {
    const button = li.querySelector('button')
    button.addEventListener('click', (e) => {
      const id = button.dataset.id
      const product = productsService.getProductById(id)
      lastProductId = Number(id)
      notify('addItemBag', product, e.target)
      button.querySelector('.bagCount').innerHTML = `(${bagCount})`
      notify('clearQuantityItemBag', button)
    })
  })
}

export default products
