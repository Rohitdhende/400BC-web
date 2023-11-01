import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { createStyles } from '@mantine/core';
import ProductListWrapper from '../components/ProductListWrapper';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons';
import { Accordion, useMantineTheme, Title, RangeSlider } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons';

import {
  getProductList,
  getTotalPrice,
  getCartCount,
} from './data/repo/product-repo';


const Links = [
  {
    link: '/contact',
    label: 'Contact',
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/store',
    label: 'Store',
  },
];

export const getServerSideProps = async (context:any) => {
  // const filter = context.query.filter || 'all';
  // const search = context.query.search || '';
  let ip;

  const { req } = context;

  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  const data = await getProductList();

  const productList = await getProductList();

  return {
    props: { products: data, productList, ip },
  };
};

export default function IndexPage({
  products,
  cart,
  addToCart,
  subTotal,
  clearCart,
  setCartCount,
  removeFromCart,
  cartCount,
  productList,
}: any) {

  useEffect(() => {
    const fetchData = async () => {
      const cartCount = await getCartCount();
      setCartCount(cartCount);
    };
    fetchData();
  }, [cart]);


  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [search, setSearch] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>400BC</title>
        <meta
          name="description"
          content="E-commerce website for buying products"
        />
      </Head>
      <Navbar
        links={Links}
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
      />
      <Accordion variant="contained" sx={{ width: '50%' }}>
        <Accordion.Item value="filter">
          <Accordion.Control icon={<IconAdjustments size={18} />}>
            <Title order={4}>Price</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <RangeSlider
              mt="xl"
              mb="xl"
              defaultValue={[25, 75]}
              value={rangeValue}
              onChange={setRangeValue}
              marks={[
                { value: 0, label: '0' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 75, label: '75' },
                { value: 100, label: '200' },
              ]}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <main className={styles.main}>
        <ProductListWrapper
          data={productList}
          cart={cart}
          addToCart={addToCart}
          subTotal={subTotal}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
          setCartCount={(value: number) => setCartCount(value)}
          filter={rangeValue}
          search={search}
        />

        {productList.length === 0 && (
          <div>
            <Title order={4}>Sorry, no products found</Title>
          </div>
        )}
      </main>
    </div>
  );
}
