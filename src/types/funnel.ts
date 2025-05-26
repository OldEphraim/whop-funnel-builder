export interface FunnelTier {
    id: string;
    name: string;
    price: number;
    apps: string[];
    description: string;
  }
  
  export interface Funnel {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    status: 'active' | 'draft' | 'paused';
    tiers: FunnelTier[];
    totalRevenue: number;
    activeUsers: number;
    conversionRate: number;
  }
  