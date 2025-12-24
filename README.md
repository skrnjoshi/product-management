# Product Management Application

A React-based product management application that allows users to view, search, add, edit, and delete products. The application supports both list and grid views, pagination, and debounced search, with all data managed in memory.

---

## Features

- List view (table layout)
- Grid view (card layout)
- Toggle between list and grid views
- Search products by name with 500ms debounce
- Add new products
- Edit existing products
- Delete products with confirmation
- Pagination
- Responsive UI
- In-memory state management (no backend)

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)

---

## Project Structure

src/
├── components/
│ ├── ProductList.jsx
│ ├── ProductGrid.jsx
│ └── ProductFormModal.jsx
├── data/
│ └── products.js
├── App.jsx
└── main.jsx

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

---

### Installation

```bash
git clone https://github.com/your-username/product-management.git
cd product-management
npm install
```
