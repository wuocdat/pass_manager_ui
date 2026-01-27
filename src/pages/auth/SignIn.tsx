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
      .required('Please enter a email')
      .email('Invalid email'),
    password: yup
      .string()
      .required('Please enter a password')
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
          <Title order={2}>Welcome back</Title>
          <Text className={classes.subtitle}>
            Unlock your vault, manage shared access, and keep every credential under control.
          </Text>
          <TextInput
            {...form.getInputProps('email')}
            name="email"
            label="Email address"
            withAsterisk
            placeholder="hello@cifernest.io"
            size="md"
            autoComplete="off"
          />
          <PasswordInput
            {...form.getInputProps('password')}
            name="password"
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            autoComplete="new-password"
          />
          <Group justify="space-between">
            <Checkbox label="Trust this device" />
            <Link className={classes.link} to="/forgot-password">
              Forgot password?
            </Link>
          </Group>
          <Button loading={loading} type="submit" fullWidth size="md" mt="md">
            Login
          </Button>
          <Text size="sm" ta="center">
            Don&apos;t have an account?{' '}
            <Link className={classes.link} to="/register">Register</Link>
          </Text>
        </div>
      </form>
      <div className={classes.hero}>
        <Title order={1}>
          Designed for teams who want calm, clear security.
        </Title>
        <Text className={classes.subtitle}>
          Share passwords with confidence, track activity, and keep every folder locked down
          with precise permissions.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Security snapshot</Text>
          <Text size="sm" className={classes.subtitle}>
            48 passwords verified • 6 shared folders • 2 pending invites
          </Text>
        </div>
      </div>
    </div>
  );
}
