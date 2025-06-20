import { render, screen, fireEvent } from '@testing-library/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '../Header'

// Mock functions
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

// Setup router mock
const mockRouter = {
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}

describe('Header Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter)
    jest.clearAllMocks()
  })

  describe('When user is not authenticated', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated'
      })
    })

    it('should render login button', () => {
      render(<Header />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      expect(loginButton).toBeInTheDocument()
    })

    it('should call signIn when login button is clicked', () => {
      render(<Header />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      fireEvent.click(loginButton)
      
      expect(mockSignIn).toHaveBeenCalledTimes(1)
    })

    it('should show only Feed link in navigation', () => {
      render(<Header />)
      
      const feedLink = screen.getByRole('link', { name: /feed/i })
      expect(feedLink).toBeInTheDocument()
      
      // Should not show "My drafts" when not authenticated
      const draftsLink = screen.queryByRole('link', { name: /my drafts/i })
      expect(draftsLink).not.toBeInTheDocument()
    })

    it('should not show New post button when not authenticated', () => {
      render(<Header />)
      
      const newPostButton = screen.queryByRole('button', { name: /new post/i })
      expect(newPostButton).not.toBeInTheDocument()
    })
  })

  describe('When user is authenticated', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://avatars.github.com/u/123456'
    }

    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: {
          user: mockUser,
          expires: '2024-12-31'
        },
        status: 'authenticated'
      })
    })

    it('should render user information', () => {
      render(<Header />)
      
      expect(screen.getByText('John Doe (john@example.com)')).toBeInTheDocument()
    })

    it('should show logout button', () => {
      render(<Header />)
      
      const logoutButton = screen.getByRole('button', { name: /log out/i })
      expect(logoutButton).toBeInTheDocument()
    })

    it('should call signOut when logout button is clicked', () => {
      render(<Header />)
      
      const logoutButton = screen.getByRole('button', { name: /log out/i })
      fireEvent.click(logoutButton)
      
      expect(mockSignOut).toHaveBeenCalledTimes(1)
    })

    it('should show both Feed and My drafts links', () => {
      render(<Header />)
      
      const feedLink = screen.getByRole('link', { name: /feed/i })
      const draftsLink = screen.getByRole('link', { name: /my drafts/i })
      
      expect(feedLink).toBeInTheDocument()
      expect(draftsLink).toBeInTheDocument()
    })

    it('should show New post button', () => {
      render(<Header />)
      
      const newPostButton = screen.getByRole('button', { name: /new post/i })
      expect(newPostButton).toBeInTheDocument()
    })

    it('should highlight active navigation link', () => {
      mockUseRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/drafts'
      })
      
      render(<Header />)
      
      const draftsLink = screen.getByRole('link', { name: /my drafts/i })
      expect(draftsLink).toHaveAttribute('data-active', 'true')
    })
  })

  describe('When session is loading', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'loading'
      })
    })

    it('should show loading state', () => {
      render(<Header />)
      
      expect(screen.getByText('Validating session ...')).toBeInTheDocument()
    })

    it('should show only Feed link during loading', () => {
      render(<Header />)
      
      const feedLink = screen.getByRole('link', { name: /feed/i })
      expect(feedLink).toBeInTheDocument()
      
      const draftsLink = screen.queryByRole('link', { name: /my drafts/i })
      expect(draftsLink).not.toBeInTheDocument()
    })
  })

  describe('Navigation behavior', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated'
      })
    })

    it('should have correct href attributes for links', () => {
      render(<Header />)
      
      const feedLink = screen.getByRole('link', { name: /feed/i })
      expect(feedLink).toHaveAttribute('href', '/')
    })

    it('should render navigation structure correctly', () => {
      render(<Header />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })
})