import React, { useEffect, useState } from 'react';

function ProductFormModal({ isOpen, onClose, onSave, editingProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
      });
    }
  }, [editingProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      setError('Name, price and category are required');
      return;
    }

    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
    });

    setError('');
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </h2>

        {error && <p className='mb-2 text-sm text-red-500'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-3'>
          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type='number'
            className='w-full border px-3 py-2 rounded'
            placeholder='Price'
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          <input
            className='w-full border px-3 py-2 rounded'
            placeholder='Category'
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <input
            type='number'
            className='w-full border px-3 py-2 rounded'
            placeholder='Stock'
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />

          <textarea
            className='w-full border px-3 py-2 rounded'
            placeholder='Description (optional)'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className='flex gap-2 pt-3'>
            <button
              type='submit'
              className='flex-1 bg-blue-500 text-white py-2 rounded'
            >
              Save
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-200 py-2 rounded'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
