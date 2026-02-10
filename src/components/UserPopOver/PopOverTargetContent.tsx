import { Avatar, Text } from '@mantine/core';
import classes from './PopOverTargetContent.module.css';
import { useAppSelector } from '@/store';

const buildInitials = (fullName?: string) => {
  if (!fullName) {
    return 'U';
  }
  const parts = fullName.trim().split(' ').filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return `${first}${last}`.toUpperCase();
};

export default function PopOverTargetContent() {
  const { fullName, email } = useAppSelector((state) => state.auth.user);
  const initials = buildInitials(fullName);

  return (
    <>
      <div className={classes.contentWrapper}>
        <Avatar color="teal" radius="lg">{initials}</Avatar>
        <div>
          <Text style={{ fontWeight: 'bold' }} size="md">
            {fullName || 'Thành viên kho'}
          </Text>
          <Text size="xs">
            {email || 'member@vault.io'}
          </Text>
        </div>
      </div>
    </>
  );
}
