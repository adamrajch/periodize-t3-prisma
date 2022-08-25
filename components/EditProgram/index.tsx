/* eslint-disable max-len */
import {
  ActionIcon,
  Box,
  Button,
  Code,
  Collapse,
  Container,
  createStyles,
  Group,
  Menu,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconDotsVertical,
  IconMessageCircle,
  IconNote,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
  IconViewportWide,
  TablerIcon,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trpc } from 'src/utils/trpc';

import { Block, Cluster, Day, Lift, Week } from 'types/Program';
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

  liftContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[7],
    borderRadius: theme.radius.md,
  },

  clusterContainer: {
    padding: '12px',
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    padding: theme.spacing.xl,
  },

  tabButton: {
    textAlign: 'center',
    padding: '10px 16px',
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
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
  const [weekTab, setWeekTab] = useState<number>(0);
  const [dayTab, setDayTab] = useState<number>(0);
  const [viewWeek, setViewWeek] = useState<boolean>(false);
  // const [select, setSelect] = useState<string>('0');
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

  useEffect(() => {
    //when switching to a block that doesnt have current Week index
    if (!blocks[blockTab].weeks[weekTab]) {
      setWeekTab(0);
    }
  }, [blockTab]);

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
        <Group align="flex-start" noWrap spacing="xl">
          <Stack>
            <AddBlockModal blocks={blocks} trigger="icon" highlight />
            {blocks.map((block: Block, bi: number) => (
              <UnstyledButton
                className={classes.tabButton}
                sx={(theme) => ({
                  backgroundColor: bi === blockTab ? theme.colors.dark[5] : 'transparent',
                })}
                onClick={() => setBlockTab(bi)}
              >
                {bi + 1}
              </UnstyledButton>
            ))}
          </Stack>
          <Stack>
            <ActionIcon
              onClick={() =>
                form.insertListItem(`blocks.${blockTab}.weeks`, {
                  name: `Week ${blocks[blockTab].weeks.length + 1}`,
                  summary: '',
                  days: [],
                })
              }
              sx={{ alignSelf: 'center' }}
            >
              <IconPlus />
            </ActionIcon>
            {blocks[blockTab].weeks.map((week: Week, wi: number) => (
              <UnstyledButton
                className={classes.tabButton}
                sx={(theme) => ({
                  backgroundColor: wi === weekTab ? theme.colors.dark[5] : 'transparent',
                })}
                onClick={() => setWeekTab(wi)}
              >
                {wi + 1}
              </UnstyledButton>
            ))}
          </Stack>

          <Stack sx={{ flex: 1 }}>
            {blocks.length ? (
              <Tabs value={`${blockTab}`} keepMounted={false}>
                {blocks.map((block: Block, bi: number) => (
                  <Tabs.Panel value={`${bi}`}>
                    <Tabs value={`${weekTab}`} keepMounted={false}>
                      {block.weeks.length ? (
                        <>
                          {block.weeks.map((week: Week, wi: number) => (
                            <Tabs.Panel value={`${wi}`}>
                              <Container size="lg">
                                <Stack my={12}>
                                  <Group position="apart">
                                    <Group align="flex-start">
                                      <TextInput
                                        required
                                        withAsterisk
                                        label="Week Name"
                                        placeholder={`Week ${wi + 1}`}
                                        variant="unstyled"
                                        size="lg"
                                        sx={{ borderBottom: '1px solid white' }}
                                        {...form.getInputProps(`blocks.${bi}.weeks.${wi}.name`)}
                                      />
                                    </Group>

                                    <Group>
                                      <ActionIcon onClick={() => setWeekViewWide(!weekViewWide)}>
                                        <IconViewportWide />
                                      </ActionIcon>
                                      <ActionIcon onClick={() => setViewWeek(!viewWeek)}>
                                        <IconNote />
                                      </ActionIcon>
                                      <Button
                                        leftIcon={<IconPlus />}
                                        onClick={() =>
                                          form.insertListItem(`blocks.${bi}.weeks.${wi}.days`, {
                                            name: '',
                                            summary: '',
                                            exercises: [],
                                          })
                                        }
                                      >
                                        Day
                                      </Button>
                                      <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                          <ActionIcon>
                                            <IconDotsVertical />
                                          </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                          <Menu.Label>Application</Menu.Label>
                                          <Menu.Item icon={<IconSettings size={14} />}>
                                            Generate
                                          </Menu.Item>
                                          <Menu.Item icon={<IconMessageCircle size={14} />}>
                                            Templates
                                          </Menu.Item>

                                          <Menu.Divider />
                                          <Menu.Item
                                            color="red"
                                            icon={<IconTrash size={14} />}
                                            onClick={() => {
                                              if (block.weeks.length > 1 && weekTab !== 0) {
                                                setWeekTab(weekTab - 1);
                                              } else {
                                                setWeekTab(0);
                                              }

                                              form.removeListItem(`blocks.${bi}.weeks`, wi);
                                            }}
                                          >
                                            Delete Week
                                          </Menu.Item>
                                          <Menu.Item
                                            color="red"
                                            icon={<IconTrash size={14} />}
                                            onClick={() => {
                                              if (blocks.length > 1 && blockTab !== 0) {
                                                setBlockTab(blockTab - 1);
                                              } else {
                                                setBlockTab(0);
                                              }
                                              form.removeListItem('blocks', bi);
                                            }}
                                          >
                                            Delete Block
                                          </Menu.Item>
                                        </Menu.Dropdown>
                                      </Menu>
                                    </Group>
                                  </Group>
                                  <Collapse in={viewWeek}>
                                    <Textarea
                                      label="Summary"
                                      {...form.getInputProps(`blocks.${bi}.weeks.${wi}.summary`)}
                                    />
                                  </Collapse>

                                  {week.days.length ? (
                                    <Tabs value={`${dayTab}`} keepMounted={false} variant="pills">
                                      <Group
                                        position="center"
                                        sx={(theme) => ({
                                          backgroundColor: theme.colors.dark[6],
                                        })}
                                      >
                                        <Text size="lg" weight="bold">
                                          DAY
                                        </Text>
                                        <Tabs.List position="center">
                                          {week.days.map((day: Day, di: number) => (
                                            <Tabs.Tab
                                              value={`${di}`}
                                              onClick={() => setDayTab(di)}
                                              sx={{ padding: '16px 20px' }}
                                            >
                                              {di + 1}
                                            </Tabs.Tab>
                                          ))}
                                        </Tabs.List>
                                      </Group>

                                      {week.days.map((day: Day, di: number) => (
                                        <Tabs.Panel value={`${di}`}>
                                          <Stack>
                                            <Group position="apart">
                                              <Group align="flex-start">
                                                <TextInput
                                                  withAsterisk
                                                  required
                                                  label="Day Name"
                                                  placeholder={`Day ${di + 1}`}
                                                  variant="unstyled"
                                                  size="lg"
                                                  sx={{ borderBottom: '1px solid white' }}
                                                  {...form.getInputProps(
                                                    `blocks.${bi}.weeks.${wi}.days.${di}.name`
                                                  )}
                                                />
                                              </Group>
                                              <Group>
                                                <ActionIcon
                                                  onClick={() => {
                                                    // add a lift to exercises[]
                                                    form.insertListItem(
                                                      `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                      {
                                                        name: '',
                                                        weight: {
                                                          load: 135,
                                                        },
                                                        records: [],
                                                      }
                                                    );
                                                  }}
                                                >
                                                  <IconPlus />
                                                </ActionIcon>
                                                <ActionIcon
                                                  onClick={() => {
                                                    form.insertListItem(
                                                      `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                      {
                                                        type: 'cluster',
                                                        name: '',
                                                        lifts: [],
                                                        rest: 0,
                                                        restUnit: 'sec',
                                                        weight: {
                                                          load: 135,
                                                        },
                                                        records: [],
                                                      }
                                                    );
                                                  }}
                                                >
                                                  <IconPlus />
                                                </ActionIcon>
                                                <Menu shadow="md" width={200}>
                                                  <Menu.Target>
                                                    <ActionIcon>
                                                      <IconDotsVertical />
                                                    </ActionIcon>
                                                  </Menu.Target>
                                                  <Menu.Dropdown>
                                                    <Menu.Label>Application</Menu.Label>
                                                    <Menu.Item icon={<IconSettings size={14} />}>
                                                      Generate
                                                    </Menu.Item>
                                                    <Menu.Item
                                                      icon={<IconMessageCircle size={14} />}
                                                    >
                                                      Templates
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item
                                                      color="red"
                                                      icon={<IconTrash size={14} />}
                                                      onClick={() => {
                                                        if (
                                                          block.weeks[wi].days.length > 1 &&
                                                          dayTab !== 0
                                                        ) {
                                                          setDayTab(dayTab - 1);
                                                        } else {
                                                          setDayTab(0);
                                                        }
                                                        form.removeListItem(
                                                          `blocks.${bi}.weeks.${wi}.days`,
                                                          di
                                                        );
                                                      }}
                                                    >
                                                      Delete Day
                                                    </Menu.Item>
                                                  </Menu.Dropdown>
                                                </Menu>
                                              </Group>
                                            </Group>

                                            <Stack>
                                              <TextInput
                                                icon={<IconSearch size={18} stroke={1.5} />}
                                                radius="xl"
                                                size="md"
                                                placeholder="Search Exercises"
                                                rightSectionWidth={42}
                                              />
                                              {day.exercises.length ? (
                                                <>
                                                  {day.exercises.map(
                                                    (ex: Lift | Cluster, ei: number) => (
                                                      <>
                                                        {!('type' in ex) ? (
                                                          <Box className={classes.liftContainer}>
                                                            <Group position="apart">
                                                              <TextInput
                                                                icon={
                                                                  <IconSearch
                                                                    size={18}
                                                                    stroke={1.5}
                                                                  />
                                                                }
                                                                radius="xl"
                                                                size="md"
                                                                placeholder="Search Lift"
                                                                rightSectionWidth={42}
                                                                {...form.getInputProps(
                                                                  `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.name`
                                                                )}
                                                              />

                                                              <Group>
                                                                <ActionIcon>
                                                                  <IconPlus />
                                                                </ActionIcon>
                                                                <Menu shadow="md" width={200}>
                                                                  <Menu.Target>
                                                                    <ActionIcon>
                                                                      <IconDotsVertical />
                                                                    </ActionIcon>
                                                                  </Menu.Target>
                                                                  <Menu.Dropdown>
                                                                    <Menu.Label>
                                                                      Application
                                                                    </Menu.Label>
                                                                    <Menu.Item
                                                                      icon={
                                                                        <IconSettings size={14} />
                                                                      }
                                                                    >
                                                                      Generate
                                                                    </Menu.Item>
                                                                    <Menu.Item
                                                                      icon={
                                                                        <IconMessageCircle
                                                                          size={14}
                                                                        />
                                                                      }
                                                                    >
                                                                      Templates
                                                                    </Menu.Item>
                                                                    <Menu.Divider />
                                                                    <Menu.Item
                                                                      color="red"
                                                                      icon={<IconTrash size={14} />}
                                                                      onClick={() => {
                                                                        form.removeListItem(
                                                                          `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                                          ei
                                                                        );
                                                                      }}
                                                                    >
                                                                      Delete Lift
                                                                    </Menu.Item>
                                                                  </Menu.Dropdown>
                                                                </Menu>
                                                              </Group>
                                                            </Group>
                                                          </Box>
                                                        ) : (
                                                          <Stack
                                                            className={classes.clusterContainer}
                                                          >
                                                            <Group position="apart">
                                                              <div />
                                                              <TextInput
                                                                radius="md"
                                                                size="md"
                                                                placeholder="Cluster"
                                                                rightSectionWidth={42}
                                                                {...form.getInputProps(
                                                                  `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.name`
                                                                )}
                                                              />
                                                              <Group>
                                                                <ActionIcon
                                                                  onClick={() =>
                                                                    form.insertListItem(
                                                                      `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts`,
                                                                      { name: '' }
                                                                    )
                                                                  }
                                                                >
                                                                  <IconPlus />
                                                                </ActionIcon>
                                                                <Menu shadow="md" width={200}>
                                                                  <Menu.Target>
                                                                    <ActionIcon>
                                                                      <IconDotsVertical />
                                                                    </ActionIcon>
                                                                  </Menu.Target>
                                                                  <Menu.Dropdown>
                                                                    <Menu.Label>
                                                                      Application
                                                                    </Menu.Label>
                                                                    <Menu.Item
                                                                      icon={
                                                                        <IconSettings size={14} />
                                                                      }
                                                                    >
                                                                      Generate
                                                                    </Menu.Item>
                                                                    <Menu.Item
                                                                      icon={
                                                                        <IconMessageCircle
                                                                          size={14}
                                                                        />
                                                                      }
                                                                    >
                                                                      Templates
                                                                    </Menu.Item>
                                                                    <Menu.Divider />
                                                                    <Menu.Item
                                                                      color="red"
                                                                      icon={<IconTrash size={14} />}
                                                                      onClick={() => {
                                                                        form.removeListItem(
                                                                          `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                                          ei
                                                                        );
                                                                      }}
                                                                    >
                                                                      Delete Lift
                                                                    </Menu.Item>
                                                                  </Menu.Dropdown>
                                                                </Menu>
                                                              </Group>
                                                            </Group>
                                                            <Stack>
                                                              {ex.lifts.length ? (
                                                                <>
                                                                  {ex.lifts.map(
                                                                    (lift, li: number) => (
                                                                      <Box
                                                                        className={
                                                                          classes.liftContainer
                                                                        }
                                                                      >
                                                                        <Group position="apart">
                                                                          <TextInput
                                                                            icon={
                                                                              <IconSearch
                                                                                size={18}
                                                                                stroke={1.5}
                                                                              />
                                                                            }
                                                                            radius="xl"
                                                                            size="md"
                                                                            placeholder="Search Lift"
                                                                            rightSectionWidth={42}
                                                                            {...form.getInputProps(
                                                                              `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.name`
                                                                            )}
                                                                          />

                                                                          <Group>
                                                                            <ActionIcon>
                                                                              <IconPlus />
                                                                            </ActionIcon>
                                                                            <Menu
                                                                              shadow="md"
                                                                              width={200}
                                                                            >
                                                                              <Menu.Target>
                                                                                <ActionIcon>
                                                                                  <IconDotsVertical />
                                                                                </ActionIcon>
                                                                              </Menu.Target>
                                                                              <Menu.Dropdown>
                                                                                <Menu.Item
                                                                                  icon={
                                                                                    <IconSettings
                                                                                      size={14}
                                                                                    />
                                                                                  }
                                                                                >
                                                                                  Info
                                                                                </Menu.Item>

                                                                                <Menu.Divider />
                                                                                <Menu.Item
                                                                                  color="red"
                                                                                  icon={
                                                                                    <IconTrash
                                                                                      size={14}
                                                                                    />
                                                                                  }
                                                                                  onClick={() => {
                                                                                    form.removeListItem(
                                                                                      `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}.lifts`,
                                                                                      li
                                                                                    );
                                                                                  }}
                                                                                >
                                                                                  Delete Lift
                                                                                </Menu.Item>
                                                                              </Menu.Dropdown>
                                                                            </Menu>
                                                                          </Group>
                                                                        </Group>
                                                                      </Box>
                                                                    )
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <>no lifts</>
                                                              )}
                                                            </Stack>
                                                          </Stack>
                                                        )}
                                                      </>
                                                    )
                                                  )}
                                                </>
                                              ) : (
                                                <div>no exercises</div>
                                              )}
                                            </Stack>
                                          </Stack>
                                        </Tabs.Panel>
                                      ))}
                                    </Tabs>
                                  ) : (
                                    <div>no days</div>
                                  )}
                                </Stack>
                              </Container>

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
          </Stack>
        </Group>
        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </div>
  );
}
