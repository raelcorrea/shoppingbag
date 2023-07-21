const productsservice = async () => {
  const request = await fetch('https://dummyjson.com/products')
  const response = await request.json()
  const products = response
  const getProducts = () => {
    return products
  }
  const getProductById = (id) => {
    return products['products'].filter((product) => product.id == id)[0]
  }
  return {
    getProducts,
    getProductById,
  }
}

export default productsservice
