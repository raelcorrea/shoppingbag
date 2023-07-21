import { notify, subscribe } from '../../app/observable/observer'
import { Bag } from '../../app/bag/bag'
import './shortBagStyle.scss'

const itemBagTemplate = (item) => {
  const { id, title, price } = item
  return `<li>
  <p>${title}</p>
  <p>${new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(price)}</p>
  <button type="button" data-id="${id}"><span class="material-symbols-outlined">
  close
  </span></button>
</li>`
}

const shortBag = () => {
  const bag = new Bag()
  const elem = document.querySelector('.shortBag')
  const list = elem.querySelector('.list')

  const buttonsEventLister = () => {
    const buttons = list.querySelectorAll('button')
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = button.dataset.id
        removeItemBag(id)
      })
    })
  }

  const addItem = (item) => {
    bag.addItemBag({ ...item, quantity: 1 })
    notify('updateBag', bag.itemsMap)
    notify('updateBagCount', bag.itemsMap.size)
  }

  const removeItemBag = (id) => {
    bag.removeItemBag(Number(id))
    notify('updateBag', bag.itemsMap)
    notify('updateBagCount', bag.itemsMap.size)
  }

  const updateBag = (items) => {
    list.innerHTML = ''
    console.log(items)
    if (items.size === 0) {
      list.innerHTML = '<li>Empty Bag</li>'
      return
    }
    items.forEach((item) => {
      list.innerHTML += itemBagTemplate(item)
    })

    buttonsEventLister()
  }

  subscribe('addItemBag', addItem)
  subscribe('updateBag', updateBag)
  subscribe('removeItemBag', removeItemBag)

  return elem
}

export default shortBag
