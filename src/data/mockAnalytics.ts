import { FunnelAnalytics, ABTestConfig } from '../types/analytics';

export const mockFunnelAnalytics: FunnelAnalytics[] = [
  {
    funnelId: 'funnel_1',
    funnelName: 'Trading Mastery Program',
    totalUsers: 1247,
    tierMetrics: [
      {
        tierId: 'tier_1',
        tierName: 'Free Community',
        tierPrice: 0,
        totalUsers: 1247,
        newUsersThisMonth: 342,
        churnRate: 15.2,
        conversionRateFromPrevious: 100,
        averageTimeInTier: 12,
        revenue: 0,
        revenueGrowth: 0
      },
      {
        tierId: 'tier_2',
        tierName: 'Premium Signals',
        tierPrice: 49,
        totalUsers: 294,
        newUsersThisMonth: 87,
        churnRate: 8.5,
        conversionRateFromPrevious: 23.6,
        averageTimeInTier: 45,
        revenue: 14406,
        revenueGrowth: 18.3
      },
      {
        tierId: 'tier_3',
        tierName: 'VIP Mentorship',
        tierPrice: 199,
        totalUsers: 69,
        newUsersThisMonth: 23,
        churnRate: 4.2,
        conversionRateFromPrevious: 23.5,
        averageTimeInTier: 78,
        revenue: 13731,
        revenueGrowth: 31.2
      }
    ],
    conversionFlow: [
      {
        fromTier: 'tier_1',
        toTier: 'tier_2',
        conversionRate: 23.6,
        users: 294,
        averageTimeToConvert: 8.5
      },
      {
        fromTier: 'tier_2',
        toTier: 'tier_3',
        conversionRate: 23.5,
        users: 69,
        averageTimeToConvert: 15.2
      }
    ],
    revenueBreakdown: {
      totalRevenue: 28137,
      revenueByTier: [
        { tierId: 'tier_1', tierName: 'Free Community', revenue: 0, percentage: 0 },
        { tierId: 'tier_2', tierName: 'Premium Signals', revenue: 14406, percentage: 51.2 },
        { tierId: 'tier_3', tierName: 'VIP Mentorship', revenue: 13731, percentage: 48.8 }
      ],
      monthlyRecurringRevenue: 28137,
      averageRevenuePerUser: 22.56,
      customerLifetimeValue: 234.67
    },
    timeSeriesData: [
      {
        date: '2024-05-01',
        totalUsers: 1180,
        revenue: 24500,
        conversions: 45,
        tierBreakdown: [
          { tierId: 'tier_1', users: 850, revenue: 0 },
          { tierId: 'tier_2', users: 250, revenue: 12250 },
          { tierId: 'tier_3', users: 80, revenue: 12250 }
        ]
      },
      {
        date: '2024-05-15',
        totalUsers: 1210,
        revenue: 26200,
        conversions: 52,
        tierBreakdown: [
          { tierId: 'tier_1', users: 890, revenue: 0 },
          { tierId: 'tier_2', users: 270, revenue: 13230 },
          { tierId: 'tier_3', users: 82, revenue: 12970 }
        ]
      },
      {
        date: '2024-05-26',
        totalUsers: 1247,
        revenue: 28137,
        conversions: 63,
        tierBreakdown: [
          { tierId: 'tier_1', users: 1247, revenue: 0 },
          { tierId: 'tier_2', users: 294, revenue: 14406 },
          { tierId: 'tier_3', users: 69, revenue: 13731 }
        ]
      }
    ],
    insights: [
      {
        id: 'insight_1',
        type: 'opportunity',
        title: 'High Free-to-Paid Conversion Rate',
        description: 'Your free-to-paid conversion rate of 23.6% is significantly above industry average of 15%.',
        impact: 'high',
        actionable: true,
        recommendation: 'Consider increasing the free tier value proposition to attract more users, as you excel at converting them.',
        estimatedImpact: {
          revenue: 4200,
          users: 150,
          conversionRate: 2.1
        }
      },
      {
        id: 'insight_2',
        type: 'warning',
        title: 'Premium to VIP Conversion Bottleneck',
        description: 'The conversion rate from Premium to VIP (23.5%) matches free-to-premium, suggesting price sensitivity.',
        impact: 'medium',
        actionable: true,
        recommendation: 'Test a mid-tier option at $99 to bridge the gap between $49 and $199.',
        estimatedImpact: {
          revenue: 2800,
          users: 45,
          conversionRate: 8.3
        }
      },
      {
        id: 'insight_3',
        type: 'success',
        title: 'Excellent VIP Retention',
        description: 'VIP tier has only 4.2% churn rate and highest revenue growth at 31.2%.',
        impact: 'high',
        actionable: false,
        recommendation: 'Continue current VIP strategy and consider premium add-ons.'
      }
    ]
  },
  {
    funnelId: 'funnel_2', 
    funnelName: 'Fitness Transformation',
    totalUsers: 892,
    tierMetrics: [
      {
        tierId: 'tier_1',
        tierName: 'Free Trial',
        tierPrice: 0,
        totalUsers: 892,
        newUsersThisMonth: 234,
        churnRate: 22.1,
        conversionRateFromPrevious: 100,
        averageTimeInTier: 7,
        revenue: 0,
        revenueGrowth: 0
      },
      {
        tierId: 'tier_2', 
        tierName: 'Basic Plan',
        tierPrice: 29,
        totalUsers: 162,
        newUsersThisMonth: 45,
        churnRate: 15.3,
        conversionRateFromPrevious: 18.2,
        averageTimeInTier: 28,
        revenue: 4698,
        revenueGrowth: 8.7
      },
      {
        tierId: 'tier_3',
        tierName: 'Pro Plan', 
        tierPrice: 79,
        totalUsers: 89,
        newUsersThisMonth: 23,
        churnRate: 8.7,
        conversionRateFromPrevious: 54.9,
        averageTimeInTier: 52,
        revenue: 7031,
        revenueGrowth: 12.4
      }
    ],
    conversionFlow: [
      {
        fromTier: 'tier_1',
        toTier: 'tier_2', 
        conversionRate: 18.2,
        users: 162,
        averageTimeToConvert: 5.2
      },
      {
        fromTier: 'tier_2',
        toTier: 'tier_3',
        conversionRate: 54.9,
        users: 89,
        averageTimeToConvert: 12.1
      }
    ],
    revenueBreakdown: {
      totalRevenue: 11729,
      revenueByTier: [
        { tierId: 'tier_1', tierName: 'Free Trial', revenue: 0, percentage: 0 },
        { tierId: 'tier_2', tierName: 'Basic Plan', revenue: 4698, percentage: 40.1 },
        { tierId: 'tier_3', tierName: 'Pro Plan', revenue: 7031, percentage: 59.9 }
      ],
      monthlyRecurringRevenue: 11729,
      averageRevenuePerUser: 13.14,
      customerLifetimeValue: 156.23
    },
    timeSeriesData: [
      {
        date: '2024-05-01',
        totalUsers: 820,
        revenue: 10500,
        conversions: 32,
        tierBreakdown: [
          { tierId: 'tier_1', users: 820, revenue: 0 },
          { tierId: 'tier_2', users: 145, revenue: 4205 },
          { tierId: 'tier_3', users: 80, revenue: 6320 }
        ]
      },
      {
        date: '2024-05-26',
        totalUsers: 892,
        revenue: 11729,
        conversions: 41,
        tierBreakdown: [
          { tierId: 'tier_1', users: 892, revenue: 0 },
          { tierId: 'tier_2', users: 162, revenue: 4698 },
          { tierId: 'tier_3', users: 89, revenue: 7031 }
        ]
      }
    ],
    insights: [
      {
        id: 'insight_4',
        type: 'warning',
        title: 'Low Initial Conversion Rate',
        description: 'Free trial to paid conversion of 18.2% is below industry average.',
        impact: 'medium',
        actionable: true,
        recommendation: 'Improve onboarding flow and trial experience.',
        estimatedImpact: {
          revenue: 2500,
          users: 75,
          conversionRate: 4.3
        }
      }
    ]
  }
];

