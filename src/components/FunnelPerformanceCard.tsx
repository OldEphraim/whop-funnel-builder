import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FunnelAnalytics } from '../types/analytics';

interface FunnelPerformanceCardProps {
  analytics: FunnelAnalytics;
  onViewAnalytics: (funnelId: string) => void;
}

export const FunnelPerformanceCard: React.FC<FunnelPerformanceCardProps> = ({
  analytics,
  onViewAnalytics
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const mainConversionRate = analytics.conversionFlow[0]?.conversionRate || 0;
  const totalRevenue = analytics.revenueBreakdown.totalRevenue;
  const highImpactInsights = analytics.insights.filter(i => i.impact === 'high').length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-whop-text">{analytics.funnelName}</h3>
          <p className="text-whop-text-muted text-sm">{analytics.totalUsers.toLocaleString()} total users</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onViewAnalytics(analytics.funnelId)}>
          View Analytics →
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-whop-blue">{formatPercentage(mainConversionRate)}</div>
          <div className="text-xs text-whop-text-muted">Conversion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-whop-text">{formatCurrency(totalRevenue)}</div>
          <div className="text-xs text-whop-text-muted">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-whop-text">{highImpactInsights}</div>
          <div className="text-xs text-whop-text-muted">High Impact Insights</div>
        </div>
      </div>

      {/* Mini Funnel Visualization */}
      <div className="space-y-2">
        {analytics.tierMetrics.slice(0, 3).map((tier, index) => {
          const width = (tier.totalUsers / analytics.tierMetrics[0].totalUsers) * 100;
          return (
            <div key={tier.tierId} className="flex items-center space-x-2">
              <div className="w-16 text-xs text-whop-text-muted truncate">{tier.tierName}</div>
              <div className="flex-1 bg-whop-gray h-2 rounded">
                <div 
                  className="bg-whop-blue h-2 rounded transition-all duration-300"
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="w-12 text-xs text-whop-text-muted text-right">{tier.totalUsers}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};