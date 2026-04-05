import React, { useEffect, useState } from "react";
import { dummyChats } from "../assets/assets";
import { MessageCircle, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setChat } from "../app/features/chatSlice";

const Messages = () => {
  const user = { id: "user_1" };

  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handelOpenChat = (chat) => {
    dispatch(setChat({ listing: chat.listing, chatId: chat.id }));
  };

  const fetchUserchats = async () => {
    setChats(dummyChats);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserchats();
    const interval = setInterval(() => {
      fetchUserchats();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredChats = chats.filter(
    (chat) =>
      chat.listing?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.chatUser?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.ownerUser?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0)
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 text-white mt-17">
      <div className="py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-gray-400">Chat with buyers and sellers</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-all"
          />
        </div>

        {/* Chat List */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading messages...</p>
            </div>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {searchQuery ? "No chats found" : "No messages yet"}
            </h3>
            <p className="text-gray-400 text-sm">
              {searchQuery
                ? "Try a different search term"
                : 'Start a conversation by clicking "Chat with Seller"'}
            </p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            {filteredChats.map((chat) => {
              const chatUser =
                chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;
              const isUnread =
                !chat.isLastMessageRead &&
                chat.lastMessageSenderId !== user?.id;

              return (
                <button
                  onClick={() => handelOpenChat(chat)}
                  key={chat.id}
                  className="w-full p-4 hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={chatUser?.image}
                        alt={chatUser?.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      {isUnread && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#0d0018]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-white truncate text-sm group-hover:text-purple-300 transition-colors">
                          {chat.listing?.title}
                        </h3>
                        <span className="text-xs text-gray-500 shrink-0 ml-2">
                          {formatDate(chat.updatedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-purple-300/60 truncate mb-1">
                        {chatUser?.name}
                      </p>
                      <p
                        className={`text-sm truncate ${isUnread ? "text-white font-medium" : "text-gray-500"}`}
                      >
                        {chat.lastMessage || "No messages yet..."}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {isUnread && (
                      <div className="shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
