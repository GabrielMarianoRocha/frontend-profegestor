import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading = false, className, ...props }, ref) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400',
      secondary: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-400',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? 'Carregando...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }