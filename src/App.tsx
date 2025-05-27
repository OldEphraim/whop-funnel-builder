import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FunnelDashboard } from './components/FunnelDashboard';
import { FunnelWizard } from './components/FunnelWizard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Button } from './components/ui/Button';
import { mockFunnels, mockFunnelAnalytics } from './data/mockData';
import { Funnel } from './types/funnel';
import { FunnelAnalytics } from './types/analytics';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('funnels');
  const [currentView, setCurrentView] = useState('dashboard');
  const [funnels, setFunnels] = useState<Funnel[]>(mockFunnels);
  const [analytics, setAnalytics] = useState<FunnelAnalytics[]>(mockFunnelAnalytics);
  const [editingFunnelId, setEditingFunnelId] = useState<string | null>(null);
  const [viewingAnalyticsId, setViewingAnalyticsId] = useState<string | null>(null);

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'funnels') {
      setCurrentView('dashboard');
      setEditingFunnelId(null);
      setViewingAnalyticsId(null);
    } else {
      setCurrentView('other');
      setEditingFunnelId(null);
      setViewingAnalyticsId(null);
    }
  };

  const handleCreateFunnel = () => {
    setCurrentView('create');
    setEditingFunnelId(null);
    setViewingAnalyticsId(null);
  };

  const handleEditFunnel = (funnelId: string) => {
    setEditingFunnelId(funnelId);
    setCurrentView('create');
    setViewingAnalyticsId(null);
  };

  const handleViewAnalytics = (funnelId: string) => {
    setViewingAnalyticsId(funnelId);
    setCurrentView('analytics');
    setEditingFunnelId(null);
  };

  const handleDeleteFunnel = (funnelId: string) => {
    if (confirm('Are you sure you want to delete this funnel?')) {
      setFunnels(funnels.filter(f => f.id !== funnelId));
      // Also remove analytics for this funnel
      setAnalytics(analytics.filter(a => a.funnelId !== funnelId));
    }
  };

  const handleSaveFunnel = (funnelData: any) => {
    if (editingFunnelId) {
      // Edit existing funnel
      setFunnels(funnels.map(f => 
        f.id === editingFunnelId 
          ? { ...f, ...funnelData, id: editingFunnelId }
          : f
      ));
    } else {
      // Create new funnel
      const newFunnel: Funnel = {
        id: `funnel_${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        totalRevenue: 0,
        activeUsers: 0,
        conversionRate: 0,
        ...funnelData
      };
      setFunnels([...funnels, newFunnel]);
      
      // Create mock analytics for new funnel
      const newAnalytics: FunnelAnalytics = {
        funnelId: newFunnel.id,
        funnelName: newFunnel.name,
        totalUsers: 0,
        tierMetrics: newFunnel.tiers.map((tier, index) => ({
          tierId: tier.id,
          tierName: tier.name,
          tierPrice: tier.price,
          totalUsers: 0,
          newUsersThisMonth: 0,
          churnRate: 0,
          conversionRateFromPrevious: index === 0 ? 100 : 0,
          averageTimeInTier: 0,
          revenue: 0,
          revenueGrowth: 0
        })),
        conversionFlow: [],
        revenueBreakdown: {
          totalRevenue: 0,
          revenueByTier: [],
          monthlyRecurringRevenue: 0,
          averageRevenuePerUser: 0,
          customerLifetimeValue: 0
        },
        timeSeriesData: [],
        insights: []
      };
      setAnalytics([...analytics, newAnalytics]);
    }
    setCurrentView('dashboard');
    setEditingFunnelId(null);
  };

  const getEditingFunnel = () => {
    return editingFunnelId ? funnels.find(f => f.id === editingFunnelId) : undefined;
  };

  const getAnalyticsData = () => {
    return viewingAnalyticsId ? analytics.find(a => a.funnelId === viewingAnalyticsId) : undefined;
  };

  const renderContent = () => {
    if (activeItem !== 'funnels') {
      return (
        <div className="p-6 text-whop-text-muted">
          <div className="text-center py-12">
            <h3 className="text-lg mb-4">Feature coming soon...</h3>
            <p className="text-whop-text-muted">
              This section is under development.
            </p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <FunnelDashboard
            funnels={funnels}
            analytics={analytics}
            onCreateFunnel={handleCreateFunnel}
            onEditFunnel={handleEditFunnel}
            onDeleteFunnel={handleDeleteFunnel}
            onViewAnalytics={handleViewAnalytics}
          />
        );
      case 'create':
        return (
          <FunnelWizard
            onBack={() => setCurrentView('dashboard')}
            onSave={handleSaveFunnel}
            isEditing={!!editingFunnelId}
            editingFunnel={getEditingFunnel()}
          />
        );
      case 'analytics':
        const analyticsData = getAnalyticsData();
        if (!analyticsData) {
          return (
            <div className="p-6 text-whop-text-muted">
              Analytics data not found.
            </div>
          );
        }
        return (
          <AnalyticsDashboard
            funnelId={analyticsData.funnelId}
            analytics={analyticsData}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <div className="p-6 text-whop-text-muted">Feature coming soon...</div>;
    }
  };

  const getHeaderTitle = () => {
    if (activeItem === 'funnels') {
      if (currentView === 'create') {
        return editingFunnelId ? 'Edit Funnel' : 'Create Funnel';
      } else if (currentView === 'analytics') {
        const analyticsData = getAnalyticsData();
        return `${analyticsData?.funnelName || 'Funnel'} Analytics`;
      }
      return 'Funnels';
    }
    return 'Dashboard';
  };

  const getHeaderActions = () => {
    if (activeItem === 'funnels' && currentView === 'dashboard') {
      return (
        <Button onClick={handleCreateFunnel}>
          New Funnel
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-whop-dark">
      <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
      <div className="flex-1 flex flex-col">
        <Header 
          title={getHeaderTitle()}
          rightContent={getHeaderActions()}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;