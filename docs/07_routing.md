# Routing System Documentation

## Introduction

This project uses **react-router-dom** for client-side routing, enabling seamless navigation between pages without full page reloads. All routes are defined in `src/App.tsx` using the `<Routes>` and `<Route>` components.

---

## Installation

If `react-router-dom` is not already installed, you can add it using npm or yarn:

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

---

## Where Are Routes Defined?

All routes are defined in:

```
src/App.tsx
```

Each page is mapped to a specific path using the `<Route />` component.

---

## Example: Defining Routes

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BasicMapPage from './pages/BasicMapPage';

<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/basic-map" element={<BasicMapPage />} />
    {/* ...other routes */}
  </Routes>
</Router>
```

---

## How to Add a New Page

### 1. Create the New Page Component
Create a new file for your page in `src/pages`.

**Command:**
```bash
# Example: create an About page
mkdir -p src/pages
cat > src/pages/AboutPage.tsx <<EOF
import React from 'react';

const AboutPage = () => (
  <div>
    <h1>About This Project</h1>
    <p>This is an about page.</p>
  </div>
);

export default AboutPage;
EOF
```

Or manually create `src/pages/AboutPage.tsx` with:
```tsx
import React from 'react';

const AboutPage = () => (
  <div>
    <h1>About This Project</h1>
    <p>This is an about page.</p>
  </div>
);

export default AboutPage;
```

### 2. Add the Route in App.tsx
Import your new page at the top:
```tsx
import AboutPage from './pages/AboutPage';
```

Add a new `<Route>` inside `<Routes>`:
```tsx
<Route path="/about" element={<AboutPage />} />
```

### 3. (Optional) Add a Navigation Link
To allow users to navigate to your new page, add a link using `<Link />` from `react-router-dom`:

```tsx
import { Link } from 'react-router-dom';
// ...
<Link to="/about">About</Link>
```

---

## Full Example: Adding a Contact Page

**1. Create the page:**
```bash
cat > src/pages/ContactPage.tsx <<EOF
import React from 'react';

const ContactPage = () => (
  <div>
    <h1>Contact Us</h1>
    <p>Contact information goes here...</p>
  </div>
);

export default ContactPage;
EOF
```

**2. Update App.tsx:**
```tsx
import ContactPage from './pages/ContactPage';

<Routes>
  {/* ...other routes */}
  <Route path="/contact" element={<ContactPage />} />
</Routes>
```

**3. Add a navigation link (e.g., in your header or menu):**
```tsx
<Link to="/contact">Contact</Link>
```

---

## Useful Commands

- **Install react-router-dom:**
  ```bash
  npm install react-router-dom
  # or
  yarn add react-router-dom
  ```
- **Create a new page file:**
  ```bash
  touch src/pages/NewPage.tsx
  ```
- **Start the development server:**
  ```bash
  npm start
  # or
  yarn start
  ```

---

## Best Practices & Notes

- Each route path should be unique and not conflict with others.
- Prefer creating a separate component for each page instead of using inline JSX in routes.
- For protected pages, you can implement Protected Route components as needed.
- Use `<Link />` or `<NavLink />` for navigation instead of `<a>` tags to avoid full page reloads.

---

## References
- [react-router-dom Documentation](https://reactrouter.com/en/main)

---

You can now easily add or modify pages using this routing system and the provided commands.