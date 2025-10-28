import { useEffect, useState, useCallback } from 'react'
import { supabase, Todo } from '../lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

const OFFLINE_STORAGE_KEY = 'todos_offline_storage'
const OFFLINE_QUEUE_KEY = 'todos_offline_queue'

interface OfflineAction {
  type: 'add' | 'update' | 'delete'
  tempId?: string
  id?: string
  data?: Partial<Todo>
  timestamp: number
}

export const useTodos = (userId: string | undefined) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [syncing, setSyncing] = useState(false)

  // Offline queue management
  const getOfflineQueue = useCallback((): OfflineAction[] => {
    try {
      const queue = localStorage.getItem(OFFLINE_QUEUE_KEY)
      return queue ? JSON.parse(queue) : []
    } catch (error) {
      console.error('Error reading offline queue:', error)
      return []
    }
  }, [])

  const addToOfflineQueue = useCallback((action: OfflineAction) => {
    try {
      const queue = getOfflineQueue()
      queue.push(action)
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
    } catch (error) {
      console.error('Error adding to offline queue:', error)
    }
  }, [getOfflineQueue])

  const clearOfflineQueue = useCallback(() => {
    try {
      localStorage.removeItem(OFFLINE_QUEUE_KEY)
    } catch (error) {
      console.error('Error clearing offline queue:', error)
    }
  }, [])

  // Process offline queue when coming back online
  const processOfflineQueue = useCallback(async () => {
    if (!userId || !isOnline) return

    const queue = getOfflineQueue()
    if (queue.length === 0) return

    setSyncing(true)
    console.log('Processing offline queue:', queue.length, 'actions')

    for (const action of queue) {
      try {
        if (action.type === 'add' && action.data) {
          // Add the todo to Supabase
          const { data, error } = await supabase
            .from('todos')
            .insert([action.data])
            .select()
            .single()

          if (!error && data) {
            // Replace temporary ID with real ID in local state
            setTodos((current) => {
              const newTodos = current.map((todo) =>
                todo.id === action.tempId ? data : todo
              )
              saveToLocalStorage(newTodos)
              return newTodos
            })
          }
        } else if (action.type === 'update' && action.id && action.data) {
          // Skip if it's a temp ID (will be handled by add action)
          if (action.id.startsWith('temp-')) continue

          await supabase
            .from('todos')
            .update(action.data)
            .eq('id', action.id)
        } else if (action.type === 'delete' && action.id) {
          // Skip if it's a temp ID (just remove locally)
          if (action.id.startsWith('temp-')) {
            setTodos((current) => {
              const newTodos = current.filter((todo) => todo.id !== action.id)
              saveToLocalStorage(newTodos)
              return newTodos
            })
            continue
          }

          await supabase.from('todos').delete().eq('id', action.id)
        }
      } catch (error) {
        console.error('Error processing offline action:', error)
      }
    }

    clearOfflineQueue()
    setSyncing(false)

    // Refetch to ensure everything is in sync
    await fetchTodos()
  }, [userId, isOnline, getOfflineQueue, clearOfflineQueue, saveToLocalStorage])

  // Monitor online/offline status and sync when coming online
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Process offline queue when coming back online
      processOfflineQueue()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check queue on mount if already online
    if (navigator.onLine) {
      processOfflineQueue()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [processOfflineQueue])

  // Load todos from localStorage for offline support
  const loadFromLocalStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY)
      if (stored) {
        setTodos(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [])

  // Save todos to localStorage
  const saveToLocalStorage = useCallback((todosToSave: Todo[]) => {
    try {
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(todosToSave))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [])

  // Fetch todos from Supabase
  const fetchTodos = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setTodos(data || [])
      saveToLocalStorage(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
      // If offline, load from localStorage
      if (!isOnline) {
        loadFromLocalStorage()
      }
    } finally {
      setLoading(false)
    }
  }, [userId, isOnline, loadFromLocalStorage, saveToLocalStorage])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!userId) return

    fetchTodos()

    let channel: RealtimeChannel

    // Only subscribe to real-time updates if online
    if (isOnline) {
      channel = supabase
        .channel('todos_channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'todos',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setTodos((current) => {
                const newTodos = [payload.new as Todo, ...current]
                saveToLocalStorage(newTodos)
                return newTodos
              })
            } else if (payload.eventType === 'UPDATE') {
              setTodos((current) => {
                const newTodos = current.map((todo) =>
                  todo.id === payload.new.id ? (payload.new as Todo) : todo
                )
                saveToLocalStorage(newTodos)
                return newTodos
              })
            } else if (payload.eventType === 'DELETE') {
              setTodos((current) => {
                const newTodos = current.filter((todo) => todo.id !== payload.old.id)
                saveToLocalStorage(newTodos)
                return newTodos
              })
            }
          }
        )
        .subscribe()
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [userId, isOnline, fetchTodos, saveToLocalStorage])

  const addTodo = async (title: string) => {
    if (!userId) return { error: new Error('User not authenticated') }

    const newTodo: Partial<Todo> = {
      title,
      completed: false,
      user_id: userId,
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      // If offline, add to local state and queue for sync
      if (!isOnline) {
        const tempTodo: Todo = {
          id: `temp-${Date.now()}`,
          user_id: userId,
          title,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        
        // Add to offline queue
        addToOfflineQueue({
          type: 'add',
          tempId: tempTodo.id,
          data: { title, completed: false, user_id: userId },
          timestamp: Date.now(),
        })

        setTodos((current) => {
          const newTodos = [tempTodo, ...current]
          saveToLocalStorage(newTodos)
          return newTodos
        })
        return { data: tempTodo, error: null }
      }
      return { data: null, error }
    }
  }

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      // If offline, update local state and queue for sync
      if (!isOnline) {
        // Add to offline queue
        addToOfflineQueue({
          type: 'update',
          id,
          data: { ...updates, updated_at: new Date().toISOString() },
          timestamp: Date.now(),
        })

        setTodos((current) => {
          const newTodos = current.map((todo) =>
            todo.id === id ? { ...todo, ...updates, updated_at: new Date().toISOString() } : todo
          )
          saveToLocalStorage(newTodos)
          return newTodos
        })
        return { data: null, error: null }
      }
      return { data: null, error }
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error) {
      // If offline, delete from local state and queue for sync
      if (!isOnline) {
        // Add to offline queue
        addToOfflineQueue({
          type: 'delete',
          id,
          timestamp: Date.now(),
        })

        setTodos((current) => {
          const newTodos = current.filter((todo) => todo.id !== id)
          saveToLocalStorage(newTodos)
          return newTodos
        })
        return { error: null }
      }
      return { error }
    }
  }

  const toggleComplete = async (id: string, completed: boolean) => {
    return updateTodo(id, { completed })
  }

  return {
    todos,
    loading,
    isOnline,
    syncing,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refetch: fetchTodos,
  }
}

