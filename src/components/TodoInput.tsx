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
    <Box bg="white" p={5} borderRadius="xl" boxShadow="md" border="1px" borderColor="gray.100">
      <form onSubmit={handleSubmit}>
        <HStack spacing={3}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="✍️ What needs to be done?"
            size="lg"
            variant="filled"
            _focus={{ bg: 'gray.50', borderColor: 'brand.500' }}
          />
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            leftIcon={<FiPlus />}
            px={8}
            boxShadow="sm"
          >
            Add
          </Button>
        </HStack>
      </form>
    </Box>
  )
}

export default TodoInput

