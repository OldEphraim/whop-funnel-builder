import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const baseClasses = "bg-whop-gray border border-whop-border rounded-lg";
  const hoverClasses = hover ? "transition-all duration-200 hover:border-whop-blue hover:shadow-lg hover:shadow-whop-blue/10 hover:-translate-y-1 cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};