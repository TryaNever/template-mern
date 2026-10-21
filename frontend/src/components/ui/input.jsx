import { cn } from '@/lib/utils'
import * as React from 'react'

const Input = React.forwardRef(({ className, icon, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(!showPasswordToggle)
    return (
        <div className="relative w-full text-muted-foreground">
            {icon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-xl">
                    {icon}
                </span>
            )}

            <input
                type={showPassword ? 'text' : 'password'}
                className={cn(
                    'flex h-control w-full rounded-xl border border-input bg-background px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
                    icon && 'pl-12',
                    className
                )}
                ref={ref}
                {...props}
            />
            {showPasswordToggle && (
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <i className="bx bx-show"></i> : <i className="bx bx-hide"></i>}
                </button>
            )}
        </div>
    )
})
Input.displayName = 'Input'

export { Input }
