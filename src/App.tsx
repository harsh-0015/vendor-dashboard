import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Bell, Settings, ChevronDown, LogOut , Menu , X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatWidget from "./components/ChatWidget";
import CustomersPage from "./pages/CustomersPage";
import { useLenisScroll } from "./hooks/use-LenisScroll";
import ScrollToTop from "./components/ScrollToTop";
import CustomerDetailsPage from "./pages/CustomersDetailsPage";


const queryClient = new QueryClient();

const VendorHeader = ({isSidebarOpen, setIsSidebarOpen}) => {
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
        {/* Hamburger Menu Button - Only visible on mobile/tablet */}
        <button
        onClick={()=> setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
        aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ): (
          <Menu className="w-5 h-5 text-gray-600" />
          )}
          </button>

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

const App = () => {
  // state for sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize Lenis smooth scrolling
  useLenisScroll({
    duration: 0.8,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1.5, //
  });

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () =>  {
      if (window.innerWidth>= 1024) {
        setIsSidebarOpen(false);
      }
    };                                                                              
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);    
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>                      
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <div className="min-h-screen flex">
            <VendorSidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
            />
            
            {/* Overlay for mobile/tablet - Only shows when sidebar is open */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            
            <main className="ml-0 lg:ml-64 flex-1">
              <VendorHeader 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
              />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Placeholder routes for other pages */}
                <Route path="/orders" element={<Dashboard />} />
                <Route path="/products" element={<Dashboard />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/customers/new" element={<CustomerDetailsPage />} />
                <Route path="/analytics" element={<Dashboard />} />
                <Route path="/messages" element={<Dashboard />} />
                <Route path="/earnings" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              <ChatWidget />
              <ScrollToTop/>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
