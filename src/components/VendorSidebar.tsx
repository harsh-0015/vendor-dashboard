import { Home, ShoppingBag, Package, Users, BarChart2, MessageCircle, Wallet, Settings, ChevronDown, UserCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Orders", url: "/orders", icon: ShoppingBag },
  { title: "Products", url: "/products", icon: Package },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Earnings", url: "/earnings", icon: Wallet },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function VendorSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      {/* HEADER - Vendor Portal Dropdown */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full h-auto py-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">V</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h2 className="font-semibold text-sidebar-foreground text-sm truncate">Vendor Portal</h2>
                      <p className="text-xs text-muted-foreground truncate">Dashboard</p>
                    </div>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[240px]" align="start" side="bottom">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
      `flex items-center gap-3 cursor-pointer w-full rounded-md px-3 py-2 transition-all duration-200
       ${isActive ? "bg-blue-100 text-black font-semibold" : "text-black"}
       hover:bg-blue-800 hover:text-black`
    }
  >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Empty content - navigation is now only in the dropdown */}
        <div className="flex-1" />
      </SidebarContent>
      {/* FOOTER - User Profile Section */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full h-auto py-3">
                  <div className="flex items-center gap-3 flex-1">
                    {/* User Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 ring-2 ring-primary/20">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    {/* User Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-sm text-sidebar-foreground truncate">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john@vendor.com</p>
                    </div>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[240px]" align="start" side="top">
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="h-4 w-4 mr-3" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-3" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}