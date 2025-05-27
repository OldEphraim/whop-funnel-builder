import { describe, test, expect } from 'vitest';
import { mockFunnelAnalytics } from '../../data/mockData';
import { FunnelAnalytics } from '../../types/analytics';

describe('Mock Analytics Data', () => {
  test('should have valid funnel analytics structure', () => {
    expect(mockFunnelAnalytics).toHaveLength(2);
    
    mockFunnelAnalytics.forEach((analytics: FunnelAnalytics) => {
      expect(analytics).toHaveProperty('funnelId');
      expect(analytics).toHaveProperty('funnelName');
      expect(analytics).toHaveProperty('totalUsers');
      expect(analytics).toHaveProperty('tierMetrics');
      expect(analytics).toHaveProperty('conversionFlow');
      expect(analytics).toHaveProperty('revenueBreakdown');
      expect(analytics).toHaveProperty('insights');
      
      expect(analytics.tierMetrics).toBeInstanceOf(Array);
      expect(analytics.tierMetrics.length).toBeGreaterThan(0);
      expect(analytics.insights).toBeInstanceOf(Array);
    });
  });

  test('should have valid tier metrics', () => {
    const analytics = mockFunnelAnalytics[0];
    
    analytics.tierMetrics.forEach((tier) => {
      expect(tier).toHaveProperty('tierId');
      expect(tier).toHaveProperty('tierName');
      expect(tier).toHaveProperty('tierPrice');
      expect(tier).toHaveProperty('totalUsers');
      expect(tier).toHaveProperty('conversionRateFromPrevious');
      expect(tier).toHaveProperty('revenue');
      
      expect(typeof tier.tierPrice).toBe('number');
      expect(typeof tier.totalUsers).toBe('number');
      expect(typeof tier.conversionRateFromPrevious).toBe('number');
      expect(typeof tier.revenue).toBe('number');
    });
  });

  test('should have valid conversion flow data', () => {
    const analytics = mockFunnelAnalytics[0];
    
    analytics.conversionFlow.forEach((flow) => {
      expect(flow).toHaveProperty('fromTier');
      expect(flow).toHaveProperty('toTier');
      expect(flow).toHaveProperty('conversionRate');
      expect(flow).toHaveProperty('users');
      expect(flow).toHaveProperty('averageTimeToConvert');
      
      expect(typeof flow.conversionRate).toBe('number');
      expect(typeof flow.users).toBe('number');
      expect(flow.conversionRate).toBeGreaterThanOrEqual(0);
      expect(flow.conversionRate).toBeLessThanOrEqual(100);
    });
  });

  test('should have valid revenue breakdown', () => {
    const analytics = mockFunnelAnalytics[0];
    const revenue = analytics.revenueBreakdown;
    
    expect(revenue).toHaveProperty('totalRevenue');
    expect(revenue).toHaveProperty('revenueByTier');
    expect(revenue).toHaveProperty('monthlyRecurringRevenue');
    expect(revenue).toHaveProperty('averageRevenuePerUser');
    expect(revenue).toHaveProperty('customerLifetimeValue');
    
    expect(typeof revenue.totalRevenue).toBe('number');
    expect(revenue.revenueByTier).toBeInstanceOf(Array);
    
    // Check that tier percentages add up to 100 (approximately)
    const totalPercentage = revenue.revenueByTier.reduce((sum, tier) => sum + tier.percentage, 0);
    expect(totalPercentage).toBeCloseTo(100, 1);
  });

  test('should have valid growth insights', () => {
    const analytics = mockFunnelAnalytics[0];
    
    analytics.insights.forEach((insight) => {
      expect(insight).toHaveProperty('id');
      expect(insight).toHaveProperty('type');
      expect(insight).toHaveProperty('title');
      expect(insight).toHaveProperty('description');
      expect(insight).toHaveProperty('impact');
      expect(insight).toHaveProperty('actionable');
      
      expect(['opportunity', 'warning', 'success']).toContain(insight.type);
      expect(['high', 'medium', 'low']).toContain(insight.impact);
      expect(typeof insight.actionable).toBe('boolean');
    });
  });
});