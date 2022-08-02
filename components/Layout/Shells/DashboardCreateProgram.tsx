import { Group, Text, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import React from 'react';
import { openConfirmModal, closeAllModals } from '@mantine/modals';

export default function DashboardCreateProgram() {
  return (
    <Group position="center">
      <Button
        leftIcon={<IconPlus size={16} />}
        onClick={() =>
          openConfirmModal({
            title: 'Please confirm your action',
            closeOnConfirm: false,
            labels: { confirm: 'Next modal', cancel: 'Close modal' },
            children: (
              <Text size="sm">
                This action is so important that you are required to confirm it with a modal. Please
                click one of these buttons to proceed.
              </Text>
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
