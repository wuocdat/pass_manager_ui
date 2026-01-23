import { Badge, Card, Group, Table, Text } from '@mantine/core';
import { IconFolder, IconLock, IconUsers } from '@tabler/icons-react';
import classes from './PageShell.module.css';

const sharedPasswords = [
  { title: 'Figma Org', owner: 'Design Ops', permission: 'Read-only', lastAccess: 'Jan 12, 2026' },
  { title: 'Notion Team', owner: 'Ops', permission: 'Editable', lastAccess: 'Jan 10, 2026' },
];

const sharedFolders = [
  { name: 'Marketing', owner: 'Leah Park', permission: 'Editable', items: 12 },
  { name: 'Finance', owner: 'Maya Chen', permission: 'Read-only', items: 6 },
];

export default function SharedWithMe() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Shared With Me</div>
          <Text className={classes.muted}>
            Passwords and folders shared by teammates with clear permission indicators.
          </Text>
        </div>
        <Badge className={classes.pill}>Incoming</Badge>
      </div>

      <Card className={classes.card}>
        <Group mb="sm" align="center">
          <IconLock size={18} />
          <Text fw={600}>Passwords shared by other users</Text>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Password</Table.Th>
              <Table.Th>Owner</Table.Th>
              <Table.Th>Permission</Table.Th>
              <Table.Th>Last Accessed</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sharedPasswords.map((item) => (
              <Table.Tr key={item.title}>
                <Table.Td>{item.title}</Table.Td>
                <Table.Td>{item.owner}</Table.Td>
                <Table.Td>
                  <Badge className={item.permission === 'Editable' ? classes.badgeShared : classes.badgeReadonly}>
                    {item.permission}
                  </Badge>
                </Table.Td>
                <Table.Td>{item.lastAccess}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Card className={classes.card}>
        <Group mb="sm" align="center">
          <IconFolder size={18} />
          <Text fw={600}>Folders shared by other users</Text>
        </Group>
        <div className={classes.sectionGrid}>
          {sharedFolders.map((folder) => (
            <Card key={folder.name} className={classes.card}>
              <Group justify="space-between">
                <Group>
                  <IconUsers size={18} />
                  <div>
                    <Text fw={600}>{folder.name}</Text>
                    <Text size="xs" className={classes.muted}>Owner: {folder.owner}</Text>
                  </div>
                </Group>
                <Badge className={folder.permission === 'Editable' ? classes.badgeShared : classes.badgeReadonly}>
                  {folder.permission}
                </Badge>
              </Group>
              <Text size="sm" mt="sm" className={classes.muted}>
                {folder.items} passwords inside this folder.
              </Text>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
