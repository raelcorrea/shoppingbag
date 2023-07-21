export class ItemBagDto {
  id
  title
  price
  quantity
  amount
  constructor({ id, title, price = 0.0, quantity = 1 }) {
    this.id = Number(id)
    this.title = title
    this.price = price
    this.quantity = quantity
    this.amount = this.price * this.quantity
  }
}
