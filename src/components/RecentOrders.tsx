import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  customer: string;
  total: string;
  status: "completed" | "pending" | "cancelled";
}

interface RecentOrdersProps {
  orders: Order[];
  onViewOrder?: (orderId: string) => void;
  onMessageCustomer?: (orderId: string) => void;
}

export function RecentOrders({ orders, onViewOrder, onMessageCustomer }: RecentOrdersProps) {
  return (
    <div className="space-y-3">
      {orders.map((order, index) => (
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
            <Badge className="bg-gradient-to-br from-purple-600 to-pink-500 text-white border-0 capitalize">
              {order.status}
            </Badge>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 border border-gray-300 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white"
                onClick={() => onViewOrder?.(order.id)}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMessageCustomer?.(order.id)}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}