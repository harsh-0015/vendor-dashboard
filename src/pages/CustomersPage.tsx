import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, ShoppingBag, X, DollarSign, Users, TrendingUp, Star, Clock } from 'lucide-react';

const CustomersPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main St, New York, NY 10001',
      status: 'active',
      totalOrders: 45,
      totalSpent: 12450,
      avgOrderValue: 276.67,
      registrationDate: '2024-01-15',
      lastPurchase: '2024-10-20',
      isReturning: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      status: 'active',
      type: 'Regular',
      totalOrders: 23,
      totalSpent: 5670,
      avgOrderValue: 246.52,
      registrationDate: '2024-03-22',
      lastPurchase: '2024-10-25',
      isReturning: true
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+1 234 567 8902',
      address: '789 Pine Rd, Chicago, IL 60601',
      status: 'inactive',
      type: 'Regular',
      totalOrders: 12,
      totalSpent: 3240,
      avgOrderValue: 270,
      registrationDate: '2024-02-10',
      lastPurchase: '2024-08-15',
      isReturning: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    status: 'active',
    type: 'Regular',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
      status: formData.status,
      type: formData.type,
      totalOrders: 0,
      totalSpent: 0,
      avgOrderValue: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      lastPurchase: '-',
      isReturning: false
    };
    setCustomers([...customers, newCustomer]);
    setShowAddModal(false);
    setFormData({
      name: '', email: '', phone: '', address: '', city: '', state: '',
      postalCode: '', country: '', status: 'active', type: 'Regular', notes: ''
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const returningCustomers = customers.filter(c => c.isReturning).length;
  const newCustomersThisMonth = customers.filter(c => {
    const regDate = new Date(c.registrationDate);
    const currentDate = new Date();
    return regDate.getMonth() === currentDate.getMonth() && 
           regDate.getFullYear() === currentDate.getFullYear();
  }).length;
  const avgOrderValue = customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6"> 
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Customers</h1>
        <p className="text-gray-600">Manage your customer database</p>
      </div>

      {/* Stats Cards - Enhanced Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Customers</p>
          <p className="text-3xl font-bold text-gray-800">{totalCustomers}</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Returning Customers */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Returning Customers</p>
          <p className="text-3xl font-bold text-gray-800">{returningCustomers}</p>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>{((returningCustomers / totalCustomers) * 100).toFixed(0)}% of total</span>
          </div>
        </div>

        {/* New Customers This Month */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">New This Month</p>
          <p className="text-3xl font-bold text-gray-800">{newCustomersThisMonth}</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+8% growth rate</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-800">${avgOrderValue.toFixed(0)}</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+5% from last month</span>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Satisfaction Rate</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold text-gray-800">4.8</p>
            <span className="text-gray-400 text-sm">/5.0</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>Based on 247 reviews</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center gap-2 font-medium transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Purchase</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-11 h-11 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">ID: #{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        customer.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{customer.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">${customer.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {customer.lastPurchase}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Customer</h2>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddCustomer} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea 
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
