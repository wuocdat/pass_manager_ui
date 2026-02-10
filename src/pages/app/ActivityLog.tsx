import { Badge, Group, Table, Text } from '@mantine/core';
import { IconEye, IconPencil, IconShare, IconStack2 } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import classes from './PageShell.module.css';

const activity = [
  { action: 'View Password', actor: 'Ava Kim', target: 'Stripe Dashboard', time: 'Jan 12, 2026 · 09:24' },
  { action: 'Edit Password', actor: 'Ravi Singh', target: 'AWS Root', time: 'Jan 11, 2026 · 16:10' },
  { action: 'Share Password', actor: 'Nora Lane', target: 'Figma Org', time: 'Jan 11, 2026 · 08:40' },
  { action: 'Share Folder', actor: 'Leah Park', target: 'Marketing', time: 'Jan 10, 2026 · 12:05' },
];

const actionMeta: Record<string, ReactNode> = {
  'View Password': <IconEye size={16} />,
  'Edit Password': <IconPencil size={16} />,
  'Share Password': <IconShare size={16} />,
  'Share Folder': <IconStack2 size={16} />,
};

const actionLabels: Record<string, string> = {
  'View Password': 'Xem mật khẩu',
  'Edit Password': 'Sửa mật khẩu',
  'Share Password': 'Chia sẻ mật khẩu',
  'Share Folder': 'Chia sẻ thư mục',
};

export default function ActivityLog() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Nhật ký hoạt động</div>
          <Text className={classes.muted}>
            Theo dõi mọi lượt xem, chỉnh sửa và chia sẻ trong kho.
          </Text>
        </div>
        <Badge className={classes.pill}>Dấu vết kiểm toán</Badge>
      </div>

      <div className={classes.panel}>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Hành động</Table.Th>
              <Table.Th>Người thực hiện</Table.Th>
              <Table.Th>Mục tiêu</Table.Th>
              <Table.Th>Thời điểm</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {activity.map((item) => (
              <Table.Tr key={`${item.actor}-${item.time}`}>
                <Table.Td>
                  <Group gap="xs">
                    {actionMeta[item.action]}
                    <Text fw={600}>{actionLabels[item.action] || item.action}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>{item.actor}</Table.Td>
                <Table.Td>{item.target}</Table.Td>
                <Table.Td>{item.time}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
