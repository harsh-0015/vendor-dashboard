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

export function VendorSidebar({ isOpen, onClose }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const handleNavClick = () => {
    // Close sidebar on mobile/tablet when a nav item is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 flex flex-col w-64 min-h-screen text-white bg-gradient-to-b from-gray-900 to-gray-800 z-40 transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Header */}
      <div className="p-6">
        <div
          onClick={() => {
            navigate('/');
            handleNavClick();
          }}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity select-none"
        >
          <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Vendor Portal</h1>
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
            onClick={() => {
              setActiveMenu(item.title.toLowerCase());
              handleNavClick();
            }}
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
    </div>
  );
}