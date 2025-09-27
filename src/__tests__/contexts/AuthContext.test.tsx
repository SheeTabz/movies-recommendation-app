import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ReactNode } from 'react'


// Create a mock for localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock localStorage globally
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true
})


// renderHook needs a wrapper to provide the AuthContext
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthContext', () => {

  // ensures each test starts with a clean state
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  // Initial State
  it('should provide initial state correctly', async () => {
    // ARRANGE & ACT: Render the hook
    const { result } = renderHook(() => useAuth(), { wrapper })

    // ASSERT: Check initial state (user should be null)
    expect(result.current.user).toBe(null)
    
    // Wait for useEffect to complete (loading becomes false)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isLoading).toBe(false)
  })

  // Session Persistence
  it('should restore user from localStorage on mount', async () => {
    // ARRANGE: Mock saved user in localStorage
    const savedUser = {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com'
    }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedUser))

    // ACT: Render the hook
    const { result } = renderHook(() => useAuth(), { wrapper })

    // Wait for useEffect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // ASSERT: User should be restored
    expect(result.current.user).toEqual(savedUser)
    expect(result.current.isLoading).toBe(false)
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user')
  })

  // Successful Registration
  it('should register new user successfully', async () => {
    // ARRANGE: Mock empty users array
    localStorageMock.getItem
      .mockReturnValueOnce(null) // Initial user check
      .mockReturnValueOnce('[]') // Empty users array

    const { result } = renderHook(() => useAuth(), { wrapper })

    // Wait for initial loading
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // ACT: Register new user
    let registerResult: boolean
    await act(async () => {
      registerResult = await result.current.register('John Doe', 'john@example.com', 'password123')
    })

    // ASSERT: Registration should succeed
    expect(registerResult!).toBe(true)
    expect(result.current.user).toEqual({
      id: expect.any(String),
      fullName: 'John Doe',
      email: 'john@example.com'
    })

    // Verify localStorage calls
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'users',
      expect.stringContaining('John Doe')
    )
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      expect.stringContaining('John Doe')
    )
  })

  // Prevent Duplicate Registration
  it('should prevent duplicate user registration', async () => {
    // ARRANGE: Mock existing user
    const existingUsers = [{
      id: '1',
      fullName: 'Existing User',
      email: 'john@example.com',
      password: 'password123'
    }]

    localStorageMock.getItem
      .mockReturnValueOnce(null) // Initial user check
      .mockReturnValueOnce(JSON.stringify(existingUsers)) // Existing users

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // ACT: Try to register with existing email
    let registerResult: boolean
    await act(async () => {
      registerResult = await result.current.register('John Doe', 'john@example.com', 'password123')
    })

    // ASSERT: Registration should fail
    expect(registerResult!).toBe(false)
    expect(result.current.user).toBe(null)
  })

  // Successful Login
  it('should login existing user successfully', async () => {
    // ARRANGE: Mock existing users
    const existingUsers = [{
      id: '1',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }]

    localStorageMock.getItem
      .mockReturnValueOnce(null) // Initial user check
      .mockReturnValueOnce(JSON.stringify(existingUsers)) // Users for login

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // ACT: Login
    let loginResult: boolean
    await act(async () => {
      loginResult = await result.current.login('test@example.com', 'password123')
    })

    // ASSERT: Login should succeed
    expect(loginResult!).toBe(true)
    expect(result.current.user).toEqual({
      id: '1',
      fullName: 'Test User',
      email: 'test@example.com'
    })

    // Verify user saved to localStorage (without password)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      expect.stringContaining('Test User')
    )
  })

  // Failed Login
  it('should handle failed login', async () => {
    // ARRANGE: Mock empty users array
    localStorageMock.getItem
      .mockReturnValueOnce(null) // Initial user check
      .mockReturnValueOnce('[]') // Empty users array

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // ACT: Try to login with non-existent user
    let loginResult: boolean
    await act(async () => {
      loginResult = await result.current.login('nonexistent@example.com', 'wrongpassword')
    })

    // ASSERT: Login should fail
    expect(loginResult!).toBe(false)
    expect(result.current.user).toBe(null)
  })

  //  Logout
  it('should logout user successfully', async () => {
    // ARRANGE: Start with logged-in user
    const savedUser = {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com'
    }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedUser))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verify user is logged in
    expect(result.current.user).toEqual(savedUser)

    // ACT: Logout
    act(() => {
      result.current.logout()
    })

    // ASSERT: User should be logged out
    expect(result.current.user).toBe(null)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })
})