import styles from './styles.scss'
import { notify } from './app/observable/observer.js'
import bagButton from './components/bagButton/bagButton.js'
import products from './components/products/products.js'
import shortBag from './components/shortBag/shortBag.js'

document.addEventListener('DOMContentLoaded', async () => {
  await products()

  const items = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ],
    },
  ]

  const newShortBag = shortBag()

  bagButton().addEventListener('click', (e) => {
    newShortBag.classList.toggle('open')
  })
  //notify('addItemBag', items[0])
})
