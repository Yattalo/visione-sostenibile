"use client";

import { forwardRef, useId } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = "text", id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={id}
            ref={ref}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={cn(
              "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2",
              "text-sm md:text-base ring-offset-background",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-all duration-200",
              icon && "pl-12",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3",
            "text-sm md:text-base ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200 resize-none",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "mt-1 w-5 h-5 rounded-md border-2 border-paper-300",
              "text-leaf-600 focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2",
              "checked:bg-leaf-600 checked:border-leaf-600",
              "transition-all duration-200 cursor-pointer",
              error && "border-red-500",
              className
            )}
            {...props}
          />
          {label && (
            <span className="text-sm text-forest-800/80 leading-relaxed group-hover:text-forest-950 transition-colors">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface RadioGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, options, value, onChange, error, required }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-forest-800 mb-3">
            {label}
            {required && <span className="text-sun-500 ml-1">*</span>}
          </label>
        )}
        <div ref={ref} className="flex flex-col sm:flex-row gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                value === option.value
                  ? "border-leaf-600 bg-leaf-50 text-forest-950"
                  : "border-paper-200 hover:border-leaf-300 hover:bg-paper-50 text-forest-800/70"
              )}
            >
              <input
                type="radio"
                name={label}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface CheckboxGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, options, value = [], onChange, error }, ref) => {
    const handleToggle = (optionValue: string) => {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-forest-800 mb-3">
            {label}
          </label>
        )}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                value.includes(option.value)
                  ? "border-leaf-600 bg-leaf-50 text-forest-950"
                  : "border-paper-200 hover:border-leaf-300 hover:bg-paper-50 text-forest-800/70"
              )}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="sr-only"
              />
              <span className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                value.includes(option.value)
                  ? "bg-leaf-600 border-leaf-600"
                  : "border-paper-300"
              )}>
                {value.includes(option.value) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
