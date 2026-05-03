'use client';

import { useState } from "react";
import axios from "axios";
import { createSlateEditor } from "platejs";
import { EditorView } from "@/components/ui/editor";
import { BaseEditorKit } from "@/components/editor/editor-base-kit";
import CMSLayout from "./layout";
import { Heart, MessageCircle, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from 'date-fns';

interface PostAuthor {
  id: number;
  name: string;
}

interface AuthUser {
  id: number;
  name: string;
  role: string;
}

interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface PostProps {
  post: {
    id: number;
    title: string;
    content: any[];
    comments: Comment[];
    author: PostAuthor;
    likes_count: number;
  };
  auth: {
    user: AuthUser | null;
  };
  initialLiked: boolean;
}

export default function BlogShow({ post, auth, initialLiked }: PostProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [isShareClicked, setIsShareClicked] = useState(false);
  


  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);



  // Add this helper function at the top of BlogShow component:
const sanitizeContent = (content: any[]): any[] => {
  if (!Array.isArray(content)) return [{ type: 'p', children: [{ text: '' }] }];
  
  return content.map(node => {
    if (!node) return { type: 'p', children: [{ text: '' }] };
    
    const newNode = { ...node };
    
    // Fix image nodes
    if (newNode.type === 'img' && (!newNode.url || newNode.url === '')) {
      return null; // Remove invalid images
    }
    
    // Ensure children exist for nodes that need them
    if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'td', 'th'].includes(newNode.type)) {
      if (!Array.isArray(newNode.children)) {
        newNode.children = [{ text: '' }];
      }
    }
    
    // Recursively process children
    if (newNode.children && Array.isArray(newNode.children)) {
      newNode.children = sanitizeContent(newNode.children).filter(Boolean);
    }
    
    // Ensure text property exists
    if ('text' in newNode && newNode.text == null) {
      newNode.text = '';
    }
    
    return newNode;
  }).filter(Boolean);
};

