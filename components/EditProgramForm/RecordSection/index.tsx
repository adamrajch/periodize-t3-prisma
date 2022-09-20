import { ActionIcon, Group, NumberInput, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons';
import { Lift } from 'types/Program';
import { useProgramFormContext } from '../FormContext';

interface RecordSectionProps {
  ri: number;
  liftPath: string;
  lift: Lift;
  deleteRecord: (i: number) => void;
}
export default function RecordSection({ ri, liftPath, lift, deleteRecord }: RecordSectionProps) {
  const form = useProgramFormContext();
  const isPhone = useMediaQuery('(max-width:576px)');

  return (
    <Group>
      <SimpleGrid cols={4} key={ri} sx={{ textAlign: 'center', flex: 1 }}>
        <NumberInput
          placeholder="5"
          max={1000}
          min={0}
          hideControls={isPhone}
          {...form.getInputProps(`${liftPath}.records.${ri}.sets`)}
        />
        <NumberInput
          placeholder="5"
          max={1000}
          min={0}
          hideControls={isPhone}
          {...form.getInputProps(`${liftPath}.records.${ri}.reps`)}
        />
        <NumberInput
          placeholder="5"
          max={10}
          min={1}
          hideControls={isPhone}
          {...form.getInputProps(`${liftPath}.records.${ri}.rpe`)}
        />
        <NumberInput
          placeholder="5"
          max={100}
          min={1}
          step={10}
          hideControls={isPhone}
          {...form.getInputProps(`${liftPath}.records.${ri}.percent`)}
        />

        {/* {lift.time ? (
        <NumberInput
          placeholder="5"
          max={100}
          min={0}
          {...form.getInputProps(`${liftPath}.records.${ri}.time`)}
        />
      ) : null}
      {lift.distance ? (
        <NumberInput
          placeholder="5"
          max={100}
          min={0}
          {...form.getInputProps(`${liftPath}.records.${ri}.distance`)}
          rightSectionWidth={62}
          rightSection={
            <NativeSelect
              data={[
                { value: 'meter', label: 'm' },
                { value: 'foot', label: 'foot' },
                { value: 'yard', label: 'yard' },
              ]}
              styles={{
                input: {
                  fontWeight: 500,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
          }
        />
      ) : null} */}
      </SimpleGrid>
      <ActionIcon onClick={() => deleteRecord(ri)}>
        <IconX />
      </ActionIcon>
    </Group>
  );
}
