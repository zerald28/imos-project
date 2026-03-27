'use client';

import { useState } from "react";
import axios from "axios";
import { createSlateEditor } from "platejs";
import { EditorView } from "@/components/ui/editor";
import { BaseEditorKit } from "@/components/editor/editor-base-kit";
import CMSLayout from "./layout";
import { Heart, MessageCircle, Share2 } from "lucide-react";
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
  
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    value: post.content,
  });

  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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
      <div className="w-full py-8 flex justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-[900px] bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900 overflow-hidden">
          
          {/* Header with Image Placeholder */}
          <div className="h-48 bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 relative">
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="text-4xl text-white font-bold mb-2">{post.title}</h1>
              <div className="flex items-center text-white/90">
                <span>By {post.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="px-8 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={isLiking || !auth.user}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                } ${!auth.user ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart 
                  className={`h-5 w-5 transition-all ${
                    isLiked ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400 scale-110' : ''
                  } ${isLiking ? 'animate-pulse' : ''}`}
                />
                <span className="font-semibold dark:text-gray-200">{likesCount}</span>
                <span className="text-sm hidden sm:inline dark:text-gray-400">
                  {isLiked ? 'Liked' : 'Like'}
                </span>
              </button>

              {/* Comments Count */}
              <div className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold dark:text-gray-200">{comments.length}</span>
                <span className="text-sm hidden sm:inline dark:text-gray-400">Comments</span>
              </div>
            </div>

            {/* Share Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all">
              <Share2 className="h-5 w-5" />
              <span className="text-sm hidden sm:inline dark:text-gray-400">Share</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <EditorView 
                editor={editor}
                variant="default"
                className="min-h-[400px] dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <MessageCircle className="h-6 w-6" />
                Comments ({comments.length})
              </h2>

              {/* Comment Form */}
              {auth.user ? (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 p-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Share your thoughts..."
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={submitComment}
                      disabled={isSubmittingComment || !commentText.trim()}
                      className="px-6 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-sm hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 text-center text-emerald-700 dark:text-emerald-400">
                  Please <a href="/login" className="font-semibold underline hover:text-emerald-800 dark:hover:text-emerald-300">login</a> to join the conversation.
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length > 0 ? comments.map((comment) => {
                  const isAuthor = comment.user?.id === post.author.id;
                  const isCurrentUser = comment.user?.id === auth.user?.id;
                  const canDelete = isCurrentUser || auth.user?.role === "admin";

                  return (
                    <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 flex items-center justify-center text-white font-semibold text-sm">
                              {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                  {comment.user?.name || "Deleted User"}
                                </p>
                                {isAuthor && (
                                  <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                                    Author
                                  </span>
                                )}
                                {isCurrentUser && (
                                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
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
                                  className="px-3 py-1 bg-green-600 dark:bg-green-700 text-white text-xs rounded-md hover:bg-green-700 dark:hover:bg-green-800"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
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
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}