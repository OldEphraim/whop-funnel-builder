import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'whops', label: 'Your whops', icon: '📦' },
    { id: 'funnels', label: 'Funnels', icon: '🔄' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-whop-dark border-r border-whop-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-whop-border">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">📊</div>
          <span className="text-xl font-bold text-whop-text">Whop</span>
        </div>
        <div className="text-sm text-whop-text-muted mt-1">Funnel Builder Demo</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeItem === item.id 
                    ? 'bg-whop-blue text-white' 
                    : 'text-whop-text-muted hover:text-whop-text hover:bg-whop-gray-light'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom indicators */}
      <div className="p-4 border-t border-whop-border">
        <div className="flex items-center space-x-2 text-sm text-whop-text-muted">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>$0.00</span>
          <span>•</span>
          <span>Not ranked</span>
        </div>
      </div>
    </div>
  );
};
