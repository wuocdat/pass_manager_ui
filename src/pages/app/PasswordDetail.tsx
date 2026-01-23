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
          <div className={classes.headerTitle}>Password Detail</div>
          <Text className={classes.muted}>Review and edit credential details with full audit info.</Text>
        </div>
        <Group>
          <Badge className={classes.badgeShared}>Shared</Badge>
          <Badge className={classes.badgeReadonly}>Read-only</Badge>
        </Group>
      </div>

      <div className={classes.panel}>
        <Group grow>
          <TextInput label="Title" defaultValue="Stripe Dashboard" />
          <TextInput label="Username" defaultValue="billing@cifernest.io" />
        </Group>
        <Group grow mt="md">
          <PasswordInput label="Password" defaultValue="password12345" />
          <TextInput label="URL" defaultValue="https://dashboard.stripe.com" />
        </Group>
        <Textarea mt="md" label="Notes" minRows={3} defaultValue="2FA enabled. Rotate quarterly." />
        <Group grow mt="md">
          <Select
            label="Folder assignment"
            data={['Finance', 'Marketing', 'Vendors', 'Personal']}
            leftSection={<IconFolder size={16} />}
            defaultValue="Finance"
          />
          <Select
            label="Share settings"
            data={['Private', 'Shared with team', 'Public']}
            leftSection={<IconShieldCheck size={16} />}
            defaultValue="Shared with team"
          />
        </Group>
        <Group mt="lg" gap="sm">
          <Button leftSection={<IconEdit size={16} />} color="teal">
            Save changes
          </Button>
          <Button variant="light" leftSection={<IconEye size={16} />}>
            Reveal password
          </Button>
        </Group>
      </div>

      <div className={classes.panel}>
        <Text fw={600} mb="sm">Audit information</Text>
        <div className={classes.sectionGrid}>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Created at</Text>
            <Text fw={600}>Dec 12, 2025</Text>
          </div>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Last updated</Text>
            <Text fw={600}>Jan 12, 2026</Text>
          </div>
          <div className={classes.card}>
            <Text size="xs" className={classes.muted}>Last accessed</Text>
            <Text fw={600}>Jan 12, 2026 · 09:24</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
