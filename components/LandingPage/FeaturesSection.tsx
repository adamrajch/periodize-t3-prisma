import React from 'react';
import { Text, Container, Title, SimpleGrid, createStyles } from '@mantine/core';
import FullPageContainer from './FullPageContainer';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.lg,
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 8],
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
  },
}));

const data = [
  {
    title: 'Create custom training programs with ease',
    description:
      'All the needed tools your disposal to create simple or robuts programs. Macrocycles, blocks, weeks, to custom workouts are all configurable',
  },
  {
    title: 'Generate programs with desired goals',
    description:
      'All the needed tools your disposal to create simple or robuts programs. Macrocycles, blocks, weeks, to custom workouts are all configurable',
  },
  {
    title: 'Subscribe to your own or other programs',
    description:
      'All the needed tools your disposal to create simple or robuts programs. Macrocycles, blocks, weeks, to custom workouts are all configurable',
  },
  {
    title: 'Track and analyze performance',
    description:
      'All the needed tools your disposal to create simple or robuts programs. Macrocycles, blocks, weeks, to custom workouts are all configurable',
  },
];

export function FeaturesSection() {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <div className={classes.item} key={item.title}>
      {/* <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
          <Image src={IMAGES[item.image]} />
        </ThemeIcon> */}

      <div>
        <Text weight={700} size="xl" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text color="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <FullPageContainer center size="md">
      <div>
        <Text className={classes.supTitle}>
          Perfect for both elite athlete and the everyday lifter
        </Text>

        <Title className={classes.title} order={2}>
          Periodize, the ultimate training tool
        </Title>

        <Container size={660} p={0}>
          <Text color="dimmed" className={classes.description}>
            Regardless of discipline, there are a suite of tools ready for you to take your training
            to the next level. Do not spin your wheels guessing what to do in the gym, hop on a
            program and watch yourself grow.
          </Text>
        </Container>

        <SimpleGrid
          cols={2}
          spacing={50}
          breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
          style={{ marginTop: 30 }}
        >
          {items}
        </SimpleGrid>
      </div>
    </FullPageContainer>
  );
}
