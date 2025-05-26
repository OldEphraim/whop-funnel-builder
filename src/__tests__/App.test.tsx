import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock window.confirm
const mockConfirm = vi.fn();
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: mockConfirm
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  test('renders main application layout', () => {
    render(<App />);
    
    expect(screen.getByText('Whop')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Funnels' })).toBeInTheDocument();
    expect(screen.getByText('New Funnel')).toBeInTheDocument();
  });

  test('shows mock funnel data on initial load', () => {
    render(<App />);
    
    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
    expect(screen.getByText('Fitness Transformation')).toBeInTheDocument();
  });

  test('navigates to create funnel wizard', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByText('New Funnel'));
    expect(screen.getByText('Create New Funnel')).toBeInTheDocument();
  });

  test('completes full funnel creation flow', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Start creation
    await user.click(screen.getByText('New Funnel'));
    
    // Step 1: Basic info
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Integration Test Funnel');
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'integration-test');
    await user.click(screen.getByText('Next'));
    
    // Step 2: Skip tier configuration for now
    await user.click(screen.getByText('Next'));
    
    // Step 3: Save - use more specific selector
    await user.click(screen.getByRole('button', { name: 'Create Funnel' }));
    
    // Should return to dashboard and show new funnel
    await waitFor(() => {
      expect(screen.getByText('Integration Test Funnel')).toBeInTheDocument();
    });
  });

  test('edits existing funnel', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click edit on first funnel
    const editButtons = screen.getAllByText('Edit');
    await user.click(editButtons[0]);
    
    expect(screen.getByRole('heading', { level: 1, name: 'Edit Funnel' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Trading Mastery Program')).toBeInTheDocument();
  });

  test('deletes funnel with confirmation', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Initially should have 2 funnels
    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
    expect(screen.getByText('Fitness Transformation')).toBeInTheDocument();
    
    // Delete first funnel
    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);
    
    // Check that confirm was called
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this funnel?');
    
    // Funnel should be removed
    await waitFor(() => {
      expect(screen.queryByText('Trading Mastery Program')).not.toBeInTheDocument();
    });
  });

  test('navigation between sidebar items works', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click on different sidebar items
    await user.click(screen.getByText('Home'));
    expect(screen.getByText('Feature coming soon...')).toBeInTheDocument();
    
    // Go back to funnels
    await user.click(screen.getByText('Funnels'));
    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
  });
});