import { Badge, Button, Group, Select, Switch, Tabs, Text, TextInput } from '@mantine/core';
import { IconKey, IconPalette, IconShield, IconUser } from '@tabler/icons-react';
import classes from './PageShell.module.css';

export default function Settings() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Cài đặt</div>
          <Text className={classes.muted}>Quản lý hồ sơ, bảo mật và tùy chọn.</Text>
        </div>
        <Badge className={classes.pill}>Không gian làm việc</Badge>
      </div>

      <div className={classes.panel}>
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>Hồ sơ</Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>Bảo mật</Tabs.Tab>
            <Tabs.Tab value="preferences" leftSection={<IconPalette size={16} />}>Tùy chọn</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <Group grow>
              <TextInput label="Họ và tên" placeholder="Nia Joseph" />
              <TextInput label="Email" placeholder="nia@cifernest.io" />
            </Group>
            <Group grow mt="md">
              <TextInput label="Vai trò" placeholder="Quản trị bảo mật" />
              <TextInput label="Múi giờ" placeholder="GMT-5" />
            </Group>
            <Button mt="lg" color="teal">Lưu hồ sơ</Button>
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="md">
            <Group grow>
              <TextInput label="Mật khẩu hiện tại" placeholder="••••••••" />
              <TextInput label="Mật khẩu mới" placeholder="Ít nhất 12 ký tự" />
            </Group>
            <Group grow mt="md">
              <TextInput label="Khóa chính" placeholder="Xoay vòng mỗi 90 ngày" />
              <TextInput label="Phiên đang hoạt động" placeholder="3 thiết bị đang hoạt động" />
            </Group>
            <Group mt="lg" gap="sm">
              <Button leftSection={<IconKey size={16} />} color="teal">Đổi mật khẩu</Button>
              <Button variant="light">Quản lý phiên</Button>
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="preferences" pt="md">
            <Group grow>
              <Select
                label="Giao diện"
                data={['Sáng', 'Tối']}
                placeholder="Sáng"
                leftSection={<IconPalette size={16} />}
              />
              <Select label="Ngôn ngữ" data={['Tiếng Anh', 'Tiếng Việt']} placeholder="Tiếng Việt" />
            </Group>
            <Group mt="md">
              <Switch label="Gửi cảnh báo bảo mật" defaultChecked />
              <Switch label="Tự khóa sau 15 phút" />
            </Group>
            <Button mt="lg" variant="light">Lưu tùy chọn</Button>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
