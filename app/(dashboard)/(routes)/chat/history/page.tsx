"use client";

import axios from "axios";
import { useChat } from "ai/react";
import { MessageSquare, Send } from "lucide-react";
import Heading from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

import { useEffect } from "react";

const HistoryPage = () => {
  const { messages, isLoading, setMessages } = useChat({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/chat-messages");
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        return error;
      }
    };
    fetchMessages();
  });

  return (
    <div>
      <Heading
        title="Chat History"
        description="Browse your chat history"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8 mb-10">
        <div className="space-y-4 mt-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No past chats" />
          )}
          <div className="flex flex-col gap-y-4">
            {messages.map(
              (m: { id: string; role: string; content: string }) => (
                <div
                  key={m.id}
                  className="p-8 w-full flex items-start 
                gap-x-8 rounded-lg border bg-gray-600 bg-opacity-50"
                >
                  {m.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-sm">{m.content}</p>
                </div>
              )
            )}
          </div>
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
