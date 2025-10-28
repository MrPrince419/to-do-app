import { useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

interface TodoInputProps {
  onAdd: (title: string) => void
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
      <form onSubmit={handleSubmit}>
        <HStack>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What needs to be done?"
            size="lg"
            variant="filled"
          />
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            leftIcon={<FiPlus />}
            px={8}
          >
            Add
          </Button>
        </HStack>
      </form>
    </Box>
  )
}

export default TodoInput

