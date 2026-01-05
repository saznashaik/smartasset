import { GanttChartSquare } from 'lucide-react';
import React from 'react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="bg-primary rounded-md p-2">
        <GanttChartSquare className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-xl font-semibold text-primary">
        AssetAI
      </h1>
    </div>
  );
}
