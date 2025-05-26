import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FunnelDashboard } from './components/FunnelDashboard';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';

const CreateFunnel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-whop-text">Create New Funnel</h2>
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>
        <div className="text-whop-text-muted">
          Funnel builder interface coming in Phase 2...
        </div>
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState('funnels');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'funnels') {
      setCurrentView('dashboard');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <FunnelDashboard onCreateFunnel={() => setCurrentView('create')} />;
      case 'create':
        return <CreateFunnel onBack={() => setCurrentView('dashboard')} />;
      default:
        return <div className="p-6 text-whop-text-muted">Feature coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-whop-dark">
      <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
      <div className="flex-1 flex flex-col">
        <Header 
          title={activeItem === 'funnels' ? 'Funnels' : 'Dashboard'} 
          rightContent={
            activeItem === 'funnels' && currentView === 'dashboard' ? (
              <Button onClick={() => setCurrentView('create')}>
                New Funnel
              </Button>
            ) : null
          }
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;