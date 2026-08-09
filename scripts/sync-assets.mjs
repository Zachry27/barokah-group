import { copyFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const brochureTarget = path.join(root, 'public', 'brochures');
const publicTarget = path.join(root, 'public');
await mkdir(brochureTarget, { recursive: true });
await mkdir(publicTarget, { recursive: true });

const brochureAssets = [
  ['i-1.jpg', 'ringkasan-layanan.jpg'],
  ['i-2.jpg', 'visa-specialist.jpg'],
  ['i-3.jpg', 'tiket-pesawat.jpg'],
  ['i-4.jpg', 'visa-hotel.jpg'],
  ['i-5.jpg', 'turki.jpg'],
];

for (const [from, to] of brochureAssets) {
  const source = path.join(root, from);
  try {
    await access(source, constants.R_OK);
    await copyFile(source, path.join(brochureTarget, to));
  } catch {
    // A fresh archive may not include legacy binaries until it is integrated into the repository.
  }
}

try {
  const background = path.join(root, 'bg.jpg');
  await access(background, constants.R_OK);
  await copyFile(background, path.join(publicTarget, 'bg.jpg'));
} catch {
  // Keep the build working even when the optional legacy background is unavailable locally.
}
