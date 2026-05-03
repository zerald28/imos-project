'use client';

import { Plate, usePlateEditor } from 'platejs/react';
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from '@/components/ui/editor';
import React, { useState, useMemo } from 'react';
import axios from "axios";
import { uploadFileToLaravel } from '@/hooks/use-upload-file'; 
import { KEYS } from "platejs"; 
import { ImageDeletionManager } from '@/components/editor/ImageDeletionManager';
import CMSLayout from './layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Tag, 
  FolderOpen, 
  Type, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface Category { id: number; name: string }
interface Tag { id: number; name: string }
interface PostProps {
  id: number;
  title: string;
  content: string;
  slug: string;
  category_id: number;
  tags?: Tag[];
}
interface PageProps {
  post: PostProps;
  categories?: Category[];
  allTags?: Tag[];
}

const normalizeTableContent = (nodes: any[]): any[] => {
  if (!Array.isArray(nodes)) return [];
  
  return nodes.map((node) => {
    if (!node) return { type: 'p', children: [{ text: '' }] };
    
    const newNode = { ...node };

    // Handle table cells (td/th)
    if (newNode.type === 'td' || newNode.type === 'th') {
      // Ensure children exists and is an array
      if (!Array.isArray(newNode.children)) {
        newNode.children = [{ type: 'p', children: [{ text: '' }] }];
      }
      
      newNode.children = newNode.children.map((p: any) => {
        const newP = { ...p };
        if (!Array.isArray(newP.children)) {
          newP.children = [{ text: ' ' }];
        }
        newP.children = newP.children.map((c: any) => ({
          ...c,
          text: c?.text ?? " ",
        }));
        return newP;
      });
    }

    // Recursively process children
    if (newNode.children && Array.isArray(newNode.children)) {
      newNode.children = normalizeTableContent(newNode.children);
    } else if (newNode.children === undefined) {
      // Ensure children property exists for nodes that should have it
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(newNode.type)) {
        newNode.children = [{ text: '' }];
      }
    }

    return newNode;
  });
};


function getFirstImageUrl(nodes: any[]): string | null {
  for (const node of nodes) {
    if (node.type === "img" && node.url) return node.url;
    if (node.children) {
      const found = getFirstImageUrl(node.children);
      if (found) return found;
    }
  }
  return null;
}

export default function EditPost({ post, categories = [], allTags = [] }: PageProps) {
  const localFilesRef = React.useRef<Record<string, File>>({});

  /** ─────────────────────────
   * STATE
   * ───────────────────────── */
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(post.title);
  const [categoryId, setCategoryId] = useState<number | null>(post.category_id);
  const [selectedTags, setSelectedTags] = useState<number[]>(post.tags?.map(t => t.id) || []);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

  /** ─────────────────────────
   * NORMALIZE CONTENT
   * ───────────────────────── */
  const normalizeTableContent = (nodes: any[]): any[] => {
  if (!Array.isArray(nodes)) return [];
  
  return nodes.map((node) => {
    if (!node) return { type: 'p', children: [{ text: '' }] };
    
    const newNode = { ...node };

    // Handle table cells (td/th)
    if (newNode.type === 'td' || newNode.type === 'th') {
      // Ensure children exists and is an array
      if (!Array.isArray(newNode.children)) {
        newNode.children = [{ type: 'p', children: [{ text: '' }] }];
      }
      
      newNode.children = newNode.children.map((p: any) => {
        const newP = { ...p };
        if (!Array.isArray(newP.children)) {
          newP.children = [{ text: ' ' }];
        }
        newP.children = newP.children.map((c: any) => ({
          ...c,
          text: c?.text ?? " ",
        }));
        return newP;
      });
    }

    // Recursively process children
    if (newNode.children && Array.isArray(newNode.children)) {
      newNode.children = normalizeTableContent(newNode.children);
    } else if (newNode.children === undefined) {
      // Ensure children property exists for nodes that should have it
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(newNode.type)) {
        newNode.children = [{ text: '' }];
      }
    }

    return newNode;
  });
};

