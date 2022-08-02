import { createStyles, Stack, Text, UnstyledButton } from '@mantine/core';

interface ChooseContentProps {
  type: string;
  setType: any;
}

const contentTypes = ['program', 'split', 'routine'];

const useStyles = createStyles((theme) => ({
  button: {
    border: '1px solid',
    padding: 10,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
  },
}));

export default function ChooseContent({ type, setType }: ChooseContentProps) {
  const { classes } = useStyles();

  return (
    <Stack>
      {contentTypes.map((c: string) => (
        <UnstyledButton
          key={c}
          className={classes.button}
          sx={{ borderColor: type === c ? 'gold' : 'blue' }}
          onClick={() => {
            setType(c);
          }}
        >
          {c}
        </UnstyledButton>
      ))}
      <Text>{type}</Text>
    </Stack>
  );
}
