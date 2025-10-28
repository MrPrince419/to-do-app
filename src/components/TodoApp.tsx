import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react'
import { FiMenu, FiLogOut, FiWifi, FiWifiOff } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import { useTodos } from '../hooks/useTodos'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

const TodoApp = () => {
  const { user, signOut } = useAuth()
  const { todos, loading, isOnline, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos(user?.id)
  const toast = useToast()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'Failed to sign out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleAddTodo = async (title: string) => {
    const { error } = await addTodo(title)
    if (error) {
      toast({
        title: 'Error adding todo',
        description: error instanceof Error ? error.message : 'Failed to add todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleUpdateTodo = async (id: string, title: string) => {
    const { error } = await updateTodo(id, { title })
    if (error) {
      toast({
        title: 'Error updating todo',
        description: error instanceof Error ? error.message : 'Failed to update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleDeleteTodo = async (id: string) => {
    const { error } = await deleteTodo(id)
    if (error) {
      toast({
        title: 'Error deleting todo',
        description: error instanceof Error ? error.message : 'Failed to delete todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const { error } = await toggleComplete(id, completed)
    if (error) {
      toast({
        title: 'Error updating todo',
        description: error instanceof Error ? error.message : 'Failed to update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="2xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="brand.600">
                My Tasks
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {user?.email}
              </Text>
            </VStack>
            <HStack>
              <Badge colorScheme={isOnline ? 'green' : 'red'} fontSize="sm" px={2} py={1}>
                <HStack spacing={1}>
                  {isOnline ? <FiWifi /> : <FiWifiOff />}
                  <Text>{isOnline ? 'Online' : 'Offline'}</Text>
                </HStack>
              </Badge>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMenu />}
                  variant="ghost"
                  aria-label="Menu"
                />
                <MenuList>
                  <MenuItem icon={<FiLogOut />} onClick={handleSignOut}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>

          {/* Stats */}
          <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
            <HStack justify="space-around">
              <VStack spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                  {todos.length}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Total
                </Text>
              </VStack>
              <VStack spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {completedCount}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Completed
                </Text>
              </VStack>
              <VStack spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                  {todos.length - completedCount}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Pending
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Add Todo */}
          <TodoInput onAdd={handleAddTodo} />

          {/* Todo List */}
          <TodoList
            todos={todos}
            loading={loading}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        </VStack>
      </Container>
    </Box>
  )
}

export default TodoApp

