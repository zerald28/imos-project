import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { route } from "ziggy-js";
import AppLayout from "@/layouts/marketplaceLayout";
import { 
  ArrowLeft,
  MapPin,
  Tag,
  FileText,
  Info,
  Save,
  Edit3,
  AlertCircle,
  CheckCircle2,
  PhilippinePeso,
  BookOpen,
  Newspaper,
  ExternalLink,
  Calendar,
  PlusCircle,
  RefreshCw
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: any;
  created_at: string;
  thumbnail?: string;
  category?: {
    name: string;
  };
}

interface Props {
  categories: string[];
  location?: string | null;
  blogPosts?: BlogPost[];
  service?: {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    location: string;
    blog_post_id?: number | null;
  };
  newBlogPost?: {
    id: number;
    slug: string;
    title: string;
  } | null;
}

const CreateService: React.FC<Props> = ({ categories, location, blogPosts = [], service, newBlogPost }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBlogSelector, setShowBlogSelector] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data, setData, post, put, errors, processing } = useForm({
    title: service?.title || "",
    description: service?.description || "",
    category: service?.category || categories[0] || "",
    price: service?.price || "",
    location: service?.location || location || "",
    blog_post_id: service?.blog_post_id || "",
  });

  // Handle new blog post from URL parameter
  useEffect(() => {
    if (newBlogPost && newBlogPost.id) {
      // Check if the blog post is already in our list
      const exists = blogPosts.some(p => p.id === newBlogPost.id);
      
      if (!exists) {
        // If not, add it to the list temporarily
        const tempPost: BlogPost = {
          id: newBlogPost.id,
          title: newBlogPost.title,
          slug: newBlogPost.slug,
          content: '',
          created_at: new Date().toISOString(),
        };
        
        // Add to blogPosts array (this is just for UI, will be refreshed on next load)
        blogPosts.unshift(tempPost);
      }
      
      // Select the newly created blog post
      const postToSelect = blogPosts.find(p => p.id === newBlogPost.id) || {
        id: newBlogPost.id,
        title: newBlogPost.title,
        slug: newBlogPost.slug,
        content: '',
        created_at: new Date().toISOString(),
      };
      
      setSelectedBlogPost(postToSelect);
      setData("blog_post_id", newBlogPost.id);
      setShowBlogSelector(false);
      
      // Show success message
      setNotification({
        type: 'success',
        message: 'Blog post created and linked successfully!'
      });
    }
  }, [newBlogPost]);

  // Load initial blog post if exists
  useEffect(() => {
    if (service?.blog_post_id && blogPosts.length > 0 && !newBlogPost) {
      const post = blogPosts.find(p => p.id === service.blog_post_id);
      if (post) {
        setSelectedBlogPost(post);
      }
    }
  }, [service, blogPosts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    
    const options = {
      preserveScroll: true,
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    };

    if (service) {
      put(route("marketplace.services.update", service.id), options);
    } else {
      post(route("marketplace.services.store"), options);
    }
  };

  const handleBlogPostSelect = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setData("blog_post_id", post.id);
    setShowBlogSelector(false);
  };

  const removeBlogPost = () => {
    setSelectedBlogPost(null);
    setData("blog_post_id", "");
  };

  const handleCreateBlog = () => {
    // Store current form data in session storage to restore later
    sessionStorage.setItem('pendingServiceData', JSON.stringify({
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      location: data.location,
    }));
    
    // Open blog creation in new tab with return URL
    const returnUrl = encodeURIComponent(window.location.href);
    window.open(`/cms/create?returnTo=${returnUrl}&source=service`, '_blank');
  };

  const refreshBlogPosts = async () => {
    setIsRefreshing(true);
    try {
      // Refresh the page to get latest blog posts
      Inertia.reload({ 
        only: ['blogPosts'],
        onSuccess: () => {
          setIsRefreshing(false);
        }
      });
    } catch (error) {
      setIsRefreshing(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContentPreview = (content: any) => {
    if (typeof content === 'string') return content.substring(0, 100) + '...';
    if (content && typeof content === 'object') {
      return 'Blog post content available';
    }
    return '';
  };

  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const isEdit = !!service;
  const pageTitle = isEdit ? "Edit Service" : "Create New Service";
  const pageDescription = isEdit 
    ? "Update your livestock service details" 
    : "List a new service to offer to farmers and livestock owners";

  // Add this useEffect to listen for messages from the blog creation tab
  useEffect(() => {
    let notificationTimer: NodeJS.Timeout;
    
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from our origin
      if (event.origin !== window.location.origin) return;
      
      // Check if it's our blog created message
      if (event.data?.type === 'BLOG_CREATED') {
        const newPost = event.data.payload;
        
        // Check if the blog post is already in our list
        const exists = blogPosts.some(p => p.id === newPost.id);
        
        if (!exists) {
          // Create a temporary blog post object
          const tempPost: BlogPost = {
            id: newPost.id,
            title: newPost.title,
            slug: newPost.slug,
            content: '',
            created_at: new Date().toISOString(),
          };
          
          // Add to blogPosts array
          blogPosts.unshift(tempPost);
        }
        
        // Select the newly created blog post
        const postToSelect = blogPosts.find(p => p.id === newPost.id) || {
          id: newPost.id,
          title: newPost.title,
          slug: newPost.slug,
          content: '',
          created_at: new Date().toISOString(),
        };
        
        setSelectedBlogPost(postToSelect);
        setData("blog_post_id", newPost.id);
        setShowBlogSelector(false);
        
        // Clear any existing notification timer
        if (notificationTimer) {
          clearTimeout(notificationTimer);
        }
        
        // Show success message with 5 second duration
        setNotification({
          type: 'success',
          message: 'Blog post created and linked successfully!'
        });
        
        // Auto-dismiss after 5 seconds
        notificationTimer = setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    };

    // Add event listener
    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
    };
  }, [blogPosts]);

  return (
    <AppLayout>
      <Head title={pageTitle} />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notification */}
          {notification && (
            <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
              <Alert variant={notification.type === 'success' ? 'default' : 'destructive'} 
                className="dark:bg-gray-800 dark:border-gray-700">
                <AlertDescription className="dark:text-gray-300">{notification.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Header with back button */}
          <div className="mb-6">
            <Link
              href={route("marketplace.services.index")}
              className="inline-flex items-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          {/* Success Alert */}
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 animate-in slide-in-from-top-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-400">Success!</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                {isEdit ? "Service updated successfully!" : "Service created successfully!"}
              </AlertDescription>
            </Alert>
          )}

          {/* Main Form Card */}
          <Card className="border-2 shadow-xl pt-0 pb-0 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            {/* Card Header with decorative element */}
            <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 dark:from-green-600 dark:via-green-700 dark:to-green-800" />
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent dark:from-green-400 dark:to-green-500">
                    {pageTitle}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 dark:text-gray-400">
                    {pageDescription}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  {isEdit ? 'Editing Mode' : 'New Listing'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Service Title
                  </label>
                  <Input
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="e.g. Professional Vaccination Service"
                    className={`border-2 focus:border-green-500 transition-colors dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 ${
                      errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors.title ? (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose a clear, descriptive title</p>
                  )}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Description
                  </label>
                  <Textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Describe your service in detail... What do you offer? What makes it special?"
                    rows={5}
                    className={`border-2 focus:border-green-500 transition-colors resize-none dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 ${
                      errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors.description ? (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Minimum 20 characters. Be detailed to attract more customers.
                    </p>
                  )}
                </div>

                {/* Two Column Layout for Category and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Info className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Category
                    </label>
                    <Select
                      value={data.category}
                      onValueChange={(value) => setData("category", value)}
                    >
                      <SelectTrigger className={`border-2 focus:border-green-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 ${
                        errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="dark:text-gray-300 dark:focus:bg-gray-700">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Price Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <PhilippinePeso className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Price (PHP)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={`pl-8 border-2 focus:border-green-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 ${
                          errors.price ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      />
                    </div>
                    {errors.price ? (
                      <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.price}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Set a competitive price</p>
                    )}
                  </div>
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Service Location
                  </label>
                  <Input
                    value={data.location}
                    onChange={(e) => setData("location", e.target.value)}
                    placeholder="e.g. Bunawan, Agusan del Sur"
                    className={`border-2 focus:border-green-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 ${
                      errors.location ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors.location ? (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.location}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">Where will this service be available?</p>
                  )}
                </div>

                {/* Blog Post Selection Section */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Link a Blog Post (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {/* Create Blog Button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCreateBlog}
                        className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                      >
                        <PlusCircle className="w-3 h-3 mr-1" />
                        Create New Blog
                      </Button>
                      
                      {/* Refresh Button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={refreshBlogPosts}
                        disabled={isRefreshing}
                        className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      >
                        <RefreshCw className={`w-3 h-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>

                      {selectedBlogPost && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBlogPost(null);
                            setData("blog_post_id", "");
                            setShowBlogSelector(true);
                          }}
                          className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Change
                        </Button>
                      )}
                      
                      {!selectedBlogPost && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowBlogSelector(!showBlogSelector)}
                          className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30"
                        >
                          <Newspaper className="w-3 h-3 mr-1" />
                          {showBlogSelector ? 'Hide Posts' : 'Browse Posts'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Selected Blog Post Display */}
                  {selectedBlogPost && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Newspaper className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <h4 className="font-medium text-green-800 dark:text-green-400">Linked Blog Post</h4>
                            {newBlogPost?.id === selectedBlogPost.id && (
                              <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs">
                                Newly Created
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                            {selectedBlogPost.thumbnail ? (
                              <img 
                                src={selectedBlogPost.thumbnail} 
                                alt={selectedBlogPost.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-green-200 dark:bg-green-800/50 rounded-lg flex items-center justify-center">
                                <Newspaper className="w-8 h-8 text-green-500 dark:text-green-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <Link
                                href={`/cms/blog/${selectedBlogPost.slug}`}
                                target="_blank"
                                className="font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1"
                              >
                                {selectedBlogPost.title}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {getContentPreview(selectedBlogPost.content)}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="w-3 h-3" />
                                {formatDate(selectedBlogPost.created_at)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeBlogPost}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 self-start"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Blog Post Selector Dropdown */}
                  {showBlogSelector && !selectedBlogPost && (
                    <>
                      {blogPosts.length > 0 ? (
                        <Card className="border-2 border-green-200 dark:border-green-800 dark:bg-gray-800">
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm dark:text-gray-200">Your Blog Posts</CardTitle>
                            <CardDescription className="text-xs dark:text-gray-400">
                              Select a post to link with this service
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-0">
                            <ScrollArea className="h-64">
                              <div className="divide-y dark:divide-gray-700">
                                {blogPosts.map((post) => (
                                  <div
                                    key={post.id}
                                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                                    onClick={() => handleBlogPostSelect(post)}
                                  >
                                    <div className="flex items-start gap-3">
                                      {post.thumbnail ? (
                                        <img 
                                          src={post.thumbnail} 
                                          alt={post.title}
                                          className="w-12 h-12 object-cover rounded-lg"
                                        />
                                      ) : (
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                          <Newspaper className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">{post.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                          {getContentPreview(post.content)}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500">
                                          <Calendar className="w-3 h-3" />
                                          {formatDate(post.created_at)}
                                          {post.category && (
                                            <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-400">
                                              {post.category.name}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      ) : (
                        <Alert className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <AlertTitle className="text-gray-800 dark:text-gray-200">No blog posts yet</AlertTitle>
                          <AlertDescription className="text-gray-600 dark:text-gray-400">
                            <p className="mb-2">You haven't created any blog posts.</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleCreateBlog}
                              className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                            >
                              <PlusCircle className="w-3 h-3 mr-1" />
                              Create Your First Blog Post
                            </Button>
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </div>

                <Separator className="my-6 dark:bg-gray-700" />

                {/* Preview Section */}
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-100 dark:border-green-800">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Listing Preview
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-600 dark:text-gray-400">Title:</span> <span className="dark:text-gray-300">{data.title || 'Not set'}</span></p>
                    <p><span className="font-medium text-gray-600 dark:text-gray-400">Category:</span> <span className="dark:text-gray-300">{data.category}</span></p>
                    <p><span className="font-medium text-gray-600 dark:text-gray-400">Price:</span> <span className="dark:text-gray-300">₱{data.price || '0'}</span></p>
                    <p><span className="font-medium text-gray-600 dark:text-gray-400">Location:</span> <span className="dark:text-gray-300">{data.location || 'Not set'}</span></p>
                    {selectedBlogPost && (
                      <p><span className="font-medium text-gray-600 dark:text-gray-400">Linked Post:</span> <span className="dark:text-gray-300">{selectedBlogPost.title}</span></p>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={processing}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 text-white font-semibold py-6 text-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {processing ? 'Saving...' : (isEdit ? 'Update Service' : 'Create Service')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex-1 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 py-6 text-lg dark:border-gray-600 dark:text-gray-300"
                    disabled={processing}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700 px-6 py-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Info className="w-3 h-3" />
                By creating a service, you agree to our terms and conditions. All fields are required.
              </p>
            </CardFooter>
          </Card>

          {/* Tips Card */}
          <Card className="mt-6 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips for a Great Listing</h3>
                  <ul className="space-y-1 text-sm text-green-100 dark:text-green-200">
                    <li>• Use clear, high-quality photos (coming soon)</li>
                    <li>• Be specific about your services and pricing</li>
                    <li>• Include your availability and response time</li>
                    <li>• Highlight your experience and qualifications</li>
                    <li>• Link relevant blog posts to build credibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateService;