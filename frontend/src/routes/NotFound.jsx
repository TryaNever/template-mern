import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-page text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Erreur 404
            </p>
            <h1 className="text-4xl font-bold">Page introuvable</h1>
            <Link className="text-primary underline underline-offset-4" to="/">
                Retour à l'accueil
            </Link>
        </main>
    )
}
