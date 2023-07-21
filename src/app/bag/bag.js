export class Bag {
  constructor() {
    this.itemsMap = new Map()
  }

  get count() {
    return this.itemsMap.size
  }

  addItemBag(itemBag) {
    const { id, quantity, price } = itemBag
    const existingItem = this.itemsMap.get(id)
    console.log('Bag:', itemBag)
    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.amount = existingItem.price * existingItem.quantity
    } else {
      const newItem = { ...itemBag, amount: price * quantity }
      this.itemsMap.set(id, newItem)
    }
  }

  removeItemBag(id) {
    if (!this.itemsMap.has(id)) {
      throw new Error(`Item with ID ${id} not found in the bag.`)
    }
    this.itemsMap.delete(id)
  }

  getAllItemsBag() {
    return Array.from(this.itemsMap.values())
  }

  getItemBag(id) {
    return this.itemsMap.get(id)
  }
}
