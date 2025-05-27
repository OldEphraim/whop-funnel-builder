import { Funnel } from '../types/funnel';
import { FunnelAnalytics } from '../types/analytics';

// Raw funnel definitions - this is our single source of truth
const rawFunnelData = [
  {
    id: 'funnel_1',
    name: 'Trading Mastery Program',
    url: 'whop.com/trading-mastery',
    createdAt: '2024-05-20',
    status: 'active' as const,
    tiers: [
      {
        id: 'tier_1',
        name: 'Free Community',
        price: 0,
        apps: ['Chat', 'Announcements'],
        description: 'Basic trading tips and community access',
        users: 1247,
        revenue: 0
      },
      {
        id: 'tier_2',
        name: 'Premium Signals',
        price: 49,
        apps: ['Chat', 'Courses', 'Calendar'],
        description: 'Daily trading signals and weekly calls',
        users: 294,
        revenue: 14406
      },
      {
        id: 'tier_3',
        name: 'VIP Mentorship',
        price: 199,
        apps: ['Chat', 'Courses', 'Calendar', 'Help Desk'],
        description: '1-on-1 mentorship and exclusive content',
        users: 69,
        revenue: 13731
      }
    ]
  },
  {
    id: 'funnel_2',
    name: 'Fitness Transformation',
    url: 'whop.com/fit-transform',
    createdAt: '2024-05-15',
    status: 'active' as const,
    tiers: [
      {
        id: 'tier_1',
        name: 'Free Trial',
        price: 0,
        apps: ['Chat'],
        description: 'Basic workout routines and community',
        users: 892,
        revenue: 0
      },
      {
        id: 'tier_2',
        name: 'Basic Plan',
        price: 29,
        apps: ['Chat', 'Courses'],
        description: 'Complete workout programs and nutrition guides',
        users: 162,
        revenue: 4698
      },
      {
        id: 'tier_3',
        name: 'Pro Plan',
        price: 79,
        apps: ['Chat', 'Courses', 'Files', 'Calendar'],
        description: 'Personal coaching and custom meal plans',
        users: 89,
        revenue: 7031
      }
    ]
  }
];

// Helper functions to calculate derived data
const calculateTotalRevenue = (tiers: any[]) => 
  tiers.reduce((sum, tier) => sum + tier.revenue, 0);

const calculateTotalUsers = (tiers: any[]) => 
  Math.max(...tiers.map(tier => tier.users));

const calculateConversionRate = (tiers: any[]) => {
  if (tiers.length < 2) return 0;
  const freeUsers = tiers[0].users;
  const paidUsers = tiers.slice(1).reduce((sum, tier) => sum + tier.users, 0);
  return freeUsers > 0 ? Number(((paidUsers / freeUsers) * 100).toFixed(1)) : 0;
};

// Generate Funnel objects (for backwards compatibility)
export const mockFunnels: Funnel[] = rawFunnelData.map(funnel => ({
  id: funnel.id,
  name: funnel.name,
  url: funnel.url,
  createdAt: funnel.createdAt,
  status: funnel.status,
  tiers: funnel.tiers.map(tier => ({
    id: tier.id,
    name: tier.name,
    price: tier.price,
    apps: tier.apps,
    description: tier.description
  })),
  totalRevenue: calculateTotalRevenue(funnel.tiers),
  activeUsers: calculateTotalUsers(funnel.tiers),
  conversionRate: calculateConversionRate(funnel.tiers)
}));