// Then update the editor initialization:
const editor = createSlateEditor({
  plugins: BaseEditorKit,
  value: sanitizeContent(post.content),
});

  // Fallback copy method that works with HTTP and local IPs
  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-999999px";
    textArea.style.left = "-999999px";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setIsShareClicked(true);
        toast.success("Link copied to clipboard!", {
          icon: <Check className="h-4 w-4 text-green-500" />,
          duration: 2000
        });
        setTimeout(() => setIsShareClicked(false), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      toast.error("Please copy the URL manually from the address bar");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this post: ${post.title}`,
          url: currentUrl,
        });
        return;
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }
    
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setIsShareClicked(true);
        toast.success("Link copied to clipboard!", {
          icon: <Check className="h-4 w-4 text-green-500" />,
          duration: 2000
        });
        setTimeout(() => setIsShareClicked(false), 2000);
        return;
      } catch (err) {
        console.error("Clipboard API failed:", err);
      }
    }
    
    fallbackCopyText(currentUrl);
  };

  const handleLike = async () => {
    if (!auth.user) {
      toast.error("Please login to like posts");
      return;
    }

    setIsLiking(true);
    try {
      const response = await axios.post(`/cms/posts/${post.id}/like`);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likes_count);
      
      toast.success(response.data.liked ? "Post liked!" : "Post unliked", {
        icon: <Heart className={`h-4 w-4 ${response.data.liked ? 'fill-red-500 text-red-500' : ''}`} />
      });
    } catch (error: any) {
      console.error("Failed to like post", error);
      toast.error(error.response?.data?.message || "Failed to process like");
    } finally {
      setIsLiking(false);
    }
  };

  const submitComment = async () => {
    if (commentText.trim().length === 0) return;
    if (!auth.user) {
      toast.error("Please login to comment");
      return;
    }

    setIsSubmittingComment(true);
    try {
      const res = await axios.post(`/cms/posts/${post.id}/comments`, {
        content: commentText,
      });

      setComments([res.data, ...comments]);
      setCommentText("");
      toast.success("Comment posted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await axios.delete(`/cms/comments/${id}`);
      setComments(comments.filter(c => c.id !== id));
      toast.success("Comment deleted");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const updateComment = async (id: number) => {
    if (!editingCommentText.trim()) return;
    
    try {
      const res = await axios.put(`/cms/comments/${id}`, {
        content: editingCommentText,
      });
      setComments(
        comments.map((c) =>
          c.id === id ? res.data : c
        )
      );
      setEditingCommentId(null);
      setEditingCommentText("");
      toast.success("Comment updated");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  return (
    <CMSLayout>
      {/* Add responsive margins - no margin on mobile, auto margin on desktop */}
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 md:py-6">
        {/* Container with max-width and auto margins for desktop */}
        <div className="w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl md:mx-auto">
          <div className="w-full bg-white dark:bg-gray-600 shadow-sm dark:shadow-gray-900 overflow-hidden rounded-none md:rounded-xl">
            
            {/* Header - Responsive height and padding with expanded title */}
            <div className="h-32 sm:h-48 md:h-56 bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 relative">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                {/* Expanded title - remove line clamp and allow full title on desktop */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-1 sm:mb-2 break-words">
                  {post.title}
                </h1>
                <div className="flex items-center text-white/80 text-xs sm:text-sm">
                  <span>By {post.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Engagement Bar - Responsive padding */}
            <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Like Button - Responsive sizing */}
                <button
                  onClick={handleLike}
                  disabled={isLiking || !auth.user}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-sm sm:text-base ${
                    isLiked 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } ${!auth.user ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Heart 
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-all ${
                      isLiked ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400 scale-110' : ''
                    } ${isLiking ? 'animate-pulse' : ''}`}
                  />
                  <span className="font-semibold dark:text-gray-200 text-sm sm:text-base">{likesCount}</span>
                  <span className="text-xs sm:text-sm hidden sm:inline dark:text-gray-400">
                    {isLiked ? 'Liked' : 'Like'}
                  </span>
                </button>

                {/* Comments Count - Responsive */}
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold dark:text-gray-200 text-sm sm:text-base">{comments.length}</span>
                  <span className="text-xs sm:text-sm hidden sm:inline dark:text-gray-400">Comments</span>
                </div>
              </div>

              {/* Share Button - Responsive */}
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all group text-sm sm:text-base"
              >
                {isShareClicked ? (
                  <>
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span className="text-xs sm:text-sm hidden sm:inline text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm hidden sm:inline dark:text-gray-400">Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Content - Responsive padding */}
            <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert">
                <EditorView 
                  editor={editor}
                  variant="default"
                  className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px] dark:bg-gray-600 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Comments Section - Responsive padding */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  Comments ({comments.length})
                </h2>

                {/* Comment Form - Responsive */}
                {auth.user ? (
                  <div className="mb-6 sm:mb-8 bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-gray-900 p-3 sm:p-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Share your thoughts..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={submitComment}
                        disabled={isSubmittingComment || !commentText.trim()}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-sm hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 sm:mb-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4 text-center text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                    Please <a href="/login" className="font-semibold underline hover:text-emerald-800 dark:hover:text-emerald-300">login</a> to join the conversation.
                  </div>
                )}

                {/* Comments List - Responsive spacing */}
                <div className="space-y-3 sm:space-y-4">
                  {comments.length > 0 ? comments.map((comment) => {
                    const isAuthor = comment.user?.id === post.author.id;
                    const isCurrentUser = comment.user?.id === auth.user?.id;
                    const canDelete = isCurrentUser || auth.user?.role === "admin";

                    return (
                      <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 p-3 sm:p-4">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                                {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                                    {comment.user?.name || "Deleted User"}
                                  </p>
                                  {isAuthor && (
                                    <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                                      Author
                                    </span>
                                  )}
                                  {isCurrentUser && (
                                    <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                                      You
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                </p>
                              </div>
                            </div>

                            {editingCommentId === comment.id ? (
                              <div className="mt-2">
                                <textarea
                                  value={editingCommentText}
                                  onChange={(e) => setEditingCommentText(e.target.value)}
                                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                  rows={3}
                                />
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => updateComment(comment.id)}
                                    className="px-2 sm:px-3 py-1 bg-green-600 dark:bg-green-700 text-white text-xs rounded-md hover:bg-green-700 dark:hover:bg-green-800"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingCommentId(null)}
                                    className="px-2 sm:px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm sm:text-base break-words">
                                {comment.content}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                            {isCurrentUser && editingCommentId !== comment.id && (
                              <button
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditingCommentText(comment.content);
                                }}
                                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-medium"
                              >
                                Edit
                              </button>
                            )}

                            {canDelete && (
                              <button
                                onClick={() => deleteComment(comment.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs font-medium"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                      <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 text-gray-400 dark:text-gray-600" />
                      <p className="text-sm sm:text-base">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}