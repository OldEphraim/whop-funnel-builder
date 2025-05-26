import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-whop-gray border border-whop-border rounded-lg ${className}`}>
      {children}
    </div>
  );
};