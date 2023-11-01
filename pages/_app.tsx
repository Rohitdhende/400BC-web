import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [cart, setCart] = useState<any>([]);
  const [cartCount, setCartCount] = useState<any>(0);
  const [subTotal, setSubTotal] = useState(0);
console.log("pageProps",pageProps)
  const saveCart = (cart: any) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    let subT = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subT += cart[keys[i]].quantity * cart[keys[i]].price;
    }
    setSubTotal(subT);
  };

  const clearCart = () => {
    localStorage.clear();
    setCart([]);
    saveCart([]);
  };

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        
        <Component
          {...pageProps}
          cart={cart}
          setCart={setCart}
          clearCart={clearCart}
          setCartCount={setCartCount}
          subTotal={subTotal}
          cartCount={cartCount}
        />
      </MantineProvider>
    </>
  );
}
