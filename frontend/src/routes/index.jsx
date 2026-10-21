import { Link } from 'react-router-dom'

export default function Index() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-page text-center">
            <h1 className="text-4xl font-bold">Votre nouveau projet commence ici</h1>
            <p className="max-w-prose text-muted-foreground">
                Personnalisez cette page et les tokens Tailwind pour démarrer votre application.
            </p>
            <Link
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                to="/register"
            >
                Créer un compte
            </Link>
        </main>
    )
}
