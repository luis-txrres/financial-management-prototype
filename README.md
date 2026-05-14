** Used Claude to generate this README just for easier build understanding and under time constraints **

# Financial Management Prototype

A financial management web app prototype built with React, Vite, Tailwind CSS, and shadcn/ui. Originally designed in Figma.

## Features

- 📊 Dashboard with financial overview
- 💳 Accounts management
- 💸 Transaction tracking
- 📁 Budget management & alerts
- 🎯 Savings goals

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- [React Router v7](https://reactrouter.com/)
- [Recharts](https://recharts.org/)
- [MUI Icons](https://mui.com/material-ui/material-icons/)

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/financial-management-prototype.git
cd financial-management-prototype

# Install dependencies (using pnpm, recommended)
pnpm install

# Or with npm
npm install
```

### Running the dev server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for production

```bash
pnpm build
# or
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── figma/       # Figma-specific helpers
│   │   ├── Layout.tsx
│   │   └── Toaster.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Accounts.tsx
│   │   ├── Transactions.tsx
│   │   ├── Budgets.tsx
│   │   ├── BudgetAlert.tsx
│   │   ├── Goals.tsx
│   │   └── Login.tsx
│   ├── App.tsx
│   └── routes.tsx
├── styles/
│   ├── tailwind.css
│   ├── theme.css
│   ├── fonts.css
│   ├── globals.css
│   └── index.css
└── main.tsx
```

## License

This project is private and for prototyping purposes.
