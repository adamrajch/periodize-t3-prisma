import {
  ActionIcon,
  Box,
  Button,
  Code,
  createStyles,
  Group,
  NativeSelect,
  Stack,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconNote, IconPlus, IconTrash, IconViewportWide, TablerIcon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from 'src/utils/trpc';

import { Block, Day, Week } from 'types/Program';
import AddBlockModal from './Blocks/AddBlockModal';

// type NonNullable<T> = Exclude<T, null | undefined>;
interface FormProps {
  // data: inferQueryOutput<'program.getById'>;
  data: any;
}

const useStyles = createStyles((theme, { weekViewWide }: { weekViewWide: boolean }) => ({
  dayContainer: {
    padding: '12px 16px',
    border: `2px solid ${theme.primaryColor}`,
    borderRadius: theme.radius.md,
    width: weekViewWide ? '48%' : '100%',
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    padding: theme.spacing.xl,
  },
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export default function EditProgramForm({ data }: FormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [blockTab, setBlockTab] = useState<number>(0);
  const [select, setSelect] = useState<string>('0');
  const [weekViewWide, setWeekViewWide] = useState<boolean>(false);

  const utils = trpc.useContext();
  const id = useRouter().query.id as string;
  const mutation = trpc.useMutation(['program.editProgramSchema'], {
    onSuccess() {
      utils.invalidateQueries(['program.getById', { id }]);
    },
  });

  const initialBlocks = data?.schema?.blocks as Block[];

  const form = useForm({
    initialValues: {
      blocks: initialBlocks || [
        {
          name: '',
          summary: '',
          phase: 'hypertrophy',
          weeks: [
            {
              name: '',
              summary: '',
              days: [
                {
                  name: 'Day 1',
                  summary: '',
                  exercises: [],
                },
              ],
            },
          ],
        },
      ],
    },

    validate: {
      blocks: {
        name: (value) => (value.length < 20 ? 'name too long' : null),
        summary: (value) => (value && value.length < 50 ? 'name too long' : null),
      },
    },
  });

  const { blocks } = form.values;
  type FormValues = typeof form.values;

  function handleSubmit() {
    setLoading(true);

    try {
      mutation.mutate({
        id,
        data: form.values.blocks,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  const selectData = blocks.map((block, bi) => ({ value: bi.toString(), label: block.name }));
  const { classes } = useStyles({ weekViewWide });
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit())}>
        <Box p="md">
          <Stack>
            <AddBlockModal blocks={blocks} />
          </Stack>
        </Box>
        <Stack>
          <Group>
            {blocks.length ? (
              <NativeSelect
                value={select}
                onChange={(e) => {
                  setSelect(e.currentTarget.value);
                  // eslint-disable-next-line radix
                  setBlockTab(parseInt(e.currentTarget.value));
                }}
                data={selectData}
              />
            ) : null}

            <ActionIcon
              onClick={() => {
                form.removeListItem('blocks', blockTab);

                if (blockTab !== 0) {
                  setBlockTab(blockTab - 1);
                  setSelect(`${blockTab - 1}`);
                } else {
                  setBlockTab(0);
                  setSelect(`${0}`);
                }
              }}
            >
              <IconTrash color="red" />
            </ActionIcon>
          </Group>
          {blocks.length ? (
            <Tabs value={`${blockTab}`}>
              {blocks.map((block: Block, bi: number) => (
                <Tabs.Panel value={`${bi}`}>
                  <Tabs defaultValue="0">
                    <ActionIcon
                      size="sm"
                      onClick={() =>
                        form.insertListItem(`blocks.${bi}.weeks`, {
                          name: `Week ${block.weeks.length + 1}`,
                          summary: '',
                          days: [],
                        })
                      }
                      sx={{ alignSelf: 'center' }}
                    >
                      <IconPlus />
                    </ActionIcon>
                    {block.weeks.length ? (
                      <>
                        <Tabs.List>
                          {block.weeks.map((week: Week, wi: number) => (
                            <Tabs.Tab value={`${wi}`}>{wi + 1}</Tabs.Tab>
                          ))}
                        </Tabs.List>
                        {block.weeks.map((week: Week, wi: number) => (
                          <Tabs.Panel value={`${wi}`}>
                            <Stack my={12}>
                              <Group>
                                <TextInput
                                  required
                                  withAsterisk
                                  label="Week Name"
                                  placeholder={`Week ${wi + 1}`}
                                  {...form.getInputProps(`blocks.${bi}.weeks.${wi}.name`)}
                                />

                                <ActionIcon onClick={() => setWeekViewWide(!weekViewWide)}>
                                  <IconViewportWide />
                                </ActionIcon>
                                <ActionIcon>
                                  <IconNote />
                                </ActionIcon>
                                <Button
                                  leftIcon={<IconPlus />}
                                  onClick={() =>
                                    form.insertListItem(`blocks.${bi}.weeks.${wi}.days`, {
                                      name: 'hi',
                                      summary: '',
                                      exercises: [],
                                    })
                                  }
                                >
                                  Day
                                </Button>
                                <ActionIcon
                                  onClick={() => {
                                    form.removeListItem(`blocks.${bi}.weeks`, wi);
                                  }}
                                >
                                  <IconTrash />
                                </ActionIcon>
                                {/* <Textarea
                                  label="summary"
                                  {...form.getInputProps(`blocks.${bi}.weeks.${wi}.summary`)}
                                /> */}
                              </Group>

                              <div>
                                {week.days.length ? (
                                  <Stack
                                    sx={{
                                      flexDirection: weekViewWide ? 'row' : 'column',
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    {week.days.map((day: Day, di: number) => (
                                      <Stack className={classes.dayContainer}>
                                        <Group position="apart">
                                          <TextInput
                                            withAsterisk
                                            required
                                            label="Day Name"
                                            placeholder={`Day ${di + 1}`}
                                            {...form.getInputProps(
                                              `blocks.${bi}.weeks.${wi}.days.${di}.name`
                                            )}
                                          />
                                          <Group>
                                            <ActionIcon>
                                              <IconNote />
                                            </ActionIcon>
                                            <ActionIcon
                                              onClick={() => {
                                                form.insertListItem(
                                                  `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                  {
                                                    name: '',
                                                    type: 'single',
                                                  }
                                                );
                                              }}
                                            >
                                              <IconPlus />
                                            </ActionIcon>
                                            <ActionIcon
                                              onClick={() =>
                                                form.removeListItem(
                                                  `blocks.${bi}.weeks.${wi}.days`,
                                                  di
                                                )
                                              }
                                            >
                                              <IconTrash color="red" />
                                            </ActionIcon>
                                          </Group>
                                        </Group>
                                        <div>
                                          {day.exercises.map((ex, ei) => (
                                            <div>name: {ex.name}</div>
                                          ))}
                                        </div>
                                      </Stack>
                                    ))}
                                  </Stack>
                                ) : (
                                  <div>no days</div>
                                )}
                              </div>
                            </Stack>

                            <Code>{JSON.stringify(blocks[bi], null, 4)}</Code>
                          </Tabs.Panel>
                        ))}
                      </>
                    ) : (
                      <div>No weeks</div>
                    )}
                  </Tabs>
                </Tabs.Panel>
              ))}
            </Tabs>
          ) : null}
          <Group position="right">
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
}
