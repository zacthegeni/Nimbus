# Nimbus

Nimbus is a minimal yet delightful note‑taking application built with Electron and React. Notes are stored locally in a SQLite database and edited with a live Markdown preview.

## Installation & Usage

### Development

```bash
npm install
npm run dev        # starts Vite and Electron
```

### Building

```bash
npm run build      # builds renderer and packages app
```

### Running Tests

```bash
npm test           # unit tests
npm run test:e2e   # Playwright end‑to‑end tests
```

### Installing

The packaged files are output to the `dist/` directory.

- **macOS**: open the `.dmg` and drag Nimbus to Applications.
- **Windows**: run the generated `.exe` installer.
- **Linux**: make the `.AppImage` executable and run it.
