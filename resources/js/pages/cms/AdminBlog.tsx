// resources/js/Pages/cms/AdminBlog.tsx
import { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/admin-layout";
import { 
    MoveRight, 
    Pencil, 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    Calendar,
    User,
    FileText,
    Grid,
    List,
    ChevronDown,
    MoreVertical,
    Shield,
    Users,
    Globe,
    Edit3,
    RefreshCw,
    MoveLeft
} from "lucide-react";
import { toast } from "sonner";


interface Post {
    id: number;
    title: string;
    slug: string;
    author_id: number;
    thumbnail: string;
    status: string;
    state: string;
    created_at: string;
    author: { id: number; name: string; role: string };
}

interface Props {
    authUser: { id: number; role: string };
    adminEnforcerPosts: Post[];
    otherAuthorPosts: Post[];
    authorsList: { id: number; name: string }[];
}

export default function Index({ authUser, adminEnforcerPosts, otherAuthorPosts, authorsList }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState<'admin' | 'other' | 'imos'>('admin');
    const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('list');
    const [showFilters, setShowFilters] = useState(false);
    
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        state: 'pending',
        author: 'all',
    });

    const applyFilter = () => {
        router.get('/cms/admin/bloglist', filters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        applyFilter();
    }, [filters]);

    const handleShowAll = () => {
        setShowFilters(true);
        setFilters({ ...filters, state: "all" });
        applyFilter();
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            state: 'all',
            author: 'all',
        });
        applyFilter();
    };

    // Calculate statistics
    const pendingTotal = otherAuthorPosts.filter(post => post.state === 'pending').length;
    const approvedTotal = otherAuthorPosts.filter(post => post.state === 'approve').length;
    const restrictedTotal = otherAuthorPosts.filter(post => post.status === 'restricted').length;
    const totalPosts = adminEnforcerPosts.length + otherAuthorPosts.length;

    const toggleEdit = () => setEditMode(!editMode);

    const canEdit = (post: Post) =>
        authUser.role === "admin" || authUser.role === "enforcer" || post.author_id === authUser.id;

  const deletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

    const loadingToast = toast.loading("Deleting post...");

    try {
        const response = await axios.delete(`/cms/blog/${id}`);
        
        toast.dismiss(loadingToast);
        
        toast.success(response.data.message || 'Blog deleted successfully!', {
            duration: 4000,
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            richColors: true,
        });

        // Reload the page to update the UI
        router.reload();
        
    } catch (error: any) {
        toast.dismiss(loadingToast);
        
        toast.error(error.response?.data?.message || 'Failed to delete post. Please try again.', {
            duration: 5000,
            icon: <AlertCircle className="w-5 h-5 text-red-500" />,
            richColors: true,
        });
    }
};

    const updateStatus = async (postId: number, action: string) => {
    try {
        const response = await router.post(`/cms/posts/${postId}/status`, { action }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                // Get the flash message from the response
                const flash = (page.props as any).flash;
                
                if (flash?.success) {
                    // Show success toast with appropriate message
                    if (action === 'toggle_restrict') {
                        // We don't know the new status yet, but we can show a generic message
                        toast.success(flash.success, {
                            duration: 4000,
                            description: "The author will be notified via email.",
                            icon: "🔔"
                        });
                    } else if (action === 'approve') {
                        toast.success(flash.success, {
                            duration: 4000,
                            description: "The author has been notified.",
                            icon: "✅"
                        });
                    } else {
                        toast.success(flash.success, {
                            duration: 3000,
                        });
                    }
                } else if (flash?.error) {
                    toast.error(flash.error, {
                        duration: 5000,
                    });
                }
            },
            onError: (errors) => {
                toast.error("An error occurred while updating the post status.", {
                    duration: 5000,
                });
            }
        });
    } catch (error) {
        toast.error("Failed to update post status. Please try again.", {
            duration: 5000,
        });
    }
};

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved": 
                return <Badge variant="outline" className="gap-1 dark:border-green-800 dark:text-green-300"><CheckCircle className="w-3 h-3" /> Approved</Badge>;
            case "restricted": 
                return <Badge variant="destructive" className="gap-1 dark:bg-red-900 dark:text-red-200"><XCircle className="w-3 h-3" /> Restricted</Badge>;
            case "pending":
                return <Badge variant="default" className="gap-1 dark:bg-yellow-900 dark:text-yellow-200"><AlertCircle className="w-3 h-3" /> Pending</Badge>;
            case "draft":
                return <Badge variant="outline" className="border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400">Draft</Badge>;
            case "published":
                return <Badge variant="default" className="gap-1 dark:bg-blue-900 dark:text-blue-200"><Globe className="w-3 h-3" /> Published</Badge>;
            default: 
                return <Badge variant="outline" className="dark:border-gray-700 dark:text-gray-300">{status}</Badge>;
        }
    };

    const getStateBadge = (state: string) => {
        switch (state.toLowerCase()) {
            case "approve": 
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 gap-1 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"><CheckCircle className="w-3 h-3" /> Approved</Badge>;
            case "pending": 
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 gap-1 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30"><AlertCircle className="w-3 h-3" /> Pending Review</Badge>;
            default: 
                return <Badge variant="outline" className="dark:border-gray-700 dark:text-gray-300">{state}</Badge>;
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
        
        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    };

    const renderStatsCards = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Posts</p>
                            <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{totalPosts}</p>
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Approved Posts</p>
                            <p className="text-2xl font-bold text-green-800 dark:text-green-300">{approvedTotal}</p>
                        </div>
                        <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending Review</p>
                            <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{pendingTotal}</p>
                        </div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg">
                            <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">Restricted</p>
                            <p className="text-2xl font-bold text-red-800 dark:text-red-300">{restrictedTotal}</p>
                        </div>
                        <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-lg">
                            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAdminEnforcerGrid = (posts: Post[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow dark:border-gray-700 dark:bg-gray-800">
                    <div className="relative">
                        {post.thumbnail && (
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="absolute top-2 right-2">
                            {getStateBadge(post.state)}
                        </div>
                    </div>
                    <CardContent className="p-0 sm:p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm line-clamp-2 mb-1 dark:text-gray-100">{post.title}</h3>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    <User className="w-3 h-3 mr-1" />
                                    <span>{post.author.name}</span>
                                    <span className="mx-1">•</span>
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{formatDate(post.created_at)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                {getStatusBadge(post.status)}
                            </div>
                            <div className="flex items-center space-x-1">
                                <Link 
                                    href={`/cms/blog/${post.slug}`}
                                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                    title="View"
                                >
                                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </Link>
                                {editMode && canEdit(post) && (
                                    <>
                                        <Link 
                                            href={`/cms/blog/${post.id}/edit`}
                                            className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md"
                                            title="Edit"
                                        >
                                            <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </Link>
                                        <button 
                                            onClick={() => deletePost(post.id)}
                                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderAdminEnforcerList = (posts: Post[]) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Button 
                        variant={layoutMode === 'list' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setLayoutMode('list')}
                    >
                        <List className="w-4 h-4 mr-1" /> List
                    </Button>
                    <Button 
                        variant={layoutMode === 'grid' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setLayoutMode('grid')}
                    >
                        <Grid className="w-4 h-4 mr-1" /> Grid
                    </Button>
                </div>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleEdit}
                    className={editMode ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300" : ""}
                >
                    {editMode ? (
                        <>
                            <Pencil className="w-4 h-4 mr-1" /> Edit Mode Active
                        </>
                    ) : (
                        "Enable Edit Mode"
                    )}
                </Button>
            </div>

            {layoutMode === 'grid' ? renderAdminEnforcerGrid(posts) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <Card key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors dark:border-gray-700 dark:bg-gray-800">
                            <CardContent className="p-4">
                                <div className="flex items-start space-x-4">
                                    {post.thumbnail && (
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    <div className="flex items-center">
                                                        <User className="w-3 h-3 mr-1" />
                                                        <span>{post.author.name}</span>
                                                        <Badge variant="outline" className="ml-2 text-xs dark:border-gray-700 dark:text-gray-300">
                                                            {post.author.role}
                                                        </Badge>
                                                    </div>
                                                    <span>•</span>
                                                    <div className="flex items-center">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        <span>{formatDate(post.created_at)}</span>
                                                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                                                            ({getTimeAgo(post.created_at)})
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getStateBadge(post.state)}
                                                {getStatusBadge(post.status)}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-3">
                                            <Link 
                                                href={`/cms/blog/${post.slug}`}
                                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline flex items-center"
                                            >
                                                <Eye className="w-3 h-3 mr-1" />
                                                View Post
                                            </Link>
                                            
                                            {editMode && canEdit(post) && (
                                                <div className="flex items-center space-x-2">
                                                    <Link 
                                                        href={`/cms/blog/${post.id}/edit`}
                                                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline flex items-center"
                                                    >
                                                        <Edit3 className="w-3 h-3 mr-1" />
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => deletePost(post.id)}
                                                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:underline flex items-center"
                                                    >
                                                        <Trash2 className="w-3 h-3 mr-1" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );

    const renderOtherAuthorsList = (posts: Post[]) => (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center dark:border-gray-700"
                    >
                        <Filter className="w-4 h-4 mr-1" />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                    
                    {showFilters && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={clearFilters}
                            className="flex items-center dark:text-gray-400"
                        >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Clear Filters
                        </Button>
                    )}
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {posts.length} of {otherAuthorPosts.length} posts
                </div>
            </div>

            {showFilters && (
                <Card className="mb-4 dark:border-gray-700 dark:bg-gray-800">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        placeholder="Search posts..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                        className="pl-9 dark:border-gray-700 dark:bg-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value) => setFilters({ ...filters, status: value })}
                                >
                                    <SelectTrigger className="dark:border-gray-700 dark:bg-gray-900">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                                        <SelectItem value="all" className="dark:hover:bg-gray-800">All Status</SelectItem>
                                        <SelectItem value="draft" className="dark:hover:bg-gray-800">Draft</SelectItem>
                                        <SelectItem value="published" className="dark:hover:bg-gray-800">Published</SelectItem>
                                        <SelectItem value="restricted" className="dark:hover:bg-gray-800">Restricted</SelectItem>
                                        <SelectItem value="archived" className="dark:hover:bg-gray-800">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                                <Select
                                    value={filters.state}
                                    onValueChange={(value) => setFilters({ ...filters, state: value })}
                                >
                                    <SelectTrigger className="dark:border-gray-700 dark:bg-gray-900">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                                        <SelectItem value="all" className="dark:hover:bg-gray-800">All States</SelectItem>
                                        <SelectItem value="approve" className="dark:hover:bg-gray-800">Approved</SelectItem>
                                        <SelectItem value="pending" className="dark:hover:bg-gray-800">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
                                <Select
                                    value={filters.author}
                                    onValueChange={(value) => setFilters({ ...filters, author: value })}
                                >
                                    <SelectTrigger className="dark:border-gray-700 dark:bg-gray-900">
                                        <SelectValue placeholder="Select author" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                                        <SelectItem value="all" className="dark:hover:bg-gray-800">All Authors</SelectItem>
                                        {authorsList.map((author) => (
                                            <SelectItem key={author.id} value={author.id.toString()} className="dark:hover:bg-gray-800">
                                                {author.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {!showFilters && (
                <Card className="mb-4 dark:border-yellow-800 dark:bg-yellow-900/10">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-yellow-300">Pending Review</h4>
                                    <p className="text-sm text-gray-500 dark:text-yellow-400/70">{pendingTotal} posts need your attention</p>
                                </div>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleShowAll}
                                className="flex items-center dark:border-gray-700"
                            >
                                Manage All Posts
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-3">
                {posts.length === 0 ? (
                    <Card className="dark:border-gray-700 dark:bg-gray-800">
                        <CardContent className="py-8 text-center">
                            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">No posts found</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                                        {post.thumbnail && (
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mr-4">
                                                    {post.title}
                                                </h3>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <User className="w-3 h-3 mr-1" />
                                                    {post.author.name}
                                                    <span className="mx-1">•</span>
                                                    <span className="capitalize">{post.author.role}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {getTimeAgo(post.created_at)}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(post.status)}
                                                {getStateBadge(post.state)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 ml-4">
                                        <Link 
                                            href={`/cms/blog/${post.slug}`}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        </Link>
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 dark:hover:bg-gray-700">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 dark:bg-gray-900 dark:border-gray-700">
                                                <DropdownMenuItem 
                                                    onClick={() => updateStatus(post.id, 'toggle_restrict')}
                                                    className="dark:hover:bg-gray-800"
                                                >
                                                    {post.status === 'restricted' ? (
                                                        <>
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Unrestrict Post
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="w-4 h-4 mr-2" />
                                                            Restrict Post
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                {post.state !== 'approve' && (
                                                    <>
                                                        <DropdownMenuSeparator className="dark:bg-gray-700" />
                                                        <DropdownMenuItem 
                                                            onClick={() => updateStatus(post.id, 'approve')}
                                                            className="text-green-600 dark:text-green-400 dark:hover:bg-gray-800"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Approve Post
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );

    const renderImosPages = () => {
        const imosPages = [
            {
                id: 1,
                title: "Welcome Page",
                description: "Landing page content for IMOSSF visitors.",
                route: "/",
                icon: Globe,
                color: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
            },
            {
                id: "da-livestock",
                title: "DA Livestock Page",
                description: "Page for livestock education and updates.",
                icon: Users,
                color: "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
            },
            {
                id: "mortality",
                title: "Livestock Insurance Mortality Page",
                description: "PDF auto-generation and insurance form section.",
                icon: FileText,
                color: "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
            },
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imosPages.map((page) => {
                    const Icon = page.icon;
                    return (
                        <Card key={page.id} className="hover:shadow-lg transition-shadow overflow-hidden border-t-4 border-t-blue-500 dark:border-t-blue-700 dark:border-gray-700 dark:bg-gray-800">
                            <CardContent className="p-6">
                                <div className={`inline-flex p-3 rounded-lg mb-4 ${page.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{page.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{page.description}</p>
                                
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="text-xs dark:border-gray-700 dark:text-gray-300">
                                            IMOSSF Page
                                        </Badge>
                                        <Badge variant="outline" className="text-xs dark:border-gray-700 dark:text-gray-300">
                                            Static Content
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={`/cms/blog/${page.id}/edit`}
                                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <Edit3 className="w-4 h-4 mr-1" />
                                            Edit
                                        </Link>
                                        <Link
                                            href={page.route}
                                            className="inline-flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        );
    };

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <Link 
                                    href="/cms/blog" 
                                    className="hover:text-sidebar-primary transition-colors flex items-center dark:hover:text-sidebar-primary"
                                >
                                    
                                    Go to CMS
                                    <MoveLeft className="w-4 h-4 ml-1 rotate-180" />
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Blog Management</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-3xl">
                                Manage all blog posts, review submissions, and oversee IMOSSF pages from a single dashboard.
                            </p>
                        </div>
                        
                        <Link
                            href="/cms/create"
                            className="inline-flex items-center px-4 py-2.5 bg-sidebar-primary text-white rounded-lg hover:bg-sidebar-primary/90 transition-colors font-medium dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/80"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Post
                        </Link>
                    </div>

                    {renderStatsCards()}
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm dark:border-gray-700">
                    <div className="border-b dark:border-gray-700">
                        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
                            <div className="flex items-center justify-between px-6 pt-4">
                                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 flex-wrap sm:flex-nowrap">
                                    <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                                        <div className="flex items-center">
                                            <Shield className="w-4 h-4 sm:mr-2" />
                                            <span className="hidden sm:inline">Admin & Enforcer</span>
                                            <Badge variant="outline" className="ml-1 sm:ml-2 text-xs dark:border-gray-600 dark:text-gray-300">
                                                {adminEnforcerPosts.length}
                                            </Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger value="other" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 sm:mr-2" />
                                            <span className="hidden sm:inline">Other Authors</span>
                                            <Badge variant="outline" className="ml-1 sm:ml-2 text-xs dark:border-gray-600 dark:text-gray-300">
                                                {otherAuthorPosts.length}
                                            </Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger value="imos" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">
                                        <div className="flex items-center">
                                            <Globe className="w-4 h-4 sm:mr-2" />
                                            <span className="hidden sm:inline">IMOSSF Pages</span>
                                            <Badge variant="outline" className="ml-1 sm:ml-2 text-xs dark:border-gray-600 dark:text-gray-300">3</Badge>
                                        </div>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="px-6 py-6">
                                <TabsContent value="admin" className="mt-0">
                                    {renderAdminEnforcerList(adminEnforcerPosts)}
                                </TabsContent>
                                
                                <TabsContent value="other" className="mt-0">
                                    {renderOtherAuthorsList(otherAuthorPosts)}
                                </TabsContent>
                                
                                <TabsContent value="imos" className="mt-0">
                                    {renderImosPages()}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}