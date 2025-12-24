import React from 'react';

function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {products.map((product) => (
        <div key={product.id} className='bg-white p-4 rounded shadow-sm border'>
          {/* Name */}
          <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>

          {/* Price */}
          <p className='text-xl font-bold text-gray-900 mb-3'>
            ₹{product.price}
          </p>

          {/* Category + Stock */}
          <div className='text-sm text-gray-600 space-y-1 mb-3'>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock} units</p>
          </div>

          {/* Description */}
          {product.description && (
            <p className='text-sm text-gray-700 mb-3'>{product.description}</p>
          )}

          {/* Status */}
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded mb-3 ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? 'Active' : 'Out of Stock'}
          </span>

          {/* Actions */}
          <div className='flex gap-3 mt-3'>
            <button
              onClick={() => onEdit(product)}
              className='text-blue-500 text-sm hover:underline'
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(product.id)}
              className='text-red-500 text-sm hover:underline'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
