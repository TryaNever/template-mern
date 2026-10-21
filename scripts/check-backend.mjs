import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

async function collectJavaScriptFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    const nested = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(directory, entry.name)
            if (entry.isDirectory()) {
                return collectJavaScriptFiles(fullPath)
            }

            return entry.isFile() && entry.name.endsWith('.js') ? [fullPath] : []
        })
    )

    return nested.flat()
}

const files = await collectJavaScriptFiles(path.resolve('src'))
let hasErrors = false

for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' })
    if (result.status !== 0) {
        hasErrors = true
    }
}

if (hasErrors) {
    process.exitCode = 1
} else {
    console.log(`Syntaxe backend valide (${files.length} fichiers JavaScript)`)
}
