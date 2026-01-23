import { Divider, Popover, Text } from '@mantine/core';
import { useState } from 'react';
import PopOverTargetContent from "@/components/UserPopOver/PopOverTargetContent";

export default function UserPopOver() {
  const [displayPopOver, setDisplayPopOver] = useState<boolean>(false);


  return (
    <div>
      <Popover
        width={200}
        position="right"
        opened={displayPopOver}
        offset={{mainAxis: 13, crossAxis: 0}}
      >
        <Popover.Target>
          <div onClick={() => setDisplayPopOver(prevState => !prevState)}>
            <PopOverTargetContent/>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs" fw={600}>
            Quick actions
          </Text>
          <Text size="xs" c="dimmed" mt={6}>
            Switch workspace or open settings from the top bar.
          </Text>
          <Divider my="sm" />
          <Text size="xs">Profile</Text>
          <Text size="xs" c="dimmed">Security</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  )
}
