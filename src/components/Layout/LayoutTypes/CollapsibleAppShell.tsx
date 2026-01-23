import { AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import navigationConfig from '@/configs/navigation.config';
import AuthorityCheck from '@/route/AuthorityCheck';
import { LinksGroup } from '@/components/Layout/LinksGroup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classes from '@/components/Layout/LayoutTypes/SimpleSideBar.module.css';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import Views from '@/components/Layout/Views';
import CollapsibleAppShellBottomContent from '@/components/Layout/LayoutTypes/CollapsibleAppShellBottomContent';
import TopBar from '@/components/Layout/TopBar';
import layoutClasses from '@/components/Layout/CollapsibleAppShell.module.css';
import { IconShieldLock } from '@tabler/icons-react';

export default function CollapsibleAppShell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const userAuthority = useAppSelector((state) => state.auth.user.role);
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setActive(currentPath);
  }, [location.pathname]);

  const links = navigationConfig.map((item, index) => {
    let links = [];

    if (item.subMenu && item.subMenu.length > 0) {
      links = item.subMenu.map((i) => ({
        label: i.title,
        link: i.path,
        authority: i.authority,
      }));
      const isAnyLinkActive = links.some((link) => location.pathname.includes(link.link));

      return (
        <AuthorityCheck userAuthority={userAuthority || []} authority={item.authority} key={index}>
          <Box ml={10} my={10}>
            <LinksGroup
              initiallyOpened={isAnyLinkActive}
              icon={item.icon}
              label={item.title}
              links={links}
            />
          </Box>
        </AuthorityCheck>
      );
    } else {
      return (
        <AuthorityCheck userAuthority={userAuthority || []} authority={item.authority} key={index}>
          <Link
            className={classes.link}
            data-active={item.path.split('/')[1] === active ? 'true' : undefined}
            to={item.path}
            onClick={(event) => {
              event.preventDefault();
              setActive(item.path.split('/')[1]);
              navigate(item.path);
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.translateKey ? t(item.translateKey) : item.title}</span>
          </Link>
        </AuthorityCheck>
      );
    }
  });

  return (
    <AppShell
      className={layoutClasses.appShell}
      header={{ height: 72 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: {
          mobile: !mobileOpened,
          desktop: !desktopOpened,
        },
      }}
      padding="md"
    >
      <AppShell.Header className={layoutClasses.header}>
        <Group h="100%" px="lg" gap="xl" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <div className={layoutClasses.logoMark}>
              <IconShieldLock size={24} />
              CipherNest Vault
            </div>
          </Group>
          <TopBar />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={layoutClasses.navbar}>
        <AppShell.Section grow>{links}</AppShell.Section>
        <AppShell.Section>
          <CollapsibleAppShellBottomContent />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main className={layoutClasses.main}>
        <div className={layoutClasses.contentSurface}>
          <div className={layoutClasses.contentScroll}>
            <Views />
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
