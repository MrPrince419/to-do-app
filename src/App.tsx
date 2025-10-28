import { Box } from '@chakra-ui/react'
import { useAuth } from './hooks/useAuth'
import AuthScreen from './components/AuthScreen'
import TodoApp from './components/TodoApp'
import { useEffect } from 'react'

function App() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service worker registration failed:', error)
      })
    }
  }, [])

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        Loading...
      </Box>
    )
  }

  return user ? <TodoApp /> : <AuthScreen />
}

export default App

