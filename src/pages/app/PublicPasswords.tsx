import { Badge, Group, Table, Text } from '@mantine/core';
import { IconLock, IconWorld } from '@tabler/icons-react';
import classes from './PageShell.module.css';

const publicItems = [
  { title: 'Bộ truyền thông', username: 'public@cifernest.io', category: 'Marketing', updated: 'Jan 2, 2026' },
  { title: 'Cổng đối tác', username: 'partner@cifernest.io', category: 'Nhà cung cấp', updated: 'Dec 18, 2025' },
  { title: 'Trang trạng thái', username: 'status@cifernest.io', category: 'Vận hành', updated: 'Dec 4, 2025' },
];

export default function PublicPasswords() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Mật khẩu công khai</div>
          <Text className={classes.muted}>
            Thông tin đăng nhập chia sẻ toàn hệ thống chỉ đọc để đảm bảo an toàn.
          </Text>
        </div>
        <Badge className={`${classes.pill} ${classes.badgePublic}`}>Công khai</Badge>
      </div>

      <div className={classes.panel}>
        <Group mb="sm" align="center">
          <IconWorld size={18} />
          <Text fw={600}>Mật khẩu chia sẻ toàn hệ thống</Text>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Mật khẩu</Table.Th>
              <Table.Th>Tên người dùng</Table.Th>
              <Table.Th>Danh mục</Table.Th>
              <Table.Th>Quyền truy cập</Table.Th>
              <Table.Th>Cập nhật lần cuối</Table.Th>
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
                  <Badge className={classes.badgeReadonly}>Chỉ đọc</Badge>
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