// Generate comprehensive analytics from the same source
export const mockFunnelAnalytics: FunnelAnalytics[] = rawFunnelData.map(funnel => {
  const totalUsers = calculateTotalUsers(funnel.tiers);
  const totalRevenue = calculateTotalRevenue(funnel.tiers);
  const paidRevenue = totalRevenue; // Since free tiers have 0 revenue
  const paidUsers = funnel.tiers.slice(1).reduce((sum, tier) => sum + tier.users, 0);
  
  // Calculate tier metrics
  const tierMetrics = funnel.tiers.map((tier, index) => {
    const prevTierUsers = index === 0 ? totalUsers : funnel.tiers[index - 1].users;
    const conversionRate = index === 0 ? 100 : 
      prevTierUsers > 0 ? Number(((tier.users / prevTierUsers) * 100).toFixed(1)) : 0;
    
    return {
      tierId: tier.id,
      tierName: tier.name,
      tierPrice: tier.price,
      totalUsers: tier.users,
      newUsersThisMonth: Math.floor(tier.users * 0.25), // 25% are new
      churnRate: tier.price === 0 ? 22.1 : tier.price < 50 ? 15.3 : 8.7,
      conversionRateFromPrevious: conversionRate,
      averageTimeInTier: tier.price === 0 ? 7 : tier.price < 50 ? 28 : 52,
      revenue: tier.revenue,
      revenueGrowth: tier.revenue > 0 ? Number((Math.random() * 20 + 5).toFixed(1)) : 0
    };
  });

  // Calculate conversion flows
  const conversionFlow = funnel.tiers.slice(0, -1).map((tier, index) => {
    const nextTier = funnel.tiers[index + 1];
    const conversionRate = tier.users > 0 ? 
      Number(((nextTier.users / tier.users) * 100).toFixed(1)) : 0;
    
    return {
      fromTier: tier.id,
      toTier: nextTier.id,
      conversionRate,
      users: nextTier.users,
      averageTimeToConvert: Number((Math.random() * 10 + 5).toFixed(1))
    };
  });

  // Calculate revenue breakdown
  const revenueByTier = funnel.tiers.map(tier => ({
    tierId: tier.id,
    tierName: tier.name,
    revenue: tier.revenue,
    percentage: totalRevenue > 0 ? Number(((tier.revenue / totalRevenue) * 100).toFixed(1)) : 0
  }));

  // Generate insights based on data
  const insights = [];
  
  // Insight 1: Conversion rate analysis
  const freeToAnyPaidRate = conversionFlow[0]?.conversionRate || 0;
  if (freeToAnyPaidRate > 20) {
    insights.push({
      id: `insight_${funnel.id}_1`,
      type: 'opportunity' as const,
      title: 'High Free-to-Paid Conversion Rate',
      description: `Your free-to-paid conversion rate of ${freeToAnyPaidRate}% is significantly above industry average of 15%.`,
      impact: 'high' as const,
      actionable: true,
      recommendation: 'Consider increasing the free tier value proposition to attract more users, as you excel at converting them.',
      estimatedImpact: {
        revenue: Math.floor(totalRevenue * 0.15),
        users: Math.floor(totalUsers * 0.12),
        conversionRate: 2.1
      }
    });
  } else if (freeToAnyPaidRate < 15) {
    insights.push({
      id: `insight_${funnel.id}_1`,
      type: 'warning' as const,
      title: 'Low Initial Conversion Rate',
      description: `Free trial to paid conversion of ${freeToAnyPaidRate}% is below industry average.`,
      impact: 'medium' as const,
      actionable: true,
      recommendation: 'Improve onboarding flow and trial experience.',
      estimatedImpact: {
        revenue: Math.floor(totalRevenue * 0.2),
        users: Math.floor(totalUsers * 0.08),
        conversionRate: 4.3
      }
    });
  }

  // Insight 2: Tier progression analysis
  if (conversionFlow.length > 1) {
    const firstConversion = conversionFlow[0].conversionRate;
    const secondConversion = conversionFlow[1].conversionRate;
    const priceDiff = funnel.tiers[2].price / funnel.tiers[1].price;
    
    if (Math.abs(firstConversion - secondConversion) < 5 && priceDiff > 3) {
      insights.push({
        id: `insight_${funnel.id}_2`,
        type: 'warning' as const,
        title: 'Tier Pricing Gap',
        description: `The conversion rate from ${funnel.tiers[1].name} to ${funnel.tiers[2].name} (${secondConversion}%) suggests price sensitivity.`,
        impact: 'medium' as const,
        actionable: true,
        recommendation: `Test a mid-tier option at $${Math.floor((funnel.tiers[1].price + funnel.tiers[2].price) / 2)} to bridge the gap.`,
        estimatedImpact: {
          revenue: Math.floor(totalRevenue * 0.1),
          users: Math.floor(totalUsers * 0.05),
          conversionRate: 8.3
        }
      });
    }
  }

  // Insight 3: High-tier performance
  const highestTier = funnel.tiers[funnel.tiers.length - 1];
  if (highestTier.price > 100 && tierMetrics[tierMetrics.length - 1].churnRate < 10) {
    insights.push({
      id: `insight_${funnel.id}_3`,
      type: 'success' as const,
      title: 'Excellent Premium Retention',
      description: `${highestTier.name} has low churn rate and strong revenue growth.`,
      impact: 'high' as const,
      actionable: false,
      recommendation: 'Continue current premium strategy and consider premium add-ons.'
    });
  }

  return {
    funnelId: funnel.id,
    funnelName: funnel.name,
    totalUsers,
    tierMetrics,
    conversionFlow,
    revenueBreakdown: {
      totalRevenue,
      revenueByTier,
      monthlyRecurringRevenue: totalRevenue,
      averageRevenuePerUser: totalUsers > 0 ? Number((totalRevenue / totalUsers).toFixed(2)) : 0,
      customerLifetimeValue: paidUsers > 0 ? Number((paidRevenue / paidUsers * 10).toFixed(2)) : 0
    },
    timeSeriesData: [
      {
        date: '2024-05-01',
        totalUsers: Math.floor(totalUsers * 0.85),
        revenue: Math.floor(totalRevenue * 0.87),
        conversions: Math.floor(paidUsers * 0.8),
        tierBreakdown: funnel.tiers.map(tier => ({
          tierId: tier.id,
          users: Math.floor(tier.users * 0.85),
          revenue: Math.floor(tier.revenue * 0.87)
        }))
      },
      {
        date: '2024-05-15',
        totalUsers: Math.floor(totalUsers * 0.92),
        revenue: Math.floor(totalRevenue * 0.93),
        conversions: Math.floor(paidUsers * 0.9),
        tierBreakdown: funnel.tiers.map(tier => ({
          tierId: tier.id,
          users: Math.floor(tier.users * 0.92),
          revenue: Math.floor(tier.revenue * 0.93)
        }))
      },
      {
        date: '2024-05-26',
        totalUsers,
        revenue: totalRevenue,
        conversions: paidUsers,
        tierBreakdown: funnel.tiers.map(tier => ({
          tierId: tier.id,
          users: tier.users,
          revenue: tier.revenue
        }))
      }
    ],
    insights
  };
});

// Export everything from a single place
export * from '../types/funnel';
export * from '../types/analytics';