import React from 'react';

interface RadioGroupProps {
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ defaultValue, className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  id: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id }) => {
  return (
    <input type="radio" id={id} name="language" value={value} />
  );
}; 