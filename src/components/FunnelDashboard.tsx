import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface FunnelDashboardProps {
  onCreateFunnel: () => void;
}

export const FunnelDashboard: React.FC<FunnelDashboardProps> = ({ onCreateFunnel }) => {
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
};