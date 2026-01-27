import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCopy,
  IconEdit,
  IconEye,
  IconFolder,
  IconFolderPlus,
  IconLock,
  IconPlus,
  IconSearch,
  IconShare,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import type { Folder } from '@/@types/folder';
import type { PasswordItem } from '@/@types/password';
import { FolderService } from '@/services/folder.service';
import { PasswordService } from '@/services/password.service';
import { useAppSelector } from '@/store';
import classes from './PageShell.module.css';

export default function MyVault() {
  const formatDateTime = (value?: string | null) => {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folderForm, setFolderForm] = useState({
    parentId: '',
    name: '',
    description: '',
    isPublic: false,
  });
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);
  const [isCreatePasswordOpen, setIsCreatePasswordOpen] = useState(false);
  const [folderLoadError, setFolderLoadError] = useState(false);
  const [passwordLoadError, setPasswordLoadError] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    folderId: '',
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
    isPublic: false,
  });
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, string>>({});
  const [isDecryptingPassword, setIsDecryptingPassword] = useState(false);
  const [passwordSearch, setPasswordSearch] = useState('');
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [passwordToEdit, setPasswordToEdit] = useState<PasswordItem | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [editPasswordForm, setEditPasswordForm] = useState({
    title: '',
    url: '',
    notes: '',
  });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState<PasswordItem | null>(null);
  const [isDeleteFolderConfirmOpen, setIsDeleteFolderConfirmOpen] = useState(false);
  const masterKey = useAppSelector((state) => state.auth.session.masterKey);

  useEffect(() => {
    let isActive = true;
    const loadFolders = async () => {
      try {
        const data = await FolderService.getFolders();
        if (isActive) {
          setFolders(data);
          setFolderLoadError(false);
        }
      } catch (error) {
        console.error('Failed to load folders', error);
        if (isActive) {
          setFolderLoadError(true);
        }
      }
    };

    loadFolders();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const loadPasswords = async () => {
      try {
        const data = selectedFolderId
          ? await PasswordService.getPasswordsByFolder(selectedFolderId)
          : await PasswordService.getPasswords();
        if (isActive) {
          setPasswords(data);
          setPasswordLoadError(false);
        }
      } catch (error) {
        console.error('Failed to load passwords', error);
        if (isActive) {
          setPasswordLoadError(true);
        }
      }
    };

    loadPasswords();

    return () => {
      isActive = false;
    };
  }, [selectedFolderId]);

  const folderTree = useMemo(
    () =>
      folders.map((folder) => ({
        id: folder.id,
        label: folder.name,
        depth: folder.parent ? 1 : 0,
        count: folder.passwordCount ?? 0,
      })),
    [folders]
  );

  const filteredPasswords = useMemo(() => {
    const query = passwordSearch.trim().toLowerCase();
    if (!query) {
      return passwords;
    }
    return passwords.filter((password) => {
      const haystack = [
        password.title,
        password.username,
        password.url,
        password.notes,
        password.folder?.name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [passwords, passwordSearch]);

  const folderOptions = useMemo(
    () =>
      folders.map((folder) => ({
        value: folder.id,
        label: folder.name,
      })),
    [folders]
  );

  const selectedFolder = useMemo(
    () => folders.find((folder) => folder.id === selectedFolderId) || null,
    [folders, selectedFolderId]
  );

  const handleCreateFolder = async () => {
    if (!folderForm.name) {
      setPasswordError('Folder name is required.');
      return;
    }
    setIsCreatingFolder(true);
    try {
      await FolderService.createFolder({
        parentId: folderForm.parentId || null,
        name: folderForm.name,
        description: folderForm.description || '',
        isPublic: folderForm.isPublic,
      });
      const data = await FolderService.getFolders();
      setFolders(data);
      setIsCreateFolderOpen(false);
      setFolderForm({
        parentId: '',
        name: '',
        description: '',
        isPublic: false,
      });
    } catch (error) {
      console.error('Failed to create folder', error);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const handleCreatePassword = async () => {
    if (!masterKey) {
      setPasswordError('Missing master key for encryption.');
      return;
    }
    if (!passwordForm.title || !passwordForm.password) {
      setPasswordError('Title and password are required.');
      return;
    }
    setIsCreatingPassword(true);
    try {
      await PasswordService.createPassword(
        {
          folderId: passwordForm.folderId || undefined,
          title: passwordForm.title,
          username: passwordForm.username || undefined,
          password: passwordForm.password,
          url: passwordForm.url || undefined,
          notes: passwordForm.notes || undefined,
          isPublic: passwordForm.isPublic,
        },
        masterKey
      );
      const folderData = await FolderService.getFolders();
      setFolders(folderData);
      const data = selectedFolderId
        ? await PasswordService.getPasswordsByFolder(selectedFolderId)
        : await PasswordService.getPasswords();
      setPasswords(data);
      setIsCreatePasswordOpen(false);
      setPasswordForm({
        folderId: '',
        title: '',
        username: '',
        password: '',
        url: '',
        notes: '',
        isPublic: false,
      });
      setPasswordError(null);
    } catch (error) {
      console.error('Failed to create password', error);
      setPasswordError('Failed to create password.');
    } finally {
      setIsCreatingPassword(false);
    }
  };

  const handleRevealPassword = async (item: PasswordItem) => {
    if (!masterKey) {
      setPasswordError('Missing master key for decryption.');
      return;
    }
    if (revealedPasswords[item.id]) {
      setRevealedPasswords((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
      return;
    }
    setIsDecryptingPassword(true);
    setPasswordError(null);
    try {
      const plaintext = await PasswordService.decryptPassword(
        masterKey,
        item.passwordEncrypted,
        item.encryptionMeta
      );
      setRevealedPasswords((prev) => ({
        ...prev,
        [item.id]: plaintext,
      }));
    } catch (error) {
      console.error('Failed to decrypt password', error);
      setPasswordError('Failed to decrypt password.');
    } finally {
      setIsDecryptingPassword(false);
    }
  };

  const handleCopyPassword = async (item: PasswordItem) => {
    if (!masterKey) {
      notifications.show({
        title: 'Missing master key',
        message: 'Unable to copy password without a master key.',
        color: 'red',
      });
      return;
    }
    try {
      const plaintext =
        revealedPasswords[item.id] ||
        (await PasswordService.decryptPassword(
          masterKey,
          item.passwordEncrypted,
          item.encryptionMeta
        ));
      await navigator.clipboard.writeText(plaintext);
      notifications.show({
        title: 'Copied',
        message: 'Password copied to clipboard.',
        color: 'teal',
      });
    } catch (error) {
      console.error('Failed to copy password', error);
      notifications.show({
        title: 'Copy failed',
        message: 'Unable to copy password. Please try again.',
        color: 'red',
      });
    }
  };

  const handleDeletePassword = async (item: PasswordItem) => {
    try {
      await PasswordService.deletePassword(item.id);
      setPasswords((prev) => prev.filter((password) => password.id !== item.id));
      setRevealedPasswords((prev) => {
        if (!prev[item.id]) {
          return prev;
        }
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } catch (error) {
      console.error('Failed to delete password', error);
      setPasswordError('Failed to delete password.');
    }
  };

  const openEditPassword = (item: PasswordItem) => {
    setPasswordToEdit(item);
    setEditPasswordForm({
      title: item.title,
      url: item.url ?? '',
      notes: item.notes ?? '',
    });
    setPasswordError(null);
    setIsEditPasswordOpen(true);
  };

  const handleUpdatePassword = async () => {
    if (!passwordToEdit) {
      return;
    }
    setIsUpdatingPassword(true);
    setPasswordError(null);
    const payload = {
      title: editPasswordForm.title,
      url: editPasswordForm.url || undefined,
      notes: editPasswordForm.notes || undefined,
    };
    try {
      const updated = await PasswordService.updatePassword(passwordToEdit.id, payload);
      setPasswords((prev) =>
        prev.map((password) =>
          password.id === passwordToEdit.id
            ? { ...password, ...payload, ...(updated || {}), updatedAt: updated.updatedAt }
            : password
        )
      );
      setIsEditPasswordOpen(false);
      setPasswordToEdit(null);
    } catch (error) {
      console.error('Failed to update password', error);
      setPasswordError('Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const openDeleteConfirm = (item: PasswordItem) => {
    setPasswordToDelete(item);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setPasswordToDelete(null);
  };

  const openDeleteFolderConfirm = () => {
    setIsDeleteFolderConfirmOpen(true);
  };

  const closeDeleteFolderConfirm = () => {
    setIsDeleteFolderConfirmOpen(false);
  };

  const handleDeleteFolder = async () => {
    if (!selectedFolder) {
      return;
    }
    try {
      await FolderService.deleteFolder(selectedFolder.id);
      const data = await FolderService.getFolders();
      setFolders(data);
      setSelectedFolderId('');
      const passwordsData = await PasswordService.getPasswords();
      setPasswords(passwordsData);
    } catch (error) {
      console.error('Failed to delete folder', error);
      setPasswordError('Failed to delete folder.');
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>My Vault</div>
          <Text className={classes.muted}>
            Organize passwords by folder, share them with confidence, and keep everything audited.
          </Text>
        </div>
        <Group>
          <Button
            leftSection={<IconFolderPlus size={16} />}
            variant="light"
            onClick={() => setIsCreateFolderOpen(true)}
            loading={isCreatingFolder}
          >
            Create Folder
          </Button>
          {selectedFolderId && (
            <Button
              leftSection={<IconTrash size={16} />}
              variant="light"
              color="red"
              onClick={openDeleteFolderConfirm}
            >
              Delete Folder
            </Button>
          )}
          <Button
            leftSection={<IconPlus size={16} />}
            color="teal"
            onClick={() => setIsCreatePasswordOpen(true)}
            loading={isCreatingPassword}
          >
            Create Password
          </Button>
        </Group>
      </div>

      <Modal
        opened={isCreatePasswordOpen}
        onClose={() => {
          setIsCreatePasswordOpen(false);
          setPasswordError(null);
        }}
        title="Create Password"
        centered
      >
        <Group grow>
          <TextInput
            label="Title"
            placeholder="Gmail"
            value={passwordForm.title}
            onChange={(event) =>
              setPasswordForm((prev) => ({ ...prev, title: event.currentTarget.value }))
            }
            required
          />
          <Select
            label="Folder"
            placeholder="Select folder"
            data={folderOptions}
            value={passwordForm.folderId || null}
            onChange={(value) =>
              setPasswordForm((prev) => ({ ...prev, folderId: value || '' }))
            }
            clearable
          />
        </Group>
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={passwordForm.password}
          onChange={(event) =>
            setPasswordForm((prev) => ({ ...prev, password: event.currentTarget.value }))
          }
          required
          mt="sm"
        />
        <TextInput
          label="URL"
          placeholder="https://mail.google.com"
          value={passwordForm.url}
          onChange={(event) =>
            setPasswordForm((prev) => ({ ...prev, url: event.currentTarget.value }))
          }
          mt="sm"
        />
        <Textarea
          label="Notes"
          placeholder="Personal account"
          value={passwordForm.notes}
          onChange={(event) =>
            setPasswordForm((prev) => ({ ...prev, notes: event.currentTarget.value }))
          }
          mt="sm"
          minRows={3}
        />
        {passwordError && (
          <Text size="xs" c="red" mt="sm">
            {passwordError}
          </Text>
        )}
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setIsCreatePasswordOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreatePassword}
            loading={isCreatingPassword}
            disabled={!masterKey}
          >
            Save Password
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        title="Create Folder"
        centered
      >
        <TextInput
          label="Name"
          placeholder="Personal"
          value={folderForm.name}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFolderForm((prev) => ({ ...prev, name: value }));
          }}
          required
        />
        <Textarea
          label="Description"
          placeholder="Optional description"
          value={folderForm.description}
          onChange={(event) =>
            setFolderForm((prev) => ({ ...prev, description: event.currentTarget.value }))
          }
          mt="sm"
          minRows={3}
        />
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setIsCreateFolderOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} loading={isCreatingFolder}>
            Create Folder
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isEditPasswordOpen}
        onClose={() => {
          setIsEditPasswordOpen(false);
          setPasswordToEdit(null);
        }}
        title="Edit Password"
        centered
      >
        <TextInput
          label="Title"
          placeholder="Gmail"
          value={editPasswordForm.title}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setEditPasswordForm((prev) => ({ ...prev, title: value }));
          }}
          required
        />
        <TextInput
          label="URL"
          placeholder="https://mail.google.com"
          value={editPasswordForm.url}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setEditPasswordForm((prev) => ({ ...prev, url: value }));
          }}
          mt="sm"
        />
        <Textarea
          label="Notes"
          placeholder="Optional notes"
          value={editPasswordForm.notes}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setEditPasswordForm((prev) => ({ ...prev, notes: value }));
          }}
          mt="sm"
          minRows={3}
        />
        {passwordError && (
          <Text size="xs" c="red" mt="sm">
            {passwordError}
          </Text>
        )}
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setIsEditPasswordOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdatePassword} loading={isUpdatingPassword}>
            Save Changes
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        title="Delete password"
        centered
      >
        <Text size="sm">
          Are you sure you want to delete{passwordToDelete ? ` "${passwordToDelete.title}"` : ''}?
          This action cannot be undone.
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteConfirm}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={async () => {
              if (passwordToDelete) {
                await handleDeletePassword(passwordToDelete);
              }
              closeDeleteConfirm();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isDeleteFolderConfirmOpen}
        onClose={closeDeleteFolderConfirm}
        title="Delete folder"
        centered
      >
        <Text size="sm">
          Are you sure you want to delete{selectedFolder ? ` "${selectedFolder.name}"` : ''}?
          This action cannot be undone.
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteFolderConfirm}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={async () => {
              await handleDeleteFolder();
              closeDeleteFolderConfirm();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <div className={classes.twoColumn}>
        <div className={classes.panel}>
          <Group justify="space-between" mb="sm">
            <Text fw={600}>Folder Tree</Text>
            <Badge className={classes.pill}>Nested</Badge>
          </Group>
          {folderLoadError && (
            <Text size="xs" className={classes.muted}>
              Unable to load folders. Please try again.
            </Text>
          )}
          {!folderLoadError && folderTree.map((folder) => (
            <div
              key={`${folder.label}-${folder.depth}`}
              className={`${classes.folderItem} ${
                selectedFolderId === folder.id ? classes.folderItemActive : ''
              }`}
              style={{ paddingLeft: `${folder.depth * 16 + 8}px` }}
              onClick={() =>
                setSelectedFolderId((current) => (current === folder.id ? '' : folder.id))
              }
            >
              <IconFolder size={18} color="var(--pm-teal-strong)" />
              <Text size="sm" fw={500}>{folder.label}</Text>
              <Badge size="xs" variant="light" style={{ marginLeft: 'auto' }}>
                {folder.count}
              </Badge>
            </div>
          ))}
        </div>

        <div className={classes.panel}>
          <Group justify="space-between" mb="sm">
            <Text fw={600}>Passwords</Text>
            <Group gap="sm">
              <TextInput
                leftSection={<IconSearch size={16} />}
                placeholder="Search passwords..."
                size="sm"
                value={passwordSearch}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setPasswordSearch(value);
                }}
              />
              <Button variant="light" size="sm" leftSection={<IconShare size={16} />}>
                Share Selected
              </Button>
            </Group>
          </Group>

          {passwordLoadError && (
            <Text size="xs" className={classes.muted}>
              Unable to load passwords. Please try again.
            </Text>
          )}
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead className={classes.tableHeader}>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>Folder</Table.Th>
                <Table.Th>Indicators</Table.Th>
                <Table.Th>Password</Table.Th>
                <Table.Th>Updated</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredPasswords.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Group gap="xs">
                      <IconLock size={16} />
                      <Text fw={600}>{row.title}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>{row.username}</Table.Td>
                  <Table.Td>{row.folder?.name || 'Unassigned'}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {row.isPublic && <Badge className={classes.badgePublic}>Public</Badge>}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {revealedPasswords[row.id] ? revealedPasswords[row.id] : '••••••••'}
                  </Table.Td>
                  <Table.Td>{formatDateTime(row.updatedAt)}</Table.Td>
                  <Table.Td>
                    <Group gap="xs" justify="flex-end" wrap="nowrap">
                      <ActionIcon
                        variant="subtle"
                        aria-label="Copy password"
                        onClick={() => handleCopyPassword(row)}
                      >
                        <IconCopy size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        aria-label={revealedPasswords[row.id] ? 'Hide password' : 'View password'}
                        onClick={() => handleRevealPassword(row)}
                        disabled={isDecryptingPassword}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        aria-label="Delete password"
                        onClick={() => openDeleteConfirm(row)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        aria-label="Edit password"
                        onClick={() => openEditPassword(row)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
