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

const permissionLabels: Record<string, string> = {
  Read: 'Chỉ đọc',
  Edit: 'Chỉnh sửa',
};

const typeLabels: Record<string, string> = {
  Password: 'Mật khẩu',
  Folder: 'Thư mục',
};

export default function SharingManagement() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Quản lý chia sẻ</div>
          <Text className={classes.muted}>
            Cấp quyền chính xác và điều chỉnh quyền bất kỳ lúc nào.
          </Text>
        </div>
        <Badge className={classes.pill}>Trung tâm điều khiển</Badge>
      </div>

      <div className={classes.sectionGrid}>
        <div className={classes.panel}>
          <Group mb="sm">
            <IconShare size={18} />
            <Text fw={600}>Chia sẻ mật khẩu</Text>
          </Group>
          <Select
            label="Chọn mật khẩu"
            placeholder="Chọn thông tin đăng nhập"
            data={['Stripe Dashboard', 'AWS Root', 'Figma Org']}
          />
          <Select
            label="Chọn người dùng"
            placeholder="Tìm thành viên"
            mt="md"
            data={['Ava Kim', 'Ravi Singh', 'Nora Lane']}
            leftSection={<IconUserPlus size={16} />}
          />
          <Text size="sm" fw={600} mt="md">
            Quyền
          </Text>
          <SegmentedControl
            fullWidth
            data={['Chỉ đọc', 'Chỉnh sửa']}
            color="teal"
            mt="xs"
          />
          <Button mt="md" fullWidth color="teal">
            Chia sẻ mật khẩu
          </Button>
        </div>

        <div className={classes.panel}>
          <Group mb="sm">
            <IconUsers size={18} />
            <Text fw={600}>Chia sẻ thư mục</Text>
          </Group>
          <Select
            label="Chọn thư mục"
            placeholder="Chọn thư mục"
            data={['Marketing', 'Tài chính', 'Nhà cung cấp']}
          />
          <Select
            label="Chọn người dùng"
            placeholder="Tìm thành viên"
            mt="md"
            data={['Ava Kim', 'Ravi Singh', 'Nora Lane']}
            leftSection={<IconUserPlus size={16} />}
          />
          <Text size="sm" fw={600} mt="md">
            Quyền
          </Text>
          <SegmentedControl
            fullWidth
            data={['Chỉ đọc', 'Chỉnh sửa']}
            color="teal"
            mt="xs"
          />
          <Button mt="md" fullWidth variant="light" color="teal">
            Chia sẻ thư mục
          </Button>
        </div>
      </div>

      <div className={classes.panel}>
        <Group justify="space-between" mb="sm">
          <Text fw={600}>Quyền hiện tại</Text>
          <Badge className={classes.pill}>Quản lý</Badge>
        </Group>
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Người dùng</Table.Th>
              <Table.Th>Quyền</Table.Th>
              <Table.Th>Loại</Table.Th>
              <Table.Th>Mục tiêu</Table.Th>
              <Table.Th>Hành động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sharedAccess.map((item) => (
              <Table.Tr key={`${item.name}-${item.target}`}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>
                  <Badge className={item.permission === 'Edit' ? classes.badgeShared : classes.badgeReadonly}>
                    {permissionLabels[item.permission] || item.permission}
                  </Badge>
                </Table.Td>
                <Table.Td>{typeLabels[item.type] || item.type}</Table.Td>
                <Table.Td>{item.target}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button size="xs" variant="light">Cập nhật</Button>
                    <Button size="xs" color="red" variant="subtle">Gỡ</Button>
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
