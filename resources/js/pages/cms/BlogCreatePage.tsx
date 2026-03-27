'use client';

import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Plate, usePlateEditor } from 'platejs/react';
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from '@/components/ui/editor';
import axios from "axios";
import CMSLayout from './layout';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
  Calendar,
  Clock,
  FileText,
  CalendarOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Category { id: number; name: string }
interface Tag { id: number; name: string }
interface User { id: number; name: string; role: string }

interface Props {
  categories?: Category[];
  tags?: Tag[];
  user?: User;
  returnTo?: string;
  source?: string;
}

// Helper to normalize table content
function normalizeTableContent(nodes: any[]): any[] {
  return nodes.map((node) => {
    const newNode = { ...node };

    if (newNode.type === 'td' || newNode.type === 'th') {
      newNode.children = newNode.children?.map((p: any) => {
        const newP = { ...p };
        newP.children = newP.children?.map((c: any) => {
          return {
            ...c,
            text: c.text ?? " ",
          };
        });
        return newP;
      });
    }

    if (newNode.children) {
      newNode.children = normalizeTableContent(newNode.children);
    }

    return newNode;
  });
}

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

export default function BlogCreatePage({ categories = [], tags = [], user, returnTo, source }: Props) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [enableEvent, setEnableEvent] = useState(false);
  
  // Event-specific states
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  
  const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
  const editor = usePlateEditor({ plugins: EditorKit, value: [] });

  const currentCategory = categories.find(cat => cat.id === categoryId);
  const isEventCategory = currentCategory && ['DA', 'Announcement', 'Program'].includes(currentCategory.name);

  useEffect(() => {
    if (!enableEvent) {
      setEventDate('');
      setEventStartTime('');
      setEventEndTime('');
      setEventDescription('');
    }
  }, [enableEvent]);

  useEffect(() => {
    if (editor) {
      const content = clone(editor.children);
      const extractedThumbnail = getFirstImageUrl(content);
      setThumbnail(extractedThumbnail);
    }
  }, [editor?.children]);

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
    
    if (isEventCategory && enableEvent) {
      if (!eventDate) {
        toast.error('Event date is required when event is enabled', {
          icon: <Calendar className="h-4 w-4" />,
        });
        return;
      }
      if (!eventStartTime) {
        toast.error('Event start time is required when event is enabled', {
          icon: <Clock className="h-4 w-4" />,
        });
        return;
      }
      if (!eventEndTime) {
        toast.error('Event end time is required when event is enabled', {
          icon: <Clock className="h-4 w-4" />,
        });
        return;
      }
      if (!eventDescription.trim()) {
        toast.error('Event description is required when event is enabled', {
          icon: <FileText className="h-4 w-4" />,
        });
        return;
      }
    }
    
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;

    const existing = tags.find(
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
      tags.push({ id: tempId, name: value });
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

  const handleSave = async () => {
    if (!editor || isSaving) return;

    setIsSaving(true);
    const raw = clone(editor.children);
    const normalized = normalizeTableContent(raw);
    const extractedThumbnail = getFirstImageUrl(normalized);
    const generatedSlug = `${title.trim().replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

    interface EventData {
      event_date?: string;
      event_start_time?: string;
      event_end_time?: string;
      event_description?: string;
      is_global?: boolean;
    }
    
    let eventData: EventData = {};
    if (isEventCategory && enableEvent) {
      eventData = {
        event_date: eventDate,
        event_start_time: eventStartTime,
        event_end_time: eventEndTime,
        event_description: eventDescription,
        is_global: true
      };
    }

    try {
      const response = await axios.post('/cms/posts', {
        title,
        slug: generatedSlug,
        content: normalized,
        category_id: categoryId,
        thumbnail: extractedThumbnail,
        tags: selectedTags
          .map(id => {
            const tag = tags.find(t => t.id === id);
            if (!tag) return null;
            return id > 0 ? id : tag.name;
          })
          .filter(Boolean),
        status: 'published',
        ...eventData
      });

      const hasEventData = Object.keys(eventData).length > 0;
      toast.success(response.data.message || 'Post published successfully!', {
        icon: <CheckCircle2 className="h-4 w-4" />,
        description: hasEventData ? 'Event has been recorded.' : 'Your blog post has been created.'
      });

      const newPostId = response.data.id || response.data.post?.id;
      const newPostTitle = response.data.title || title;
      const newPostSlug = response.data.slug || generatedSlug;

      if (returnTo && source === 'service') {
        if (window.opener) {
          window.opener.postMessage({
            type: 'BLOG_CREATED',
            payload: {
              id: newPostId,
              title: newPostTitle,
              slug: newPostSlug
            }
          }, window.location.origin);
          
          setTimeout(() => {
            window.close();
          }, 1000);
        } else {
          router.visit(returnTo, {
            method: 'get',
            data: {
              new_blog_post: JSON.stringify({
                id: newPostId,
                title: newPostTitle,
                slug: newPostSlug
              })
            },
            preserveState: true,
          });
        }
      } else {
        window.location.href = `/cms/blog/${generatedSlug}`;
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error saving post.', {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const visibleCategories = categories.filter(cat => {
    if (!user) return true;
    if (['admin', 'enforcer'].includes(user.role)) return true;
    return ![1, 2, 3, 8].includes(cat.id);
  });

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  return (
    <CMSLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Create Blog Post
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Share your thoughts and insights with the community
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {step} of {totalSteps}: {step === 1 ? 'Basic Information' : 'Write Content'}
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
                  Start by giving your post a title and categorizing it properly
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
                  <Select onValueChange={(value) => setCategoryId(Number(value))}>
                    <SelectTrigger className="w-full border-2 py-6 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {visibleCategories.map(cat => (
                        <SelectItem key={cat.id} value={String(cat.id)} className="dark:text-gray-300 dark:focus:bg-gray-700">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Fields - Only show for DA, Announcement, Program categories */}
                {isEventCategory && (
                  <div className="space-y-4 border-l-4 border-blue-500 pl-4 bg-blue-50/30 dark:bg-blue-950/20 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-gray-100">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Event Details
                      </h3>
                      <Button
                        type="button"
                        variant={enableEvent ? "default" : "outline"}
                        onClick={() => setEnableEvent(!enableEvent)}
                        className={`flex items-center gap-2 ${
                          enableEvent 
                            ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {enableEvent ? (
                          <>
                            <Calendar className="h-4 w-4" />
                            Event Enabled
                          </>
                        ) : (
                          <>
                            <CalendarOff className="h-4 w-4" />
                            Disable Event
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {/* Info Alert */}
                    <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-700 dark:text-blue-300">
                        {enableEvent 
                          ? "Event details are enabled. Please fill in the event information below."
                          : "Event details are disabled. You can enable them if you want to create an event for this post."}
                      </AlertDescription>
                    </Alert>
                    
                    {/* Event Fields - Only show if enabled */}
                    {enableEvent && (
                      <>
                        {/* Event Description */}
                        <div>
                          <Label htmlFor="event_description" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            Event Description
                            <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="event_description"
                            value={eventDescription}
                            onChange={e => setEventDescription(e.target.value)}
                            placeholder="Describe the event details, objectives, and what participants can expect..."
                            className="min-h-[100px] border-2 mt-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                            maxLength={500}
                            required
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                            {eventDescription.length}/500 characters
                          </p>
                        </div>
                        
                        {/* Event Date */}
                        <div>
                          <Label htmlFor="event_date" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            Event Date
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="event_date"
                            type="date"
                            value={eventDate}
                            onChange={e => setEventDate(e.target.value)}
                            className="border-2 py-6 mt-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                            required
                          />
                        </div>

                        {/* Event Time Range */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="event_start_time" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              Start Time
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="event_start_time"
                              type="time"
                              value={eventStartTime}
                              onChange={e => setEventStartTime(e.target.value)}
                              className="border-2 py-6 mt-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="event_end_time" className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              End Time
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="event_end_time"
                              type="time"
                              value={eventEndTime}
                              onChange={e => setEventEndTime(e.target.value)}
                              className="border-2 py-6 mt-2 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                              required
                            />
                          </div>
                        </div>

                        {/* Helpful Tip */}
                        <div className="text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/30 p-3 rounded-lg">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>💡 Tip: Enabling event details will automatically create an event in the IMOSSF calendar for farmers to see.</span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

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
                          const tag = tags.find((t) => t.id === tagId);
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
                    The first image you add to your content will automatically become the post thumbnail
                  </AlertDescription>
                </Alert>
              </CardContent>

              <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700 flex justify-end p-6">
                <Button 
                  onClick={handleNext}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900"
                >
                  Next: Write Content
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
                  Write Your Content
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Use the editor below to craft your blog post
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Plate editor={editor}>
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
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 transition-all shadow-lg hover:shadow-xl"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Publish Post
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
              {isEventCategory && (
                <p className="mt-1">Event details can be enabled/disabled using the toggle button above</p>
              )}
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}