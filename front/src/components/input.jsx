import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef(({ className, icon, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(!showPasswordToggle);
    return (
        <div className="relative w-full text-body">
            {icon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-xl">
                    {icon}
                </span>
            )}

            <input
                type={showPassword ? "text" : "password"}
                className={cn(
                    "flex h-10 w-full rounded-xl border border-2 border-[#F3EAED] bg-main px-4 py-6 text-sm md:text-base ring-offset-deco-yellow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-pink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out",
                    icon && "pl-12",
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
                    {showPassword ? <i className='bx bx-show'></i> : <i className='bx bx-hide'></i>}
                </button>
            )}
        </div>
    )
})
Input.displayName = "Input"

export { Input };

