import {
  Box,
  VStack,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { Todo } from '../lib/supabase'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  loading: boolean
  onToggleComplete: (id: string, completed: boolean) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const TodoList = ({ todos, loading, onToggleComplete, onUpdate, onDelete }: TodoListProps) => {
  if (loading) {
    return (
      <Center py={12}>
        <Spinner size="xl" color="brand.500" />
      </Center>
    )
  }

  if (todos.length === 0) {
    return (
      <Box bg="white" p={12} borderRadius="lg" boxShadow="sm" textAlign="center">
        <Text fontSize="lg" color="gray.400">
          No tasks yet. Add one above to get started! 🎯
        </Text>
      </Box>
    )
  }

  return (
    <VStack spacing={2} align="stretch">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  )
}

export default TodoList

