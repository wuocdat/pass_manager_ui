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
          <Title order={2}>Create your vault</Title>
          <Text className={classes.subtitle}>
            Set up your workspace and start storing credentials with peace of mind.
          </Text>
          <TextInput label="Full name" placeholder="Nia Joseph" size="md" />
          <TextInput label="Work email" placeholder="team@cifernest.io" size="md" />
          <PasswordInput label="Create password" placeholder="At least 12 characters" size="md" />
          <PasswordInput label="Confirm password" placeholder="Repeat your password" size="md" />
          <Checkbox label="I agree to the terms and privacy policy" />
          <Button size="md">
            Create account
          </Button>
          <Text size="sm" ta="center">
            Already have an account? <Link className={classes.link} to="/sign-in">Sign in</Link>
          </Text>
        </div>
      </div>
      <div className={classes.hero}>
        <Title order={1}>Start with a clean, secure foundation.</Title>
        <Text className={classes.subtitle}>
          Invite teammates, configure your master key, and keep public credentials read-only
          from day one.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Included with every vault</Text>
          <Text size="sm" className={classes.subtitle}>
            Role-based access • Audit logs • End-to-end encrypted folders
          </Text>
        </div>
      </div>
    </div>
  );
}
