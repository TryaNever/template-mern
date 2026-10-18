/*
    Pour utiliser ce router il suffit de import :

    import { Router } from 'express';
    const router = Router();

    puis d'ajouter des route au router

    et enfin export le router et ce router va pouvoir les recuperer et les ajouter

    export default router;
*/

import { Router } from 'express';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const files = await readdir(__dirname);

for (const file of files) {
  if (file === 'index.js' || !file.endsWith('.js')) continue;

  const module = await import(pathToFileURL(path.join(__dirname, file)));
  const route = module.default;

  if (route)
    router.use(route);
}

export default router;