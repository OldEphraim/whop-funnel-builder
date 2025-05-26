import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FunnelDashboard } from './components/FunnelDashboard';
import { FunnelWizard } from './components/FunnelWizard';
import { Button } from './components/ui/Button';
import { mockFunnels } from './data/mockFunnels';
import { Funnel } from './types/funnel';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('funnels');
  const [currentView, setCurrentView] = useState('dashboard');
  const [funnels, setFunnels] = useState<Funnel[]>(mockFunnels);
  const [editingFunnelId, setEditingFunnelId] = useState<string | null>(null);

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'funnels') {
      setCurrentView('dashboard');
      setEditingFunnelId(null);
    } else {
      // Reset to a generic view for non-funnel items
      setCurrentView('other');
      setEditingFunnelId(null);
    }
  };  

  const handleCreateFunnel = () => {
    setCurrentView('create');
    setEditingFunnelId(null);
  };

  const handleEditFunnel = (funnelId: string) => {
    setEditingFunnelId(funnelId);
    setCurrentView('create');
  };

  const handleDeleteFunnel = (funnelId: string) => {
    if (confirm('Are you sure you want to delete this funnel?')) {
      setFunnels(funnels.filter(f => f.id !== funnelId));
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
    }
    setCurrentView('dashboard');
    setEditingFunnelId(null);
  };

  const getEditingFunnel = () => {
    return editingFunnelId ? funnels.find(f => f.id === editingFunnelId) : undefined;
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
            onCreateFunnel={handleCreateFunnel}
            onEditFunnel={handleEditFunnel}
            onDeleteFunnel={handleDeleteFunnel}
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
      default:
        return <div className="p-6 text-whop-text-muted">Feature coming soon...</div>;
    }
  };  

  const getHeaderTitle = () => {
    if (activeItem === 'funnels') {
      if (currentView === 'create') {
        return editingFunnelId ? 'Edit Funnel' : 'Create Funnel';
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