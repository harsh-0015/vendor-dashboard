import { ShoppingBag, DollarSign, Users, TrendingUp, Star, PlusCircle, Package as PackageIcon, MessageCircle, BarChart, Wallet, Settings as SettingsIcon } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const salesData = [
  { day: "Mon", sales: 4200, orders: 45 },
  { day: "Tue", sales: 5800, orders: 62 },
  { day: "Wed", sales: 4600, orders: 51 },
  { day: "Thu", sales: 7100, orders: 78 },
  { day: "Fri", sales: 8500, orders: 92 },
  { day: "Sat", sales: 9200, orders: 98 },
  { day: "Sun", sales: 6800, orders: 71 },
];

const orderStatusData = [
  { name: "Completed", value: 798, color: "hsl(var(--success))" },
  { name: "Pending", value: 312, color: "hsl(var(--warning))" },
  { name: "Cancelled", value: 120, color: "hsl(var(--destructive))" },
];

const topProducts = [
  { name: "Margherita Pizza", orders: 120, revenue: "$1,560", status: "available" },
  { name: "Cheeseburger", orders: 95, revenue: "$980", status: "unavailable" },
  { name: "Pasta Alfredo", orders: 80, revenue: "$870", status: "available" },
  { name: "Caesar Salad", orders: 65, revenue: "$520", status: "available" },
];

const recentOrders = [
  { id: "#12345", customer: "John Doe", total: "$32.50", status: "completed" },
  { id: "#12346", customer: "Emma Smith", total: "$24.80", status: "pending" },
  { id: "#12347", customer: "Michael Brown", total: "$45.20", status: "cancelled" },
  { id: "#12348", customer: "Sarah Wilson", total: "$28.90", status: "completed" },
];

const quickActions = [
  { title: "Add Product", icon: PlusCircle, action: "add-product" },
  { title: "Manage Orders", icon: ShoppingBag, action: "orders" },
  { title: "Open Messages", icon: MessageCircle, action: "messages" },
  { title: "View Analytics", icon: BarChart, action: "analytics" },
  { title: "Check Earnings", icon: Wallet, action: "earnings" },
  { title: "Store Settings", icon: SettingsIcon, action: "settings" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hey Vendor Name, welcome back 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's how your store performed this week.</p>
          </div>
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8 space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Orders"
                value="1,230"
                icon={ShoppingBag}
                trend={{ value: "+12% from last week", positive: true }}
                variant="default"
              />
              <KPICard
                title="Sales"
                value="$24,560"
                icon={DollarSign}
                trend={{ value: "+8% from last week", positive: true }}
                variant="success"
              />
              <KPICard
                title="Customers"
                value="845"
                icon={Users}
                trend={{ value: "+5% from last week", positive: true }}
                variant="default"
              />
              <KPICard
                title="Net Revenue"
                value="$18,430"
                icon={TrendingUp}
                trend={{ value: "+15% from last week", positive: true }}
                variant="success"
              />
            </div>

            {/* Rating Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Store Rating</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-3xl font-bold">4.8</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on 285 reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">92%</p>
                    <p className="text-sm text-muted-foreground">Positive feedback</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales & Orders Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales & Orders Overview</CardTitle>
                    <CardDescription>Weekly performance metrics</CardDescription>
                  </div>
                  <Select defaultValue="sales">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Volume</SelectItem>
                      <SelectItem value="orders">Order Count</SelectItem>
                      <SelectItem value="avg">Avg Order Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Order Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Breakdown</CardTitle>
                <CardDescription>Distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-4">
                    {orderStatusData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{item.value}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((item.value / 1230) * 100)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>Best performing items this week</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <PackageIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.orders} orders</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-lg">{product.revenue}</p>
                        <Badge variant={product.status === "available" ? "default" : "secondary"}>
                          {product.status === "available" ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{order.total}</p>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto flex-col gap-2 py-6 hover:bg-primary/5 hover:border-primary transition-colors"
                    >
                      <action.icon className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
