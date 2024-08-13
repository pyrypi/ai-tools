"use client";

import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { LimitCounter } from "./limit-counter";

const montserrat = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
    {
        label:"Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label:"Chat",
        icon: MessageSquare,
        href: "/chat",
        color: "text-violet-500",
    },
    {
        label:"Image generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-yellow-500",
    },
    {
        label:"Code generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label:"Settings",
        icon: Settings,
        href: "",
        
    },


];

interface SidebarProps {
    limitCount: number;
}


const Sidebar = ({limitCount = 0}:SidebarProps) => {
    const pathName = usePathname();

    return (
        <div className="space-y-4 flex flex-col h-full py-4 bg-[#03080f] text-white" >
            <div className="px-3 py-2 flex-1">
                <div className="flex flex-col">
                    <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                        <div className="relative w-10 h-10 mr-4">
                            {/*<Image 
                                fill
                                alt="logo"
                                src="/logo.png"
                            />*/}
                        </div>
                        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                            AI TOOLS
                        </h1>
                    </Link>
                    
                </div>
                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <Link 
                        href={route.href} 
                        key={index}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursosr-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                            {route.label}
                        </div>
                        
                        </Link>
                    ))}

                </div>
                <div className="absolute bottom-10 right-0 left-0">
                    <LimitCounter limitCount={limitCount}/>

                </div>
            </div>
        </div>

    );
}

export default Sidebar;