import { copyFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const target = path.join(root, 'public', 'brochures');
await mkdir(target, { recursive: true });

const assets = [
  ['i-1.jpg', 'ringkasan-layanan.jpg'],
  ['i-2.jpg', 'visa-specialist.jpg'],
  ['i-3.jpg', 'tiket-pesawat.jpg'],
  ['i-4.jpg', 'visa-hotel.jpg'],
  ['i-5.jpg', 'turki.jpg'],
];

for (const [from, to] of assets) {
  const source = path.join(root, from);
  try {
    await access(source, constants.R_OK);
    await copyFile(source, path.join(target, to));
  } catch {
    // Local workspace / fresh archive may not include legacy binaries yet.
  }
}
