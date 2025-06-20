// Mock for react-markdown to avoid ES module issues in Jest
import React from 'react'

const ReactMarkdown = ({ children }) => {
  return React.createElement('div', { 'data-testid': 'markdown-content' }, children)
}

export default ReactMarkdown