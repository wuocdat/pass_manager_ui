import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconCopy,
  IconEdit,
  IconEye,
  IconFolder,
  IconFolderPlus,
  IconLock,
  IconPlus,
  IconSearch,
  IconShare,
  IconTrash,
} from '@tabler/icons-react';
import classes from './PageShell.module.css';

const folderTree = [
  { label: 'Personal', depth: 0, count: 12 },
  { label: 'Work', depth: 0, count: 18 },
  { label: 'Marketing', depth: 1, count: 7 },
  { label: 'Finance', depth: 1, count: 4 },
  { label: 'Vendors', depth: 0, count: 9 },
  { label: 'Legacy', depth: 1, count: 3 },
];

const passwords = [
  {
    title: 'Stripe Dashboard',
    username: 'billing@cifernest.io',
    folder: 'Finance',
    updated: 'Jan 12, 2026',
    shared: true,
    publicAccess: false,
    readOnly: false,
  },
  {
    title: 'Figma Org',
    username: 'design@cifernest.io',
    folder: 'Marketing',
    updated: 'Jan 9, 2026',
    shared: true,
    publicAccess: false,
    readOnly: true,
  },
  {
    title: 'AWS Root',
    username: 'root@cifernest.io',
    folder: 'Work',
    updated: 'Jan 3, 2026',
    shared: false,
    publicAccess: false,
    readOnly: false,
  },
  {
    title: 'Press Kit',
    username: 'public@cifernest.io',
    folder: 'Public',
    updated: 'Dec 27, 2025',
    shared: false,
    publicAccess: true,
    readOnly: true,
  },
];

export default function MyVault() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>My Vault</div>
          <Text className={classes.muted}>
            Organize passwords by folder, share them with confidence, and keep everything audited.
          </Text>
        </div>
        <Group>
          <Button leftSection={<IconFolderPlus size={16} />} variant="light">
            Create Folder
          </Button>
          <Button leftSection={<IconPlus size={16} />} color="teal">
            Create Password
          </Button>
        </Group>
      </div>

      <div className={classes.twoColumn}>
        <div className={classes.panel}>
          <Group justify="space-between" mb="sm">
            <Text fw={600}>Folder Tree</Text>
            <Badge className={classes.pill}>Nested</Badge>
          </Group>
          {folderTree.map((folder) => (
            <div
              key={`${folder.label}-${folder.depth}`}
              className={classes.folderItem}
              style={{ paddingLeft: `${folder.depth * 16 + 8}px` }}
            >
              <IconFolder size={18} color="var(--pm-teal-strong)" />
              <Text size="sm" fw={500}>{folder.label}</Text>
              <Badge size="xs" variant="light" style={{ marginLeft: 'auto' }}>
                {folder.count}
              </Badge>
            </div>
          ))}
        </div>

        <div className={classes.panel}>
          <Group justify="space-between" mb="sm">
            <Text fw={600}>Passwords</Text>
            <Group gap="sm">
              <TextInput
                leftSection={<IconSearch size={16} />}
                placeholder="Search passwords..."
                size="sm"
              />
              <Button variant="light" size="sm" leftSection={<IconShare size={16} />}>
                Share Selected
              </Button>
            </Group>
          </Group>

          <Table striped highlightOnHover withTableBorder>
            <Table.Thead className={classes.tableHeader}>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Folder</Table.Th>
                <Table.Th>Indicators</Table.Th>
                <Table.Th>Updated</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {passwords.map((row) => (
                <Table.Tr key={row.title}>
                  <Table.Td>
                    <Group gap="xs">
                      <IconLock size={16} />
                      <Text fw={600}>{row.title}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>{row.username}</Table.Td>
                  <Table.Td>{row.folder}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {row.shared && <Badge className={classes.badgeShared}>Shared</Badge>}
                      {row.publicAccess && <Badge className={classes.badgePublic}>Public</Badge>}
                      {row.readOnly && <Badge className={classes.badgeReadonly}>Read-only</Badge>}
                    </Group>
                  </Table.Td>
                  <Table.Td>{row.updated}</Table.Td>
                  <Table.Td>
                    <Group gap="xs" justify="flex-end" wrap="nowrap">
                      <ActionIcon variant="subtle" aria-label="Copy username">
                        <IconCopy size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" aria-label="Copy password">
                        <IconEye size={16} />
                      </ActionIcon>
                      <Menu shadow="md" width={180}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" aria-label="More actions">
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconEdit size={16} />}>Edit</Menu.Item>
                          <Menu.Item leftSection={<IconCopy size={16} />}>Copy username</Menu.Item>
                          <Menu.Item leftSection={<IconEye size={16} />}>Copy password</Menu.Item>
                          <Menu.Item leftSection={<IconTrash size={16} />} color="red">
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
