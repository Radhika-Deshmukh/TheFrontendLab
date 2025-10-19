import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from '../Button';

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

describe('Button Component', () => {
  test('renders button with text', () => {
    render(
      <TestWrapper>
        <Button>Click me</Button>
      </TestWrapper>
    );
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <Button onClick={handleClick}>Click me</Button>
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies primary variant styles', () => {
    render(
      <TestWrapper>
        <Button variant="primary">Primary Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background: linear-gradient(135deg, #3b82f6, #2563eb)');
  });

  test('applies secondary variant styles', () => {
    render(
      <TestWrapper>
        <Button variant="secondary">Secondary Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background: #f4f4f5');
  });

  test('applies large size styles', () => {
    render(
      <TestWrapper>
        <Button size="large">Large Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('padding: 1rem 1.5rem');
  });

  test('disables button when disabled prop is true', () => {
    render(
      <TestWrapper>
        <Button disabled>Disabled Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('shows loading state', () => {
    render(
      <TestWrapper>
        <Button loading>Loading Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('⟳')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(
      <TestWrapper>
        <Button>
          <span>🔍</span>
          Search
        </Button>
      </TestWrapper>
    );
    
    expect(screen.getByText('🔍')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <Button type="submit">Submit</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('handles keyboard navigation', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <Button onClick={handleClick}>Keyboard Button</Button>
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
