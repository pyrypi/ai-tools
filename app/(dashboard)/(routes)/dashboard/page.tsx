"use client";

import { ToolsDashboard } from "@/components/tools-dashboard";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          All AI tools in same place.
        </h2>
        <p className="text-muted-foreground font-light text-sm 
        md:text-lg text-center">
          chat or generate almost anything you want with the our smartest AI Tools.
        </p>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          <ToolsDashboard />
        </div>

      </div>
      
    </div>
    
  );
}
