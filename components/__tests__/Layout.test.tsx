import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../Layout'

// Mock dependencies
jest.mock('next-auth/react')
jest.mock('next/router')

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

describe('Layout Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter)
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated'
    })
    jest.clearAllMocks()
  })

  it('should render children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render Header component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    
    // Header should render navigation
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('should render with proper CSS structure', () => {
    const { container } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    
    // Should have a div container
    const layoutDiv = container.firstChild
    expect(layoutDiv).toBeInTheDocument()
    expect(layoutDiv).toHaveTextContent('Test Content')
  })

  it('should pass through Header navigation when authenticated', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://avatars.github.com/u/123456'
    }

    mockUseSession.mockReturnValue({
      data: {
        user: mockUser,
        expires: '2024-12-31'
      },
      status: 'authenticated'
    })

    render(
      <Layout>
        <div>Authenticated Content</div>
      </Layout>
    )
    
    // Should show authenticated user info
    expect(screen.getByText('John Doe (john@example.com)')).toBeInTheDocument()
    expect(screen.getByText('Authenticated Content')).toBeInTheDocument()
  })

  it('should handle multiple children', () => {
    render(
      <Layout>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </Layout>
    )
    
    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })

  it('should render with loading session state', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading'
    })

    render(
      <Layout>
        <div>Loading Content</div>
      </Layout>
    )
    
    // Should show login button during loading (as per Header implementation)
    const loginButton = screen.getByRole('button', { name: /log in/i })
    expect(loginButton).toBeInTheDocument()
    expect(screen.getByText('Loading Content')).toBeInTheDocument()
  })

  it('should maintain Header navigation across different routes', () => {
    mockRouter.pathname = '/drafts'
    
    render(
      <Layout>
        <div>Drafts Page Content</div>
      </Layout>
    )
    
    // Feed link should still be present
    const feedLink = screen.getByRole('link', { name: /feed/i })
    expect(feedLink).toBeInTheDocument()
    expect(feedLink).toHaveAttribute('href', '/')
  })

  it('should render without any children', () => {
    render(<Layout />)
    
    // Should still render Header
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})