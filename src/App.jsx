import React, { useState, useEffect, useMemo } from "react";
import { PRODUCTS_DATA } from "./data/products";
import ProductList from "./components/ProductList.jsx";
import ProductGrid from "./components/ProductGrid.jsx";

const ITEMS_PER_PAGE = 10;

function App() {
  const [products] = useState(PRODUCTS_DATA);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset page on search
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 🔹 Optimized filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  // 🔹 Pagination logic
  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

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
          <ProductList products={paginatedProducts} />
        ) : (
          <ProductGrid products={paginatedProducts} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <p className="mt-4 text-sm text-gray-600">
          Showing {paginatedProducts.length} of{" "}
          {filteredProducts.length} products
        </p>
      </div>
    </div>
  );
}

export default App;
