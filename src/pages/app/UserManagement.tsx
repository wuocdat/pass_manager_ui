import { useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Group,
  PasswordInput,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconUserPlus, IconUsers } from '@tabler/icons-react'
import type { CreateUserPayload, UserItem } from '@/@types/user'
import { UserService } from '@/services/user.service'
import classes from './PageShell.module.css'

export default function UserManagement() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CreateUserPayload>({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validate: {
      email: (value) => (value.trim().length === 0 ? 'Email is required' : null),
      password: (value) => (value.trim().length === 0 ? 'Password is required' : null),
      fullName: (value) => (value.trim().length === 0 ? 'Full name is required' : null),
    },
  })

  const isBusy = useMemo(
    () => loading || submitting || Boolean(deletingId),
    [loading, submitting, deletingId]
  )

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await UserService.getUsers()
      setUsers(data)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.response?.data?.description || err?.toString())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleCreate = async (values: CreateUserPayload) => {
    setSubmitting(true)
    setError(null)
    try {
      await UserService.createUser(values)
      form.reset()
      await loadUsers()
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.response?.data?.description || err?.toString())
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (user: UserItem) => {
    if (!window.confirm(`Delete user ${user.email}?`)) {
      return
    }
    setDeletingId(user.id)
    setError(null)
    try {
      await UserService.deleteUser(user.id)
      setUsers((prev) => prev.filter((item) => item.id !== user.id))
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.response?.data?.description || err?.toString())
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className={classes.page}>
      <div className={classes.pageHeader}>
        <div>
          <div className={classes.headerTitle}>User Management</div>
          <Text className={classes.muted}>
            Create, manage, and remove users who can access the vault.
          </Text>
        </div>
        <Badge className={classes.pill}>Admin only</Badge>
      </div>

      <div className={classes.panel}>
        <Group mb="sm">
          <IconUserPlus size={18} />
          <Text fw={600}>Add user</Text>
        </Group>
        <form onSubmit={form.onSubmit(handleCreate)}>
          <Group grow align="flex-start">
            <TextInput
              label="Email"
              placeholder="user@example.com"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Full name"
              placeholder="Jane Doe"
              withAsterisk
              {...form.getInputProps('fullName')}
            />
          </Group>
          <Group grow mt="md" align="flex-start">
            <PasswordInput
              label="Password"
              placeholder="Set a temporary password"
              withAsterisk
              {...form.getInputProps('password')}
            />
          </Group>
          {error ? (
            <Text size="sm" c="red" mt="sm">
              {error}
            </Text>
          ) : null}
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={submitting} disabled={isBusy}>
              Create user
            </Button>
          </Group>
        </form>
      </div>

      <div className={classes.panel}>
        <Group justify="space-between" mb="sm">
          <Group>
            <IconUsers size={18} />
            <Text fw={600}>All users</Text>
          </Group>
          <Badge className={classes.pill}>{users.length} users</Badge>
        </Group>
        {error ? (
          <Text size="sm" c="red" mb="sm">
            {error}
          </Text>
        ) : null}
        <Table striped withTableBorder>
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
              <Table.Th>Full name</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.fullName}</Table.Td>
                <Table.Td>
                  <Badge className={user.role === 'admin' ? classes.badgeShared : classes.badgePublic}>
                    {user.role}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={() => handleDelete(user)}
                    loading={deletingId === user.id}
                  >
                    Delete
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
            {!users.length && !loading ? (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text size="sm" c="dimmed">
                    No users found.
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : null}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  )
}
