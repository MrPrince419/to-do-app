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
  const { todos, loading, isOnline, syncing, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos(user?.id)
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to add todo'
      toast({
        title: 'Could not add todo',
        description: errorMessage.includes('fetch') || errorMessage.includes('network')
          ? 'Network error. Your todo will be added when you\'re back online.'
          : errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleUpdateTodo = async (id: string, title: string) => {
    const { error } = await updateTodo(id, { title })
    if (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update todo'
      toast({
        title: 'Could not update todo',
        description: errorMessage.includes('fetch') || errorMessage.includes('network')
          ? 'Network error. Changes will be saved when you\'re back online.'
          : errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleDeleteTodo = async (id: string) => {
    const { error } = await deleteTodo(id)
    if (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete todo'
      toast({
        title: 'Could not delete todo',
        description: errorMessage.includes('fetch') || errorMessage.includes('network')
          ? 'Network error. The todo will be deleted when you\'re back online.'
          : errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Todo deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const { error } = await toggleComplete(id, completed)
    if (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update todo'
      toast({
        title: 'Could not update todo',
        description: errorMessage.includes('fetch') || errorMessage.includes('network')
          ? 'Network error. Your change will be saved when you\'re back online.'
          : errorMessage,
        status: 'error',
        duration: 5000,
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
              <Badge 
                colorScheme={syncing ? 'blue' : isOnline ? 'green' : 'red'} 
                fontSize="sm" 
                px={2} 
                py={1}
              >
                <HStack spacing={1}>
                  {isOnline ? <FiWifi /> : <FiWifiOff />}
                  <Text>{syncing ? 'Syncing...' : isOnline ? 'Online' : 'Offline'}</Text>
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
          <Box bg="white" p={6} borderRadius="xl" boxShadow="md" border="1px" borderColor="gray.100">
            <HStack justify="space-around" spacing={4}>
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                  {todos.length}
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  Total
                </Text>
              </VStack>
              <Box h="50px" w="1px" bg="gray.200" />
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="green.500">
                  {completedCount}
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  Completed
                </Text>
              </VStack>
              <Box h="50px" w="1px" bg="gray.200" />
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                  {todos.length - completedCount}
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
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

