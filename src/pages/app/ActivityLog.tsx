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

export default function ActivityLog() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Activity Log</div>
          <Text className={classes.muted}>
            Track every view, edit, and share event across your vault.
          </Text>
        </div>
        <Badge className={classes.pill}>Audit Trail</Badge>
      </div>

      <div className={classes.panel}>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Action</Table.Th>
              <Table.Th>Actor</Table.Th>
              <Table.Th>Target</Table.Th>
              <Table.Th>Timestamp</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {activity.map((item) => (
              <Table.Tr key={`${item.actor}-${item.time}`}>
                <Table.Td>
                  <Group gap="xs">
                    {actionMeta[item.action]}
                    <Text fw={600}>{item.action}</Text>
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
