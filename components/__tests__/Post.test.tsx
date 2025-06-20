import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import Post, { PostProps } from '../Post'

// Mock Next.js router
jest.mock('next/router')

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

// Sample post data
const mockPost: PostProps = {
  id: "1",
  title: "Test Post Title",
  content: "This is test content for the post",
  published: true,
  author: {
    name: "John Doe"
  }
}

const mockDraftPost: PostProps = {
  id: "2", 
  title: "Draft Post Title",
  content: "This is draft content",
  published: false,
  author: {
    name: "Jane Smith"
  }
}

const mockPostWithoutAuthor: PostProps = {
  id: "3",
  title: "No Author Post",
  content: "Post without author",
  published: true,
  author: null
}

describe('Post Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter)
    jest.clearAllMocks()
  })

  it('should render post title as heading', () => {
    render(<Post post={mockPost} />)
    
    const title = screen.getByRole('heading', { name: /test post title/i })
    expect(title).toBeInTheDocument()
  })

  it('should render post content', () => {
    render(<Post post={mockPost} />)
    
    expect(screen.getByText('This is test content for the post')).toBeInTheDocument()
  })

  it('should render author name when author exists', () => {
    render(<Post post={mockPost} />)
    
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('should render "Unknown author" when author is null', () => {
    render(<Post post={mockPostWithoutAuthor} />)
    
    expect(screen.getByText('By Unknown author')).toBeInTheDocument()
  })

  it('should render "Unknown author" when author name is undefined', () => {
    const postWithUndefinedAuthor: PostProps = {
      ...mockPost,
      author: { name: undefined as any }
    }
    
    render(<Post post={postWithUndefinedAuthor} />)
    
    expect(screen.getByText('By Unknown author')).toBeInTheDocument()
  })

  it('should render draft posts correctly', () => {
    render(<Post post={mockDraftPost} />)
    
    const title = screen.getByRole('heading', { name: /draft post title/i })
    expect(title).toBeInTheDocument()
    
    expect(screen.getByText('This is draft content')).toBeInTheDocument()
    expect(screen.getByText('By Jane Smith')).toBeInTheDocument()
  })

  it('should render published posts correctly', () => {
    render(<Post post={mockPost} />)
    
    const title = screen.getByRole('heading', { name: /test post title/i })
    expect(title).toBeInTheDocument()
    
    expect(screen.getByText('This is test content for the post')).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('should handle empty content', () => {
    const postWithEmptyContent: PostProps = {
      ...mockPost,
      content: ""
    }
    
    render(<Post post={postWithEmptyContent} />)
    
    expect(screen.getByRole('heading', { name: /test post title/i })).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
  })

  it('should handle long content', () => {
    const postWithLongContent: PostProps = {
      ...mockPost,
      content: "This is a very long post content that should be displayed properly. ".repeat(10)
    }
    
    render(<Post post={postWithLongContent} />)
    
    expect(screen.getByRole('heading', { name: /test post title/i })).toBeInTheDocument()
    expect(screen.getByText(/This is a very long post content/)).toBeInTheDocument()
  })

  it('should handle special characters in title and content', () => {
    const postWithSpecialChars: PostProps = {
      ...mockPost,
      title: "Special Title: @#$%^&*()",
      content: "Content with special chars: <script>alert('test')</script>"
    }
    
    render(<Post post={postWithSpecialChars} />)
    
    expect(screen.getByRole('heading', { name: /special title/i })).toBeInTheDocument()
    expect(screen.getByText(/Content with special chars/)).toBeInTheDocument()
  })

  it('should render with proper CSS classes structure', () => {
    const { container } = render(<Post post={mockPost} />)
    
    // Should have a div container (the post wrapper)
    const postDiv = container.firstChild
    expect(postDiv).toBeInTheDocument()
  })

  it('should render posts with different IDs correctly', () => {
    const posts = [
      { ...mockPost, id: "123" },
      { ...mockPost, id: "abc" },
      { ...mockPost, id: "test-post-id" }
    ]

    posts.forEach(post => {
      const { unmount } = render(<Post post={post} />)
      
      const title = screen.getByRole('heading', { name: /test post title/i })
      expect(title).toBeInTheDocument()
      
      unmount()
    })
  })
})