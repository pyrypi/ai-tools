import { MessageCircleQuestion } from "lucide-react";

interface EmptyProps {
    label: string;
}

export const Empty = ({label}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
        <MessageCircleQuestion 
            size={90}
        />
        <p className="text-muted-foreground text-md text-center">{label}</p>
    </div>
  )
}
