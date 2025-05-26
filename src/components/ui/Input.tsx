import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  type = 'text' 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-whop-gray border border-whop-border rounded-lg text-whop-text placeholder-whop-text-muted focus:outline-none focus:ring-2 focus:ring-whop-blue focus:border-transparent ${className}`}
    />
  );
};