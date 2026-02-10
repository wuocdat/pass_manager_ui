import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Sáng</Button>
      <Button onClick={() => setColorScheme('dark')}>Tối</Button>
      <Button onClick={() => setColorScheme('auto')}>Tự động</Button>
    </Group>
  );
}
