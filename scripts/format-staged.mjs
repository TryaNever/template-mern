import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const stagedResult = spawnSync(
    'git',
    ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'],
    { encoding: 'utf8' }
)

if (stagedResult.status !== 0) {
    process.exit(stagedResult.status ?? 1)
}

const supportedExtensions = new Set([
    '.cjs',
    '.css',
    '.html',
    '.js',
    '.jsx',
    '.json',
    '.md',
    '.mjs',
    '.yml',
    '.yaml',
])
const files = stagedResult.stdout
    .split('\0')
    .filter(Boolean)
    .filter((file) => supportedExtensions.has(file.slice(file.lastIndexOf('.'))))

if (files.length === 0) {
    process.exit(0)
}

const prettier = 'node_modules/.bin/prettier'
if (existsSync(prettier)) {
    const formatted = spawnSync(prettier, ['--write', ...files], { stdio: 'inherit' })
    if (formatted.status !== 0) {
        process.exit(formatted.status ?? 1)
    }

    const staged = spawnSync('git', ['add', '--', ...files], { stdio: 'inherit' })
    if (staged.status !== 0) {
        process.exit(staged.status ?? 1)
    }
}

const backendFiles = files.filter((file) => file.startsWith('backend/src/') && file.endsWith('.js'))
for (const file of backendFiles) {
    const checked = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' })
    if (checked.status !== 0) {
        process.exitCode = checked.status ?? 1
    }
}

if (!existsSync(prettier)) {
    console.log('Prettier indisponible : formatage ignoré.')
}
