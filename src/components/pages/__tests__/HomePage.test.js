import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { HomePage } from '../pages/HomePage';

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

describe('HomePage Component', () => {
  test('renders homepage with main heading', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('Frontend Development Showcase')).toBeInTheDocument();
  });

  test('renders hero section with description', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText(/A comprehensive React project demonstrating/)).toBeInTheDocument();
  });

  test('renders CTA buttons', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByRole('button', { name: /explore dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view documentation/i })).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Modern React Development')).toBeInTheDocument();
    expect(screen.getByText('Design System')).toBeInTheDocument();
    expect(screen.getByText('Performance Optimized')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
  });

  test('renders stats section', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('Project Metrics')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Coverage')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Test Coverage')).toBeInTheDocument();
  });

  test('handles button clicks', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    const exploreButton = screen.getByRole('button', { name: /explore dashboard/i });
    fireEvent.click(exploreButton);
    // In a real app, this would navigate to dashboard
  });

  test('renders all feature cards with descriptions', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    const features = [
      'Modern React Development',
      'Design System',
      'Performance Optimized',
      'Quality Assurance'
    ];
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('renders all project metrics', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    const metrics = [
      '100%',
      '95%',
      'A+',
      '98'
    ];
    
    metrics.forEach(metric => {
      expect(screen.getByText(metric)).toBeInTheDocument();
    });
  });

  test('has proper accessibility structure', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  test('renders without errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
