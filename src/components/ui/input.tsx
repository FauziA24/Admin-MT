import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => (
  <input
    ref={ref}
    className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
));
