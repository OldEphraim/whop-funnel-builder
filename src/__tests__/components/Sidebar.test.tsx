import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../../components/Sidebar';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('Sidebar Component', () => {
  const mockOnItemClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all navigation items', () => {
    render(<Sidebar activeItem="home" onItemClick={mockOnItemClick} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Your whops')).toBeInTheDocument();
    expect(screen.getByText('Funnels')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('highlights active item', () => {
    render(<Sidebar activeItem="funnels" onItemClick={mockOnItemClick} />);
    
    const funnelsButton = screen.getByText('Funnels').closest('button');
    expect(funnelsButton).toHaveClass('bg-whop-blue');
  });

  test('calls onItemClick when navigation item is clicked', () => {
    render(<Sidebar activeItem="home" onItemClick={mockOnItemClick} />);
    
    fireEvent.click(screen.getByText('Funnels'));
    expect(mockOnItemClick).toHaveBeenCalledWith('funnels');
  });

  test('shows Whop branding', () => {
    render(<Sidebar activeItem="home" onItemClick={mockOnItemClick} />);
    
    expect(screen.getByText('Whop')).toBeInTheDocument();
    expect(screen.getByText('Funnel Builder Demo')).toBeInTheDocument();
  });

  test('shows bottom status indicators', () => {
    render(<Sidebar activeItem="home" onItemClick={mockOnItemClick} />);
    
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('Not ranked')).toBeInTheDocument();
  });
});