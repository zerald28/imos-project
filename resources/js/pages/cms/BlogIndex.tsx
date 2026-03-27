'use client';

import React, { useState } from 'react';
import CMSLayout from './layout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import CategoryTabs from './switching';
import { Heart, Search } from 'lucide-react';

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
  slug: string;
  created_at: string | null;
  category: Category;
  author: Author;
  thumbnail: string;
  likes_count: number;
}

interface Props {
  posts: {
    data: Post[];
    current_page: number;
    last_page: number;
    total: number;
  };
  categoryFilter: string;
  search: string;
}

export default function BlogIndex({ posts, categoryFilter, search }: Props) {
  const [query, setQuery] = useState(search || '');
  const [activeCategory, setActiveCategory] = useState(categoryFilter || 'DA');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.get('/cms/blog', { category: activeCategory, search: query }, { 
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setQuery('');
    Inertia.get('/cms/blog', { category }, { 
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };

  const handlePagination = (page: number) => {
    Inertia.get('/cms/blog', { category: activeCategory, search: query, page }, { 
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <>
      {/* Category Tabs */}
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      {/* Search Bar - Dark mode support */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2 px-4 sm:px-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sidebar-primary focus:border-transparent transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Search
        </button>
      </form>

      {/* Posts Grid - Dark mode support */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 grid gap-6 sm:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.data.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-12">
            No posts found.
          </p>
        ) : (
          posts.data.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:scale-[1.02]"
            >
              {post.thumbnail && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    alt={post.title} 
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-4 sm:p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                    {post.category?.name || 'Uncategorized'}
                  </span>
                  
                  {/* Likes Count */}
                  <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Heart className={`h-3 w-3 ${
                      post.likes_count > 0 
                        ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`} />
                    {post.likes_count || 0}
                  </span>
                </div>
                
                {/* Author Name */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  By {post.author?.name || 'Unknown Author'}
                </span>
                
                <h2 className="text-md sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 hover:text-sidebar-primary dark:hover:text-sidebar-primary transition-colors">
                  <Link href={`/cms/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.created_at)}
                  </span>
                 
                  <Link
                    href={`/cms/blog/${post.slug}`}
                    className="text-xs text-white bg-sidebar-primary hover:bg-sidebar-primary/80 dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/80 px-3 py-1.5 font-medium transition-colors rounded-lg shadow-sm hover:shadow"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination - Dark mode support */}
      {posts.last_page > 1 && (
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 pb-8 px-4">
          {posts.current_page > 1 && (
            <button
              onClick={() => handlePagination(posts.current_page - 1)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Previous
            </button>
          )}
          
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
            Page {posts.current_page} of {posts.last_page}
          </span>
          
          {posts.current_page < posts.last_page && (
            <button
              onClick={() => handlePagination(posts.current_page + 1)}
              className="px-4 py-2 bg-sidebar-primary text-white rounded-lg hover:bg-sidebar-primary/80 dark:bg-sidebar-primary dark:hover:bg-sidebar-primary/80 transition-colors font-medium"
            >
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
}

BlogIndex.layout = (page: React.ReactNode) => <CMSLayout>{page}</CMSLayout>;