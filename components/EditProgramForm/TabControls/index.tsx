import AddBlockModal from '@/components/EditProgram/Blocks/AddBlockModal';
import { ActionIcon, Box, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useAtom } from 'jotai';
import { blockAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

export default function TabControls() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  return (
    <Group align="flex-start">
      <Stack>
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
      </Group>
      {/* <Stack>
        <NativeSelect
          value={`Block ${blockTab + 1}`}
          data={form.values.blocks.map((b, bi) => `Block ${bi + 1}`)}
          onChange={(event) => {
            setBlockTab(event.currentTarget.value);
          }}
        />
      </Stack> */}
    </Group>
  );
}
