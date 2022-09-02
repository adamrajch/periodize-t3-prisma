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
  IconCopy,
  IconDeviceFloppy,
  IconDotsVertical,
  IconDownload,
  IconMessageCircle,
  IconNote,
  IconPlus,
  IconSettings,
  IconTrash,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { trpc } from 'src/utils/trpc';

import { Block, Cluster, Day, Lift, Week } from 'types/Program';
import AddExerciseToDaySearch from './AddExerciseToDay';
import AddBlockModal from './Blocks/AddBlockModal';
import ExerciseSection from './Exercise';

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

export default function EditProgramForm({ data }: FormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [blockTab, setBlockTab] = useState<number>(0);
  const [weekTab, setWeekTab] = useState<number>(0);
  const [dayTab, setDayTab] = useState<number>(0);
  const [viewWeek, setViewWeek] = useState<boolean>(false);
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

  async function handleSubmit() {
    setLoading(true);
    console.log('submitting');
    try {
      await mutation.mutate({
        id,
        data: form.values.blocks,
      });
      console.log(mutation.data?.schema);
      console.log(mutation.data?.updatedAt);
    } catch (err) {
      alert(err);
    }

    setLoading(false);
  }

  const selectData = blocks.map((block, bi) => ({ value: bi.toString(), label: block.name }));
  const { classes } = useStyles({ weekViewWide });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Group align="flex-start" noWrap spacing="xs">
          <Group align="flex-start" spacing={0}>
            <Box>
              <Text
                weight="bold"
                sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: 3 }}
              >
                Blocks
              </Text>
            </Box>
            <Stack
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
              })}
            >
              <AddBlockModal blocks={blocks} trigger="icon" highlight />
              {blocks.map((_, bi: number) => (
                <UnstyledButton
                  key={bi}
                  className={classes.tabButton}
                  sx={(theme) => ({
                    backgroundColor: bi === blockTab ? theme.colors.blue[6] : 'transparent',
                  })}
                  onClick={() => setBlockTab(bi)}
                >
                  {bi + 1}
                </UnstyledButton>
              ))}
            </Stack>
          </Group>
          <Group align="flex-start" spacing={0}>
            <Box>
              <Text
                weight="bold"
                sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: 3 }}
              >
                Weeks
              </Text>
            </Box>
            <Stack
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
              })}
            >
              <ActionIcon
                onClick={() =>
                  form.insertListItem(`blocks.${blockTab}.weeks`, {
                    name: `Week ${blocks[blockTab].weeks.length + 1}`,
                    summary: '',
                    days: [
                      {
                        name: '',
                        summary: '',
                        exercises: [],
                      },
                    ],
                  })
                }
                sx={{ alignSelf: 'center' }}
              >
                <IconPlus />
              </ActionIcon>
              {blocks[blockTab].weeks.map((_, wi: number) => (
                <UnstyledButton
                  className={classes.tabButton}
                  sx={(theme) => ({
                    backgroundColor: wi === weekTab ? theme.colors.blue[6] : 'transparent',
                  })}
                  onClick={() => setWeekTab(wi)}
                >
                  {wi + 1}
                </UnstyledButton>
              ))}
            </Stack>
          </Group>

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
                              <Container size="md">
                                <Stack my={12} sx={{ padding: 12 }}>
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
                                          <Menu.Item icon={<IconDeviceFloppy size={14} />}>
                                            Save as template
                                          </Menu.Item>
                                          <Menu.Item
                                            icon={<IconCopy size={14} />}
                                            onClick={() =>
                                              // duplicate the week in the block
                                              form.insertListItem(
                                                `blocks.${bi}.weeks`,
                                                form.values.blocks[bi].weeks[wi]
                                              )
                                            }
                                          >
                                            Duplicate Week
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
                                          <Stack
                                            sx={(theme) => ({
                                              backgroundColor: theme.colors.dark[8],
                                            })}
                                          >
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
                                                <AddExerciseToDaySearch
                                                  form={form}
                                                  bi={bi}
                                                  wi={wi}
                                                  di={di}
                                                />
                                                <Menu shadow="md" width={200}>
                                                  <Menu.Target>
                                                    <ActionIcon>
                                                      <IconDotsVertical />
                                                    </ActionIcon>
                                                  </Menu.Target>
                                                  <Menu.Dropdown>
                                                    <Menu.Item
                                                      icon={<IconMessageCircle size={14} />}
                                                    >
                                                      templates
                                                    </Menu.Item>
                                                    <Menu.Item icon={<IconDownload size={14} />}>
                                                      save as template
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
                                              {day.exercises?.length ? (
                                                <DragDropContext
                                                  onDragEnd={(result) => {
                                                    console.log(result);
                                                    if (!result.destination && !result.combine) {
                                                      return;
                                                    }

                                                    if (result.type === 'EXERCISES') {
                                                      if (result.combine) {
                                                        console.log('combining: ', result);
                                                        if (
                                                          'lifts' in
                                                          day.exercises[
                                                            parseInt(result.combine.draggableId, 10)
                                                          ]
                                                        ) {
                                                          //is going in cluster
                                                          form.insertListItem(
                                                            `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${result.combine.draggableId}.lifts`,
                                                            form.values.blocks[bi].weeks[wi].days[
                                                              di
                                                            ].exercises[result.source.index]
                                                          );
                                                        } else {
                                                          //creating cluster
                                                          form.setFieldValue(
                                                            `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${result.combine.draggableId}`,
                                                            {
                                                              type: 'cluster',
                                                              name: '',
                                                              set: 1,
                                                              summary: '',
                                                              rest: null,
                                                              lifts: [
                                                                {
                                                                  ...form.values.blocks[bi].weeks[
                                                                    wi
                                                                  ].days[di].exercises[
                                                                    result.combine.draggableId
                                                                  ],
                                                                },
                                                                {
                                                                  ...form.values.blocks[bi].weeks[
                                                                    wi
                                                                  ].days[di].exercises[
                                                                    result.source.index
                                                                  ],
                                                                },
                                                              ],
                                                            }
                                                          );
                                                        }
                                                        //delete the dragged element
                                                        form.removeListItem(
                                                          `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                          result.source.index
                                                        );
                                                      } else {
                                                        //reorder logic , find if reordering exercises, or lifts in cluster (type is the index)
                                                        form.reorderListItem(
                                                          `blocks.${bi}.weeks.${wi}.days.${di}.exercises`,
                                                          {
                                                            from: result.source.index,
                                                            to: result.destination?.index,
                                                          }
                                                        );
                                                      }
                                                    } else {
                                                      // moving in superset
                                                      console.log('reordering in a cluster');
                                                      form.reorderListItem(
                                                        `blocks.${bi}.weeks.${wi}.days.${di}.exercises.${result.draggableId[0]}.lifts`,
                                                        {
                                                          from: result.source.index,
                                                          to: result.destination?.index,
                                                        }
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <Droppable
                                                    droppableId="droppable"
                                                    direction="vertical"
                                                    isCombineEnabled
                                                    type="EXERCISES"
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                      >
                                                        {day.exercises.map(
                                                          (ex: Lift | Cluster, ei: number) => (
                                                            <div>
                                                              <Draggable
                                                                key={`blocks.${bi}.weeks.${wi}.days.${di}.exercises.${ei}`}
                                                                index={ei}
                                                                draggableId={ei.toString()}
                                                              >
                                                                {(provided2) => (
                                                                  <Box
                                                                    mt="xs"
                                                                    ref={provided2.innerRef}
                                                                    {...provided2.draggableProps}
                                                                  >
                                                                    <div
                                                                      {...provided2.dragHandleProps}
                                                                    >
                                                                      <ExerciseSection
                                                                        form={form}
                                                                        ex={ex}
                                                                        ei={ei}
                                                                        bi={bi}
                                                                        wi={wi}
                                                                        di={di}
                                                                      />
                                                                    </div>
                                                                  </Box>
                                                                )}
                                                              </Draggable>
                                                            </div>
                                                          )
                                                        )}
                                                        {provided.placeholder}
                                                      </div>
                                                    )}
                                                  </Droppable>
                                                </DragDropContext>
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
                                <Code>{JSON.stringify(blocks[bi], null, 2)}</Code>
                                <Group position="right">
                                  <Button type="submit">Save</Button>
                                </Group>
                              </Container>
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
      </form>
    </div>
  );
}
