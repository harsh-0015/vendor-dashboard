import React, { useState , useEffect } from 'react';
import { ArrowLeft, Save, User, MapPin, Utensils, CreditCard, Bell, FileText, Calendar, Mail, Phone, Building, AlertCircle , Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const CustomerDetailsPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address Information
    streetAddress: '',
    apartment: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressLabel: 'home',
    
    // Delivery Preferences
    preferredDeliveryTime: '',
    deliveryInstructions: '',
    contactlessDelivery: false,
    leaveAtDoor: false,
    
    // Customer Classification
    customerType: 'Regular',
    customerStatus: 'active',
    
    // Dietary Preferences
    dietaryType: '',
    foodAllergies: [],
    spiceLevel: 'medium',
    cuisinePreferences: [],
    
    // Payment Preferences
    preferredPayment: '',
    gstNumber: '',
    companyName: '',
    
    // Communication Preferences
    smsNotifications: true,
    emailNotifications: true,
    whatsappUpdates: true,
    promotionalOffers: true,
    
    // Additional Information
    preferredLanguage: 'english',
    howFoundUs: '',
    referralCode: '',
    specialNotes: ''
  });

  // NEW: addresses array & modal state & selected address id
  const [addresses, setAddresses] = useState(() => {
    // optionally load from sessionStorage if you want persistence across reloads
    try {
      return JSON.parse(sessionStorage.getItem('savedAddresses') || '[]');
    } catch {
      return [];
    }
  });
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


  // For the modal form inputs (separate state to avoid clobbering main form until saved)
  const emptyAddress = {
    id: null,
    streetAddress: '',
    apartment: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressLabel: 'home',
    isPrimary: false
  };
  const [newAddress, setNewAddress] = useState(emptyAddress);

  useEffect(() => {
    sessionStorage.setItem('savedAddresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };


  const openAddAddressModal = () => {
    setNewAddress(emptyAddress);
    setShowAddAddressModal(true);
  };
  const closeAddAddressModal = () => {
    setShowAddAddressModal(false);
  };

  const generateAddressId = () => Date.now() + Math.floor(Math.random() * 1000);

  const saveNewAddress = () => {
    // basic validation: require street, city, postal, country (adjust as needed)
    if (!newAddress.streetAddress || !newAddress.city || !newAddress.postalCode || !newAddress.country) {
      toast.error('Please fill in Street, City, Postal Code and Country for address.');
      return;
    }

    const id = generateAddressId();
    const addrToSave = { ...newAddress, id };

    // If marked primary, unset others

    const updated = addrToSave.isPrimary
      ? addresses.map(a => ({ ...a, isPrimary: false })).concat(addrToSave)
      : addresses.concat(addrToSave);
    
    setAddresses(updated);
    populateFormAddress(addrToSave);

    toast.success('Your address has been saved', {
      duration: 2500
    });

    setShowAddAddressModal(false);
  };


  // Set primary address
const handleSetPrimaryAddress = (addressId) => {
  setAddresses(prev =>
    prev.map(addr => ({
      ...addr,
      isPrimary: addr.id === addressId
    }))
  );
  toast.success('Primary address updated!');
};

// Remove address
const handleRemoveAddress = (addressId) => {
  if (addresses.length === 1) {
    toast.error('Cannot delete the only address!');
    return;
  }
  
  setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  toast.success('Address removed!');
};

  // const populateFormAddress = (addressObj) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     streetAddress: addressObj.streetAddress || '',
  //     apartment: addressObj.apartment || '',
  //     landmark: addressObj.landmark || '',
  //     city: addressObj.city || '',
  //     state: addressObj.state || '',
  //     postalCode: addressObj.postalCode || '',
  //     country: addressObj.country || '',
  //     addressLabel: addressObj.addressLabel || 'home'
  //   }));
  // };


  // const handleSelectAddress = (e) => {
  //   const id = e.target.value || null;
  //   setSelectedAddressId(id);
  //   if (!id) {
  //     // clear visible address fields if none selected
  //     setFormData(prev => ({
  //       ...prev,
  //       streetAddress: '',
  //       apartment: '',
  //       landmark: '',
  //       city: '',
  //       state: '',
  //       postalCode: '',
  //       country: '',
  //       addressLabel: 'home'
  //     }));
  //     return;
  //   }
    
  //   const addr = addresses.find(a => String(a.id) === String(id));
  //   if (addr) populateFormAddress(addr);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const savedCustomers = JSON.parse(sessionStorage.getItem('customers') || '[]');

    // Get the next ID
  const nextId = savedCustomers.length > 0 
    ? Math.max(...savedCustomers.map(c => c.id)) + 1 
    : 4;

    // Create new customer - ONLY show name, email, phone
  const newCustomer = {
    id: nextId,
    name: formData.fullName,           // ✅ Show this
    email: formData.email,             // ✅ Show this
    phone: formData.phone,             // ✅ Show this
    status: formData.customerStatus,   // ✅ Show status
    totalOrders: 0,                    // ✅ Empty
    totalSpent: 0,                     // ✅ Empty
    lastPurchase: '-',                 // ✅ Empty (dash)
    // Don't include address or other fields in the visible data
    // Store full data separately if needed later
    fullData: formData  // Optional: store all data for future use
  };

  savedCustomers.push(newCustomer);
  sessionStorage.setItem('customers', JSON.stringify(savedCustomers));

  toast.success('Customer details have been saved successfully!', {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#10B981',
      color: '#fff',
      fontWeight: '600',
    },
  });

  setTimeout(() => {
    navigate('/customers');
  }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Toaster />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
            onClick={()=> navigate('/customers')}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Customer Details</h1>
              <p className="text-purple-100 text-sm">Complete customer information form</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 flex items-center gap-2 font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            Save Customer
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <User className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Basic Information</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="+1 234 567 8901"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          
          {/* Address Information Section */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-white">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Address Information</h2>
      </div>
      <button
        type="button"
        onClick={openAddAddressModal}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Address
      </button>
    </div>
  </div>

  {/* Address Table */}
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Street Address
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            City *
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Postal Code *
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Country *
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Address Label
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {addresses.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
              No addresses added yet. Click "Add Address" to add one.
            </td>
          </tr>
        ) : (
          addresses.map((address) => (
            <tr key={address.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  {address.streetAddress}
                  {address.apartment && <div className="text-xs text-gray-500">{address.apartment}</div>}
                  {address.landmark && <div className="text-xs text-gray-500">Near: {address.landmark}</div>}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  {address.city}
                  {address.state && <div className="text-xs text-gray-500">{address.state}</div>}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {address.postalCode}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {address.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    address.addressLabel === 'home' 
                      ? 'bg-blue-100 text-blue-700' 
                      : address.addressLabel === 'work'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {address.addressLabel?.toUpperCase()}
                  </span>
                  {address.isPrimary && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Primary
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2">
                  {!address.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryAddress(address.id)}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-medium transition-all"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(address.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

          {/* Delivery Preferences Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <AlertCircle className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Delivery Preferences</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Delivery Time
                  </label>
                  <select
                    name="preferredDeliveryTime"
                    value={formData.preferredDeliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Time</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                    <option value="night">Night (8 PM - 12 AM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="Ring bell twice, use back entrance"
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={formData.smsNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    SMS Notifications
                  </label>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="whatsappUpdates"
                    checked={formData.whatsappUpdates}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    WhatsApp Updates
                  </label>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="promotionalOffers"
                    checked={formData.promotionalOffers}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Promotional Offers
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Additional Information</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="hindi">Hindi</option>
                    <option value="mandarin">Mandarin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    How Did You Find Us?
                  </label>
                  <select
                    name="howFoundUs"
                    value={formData.howFoundUs}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Option</option>
                    <option value="google">Google Search</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="app-store">App Store</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Referral Code
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                    placeholder="Enter referral code"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Notes / Requirements
                  </label>
                  <textarea
                    name="specialNotes"
                    rows={4}
                    value={formData.specialNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Any special notes or requirements for this customer..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pb-8">
            <button
              type="button"
              onClick={() => navigate('/customers')}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Customer Details
            </button>
          </div>

        </form>
      </div>

      {/* Add Address Modal (simple inline modal) */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={closeAddAddressModal}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Address</h3>
              <div className="flex items-center gap-2">
                <label className="text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isPrimary || false}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, isPrimary: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  Make Primary
                </label>
                <button onClick={closeAddAddressModal} className="text-gray-500">Close</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input name="streetAddress" value={newAddress.streetAddress} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="123 Main Street" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Apartment/Floor/Building</label>
                <input name="apartment" value={newAddress.apartment} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="Apt 4B" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Landmark</label>
                <input name="landmark" value={newAddress.landmark} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="Near Park" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input name="city" value={newAddress.city} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="City" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State/Province</label>
                <input name="state" value={newAddress.state} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="State" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input name="postalCode" value={newAddress.postalCode} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="10001" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input name="country" value={newAddress.country} onChange={handleNewAddressChange} className="w-full px-3 py-2 border rounded" placeholder="Country" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address Label</label>
                <select name="addressLabel" value={newAddress.addressLabel} onChange={(e) => setNewAddress(prev => ({...prev, addressLabel: e.target.value}))} className="w-full px-3 py-2 border rounded">
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeAddAddressModal} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={saveNewAddress} className="px-4 py-2 bg-purple-600 text-white rounded">Save Address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerDetailsPage;