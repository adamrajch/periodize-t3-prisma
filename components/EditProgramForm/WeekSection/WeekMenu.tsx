import { ActionIcon, Menu } from '@mantine/core';
import {
  IconCopy,
  IconDeviceFloppy,
  IconDotsVertical,
  IconMessageCircle,
  IconSettings,
  IconTrash,
} from '@tabler/icons';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

export default function WeekMenu() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  const week = form.values.blocks[blockTab].weeks[weekTab];
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Generate</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Templates</Menu.Item>
        <Menu.Item icon={<IconDeviceFloppy size={14} />}>Save as template</Menu.Item>
        <Menu.Item
          icon={<IconCopy size={14} />}
          onClick={() =>
            // duplicate the week in the block
            form.insertListItem(
              `blocks.${blockTab}.weeks`,
              form.values.blocks[blockTab].weeks[weekTab]
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
            if (form.values.blocks[blockTab].weeks.length > 1 && weekTab !== 0) {
              setWeek(weekTab - 1);
            } else {
              setWeek(0);
            }

            form.removeListItem(`blocks.${blockTab}.weeks`, weekTab);
          }}
        >
          Delete Week
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            if (form.values.blocks.length > 1 && blockTab !== 0) {
              setBlock(blockTab - 1);
            } else {
              setBlock(0);
            }
            form.removeListItem('blocks', blockTab);
          }}
        >
          Delete Block
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
