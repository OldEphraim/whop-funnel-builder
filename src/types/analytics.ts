export interface FunnelAnalytics {
    funnelId: string;
    funnelName: string;
    totalUsers: number;
    tierMetrics: TierMetrics[];
    conversionFlow: ConversionFlow[];
    revenueBreakdown: RevenueBreakdown;
    timeSeriesData: TimeSeriesData[];
    insights: GrowthInsight[];
  }
  
  export interface TierMetrics {
    tierId: string;
    tierName: string;
    tierPrice: number;
    totalUsers: number;
    newUsersThisMonth: number;
    churnRate: number;
    conversionRateFromPrevious: number;
    averageTimeInTier: number; // days
    revenue: number;
    revenueGrowth: number; // percentage
  }
  
  export interface ConversionFlow {
    fromTier: string;
    toTier: string;
    conversionRate: number;
    users: number;
    averageTimeToConvert: number; // days
  }
  
  export interface RevenueBreakdown {
    totalRevenue: number;
    revenueByTier: {
      tierId: string;
      tierName: string;
      revenue: number;
      percentage: number;
    }[];
    monthlyRecurringRevenue: number;
    averageRevenuePerUser: number;
    customerLifetimeValue: number;
  }
  
  export interface TimeSeriesData {
    date: string;
    totalUsers: number;
    revenue: number;
    conversions: number;
    tierBreakdown: {
      tierId: string;
      users: number;
      revenue: number;
    }[];
  }
  
  export interface GrowthInsight {
    id: string;
    type: 'opportunity' | 'warning' | 'success';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    actionable: boolean;
    recommendation?: string;
    estimatedImpact?: {
      revenue: number;
      users: number;
      conversionRate: number;
    };
  }
  
  export interface ABTestConfig {
    id: string;
    name: string;
    status: 'draft' | 'running' | 'completed';
    variants: ABTestVariant[];
    startDate: string;
    endDate?: string;
    confidence: number;
    winner?: string;
  }
  
  export interface ABTestVariant {
    id: string;
    name: string;
    description: string;
    traffic: number; // percentage
    metrics: {
      users: number;
      conversions: number;
      conversionRate: number;
      revenue: number;
    };
  }