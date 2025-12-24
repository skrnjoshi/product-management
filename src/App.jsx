import React, { useState } from "react";
import { PRODUCTS_DATA } from "./data/products";
import ProductList from "./components/ProductList.jsx";
import ProductGrid from "./components/ProductGrid.jsx";

function App() {
  const [products] = useState(PRODUCTS_DATA);
  const [view, setView] = useState("list");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Product Management
        </h1>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            List View
          </button>

          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Grid View
          </button>
        </div>

        {view === "list" ? (
          <ProductList products={products} />
        ) : (
          <ProductGrid products={products} />
        )}

        <p className="mt-4 text-sm text-gray-600">
          Total Products: {products.length}
        </p>
      </div>
    </div>
  );
}

export default App;
