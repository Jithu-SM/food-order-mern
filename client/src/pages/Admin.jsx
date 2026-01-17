import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function Admin({ setView }) {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      setView('home');
    }
  }, [isAdmin, setView]);

  // Load data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const endpoint = activeTab === 'restaurants' ? '/restaurants' : '/foods';
      const response = await API.get(endpoint);
      setData(response.data || []);
    } catch (err) {
      console.error(`Failed to fetch ${activeTab}:`, err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = activeTab === 'restaurants' ? `/restaurants/${id}` : `/foods/${id}`;
      await API.delete(endpoint);
      setData(data.filter(item => item._id !== id));
      alert('Item deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = activeTab === 'restaurants' ? '/restaurants' : '/foods';
      
      if (editingId) {
        await API.put(`${endpoint}/${editingId}`, formData);
        setData(data.map(item => item._id === editingId ? { ...item, ...formData } : item));
        alert('Item updated successfully');
      } else {
        const response = await API.post(endpoint, formData);
        setData([...data, response.data]);
        alert('Item created successfully');
      }
      
      setShowForm(false);
      setFormData({});
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Failed to save item: ' + (err.response?.data?.message || err.message));
    }
  };

  const renderForm = () => {
    if (activeTab === 'restaurants') {
      return (
        <>
          <input
            type="text"
            placeholder="Restaurant Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows="3"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </>
      );
    } else {
      return (
        <>
          <input
            type="text"
            placeholder="Food Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows="3"
          />
          <select
            value={formData.restaurantId || ''}
            onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
            className="w-full px-4 py-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Restaurant</option>
            {/* In a real app, fetch restaurants here */}
          </select>
        </>
      );
    }
  };

  const renderTable = () => {
    if (activeTab === 'restaurants') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 font-semibold">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{item.description}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item._id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.description}</p>
              <p className="font-semibold text-green-600 dark:text-green-400 mb-3">₹{item.price}</p>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center gap-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center gap-1 text-sm"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  if (loading && data.length === 0) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'restaurants'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Restaurants
          </button>
          <button
            onClick={() => setActiveTab('foods')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'foods'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Food Items
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingId ? 'Edit' : 'Add New'} {activeTab === 'restaurants' ? 'Restaurant' : 'Food Item'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {renderForm()}
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table/Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No {activeTab} found. Click "Add New" to create one.
            </p>
          ) : (
            renderTable()
          )}
        </div>
      </div>
    </div>
  );
}
