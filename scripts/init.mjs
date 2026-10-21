import { randomBytes } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function createIfMissing(relativePath, makeContents) {
    const target = path.join(root, relativePath)
    try {
        await readFile(target)
        console.log(`Conservé ${relativePath}`)
        return
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
    }

    const contents = await makeContents()
    await writeFile(target, contents, { flag: 'wx', mode: 0o600 })
    console.log(`Créé ${relativePath}`)
}

async function ensureJwtSecret() {
    const target = path.join(root, 'backend/.env')
    const current = await readFile(target, 'utf8')
    const secretSetting = /^JWT_SECRET=(.*)$/m
    const existingSetting = current.match(secretSetting)

    if (existingSetting?.[1].trim()) {
        return
    }

    const secret = randomBytes(48).toString('base64url')
    const updated = existingSetting
        ? current.replace(secretSetting, `JWT_SECRET=${secret}`)
        : `${current.trimEnd()}\nJWT_SECRET=${secret}\n`
    await writeFile(target, updated)
    console.log('Généré JWT_SECRET car il était absent ou vide.')
}

await createIfMissing('backend/.env', async () => {
    const example = await readFile(path.join(root, 'backend/.env.example'), 'utf8')
    if (!/^JWT_SECRET=.*$/m.test(example)) {
        throw new Error('backend/.env.example doit déclarer JWT_SECRET')
    }

    return example.replace(
        /^JWT_SECRET=.*$/m,
        `JWT_SECRET=${randomBytes(48).toString('base64url')}`
    )
})
await ensureJwtSecret()

await createIfMissing('frontend/.env', () =>
    readFile(path.join(root, 'frontend/.env.example'), 'utf8')
)
