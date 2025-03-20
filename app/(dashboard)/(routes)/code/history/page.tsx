"use client";
import axios from "axios";
import { useChat } from "ai/react";

import { Code, MessageSquare, Send } from "lucide-react";
import Heading from "@/components/heading";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

import { useEffect, useState } from "react";
import { Empty } from "@/components/empty";

const HistoryPage = () => {
  const { messages, isLoading, setMessages } = useChat({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/code-messages");
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
        title="Code History"
        description="Browse your code chat history"
        icon={Code}
        iconColor="text-green-500"
        bgColor="bg-green-700/10"
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

                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div
                          className="overflow-auto w-full my-2
                        bg-black/10 p-2 rounded-lg"
                        >
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {m.content || ""}
                  </ReactMarkdown>
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
