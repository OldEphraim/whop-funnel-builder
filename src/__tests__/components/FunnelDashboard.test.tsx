import { render, screen, fireEvent } from '@testing-library/react';
import { FunnelDashboard } from '../../components/FunnelDashboard';
import { mockFunnels } from '../../data/mockData';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('FunnelDashboard Component', () => {
  const mockOnCreate = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows empty state when no funnels exist', () => {
    render(
      <FunnelDashboard 
        funnels={[]}
        onCreateFunnel={mockOnCreate}
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
        analytics={[]}
        onViewAnalytics={vi.fn()}
      />
    );

    expect(screen.getByText('No funnels yet')).toBeInTheDocument();
    expect(screen.getByText('Create Your First Funnel')).toBeInTheDocument();
  });

  test('shows funnel table when funnels exist', () => {
    render(
      <FunnelDashboard 
        funnels={mockFunnels}
        onCreateFunnel={mockOnCreate}
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
        analytics={[]}
        onViewAnalytics={vi.fn()}
      />
    );

    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
    expect(screen.queryByText('No funnels yet')).not.toBeInTheDocument();
  });

  test('calls onCreateFunnel when create button is clicked in empty state', () => {
    render(
      <FunnelDashboard 
        funnels={[]}
        onCreateFunnel={mockOnCreate}
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
        analytics={[]}
        onViewAnalytics={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Create Your First Funnel'));
    expect(mockOnCreate).toHaveBeenCalled();
  });
});
