import React from "react";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="mt-2 font-medium">₹{product.price}</p>
          <p className="text-sm text-gray-500">
            Stock: {product.stock}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
