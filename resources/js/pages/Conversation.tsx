
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";
import { Link } from '@inertiajs/react';
import { route } from "ziggy-js";
import { Minus, X } from "lucide-react";
interface User {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender: User;
  content: string;
  attachment_url?: string;
  is_edited: boolean;
  created_at?: string;
}
// Assuming `linkedSwine` is the array from your fetch
interface GroupedListing {
  listingId: number;
  listing: {
    id: number;
    title: string;
    photo_url?: string;
    price: number;
    price_unit_type?: string;
    description?: string;
  };
  swines: {
    id: number;
    breed?: string;
    sex?: string;
    estimated_weight?: number;
    thumbnail?: string;
  }[];
}


interface Props {
  auth: { user: User };
  conversationId: number;
  onMessageSent?: () => void; // Make it optional
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError)
      return <div className="p-4 text-red-500">Something went wrong in this conversation.</div>;
    return this.props.children;
  }
}

const Conversation: React.FC<Props> = ({ auth, conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkedSwine, setLinkedSwine] = useState<any[]>([]);
const groupedListings: GroupedListing[] = [];
const [conversation, setConversation] = useState<any>(null);


linkedSwine.forEach((item) => {
  if (!item.listing) return;

  const existing = groupedListings.find(g => g.listingId === item.listing.id);
  const swineData = item.listing_swine
    ? {
        id: item.listing_swine.id,
        breed: item.listing_swine.breed,
        sex: item.listing_swine.sex,
        estimated_weight: item.listing_swine.estimated_weight,
        thumbnail: item.listing_swine.thumbnail,
      }
    : null;

  if (existing) {
    if (swineData) existing.swines.push(swineData);
  } else {
    groupedListings.push({
      listingId: item.listing.id,
      listing: item.listing,
      swines: swineData ? [swineData] : [],
    });
  }
});

  

  // Fetch initial messages
  useEffect(() => {
  if (!conversationId) return;
 


  const fetchConversationAndMessages = async () => {
    try {
      // 1️⃣ Fetch the conversation details
      const convoRes = await axios.get(`/conversations/${conversationId}`);
      const convo = convoRes.data.data;
      

      // store the conversation for header
      setConversation(convo);

      // 2️⃣ Extract linked swine from marketplace_conversations
      const rawLinked = convo.marketplace_conversations || [];
      const linked = rawLinked.map((mc: any) => ({
        id: mc.id,
        listingId: mc.listing_id,
        listingSwineId: mc.listing_swine_id,
        listing: mc.listing
          ? {
              id: mc.listing.id,
              title: mc.listing.title || "Untitled",
              photo_url: mc.listing.photo_url || null,
              price:
                mc.listing.price != null ? Number(mc.listing.price) : null,
              price_unit_type: mc.listing.price_unit_type || null,
              description: mc.listing.description || "",
            }
          : null,
        listing_swine: mc.listing_swine
          ? {
              id: mc.listing_swine.id,
              breed: mc.listing_swine.breed || null,
              sex: mc.listing_swine.sex || null,
              estimated_weight: mc.listing_swine.estimated_weight
                ? Number(mc.listing_swine.estimated_weight)
                : null,
              thumbnail: mc.listing_swine.thumbnail || null,
            }
          : null,
      }));
      setLinkedSwine(linked);

      // 3️⃣ Fetch the messages
      const res = await axios.get(
        `/conversations/${conversationId}/messages?page=1`
      );
      const payload = res.data.data || [];
      const msgs = Array.isArray(payload.data)
        ? payload.data.slice().reverse()
        : payload.slice().reverse();
      setMessages(msgs);
      setPage(1);
      setHasMore(Boolean(payload.next_page_url));
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "auto" }),
        50
      );
    } catch (err) {
      console.error("Fetch conversation/messages error:", err);
      setMessages([]);
    }
  };

  fetchConversationAndMessages();
}, [conversationId]);


  // Real-time subscription with Echo
 useEffect(() => {
  if (!window.Echo || !conversationId) return;

  const channel = window.Echo.join(`conversation.${conversationId}`);

  // Initialize current users typing in this conversation
//   channel.here((users: User[]) => {
//     setTypingUsers(users.filter(u => u.id !== auth.user.id));
//   });

//   // User joined the conversation
//   channel.joining((user: User) => {
//     setTypingUsers(prev => [...prev, user]);
//   });

//   // User left the conversation
//   channel.leaving((user: User) => {
//     setTypingUsers(prev => prev.filter(u => u.id !== user.id));
//   });

  // Listen for message deletion
channel.listen(".message.deleted", (e: any) => {
  setMessages(prev => prev.filter(m => m.id !== e.messageId));
});


  // Listen for typing events in this conversation only
 channel.listen(".user.typing", (e: any) => {
    if (e.userId === auth.user.id) return; // ignore self

    setTypingUsers((prev) => {
        // only add if not already present
        if (prev.some(u => u.id === e.userId)) return prev;
        return [...prev, { id: e.userId, name: e.userName }];
    });

    // remove after 3s if no further typing
    setTimeout(() => {
        setTypingUsers((prev) => prev.filter(u => u.id !== e.userId));
    }, 3000);
});


  // Listen for new messages
 channel.listen(".message.sent", (e: any) => {
  // If the broadcasted message does not have a sender field,
  // fallback to sender_id if available
  const incomingMessage = {
    ...e.message,
    sender: e.message.sender || e.user || { id: e.message.sender_id, name: e.message.sender_name || "Unknown" },
  };

  // Append the message only if it's not already in the list
  setMessages(prev => (prev.some(m => m.id === incomingMessage.id) ? prev : [...prev, incomingMessage]));
});


return () => {
  channel.stopListening(".message.sent")
    .stopListening(".message.deleted")
    .stopListening(".user.typing");
  window.Echo.leave(`conversation.${conversationId}`);
  setTypingUsers([]);
};

}, [conversationId]);



  // Typing indicator
