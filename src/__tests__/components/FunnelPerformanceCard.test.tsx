import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FunnelPerformanceCard } from '../../components/FunnelPerformanceCard';
import { mockFunnelAnalytics } from '../../data/mockAnalytics';

describe('FunnelPerformanceCard Component', () => {
  const mockOnViewAnalytics = vi.fn();
  const analytics = mockFunnelAnalytics[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders funnel performance information', () => {
    render(
      <FunnelPerformanceCard
        analytics={analytics}
        onViewAnalytics={mockOnViewAnalytics}
      />
    );

    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
    expect(screen.getByText('1,247 total users')).toBeInTheDocument();
    expect(screen.getByText('23.6%')).toBeInTheDocument(); // conversion rate
    expect(screen.getByText('$28,137')).toBeInTheDocument(); // total revenue
  });

  test('displays high impact insights count', () => {
    render(
      <FunnelPerformanceCard
        analytics={analytics}
        onViewAnalytics={mockOnViewAnalytics}
      />
    );

    // Count high impact insights from mock data
    const highImpactCount = analytics.insights.filter(i => i.impact === 'high').length;
    expect(screen.getByText(highImpactCount.toString())).toBeInTheDocument();
  });

  test('renders mini funnel visualization', () => {
    render(
      <FunnelPerformanceCard
        analytics={analytics}
        onViewAnalytics={mockOnViewAnalytics}
      />
    );

    // Check if tier names are displayed
    expect(screen.getByText('Free Community')).toBeInTheDocument();
    expect(screen.getByText('Premium Signals')).toBeInTheDocument();
    expect(screen.getByText('VIP Mentorship')).toBeInTheDocument();
});

  test('calls onViewAnalytics when View Analytics button is clicked', () => {
    render(
      <FunnelPerformanceCard
        analytics={analytics}
        onViewAnalytics={mockOnViewAnalytics}
      />
    );

    fireEvent.click(screen.getByText('View Analytics →'));
    expect(mockOnViewAnalytics).toHaveBeenCalledWith(analytics.funnelId);
  });
});