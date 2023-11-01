import {
  createStyles,
  Header,
  Input,
  Group,
  Burger,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { Drawer, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: 'fixed',
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    margin: '1rem 0',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface NavbarProps {
  links: { link: string; label: string }[];
  cartCount: number;
  search: string;
  setSearch: (value: string) => void;
}

export default function Navbar({
  links,
  cartCount,
  setSearch,
  search,
}: NavbarProps) {
  const { classes } = useStyles();
  const router = useRouter();

  const handleMenuButton = () => {
    setDrawerOpen(true);
  };

  const handleCartButton = () => {
    router.push('/cart');
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [count, setCount] = useState(9);

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Drawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="400BC"
          padding="xl"
          size="xl"
        >
          {items}
          <Input
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={(event: any) => setSearch(event.currentTarget.value)}
          />
        </Drawer>
        <Group>
          <Burger opened={drawerOpen} onClick={handleMenuButton} size="sm" />
          {/* <MantineLogo size={28} /> */}
        </Group>

        <Group>
          <Group spacing={0} className={classes.social} position="right" noWrap>
            {cartCount !== 0 ? (
              <Indicator label={cartCount} inline size={22} color={'blue'}>
                <ActionIcon size="md" onClick={handleCartButton}>
                  <IconShoppingCart size={20} stroke={1.5} />
                </ActionIcon>
              </Indicator>
            ) : (
              <ActionIcon size="md" onClick={handleCartButton}>
                <IconShoppingCart size={20} stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
          {!drawerOpen && (
            <Input
              placeholder="Search"
              icon={<IconSearch size={16} stroke={1.5} />}
              value={search}
              onChange={(event: any) => setSearch(event.currentTarget.value)}
            />
          )}
        </Group>
      </div>
    </Header>
  );
}
