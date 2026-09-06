import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'destructive'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer"
    
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    }

    return (
      <Comp
        className={`${baseStyles} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"