import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { FunnelWizard } from '../../components/FunnelWizard';

describe('FunnelWizard Component', () => {
  const mockOnBack = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders initial step with basic info form', () => {
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    expect(screen.getByText('Create New Funnel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Trading Mastery Program')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('trading-mastery')).toBeInTheDocument();
  });

  test('validates required fields in step 1', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    // Fill in funnel name
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Test Funnel');
    expect(nextButton).toBeDisabled();

    // Fill in URL
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'test-funnel');
    expect(nextButton).not.toBeDisabled();
  });

  test('auto-formats URL input', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    const urlInput = screen.getByPlaceholderText('trading-mastery');
    await user.type(urlInput, 'Test Funnel With Spaces!@#');
    
    expect(urlInput).toHaveValue('testfunnelwithspaces');
  });

  test('navigates to step 2 when next is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    // Fill required fields
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Test Funnel');
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'test-funnel');
    
    // Click next
    await user.click(screen.getByText('Next'));
    
    expect(screen.getByText('Configure Your Funnel Tiers')).toBeInTheDocument();
  });

  test('shows review screen in step 3', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    // Navigate through steps
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Test Funnel');
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'test-funnel');
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));

    expect(screen.getByText('Review Your Funnel')).toBeInTheDocument();
    expect(screen.getByText('Test Funnel')).toBeInTheDocument();
    expect(screen.getByText('whop.com/test-funnel')).toBeInTheDocument();
  });

  test('calls onSave with correct data when create button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    // Navigate through all steps
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Test Funnel');
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'test-funnel');
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Create Funnel'));

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'Test Funnel',
      url: 'whop.com/test-funnel',
      tiers: expect.arrayContaining([
        expect.objectContaining({
          id: 'tier_1',
          name: 'Free Tier',
          price: 0
        })
      ]),
      status: 'draft'
    });
  });

  test('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FunnelWizard onBack={mockOnBack} onSave={mockOnSave} />
    );

    await user.click(screen.getByText('← Back'));
    expect(mockOnBack).toHaveBeenCalled();
  });
});