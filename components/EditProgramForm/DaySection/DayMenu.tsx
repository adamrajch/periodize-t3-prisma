import { ActionIcon, Menu } from '@mantine/core';
import { IconDotsVertical, IconDownload, IconMessageCircle, IconTrash } from '@tabler/icons';
import { useAtom } from 'jotai';
import { blockAtom, dayAtom, weekAtom } from '../ControlAtoms';
import { useProgramFormContext } from '../FormContext';

export default function DayMenu() {
  const form = useProgramFormContext();
  const [blockTab, setBlock] = useAtom(blockAtom);
  const [weekTab, setWeek] = useAtom(weekAtom);
  const [dayTab, setDay] = useAtom(dayAtom);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconMessageCircle size={14} />}>templates</Menu.Item>
        <Menu.Item icon={<IconDownload size={14} />}>save as template</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            if (form.values.blocks[blockTab].weeks[weekTab].days.length > 1 && dayTab !== 0) {
              setDay(dayTab - 1);
            } else {
              setDay(0);
            }
            form.removeListItem(`blocks.${blockTab}.weeks.${weekTab}.days`, dayTab);
          }}
        >
          Delete Day
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
