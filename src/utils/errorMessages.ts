// User-friendly error messages
export const getErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred'

  // Network errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return 'Network error. Please check your connection and try again.'
  }

  // Supabase specific errors
  if (error.code === 'PGRST116') {
    return 'This item no longer exists. It may have been deleted.'
  }

  if (error.code === '23505') {
    return 'This item already exists.'
  }

  if (error.message?.includes('JWT')) {
    return 'Your session has expired. Please sign in again.'
  }

  if (error.message?.includes('permission') || error.message?.includes('denied')) {
    return 'You don\'t have permission to perform this action.'
  }

  // Rate limiting
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.'
  }

  // Server errors
  if (error.status >= 500) {
    return 'Server error. Please try again in a few moments.'
  }

  // Return the error message if it's user-friendly
  if (error.message && error.message.length < 100) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

