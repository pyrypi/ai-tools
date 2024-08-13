"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/app/constants";
import { Button } from "./ui/button";

interface LimitCounterProps {
    limitCount: number;
};

export const LimitCounter = ({limitCount = 0}:LimitCounterProps) => {

    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);

    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="px-6">
           <Card className="bg-gray-900 border-black/5">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-2 space-y-4">
                    <p>{limitCount} / {MAX_FREE_COUNTS} Free Generations</p>
                    <Button variant="outline" className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-green-400 border-0">
                        Upgrade
                    </Button>
                </div>
            </CardContent>

           </Card>
        </div>
    );
};