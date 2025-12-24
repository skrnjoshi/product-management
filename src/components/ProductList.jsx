import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
      <table className='w-full border-collapse'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-3 text-left text-sm font-medium'>ID</th>
            <th className='px-4 py-3 text-left text-sm font-medium'>Name</th>
            <th className='px-4 py-3 text-left text-sm font-medium'>Price</th>
            <th className='px-4 py-3 text-left text-sm font-medium'>
              Category
            </th>
            <th className='px-4 py-3 text-left text-sm font-medium'>Stock</th>
            <th className='px-4 py-3 text-left text-sm font-medium'>Status</th>
            <th className='px-4 py-3 text-left text-sm font-medium'>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t hover:bg-gray-50'>
              <td className='px-4 py-3 text-sm'>{product.id}</td>
              <td className='px-4 py-3 text-sm'>{product.name}</td>
              <td className='px-4 py-3 text-sm'>₹{product.price}</td>
              <td className='px-4 py-3 text-sm'>{product.category}</td>
              <td className='px-4 py-3 text-sm'>{product.stock}</td>

              {/* Active Status */}
              <td className='px-4 py-3 text-sm'>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.stock > 0 ? 'Active' : 'Inactive'}
                </span>
              </td>

              <td className='px-4 py-3 text-sm space-x-3'>
                <button
                  onClick={() => onEdit(product)}
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(product.id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
