import { IconShoppingCartPlus } from '@tabler/icons';
import {
  Card,
  Text,
  Group,
  createStyles,
  Button,
  ActionIcon,
} from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const image: any = getRef('image');

  return {
    card: {
      position: 'relative',
      height: 300,
      width: 300,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    bodyText: {
      marginLeft: 7,
    },

    sellingPrice: {
      color: 'white',
    },
    actualPrice: {
      color: theme.colors.dark[2],
      textDecoration: 'line-through',
    },

    actionIcon: {
      color: theme.colors.dark[1],
      [`&:hover`]: {
        color: 'white',
      },
    },
  };
});

interface ProductCardProps {
  link: string;
  image: string;
  title: string;
  sellingPrice: string;
  actualPrice: string;
  buy: string;
  handleCart:()=>void;
  handleRemove:()=>void;
}

export default function ProductCard({
  image,
  title,
  sellingPrice,
  actualPrice,
  buy,
  link,
  handleCart,
  handleRemove
}: ProductCardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      target="_blank"
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {title}
          </Text>

          <Group position="apart" spacing="xs">
            <Group position="apart" spacing="xs">
              <Text size="sm" className={classes.sellingPrice}>
                ₹{sellingPrice}
              </Text>
              <Text size="sm" className={classes.actualPrice}>
                ₹{actualPrice}
              </Text>
            </Group>

            <Group spacing="lg" sx={{ gap: 3 }}>
              <ActionIcon size="sm" variant="transparent" onClick={handleCart}>
                <IconShoppingCartPlus
                  size={16}
                  stroke={1.5}
                  className={classes.actionIcon}
                />
              </ActionIcon>
              <Button size="sm" className={classes.bodyText} onClick={handleRemove} sx={{backgroundColor:'#9A5B20'}}>
                {buy}
              </Button>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
