import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, usePage } from "@inertiajs/react";
import Conversation from "./Conversation";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  PlusCircle,
  Search,
  UserPlus,
  X,
  Menu
} from "lucide-react";

interface User {
  id: number;
  name: string;
  last_seen?: string | null;
}

interface PageProps extends InertiaPageProps {
  auth: { user: User };
  conversation?: number;
}

interface Message {
  id: number;
  content: string;
  created_at?: string;
  sender: User;
  conversation_id: number;
}

interface ConversationType {
  id: number;
  user_one: User;
  user_two: User;
  messages?: Message[];
  last_message?: Message;
  unread_count?: number;
}

const Messenger: React.FC = () => {
  const { auth } = usePage<PageProps>().props;
  const searchParams = new URLSearchParams(window.location.search);
  const queryConversation = searchParams.get("conversation");

  const [activeConversation, setActiveConversation] = useState<number | null>(
    queryConversation ? parseInt(queryConversation) : null
  );
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 🟢 Presence: Track who is online
  useEffect(() => {
    const echo = (window as any).Echo;
    if (!echo) return;

    const channel = echo.join("presence.chat")
      .here((users: any[]) => setOnlineUsers(users.map((u) => u.id)))
      .joining((user: any) =>
        setOnlineUsers((prev) => [...new Set([...prev, user.id])])
      )
      .leaving((user: any) =>
        setOnlineUsers((prev) => prev.filter((id) => id !== user.id))
      );

    return () => echo.leave("presence.chat");
  }, []);

  // 📨 Load conversations and users initially
  useEffect(() => {
    loadConversations();
    axios.get("/users").then((res) => setUsers(res.data.data || []));
  }, []);

  const loadConversations = async () => {
    try {
      const res = await axios.get("/conversations");
      const data = res.data.data || [];

      // Sort by latest message
      const sorted = [...data].sort((a: any, b: any) => {
        const dateA = new Date(a.last_message?.created_at || a.updated_at || 0).getTime();
        const dateB = new Date(b.last_message?.created_at || b.updated_at || 0).getTime();
        return dateB - dateA;
      });

      setConversations(sorted);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  // 🟣 Realtime message updates
  useEffect(() => {
    const echo = (window as any).Echo;
    if (!echo || conversations.length === 0) return;

    const channelSubscriptions: { [key: string]: any } = {};

    conversations.forEach((conv) => {
      const channelName = `conversation.${conv.id}`;
      const channel = echo.join(channelName);
      channelSubscriptions[conv.id] = channel;

      // Listen for new messages
      channel.listen(".message.sent", (e: any) => {
        const msg = e.message;
        
        setConversations((prev) => {
          let updated = [...prev];
          const convoIndex = updated.findIndex(c => c.id === msg.conversation_id);
          
          if (convoIndex > -1) {
            // Update the conversation
            updated[convoIndex] = {
              ...updated[convoIndex],
              last_message: msg,
              messages: [...(updated[convoIndex].messages || []), msg]
            };
            
            // Increment unread count only if:
            // 1. Message is from someone else
            // 2. This conversation is NOT currently active
            if (msg.sender_id !== auth.user.id && msg.conversation_id !== activeConversation) {
              updated[convoIndex].unread_count = (updated[convoIndex].unread_count || 0) + 1;
            }
            
            // Move to top
            const [moved] = updated.splice(convoIndex, 1);
            updated = [moved, ...updated];
          }
          
          return updated;
        });
      });

      // Listen for read receipts
      channel.listen(".messages.read", (e: any) => {
        if (e.userId !== auth.user.id) {
          setConversations((prev) =>
            prev.map((c) =>
              c.id === conv.id
                ? { ...c, unread_count: 0 }
                : c
            )
          );
        }
      });
    });

    return () => {
      Object.values(channelSubscriptions).forEach(channel => {
        try {
          channel.stopListening(".message.sent");
          channel.stopListening(".messages.read");
          echo.leave(channel.name);
        } catch {}
      });
    };
  }, [activeConversation, conversations.length]);

  // 💬 Start a new conversation
  const startConversation = async (receiverId: number) => {
    const existing = conversations.find(
      (c) =>
        (c.user_one.id === receiverId && c.user_two.id === auth.user.id) ||
        (c.user_two.id === receiverId && c.user_one.id === auth.user.id)
    );

    if (existing) {
      handleConversationClick(existing.id);
      setShowNewChatModal(false);
      return;
    }

    try {
      const res = await axios.post("/conversations/start", {
        receiver_id: receiverId,
      });
      const conv = res.data.data;
      setConversations((prev) => [conv, ...prev]);
      handleConversationClick(conv.id);
      setShowNewChatModal(false);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  // Mark conversation as read when opened
  const markConversationAsRead = async (conversationId: number) => {
    try {
      const res = await axios.post(`/conversations/${conversationId}/mark-read`);
      
      // Update local state
      setConversations(prev => 
        prev.map(c => 
          c.id === conversationId 
            ? { ...c, unread_count: 0 } 
            : c
        )
      );
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  // Handle conversation click
  const handleConversationClick = (id: number) => {
    setActiveConversation(id);
    markConversationAsRead(id);
    
    const params = new URLSearchParams(window.location.search);
    params.set("conversation", id.toString());
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    
    if (window.innerWidth < 640) setIsSidebarOpen(false);
  };

  // 🟢 Format user online status
  const formatStatus = (user: User) => {
    if (onlineUsers.includes(user.id)) {
      return <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Online</span>;
    }
    return <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full"></span>Offline</span>;
  };

  // Filter conversations by search term
  const filteredConversations = conversations.filter((c) => {
    const otherUser = c.user_one.id !== auth.user.id ? c.user_one : c.user_two;
    return otherUser.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 🔴 FIX: Add filteredUsers definition here
  const filteredUsers = users
    .filter((u) => u.id !== auth.user.id)
    .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getOtherUser = (conversation: ConversationType) => {
    return conversation.user_one.id !== auth.user.id 
      ? conversation.user_one 
      : conversation.user_two;
  };

  const formatMessageTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-sidebar-primary text-white z-30 h-14 flex items-center px-4 shadow-md">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="sm:hidden p-2 hover:bg-sidebar-primary/80 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h1 className="font-semibold text-lg">IMOSSF Messenger</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="p-2 hover:bg-sidebar-primary/80 rounded-full transition-colors"
              title="New message"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <Link
              href="/cms/exit"
              className="p-2 hover:bg-sidebar-primary/80 rounded-full transition-colors"
              title="Exit messenger"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-14">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`
            fixed left-0 z-20 bg-white overflow-y-auto border-r shadow-lg
            transform transition-transform duration-300 ease-in-out
            w-full sm:w-80 h-[calc(100vh-3.5rem)] 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0 sm:relative sm:border-r sm:shadow-none
          `}
        >
          {/* Search */}
          <div className="sticky top-0 z-10 bg-white border-b p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
              />
            </div>
          </div>

          {/* Conversation list */}
        {/* Conversation list */}
<div className="p-2 space-y-1">
  {filteredConversations.length > 0 ? (
    filteredConversations.map((c) => {
      const otherUser = getOtherUser(c);
      const lastMsg = c.last_message?.content || 
        c.messages?.[c.messages.length - 1]?.content || 
        "No messages yet";
      const lastDate = c.last_message?.created_at || 
        c.messages?.[c.messages.length - 1]?.created_at;
      
      // 🔴 Ensure unread_count is treated as number and check > 0
      const unreadCount = typeof c.unread_count === 'number' ? c.unread_count : 0;
      const hasUnread = unreadCount > 0 && activeConversation !== c.id;

      return (
        <div
          key={c.id}
          onClick={() => handleConversationClick(c.id)}
          className={`
            p-3 rounded-lg cursor-pointer transition-all
            ${activeConversation === c.id 
              ? "bg-sidebar-primary/10 border-sidebar-primary/20 shadow-sm" 
              : "hover:bg-gray-50 border-transparent"
            }
            ${hasUnread ? "bg-yellow-50" : ""}
            border
          `}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center text-white font-semibold">
                {otherUser.name.charAt(0).toUpperCase()}
              </div>
              {onlineUsers.includes(otherUser.id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-medium truncate ${hasUnread ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                  {otherUser.name}
                </h3>
                {lastDate && (
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {formatMessageTime(lastDate)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate max-w-[180px] ${hasUnread ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {lastMsg}
                </p>
                
                {/* 🔴 FIX: Only show if hasUnread is true AND unreadCount > 0 */}
                {hasUnread && unreadCount > 0 && (
                  <div className="flex items-center gap-1 ml-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {/* Only show number if greater than 1 */}
                    {unreadCount > 1 && (
                      <span className="text-xs text-red-500 font-medium">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-center py-8 text-gray-500">
      <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p className="text-sm">No conversations yet</p>
      <button 
        onClick={() => setShowNewChatModal(true)}
        className="mt-2 text-sm text-sidebar-primary hover:text-sidebar-primary/80 font-medium"
      >
        Start a new chat
      </button>
    </div>
  )}
</div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 relative bg-gray-50">
          {activeConversation ? (
            <Conversation
              conversationId={activeConversation}
              auth={auth}
              key={activeConversation}
              // 🔴 FIX: Remove onMessageSent prop
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-24 h-24 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-500">No conversation selected</p>
              <p className="text-sm text-gray-400 mt-1">Choose a conversation to start messaging</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowNewChatModal(true)}
                  className="px-4 py-2 bg-sidebar-primary text-white rounded-lg hover:bg-sidebar-primary/90 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  New Message
                </button>
                <Link
                  href="/cms/exit"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Exit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">New Message</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
                  autoFocus
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const isOnline = onlineUsers.includes(user.id);
                    return (
                      <button
                        key={user.id}
                        onClick={() => startConversation(user.id)}
                        className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          {isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-xs text-gray-500">
                            {isOnline ? "Online" : "Offline"}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-center py-4 text-gray-500">No users found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;