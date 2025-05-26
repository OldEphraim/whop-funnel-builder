import { Funnel } from '../types/funnel';

export const mockFunnels: Funnel[] = [
  {
    id: 'funnel_1',
    name: 'Trading Mastery Program',
    url: 'whop.com/trading-mastery',
    createdAt: '2024-05-20',
    status: 'active',
    tiers: [
      {
        id: 'tier_1',
        name: 'Free Community',
        price: 0,
        apps: ['Chat', 'Announcements'],
        description: 'Basic trading tips and community access'
      },
      {
        id: 'tier_2',
        name: 'Premium Signals',
        price: 49,
        apps: ['Chat', 'Courses', 'Calendar'],
        description: 'Daily trading signals and weekly calls'
      },
      {
        id: 'tier_3',
        name: 'VIP Mentorship',
        price: 199,
        apps: ['Chat', 'Courses', 'Calendar', 'Help Desk'],
        description: '1-on-1 mentorship and exclusive content'
      }
    ],
    totalRevenue: 8450,
    activeUsers: 127,
    conversionRate: 23.5
  },
  {
    id: 'funnel_2',
    name: 'Fitness Transformation',
    url: 'whop.com/fit-transform',
    createdAt: '2024-05-15',
    status: 'draft',
    tiers: [
      {
        id: 'tier_1',
        name: 'Free Workouts',
        price: 0,
        apps: ['Chat'],
        description: 'Basic workout routines'
      },
      {
        id: 'tier_2',
        name: 'Complete Program',
        price: 97,
        apps: ['Chat', 'Courses', 'Files'],
        description: 'Full workout and nutrition program'
      }
    ],
    totalRevenue: 0,
    activeUsers: 0,
    conversionRate: 0
  }
];