import { Button, createStyles, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { closeAllModals, openConfirmModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { useEffect, useState } from 'react';

const contentTypes = ['program', 'split', 'routine'];

const useStyles = createStyles((theme) => ({
  button: {
    border: '1px solid',
    padding: 10,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
  },
}));
export default function AddContentModal() {
  const [type, setType] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const { classes } = useStyles();
  useEffect(() => {
    console.log('type state: ', type);
  }, [type]);

  return (
    <Group position="center">
      <Button
        leftIcon={<IconPlus size={16} />}
        onClick={() =>
          openConfirmModal({
            // title: 'Please confirm your action',
            closeOnConfirm: false,
            labels: { confirm: 'Next', cancel: 'Close' },
            // children: <ChooseContent type={type} setType={setType} />,
            children: (
              <Stack>
                {contentTypes.map((c: string) => (
                  <UnstyledButton
                    key={c}
                    className={classes.button}
                    sx={{ borderColor: type === c ? 'gold' : 'blue' }}
                    onClick={() => setType(c)}
                  >
                    {c}
                  </UnstyledButton>
                ))}
                <Text>hi sdfdsfds {type}</Text>
              </Stack>
            ),
            onConfirm: () =>
              openConfirmModal({
                title: 'This is modal at second layer',
                labels: { confirm: 'Close modal', cancel: 'Back' },
                closeOnConfirm: false,
                children: (
                  <Text size="sm">
                    When this modal is closed modals state will revert to first modal
                  </Text>
                ),
                onConfirm: closeAllModals,
              }),
          })
        }
      >
        <Group>
          <Text>Create</Text>
        </Group>
      </Button>
    </Group>
  );
}
