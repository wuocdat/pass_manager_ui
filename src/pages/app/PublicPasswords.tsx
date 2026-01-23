import { Badge, Group, Table, Text } from '@mantine/core';
import { IconLock, IconWorld } from '@tabler/icons-react';
import classes from './PageShell.module.css';

const publicItems = [
  { title: 'Press Kit', username: 'public@cifernest.io', category: 'Marketing', updated: 'Jan 2, 2026' },
  { title: 'Partner Portal', username: 'partner@cifernest.io', category: 'Vendors', updated: 'Dec 18, 2025' },
  { title: 'Status Page', username: 'status@cifernest.io', category: 'Ops', updated: 'Dec 4, 2025' },
];

export default function PublicPasswords() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Public Passwords</div>
          <Text className={classes.muted}>
            System-wide shared credentials are read-only for safety.
          </Text>
        </div>
        <Badge className={`${classes.pill} ${classes.badgePublic}`}>Public Label</Badge>
      </div>

      <div className={classes.panel}>
        <Group mb="sm" align="center">
          <IconWorld size={18} />
          <Text fw={600}>System-wide shared passwords</Text>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Password</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Access</Table.Th>
              <Table.Th>Last Updated</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {publicItems.map((item) => (
              <Table.Tr key={item.title}>
                <Table.Td>
                  <Group gap="xs">
                    <IconLock size={16} />
                    {item.title}
                  </Group>
                </Table.Td>
                <Table.Td>{item.username}</Table.Td>
                <Table.Td>{item.category}</Table.Td>
                <Table.Td>
                  <Badge className={classes.badgeReadonly}>Read-only</Badge>
                </Table.Td>
                <Table.Td>{item.updated}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
