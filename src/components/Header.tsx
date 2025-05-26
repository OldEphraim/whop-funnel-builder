import React from 'react';
import { Input } from './ui/Input';

interface HeaderProps {
  title: string;
  rightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, rightContent }) => {
  return (
    <div className="bg-whop-dark border-b border-whop-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-whop-text">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Search..."
              className="w-64"
            />
          </div>
          {rightContent}
        </div>
      </div>
    </div>
  );
};