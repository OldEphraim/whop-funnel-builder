import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FunnelAnalytics, GrowthInsight } from '../types/analytics';

interface AnalyticsDashboardProps {
  funnelId: string;
  analytics: FunnelAnalytics;
  onBack: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  funnelId,
  analytics,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnel' | 'revenue' | 'insights' | 'tests'>('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  const getInsightIcon = (type: GrowthInsight['type']) => {
    switch (type) {
      case 'opportunity': return '🚀';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return '💡';
    }
  };

  const getInsightColor = (type: GrowthInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'border-blue-500 bg-blue-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'success': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  // NEW: Handler for New Test button
  const handleNewTest = () => {
    alert('Users will be able to design A/B tests in the full version of this feature.');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-whop-text-muted text-sm">Total Users</div>
          <div className="text-2xl font-bold text-whop-text">{analytics.totalUsers.toLocaleString()}</div>
          <div className="text-green-400 text-sm">+12.3% this month</div>
        </Card>
        
        <Card className="p-4">
          <div className="text-whop-text-muted text-sm">Monthly Revenue</div>
          <div className="text-2xl font-bold text-whop-text">{formatCurrency(analytics.revenueBreakdown.monthlyRecurringRevenue)}</div>
          <div className="text-green-400 text-sm">+18.7% this month</div>
        </Card>
        
        <Card className="p-4">
          <div className="text-whop-text-muted text-sm">Avg Revenue Per User</div>
          <div className="text-2xl font-bold text-whop-text">{formatCurrency(analytics.revenueBreakdown.averageRevenuePerUser)}</div>
          <div className="text-green-400 text-sm">+3.2% this month</div>
        </Card>
        
        <Card className="p-4">
          <div className="text-whop-text-muted text-sm">Customer LTV</div>
          <div className="text-2xl font-bold text-whop-text">{formatCurrency(analytics.revenueBreakdown.customerLifetimeValue)}</div>
          <div className="text-green-400 text-sm">+8.9% this month</div>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-whop-text mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-whop-blue">{formatPercentage(analytics.conversionFlow[0]?.conversionRate || 0)}</div>
            <div className="text-whop-text-muted">Free to Paid Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-whop-blue">{analytics.tierMetrics[2]?.averageTimeInTier || 0}d</div>
            <div className="text-whop-text-muted">Avg. VIP Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-whop-blue">{formatPercentage(analytics.tierMetrics[2]?.revenueGrowth || 0)}</div>
            <div className="text-whop-text-muted">VIP Revenue Growth</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderFunnelFlow = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-whop-text mb-6">Conversion Funnel</h3>
        
        {/* Visual Funnel - FIXED: Reduced bar height */}
        <div className="space-y-6"> {/* Increased spacing */}
          {analytics.tierMetrics.map((tier, index) => {
            const conversionRate = index === 0 ? 100 : analytics.conversionFlow[index - 1]?.conversionRate || 0;
            const barWidth = (tier.totalUsers / analytics.tierMetrics[0].totalUsers) * 100;
            
            return (
              <div key={tier.tierId} className="flex items-center space-x-4">
                <div className="w-32 text-right">
                  <div className="font-medium text-whop-text">{tier.tierName}</div>
                  <div className="text-sm text-whop-text-muted">{formatCurrency(tier.tierPrice)}/mo</div>
                </div>
                
                <div className="flex-1 relative">
                  {/* FIXED: Reduced height from h-12 to h-8 */}
                  <div className="bg-whop-gray h-8 rounded-lg overflow-hidden">
                    <div 
                      className="bg-whop-blue h-full flex items-center px-4 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-white font-medium text-sm">{tier.totalUsers.toLocaleString()} users</span>
                    </div>
                  </div>
                  {index > 0 && (
                    <div className="absolute -top-5 left-0 text-sm text-whop-text-muted">
                      {formatPercentage(conversionRate)} conversion
                    </div>
                  )}
                </div>
                
                <div className="w-24 text-left">
                  <div className="text-whop-text font-medium">{formatCurrency(tier.revenue)}</div>
                  <div className="text-sm text-whop-text-muted">revenue</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tier Details */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
        {analytics.tierMetrics.map((tier) => (
          <Card key={tier.tierId} className="p-4">
            <h4 className="font-semibold text-whop-text mb-3">{tier.tierName}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Users</span>
                <span className="text-whop-text">{tier.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Churn Rate</span>
                <span className="text-whop-text">{formatPercentage(tier.churnRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Avg. Time</span>
                <span className="text-whop-text">{tier.averageTimeInTier}d</span>
              </div>
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Revenue Growth</span>
                <span className="text-green-400">+{formatPercentage(tier.revenueGrowth)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-whop-text mb-4">Revenue Breakdown</h3>
        
        {/* Revenue by Tier */}
        <div className="space-y-3">
          {analytics.revenueBreakdown.revenueByTier.map((tier) => (
            <div key={tier.tierId} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-whop-blue rounded"></div>
                <span className="text-whop-text">{tier.tierName}</span>
              </div>
              <div className="text-right">
                <div className="text-whop-text font-medium">{formatCurrency(tier.revenue)}</div>
                <div className="text-whop-text-muted text-sm">{formatPercentage(tier.percentage, 0)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold text-whop-text mb-3">Monthly Metrics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-whop-text-muted">MRR</span>
              <span className="text-whop-text">{formatCurrency(analytics.revenueBreakdown.monthlyRecurringRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-whop-text-muted">ARPU</span>
              <span className="text-whop-text">{formatCurrency(analytics.revenueBreakdown.averageRevenuePerUser)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-whop-text-muted">LTV</span>
              <span className="text-whop-text">{formatCurrency(analytics.revenueBreakdown.customerLifetimeValue)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold text-whop-text mb-3">Growth Projections</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-whop-text-muted">Est. Next Month</span>
              <span className="text-green-400">{formatCurrency(analytics.revenueBreakdown.monthlyRecurringRevenue * 1.15)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-whop-text-muted">Est. Q2 Total</span>
              <span className="text-green-400">{formatCurrency(analytics.revenueBreakdown.monthlyRecurringRevenue * 3.5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-whop-text-muted">Annual Run Rate</span>
              <span className="text-green-400">{formatCurrency(analytics.revenueBreakdown.monthlyRecurringRevenue * 12)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // UPDATED: Added empty state handling
  const renderInsights = () => {
    // Check if there are no insights
    if (!analytics.insights || analytics.insights.length === 0) {
      return (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-whop-text mb-2">No Insights Available</h3>
          <p className="text-whop-text-muted">
            There are no insights associated with this funnel yet. Insights will appear as your funnel gathers more data and performance patterns emerge.
          </p>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {analytics.insights.map((insight) => (
          <Card key={insight.id} className={`p-6 border-l-4 ${getInsightColor(insight.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                <div>
                  <h4 className="font-semibold text-whop-text mb-2">{insight.title}</h4>
                  <p className="text-whop-text-muted mb-3">{insight.description}</p>
                  
                  {insight.recommendation && (
                    <div className="bg-whop-gray p-3 rounded-lg">
                      <div className="text-sm font-medium text-whop-text mb-1">Recommendation:</div>
                      <div className="text-sm text-whop-text-muted">{insight.recommendation}</div>
                    </div>
                  )}
                  
                  {insight.estimatedImpact && (
                    <div className="mt-3 flex space-x-6 text-sm">
                      <div>
                        <span className="text-whop-text-muted">Revenue Impact: </span>
                        <span className="text-green-400 font-medium">+{formatCurrency(insight.estimatedImpact.revenue)}</span>
                      </div>
                      <div>
                        <span className="text-whop-text-muted">User Impact: </span>
                        <span className="text-whop-blue font-medium">+{insight.estimatedImpact.users}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact.toUpperCase()} IMPACT
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderABTests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-whop-text">A/B Tests</h3>
        {/* UPDATED: Added onClick handler */}
        <Button variant="secondary" onClick={handleNewTest}>New Test</Button>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-whop-text">Tier Pricing Optimization</h4>
            <p className="text-whop-text-muted text-sm">Testing mid-tier addition impact</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">RUNNING</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-whop-border rounded-lg p-4">
            <h5 className="font-medium text-whop-text mb-2">Control: Current Pricing</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Conversion Rate</span>
                <span className="text-whop-text">23.6%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Revenue</span>
                <span className="text-whop-text">$14,068</span>
              </div>
            </div>
          </div>
          
          {/* FIXED: Better contrast for winner variant */}
          <div className="border-2 border-green-500 bg-green-500/10 rounded-lg p-4">
            <h5 className="font-medium text-green-700 mb-2">✅ Winner: Mid-Tier Added</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Conversion Rate</span>
                <span className="text-green-700 font-medium">26.8% (+3.2%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-whop-text-muted">Revenue</span>
                <span className="text-green-700 font-medium">$16,341 (+16.1%)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-whop-text">85.3% Confidence</div>
          <div className="text-whop-text-muted text-sm">Variant A is likely the winner</div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'funnel', label: 'Funnel Flow', icon: '🔄' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'tests', label: 'A/B Tests', icon: '🧪' }
  ];

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-whop-text">{analytics.funnelName} Analytics</h2>
            <p className="text-whop-text-muted">Growth insights and performance metrics</p>
          </div>
          <Button variant="ghost" onClick={onBack}>
            ← Back to Funnels
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-whop-gray p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-whop-blue text-white'
                  : 'text-whop-text-muted hover:text-whop-text hover:bg-whop-gray-light'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'funnel' && renderFunnelFlow()}
          {activeTab === 'revenue' && renderRevenue()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'tests' && renderABTests()}
        </div>
      </Card>
    </div>
  );
};