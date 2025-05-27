import React from 'react';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingCard: React.FC = () => (
  <Card className="p-6">
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <div className="text-whop-text-muted">Loading analytics...</div>
      </div>
    </div>
  </Card>
);