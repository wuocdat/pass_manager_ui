import {
  Badge,
  Button,
  Group,
  PasswordInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconEdit, IconEye, IconFolder, IconShieldCheck } from '@tabler/icons-react';
import classes from './PageShell.module.css';

export default function PasswordDetail() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Chi tiết mật khẩu</div>
          <Text className={classes.muted}>Xem và chỉnh sửa chi tiết thông tin đăng nhập với nhật ký đầy đủ.</Text>
        </div>
        <Group>
          <Badge className={classes.badgeShared}>Đã chia sẻ</Badge>
          <Badge className={classes.badgeReadonly}>Chỉ đọc</Badge>
        </Group>
      </div>

      <div className={classes.panel}>
        <Group grow>
          <TextInput label="Tiêu đề" defaultValue="Stripe Dashboard" />
          <TextInput label="Tên người dùng" defaultValue="billing@cifernest.io" />
        </Group>
        <Group grow mt="md">
          <PasswordInput label="Mật khẩu" defaultValue="password12345" />
          <TextInput label="URL" defaultValue="https://dashboard.stripe.com" />
        </Group>
        <Textarea mt="md" label="Ghi chú" minRows={3} defaultValue="Đã bật 2FA. Xoay vòng theo quý." />
        <Group grow mt="md">
          <Select
            label="Gán thư mục"
            data={['Tài chính', 'Marketing', 'Nhà cung cấp', 'Cá nhân']}
            leftSection={<IconFolder size={16} />}
            defaultValue="Tài chính"
          />
          <Select
            label="Cài đặt chia sẻ"
            data={['Riêng tư', 'Chia sẻ với nhóm', 'Công khai']}
            leftSection={<IconShieldCheck size={16} />}
            defaultValue="Chia sẻ với nhóm"
          />
        </Group>
        <Group mt="lg" gap="sm">
          <Button leftSection={<IconEdit size={16} />} color="teal">
            Lưu thay đổi
          </Button>
          <Button variant="light" leftSection={<IconEye size={16} />}>
            Hiển thị mật khẩu
          </Button>
        </Group>
      </div>

      <div className={classes.panel}>
        <Text fw={600} mb="sm">Thông tin kiểm toán</Text>
        <div className={classes.sectionGrid}>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Tạo lúc</Text>
            <Text fw={600}>Dec 12, 2025</Text>
          </div>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Cập nhật lần cuối</Text>
            <Text fw={600}>Jan 12, 2026</Text>
          </div>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Truy cập gần nhất</Text>
            <Text fw={600}>Jan 12, 2026 · 09:24</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
