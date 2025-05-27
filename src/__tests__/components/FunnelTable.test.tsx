import { render, screen, fireEvent } from '@testing-library/react';
import { FunnelTable } from '../../components/FunnelTable';
import { mockFunnels } from '../../data/mockData';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('FunnelTable Component', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders funnel data correctly', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    // Check if funnel names are displayed
    expect(screen.getByText('Trading Mastery Program')).toBeInTheDocument();
    expect(screen.getByText('Fitness Transformation')).toBeInTheDocument();
  });

  test('displays status badges correctly', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    expect(screen.getAllByText('Active')).toHaveLength(2);
  });

  test('shows revenue and conversion data', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    expect(screen.getByText('$28,137')).toBeInTheDocument(); 
    expect(screen.getByText('$11,729')).toBeInTheDocument(); 
    expect(screen.getByText('29.1%')).toBeInTheDocument(); 
    expect(screen.getByText('28.1%')).toBeInTheDocument(); 
    expect(screen.getByText('1247')).toBeInTheDocument(); 
    expect(screen.getByText('892')).toBeInTheDocument(); 
  });

  test('calls onEditFunnel when edit button is clicked', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnEdit).toHaveBeenCalledWith('funnel_1');
  });

  test('calls onDeleteFunnel when delete button is clicked', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith('funnel_1');
  });

  test('displays tier count correctly', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    expect(screen.getAllByText('3 tiers')).toHaveLength(2); 
  });
});