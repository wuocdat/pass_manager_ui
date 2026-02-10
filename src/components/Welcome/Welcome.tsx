import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Chào mừng đến với{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Dự án khởi đầu Vite này có cấu hình tối thiểu. Nếu bạn muốn tìm hiểu thêm về việc tích hợp
        Mantine + Vite, hãy xem{' '}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          hướng dẫn này
        </Anchor>
        . Để bắt đầu, hãy chỉnh sửa file pages/Home.page.tsx.
      </Text>
    </>
  );
}
