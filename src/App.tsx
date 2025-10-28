import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Bell, Settings, ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

const VendorHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);

  // Get user data from storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    } else if (userData?.name) {
      const names = userData.name.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    } else if (userData?.email) {
      return userData.email[0].toUpperCase();
    }
    return 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    } else if (userData?.name) {
      return userData.name;
    } else if (userData?.userName) {
      return userData.userName;
    } else if (userData?.email) {
      return userData.email;
    }
    return 'User';
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('user');
    window.location.href = '/login'; // Adjustment accordingly
  };

  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h2 className="font-semibold">Vendor Portal</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-orange-500 transition">
              {getUserInitials()}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {getDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData?.email || 'No email'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional User Details */}
              {(userData?.userName || userData?.userId) && (
                <div className="px-4 py-2 border-b border-gray-100">
                  {userData?.userName && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-gray-500">Username</span>
                      <span className="text-xs text-gray-900 font-medium">{userData.userName}</span>
                    </div>
                  )}
                  {userData?.userId && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-gray-500">User ID</span>
                      <span className="text-xs text-gray-900 font-medium">{userData.userId}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className=" min-h-screen flex">
            <VendorSidebar />
            <main className="flex-1 ml-64">
              <VendorHeader />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Placeholder routes for other pages */}
                <Route path="/orders" element={<Dashboard />} />
                <Route path="/products" element={<Dashboard />} />
                <Route path="/customers" element={<Dashboard />} />
                <Route path="/analytics" element={<Dashboard />} />
                <Route path="/messages" element={<Dashboard />} />
                <Route path="/earnings" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              <ChatWidget />
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
