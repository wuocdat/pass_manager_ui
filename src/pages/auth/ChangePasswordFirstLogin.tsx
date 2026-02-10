import React, { useState } from 'react'
import {
  Button,
  Group,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core'
import * as yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { IconShieldLock } from '@tabler/icons-react'
import classes from './AuthShell.module.css'
import useAuth from '@/utils/hooks/useAuth'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'

export default function ChangePasswordFirstLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { changePassword } = useAuth()

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu mới'),
  })

  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: yupResolver(schema),
  })

  async function handleSubmit(values: { newPassword: string }) {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 0))
      const result = await changePassword(values.newPassword)
      if (result.status === 'failed') {
        setError(result.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.page}>
      {loading ? <LoadingScreen /> : null}
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.panel}>
        <div className={classes.stack}>
          <Group gap="sm">
            <IconShieldLock size={28} color="var(--pm-teal-strong)" />
            <Text className={classes.brand}>CipherNest</Text>
          </Group>
          <Title order={2}>Đổi mật khẩu</Title>
          <Text className={classes.subtitle}>
            Tài khoản của bạn cần cập nhật mật khẩu trước khi tiếp tục.
          </Text>
          {error ? (
            <Text c="red" size="sm">
              {error}
            </Text>
          ) : null}
          <PasswordInput
            {...form.getInputProps('newPassword')}
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Mật khẩu mới"
            mt="md"
            size="md"
            disabled={loading}
          />
          <PasswordInput
            {...form.getInputProps('confirmPassword')}
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Xác nhận mật khẩu mới"
            mt="md"
            size="md"
            disabled={loading}
          />
          <Button loading={loading} type="submit" fullWidth size="md" mt="md">
            Cập nhật mật khẩu
          </Button>
        </div>
      </form>
      <div className={classes.hero}>
        <Title order={1}>Một bước để bảo vệ kho của bạn.</Title>
        <Text className={classes.subtitle}>
          Hãy dùng mật khẩu mạnh để bảo vệ mọi thông tin đăng nhập.
        </Text>
      </div>
    </div>
  )
}
