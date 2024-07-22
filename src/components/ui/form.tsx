import React, { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface FormProps {
  children: ReactNode;
  [key: string]: any; // To accept other props
}

interface FormControlProps {
  children: ReactNode;
}

interface FormItemProps {
  children: ReactNode;
}

interface FormLabelProps {
  children: ReactNode;
}

interface FormMessageProps {
  children: ReactNode;
}

interface FormFieldProps {
  name: string;
  render: (field: any) => ReactNode;
  control?: any;
}

export const FormField: React.FC<FormFieldProps> = ({ name, render, control }) => {
  const { control: formControl } = useFormContext();

  return (
    <Controller
      name={name}
      control={control || formControl}
      render={({ field }) => render(field)}
    />
  );
};

export const Form: React.FC<FormProps> = ({ children, ...props }) => (
  <form {...props}>{children}</form>
);

export const FormControl: React.FC<FormControlProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const FormItem: React.FC<FormItemProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const FormLabel: React.FC<FormLabelProps> = ({ children }) => (
  <label className="block mb-2 font-semibold">{children}</label>
);

export const FormMessage: React.FC<FormMessageProps> = ({ children }) => (
  <p className="mt-1 text-red-500">{children}</p>
);
