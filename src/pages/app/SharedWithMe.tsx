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

const permissionLabels: Record<string, string> = {
  'Read-only': 'Chỉ đọc',
  Editable: 'Có thể sửa',
};

export default function SharedWithMe() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Được chia sẻ với tôi</div>
          <Text className={classes.muted}>
            Mật khẩu và thư mục do đồng đội chia sẻ với chỉ báo quyền rõ ràng.
          </Text>
        </div>
        <Badge className={classes.pill}>Đến</Badge>
      </div>

      <Card className={classes.card}>
        <Group mb="sm" align="center">
          <IconLock size={18} />
          <Text fw={600}>Mật khẩu được người khác chia sẻ</Text>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Mật khẩu</Table.Th>
              <Table.Th>Chủ sở hữu</Table.Th>
              <Table.Th>Quyền</Table.Th>
              <Table.Th>Truy cập gần nhất</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sharedPasswords.map((item) => (
              <Table.Tr key={item.title}>
                <Table.Td>{item.title}</Table.Td>
                <Table.Td>{item.owner}</Table.Td>
                <Table.Td>
                  <Badge className={item.permission === 'Editable' ? classes.badgeShared : classes.badgeReadonly}>
                    {permissionLabels[item.permission] || item.permission}
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
          <Text fw={600}>Thư mục được người khác chia sẻ</Text>
        </Group>
        <div className={classes.sectionGrid}>
          {sharedFolders.map((folder) => (
            <Card key={folder.name} className={classes.card}>
              <Group justify="space-between">
                <Group>
                  <IconUsers size={18} />
                  <div>
                    <Text fw={600}>{folder.name}</Text>
                    <Text size="xs" className={classes.muted}>Chủ sở hữu: {folder.owner}</Text>
                  </div>
                </Group>
                <Badge className={folder.permission === 'Editable' ? classes.badgeShared : classes.badgeReadonly}>
                  {permissionLabels[folder.permission] || folder.permission}
                </Badge>
              </Group>
              <Text size="sm" mt="sm" className={classes.muted}>
                {folder.items} mật khẩu trong thư mục này.
              </Text>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
