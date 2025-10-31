import { 
  PlusCircle, 
  ShoppingBag, 
  MessageCircle, 
  BarChart, 
  Wallet, 
  Settings as SettingsIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  title: string;
  action: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  "Add Product": PlusCircle,
  "Manage Orders": ShoppingBag,
  "Open Messages": MessageCircle,
  "View Analytics": BarChart,
  "Check Earnings": Wallet,
  "Store Settings": SettingsIcon,
};

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {actions.map((action, index) => {
        const Icon = iconMap[action.title] || PlusCircle;
        return (
          <Button
            key={index}
            variant="outline"
            className="h-auto flex-col gap-2 py-6 hover:bg-primary/5 hover:border-primary transition-colors"
            onClick={() => onActionClick?.(action.action)}
          >
            <Icon className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">{action.title}</span>
          </Button>
        );
      })}
    </div>
  );
}