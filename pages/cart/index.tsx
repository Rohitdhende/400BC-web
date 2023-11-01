import React, { useEffect, useState } from 'react';
import { Container, Box, Button } from '@mantine/core';
import {
  getCart,
  getCartCount,
  getTotalPrice,
  removeFromCart,
} from '../data/repo/product-repo';

const Cart = (props: any) => {
  const [subTotal, setSubTotal] = useState(0);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const subTotal = await getTotalPrice();
      const cart = await getCart();
      const cartCount = await getCartCount();
      props.setCart(cart);
      props.setCartCount(cartCount);
      setSubTotal(subTotal);
    };

    fetchData();

    if (removed) {
      setTimeout(() => {
        setRemoved(false);
      }, 100);
    }
  }, [removed]);

  const handleRenoveButton = (productId: number) => {
    removeFromCart(productId);
    setRemoved(true);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Your Cart</h1>
        <Container sx={{ width: '90%' }}>
          {props.cart.length === 0 && (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                textAlign: 'center',
                paddingY: theme.spacing.xl,
                borderRadius: theme.radius.md,
              })}
            >
              Your Amazon Cart is empty
            </Box>
          )}
          {props.cart.length > 0 && (
            <>
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  textAlign: 'center',
                  paddingY: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  borderBottom: `1px solid ${theme.colors.dark[1]}`,
                })}
              >
                <Container sx={{ display: 'flex', gap: 40 }}>
                  <h4 style={{ flex: 1 }}>Product</h4>
                  <h4 style={{ flex: 1 }}>Quantity</h4>
                  <h4 style={{ flex: 1 }}>Price</h4>
                  <h4 style={{ flex: 1 }}>Total</h4>
                  <h4 style={{ flex: 1 }}></h4>
                </Container>
              </Box>
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  textAlign: 'center',
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                })}
              >
                {props.cart?.map((item: any, index: number) => (
                  <Container key={index} sx={{ display: 'flex', gap: 40 }}>
                    <h4 style={{ flex: 1 }}> {item.name}</h4>
                    <h4 style={{ flex: 1 }}>{item.quantity}</h4>
                    <h4 style={{ flex: 1 }}> {item.price}</h4>
                    <h4 style={{ flex: 1 }}> {item.price}</h4>
                    <Button
                      sx={{ flex: 1 }}
                      onClick={() => handleRenoveButton(item.productId)}
                    >
                      Remove
                    </Button>
                  </Container>
                ))}
              </Box>
            </>
          )}
        </Container>
        {props.cart.length > 0 && <h3> Sub Total: {subTotal}</h3>}
      </div>
    </div>
  );
};
export default Cart;
