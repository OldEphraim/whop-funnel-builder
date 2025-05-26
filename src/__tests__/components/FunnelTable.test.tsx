import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FunnelTable } from '../../components/FunnelTable';
import { mockFunnels } from '../../data/mockFunnels';
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

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  test('shows revenue and conversion data', () => {
    render(
      <FunnelTable 
        funnels={mockFunnels} 
        onEditFunnel={mockOnEdit}
        onDeleteFunnel={mockOnDelete}
      />
    );

    expect(screen.getByText('$8,450')).toBeInTheDocument();
    expect(screen.getByText('23.5%')).toBeInTheDocument();
    expect(screen.getByText('127')).toBeInTheDocument();
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

    expect(screen.getByText('3 tiers')).toBeInTheDocument();
    expect(screen.getByText('2 tiers')).toBeInTheDocument();
  });
});