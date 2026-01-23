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
          <Title order={2}>Reset your password</Title>
          <Text className={classes.subtitle}>
            We&apos;ll send a secure reset link to the email associated with your vault.
          </Text>
          <TextInput label="Email address" placeholder="you@cifernest.io" size="md" />
          <Button size="md">
            Send reset link
          </Button>
          <Text size="sm" ta="center">
            Remembered it? <Link className={classes.link} to="/sign-in">Back to login</Link>
          </Text>
        </div>
      </div>
      <div className={classes.hero}>
        <Title order={1}>Still in control.</Title>
        <Text className={classes.subtitle}>
          Every reset request is logged and protected. You&apos;ll see the update instantly in
          your activity log.
        </Text>
        <div className={classes.heroCard}>
          <Text fw={600} mb={6}>Security checklist</Text>
          <Text size="sm" className={classes.subtitle}>
            Verify device • Rotate shared keys • Review recent activity
          </Text>
        </div>
      </div>
    </div>
  );
}
