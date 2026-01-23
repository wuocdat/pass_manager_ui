import { ActionIcon, Avatar, Group, Menu, Text, TextInput, Tooltip } from '@mantine/core';
import { IconBell, IconChevronDown, IconLogout, IconSearch, IconSettings } from '@tabler/icons-react';
import { useAppSelector } from '@/store';
import useAuth from '@/utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const buildInitials = (fullName?: string) => {
  if (!fullName) {
    return 'U';
  }
  const parts = fullName.trim().split(' ').filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return `${first}${last}`.toUpperCase();
};

export default function TopBar() {
  const { fullName, email } = useAppSelector((state) => state.auth.user);
  const initials = buildInitials(fullName);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Group justify="space-between" w="100%" gap="lg" style={{ flex: 1 }}>
      <TextInput
        leftSection={<IconSearch size={18} />}
        placeholder="Search passwords, folders, people..."
        radius="xl"
        style={{ flex: 1, maxWidth: 560 }}
        styles={{
          input: {
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderColor: 'var(--pm-stroke)',
          },
        }}
      />
      <Group gap="sm" wrap="nowrap">
        <Tooltip label="Notifications" position="bottom">
          <ActionIcon variant="subtle" size="lg" radius="xl">
            <IconBell size={20} />
          </ActionIcon>
        </Tooltip>
        <Menu shadow="md" width={220} position="bottom-end">
          <Menu.Target>
            <Group gap="xs" style={{ cursor: 'pointer' }} wrap="nowrap">
              <Avatar color="teal" radius="xl">
                {initials}
              </Avatar>
              <div>
                <Text size="sm" fw={600} lineClamp={1}>
                  {fullName || 'Vault Member'}
                </Text>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {email || 'member@vault.io'}
                </Text>
              </div>
              <IconChevronDown size={16} />
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={16} />} onClick={() => navigate('/settings')}>
              Profile Settings
            </Menu.Item>
            <Menu.Item leftSection={<IconLogout size={16} />} onClick={() => signOut()}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
