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
      setPasswordError('Cần nhập tên thư mục.');
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
      setPasswordError('Thiếu khóa chính để mã hóa.');
      return;
    }
    if (!passwordForm.title || !passwordForm.password) {
      setPasswordError('Cần nhập tiêu đề và mật khẩu.');
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
      setPasswordError('Tạo mật khẩu thất bại.');
    } finally {
      setIsCreatingPassword(false);
    }
  };

  const handleRevealPassword = async (item: PasswordItem) => {
    if (!masterKey) {
      setPasswordError('Thiếu khóa chính để giải mã.');
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
      setPasswordError('Giải mã mật khẩu thất bại.');
    } finally {
      setIsDecryptingPassword(false);
    }
  };

  const handleCopyPassword = async (item: PasswordItem) => {
    if (!masterKey) {
      notifications.show({
        title: 'Thiếu khóa chính',
        message: 'Không thể sao chép mật khẩu khi thiếu khóa chính.',
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
        title: 'Đã sao chép',
        message: 'Mật khẩu đã được sao chép vào clipboard.',
        color: 'teal',
      });
    } catch (error) {
      console.error('Failed to copy password', error);
      notifications.show({
        title: 'Sao chép thất bại',
        message: 'Không thể sao chép mật khẩu. Vui lòng thử lại.',
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
      setPasswordError('Xóa mật khẩu thất bại.');
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
      setPasswordError('Cập nhật mật khẩu thất bại.');
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
      setPasswordError('Xóa thư mục thất bại.');
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>Kho của tôi</div>
          <Text className={classes.muted}>
            Sắp xếp mật khẩu theo thư mục, chia sẻ tự tin và theo dõi mọi hoạt động.
          </Text>
        </div>
        <Group>
          <Button
            leftSection={<IconFolderPlus size={16} />}
            variant="light"
            onClick={() => setIsCreateFolderOpen(true)}
            loading={isCreatingFolder}
          >
            Tạo thư mục
          </Button>
          {selectedFolderId && (
            <Button
              leftSection={<IconTrash size={16} />}
              variant="light"
              color="red"
              onClick={openDeleteFolderConfirm}
            >
              Xóa thư mục
            </Button>
          )}
          <Button
            leftSection={<IconPlus size={16} />}
            color="teal"
            onClick={() => setIsCreatePasswordOpen(true)}
            loading={isCreatingPassword}
          >
            Tạo mật khẩu
          </Button>
        </Group>
      </div>

      <Modal
        opened={isCreatePasswordOpen}
        onClose={() => {
          setIsCreatePasswordOpen(false);
          setPasswordError(null);
        }}
        title="Tạo mật khẩu"
        centered
      >
        <Group grow>
          <TextInput
            label="Tiêu đề"
            placeholder="Gmail"
            value={passwordForm.title}
            onChange={(event) =>
              setPasswordForm((prev) => ({ ...prev, title: event.currentTarget.value }))
            }
            required
          />
          <Select
            label="Thư mục"
            placeholder="Chọn thư mục"
            data={folderOptions}
            value={passwordForm.folderId || null}
            onChange={(value) =>
              setPasswordForm((prev) => ({ ...prev, folderId: value || '' }))
            }
            clearable
          />
        </Group>
        <PasswordInput
          label="Mật khẩu"
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
          label="Ghi chú"
          placeholder="Tài khoản cá nhân"
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
            Hủy
          </Button>
          <Button
            onClick={handleCreatePassword}
            loading={isCreatingPassword}
            disabled={!masterKey}
          >
            Lưu mật khẩu
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        title="Tạo thư mục"
        centered
      >
        <TextInput
          label="Tên"
          placeholder="Cá nhân"
          value={folderForm.name}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFolderForm((prev) => ({ ...prev, name: value }));
          }}
          required
        />
        <Textarea
          label="Mô tả"
          placeholder="Mô tả (không bắt buộc)"
          value={folderForm.description}
          onChange={(event) =>
            setFolderForm((prev) => ({ ...prev, description: event.currentTarget.value }))
          }
          mt="sm"
          minRows={3}
        />
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setIsCreateFolderOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleCreateFolder} loading={isCreatingFolder}>
            Tạo thư mục
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isEditPasswordOpen}
        onClose={() => {
          setIsEditPasswordOpen(false);
          setPasswordToEdit(null);
        }}
        title="Sửa mật khẩu"
        centered
      >
        <TextInput
          label="Tiêu đề"
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
          label="Ghi chú"
          placeholder="Ghi chú (không bắt buộc)"
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
            Hủy
          </Button>
          <Button onClick={handleUpdatePassword} loading={isUpdatingPassword}>
            Lưu thay đổi
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        title="Xóa mật khẩu"
        centered
      >
        <Text size="sm">
          Bạn có chắc muốn xóa{passwordToDelete ? ` "${passwordToDelete.title}"` : ''}?
          Hành động này không thể hoàn tác.
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteConfirm}>
            Hủy
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
            Xóa
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isDeleteFolderConfirmOpen}
        onClose={closeDeleteFolderConfirm}
        title="Xóa thư mục"
        centered
      >
        <Text size="sm">
          Bạn có chắc muốn xóa{selectedFolder ? ` "${selectedFolder.name}"` : ''}?
          Hành động này không thể hoàn tác.
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={closeDeleteFolderConfirm}>
            Hủy
          </Button>
          <Button
            color="red"
            onClick={async () => {
              await handleDeleteFolder();
              closeDeleteFolderConfirm();
            }}
          >
            Xóa
          </Button>
        </Group>
      </Modal>

      <div className={classes.twoColumn}>
        <div className={classes.panel}>
          <Group justify="space-between" mb="sm">
            <Text fw={600}>Cây thư mục</Text>
            <Badge className={classes.pill}>Lồng nhau</Badge>
          </Group>
          {folderLoadError && (
            <Text size="xs" className={classes.muted}>
              Không thể tải thư mục. Vui lòng thử lại.
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
            <Text fw={600}>Mật khẩu</Text>
            <Group gap="sm">
              <TextInput
                leftSection={<IconSearch size={16} />}
                placeholder="Tìm mật khẩu..."
                size="sm"
                value={passwordSearch}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setPasswordSearch(value);
                }}
              />
              <Button variant="light" size="sm" leftSection={<IconShare size={16} />}>
                Chia sẻ đã chọn
              </Button>
            </Group>
          </Group>

          {passwordLoadError && (
            <Text size="xs" className={classes.muted}>
              Không thể tải mật khẩu. Vui lòng thử lại.
            </Text>
          )}
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead className={classes.tableHeader}>
              <Table.Tr>
                <Table.Th>Tiêu đề</Table.Th>
                <Table.Th>Tên người dùng</Table.Th>
                <Table.Th>Thư mục</Table.Th>
                <Table.Th>Trạng thái</Table.Th>
                <Table.Th>Mật khẩu</Table.Th>
                <Table.Th>Cập nhật</Table.Th>
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
                  <Table.Td>{row.folder?.name || 'Chưa gán'}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {row.isPublic && <Badge className={classes.badgePublic}>Công khai</Badge>}
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
                        aria-label="Sao chép mật khẩu"
                        onClick={() => handleCopyPassword(row)}
                      >
                        <IconCopy size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        aria-label={revealedPasswords[row.id] ? 'Ẩn mật khẩu' : 'Xem mật khẩu'}
                        onClick={() => handleRevealPassword(row)}
                        disabled={isDecryptingPassword}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        aria-label="Xóa mật khẩu"
                        onClick={() => openDeleteConfirm(row)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        aria-label="Sửa mật khẩu"
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
