import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StoreRatingProps {
  rating: number;
  totalReviews: number;
  positiveFeedbackPercent: number;
}

export function StoreRating({ rating, totalReviews, positiveFeedbackPercent }: StoreRatingProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Store Rating</p>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">{rating.toFixed(1)}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-success">{positiveFeedbackPercent}%</p>
            <p className="text-sm text-muted-foreground">Positive feedback</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}