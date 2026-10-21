import { Loader2 } from 'lucide-react'

export function FullPageLoader() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )
}
