import React from 'react';
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconShieldLock } from '@tabler/icons-react';
import classes from './AuthShell.module.css';

export default function Register() {
  return (
    <div className={classes.page}>
      <div className={classes.panel}>
        <div className={classes.stack}>
          <Group gap="sm">
            <IconShieldLock size={28} color="var(--pm-teal-strong)" />
            <Text className={classes.brand}>CipherNest</Text>
          </Group>
          <Title order={2}>Tạo kho của bạn</Title>
          <Text className={classes.subtitle}>
            Thiết lập không gian làm việc và bắt đầu lưu thông tin đăng nhập một cách an tâm.
          </Text>
          <TextInput label="Họ và tên" placeholder="Nia Joseph" size="md" />
          <TextInput label="Email công việc" placeholder="team@cifernest.io" size="md" />
          <PasswordInput label="Tạo mật khẩu" placeholder="Ít nhất 12 ký tự" size="md" />
          <PasswordInput label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" size="md" />
          <Checkbox label="Tôi đồng ý với điều khoản và chính sách quyền riêng tư" />
          <Button size="md">
            Tạo tài khoản
          </Button>
          <Text size="sm" ta="center">
            Đã có tài khoản? <Link className={classes.link} to="/sign-in">Đăng nhập</Link>
          </Text>
        </div>
      </div>
      <div className={classes.hero}>
        <Title order={1}>Bắt đầu với nền tảng sạch và an toàn.</Title>
        <Text className={classes.subtitle}>
          Mời đồng đội, cấu hình khóa chính và giữ thông tin công khai ở chế độ chỉ đọc
          ngay từ đầu.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Có trong mọi kho</Text>
          <Text size="sm" className={classes.subtitle}>
            Phân quyền theo vai trò • Nhật ký kiểm toán • Thư mục mã hóa đầu-cuối
          </Text>
        </div>
      </div>
    </div>
  );
}
