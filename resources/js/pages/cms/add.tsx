import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AppLayout from "@/layouts/admin-layout";

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
}

export default function Index({ authUser, adminEnforcerPosts, otherAuthorPosts }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState<"admin" | "other">("admin");

    const toggleEdit = () => setEditMode(!editMode);

    const canEdit = (post: Post) =>
        authUser.role === "admin" || authUser.role === "enforcer" || post.author_id === authUser.id;

    const deletePost = (id: number) => {
        if (!confirm("Delete this post?")) return;
        router.delete(`/cms/posts/${id}`);
    };

    const updateStatus = (postId: number, action: string) => {
        router.post(`/cms/posts/${postId}/status`, { action });
    };

    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved": return "text-green-600";
            case "restricted": return "text-red-600";
            case "pending":
            default: return "text-yellow-600";
        }
    };

    const getStateColor = (state: string) => {
        switch (state.toLowerCase()) {
            case "approve": return "bg-green-100 text-green-800";
            case "pending": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

    const getCountByDate = (dateStr: string) => {
        const postDate = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - postDate.getTime();
        const oneDay = 1000 * 60 * 60 * 24;

        if (diff < oneDay) return "Today";
        if (diff < oneDay * 7) return "This Week";
        if (diff < oneDay * 30) return "This Month";
        return postDate.toLocaleDateString();
    };

    const renderPosts = (posts: Post[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg w-full max-w-md flex flex-col">
                    {post.thumbnail && (
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                    )}
                    <h3 className="font-semibold text-md line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-gray-500">
                        by {post.author.name} ({post.author.role})
                    </p>
                    <div className="flex space-x-2 mt-1">
                        <span className={`${getStatusColor(post.status)} text-sm font-medium`}>
                            {capitalize(post.status)}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-sm font-semibold ${getStateColor(post.state)}`}>
                            {capitalize(post.state)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        Created: {formatDate(post.created_at)} ({getCountByDate(post.created_at)})
                    </p>

                    <div className="flex justify-between mt-2 items-center">
                        {canEdit(post) && editMode ? (
                            <div className="flex space-x-2 text-xs">
                                <Link href={`/cms/blog/${post.id}/edit`} className="text-blue-600 underline">
                                    Edit
                                </Link>
                                <button className="text-red-600 underline" onClick={() => deletePost(post.id)}>
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <Link href={`/blog/${post.slug}`} className="text-green-600 underline text-xs">
                                View
                            </Link>
                        )}

                        {!canEdit(post) && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" className="text-xs px-2 py-1">Actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="text-xs">
                                    <DropdownMenuItem onClick={() => updateStatus(post.id, 'toggle_restrict')}>
                                        {post.status === 'restricted' ? 'Unrestrict' : 'Restrict'}
                                    </DropdownMenuItem>
                                    {post.state !== 'approve' && (
                                        <DropdownMenuItem onClick={() => updateStatus(post.id, 'approve')}>
                                            Approve
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <AppLayout>
            <div className="px-4">
                {/* ---------- Page Header ---------- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Management</h1>
                    <Button size="sm" className="mt-2 md:mt-0" onClick={toggleEdit}>
                        {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
                    </Button>
                </div>

                {/* ---------- Tabs Switcher ---------- */}
                <div className="flex space-x-4 border-b mb-4">
                    <button
                        className={`px-4 py-2 ${activeTab === "admin" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
                        onClick={() => setActiveTab("admin")}
                    >
                        Admin & Enforcer ({adminEnforcerPosts.length})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "other" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
                        onClick={() => setActiveTab("other")}
                    >
                        Other Authors ({otherAuthorPosts.length})
                    </button>
                </div>

                {/* ---------- Posts Grid ---------- */}
                {activeTab === "admin" ? renderPosts(adminEnforcerPosts) : renderPosts(otherAuthorPosts)}
            </div>
        </AppLayout>
    );
}
