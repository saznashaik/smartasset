import { Combine } from 'lucide-react';
import React from 'react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Combine className="h-8 w-8 text-primary" />
      <h1 className="text-xl font-headline font-semibold text-primary">
        AssetAI Central
      </h1>
    </div>
  );
}