// Update normalizeContent function:
const normalizeContent = (nodes: any[]): any[] => {
  if (!Array.isArray(nodes)) return [{ type: 'p', children: [{ text: '' }] }];
  
  return nodes.map(node => {
    if (!node) return { type: 'p', children: [{ text: '' }] };
    
    const newNode = { ...node };
    
    if (newNode.children && Array.isArray(newNode.children)) {
      newNode.children = normalizeContent(newNode.children);
    } else if (newNode.children === undefined) {
      // Add empty children for text nodes
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'td', 'th'].includes(newNode.type)) {
        newNode.children = [{ text: '' }];
      }
    }
    
    // Ensure text property exists
    if ('text' in newNode && newNode.text == null) {
      newNode.text = '';
    }
    
    return newNode;
  });
};


  /** ─────────────────────────
   * INITIAL CONTENT
   * ───────────────────────── */
  const initialValue = useMemo(() => {
    if (!post.content) return [{ type: 'p', children: [{ text: '' }] }];
    let parsed: any[] = [];
    if (typeof post.content === 'string') {
      try { parsed = JSON.parse(post.content); } 
      catch { parsed = [{ type: 'p', children: [{ text: 'Error loading content.' }] }]; }
    } else if (Array.isArray(post.content)) parsed = post.content;
    else parsed = [{ type: 'p', children: [{ text: 'Invalid content format.' }] }];
    return normalizeContent(parsed);
  }, [post]);

  /** ─────────────────────────
   * PLATE EDITOR
   * ───────────────────────── */
  const editor = usePlateEditor({ plugins: EditorKit, value: initialValue });

  // Update thumbnail when editor content changes
  React.useEffect(() => {
    if (editor) {
      const content = clone(editor.children);
      const extractedThumbnail = getFirstImageUrl(content);
      setThumbnail(extractedThumbnail);
    }
  }, [editor?.children]);

  /** ─────────────────────────
   * HELPER FUNCTIONS
   * ───────────────────────── */
  const findImageNodes = (node: any): any[] => {
    if (node.type === KEYS.img) return [node];
    if (!node.children) return [];
    return node.children.flatMap(findImageNodes);
  };
  
  const replaceLocalUrls = (nodes: any[], uploadedUrls: Record<string, string>): any[] => nodes.map(node => {
    if (node.type === KEYS.img && node.placeholderId && uploadedUrls[node.placeholderId]) {
      return { ...node, url: uploadedUrls[node.placeholderId], placeholderId: undefined };
    }
    if (node.children) return { ...node, children: replaceLocalUrls(node.children, uploadedUrls) };
    return node;
  });

  /** ─────────────────────────
   * STEP NAVIGATION
   * ───────────────────────── */
  const handleNext = () => {
    if (!title.trim()) {
      toast.error('Title is required', {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }
    if (!categoryId) {
      toast.error('Please select a category', {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }
    setStep(2);
  };
  
  const handleBack = () => setStep(1);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;

    const existing = allTags.find(
      (tag) => tag.name.toLowerCase() === value.toLowerCase()
    );

    if (existing) {
      if (!selectedTags.includes(existing.id)) {
        setSelectedTags([...selectedTags, existing.id]);
      } else {
        toast.info('Tag already added');
      }
    } else {
      const tempId = -(Math.random() * 1000000);
      allTags.push({ id: tempId, name: value });
      setSelectedTags([...selectedTags, tempId]);
    }

    setTagInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Add this helper function

// Update the removeInvalidImages function:
const removeInvalidImages = (nodes: any[]): any[] => {
  if (!Array.isArray(nodes)) return [];
  
  return nodes
    .filter(node => {
      if (!node) return false;
      // Remove image nodes that have undefined or empty URL
      if (node.type === KEYS.img && (!node.url || node.url === '')) {
        console.warn('Removing invalid image node:', node);
        return false;
      }
      return true;
    })
    .map(node => {
      if (node.children && Array.isArray(node.children)) {
        return { ...node, children: removeInvalidImages(node.children) };
      }
      return node;
    });
};

  /** ─────────────────────────
   * UPDATE HANDLER
   * ───────────────────────── */
  const handleUpdate = async () => {
    if (!editor || isUpdating) return;

    setIsUpdating(true);
    
    try {
      const content = normalizeTableContent(clone(editor.children));
      
      const fileNodes = content.flatMap(findImageNodes);
      const uploadedUrls: Record<string, string> = {};

      for (const img of fileNodes) {
        if (img.placeholderId && localFilesRef.current[img.placeholderId]) {
          const file = localFilesRef.current[img.placeholderId];
          const uploadedFileResult = await uploadFileToLaravel(file);
          uploadedUrls[img.placeholderId] = uploadedFileResult.url;
        }
      }

      const finalContent = replaceLocalUrls(content, uploadedUrls);
      const thumbnail = getFirstImageUrl(finalContent);
      
      const response = await axios.put(`/cms/blog/${post.id}`, {
  title,
  slug: post.slug ?? title.toLowerCase().replace(/\s+/g, '-'),
  content: finalContent,
  status: 'published',
  state: 'approve',
  category_id: categoryId,
  thumbnail,
  tags: selectedTags.map(id => {
    const tag = allTags.find(t => t.id === id);
    if (!tag) return null;
    return id > 0 ? id : tag.name;
  }).filter(Boolean),
}, { withCredentials: true });

toast.success('Post updated successfully!', {
  icon: <CheckCircle2 className="h-4 w-4" />,
  description: 'Your changes have been saved.'
});

// ✅ Use slug from the API response
const updatedSlug = response.data.slug;

setTimeout(() => {
  window.location.href = `/cms/blog/${updatedSlug}`;
}, 1500);
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error updating post.', {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  /** ─────────────────────────
   * RENDER
   * ───────────────────────── */
  return (
    <CMSLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Edit Blog Post
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Update your content and keep it fresh
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {step} of {totalSteps}: {step === 1 ? 'Basic Information' : 'Edit Content'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 dark:bg-gray-700" />
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:backdrop-blur-sm">
              <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
                <CardTitle className="text-2xl flex items-center gap-2 dark:text-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                    1
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Update your post's title, category, and tags
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                    <Type className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Blog Title
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., '10 Tips for Better Blog Posts'"
                    className="text-lg py-6 px-4 border-2 focus:border-blue-500 transition-colors dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    {title.length}/200 characters
                  </p>
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                    <FolderOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Category
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    onValueChange={(value) => setCategoryId(Number(value))} 
                    value={categoryId?.toString()}
                  >
                    <SelectTrigger className="w-full border-2 py-6 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={String(cat.id)} className="dark:text-gray-300 dark:focus:bg-gray-700">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                    <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a tag and press Enter..."
                      className="border-2 py-6 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                    />
                    <Button 
                      onClick={handleAddTag}
                      variant="outline"
                      className="px-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-colors"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Tag Chips */}
                  {selectedTags.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Selected tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tagId) => {
                          const tag = allTags.find((t) => t.id === tagId);
                          if (!tag) return null;

                          return (
                            <Badge
                              key={tagId}
                              variant="secondary"
                              className="px-3 py-2 text-sm bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                            >
                              {tag.name}
                              <button
                                className="ml-2 text-blue-400 dark:text-blue-500 hover:text-red-500 dark:hover:text-red-400 transition-colors font-bold"
                                onClick={() =>
                                  setSelectedTags(selectedTags.filter((id) => id !== tagId))
                                }
                              >
                                ×
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Alert */}
                <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                  <ImageIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-700 dark:text-blue-300">
                    The first image in your content will automatically become the post thumbnail
                  </AlertDescription>
                </Alert>
              </CardContent>

              <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700 flex justify-end p-6">
                <Button 
                  onClick={handleNext}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all shadow-lg hover:shadow-xl"
                >
                  Next: Edit Content
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Editor */}
          {step === 2 && (
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:backdrop-blur-sm">
              <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
                <CardTitle className="text-2xl flex items-center gap-2 dark:text-gray-100">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-semibold">
                    2
                  </div>
                  Edit Your Content
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Update your blog post content using the editor below
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Plate editor={editor}>
                  <ImageDeletionManager />
                  <EditorContainer className="min-h-[500px] border-2 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors dark:border-gray-700">
                    <Editor 
                      placeholder="Start writing your amazing content here..." 
                      className="prose max-w-none p-4 dark:prose-invert dark:bg-gray-900 dark:text-gray-100"
                    />
                  </EditorContainer>
                </Plate>

                {/* Thumbnail Preview */}
                {thumbnail && (
                  <div className="mt-4">
                    <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-3">
                        <ImageIcon className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Thumbnail Detected</h4>
                          <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                            This image will be used as your post thumbnail:
                          </p>
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-green-300 dark:border-green-700 shadow-sm">
                            <img 
                              src={thumbnail} 
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Alert>
                  </div>
                )}
              </CardContent>

              <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700 flex justify-between p-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="px-6 py-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Details
                </Button>

                <Button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 transition-all shadow-lg hover:shadow-xl"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Update Post
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Help Text */}
          {step === 1 && (
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Fields marked with <span className="text-red-500">*</span> are required</p>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}