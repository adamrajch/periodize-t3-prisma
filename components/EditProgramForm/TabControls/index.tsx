import { Button, Group, Select } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAtom } from 'jotai';
import { blockAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';
import AddBlockModal from './AddBlockModal';

export default function TabControls() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);

  const data = form.values.blocks.map((b, bi: number) => ({
    label: `Block ${(bi + 1).toString()}`,
    value: bi.toString(),
  }));

  const weekData = form.values.blocks[blockTab].weeks.map((w, wi: number) => ({
    label: `Week ${(wi + 1).toString()}`,
    value: wi.toString(),
  }));
  return (
    <Group position="apart" my="lg">
      {/* <Stack>
        <AddBlockModal blocks={form.values.blocks} trigger="icon" highlight />
        {form.values.blocks.map((_, bi: number) => (
          <UnstyledButton
            key={bi}
            // className={classes.tabButton}
            sx={(theme) => ({
              backgroundColor: bi === blockTab ? theme.colors.blue[6] : 'transparent',
            })}
            onClick={() => setBlock(bi)}
          >
            {bi + 1}
          </UnstyledButton>
        ))}
      </Stack>
      <Group align="flex-start" spacing={0}>
        <Box>
          <Text
            weight="bold"
            sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: 3 }}
          >
            Weeks
          </Text>
        </Box>
        <Stack>
          <ActionIcon
            onClick={() =>
              form.insertListItem(`blocks.${blockTab}.weeks`, {
                name: `Week ${form.values.blocks[blockTab].weeks.length + 1}`,
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
          {form.values.blocks[blockTab].weeks.map((_, wi: number) => (
            <UnstyledButton
              key={wi}
              sx={(theme) => ({
                backgroundColor: wi === weekTab ? theme.colors.blue[6] : 'transparent',
              })}
              onClick={() => setWeek(wi)}
            >
              {wi + 1}
            </UnstyledButton>
          ))}
        </Stack>
      </Group> */}

      <Group>
        <AddBlockModal blocks={form.values.blocks} trigger="button" highlight />
        {form.values.blocks.length ? (
          <Select
            value={blockTab.toString()}
            data={data}
            onChange={(val) => (val ? setBlock(parseInt(val)) : setBlock(0))}
          />
        ) : null}
      </Group>
      <Group position="right">
        <Button
          leftIcon={<IconPlus size={14} />}
          onClick={() => {
            form.insertListItem(`blocks.${blockTab}.weeks`, {
              name: `Week ${form.values.blocks[blockTab].weeks.length + 1}`,
              summary: '',
              days: [
                {
                  name: '',
                  summary: '',
                  exercises: [],
                },
              ],
            });
            setWeek(weekTab + 1);
          }}
        >
          Week
        </Button>
        {form.values.blocks[blockTab].weeks.length ? (
          <Select
            value={weekTab.toString()}
            data={weekData}
            onChange={(val) => (val ? setWeek(parseInt(val)) : setWeek(0))}
          />
        ) : null}
      </Group>
    </Group>
  );
}
