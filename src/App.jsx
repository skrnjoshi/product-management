import React, { useState } from "react";
import { PRODUCTS_DATA } from "./data/products";
import ProductList from "./components/ProductList.jsx";
import ProductGrid from "./components/ProductGrid.jsx";

function App() {
  const [products] = useState(PRODUCTS_DATA);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Basic search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Product Management
        </h1>

        {/* Search + View Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-64"
          />

          <div className="flex gap-2">
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
        </div>

        {/* Product Display */}
        {view === "list" ? (
          <ProductList products={filteredProducts} />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        <p className="mt-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>
    </div>
  );
}

export default App;
