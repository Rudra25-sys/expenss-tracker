# CSS Module Organization

This project uses a modular CSS approach with separate stylesheets for each component for better maintainability and organization.

## CSS Files Structure

### `/styles/global.css`
**Purpose:** Global styles and general layout components
**Includes:**
- Global reset styles
- Sidebar styling
- Main layout
- Dashboard cards
- Charts
- Buttons
- Forms
- Tables
- Hero sections
- Features sections
- Footer

### `/styles/Auth.css`
**Purpose:** Login and Register page styling
**Components:**
- Login page (login.jsx)
- Register page (register.jsx)
**Includes:**
- Form containers
- Input fields with focus states
- Submit buttons
- Link buttons
- Animations

### `/styles/Income.css`
**Purpose:** Income page specific styling
**Components:**
- Income page (income.jsx)
**Includes:**
- Income container styling
- Income total card
- Category list and tags
- Add income button
- Income list items
- Income amounts display

### `/styles/Expense.css`
**Purpose:** Expense page specific styling
**Components:**
- Expense page (expenss.jsx)
**Includes:**
- Expense container styling
- Expense total card
- Category list and tags
- Add expense button
- Expense list items
- Expense amounts display

### `/styles/Reports.css`
**Purpose:** Reports page specific styling
**Components:**
- Reports page (report.jsx)
**Includes:**
- Report header
- Report cards (income, expense, savings, spending rate)
- Report boxes (analysis sections)
- Progress bars
- Income vs Expense charts
- Savings analysis styling
- Trend indicators

### `/styles/Dashboard.css`
**Purpose:** Dashboard page specific styling
**Components:**
- Dashboard page (dashboard.jsx)
**Includes:**
- Dashboard summary cards
- Chart containers
- Dashboard-specific layouts
- Cards styling

### `/styles/Navbar.css`
**Purpose:** Navigation bar styling
**Components:**
- Navbar (if implemented separately)
**Includes:**
- Navigation styling
- Menu items
- Active states
- Responsive menu

### `/styles/Home.css`
**Purpose:** Home page specific styling
**Components:**
- Home page (home.jsx)
**Includes:**
- Hero section
- Features section
- Call-to-action section
- Hero content
- Hero images

### `/styles/Profile.css`
**Purpose:** User profile page styling
**Components:**
- Profile page (profile.jsx)
**Includes:**
- Profile container
- Profile card
- Profile header with avatar
- Profile details and stats
- Profile action buttons

### `/index.css` (Legacy)
**Status:** DEPRECATED - Use individual CSS modules instead

## How to Import CSS in Components

Each component should import its corresponding CSS file at the top:

```jsx
import "./styles/ComponentName.css";
```

### Examples:

**Login Component:**
```jsx
import { useState } from "react";
import "./styles/Auth.css";
```

**Income Component:**
```jsx
import { useEffect, useState } from "react";
import "./styles/Income.css";
```

**Dashboard Component:**
```jsx
import { useEffect, useState } from "react";
import "./styles/Dashboard.css";
```

## Responsive Design

All CSS modules include responsive breakpoints:

- **Desktop:** Default styling (1200px+)
- **Tablet:** `@media (max-width: 992px)`
- **Mobile:** `@media (max-width: 768px)`
- **Small Mobile:** `@media (max-width: 480px)`

## Color Scheme

- **Primary Blue:** #0d6efd
- **Primary Green:** #16a34a
- **Primary Red:** #dc2626
- **Primary Purple:** #7c3aed
- **Primary Orange:** #ea580c
- **Dark Background:** #111827
- **Light Background:** #f4f6f9

## Animations

Common animations used across modules:
- `slideIn` - Slide in from bottom
- `slideDown` - Slide down from top
- `slideUp` - Slide up from bottom
- `fadeIn` - Fade in effect
- `bounce` - Bouncing animation

## Best Practices

1. **Keep CSS Modular:** Each component has its own CSS file
2. **Use Consistent Naming:** Follow BEM or component-based naming
3. **Mobile First:** Write mobile styles first, then add desktop enhancements
4. **Reuse Colors:** Use consistent color scheme from global.css
5. **Animations:** Use smooth transitions (0.3s ease is standard)
6. **Responsive:** Always include mobile, tablet, and desktop breakpoints

## Migration Guide

If you still see imports from `index.css`:

1. Replace `import "./index.css"` with component-specific CSS import
2. Use the mapping above to find the correct CSS file
3. Test the component to ensure styling is applied correctly

Example:
```jsx
// OLD (Don't use)
import "./index.css";

// NEW (Use this)
import "./styles/Auth.css";
```

## Future Improvements

- Consider using CSS modules (.module.css) for scope isolation
- Implement SCSS/SASS for better organization
- Create a design system/component library
- Use CSS-in-JS solution if needed for runtime styling
