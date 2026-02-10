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
            Thao tác nhanh
          </Text>
          <Text size="xs" c="dimmed" mt={6}>
            Chuyển không gian làm việc hoặc mở cài đặt từ thanh trên.
          </Text>
          <Divider my="sm" />
          <Text size="xs">Hồ sơ</Text>
          <Text size="xs" c="dimmed">Bảo mật</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  )
}
