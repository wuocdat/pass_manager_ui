import { Badge, Button, Group, Select, Switch, Tabs, Text, TextInput } from '@mantine/core';
import { IconKey, IconPalette, IconShield, IconUser } from '@tabler/icons-react';
import classes from './PageShell.module.css';

export default function Settings() {
  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Settings</div>
          <Text className={classes.muted}>Manage profile, security, and preferences.</Text>
        </div>
        <Badge className={classes.pill}>Workspace</Badge>
      </div>

      <div className={classes.panel}>
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>Profile</Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>Security</Tabs.Tab>
            <Tabs.Tab value="preferences" leftSection={<IconPalette size={16} />}>Preferences</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <Group grow>
              <TextInput label="Full name" placeholder="Nia Joseph" />
              <TextInput label="Email" placeholder="nia@cifernest.io" />
            </Group>
            <Group grow mt="md">
              <TextInput label="Role" placeholder="Security Admin" />
              <TextInput label="Timezone" placeholder="GMT-5" />
            </Group>
            <Button mt="lg" color="teal">Save profile</Button>
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="md">
            <Group grow>
              <TextInput label="Current password" placeholder="••••••••" />
              <TextInput label="New password" placeholder="At least 12 characters" />
            </Group>
            <Group grow mt="md">
              <TextInput label="Master key" placeholder="Rotation every 90 days" />
              <TextInput label="Active sessions" placeholder="3 devices active" />
            </Group>
            <Group mt="lg" gap="sm">
              <Button leftSection={<IconKey size={16} />} color="teal">Change password</Button>
              <Button variant="light">Manage sessions</Button>
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="preferences" pt="md">
            <Group grow>
              <Select
                label="Theme"
                data={['Light', 'Dark']}
                placeholder="Light"
                leftSection={<IconPalette size={16} />}
              />
              <Select label="Language" data={['English', 'Vietnamese']} placeholder="English" />
            </Group>
            <Group mt="md">
              <Switch label="Send security alerts" defaultChecked />
              <Switch label="Auto-lock after 15 minutes" />
            </Group>
            <Button mt="lg" variant="light">Save preferences</Button>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
