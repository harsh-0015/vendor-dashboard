import { Home, ShoppingBag, Package, Users, BarChart2, MessageCircle, Wallet, Settings } from "lucide-react";
import { NavLink , useNavigate } from "react-router-dom";
import { useState } from "react";


const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Orders", url: "/orders", icon: ShoppingBag },
  { title: "Products", url: "/products", icon: Package },
  { title: "Customers", url: "/Customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Earnings", url: "/earnings", icon: Wallet },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function VendorSidebar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="fixed inset-y-0 left-0 flex flex-col w-64 min-h-screen text-white bg-gradient-to-b from-gray-900 to-gray-800 z-20">
      {/* Header */}
      <div className="p-6"> 
        <div 
        onClick={() => navigate('/')} // navigation to home page across the project 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity select-none">
          <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Vendor Portal</h1>
            {/* <p className="text-xs text-gray-400">Dashboard</p> */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto pb-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            onClick={() => setActiveMenu(item.title.toLowerCase())}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-gray-700 bg-opacity-50 font-medium"
                  : "hover:bg-gray-700 hover:bg-opacity-30"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Help Card */}
      {/* <div className="px-6 pt-0 mb-auto">
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg p-4">
          <div className="w-8 h-8 bg-white rounded-lg mb-2 flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">?</span>
          </div>
          <h3 className="font-bold mb-1">Need help?</h3>
          <p className="text-xs mb-3 opacity-90">Please check our docs</p>
          <button className="bg-white text-gray-800 text-sm px-4 py-2 rounded-lg font-medium w-full hover:bg-gray-100 transition-colors">
            Documentation
          </button>
        </div>
      </div> */}
    </div>
  );
}