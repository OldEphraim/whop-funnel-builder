import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';
import { mockFunnelAnalytics } from '../../data/mockAnalytics';

describe('AnalyticsDashboard Component', () => {
  const mockOnBack = vi.fn();
  const analytics = mockFunnelAnalytics[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders analytics dashboard with correct title', () => {
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText(`${analytics.funnelName} Analytics`)).toBeInTheDocument();
    expect(screen.getByText('Growth insights and performance metrics')).toBeInTheDocument();
  });

  test('renders all navigation tabs', () => {
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Funnel Flow')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('A/B Tests')).toBeInTheDocument();
  });

  test('displays overview tab by default with key metrics', () => {
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    // Check key metrics cards
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
    expect(screen.getByText('$28,137')).toBeInTheDocument();
  });

  test('switches to funnel flow tab when clicked', async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    await user.click(screen.getByText('Funnel Flow'));
    
    expect(screen.getByText('Conversion Funnel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Free Community' })).toBeInTheDocument();
    expect(screen.getAllByText('Premium Signals')).toHaveLength(2);
    expect(screen.getAllByText('VIP Mentorship')).toHaveLength(2);
});

  test('switches to revenue tab when clicked', async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    await user.click(screen.getByText('Revenue'));
    
    expect(screen.getByText('Revenue Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Monthly Metrics')).toBeInTheDocument();
    expect(screen.getByText('Growth Projections')).toBeInTheDocument();
  });

  test('switches to insights tab and displays growth insights', async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    await user.click(screen.getByText('Insights'));
    
    // Check that insights are displayed
    expect(screen.getByText('High Free-to-Paid Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('Premium to VIP Conversion Bottleneck')).toBeInTheDocument();
    expect(screen.getByText('Excellent VIP Retention')).toBeInTheDocument();
  });

  test('switches to A/B tests tab when clicked', async () => {
    const user = userEvent.setup();
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    await user.click(screen.getByText('A/B Tests'));
    
    expect(screen.getByText('Tier Pricing Optimization')).toBeInTheDocument();
    expect(screen.getByText('RUNNING')).toBeInTheDocument();
    expect(screen.getByText('85.3% Confidence')).toBeInTheDocument();
  });

  test('calls onBack when back button is clicked', () => {
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    fireEvent.click(screen.getByText('← Back to Funnels'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  test('displays correct formatting for currency and percentages', () => {
    render(
      <AnalyticsDashboard
        funnelId={analytics.funnelId}
        analytics={analytics}
        onBack={mockOnBack}
      />
    );

    // Check currency formatting
    expect(screen.getByText('$28,137')).toBeInTheDocument();
    expect(screen.getByText('$23')).toBeInTheDocument(); // ARPU
    expect(screen.getByText('$235')).toBeInTheDocument(); // LTV

    // Check percentage formatting
    expect(screen.getByText('23.6%')).toBeInTheDocument(); // conversion rate
  });
});