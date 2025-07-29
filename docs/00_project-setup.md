# React Interactive Google Maps POC - Setup Guide

This document outlines the steps to set up and run the React Interactive Google Maps Proof of Concept project.

## Initial Project Setup

1. Create a new React project using Create React App with the TypeScript template:

   ```bash
   npx create-react-app react19-ts-google-maps-poc --template typescript
   ```

   This command will:

   - Create a new React app in `/home/ahmed/Documents/React_JS/react19-ts-google-maps-poc`
   - Install packages (react, react-dom, and react-scripts with cra-template-typescript)
   - Add 1323 packages
   - Initialize a git repository
   - Install template dependencies using npm (add 21 packages, remove 1 package, change 2 packages)
   - Detect TypeScript in the project and create a tsconfig.json file
   - Populate tsconfig.json with default values
   - Remove the template package
   - Create an initial git commit

   **Note:** The setup may show 9 vulnerabilities (3 moderate, 6 high). To address these issues, you can run:

   ```bash
   npm audit fix --force
   ```

2. Navigate to the project directory:

   ```bash
   cd react19-ts-google-maps-poc
   ```

   ```bash
   code .
   ```

3. Available Scripts:

   - `npm start`: Starts the development server
   - `npm run build`: Bundles the app into static files for production
   - `npm test`: Starts the test runner
   - `npm run eject`: Removes this tool and copies build dependencies, configuration files and scripts into the app directory (one-way operation)

4. Clean up the initial project structure:
   - In `src/App.tsx`:
     - Remove the default logo import
     - Clear the default content in the App component
     - Keep only the basic component structure
   - In `src/App.css`:
     - Remove the default styling and App logo animation
     - Keep only the necessary styles
   - In `src/index.tsx`:
     - Keep the React and ReactDOM imports
     - Keep the App component import
     - Keep the root rendering logic
   - Files to keep:
     - `src/index.tsx` - The application entry point
     - `src/App.tsx` - The main App component
     - `src/App.css` - Main application styles
     - `src/index.css` - Global styles
     - `src/react-app-env.d.ts` - TypeScript declarations for Create React App
     - `tsconfig.json` - TypeScript configuration
     - `public/index.html` - HTML template
   - Files that can be removed:
     - `src/logo.svg` - Default CRA logo
     - `src/App.test.tsx` - Default test file
     - `src/setupTests.ts` - Test configuration
     - `src/reportWebVitals.ts` - Performance measuring
     - `public/logo192.png` and `public/logo512.png` - Default icons

## Project Structure

The project follows a standard React application structure:

```plaintext
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.css
│   ├── index.tsx
│   └── react-app-env.d.ts
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Running the Application

1. Install all dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Notes

- Make sure you have Node.js and npm installed on your system
- You'll need to obtain a Google Maps API key to use the maps functionality
- The project uses React with TypeScript from Create React App TypeScript template
- TypeScript configuration is automatically set up with tsconfig.json
- Initial setup may show some npm funding requests and vulnerabilities
  - Run `npm audit fix --force` to address vulnerabilities if needed
- A git repository is automatically initialized with an initial commit
