import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { GrowthInsight } from '../types/analytics';

interface GrowthInsightsPanelProps {
  insights: GrowthInsight[];
  className?: string;
}

export const GrowthInsightsPanel: React.FC<GrowthInsightsPanelProps> = ({ 
  insights, 
  className = '' 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInsightIcon = (type: GrowthInsight['type']) => {
    switch (type) {
      case 'opportunity': return '🚀';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return '💡';
    }
  };

  const getInsightBorderColor = (type: GrowthInsight['type']) => {
    switch (type) {
      case 'opportunity': return 'border-l-blue-500';
      case 'warning': return 'border-l-yellow-500';
      case 'success': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const priorityInsights = insights
    .filter(insight => insight.impact === 'high' && insight.actionable)
    .slice(0, 3);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-whop-text">Growth Opportunities</h3>
        <span className="text-sm text-whop-text-muted">{priorityInsights.length} high-impact insights</span>
      </div>

      <div className="space-y-4">
        {priorityInsights.map((insight) => (
          <div 
            key={insight.id} 
            className={`border-l-4 ${getInsightBorderColor(insight.type)} pl-4 py-2`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <span className="text-lg">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-whop-text text-sm">{insight.title}</h4>
                  <p className="text-whop-text-muted text-xs mt-1 line-clamp-2">{insight.description}</p>
                  
                  {insight.estimatedImpact && (
                    <div className="flex space-x-4 mt-2 text-xs">
                      <span className="text-green-400">
                        +{formatCurrency(insight.estimatedImpact.revenue)} revenue
                      </span>
                      <span className="text-whop-blue">
                        +{insight.estimatedImpact.users} users
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {priorityInsights.length === 0 && (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🎯</div>
          <div className="text-whop-text-muted text-sm">No high-priority insights available</div>
        </div>
      )}
    </Card>
  );
};