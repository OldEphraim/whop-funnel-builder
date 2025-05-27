import { mockFunnels } from '../../data/mockData';
import { Funnel } from '../../types/funnel';
import { describe, test, expect } from 'vitest';

describe('Mock Funnels Data', () => {
  test('should have 2 sample funnels', () => {
    expect(mockFunnels).toHaveLength(2);
  });

  test('should have valid funnel structure', () => {
    mockFunnels.forEach((funnel: Funnel) => {
      expect(funnel).toHaveProperty('id');
      expect(funnel).toHaveProperty('name');
      expect(funnel).toHaveProperty('url');
      expect(funnel).toHaveProperty('status');
      expect(funnel).toHaveProperty('tiers');
      expect(funnel.tiers).toBeInstanceOf(Array);
      expect(funnel.tiers.length).toBeGreaterThan(0);
    });
  });

  test('should have valid tier structure', () => {
    mockFunnels.forEach((funnel) => {
      funnel.tiers.forEach((tier) => {
        expect(tier).toHaveProperty('id');
        expect(tier).toHaveProperty('name');
        expect(tier).toHaveProperty('price');
        expect(tier).toHaveProperty('apps');
        expect(typeof tier.price).toBe('number');
        expect(tier.apps).toBeInstanceOf(Array);
      });
    });
  });
});