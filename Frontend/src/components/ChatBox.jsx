import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyChats } from "../assets/assets";
import { Loader2Icon, Send, X } from "lucide-react";
import { clearChat } from "../app/features/chatSlice";

const ChatBox = () => {
  const { listing, isOpen, chatId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const user = { id: "user_2" };

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchChat = async () => {
    setChat(dummyChats[0]);
    setMessages(dummyChats[0].messages);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listing) {
      fetchChat();
    }
  }, [listing]);

  useEffect(() => {
    if (!isOpen) {
      setChat(null);
      setMessages([]);
      setIsLoading(true);
      setNewMessages("");
      setIsSending(false);
    }
  }, [isOpen]);

  //   for auto scroll
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages.length]);

  const handelSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessages.trim() || isSending) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        chatId: chat.id,
        sender_id: user.id,
        message: newMessages,
        createdAt: new Date(),
      },
    ]);

    setNewMessages("");
  };

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center sm:p-4">
      <div className="bg-[#0d0018] border border-white/10 sm:rounded-2xl shadow-2xl shadow-black/50 w-full max-w-2xl h-screen sm:h-150 flex flex-col">
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 p-4 sm:rounded-t-2xl flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent">
              {listing?.title}
            </h3>
            <p className="text-sm text-purple-300/70 truncate">
              {user.id === listing?.ownerId
                ? `Chatting with buyer (${chat?.chatUser?.name || "Loading..."})`
                : `Chatting with seller (${chat?.ownerUser?.name || "Loading..."})`}
            </p>
          </div>
          <button
            onClick={() => dispatch(clearChat())}
            className="ml-4 p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2Icon className="size-6 animate-spin text-purple-400" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-white font-medium mb-1">No messages yet</p>
                <p className="text-sm text-gray-400">Start the conversation</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    message.sender_id === user.id
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-white/10 border border-white/10 text-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <p className="text-xs mt-1 opacity-60 text-right">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {chat?.listing?.status === "active" ? (
          <form
            onSubmit={handelSendMessage}
            className="p-4 bg-[#1a0a2e] border-t border-white/10 rounded-b-lg"
          >
            <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-purple-500/60 focus-within:bg-white/8 transition-all">
              <textarea
                value={newMessages}
                onChange={(e) => setNewMessages(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handelSendMessage(e);
                  }
                }}
                placeholder="Type your message"
                className="flex-1 resize-none bg-transparent text-white placeholder-white/30 focus:outline-none max-h-32 text-sm leading-relaxed py-1"
                rows={1}
              />
              <button
                disabled={!newMessages.trim() || isSending}
                type="submit"
                className="shrink-0 w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors mb-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
              >
                {isSending ? (
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-white/5 border-t border-white/10 sm:rounded-b-2xl text-center">
            <p className="text-sm text-gray-400">
              {chat
                ? `This listing is currently ${chat?.listing?.status}`
                : "Loading chat..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
