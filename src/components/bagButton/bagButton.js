import { subscribe } from '../../app/observable/observer'
import './bagButton.style.scss'

const bagButton = () => {
  const elem = document.querySelector('.bagButton')
  const valueElem = elem.querySelector('.value')
  const updateBagCount = (count) => {
    valueElem.innerHTML = `(${count})`
  }
  subscribe('updateBagCount', updateBagCount)
  return elem
}

export default bagButton
