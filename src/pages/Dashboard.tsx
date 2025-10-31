import { ShoppingBag, DollarSign, Users, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as React from "react";

// Import components
import { DashboardHeader } from "@/components/DashboardHeader";
import { StoreRating } from "@/components/StoreRating";
import { SalesChart } from "@/components/charts/SalesChart";
import { OrderStatusChart } from "@/components/charts/OrderStatusChart";
import { ProductList } from "@/components/ProductList";
import { RecentOrders } from "@/components/RecentOrders";
import { QuickActions } from "@/components/QuickActions";

// Import constants
import {
  salesData,
  orderStatusData,
  topProducts,
  recentOrders,
  chartData,
  chartConfig,
  kpiData,
  quickActions,
  timeRangeOptions,
} from "@/constants/dashboardData";

// Icon mapping for KPIs
const kpiIcons = {
  Orders: ShoppingBag,
  Sales: DollarSign,
  Customers: Users,
  "Net Revenue": TrendingUp,
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = React.useState("7days");

  // Handlers for user interactions
  const handleViewOrder = React.useCallback((orderId: string) => {
    console.log("View order:", orderId);
    // TODO: Navigate to order details
  }, []);

  const handleMessageCustomer = React.useCallback((orderId: string) => {
    console.log("Message customer:", orderId);
    // TODO: Open messaging interface
  }, []);

  const handleQuickAction = React.useCallback((action: string) => {
    console.log("Quick action:", action);
    // TODO: Handle quick action navigation
  }, []);

  // Calculate total orders for percentage calculation
  const totalOrders = React.useMemo(
    () => orderStatusData.reduce((sum, item) => sum + item.value, 0),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader
        vendorName="Vendor Name"
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        timeRangeOptions={timeRangeOptions}
      />

      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8 space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((kpi) => {
                const Icon = kpiIcons[kpi.title as keyof typeof kpiIcons];
                return (
                  <KPICard
                    key={kpi.title}
                    title={kpi.title}
                    value={kpi.value}
                    icon={Icon}
                    trend={kpi.trend}
                    variant={kpi.variant}
                  />
                );
              })}
            </div>

            {/* Store Rating */}
            <StoreRating rating={4.8} totalReviews={285} positiveFeedbackPercent={92} />

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
                <SalesChart data={salesData} />
              </CardContent>
            </Card>

            {/* Order Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Breakdown</CardTitle>
                <CardDescription>Distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderStatusChart data={orderStatusData} totalOrders={totalOrders} />
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
                <ProductList products={topProducts} />
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
                <RecentOrders
                  orders={recentOrders}
                  onViewOrder={handleViewOrder}
                  onMessageCustomer={handleMessageCustomer}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <NotificationPanel />

            {/* Revenue vs Orders Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Orders💲</CardTitle>
                <CardDescription>Weekly performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData} height={300}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                    <defs>
                      <linearGradient id="purplePinkGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="revenue" fill="url(#purplePinkGradient)" radius={4} />
                    <Bar dataKey="orders" fill="url(#purplePinkGradient)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                  Revenue up by 15% this week <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Showing revenue and order count for the current week
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}