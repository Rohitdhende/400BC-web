import React, { useEffect, useState } from 'react';
import { Group } from '@mantine/core';
import ProductCard from './ProductCard';
import {
  addToCart,
  removeFromCart,
  getCartCount,
} from '../pages/data/repo/product-repo';

const ProductListWrapper = ({ data, setCartCount, filter }: any) => {
  const handleCartButton = async (product: any) => {
    addToCart(product);
    setCartCount(await getCartCount());
  };

  return (
    <Group sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {data?.map((item: any, index: number) => (
        <ProductCard
          key={index}
          image={item.image}
          title={item.title}
          sellingPrice={item.price}
          actualPrice={item.price}
          buy="Buy Now"
          link={item.link}
          handleRemove={() => removeFromCart(item.id)}
          handleCart={() =>
            handleCartButton({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              name: item.title,
              variant: 'variant',
            })
          }
        />
      ))}
    </Group>
  );
};

export default ProductListWrapper;
