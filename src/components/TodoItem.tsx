import { useState } from 'react'
import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { Todo } from '../lib/supabase'
import { useRef } from 'react'

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string, completed: boolean) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const TodoItem = ({ todo, onToggleComplete, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  // Update editValue if todo.title changes (real-time update)
  const prevTitleRef = useRef(todo.title)
  if (prevTitleRef.current !== todo.title && !isEditing) {
    setEditValue(todo.title)
    prevTitleRef.current = todo.title
  }

  const handleSave = () => {
    const trimmedValue = editValue.trim()
    
    // Don't save if empty or unchanged
    if (!trimmedValue) {
      handleCancel()
      return
    }
    
    if (trimmedValue !== todo.title) {
      onUpdate(todo.id, trimmedValue)
    }
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(todo.title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(todo.id)
    onClose()
  }

  return (
    <>
      <Box
        bg="white"
        p={4}
        borderRadius="xl"
        boxShadow="sm"
        border="1px"
        borderColor="gray.100"
        transition="all 0.2s"
        _hover={{ boxShadow: 'md', borderColor: 'brand.200' }}
      >
        <HStack spacing={3}>
          <Checkbox
            isChecked={todo.completed}
            onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
            colorScheme="brand"
            size="lg"
          />

          {isEditing ? (
            <>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
                size="md"
                autoFocus
              />
              <IconButton
                aria-label="Save"
                icon={<FiCheck />}
                onClick={handleSave}
                colorScheme="green"
                size="sm"
              />
              <IconButton
                aria-label="Cancel"
                icon={<FiX />}
                onClick={handleCancel}
                variant="ghost"
                size="sm"
              />
            </>
          ) : (
            <>
              <Text
                flex={1}
                textDecoration={todo.completed ? 'line-through' : 'none'}
                color={todo.completed ? 'gray.400' : 'gray.700'}
                fontSize="md"
              >
                {todo.title}
              </Text>
              <IconButton
                aria-label="Edit"
                icon={<FiEdit2 />}
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                colorScheme="blue"
              />
              <IconButton
                aria-label="Delete"
                icon={<FiTrash2 />}
                onClick={onOpen}
                variant="ghost"
                size="sm"
                colorScheme="red"
              />
            </>
          )}
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Todo
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this todo? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default TodoItem

