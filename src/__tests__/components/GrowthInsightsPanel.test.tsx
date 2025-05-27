import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GrowthInsightsPanel } from '../../components/GrowthInsightsPanel';
import { GrowthInsight } from '../../types/analytics';

describe('GrowthInsightsPanel Component', () => {
  const mockInsights: GrowthInsight[] = [
    {
      id: 'insight_1',
      type: 'opportunity',
      title: 'Test Opportunity',
      description: 'This is a test opportunity insight',
      impact: 'high',
      actionable: true,
      recommendation: 'Do something about this',
      estimatedImpact: {
        revenue: 5000,
        users: 100,
        conversionRate: 2.5
      }
    },
    {
      id: 'insight_2',
      type: 'warning',
      title: 'Test Warning',
      description: 'This is a test warning insight',
      impact: 'medium',
      actionable: false
    },
    {
      id: 'insight_3',
      type: 'success',
      title: 'Test Success',
      description: 'This is a test success insight',
      impact: 'high',
      actionable: true,
      estimatedImpact: {
        revenue: 3000,
        users: 75,
        conversionRate: 1.8
      }
    }
  ];

  test('renders insights panel with title', () => {
    render(<GrowthInsightsPanel insights={mockInsights} />);
    
    expect(screen.getByText('Growth Opportunities')).toBeInTheDocument();
    expect(screen.getByText('2 high-impact insights')).toBeInTheDocument();
  });

  test('displays high-impact actionable insights only', () => {
    render(<GrowthInsightsPanel insights={mockInsights} />);
    
    // Should show high-impact, actionable insights
    expect(screen.getByText('Test Opportunity')).toBeInTheDocument();
    expect(screen.getByText('Test Success')).toBeInTheDocument();
    
    // Should not show medium impact or non-actionable insights
    expect(screen.queryByText('Test Warning')).not.toBeInTheDocument();
  });

  test('displays estimated impact when available', () => {
    render(<GrowthInsightsPanel insights={mockInsights} />);
    
    expect(screen.getByText('+$5,000 revenue')).toBeInTheDocument();
    expect(screen.getByText('+100 users')).toBeInTheDocument();
    expect(screen.getByText('+$3,000 revenue')).toBeInTheDocument();
    expect(screen.getByText('+75 users')).toBeInTheDocument();
  });

  test('shows empty state when no high-impact insights', () => {
    const lowImpactInsights: GrowthInsight[] = [
      {
        id: 'low_1',
        type: 'opportunity',
        title: 'Low Impact',
        description: 'Low impact insight',
        impact: 'low',
        actionable: true
      }
    ];
    
    render(<GrowthInsightsPanel insights={lowImpactInsights} />);
    
    expect(screen.getByText('No high-priority insights available')).toBeInTheDocument();
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  test('displays correct insight icons', () => {
    render(<GrowthInsightsPanel insights={mockInsights} />);
    
    expect(screen.getByText('🚀')).toBeInTheDocument(); // opportunity
    expect(screen.getByText('✅')).toBeInTheDocument(); // success
  });
});
