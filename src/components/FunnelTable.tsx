import React from 'react';
import { Funnel } from '../types/funnel';

interface FunnelTableProps {
  funnels: Funnel[];
  onEditFunnel: (funnelId: string) => void;
  onDeleteFunnel: (funnelId: string) => void;
}

export const FunnelTable: React.FC<FunnelTableProps> = ({ 
  funnels, 
  onEditFunnel, 
  onDeleteFunnel 
}) => {
  const getStatusBadge = (status: Funnel['status']) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      paused: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (funnels.length === 0) {
    return null; // This will show the empty state instead
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-whop-border">
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Name</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Created</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Status</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Tiers</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Revenue</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Users</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Conversion</th>
            <th className="text-left py-3 px-4 text-whop-text-muted font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {funnels.map((funnel) => (
            <tr 
              key={funnel.id} 
              className="border-b border-whop-border hover:bg-whop-gray-light transition-colors"
            >
              <td className="py-4 px-4">
                <div>
                  <div className="text-whop-text font-medium">{funnel.name}</div>
                  <div className="text-whop-text-muted text-sm">{funnel.url}</div>
                </div>
              </td>
              <td className="py-4 px-4 text-whop-text text-sm">
                {formatDate(funnel.createdAt)}
              </td>
              <td className="py-4 px-4">
                {getStatusBadge(funnel.status)}
              </td>
              <td className="py-4 px-4 text-whop-text text-sm">
                {funnel.tiers.length} tiers
              </td>
              <td className="py-4 px-4 text-whop-text text-sm">
                {formatCurrency(funnel.totalRevenue)}
              </td>
              <td className="py-4 px-4 text-whop-text text-sm">
                {funnel.activeUsers}
              </td>
              <td className="py-4 px-4 text-whop-text text-sm">
                {funnel.conversionRate}%
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditFunnel(funnel.id)}
                    className="text-whop-blue hover:text-whop-blue-hover text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteFunnel(funnel.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};