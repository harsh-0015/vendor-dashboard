// Mock data for dashboard
export const salesData = [
  { day: "Mon", sales: 4200, orders: 45 },
  { day: "Tue", sales: 5800, orders: 62 },
  { day: "Wed", sales: 4600, orders: 51 },
  { day: "Thu", sales: 7100, orders: 78 },
  { day: "Fri", sales: 8500, orders: 92 },
  { day: "Sat", sales: 9200, orders: 98 },
  { day: "Sun", sales: 6800, orders: 71 },
];

export const orderStatusData = [
  { name: "Completed", value: 798, color: "hsl(var(--success))" },
  { name: "Pending", value: 312, color: "hsl(var(--warning))" },
  { name: "Cancelled", value: 120, color: "hsl(var(--destructive))" },
];

export const topProducts = [
  { name: "Margherita Pizza", orders: 120, revenue: "$1,560", status: "available" as const },
  { name: "Cheeseburger", orders: 95, revenue: "$980", status: "unavailable" as const },
  { name: "Pasta Alfredo", orders: 80, revenue: "$870", status: "available" as const },
  { name: "Caesar Salad", orders: 65, revenue: "$520", status: "available" as const },
];

export const recentOrders = [
  { id: "#12345", customer: "John Doe", total: "$32.50", status: "completed" as const },
  { id: "#12346", customer: "Emma Smith", total: "$24.80", status: "pending" as const },
  { id: "#12347", customer: "Michael Brown", total: "$45.20", status: "cancelled" as const },
  { id: "#12348", customer: "Sarah Wilson", total: "$28.90", status: "completed" as const },
];

export const chartData = [
  { day: "Mon", revenue: 1860, orders: 45 },
  { day: "Tue", revenue: 3050, orders: 62 },
  { day: "Wed", revenue: 2370, orders: 51 },
  { day: "Thu", revenue: 3730, orders: 78 },
  { day: "Fri", revenue: 4460, orders: 92 },
  { day: "Sat", revenue: 4830, orders: 98 },
  { day: "Sun", revenue: 3570, orders: 71 },
];

export const quickActions = [
  { title: "Add Product", action: "add-product" },
  { title: "Manage Orders", action: "orders" },
  { title: "Open Messages", action: "messages" },
  { title: "View Analytics", action: "analytics" },
  { title: "Check Earnings", action: "earnings" },
  { title: "Store Settings", action: "settings" },
];

// Chart configuration
export const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  orders: {
    label: "Orders",
    color: "var(--chart-2)",
  },
} as const;

// KPI data
export const kpiData = [
  {
    title: "Orders",
    value: "1,230",
    trend: { value: "+12% from last week", positive: true },
    variant: "default" as const,
  },
  {
    title: "Sales",
    value: "$24,560",
    trend: { value: "+8% from last week", positive: true },
    variant: "success" as const,
  },
  {
    title: "Customers",
    value: "845",
    trend: { value: "+5% from last week", positive: true },
    variant: "default" as const,
  },
  {
    title: "Net Revenue",
    value: "$18,430",
    trend: { value: "+15% from last week", positive: true },
    variant: "success" as const,
  },
];

// Time range options
export const timeRangeOptions = [
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 3 Months" },
];