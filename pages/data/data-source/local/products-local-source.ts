//add to cart function in typescript using localstorage
export const addToCart = (product: any) => {
  const cart = getCart();
  const productInCart = cart.find(
    (item: any) => item.productId === product.productId
  );

  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

//get cart function in typescript using localstorage
export const getCart = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
  } else {
    return [];
  }
};

export const getCartCount = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart)?.length : 0;
  }
};

//remove from cart function in typescript using localstorage
export const removeFromCart = (productId: any) => {
  const cart = getCart();
  const updatedCart = cart.filter((item: any) => item.productId !== productId);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

//clear cart function in typescript using localstorage
export const clearCart = () => {
  localStorage.removeItem('cart');
};

//get total price function in typescript using localstorage
export const getTotalPrice = () => {
  if (typeof window !== 'undefined') {
    const cart = getCart();

    return cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  }
};
