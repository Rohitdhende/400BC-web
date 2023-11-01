import * as ProductRemoteSource from '../data-source/remote/product-remote-source';
import * as ProductLocalSource from '../data-source/local/products-local-source';

export const getProductList = async () => {
  let data = await ProductRemoteSource.getProductList();
  return data;
};

export const getTotalPrice = async () => {
  let data = await ProductLocalSource.getTotalPrice();
  return data;
};

export const getCartCount = async () => {
  let data = await ProductLocalSource.getCartCount();
  return data;
};

export const getCart = async () => {
  let data = await ProductLocalSource.getCart();
  return data;
};

export const addToCart = (product: any) => {
  ProductLocalSource.addToCart(product);
};

export const removeFromCart = (productId: any) => {
  ProductLocalSource.removeFromCart(productId);
};

export const clearCart = () => {
  ProductLocalSource.clearCart();
};
