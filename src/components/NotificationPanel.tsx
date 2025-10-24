import { Bell, Package, MessageSquare, DollarSign, AlertCircle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Notification {
  id: string;
  type: "order" | "message" | "payment" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Delivered",
    message: "Order #14532 has been delivered successfully",
    time: "5m ago",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: "New message from John Doe",
    time: "2h ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    message: "$1,250 has been credited to your account",
    time: "3h ago",
    read: true,
  },
  {
    id: "4",
    type: "order",
    title: "New Order",
    message: "Order #14533 placed by Emma Smith",
    time: "5h ago",
    read: true,
  },
  {
    id: "5",
    type: "alert",
    title: "Low Stock Alert",
    message: "Margherita Pizza is running low on stock",
    time: "1d ago",
    read: true,
  },
  {
    id: "6",
    type: "message",
    title: "Customer Review",
    message: "New 5-star review from Michael Brown",
    time: "2d ago",
    read: true,
  },
];

const iconMap = {
  order: Package,
  message: MessageSquare,
  payment: DollarSign,
  alert: AlertCircle,
};

const colorMap = {
  order: "text-primary",
  message: "text-chart-5",
  payment: "text-success",
  alert: "text-warning",
};

export function NotificationPanel() {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [isOpen, setIsOpen] = useState(false);
  
  // Show first 3 notifications when collapsed
  const visibleNotifications = isOpen ? notifications : notifications.slice(0, 3);
  const hasMore = notifications.length > 3;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Notifications</CardTitle>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="space-y-1">
            {visibleNotifications.map((notification) => {
              const Icon = iconMap[notification.type];
              return (
                <div
                  key={notification.id}
                  className={`flex gap-3 rounded-lg p-3 transition-colors ${
                    !notification.read ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                >
                  <div className={`mt-1 ${colorMap[notification.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {hasMore && (
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                <span className="text-sm">
                  {isOpen ? "Show Less" : `Show ${notifications.length - 3} More`}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      </CardContent>
    </Card>
  );
}
