import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { FunnelTier } from '../types/funnel';

interface FunnelWizardProps {
  onBack: () => void;
  onSave: (funnelData: any) => void;
  isEditing?: boolean;
  editingFunnel?: any;
}

export const FunnelWizard: React.FC<FunnelWizardProps> = ({ 
  onBack, 
  onSave, 
  isEditing = false, 
  editingFunnel 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [funnelName, setFunnelName] = useState(editingFunnel?.name || '');
  const [funnelUrl, setFunnelUrl] = useState(editingFunnel?.url?.replace('whop.com/', '') || '');
  const [tiers, setTiers] = useState<Partial<FunnelTier>[]>(
    editingFunnel?.tiers || [
      { name: 'Free Tier', price: 0, apps: ['Chat'], description: '' },
      { name: 'Premium Tier', price: 29, apps: ['Chat', 'Courses'], description: '' },
      { name: 'VIP Tier', price: 99, apps: ['Chat', 'Courses', 'Calendar'], description: '' }
    ]
  );

  const availableApps = [
    'Chat', 'Courses', 'Forums', 'Calendar', 'Files', 'Help Desk', 'Announcements'
  ];

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Name and URL for your funnel' },
    { id: 2, title: 'Configure Tiers', description: 'Set up your funnel progression' },
    { id: 3, title: 'Review', description: 'Confirm your funnel setup' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const funnelData = {
      name: funnelName,
      url: `whop.com/${funnelUrl}`,
      tiers: tiers.map((tier, index) => ({
        ...tier,
        id: `tier_${index + 1}`,
        apps: tier.apps || []
      })),
      status: 'draft' as const
    };
    onSave(funnelData);
  };

  const updateTier = (index: number, field: string, value: any) => {
    const updatedTiers = [...tiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setTiers(updatedTiers);
  };

  const addTier = () => {
    setTiers([...tiers, { 
      name: `Tier ${tiers.length + 1}`, 
      price: 0, 
      apps: ['Chat'], 
      description: '' 
    }]);
  };

  const removeTier = (index: number) => {
    if (tiers.length > 2) {
      setTiers(tiers.filter((_, i) => i !== index));
    }
  };

  const toggleApp = (tierIndex: number, app: string) => {
    const updatedTiers = [...tiers];
    const currentApps = updatedTiers[tierIndex].apps || [];
    
    if (currentApps.includes(app)) {
      updatedTiers[tierIndex].apps = currentApps.filter(a => a !== app);
    } else {
      updatedTiers[tierIndex].apps = [...currentApps, app];
    }
    
    setTiers(updatedTiers);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            currentStep >= step.id 
              ? 'bg-whop-blue text-white' 
              : 'bg-whop-gray border border-whop-border text-whop-text-muted'
          }`}>
            {step.id}
          </div>
          <div className="ml-3">
            <div className={`text-sm font-medium ${
              currentStep >= step.id ? 'text-whop-text' : 'text-whop-text-muted'
            }`}>
              {step.title}
            </div>
            <div className="text-xs text-whop-text-muted">{step.description}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`ml-6 w-12 h-px ${
              currentStep > step.id ? 'bg-whop-blue' : 'bg-whop-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-whop-text mb-2">
          Funnel Name
        </label>
        <Input
          placeholder="e.g., Trading Mastery Program"
          value={funnelName}
          onChange={(e) => setFunnelName(e.target.value)}
        />
        <p className="text-xs text-whop-text-muted mt-1">
          This is the name customers will see for your complete program
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-whop-text mb-2">
          Funnel URL
        </label>
        <div className="flex items-center">
          <span className="text-whop-text-muted mr-2">whop.com/</span>
          <Input
            placeholder="trading-mastery"
            value={funnelUrl}
            onChange={(e) => setFunnelUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            className="flex-1"
          />
        </div>
        <p className="text-xs text-whop-text-muted mt-1">
          This will be the single URL customers use to access your funnel
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-whop-text">Configure Your Funnel Tiers</h3>
        <Button variant="secondary" onClick={addTier}>
          + Add Tier
        </Button>
      </div>
      
      <div className="space-y-4">
        {tiers.map((tier, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-whop-blue font-semibold">Tier {index + 1}</span>
                {index > 0 && (
                  <span className="text-whop-text-muted text-sm">→</span>
                )}
              </div>
              {tiers.length > 2 && (
                <button
                  onClick={() => removeTier(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-whop-text mb-1">
                  Tier Name
                </label>
                <Input
                  placeholder="e.g., Premium Signals"
                  value={tier.name || ''}
                  onChange={(e) => updateTier(index, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-whop-text mb-1">
                  Price (USD)
                </label>
                <Input
                  type="number"
                  placeholder="29"
                  value={String(tier.price || 0)}
                  onChange={(e) => updateTier(index, 'price', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-whop-text mb-2">
                Included Apps
              </label>
              <div className="flex flex-wrap gap-2">
                {availableApps.map((app) => (
                  <button
                    key={app}
                    onClick={() => toggleApp(index, app)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      (tier.apps || []).includes(app)
                        ? 'bg-whop-blue text-white border-whop-blue'
                        : 'bg-whop-gray text-whop-text-muted border-whop-border hover:border-whop-blue'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-whop-text mb-1">
                Description
              </label>
              <textarea
                placeholder="What customers get at this tier..."
                value={tier.description || ''}
                onChange={(e) => updateTier(index, 'description', e.target.value)}
                className="w-full px-3 py-2 bg-whop-gray border border-whop-border rounded-lg text-whop-text placeholder-whop-text-muted focus:outline-none focus:ring-2 focus:ring-whop-blue focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-whop-text">Review Your Funnel</h3>
      
      <Card className="p-4">
        <h4 className="font-medium text-whop-text mb-2">Basic Information</h4>
        <div className="text-sm text-whop-text-muted space-y-1">
          <div><strong>Name:</strong> {funnelName}</div>
          <div><strong>URL:</strong> whop.com/{funnelUrl}</div>
        </div>
      </Card>
      
      <div>
        <h4 className="font-medium text-whop-text mb-3">Funnel Flow</h4>
        <div className="flex items-center space-x-4 overflow-x-auto">
          {tiers.map((tier, index) => (
            <div key={index} className="flex items-center">
              <Card className="p-3 min-w-[200px]">
                <div className="text-sm font-medium text-whop-text">{tier.name}</div>
                <div className="text-xs text-whop-blue">
                  {tier.price === 0 ? 'Free' : `$${tier.price}/month`}
                </div>
                <div className="text-xs text-whop-text-muted mt-1">
                  {(tier.apps || []).join(', ')}
                </div>
              </Card>
              {index < tiers.length - 1 && (
                <div className="text-whop-blue mx-2">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    if (currentStep === 1) {
      return funnelName.trim() && funnelUrl.trim();
    }
    if (currentStep === 2) {
      return tiers.every(tier => tier.name && tier.name.trim());
    }
    return true;
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-whop-text">
            {isEditing ? 'Edit Funnel' : 'Create New Funnel'}
          </h2>
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {renderStepIndicator()}

        <div className="min-h-[400px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <div className="flex justify-between mt-8">
          <div>
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSave}>
                {isEditing ? 'Save Changes' : 'Create Funnel'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};