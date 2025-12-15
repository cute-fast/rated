import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IndexingStatus {
  elasticsearch_available: boolean;
  message?: string;
  products?: {
    indexed: number;
    total_in_database: number;
    complete: boolean;
    needs_indexing: boolean;
  };
  categories?: {
    indexed: number;
    total_in_database: number;
    complete: boolean;
    needs_indexing: boolean;
  };
}

interface IndexingResult {
  message: string;
  results: {
    products: {
      indexed: number;
      success: boolean;
      error: string | null;
    };
    categories: {
      indexed: number;
      success: boolean;
      error: string | null;
    };
  };
}

export default function IndexingManager() {
  const [status, setStatus] = useState<IndexingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [indexProducts, setIndexProducts] = useState(true);
  const [indexCategories, setIndexCategories] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://3.91.202.144:8000';

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    setFeedback(null);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/indexing/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(res.data);
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error fetching indexing status');
      setStatus(null);
    }
    setLoading(false);
  };

  const handleStartIndexing = async () => {
    setIndexing(true);
    setFeedback(null);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post<IndexingResult>(
        `${API_BASE_URL}/api/admin/indexing/start`,
        {
          index_products: indexProducts,
          index_categories: indexCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = res.data;
      const messages: string[] = [result.message];
      
      if (indexProducts) {
        if (result.results.products.success) {
          messages.push(`Products: ${result.results.products.indexed} indexed successfully`);
        } else {
          messages.push(`Products: Failed - ${result.results.products.error || 'Unknown error'}`);
        }
      }

      if (indexCategories) {
        if (result.results.categories.success) {
          messages.push(`Categories: ${result.results.categories.indexed} indexed successfully`);
        } else {
          messages.push(`Categories: Failed - ${result.results.categories.error || 'Unknown error'}`);
        }
      }

      setFeedback(messages.join('\n'));
      
      // Refresh status after indexing
      await fetchStatus();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error starting indexing');
    }
    setIndexing(false);
  };

  const handleClearAllIndexes = async () => {
    if (!confirm('Are you sure you want to delete ALL indexes? This cannot be undone.')) {
      return;
    }

    setClearing(true);
    setFeedback(null);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/admin/indexing/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedback(
        `All indexes cleared successfully!\nProducts deleted: ${res.data.products_deleted}\nCategories deleted: ${res.data.categories_deleted}`
      );
      
      // Refresh status after clearing
      await fetchStatus();
    } catch (e: any) {
      setFeedback(e.response?.data?.detail || 'Error clearing indexes');
    }
    setClearing(false);
  };

  const getStatusBadge = (complete: boolean | undefined) => {
    if (complete === undefined) return null;
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          complete
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {complete ? 'Complete' : 'Needs Indexing'}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search Indexing Manager</h1>
        <button
          onClick={fetchStatus}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
          disabled={loading || indexing}
        >
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>

      {feedback && (
        <div
          className={`mb-4 p-4 rounded ${
            feedback.includes('Error') || feedback.includes('Failed')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
          style={{ whiteSpace: 'pre-line' }}
        >
          {feedback}
        </div>
      )}

      {loading && !status ? (
        <div className="bg-white rounded shadow p-6 text-center">Loading status...</div>
      ) : !status ? (
        <div className="bg-white rounded shadow p-6">
          <p className="text-gray-600">Unable to load indexing status.</p>
        </div>
      ) : !status.elasticsearch_available ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded shadow p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Elasticsearch Not Available</h2>
          <p className="text-yellow-700">{status.message || 'Elasticsearch is not configured or unavailable.'}</p>
        </div>
      ) : (
        <>
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Products Status */}
            <div className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                {getStatusBadge(status.products?.complete)}
              </div>
              {status.products && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Indexed:</span>
                    <span className="font-semibold">{status.products.indexed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total in Database:</span>
                    <span className="font-semibold">{status.products.total_in_database.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status.products.complete ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{
                          width: `${status.products.total_in_database > 0 
                            ? (status.products.indexed / status.products.total_in_database) * 100 
                            : 0}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {status.products.total_in_database > 0
                        ? `${Math.round((status.products.indexed / status.products.total_in_database) * 100)}% indexed`
                        : 'No products in database'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Status */}
            <div className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                {getStatusBadge(status.categories?.complete)}
              </div>
              {status.categories && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Indexed:</span>
                    <span className="font-semibold">{status.categories.indexed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total in Database:</span>
                    <span className="font-semibold">{status.categories.total_in_database.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status.categories.complete ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{
                          width: `${status.categories.total_in_database > 0 
                            ? (status.categories.indexed / status.categories.total_in_database) * 100 
                            : 0}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {status.categories.total_in_database > 0
                        ? `${Math.round((status.categories.indexed / status.categories.total_in_database) * 100)}% indexed`
                        : 'No categories in database'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Start Indexing Section */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Start Indexing</h2>
            <p className="text-gray-600 mb-4">
              Select what you want to index into Elasticsearch. This process may take some time depending on the amount of data.
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={indexProducts}
                  onChange={(e) => setIndexProducts(e.target.checked)}
                  disabled={indexing || clearing}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-700">Index Products</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={indexCategories}
                  onChange={(e) => setIndexCategories(e.target.checked)}
                  disabled={indexing || clearing}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-700">Index Categories</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleStartIndexing}
                disabled={indexing || clearing || (!indexProducts && !indexCategories)}
                className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                {indexing ? 'Indexing...' : 'Start Indexing'}
              </button>
              
              <button
                onClick={handleClearAllIndexes}
                disabled={indexing || clearing}
                className="px-6 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
              >
                {clearing ? 'Clearing...' : 'Clear All Indexes'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

