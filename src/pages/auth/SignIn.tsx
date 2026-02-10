import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import useAuth from '@/utils/hooks/useAuth';
import classes from './AuthShell.module.css';
import { IconShieldLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: { email: string, password: string }) {
    setLoading(true);
    try {
      await signIn(values);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.page}>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className={classes.panel}
        autoComplete="off"
      >
        <div className={classes.stack}>
          <Group gap="sm">
            <IconShieldLock size={28} color="var(--pm-teal-strong)" />
            <Text className={classes.brand}>CipherNest</Text>
          </Group>
          <Title order={2}>Chào mừng trở lại</Title>
          <Text className={classes.subtitle}>
            Mở kho, quản lý chia sẻ và kiểm soát mọi thông tin đăng nhập.
          </Text>
          <TextInput
            {...form.getInputProps('email')}
            name="email"
            label="Địa chỉ email"
            withAsterisk
            placeholder="hello@cifernest.io"
            size="md"
            autoComplete="off"
          />
          <PasswordInput
            {...form.getInputProps('password')}
            name="password"
            label="Mật khẩu"
            placeholder="Mật khẩu của bạn"
            mt="md"
            size="md"
            autoComplete="new-password"
          />
          <Group justify="space-between">
            <Checkbox label="Tin cậy thiết bị này" />
            <Link className={classes.link} to="/forgot-password">
              Quên mật khẩu?
            </Link>
          </Group>
          <Button loading={loading} type="submit" fullWidth size="md" mt="md">
            Đăng nhập
          </Button>
          <Text size="sm" ta="center">
            Chưa có tài khoản?{' '}
            <Link className={classes.link} to="/register">Đăng ký</Link>
          </Text>
        </div>
      </form>
      <div className={classes.hero}>
        <Title order={1}>
          Dành cho đội ngũ muốn bảo mật rõ ràng và gọn gàng.
        </Title>
        <Text className={classes.subtitle}>
          Chia sẻ mật khẩu tự tin, theo dõi hoạt động và khóa từng thư mục
          với phân quyền chính xác.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Tổng quan bảo mật</Text>
          <Text size="sm" className={classes.subtitle}>
            48 mật khẩu đã xác minh • 6 thư mục đã chia sẻ • 2 lời mời đang chờ
          </Text>
        </div>
      </div>
    </div>
  );
}
