import type { NavigationTree } from '@/@types/navigation';
import {
  IconActivity,
  IconLock,
  IconSettings,
  IconShare,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'vault',
    path: '/vault',
    title: 'Kho của tôi',
    translateKey: '',
    icon: IconLock,
    authority: [],
    subMenu: [],
  },
  {
    key: 'shared',
    path: '/shared',
    title: 'Được chia sẻ với tôi',
    translateKey: '',
    icon: IconUsers,
    authority: [],
    subMenu: [],
  },
  {
    key: 'public',
    path: '/public',
    title: 'Mật khẩu công khai',
    translateKey: '',
    icon: IconWorld,
    authority: [],
    subMenu: [],
  },
  {
    key: 'activity',
    path: '/activity',
    title: 'Nhật ký hoạt động',
    translateKey: '',
    icon: IconActivity,
    authority: [],
    subMenu: [],
  },
  {
    key: 'sharing',
    path: '/sharing',
    title: 'Chia sẻ',
    translateKey: '',
    icon: IconShare,
    authority: [],
    subMenu: [],
  },
  {
    key: 'users',
    path: '/users',
    title: 'Người dùng',
    translateKey: '',
    icon: IconUsers,
    authority: ['admin'],
    subMenu: [],
  },
  {
    key: 'settings',
    path: '/settings',
    title: 'Cài đặt',
    translateKey: '',
    icon: IconSettings,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
