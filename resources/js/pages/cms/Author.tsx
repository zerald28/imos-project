import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MoreHorizontal, 
  Pencil, 
  Heart, 
  FileText, 
  Bookmark,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  ThumbsUp,
  FolderIcon
} from 'lucide-react';
import CMSLayout from './layout';
import { Toaster } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  status: string;
  updated_at: string;
  category?: Category;
  author?: Author;
  slug: string;
  likes_count?: number;
}

interface Stats {
  total_authored: number;
  total_liked: number;
  total_likes_received: number;
}

interface Props {
  authoredPosts: Post[];
  likedPosts: Post[];
  userRole: 'admin' | 'enforcer' | 'author';
  userName: string;
  stats: Stats;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function AuthorDashboard({ 
  authoredPosts: initialAuthoredPosts, 
  likedPosts: initialLikedPosts, 
  userRole, 
  userName,
  stats,
  flash
}: Props) {
  const [authoredPosts, setAuthoredPosts] = useState(initialAuthoredPosts);
  const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
  const [activeTab, setActiveTab] = useState('authored');

  // Show flash messages when component mounts
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleEdit = (postId: number) => {
    Inertia.get(`/cms/blog/${postId}/edit`, {}, { preserveState: true, replace: true });
  };

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const deletedPost = authoredPosts.find(p => p.id === postId);
    setAuthoredPosts((prev) => prev.filter((p) => p.id !== postId));

    try {
        const response = await axios.delete(`/cms/blog/${postId}`);
        toast.success(response.data.message || 'Blog deleted successfully!');
    } catch (error) {
        console.error("Failed to delete post", error);
        toast.error('Failed to delete post. Please try again.');
        if (deletedPost) {
            setAuthoredPosts((prev) => [...prev, deletedPost]);
        }
    }
};

  const handleUnlike = async (postId: number) => {
    if (!confirm("Remove this post from your liked list?")) return;

    const unlikedPost = likedPosts.find(p => p.id === postId);
    
    try {
      await axios.post(`/cms/posts/${postId}/like`);
      setLikedPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success('Post unliked successfully!');
    } catch (error) {
      console.error("Failed to unlike post", error);
      toast.error('Failed to unlike post. Please try again.');
      if (unlikedPost) {
        setLikedPosts((prev) => [...prev, unlikedPost]);
      }
    }
  };

  const handleWriteEvent = (postId: number) => {
    Inertia.visit(`/cms/blog/create?post_id=${postId}`);
  };

  const handleWriteBlog = () => {
    Inertia.visit(`/cms/create`);
  };

  const handleView = (slug: string) => {
    Inertia.get(`/cms/blog/${slug}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'archived': return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400';
      case 'restricted': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default: return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPostCard = (post: Post, type: 'authored' | 'liked') => (
    <Card key={post.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-green-500 dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title and Author */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 cursor-pointer" 
                  onClick={() => handleView(post.slug)}
                >
                  {post.title}
                </h2>
                {type === 'liked' && post.author && (
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                    by {post.author.name}
                  </Badge>
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                
                <div className="flex items-center gap-1">
                  <FolderIcon className="h-4 w-4" />
                  <span>{post.category?.name || 'Uncategorized'}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.updated_at)}</span>
                </div>

                {post.likes_count !== undefined && (
                  <div className="flex items-center gap-1">
                    <Heart className={`h-4 w-4 ${type === 'liked' ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' : 'dark:text-gray-500'}`} />
                    <span className="dark:text-gray-400">{post.likes_count} likes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MoreHorizontal size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuItem onClick={() => handleView(post.slug)} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>

                {type === 'authored' && (
                  <>
                    <DropdownMenuItem onClick={() => handleEdit(post.id)} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(post.id)} className="cursor-pointer text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}

                {type === 'liked' && (
                  <DropdownMenuItem onClick={() => handleUnlike(post.id)} className="cursor-pointer text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
                    <Heart className="mr-2 h-4 w-4" />
                    Unlike
                  </DropdownMenuItem>
                )}

                {(userRole === 'admin' || userRole === 'enforcer') && type === 'authored' && (
                  <DropdownMenuItem onClick={() => handleWriteEvent(post.id)} className="cursor-pointer dark:text-gray-300 dark:hover:bg-gray-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Write Event
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CMSLayout>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 dark:bg-gray-900">
        {/* Header with Stats */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, {userName}!</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Manage your blog posts and see what you've liked</p>
            </div>
            
            <button 
              onClick={handleWriteBlog}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <Pencil size={16} className="sm:size-5" />
              <span className="font-medium">Write New Blog</span>
            </button>
          </div>

          {/* Stats Cards - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">Authored Posts</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">{stats.total_authored}</p>
                  </div>
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 dark:text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">Liked Posts</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400">{stats.total_liked}</p>
                  </div>
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 dark:text-red-500 fill-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800 sm:col-span-2 md:col-span-1">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">Likes Received</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-400">{stats.total_likes_received}</p>
                  </div>
                  <ThumbsUp className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 dark:text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for Authored vs Liked Posts */}
        <Tabs defaultValue="authored" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger 
              value="authored" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-700 text-sm sm:text-base"
            >
              <FileText className="h-4 w-4" />
              My Posts ({authoredPosts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="liked" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-700 text-sm sm:text-base"
            >
              <Heart className="h-4 w-4" />
              Liked Posts ({likedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="authored">
            {authoredPosts.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2 sm:mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">You haven't written any blog posts yet.</p>
                <button 
                  onClick={handleWriteBlog}
                  className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg transition-colors text-sm"
                >
                  Write Your First Post
                </button>
              </div>
            ) : (
              <ScrollArea className="h-[500px] sm:h-[600px] pr-2 sm:pr-4">
                <div className="space-y-3 sm:space-y-4">
                  {authoredPosts.map(post => renderPostCard(post, 'authored'))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="liked">
            {likedPosts.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2 sm:mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">You haven't liked any blog posts yet.</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                  Browse blogs and click the heart icon to like posts you enjoy!
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[500px] sm:h-[600px] pr-2 sm:pr-4">
                <div className="space-y-3 sm:space-y-4">
                  {likedPosts.map(post => renderPostCard(post, 'liked'))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <Toaster position="top-right" richColors />
      </div>
    </CMSLayout>
  );
}