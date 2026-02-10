import React from 'react';
import { Button, Group, Text, TextInput, Title } from '@mantine/core';
import { IconShieldLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './AuthShell.module.css';

export default function ForgotPassword() {
  return (
    <div className={classes.page}>
      <div className={classes.panel}>
        <div className={classes.stack}>
          <Group gap="sm">
            <IconShieldLock size={28} color="var(--pm-teal-strong)" />
            <Text className={classes.brand}>CipherNest</Text>
          </Group>
          <Title order={2}>Đặt lại mật khẩu</Title>
          <Text className={classes.subtitle}>
            Chúng tôi sẽ gửi liên kết đặt lại an toàn tới email liên kết với kho của bạn.
          </Text>
          <TextInput label="Địa chỉ email" placeholder="you@cifernest.io" size="md" />
          <Button size="md">
            Gửi liên kết đặt lại
          </Button>
          <Text size="sm" ta="center">
            Nhớ rồi? <Link className={classes.link} to="/sign-in">Quay lại đăng nhập</Link>
          </Text>
        </div>
      </div>
      <div className={classes.hero}>
        <Title order={1}>Vẫn trong tầm kiểm soát.</Title>
        <Text className={classes.subtitle}>
          Mọi yêu cầu đặt lại đều được ghi lại và bảo vệ. Bạn sẽ thấy cập nhật ngay trong
          nhật ký hoạt động.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Danh sách kiểm tra bảo mật</Text>
          <Text size="sm" className={classes.subtitle}>
            Xác minh thiết bị • Xoay vòng khóa chia sẻ • Xem hoạt động gần đây
          </Text>
        </div>
      </div>
    </div>
  );
}
