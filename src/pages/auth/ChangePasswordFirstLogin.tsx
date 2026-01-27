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
      .required('Please enter a new password')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
      .required('Please confirm the new password'),
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
          <Title order={2}>Change your password</Title>
          <Text className={classes.subtitle}>
            Your account requires a password update before continuing.
          </Text>
          {error ? (
            <Text c="red" size="sm">
              {error}
            </Text>
          ) : null}
          <PasswordInput
            {...form.getInputProps('newPassword')}
            name="newPassword"
            label="New password"
            placeholder="New password"
            mt="md"
            size="md"
            disabled={loading}
          />
          <PasswordInput
            {...form.getInputProps('confirmPassword')}
            name="confirmPassword"
            label="Confirm new password"
            placeholder="Confirm new password"
            mt="md"
            size="md"
            disabled={loading}
          />
          <Button loading={loading} type="submit" fullWidth size="md" mt="md">
            Update password
          </Button>
        </div>
      </form>
      <div className={classes.hero}>
        <Title order={1}>One step to secure your vault.</Title>
        <Text className={classes.subtitle}>
          Use a strong passphrase to keep every credential protected.
        </Text>
      </div>
    </div>
  )
}
