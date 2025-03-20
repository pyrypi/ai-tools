import AnimatedBackground from "@/components/animated-background";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  LineChart,
  Lock,
  MessageSquare,
  Mic,
  Music,
  PlayCircle,
  PlaySquare,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function ToolsDashboard() {
  const router = useRouter();

  const tools = [
    {
      label: "Chat",
      desc: "Engage in dynamic conversations and get instant responses to your queries.",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/chat",
      disabled: false,
    },
    {
      label: "Image Generation",
      desc: "Create stunning images from text prompts using AI.",
      icon: ImageIcon,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      href: "/image",
      disabled: false,
    },
    {
      label: "Code Generation",
      desc: "Generate and optimize code snippets for various programming languages.",
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      href: "/code",
      disabled: false,
    },
    {
      label: "Video Generation",
      desc: "Coming soon... Transform text into engaging videos effortlessly.",
      icon: PlayCircle,
      color: "text-grey-500",
      bgColor: "bg-grey-500/10",
      href: "/video",
      disabled: true,
    },
    {
      label: "Text to Speech Generation",
      desc: "Coming soon...",
      icon: Mic,
      color: "text-grey-500",
      bgColor: "bg-grey-500/10",
      href: "/video",
      disabled: true,
    },
    {
      label: "Music Generation",
      desc: "Coming soon...",
      icon: Music,
      color: "text-grey-500",
      bgColor: "bg-grey-500/10",
      href: "/video",
      disabled: true,
    },
    {
      label: "More features coming soon...",
      desc: "",
      icon: LineChart,
      color: "text-grey-500",
      bgColor: "bg-grey-500",
      href: "/dashboard",
      disabled: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <AnimatedBackground
        className="rounded-lg bg-zinc-700 dark:bg-zinc-800"
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {tools.map((tool, index) => (
          <div
            key={index}
            data-id={`card-${index}`}
            onClick={() => (tool.disabled ? null : router.push(tool.href))}
            className="bg-gray-900 p-3 border-black/5 flex
            cursor-pointer m-5 rounded-xl"
          >
            <div className="flex select-none flex-col space-y-3 p-2">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <div>
                <p className="text-sm text-gray-200 px-1">{tool.desc}</p>
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              {tool.disabled ? <Lock /> : <ArrowRight className="w-5 h-5" />}
            </div>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  );
}
