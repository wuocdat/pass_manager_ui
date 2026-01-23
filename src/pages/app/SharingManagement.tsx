import {
  Badge,
  Button,
  Group,
  Select,
  Table,
  Text,
  Title,
  SegmentedControl,
} from '@mantine/core';
import { IconShare, IconUserPlus, IconUsers } from '@tabler/icons-react';
import classes from './PageShell.module.css';

const sharedAccess = [
  { name: 'Ava Kim', permission: 'Read', type: 'Password', target: 'Stripe Dashboard' },
  { name: 'Ravi Singh', permission: 'Edit', type: 'Folder', target: 'Marketing' },
  { name: 'Nora Lane', permission: 'Read', type: 'Password', target: 'Figma Org' },
];

export default function SharingManagement() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Sharing Management</div>
          <Text className={classes.muted}>
            Grant access with precision and adjust permissions any time.
          </Text>
        </div>
        <Badge className={classes.pill}>Control Center</Badge>
      </div>

      <div className={classes.sectionGrid}>
        <div className={classes.panel}>
          <Group mb="sm">
            <IconShare size={18} />
            <Text fw={600}>Share Password</Text>
          </Group>
          <Select
            label="Select password"
            placeholder="Choose a credential"
            data={['Stripe Dashboard', 'AWS Root', 'Figma Org']}
          />
          <Select
            label="Select user"
            placeholder="Search team member"
            mt="md"
            data={['Ava Kim', 'Ravi Singh', 'Nora Lane']}
            leftSection={<IconUserPlus size={16} />}
          />
          <Text size="sm" fw={600} mt="md">
            Permission
          </Text>
          <SegmentedControl
            fullWidth
            data={['Read', 'Edit']}
            color="teal"
            mt="xs"
          />
          <Button mt="md" fullWidth color="teal">
            Share password
          </Button>
        </div>

        <div className={classes.panel}>
          <Group mb="sm">
            <IconUsers size={18} />
            <Text fw={600}>Share Folder</Text>
          </Group>
          <Select
            label="Select folder"
            placeholder="Choose a folder"
            data={['Marketing', 'Finance', 'Vendors']}
          />
          <Select
            label="Select user"
            placeholder="Search team member"
            mt="md"
            data={['Ava Kim', 'Ravi Singh', 'Nora Lane']}
            leftSection={<IconUserPlus size={16} />}
          />
          <Text size="sm" fw={600} mt="md">
            Permission
          </Text>
          <SegmentedControl
            fullWidth
            data={['Read', 'Edit']}
            color="teal"
            mt="xs"
          />
          <Button mt="md" fullWidth variant="light" color="teal">
            Share folder
          </Button>
        </div>
      </div>

      <div className={classes.panel}>
        <Group justify="space-between" mb="sm">
          <Text fw={600}>Current Access</Text>
          <Badge className={classes.pill}>Manage</Badge>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Permission</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Target</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sharedAccess.map((item) => (
              <Table.Tr key={`${item.name}-${item.target}`}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>
                  <Badge className={item.permission === 'Edit' ? classes.badgeShared : classes.badgeReadonly}>
                    {item.permission}
                  </Badge>
                </Table.Td>
                <Table.Td>{item.type}</Table.Td>
                <Table.Td>{item.target}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button size="xs" variant="light">Update</Button>
                    <Button size="xs" color="red" variant="subtle">Remove</Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
