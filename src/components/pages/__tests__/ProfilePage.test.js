import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ProfilePage } from '../ProfilePage';

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

describe('ProfilePage Component', () => {
  test('renders profile page with title', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText(/Manage your personal information/)).toBeInTheDocument();
  });

  test('renders user information', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
  });

  test('renders profile stats', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('Commits')).toBeInTheDocument();
  });

  test('enables edit mode when edit button is clicked', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Check if inputs are enabled
    const firstNameInput = screen.getByDisplayValue('John');
    expect(firstNameInput).not.toBeDisabled();
  });

  test('shows save and cancel buttons in edit mode', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('updates form values when typing', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const firstNameInput = screen.getByDisplayValue('John');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    
    expect(firstNameInput).toHaveValue('Jane');
  });

  test('cancels edit mode and resets values', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const firstNameInput = screen.getByDisplayValue('John');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    // Check if input is disabled again
    expect(firstNameInput).toBeDisabled();
    // Check if value is reset
    expect(firstNameInput).toHaveValue('John');
  });

  test('saves changes when save button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const saveButton = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(saveButton);
    
    // Check if console.log was called (simulating API call)
    expect(consoleSpy).toHaveBeenCalledWith('Profile saved:', expect.any(Object));
    
    consoleSpy.mockRestore();
  });

  test('renders all form fields', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('name', 'firstName');
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('renders without errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>
    );
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
