import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={`rounded-lg bg-white p-3 shadow-md sm:p-4 lg:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-3 sm:mb-4">{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2
      className={`text-lg font-bold sm:text-xl lg:text-2xl ${className || ""}`}
    >
      {children}
    </h2>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div>{children}</div>;
};
