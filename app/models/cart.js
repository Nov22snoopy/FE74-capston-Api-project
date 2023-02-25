class Cart{
  constructor() {
    this.cart = [];
  }
  saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  };
  loadCart() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    return cart
  };
  addToCart(product) {
    return this.cart.push(product);
  };
}
