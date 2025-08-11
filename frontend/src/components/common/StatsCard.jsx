import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  trendDirection = 'up' 
}) => {
  const trendColor = trendDirection === 'up' ? 'text-green-600' : 'text-red-600';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className={`text-xs ${trend ? trendColor : 'text-muted-foreground'}`}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;