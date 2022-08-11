import { Checkbox, createStyles, Text, UnstyledButton } from '@mantine/core';

const useStyles = createStyles((theme, { isChecked }: { isChecked: boolean }) => ({
  button: {
    display: 'flex',
    width: '100%',
    border: '1px solid',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.lg,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

    borderColor: isChecked ? 'goldenrod' : 'transparent',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
  },
}));

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: React.ReactNode;
  handleCheckBoxChange: any;
  field: string;
  isChecked: boolean;
  key: any;
}

export default function ContentFormCheckboxCard({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  handleCheckBoxChange,
  field,
  isChecked,
  key,
  ...others
}: CheckboxCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxCardProps>) {
  const { classes, cx } = useStyles({ isChecked });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleCheckBoxChange(title)}
      className={cx(classes.button, className)}
    >
      <Checkbox
        checked={isChecked}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: 'pointer' } }}
        onChange={() => handleCheckBoxChange(title)}
      />

      <div>
        <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
          {title}
        </Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </UnstyledButton>
  );
}
