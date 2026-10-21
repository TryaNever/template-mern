import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [registeredEmail, setRegisteredEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        if (new TextEncoder().encode(password).length > 72) {
            setError('Le mot de passe ne doit pas dépasser 72 octets.')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            let result
            try {
                result = await response.json()
            } catch {
                throw new Error('Réponse serveur invalide.')
            }

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Cette adresse e-mail est déjà utilisée.')
                }
                throw new Error(
                    response.status < 500
                        ? result.message || 'Vérifiez les informations saisies.'
                        : 'Une erreur est survenue. Réessayez plus tard.'
                )
            }

            setRegisteredEmail(result.user.email)
            setPassword('')
            setConfirmPassword('')
        } catch (requestError) {
            setError(
                requestError instanceof TypeError
                    ? 'Impossible de joindre le serveur. Vérifiez qu’il est démarré.'
                    : requestError.message
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-page py-10">
            <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-card sm:p-8">
                <div className="mb-8 space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Bienvenue
                    </p>
                    <h1 className="text-3xl font-bold">Créer un compte</h1>
                    <p className="text-sm text-muted-foreground">Inscrivez-vous pour commencer.</p>
                </div>

                {registeredEmail ? (
                    <div className="space-y-4 text-center" role="status">
                        <p className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm">
                            Votre compte a bien été créé pour <strong>{registeredEmail}</strong>.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Vous pouvez maintenant vous connecter depuis votre application.
                        </p>
                    </div>
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <Input
                                autoComplete="email"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="vous@exemple.fr"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                maxLength={254}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                autoComplete="new-password"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="12 caractères minimum"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                minLength={12}
                                maxLength={72}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                            <Input
                                autoComplete="new-password"
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                placeholder="Répétez votre mot de passe"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                minLength={12}
                                maxLength={72}
                                required
                            />
                        </div>

                        {error && (
                            <p
                                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
                        </Button>
                    </form>
                )}
            </section>
        </main>
    )
}
