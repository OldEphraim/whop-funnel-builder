import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock window.confirm
const mockConfirm = vi.fn();
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: mockConfirm
});

describe('App Integration Tests - Phase 3 Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  test('renders enhanced dashboard with growth insights panel', () => {
    render(<App />);
    
    expect(screen.getByText('Growth Opportunities')).toBeInTheDocument();
    expect(screen.getByText(/\d+ high-impact insights/)).toBeInTheDocument();
});

  test('displays funnel performance cards', () => {
    render(<App />);
    
    expect(screen.getByRole('heading', { name: 'Trading Mastery Program' })).toBeInTheDocument();
    expect(screen.getByText('1,247 total users')).toBeInTheDocument();
    expect(screen.getAllByText('View Analytics →')[0]).toBeInTheDocument();
  });

  test('navigates to analytics dashboard when View Analytics is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getAllByText('View Analytics →')[0]);
    
    // Fix: Be more specific about which heading we're looking for
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Trading Mastery Program Analytics');
    expect(screen.getByText('Growth insights and performance metrics')).toBeInTheDocument();
  });

  test('analytics dashboard shows all tabs and navigation works', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to analytics
    await user.click(screen.getAllByText('View Analytics →')[0]);
    
    // Test tab navigation
    await user.click(screen.getByText('Funnel Flow'));
    expect(screen.getByText('Conversion Funnel')).toBeInTheDocument();
    
    await user.click(screen.getByText('Revenue'));
    expect(screen.getByText('Revenue Breakdown')).toBeInTheDocument();
    
    await user.click(screen.getByText('Insights'));
    expect(screen.getByText('High Free-to-Paid Conversion Rate')).toBeInTheDocument();
    
    await user.click(screen.getByText('A/B Tests'));
    expect(screen.getByText('Tier Pricing Optimization')).toBeInTheDocument();
  });

  test('back navigation from analytics works correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to analytics
    await user.click(screen.getAllByText('View Analytics →')[0]);
    // Fix: Be more specific about which heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Trading Mastery Program Analytics');
    
    // Navigate back
    await user.click(screen.getByText('← Back to Funnels'));
    
    // Should be back to main dashboard
    expect(screen.getByText('Growth Opportunities')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trading Mastery Program' })).toBeInTheDocument();
});

  test('funnel performance card displays correct metrics', () => {
    render(<App />);
    
    // Check conversion rate
    expect(screen.getByText('23.6%')).toBeInTheDocument();
    
    // Check total revenue
    expect(screen.getByText('$28,137')).toBeInTheDocument();
    
    // Check insights count (should match high-impact insights from mock data)
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 high-impact insights
  });

  test('growth insights panel shows actionable insights', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to analytics first
    await user.click(screen.getAllByText('View Analytics →')[0]);
  
    // Click on the Insights tab
    await user.click(screen.getByText('Insights'));
    
    expect(screen.getByText('High Free-to-Paid Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('Premium to VIP Conversion Bottleneck')).toBeInTheDocument();
    
    // Fix: Check estimated impact display - handle multiple elements
    expect(screen.getAllByText('Revenue Impact:')).toHaveLength(2); // 2 insights have revenue impact
    expect(screen.getByText('+$4,200')).toBeInTheDocument();
    expect(screen.getAllByText('User Impact:')).toHaveLength(2); // 2 insights have user impact  
    expect(screen.getByText('+150')).toBeInTheDocument();
  });

  test('creating new funnel also creates analytics data', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Create new funnel
    await user.click(screen.getByText('New Funnel'));
    await user.type(screen.getByPlaceholderText('e.g., Trading Mastery Program'), 'Test Analytics Funnel');
    await user.type(screen.getByPlaceholderText('trading-mastery'), 'test-analytics');
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByRole('button', { name: 'Create Funnel' }));
    
    // Should return to dashboard and show new funnel
    await waitFor(() => {
        expect(screen.getAllByText('Test Analytics Funnel')).toHaveLength(2);
      });      
    
    // New funnel should have analytics available (even if empty)
    const viewAnalyticsButtons = screen.getAllByText('View Analytics →');
    expect(viewAnalyticsButtons.length).toBeGreaterThan(1);
  });

  test('header title updates correctly when navigating to analytics', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Initial title
    expect(screen.getByRole('heading', { name: 'Funnels' })).toBeInTheDocument();
    
    // Navigate to analytics
    await user.click(screen.getAllByText('View Analytics →')[0]);
    
    // Fix: Should show analytics title - be more specific
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Trading Mastery Program Analytics');
  });
});