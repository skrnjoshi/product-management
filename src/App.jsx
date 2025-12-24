import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS_DATA } from './data/products';
import ProductList from './components/ProductList.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductFormModal from './components/ProductFormModal.jsx';
import { Search, List, Grid, Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

function App() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...product } : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-900'>
          Product Management
        </h1>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6'>
          {/* Search */}
          <div className='relative w-full sm:w-72'>
            <Search
              size={18}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* View Toggle */}
          <div className='flex gap-2'>
            <button
              onClick={() => setView('list')}
              className={`p-3 rounded-lg ${
                view === 'list'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              title='List View'
            >
              <List size={18} />
            </button>

            <button
              onClick={() => setView('grid')}
              className={`p-3 rounded-lg ${
                view === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              title='Grid View'
            >
              <Grid size={18} />
            </button>
          </div>

          {/* Add Product */}
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600'
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {view === 'list' ? (
          <ProductList
            products={paginatedProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowModal(true);
            }}
            onDelete={handleDeleteProduct}
          />
        ) : (
          <ProductGrid
            products={paginatedProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowModal(true);
            }}
            onDelete={handleDeleteProduct}
          />
        )}

        {totalPages > 1 && (
          <div className='flex justify-center gap-2 mt-6'>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>
        )}

        <p className='mt-4 text-sm text-gray-600'>
          Showing {paginatedProducts.length} of {filteredProducts.length}{' '}
          products
        </p>

        <ProductFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
}

export default App;
