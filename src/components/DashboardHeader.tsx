import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimeRangeOption {
  value: string;
  label: string;
}

interface DashboardHeaderProps {
  vendorName?: string;
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  timeRangeOptions: TimeRangeOption[];
}

export function DashboardHeader({ 
  vendorName = "Vendor Name", 
  timeRange, 
  onTimeRangeChange,
  timeRangeOptions 
}: DashboardHeaderProps) {
  return (
    <div className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sans text-foreground">
            Hey {vendorName}, welcome back 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's how your store performed this week.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Toggle buttons for desktop */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) onTimeRangeChange(value);
            }}
            variant="outline"
            size="default"
            className="hidden md:flex gap-2 max-w-full overflow-hidden"
          >
            {timeRangeOptions.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}
              className="text-xs md:text-sm truncate px-2 sm:px-3 max-w-[100px]"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* Select dropdown for mobile */}
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[180px] md:hidden">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}