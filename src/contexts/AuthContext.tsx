import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Parse from 'parse'
import { useAuth } from '../hooks/useBackend'

interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  whatsappNumber?: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (userData: {
    username: string
    email: string
    password: string
    name: string
    whatsappNumber: string
  }) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { signUp, logIn, logOut } = useAuth()

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current()
        if (currentUser) {
          // Refresh user session
          await currentUser.fetch()
          setUser({
            id: currentUser.id,
            username: currentUser.get('username'),
            email: currentUser.get('email'),
            name: currentUser.get('name'),
            avatar: currentUser.get('avatar'),
            whatsappNumber: currentUser.get('whatsappNumber'),
            isAdmin: currentUser.get('isAdmin') || false
          })
        }
      } catch (error) {
        console.error('Error checking current user:', error)
        // If session is invalid, log out
        await Parse.User.logOut()
      } finally {
        setLoading(false)
      }
    }

    checkCurrentUser()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      setLoading(true)
      const parseUser = await logIn(username, password)
      
      setUser({
        id: parseUser.id,
        username: parseUser.get('username'),
        email: parseUser.get('email'),
        name: parseUser.get('name'),
        avatar: parseUser.get('avatar'),
        whatsappNumber: parseUser.get('whatsappNumber'),
        isAdmin: parseUser.get('isAdmin') || false
      })
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: {
    username: string
    email: string
    password: string
    name: string
    whatsappNumber: string
  }) => {
    try {
      setLoading(true)
      const parseUser = await signUp(userData)
      
      setUser({
        id: parseUser.id,
        username: parseUser.get('username'),
        email: parseUser.get('email'),
        name: parseUser.get('name'),
        avatar: parseUser.get('avatar'),
        whatsappNumber: parseUser.get('whatsappNumber'),
        isAdmin: false
      })
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await logOut()
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
      // Force logout even if there's an error
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
