import { Package as PackageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  name: string;
  orders: number;
  revenue: string;
  status: "available" | "unavailable";
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/100 transition-colors"
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
            <Badge className="bg-gradient-to-br from-purple-600 to-pink-500 text-white border-0">
              {product.status === "available" ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}