// 👇 Add a ref to track last typing time
const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const lastTypingRef = useRef<number>(0);

// Called on every input change
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (text.trim() !== "") {
    axios.post(`/conversations/${conversationId}/typing`).catch(() => {});
}


    // throttle typing events: 1 per 2 seconds max
    const now = Date.now();
    if (now - lastTypingRef.current > 2000) {
        axios.post(`/conversations/${conversationId}/typing`).catch(() => {});
        lastTypingRef.current = now;
    }

    // remove typing after 3s of inactivity
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
        // no backend event needed to stop typing; frontend removes automatically
        setTypingUsers((prev) => prev.filter(u => u.id !== auth.user.id));
    }, 3000);
};


  // Send message
 const [isSending, setIsSending] = useState(false); // track sending state

// In Conversation.tsx, update the sendMessage function:
const sendMessage = async () => {
  if (isSending) return;
  if (!text.trim() && !fileInputRef.current?.files?.length) return;

  setIsSending(true);

  try {
    const formData = new FormData();
    formData.append("content", text);
    if (fileInputRef.current?.files?.length) {
      formData.append("attachment", fileInputRef.current.files[0]);
    }

    const res = await axios.post(`/conversations/${conversationId}/messages`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data?.data) throw new Error("No message returned from server");

    // Clear input
    setText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    // No need to manually add message - it will come through Echo
    // The message will be added by the real-time listener
    
  } catch (err: any) {
    console.error("Send message error:", err.response?.data || err.message);
    alert("Failed to send message. Check console for details.");
  } finally {
    setIsSending(false);
  }
};

  // Infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = async () => {
      if (container.scrollTop < 100 && hasMore && !isLoadingRef.current) {
        isLoadingRef.current = true;
        const nextPage = page + 1;
        try {
          const res = await axios.get(`/conversations/${conversationId}/messages?page=${nextPage}`);
          const payload = res.data.data;
          const older = (payload.data || []).slice().reverse();
          const prevHeight = container.scrollHeight;
          setMessages(prev => [...older, ...prev]);
          setPage(nextPage);
          setHasMore(Boolean(payload.next_page_url));
          setTimeout(() => {
            container.scrollTop = container.scrollHeight - prevHeight + container.scrollTop;
            isLoadingRef.current = false;
          }, 50);
        } catch (err) {
          console.error("Fetch older messages failed:", err);
          isLoadingRef.current = false;
        }
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [conversationId, page, hasMore]);

  // Auto-scroll new messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (nearBottom) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // Delete a message
