"use client";
import * as z from "zod";
import { useChat } from "ai/react";

import { Code, Divide, MessageSquare, Send } from "lucide-react";
import Heading from "@/components/heading";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

import Link from "next/link";
import { useRouter } from "next/navigation";

const CodePage = () => {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/code",
      onFinish({}) {
        router.refresh();
      },
    });

  return (
    <div>
      <Heading
        title="Code generation"
        description="Generates code for you"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="relative px-4 lg:px-8 mb-40">
        <Link href={"./code/history"}>
          <Button variant="link" className="bg-black/40">
            Chat history
          </Button>
        </Link>

        <div className="space-y-4 mt-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No code generated" />
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
                        bg-black/20 p-2 rounded-lg"
                        >
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/20 rounded-lg p-1"
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
        </div>

        <div className="fixed bottom-0 left-0 md:left-72 right-0">
          <form
            onSubmit={handleSubmit}
            className="
                  bg-[#03080f]
                    bg-opacity-80
                    w-full
                    p-5
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                  "
          >
            <Input
              disabled={isLoading}
              value={input}
              placeholder="Give a prompt..."
              onChange={handleInputChange}
              className="border-0 outline-none focus-visible:ring-0
                  focus-visible:ring-transparent col-span-12 lg:col-span-10 text-black"
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
            >
              <Send color="black" size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
