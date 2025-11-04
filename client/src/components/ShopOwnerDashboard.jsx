import React, { useState, useEffect } from 'react'
import ShopProfile from './shopowner/ShopProfile'
import AddProductModal from './products/AddProductModal'
import axios from '../utils/axios'

export default function ShopOwnerDashboard({ user, activeTab }) {
  const [profile, setProfile] = useState(null)
  const [lastSavedProfile, setLastSavedProfile] = useState(null)
  function onProfileChange(obj) {
    setProfile(obj)
  }

  useEffect(() => {
    if (profile && profile.shopName && profile.mobile && profile.address && profile.ownerName) {
      setLastSavedProfile(profile)
    }
  }, [profile])

  // Tab content rendering

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState('');

  async function fetchProducts() {
    if (!profile || !profile.id) return;
    setLoadingProducts(true);
    setErrorProducts('');
    try {
      const API_BASE = 'http://localhost:4000';
      const { data } = await axios.get(`${API_BASE}/api/products`, { params: { shopId: profile.id } });
      setProducts(data);
    } catch (e) {
      setErrorProducts('Could not load products');
    } finally {
      setLoadingProducts(false);
    }
  }

  useEffect(() => {
    if ((activeTab === 'products' || activeTab === 'sales') && profile && profile.id) {
      fetchProducts();
    }
    // eslint-disable-next-line
  }, [activeTab, profile && profile.id]);
  console.log(profile)

  async function handleAddProduct(product) {
    try {
      const API_BASE = 'http://localhost:4000';
      const payload = { shopId: profile.id, ...product };
      const res = await axios.post(`${API_BASE}/api/products`, payload);
      await fetchProducts();
    } catch (e) {
      if (e.response) {
        alert('Failed to add product: ' + (e.response.data.error || 'Unknown error'));
      } else {
        alert('Failed to add product');
      }
    }
  }

  async function handleDeleteProduct(productId) {
    if (!window.confirm('Delete this product?')) return;
    try {
      const API_BASE = 'http://localhost:4000';
      await axios.delete(`${API_BASE}/api/products/${productId}`);
      await fetchProducts();
    } catch (e) {
      alert('Failed to delete product');
    }
  }

  async function handleEditProduct(product) {
    setEditProduct(product);
  }

  async function handleUpdateProduct(updated) {
    try {
      const API_BASE = 'http://localhost:4000';
      // Ensure numeric fields are numbers
      const payload = {
        productName: updated.productName,
        price: Number(updated.price),
        discount: Number(updated.discount) || 0,
        cgst: Number(updated.cgst) || 0,
        sgst: Number(updated.sgst) || 0,
      };
      await axios.put(`${API_BASE}/api/products/${editProduct.id}`, payload);
      setEditProduct(null);
      await fetchProducts();
    } catch (e) {
      alert('Failed to update product');
    }
  }

  function renderTabContent() {
    switch (activeTab) {
      case 'profile':
        return (
          <ShopProfile
            onProfileChange={onProfileChange}
            user={user}
            lastSavedProfile={lastSavedProfile}
          />
        );
      case 'products':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 bg-amber-500 text-white rounded-md"
                onClick={() => setShowAddProduct(true)}
              >
                Add Product
              </button>
            </div>
            {loadingProducts ? (
              <div>Loading products...</div>
            ) : errorProducts ? (
              <div className="text-red-600">{errorProducts}</div>
            ) : (
              <div>
                {products.length === 0 ? (
                  <div>No products added yet.</div>
                ) : (
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-slate-700">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Discount (%)</th>
                        <th className="p-2 border">CGST (%)</th>
                        <th className="p-2 border">SGST (%)</th>
                        <th className="p-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td className="p-2 border">{p.productName}</td>
                          <td className="p-2 border">{p.price}</td>
                          <td className="p-2 border">{p.discount}</td>
                          <td className="p-2 border">{p.cgst}</td>
                          <td className="p-2 border">{p.sgst}</td>
                          <td className="p-2 border">
                            <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded mr-2" onClick={() => handleEditProduct(p)}>Edit</button>
                            <button className="px-2 py-1 text-xs bg-red-500 text-white rounded" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            <AddProductModal
              open={showAddProduct}
              onClose={() => setShowAddProduct(false)}
              onAdd={handleAddProduct}
            />
            {editProduct && (
              <AddProductModal
                open={true}
                onClose={() => setEditProduct(null)}
                onAdd={handleUpdateProduct}
                initial={editProduct}
              />
            )}
          </div>
        );
      case 'sales':
        return <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">Sales tab (placeholder)</div>;
      case 'cashiers':
        return <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">Cashiers tab (placeholder)</div>;
      case 'landing':
        return <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">Shop Landing Page tab (placeholder)</div>;
      default:
        return null;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop Owner Dashboard</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">Signed in as {user.email}</div>
      </div>
      {renderTabContent()}
    </div>
  )
}
