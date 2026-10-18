import { cn } from "@/lib/utils";

export default function Logo({
    className,
    ...props
}) {
    return (
        <div className={cn("flex items-center gap-2 h-6 text-xl sm:text-2xl font-bold", className)}>
            {/* ajoute ton logo ici */}
        </div>
    );
}
