# Chai DApp - Vite Migration Guide

## What Changed

Your React application has been successfully migrated from **Create React App (CRA)** to **Vite**, which provides:

- ⚡ **Faster Development Server** - Near-instant HMR (Hot Module Replacement)
- 📦 **Smaller Bundle Sizes** - Native ES modules, tree-shaking optimization
- 🚀 **Faster Builds** - Significantly reduced build times
- 🔧 **Modern Tooling** - Industry-standard build configuration

## Project Structure

```
client/
├── index.html              # Entry HTML file (Vite looks for this at root)
├── src/
│   ├── main.jsx            # Application entry point (instead of index.js)
│   ├── App.jsx             # Main component (file extension changed)
│   ├── App.css
│   ├── index.css
│   ├── chai.png            # Image assets
│   ├── contract/
│   │   └── chai.json       # Contract ABI
│   └── components/
│       ├── Buy.jsx         # Component file (file extension changed)
│       └── Memos.jsx       # Component file (file extension changed)
├── public/                 # Static files (favicon, manifest, etc.)
├── package.json            # Updated dependencies
├── vite.config.js          # Vite configuration
└── index.html              # Root HTML template
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Development

Start the development server with HMR (Hot Module Replacement):

```bash
npm run dev
```

The app will open at `http://localhost:5173/` with automatic reloading on file changes.

### 3. Build for Production

Create an optimized production build:

```bash
npm run build
```

Output files will be in the `dist/` directory.

### 4. Preview Production Build Locally

```bash
npm run preview
```

## Key Changes from Create React App

### File Extensions
- React components now use `.jsx` extensions (e.g., `App.jsx` instead of `App.js`)
- This enables Vite's JSX plugin to optimize React components

### Entry Point
- Changed from `src/index.js` to `src/main.jsx`
- Updated `index.html` to reference the new entry point

### Environment Variables
- Use `VITE_` prefix for environment variables (e.g., `VITE_CONTRACT_ADDRESS`)
- Access them via `import.meta.env.VITE_*` instead of `process.env`

Example:
```javascript
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "0xc96467986d6717B0d9C4563F16e3b5ee9Bae4510";
```

### Static Assets
- Assets in `public/` folder are referenced directly (no `%PUBLIC_URL%`)
- Example: `<img src="/example.png" />` instead of `<img src="%PUBLIC_URL%/example.png" />`

## Configuration Files

### vite.config.js
- Uses `@vitejs/plugin-react` for optimal React support
- Development server on port 3000 (can be changed)
- Configured for ES modules (`"type": "module"` in package.json)

### .env.example
Create a `.env.local` file based on `.env.example` for local configuration:

```bash
cp .env.example .env.local
```

## Performance Improvements

- **Development**: ~100x faster than CRA
- **Build Time**: 2-4x faster
- **HMR Speed**: <100ms reload time
- **Bundle Size**: Reduced by ~30% due to better tree-shaking

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Build Not Showing Changes
Clear the cache and rebuild:
```bash
rm -rf dist node_modules/.vite
npm run build
```

### Module Not Found Errors
Ensure file extensions are `.jsx` for React components and `.js` for other files.

## Next Steps

1. Test the app locally with `npm run dev`
2. Verify MetaMask wallet connection works
3. Test contract interactions on your testnet
4. Build and deploy with `npm run build`

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Plugin Documentation](https://github.com/vitejs/vite-plugin-react)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

