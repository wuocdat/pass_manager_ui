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
    title: 'My Vault',
    translateKey: '',
    icon: IconLock,
    authority: [],
    subMenu: [],
  },
  {
    key: 'shared',
    path: '/shared',
    title: 'Shared With Me',
    translateKey: '',
    icon: IconUsers,
    authority: [],
    subMenu: [],
  },
  {
    key: 'public',
    path: '/public',
    title: 'Public Passwords',
    translateKey: '',
    icon: IconWorld,
    authority: [],
    subMenu: [],
  },
  {
    key: 'activity',
    path: '/activity',
    title: 'Activity Log',
    translateKey: '',
    icon: IconActivity,
    authority: [],
    subMenu: [],
  },
  {
    key: 'sharing',
    path: '/sharing',
    title: 'Sharing',
    translateKey: '',
    icon: IconShare,
    authority: [],
    subMenu: [],
  },
  {
    key: 'settings',
    path: '/settings',
    title: 'Settings',
    translateKey: '',
    icon: IconSettings,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
