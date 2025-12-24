import React from "react";

function ProductList({ products }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-sm">{product.id}</td>
              <td className="px-4 py-3 text-sm">{product.name}</td>
              <td className="px-4 py-3 text-sm">₹{product.price}</td>
              <td className="px-4 py-3 text-sm">{product.category}</td>
              <td className="px-4 py-3 text-sm">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
