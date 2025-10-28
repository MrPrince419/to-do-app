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
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const { signInWithOtp, verifyOtp } = useAuth()
  const toast = useToast()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await signInWithOtp(email)

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      setCodeSent(true)
      toast({
        title: 'Check your email!',
        description: 'We sent you a 6-digit code.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }

    setLoading(false)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await verifyOtp(email, code)

    if (error) {
      toast({
        title: 'Error',
        description: error.message || 'Invalid code. Please try again.',
        status: 'error',
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
          <VStack spacing={3}>
            <Box 
              bg="brand.500" 
              p={4} 
              borderRadius="2xl" 
              boxShadow="lg"
            >
              <Icon as={FiCheckCircle} w={12} h={12} color="white" />
            </Box>
            <Heading size="xl" color="brand.600" fontWeight="bold">
              Todo PWA
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="lg">
              ✨ Your tasks, synced across all devices
            </Text>
          </VStack>

          <Box
            w="100%"
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            {codeSent ? (
              <form onSubmit={handleVerifyCode}>
                <VStack spacing={6}>
                  <Icon as={FiMail} w={16} h={16} color="brand.500" />
                  <Heading size="md" textAlign="center">
                    Enter verification code
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    We sent a 6-digit code to <strong>{email}</strong>
                  </Text>
                  <FormControl isRequired>
                    <FormLabel>Verification Code</FormLabel>
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      size="lg"
                      textAlign="center"
                      fontSize="2xl"
                      letterSpacing="0.5em"
                      maxLength={6}
                      autoFocus
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="100%"
                    isLoading={loading}
                    isDisabled={code.length !== 6}
                  >
                    Verify & Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCodeSent(false)
                      setCode('')
                    }}
                    size="sm"
                  >
                    Use a different email
                  </Button>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    Didn't receive the code? Check your spam folder or request a new one.
                  </Text>
                </VStack>
              </form>
            ) : (
              <form onSubmit={handleSendCode}>
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
                      autoFocus
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
                    Send verification code
                  </Button>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    No password needed! We'll email you a 6-digit code to sign in.
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

