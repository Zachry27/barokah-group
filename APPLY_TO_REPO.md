# Repository integration notes

Target repository: `Zachry27/barokah-group`
Target branch: `feat/premium-rebuild`

This rebuild is intended to replace the legacy static `index.html` implementation on the feature branch only. Do not merge to `main` until review is complete.

The existing brochure binaries `i-1.jpg` through `i-5.jpg` are intentionally retained at the repository root. `predev` and `prebuild` copy those files into `public/brochures` with descriptive filenames.

Verification commands:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

GitHub Actions also runs the same verification flow on pushes to `feat/premium-rebuild`.
