import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Icon,
} from '@chakra-ui/react'
import { FiMail, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signInWithMagicLink } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await signInWithMagicLink(email)

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      setEmailSent(true)
      toast({
        title: 'Check your email!',
        description: 'We sent you a magic link to sign in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }

    setLoading(false)
  }

  return (
    <Box minH="100vh" bg="gray.50" py={20}>
      <Container maxW="md">
        <VStack spacing={8}>
          <VStack spacing={2}>
            <Icon as={FiCheckCircle} w={12} h={12} color="brand.500" />
            <Heading size="xl" color="brand.600">
              Todo PWA
            </Heading>
            <Text color="gray.600" textAlign="center">
              Your tasks, synced across all devices
            </Text>
          </VStack>

          <Box
            w="100%"
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            {emailSent ? (
              <VStack spacing={4}>
                <Icon as={FiMail} w={16} h={16} color="brand.500" />
                <Heading size="md" textAlign="center">
                  Check your email
                </Heading>
                <Text color="gray.600" textAlign="center">
                  We've sent a magic link to <strong>{email}</strong>. Click the
                  link in the email to sign in.
                </Text>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEmailSent(false)
                    setEmail('')
                  }}
                >
                  Use a different email
                </Button>
              </VStack>
            ) : (
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <Heading size="md">Sign in</Heading>
                  <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      size="lg"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="100%"
                    isLoading={loading}
                    leftIcon={<FiMail />}
                  >
                    Send magic link
                  </Button>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    No password needed! We'll email you a secure link to sign in.
                  </Text>
                </VStack>
              </form>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default AuthScreen