export const mockABTests: ABTestConfig[] = [
  {
    id: 'test_1',
    name: 'Tier Pricing Optimization',
    status: 'running',
    variants: [
      {
        id: 'control',
        name: 'Current Pricing',
        description: 'Free, $49, $199',
        traffic: 50,
        metrics: {
          users: 623,
          conversions: 147,
          conversionRate: 23.6,
          revenue: 14068
        }
      },
      {
        id: 'variant_a',
        name: 'Mid-Tier Added',
        description: 'Free, $49, $99, $199',
        traffic: 50,
        metrics: {
          users: 624,
          conversions: 167,
          conversionRate: 26.8,
          revenue: 16341
        }
      }
    ],
    startDate: '2024-05-15',
    confidence: 85.3,
    winner: 'variant_a'
  },
  {
    id: 'test_2',
    name: 'Free Tier Value Proposition',
    status: 'draft',
    variants: [
      {
        id: 'control',
        name: 'Current Free Tier',
        description: 'Basic chat access',
        traffic: 50,
        metrics: {
          users: 0,
          conversions: 0,
          conversionRate: 0,
          revenue: 0
        }
      },
      {
        id: 'variant_b',
        name: 'Enhanced Free Tier',
        description: 'Chat + Weekly newsletter + Basic signals',
        traffic: 50,
        metrics: {
          users: 0,
          conversions: 0,
          conversionRate: 0,
          revenue: 0
        }
      }
    ],
    startDate: '2024-06-01',
    confidence: 0
  }, 
];