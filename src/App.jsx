import React, { useState } from "react";
import { PRODUCTS_DATA } from "./data/products";
import ProductList from "./components/ProductList"

function App() {
  const [products] = useState(PRODUCTS_DATA);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Product Management
        </h1>

        <ProductList products={products} />

        <p className="mt-4 text-sm text-gray-600">
          Total Products: {products.length}
        </p>
      </div>
    </div>
  );
}

export default App;