const handleDeleteMessage = async (id: number) => {
  if (!confirm("Delete this message?")) return;

  try {
    await axios.delete(`/messages/${id}`);
    setMessages(prev => prev.filter(m => m.id !== id));
  } catch (err: any) {
    console.error("Delete message failed:", err.response?.data || err.message);
    alert("Failed to delete message.");
  }
};


  return (
    <ErrorBoundary>
         

      <div className="flex flex-col h-full px-4 bg-gray-50 relative ">
       {conversation && (
  <div className="flex items-center justify-between bg-white shadow-md py-1 px-2 lg:py-1 sticky top-2 z-10">

    {/* LEFT: Conversation User Name */}
    <span className="font-semibold lg:ml-5 text-sm lg:text-lg">
      {conversation.user_one.id === auth.user.id
        ? conversation.user_two.name
        : conversation.user_one.name}
    </span>

    {/* RIGHT: Linked Swine / Listings */}
    {linkedSwine.length > 0 && (
      <div className="flex space-x-2 overflow-x-auto max-w-[65%] p-1">

        {groupedListings.map((group, i) => (
          <div
            key={i}
            className="flex flex-row border rounded-lg bg-gray-50 min-w-full max-w-[280px]"
          >
            {/* Image */}
        <Link href={route("marketplace.show", group.listing.id)}>
  {group.listing.photo_url ? (
    <img
      src={group.listing.photo_url}
      alt={group.listing.title}
      className="w-20 h-20 object-cover p-2 rounded-md"
    />
  ) : (
    <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs text-center p-1">
      No image available
    </div>
  )}
</Link>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between p-2">
              <div>
                <p className="font-semibold text-xs">{group.listing.title}</p>
                <p className="text-green-600 text-xs font-medium">
                  ₱{Number(group.listing.price).toLocaleString()}{" "}
                  {group.listing.price_unit_type ?? ""}
                </p>
              </div>

              <div className="mt-1 space-y-1 overflow-y-auto max-h-12">
                {group.swines.map((swine) => (
                  <div
                    key={swine.id}
                    className="flex justify-between text-[10px] w-max gap-1 bg-transparent"
                  >
                    <span>{swine.breed ?? "N/A"}</span>
                    <span>{swine.sex ?? "N/A"}</span>
                    <span>{swine.estimated_weight ?? "-"} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>
    )}
  </div>
)}

        

        <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pt-4 px-2">
          {messages.map((m, index) => {
            const isOwn = m.sender?.id === auth.user.id; // right = your messages
            const senderName = m.sender?.name || "Unknown";
            return (
             <div
  key={`${m.id}-${index}`}
  className={`flex transition-all duration-300 ease-in-out ${
    isOwn ? "justify-end" : "justify-start"
  }`}
>

  <div
    className={`relative max-w-md p-3 pt-5 rounded-xl min-w-[70px] shadow-sm ${
      isOwn ? "bg-sidebar-primary text-white" : "bg-gray-100 text-black"
    }`}
  >
    <p>{m.content}</p>

    {/* Attachment if any */}
    {m.attachment_url && (
      <a
        href={m.attachment_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-xs mt-1 underline"
      >
        View Attachment
      </a>
    )}

    {/* 🗑️ Delete button - only for sender */}
    {isOwn && (
      <button
        onClick={() => handleDeleteMessage(m.id)}
        className="absolute top-1 right-2 text-xs  text-red-300 hover:text-red-600"
        title="Delete message"
      >
        <X className="text-chart-5 h-4 w-4 "/>
      </button>
    )}
  </div>
</div>

            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {typingUsers.length > 0 && (
          <div className="text-sm bg-transparent absolute bottom-12 text-gray-500 mb-2">
            {typingUsers.map(u => u.name).join(", ")} typing...
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 pt-0 mb-2">
          <button onClick={() => setShowEmoji(prev => !prev)}>😊</button>
          {showEmoji && (
            <div className="absolute bottom-20 left-2 z-10">
              <Picker onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
            </div>
          )}
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
          />
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          <button onClick={() => fileInputRef.current?.click()}>📎</button>
         <button
  onClick={sendMessage}
  disabled={isSending}
  className={`bg-sidebar-primary hover:bg-emarald-600 text-white px-4 py-2 rounded-lg ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
>
  Send
</button>

        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Conversation;