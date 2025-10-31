import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface OrderStatusData {
  name: string;
  value: number;
  color: string;
}

interface OrderStatusChartProps {
  data: OrderStatusData[];
  totalOrders: number;
}

export function OrderStatusChart({ data, totalOrders }: OrderStatusChartProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col justify-center space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((item.value / totalOrders) * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}