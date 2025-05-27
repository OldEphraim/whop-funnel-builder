import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FunnelTable } from './FunnelTable';
import { GrowthInsightsPanel } from './GrowthInsightsPanel';
import { FunnelPerformanceCard } from './FunnelPerformanceCard';
import { Funnel } from '../types/funnel';
import { FunnelAnalytics } from '../types/analytics';

interface FunnelDashboardProps {
  funnels: Funnel[];
  analytics: FunnelAnalytics[];
  onCreateFunnel: () => void;
  onEditFunnel: (funnelId: string) => void;
  onDeleteFunnel: (funnelId: string) => void;
  onViewAnalytics: (funnelId: string) => void;
}

export const FunnelDashboard: React.FC<FunnelDashboardProps> = ({ 
  funnels,
  analytics,
  onCreateFunnel,
  onEditFunnel,
  onDeleteFunnel,
  onViewAnalytics
}) => {
  if (funnels.length === 0) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2 text-whop-text">No funnels yet</h3>
            <p className="text-whop-text-muted mb-6">
              Create your first multi-tier funnel to start converting customers through progressive offers.
            </p>
            <Button onClick={onCreateFunnel}>
              Create Your First Funnel
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Get all insights for the insights panel - add null safety
  const allInsights = (analytics || []).flatMap(a => a?.insights || []);

  return (
    <div className="p-6 space-y-6">
      {/* Growth Insights Panel */}
      <GrowthInsightsPanel insights={allInsights} />

      {/* Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(analytics || []).map((analyticsData) => (
          <FunnelPerformanceCard
            key={analyticsData.funnelId}
            analytics={analyticsData}
            onViewAnalytics={onViewAnalytics}
          />
        ))}
      </div>

      {/* Detailed Funnel Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-whop-border">
          <h3 className="font-semibold text-whop-text">All Funnels</h3>
        </div>
        <FunnelTable 
          funnels={funnels}
          onEditFunnel={onEditFunnel}
          onDeleteFunnel={onDeleteFunnel}
        />
      </Card>
    </div>
  );
};