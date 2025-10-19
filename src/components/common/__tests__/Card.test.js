import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Card } from '../Card';

// Test wrapper component
const TestWrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Card Component', () => {
  test('renders card with children', () => {
    render(
      <TestWrapper>
        <Card>
          <p>Card content</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders card with title', () => {
    render(
      <TestWrapper>
        <Card title="Test Card">
          <p>Card content</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders card with subtitle', () => {
    render(
      <TestWrapper>
        <Card title="Test Card" subtitle="Test subtitle">
          <p>Card content</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  test('renders card with footer', () => {
    render(
      <TestWrapper>
        <Card footer={<button>Footer Button</button>}>
          <p>Card content</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /footer button/i })).toBeInTheDocument();
  });

  test('renders card with image', () => {
    render(
      <TestWrapper>
        <Card title="Test Card" image="test-image.jpg">
          <p>Card content</p>
        </Card>
      </TestWrapper>
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Card');
  });

  test('applies elevated variant styles', () => {
    render(
      <TestWrapper>
        <Card variant="elevated">
          <p>Elevated card</p>
        </Card>
      </TestWrapper>
    );
    
    const card = screen.getByText('Elevated card').closest('div');
    expect(card).toHaveStyle('box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
  });

  test('applies outlined variant styles', () => {
    render(
      <TestWrapper>
        <Card variant="outlined">
          <p>Outlined card</p>
        </Card>
      </TestWrapper>
    );
    
    const card = screen.getByText('Outlined card').closest('div');
    expect(card).toHaveStyle('border: 2px solid #e4e4e7');
  });

  test('applies filled variant styles', () => {
    render(
      <TestWrapper>
        <Card variant="filled">
          <p>Filled card</p>
        </Card>
      </TestWrapper>
    );
    
    const card = screen.getByText('Filled card').closest('div');
    expect(card).toHaveStyle('background: #eff6ff');
  });

  test('applies custom className', () => {
    render(
      <TestWrapper>
        <Card className="custom-class">
          <p>Custom card</p>
        </Card>
      </TestWrapper>
    );
    
    const card = screen.getByText('Custom card').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  test('renders without header when no title or subtitle', () => {
    render(
      <TestWrapper>
        <Card>
          <p>Simple card</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Simple card')).toBeInTheDocument();
    // Should not have header section
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('handles empty children gracefully', () => {
    render(
      <TestWrapper>
        <Card title="Empty Card" />
      </TestWrapper>
    );
    
    expect(screen.getByText('Empty Card')).toBeInTheDocument();
  });
});
